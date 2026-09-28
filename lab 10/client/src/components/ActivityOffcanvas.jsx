import React from 'react';
import { Offcanvas, ListGroup, Badge, Button } from 'react-bootstrap';

export default function ActivityOffcanvas({ show, onHide, activities, onClear }) {
  const getBadgeVariant = (type) => {
    switch (type) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'danger': return 'danger';
      case 'info': return 'info';
      default: return 'primary';
    }
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title className="fw-bold d-flex align-items-center gap-2 fs-6">
          <i className="bi bi-clock-history text-primary"></i>
          <span>Live Server Audit &amp; Event Stream</span>
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="p-0 d-flex flex-column justify-content-between">
        <div className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="small text-secondary fw-semibold">Recent Events from Port 5000</span>
            <Badge bg="secondary-subtle" className="text-secondary border">
              {activities?.length || 0} events
            </Badge>
          </div>

          <ListGroup variant="flush">
            {(!activities || activities.length === 0) ? (
              <div className="text-center py-5 text-secondary small">
                <i className="bi bi-bell-slash fs-3 d-block mb-2"></i>
                No new activity logs recorded.
              </div>
            ) : (
              activities.map((act) => (
                <ListGroup.Item key={act.id} className="px-0 py-3 border-bottom bg-transparent">
                  <div className="d-flex align-items-start gap-2">
                    <Badge 
                      bg={`${getBadgeVariant(act.type)}-subtle`} 
                      className={`text-${getBadgeVariant(act.type)} border border-${getBadgeVariant(act.type)}-subtle mt-1 p-1`}
                    >
                      <i className={`bi ${act.type === 'success' ? 'bi-check' : act.type === 'danger' ? 'bi-trash' : 'bi-activity'}`}></i>
                    </Badge>
                    <div className="flex-grow-1">
                      <div className="fw-semibold small">{act.action}</div>
                      <div className="text-secondary small font-monospace">{act.target}</div>
                      <div className="d-flex justify-content-between align-items-center mt-1 text-muted" style={{ fontSize: '0.72rem' }}>
                        <span><i className="bi bi-person me-1"></i>{act.user}</span>
                        <span><i className="bi bi-clock me-1"></i>{act.time}</span>
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </div>

        <div className="p-3 border-top bg-body-tertiary">
          <Button variant="outline-secondary" size="sm" className="w-100" onClick={onHide}>
            Close Drawer
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
