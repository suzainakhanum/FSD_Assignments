import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Badge, Spinner } from 'react-bootstrap';

export default function ApiConsole() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('/api/health');
  const [method, setMethod] = useState('GET');
  const [responseOutput, setResponseOutput] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [httpStatus, setHttpStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const endpoints = [
    { path: '/api/health', method: 'GET', description: 'Server port, uptime, Node version, and heartbeat' },
    { path: '/api/stats', method: 'GET', description: 'High-level metrics, active projects, task counts' },
    { path: '/api/tasks', method: 'GET', description: 'List of all development tasks with filtering' },
    { path: '/api/projects', method: 'GET', description: 'Enterprise initiatives, budgets, and milestone progress' },
    { path: '/api/activity', method: 'GET', description: 'Recent audit logs and real-time events' }
  ];

  const handleExecute = async () => {
    setLoading(true);
    const start = performance.now();
    try {
      // Direct call using the configured proxy or relative API path
      const res = await fetch(selectedEndpoint);
      const end = performance.now();
      setResponseTime(Math.round(end - start));
      setHttpStatus(`${res.status} ${res.statusText}`);

      const data = await res.json();
      setResponseOutput(JSON.stringify(data, null, 2));
    } catch (err) {
      const end = performance.now();
      setResponseTime(Math.round(end - start));
      setHttpStatus('Error / Failed to Fetch');
      setResponseOutput(JSON.stringify({ error: err.message, note: 'Make sure Express server is running on Port 5000' }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-card border-0 mb-4">
      <Card.Header className="bg-transparent border-bottom p-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
              <i className="bi bi-terminal-split text-primary"></i>
              Interactive REST API Explorer
            </h5>
            <small className="text-secondary">
              Directly ping backend routes on <code>http://localhost:5000</code> from client on <code>http://localhost:5173</code>
            </small>
          </div>
          <Badge bg="info-subtle" className="text-info border border-info-subtle px-3 py-2 rounded-pill font-monospace">
            CORS & Proxy Enabled
          </Badge>
        </div>
      </Card.Header>

      <Card.Body className="p-3 p-lg-4">
        <Row className="g-3 align-items-end mb-4">
          <Col xs={12} sm={3} md={2}>
            <Form.Label className="fw-semibold small">HTTP Method</Form.Label>
            <Form.Select 
              value={method} 
              onChange={(e) => setMethod(e.target.value)}
              className="fw-bold font-monospace bg-body-secondary"
            >
              <option value="GET">GET</option>
            </Form.Select>
          </Col>

          <Col xs={12} sm={6} md={7}>
            <Form.Label className="fw-semibold small">API Endpoint Route</Form.Label>
            <Form.Select 
              value={selectedEndpoint} 
              onChange={(e) => setSelectedEndpoint(e.target.value)}
              className="font-monospace"
            >
              {endpoints.map((ep) => (
                <option key={ep.path} value={ep.path}>
                  {ep.path} - {ep.description}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col xs={12} sm={3} md={3}>
            <Button 
              variant="primary" 
              className="w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
              onClick={handleExecute}
              disabled={loading}
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', border: 'none' }}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" />
                  <span>Dispatching...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-play-fill fs-5"></i>
                  <span>Send Request</span>
                </>
              )}
            </Button>
          </Col>
        </Row>

        {/* Terminal Result Window */}
        <div className="terminal-window">
          <div className="terminal-header d-flex justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
              <span className="ms-2 text-secondary small font-monospace">
                bash - client@localhost:5173 &gt;&gt; curl http://localhost:5000{selectedEndpoint}
              </span>
            </div>

            {httpStatus && (
              <div className="d-flex align-items-center gap-2">
                <span className={`badge ${httpStatus.startsWith('200') ? 'bg-success' : 'bg-danger'} font-monospace small`}>
                  {httpStatus}
                </span>
                <span className="badge bg-secondary font-monospace small">
                  {responseTime} ms
                </span>
              </div>
            )}
          </div>

          <div className="terminal-content">
            {responseOutput ? (
              <pre className="mb-0 text-white font-monospace" style={{ whiteSpace: 'pre-wrap' }}>
                {responseOutput}
              </pre>
            ) : (
              <div className="text-secondary font-monospace">
                // Click "Send Request" to invoke the backend API route on Port 5000.<br/>
                // Results and telemetry response will stream here formatted in JSON.
              </div>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
