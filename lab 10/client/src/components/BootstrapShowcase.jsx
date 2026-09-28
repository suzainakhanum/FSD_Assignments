import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Accordion, 
  Alert, 
  Button, 
  ButtonGroup, 
  Badge, 
  ProgressBar, 
  Spinner,
  OverlayTrigger,
  Tooltip,
  Popover
} from 'react-bootstrap';

export default function BootstrapShowcase() {
  const [showAlert, setShowAlert] = useState(true);
  const [activeButton, setActiveButton] = useState('day');

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">React-Bootstrap Native Popover</Popover.Header>
      <Popover.Body>
        Popovers leverage Popper.js under the hood for dynamic positioning without manual coordinate calculation.
      </Popover.Body>
    </Popover>
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="fw-bold mb-0">React-Bootstrap Component Gallery</h5>
          <p className="text-secondary small mb-0">
            Showcase of accessible, flexible UI components sourced from{' '}
            <a href="https://react-bootstrap.netlify.app/" target="_blank" rel="noreferrer" className="text-primary text-decoration-none fw-semibold">
              react-bootstrap.netlify.app <i className="bi bi-box-arrow-up-right"></i>
            </a>
          </p>
        </div>
      </div>

      <Row className="g-4">
        {/* Accordions & Collapsible Cards */}
        <Col xs={12} lg={6}>
          <Card className="glass-card border-0 h-100 shadow-sm">
            <Card.Header className="bg-transparent border-bottom p-3">
              <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <i className="bi bi-arrows-collapse text-primary"></i>
                React-Bootstrap Accordion
              </h6>
            </Card.Header>
            <Card.Body className="p-3">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <i className="bi bi-shuffle me-2 text-primary"></i>
                    How are Client & Server Ports Separated?
                  </Accordion.Header>
                  <Accordion.Body className="small text-secondary">
                    The Vite React frontend runs on <strong>Port 5173</strong> while the Node/Express backend listens on <strong>Port 5000</strong>. Communication is facilitated through Vite's built-in reverse proxy (<code>/api</code> mapping) and Express <code>cors</code> middleware, avoiding cross-origin security barriers.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <i className="bi bi-shield-check me-2 text-success"></i>
                    Why React-Bootstrap over Standard Bootstrap?
                  </Accordion.Header>
                  <Accordion.Body className="small text-secondary">
                    React-Bootstrap replaces Bootstrap JavaScript with pure React components. There are no dependencies on jQuery or native DOM mutations, ensuring total state synchronization within React's virtual DOM lifecycle.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    <i className="bi bi-lightning-charge me-2 text-warning"></i>
                    Concurrent Development Script
                  </Accordion.Header>
                  <Accordion.Body className="small text-secondary">
                    The project includes a root <code>npm run dev</code> powered by <code>concurrently</code>. A single terminal command spins up both the Express file-watcher server and Vite HMR bundler with color-coded log prefixes.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>
        </Col>

        {/* Dynamic Interactive Widgets */}
        <Col xs={12} lg={6}>
          <Card className="glass-card border-0 h-100 shadow-sm">
            <Card.Header className="bg-transparent border-bottom p-3">
              <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <i className="bi bi-ui-checks text-info"></i>
                Buttons, Tooltips & Alerts
              </h6>
            </Card.Header>
            <Card.Body className="p-3 d-flex flex-column gap-3">
              {/* Dismissible Alert */}
              {showAlert && (
                <Alert variant="primary" onClose={() => setShowAlert(false)} dismissible className="mb-0">
                  <Alert.Heading className="fs-6 fw-bold mb-1">
                    <i className="bi bi-info-circle-fill me-2"></i> Live Server Connection
                  </Alert.Heading>
                  <p className="small mb-0">
                    Client and server run concurrently! You can dismiss this alert or interact with components below.
                  </p>
                </Alert>
              )}

              {/* Button Groups */}
              <div>
                <div className="small fw-semibold text-secondary mb-2">Segmented Button Groups</div>
                <ButtonGroup className="w-100 shadow-sm">
                  <Button 
                    variant={activeButton === 'day' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveButton('day')}
                  >
                    Daily Metrics
                  </Button>
                  <Button 
                    variant={activeButton === 'week' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveButton('week')}
                  >
                    Weekly Summary
                  </Button>
                  <Button 
                    variant={activeButton === 'month' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveButton('month')}
                  >
                    Monthly Projection
                  </Button>
                </ButtonGroup>
              </div>

              {/* Tooltip & Popover Triggers */}
              <div>
                <div className="small fw-semibold text-secondary mb-2">Overlays & Tooltips</div>
                <div className="d-flex flex-wrap gap-2">
                  <OverlayTrigger placement="top" overlay={<Tooltip>React-Bootstrap Tooltip on Hover!</Tooltip>}>
                    <Button variant="outline-secondary" size="sm">
                      <i className="bi bi-chat-left-dots me-1"></i> Hover for Tooltip
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                    <Button variant="outline-info" size="sm">
                      <i className="bi bi-box me-1"></i> Click for Popover
                    </Button>
                  </OverlayTrigger>

                  <Button variant="outline-success" size="sm" className="d-flex align-items-center gap-1">
                    <Spinner animation="grow" size="sm" variant="success" />
                    <span>Real-time Live</span>
                  </Button>
                </div>
              </div>

              {/* Stacked Progress Bars */}
              <div>
                <div className="small fw-semibold text-secondary mb-2">Multi-Segment Progress Bar</div>
                <ProgressBar style={{ height: '10px', borderRadius: '6px' }}>
                  <ProgressBar striped variant="success" now={50} key={1} />
                  <ProgressBar variant="warning" now={25} key={2} />
                  <ProgressBar striped variant="danger" now={15} key={3} />
                </ProgressBar>
                <div className="d-flex justify-content-between small text-secondary mt-1">
                  <span>Completed (50%)</span>
                  <span>Review (25%)</span>
                  <span>Blocked (15%)</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
