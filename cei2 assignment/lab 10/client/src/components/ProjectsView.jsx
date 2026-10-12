import React from 'react';
import { Row, Col, Card, ProgressBar, Badge, Button } from 'react-bootstrap';

export default function ProjectsView({ projects }) {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="fw-bold mb-0">Active Strategic Initiatives</h5>
          <p className="text-secondary small mb-0">Cross-team projects synchronized from Express Server</p>
        </div>
        <Badge bg="primary-subtle" className="text-primary border border-primary-subtle px-3 py-2 rounded-pill">
          {projects.length} Initiatives Active
        </Badge>
      </div>

      <Row className="g-3">
        {projects.map((project) => (
          <Col key={project.id} xs={12} md={6} lg={4}>
            <Card className="glass-card h-100 border-0 shadow-sm">
              <Card.Body className="p-4 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="badge bg-secondary-subtle text-secondary border font-monospace">
                      {project.id}
                    </span>
                    <span className={`badge-status ${project.status === 'Active' ? 'badge-status-completed' : 'badge-status-pending'}`}>
                      <i className="bi bi-dot fs-6"></i> {project.status}
                    </span>
                  </div>

                  <h5 className="fw-bold mb-2">{project.name}</h5>
                  <p className="text-secondary small mb-3" style={{ minHeight: '40px' }}>
                    {project.description}
                  </p>

                  <div className="p-3 rounded-3 bg-body-tertiary mb-3 border">
                    <div className="d-flex justify-content-between small text-secondary mb-1">
                      <span>Client Partner:</span>
                      <strong className="text-body">{project.client}</strong>
                    </div>
                    <div className="d-flex justify-content-between small text-secondary mb-1">
                      <span>Project Lead:</span>
                      <strong className="text-body">{project.lead}</strong>
                    </div>
                    <div className="d-flex justify-content-between small text-secondary">
                      <span>Budget Spent:</span>
                      <strong className="text-body">{project.spent} / {project.budget}</strong>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="d-flex justify-content-between align-items-center small mb-1">
                    <span className="text-secondary fw-semibold">Milestone Progress</span>
                    <span className="fw-bold text-primary">{project.progress}%</span>
                  </div>
                  <ProgressBar 
                    now={project.progress} 
                    variant={project.progress > 70 ? 'success' : 'primary'}
                    style={{ height: '8px', borderRadius: '4px' }}
                    className="mb-3"
                  />

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="d-flex -space-x-2">
                        {[...Array(Math.min(project.teamSize, 4))].map((_, i) => (
                          <div
                            key={i}
                            className="rounded-circle border border-2 border-body bg-primary text-white d-flex align-items-center justify-content-center fw-bold small"
                            style={{ 
                              width: '26px', 
                              height: '26px', 
                              marginLeft: i > 0 ? '-8px' : '0', 
                              fontSize: '0.65rem',
                              background: `hsl(${i * 60 + 200}, 70%, 50%)`
                            }}
                          >
                            {String.fromCharCode(65 + i)}
                          </div>
                        ))}
                      </div>
                      <span className="small text-secondary ms-2">{project.teamSize} members</span>
                    </div>

                    <Button variant="outline-primary" size="sm" className="rounded-3">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
