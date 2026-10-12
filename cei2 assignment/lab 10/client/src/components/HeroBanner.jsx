import React, { useState } from 'react';
import { Row, Col, Button, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function HeroBanner({ serverHealth, onPingServer, isPinging }) {
  const [copiedPort, setCopiedPort] = useState(null);

  const copyToClipboard = (text, label) => {
    navigator.clipboard?.writeText(text);
    setCopiedPort(label);
    setTimeout(() => setCopiedPort(null), 2000);
  };

  return (
    <div className="hero-banner mb-4">
      <Row className="align-items-center g-4">
        <Col lg={7}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-1 rounded-pill fw-semibold">
              <i className="bi bi-diagram-3-fill me-1"></i> Multi-Port Fullstack Architecture
            </span>
            <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill fw-semibold">
              <i className="bi bi-shield-check me-1"></i> React-Bootstrap v2.10
            </span>
          </div>

          <h1 className="display-6 fw-extrabold mb-2 tracking-tight">
            Client & Server <span className="brand-gradient-text">Concurrent Workspace</span>
          </h1>

          <p className="text-secondary mb-4 fs-6" style={{ maxWidth: '600px' }}>
            Built with modern React-Bootstrap components on the frontend and an Express REST API backend, seamlessly communicating across decoupled runtime ports.
          </p>

          <div className="d-flex flex-wrap align-items-center gap-3">
            <Button
              variant="outline-primary"
              className="d-flex align-items-center gap-2 fw-semibold px-3 py-2 rounded-3"
              onClick={onPingServer}
              disabled={isPinging}
            >
              {isPinging ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Pinging API...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-broadcast text-primary"></i>
                  <span>Test Server Ping</span>
                </>
              )}
            </Button>

            <a
              href="https://react-bootstrap.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-secondary d-flex align-items-center gap-2 fw-semibold px-3 py-2 rounded-3"
            >
              <i className="bi bi-box-arrow-up-right"></i>
              <span>React-Bootstrap Docs</span>
            </a>
          </div>
        </Col>

        <Col lg={5}>
          <div className="p-3 bg-body rounded-4 border shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <span className="small text-uppercase fw-bold text-secondary">
                <i className="bi bi-router me-1 text-primary"></i> Runtime Port Allocation
              </span>
              <span className="badge bg-success-subtle text-success border border-success-subtle">
                Active & Bound
              </span>
            </div>

            <div className="d-flex flex-column gap-3">
              {/* Client Port Card */}
              <div className="d-flex align-items-center justify-content-between p-2 px-3 rounded-3 bg-body-tertiary border">
                <div className="d-flex align-items-center gap-3">
                  <div className="port-badge-client">
                    <i className="bi bi-browser-chrome"></i> CLIENT
                  </div>
                  <div>
                    <div className="fw-bold small">Frontend (Vite / React)</div>
                    <div className="text-secondary font-monospace" style={{ fontSize: '0.8rem' }}>
                      http://localhost:5173
                    </div>
                  </div>
                </div>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>{copiedPort === 'client' ? 'Copied!' : 'Copy URL'}</Tooltip>}
                >
                  <Button
                    variant="link"
                    size="sm"
                    className="text-secondary p-1"
                    onClick={() => copyToClipboard('http://localhost:5173', 'client')}
                  >
                    <i className={`bi ${copiedPort === 'client' ? 'bi-check2 text-success' : 'bi-clipboard'}`}></i>
                  </Button>
                </OverlayTrigger>
              </div>

              {/* Server Port Card */}
              <div className="d-flex align-items-center justify-content-between p-2 px-3 rounded-3 bg-body-tertiary border">
                <div className="d-flex align-items-center gap-3">
                  <div className="port-badge-server">
                    <i className="bi bi-hdd-network"></i> SERVER
                  </div>
                  <div>
                    <div className="fw-bold small">Backend (Express API)</div>
                    <div className="text-secondary font-monospace" style={{ fontSize: '0.8rem' }}>
                      http://localhost:5000
                    </div>
                  </div>
                </div>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>{copiedPort === 'server' ? 'Copied!' : 'Copy URL'}</Tooltip>}
                >
                  <Button
                    variant="link"
                    size="sm"
                    className="text-secondary p-1"
                    onClick={() => copyToClipboard('http://localhost:5000', 'server')}
                  >
                    <i className={`bi ${copiedPort === 'server' ? 'bi-check2 text-success' : 'bi-clipboard'}`}></i>
                  </Button>
                </OverlayTrigger>
              </div>

              {/* Server Metrics Summary */}
              <div className="pt-2 d-flex justify-content-between align-items-center small text-secondary">
                <span>
                  <i className="bi bi-clock-history me-1"></i> Uptime: {serverHealth?.uptimeSeconds ? `${serverHealth.uptimeSeconds}s` : 'Connecting...'}
                </span>
                <span>
                  <i className="bi bi-cpu me-1"></i> Node: {serverHealth?.nodeVersion || 'v24.13.0'}
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
