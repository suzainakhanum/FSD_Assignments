import React from 'react';
import { Navbar, Nav, Container, Button, Badge, Dropdown } from 'react-bootstrap';

export default function Navigation({ 
  theme, 
  toggleTheme, 
  serverStatus, 
  onOpenCreateModal, 
  onOpenActivity, 
  stats 
}) {
  return (
    <Navbar expand="lg" className="navbar-custom py-3" data-bs-theme={theme}>
      <Container fluid className="px-lg-5">
        <Navbar.Brand href="#home" className="d-flex align-items-center gap-2">
          <div 
            className="d-flex align-items-center justify-content-center text-white rounded-3 shadow-sm"
            style={{ 
              width: '40px', 
              height: '40px', 
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)' 
            }}
          >
            <i className="bi bi-stack fs-5"></i>
          </div>
          <div>
            <span className="brand-gradient-text fs-4 fw-bold">PulseCore</span>
            <span className="ms-2 badge bg-dark-subtle text-body-secondary border fw-medium px-2 py-1" style={{ fontSize: '0.65rem' }}>
              React-Bootstrap v2.10
            </span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />

        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto ms-lg-4 gap-1">
            <Nav.Link href="#tasks" className="fw-semibold">
              <i className="bi bi-kanban me-1 text-primary"></i> Tasks
            </Nav.Link>
            <Nav.Link href="#projects" className="fw-semibold">
              <i className="bi bi-grid-1x2 me-1 text-info"></i> Projects
            </Nav.Link>
            <Nav.Link href="#api-console" className="fw-semibold">
              <i className="bi bi-terminal me-1 text-warning"></i> API Console
            </Nav.Link>
            <Nav.Link href="#showcase" className="fw-semibold">
              <i className="bi bi-stars me-1 text-danger"></i> Components
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center flex-wrap gap-2 mt-3 mt-lg-0">
            {/* Server Port Status Pill */}
            <div className="d-flex align-items-center gap-2 px-3 py-1 bg-body-tertiary border rounded-pill shadow-sm">
              <span className={`pulse-indicator ${serverStatus === 'online' ? '' : 'offline'}`}></span>
              <span className="small fw-semibold">
                Port 5000: <span className={serverStatus === 'online' ? 'text-success' : 'text-danger'}>
                  {serverStatus === 'online' ? 'ONLINE' : 'OFFLINE'}
                </span>
              </span>
            </div>

            {/* Client Port Pill */}
            <div className="d-flex align-items-center gap-1 px-3 py-1 bg-body-tertiary border rounded-pill shadow-sm">
              <i className="bi bi-display text-primary"></i>
              <span className="small fw-semibold">Client: Port 5173</span>
            </div>

            {/* Activity Drawer Button */}
            <Button 
              variant="outline-secondary" 
              className="rounded-circle d-flex align-items-center justify-content-center position-relative"
              style={{ width: '40px', height: '40px' }}
              onClick={onOpenActivity}
              title="Recent Activity Log"
            >
              <i className="bi bi-bell"></i>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                <span className="visually-hidden">New notifications</span>
              </span>
            </Button>

            {/* Theme Toggle Button */}
            <Button 
              variant="outline-secondary" 
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px' }}
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              <i className={`bi ${theme === 'dark' ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-primary'}`}></i>
            </Button>

            {/* Quick Action: New Task */}
            <Button 
              variant="primary" 
              className="d-flex align-items-center gap-2 fw-semibold px-3 py-2 rounded-3 shadow-sm border-0"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}
              onClick={onOpenCreateModal}
            >
              <i className="bi bi-plus-circle-fill"></i>
              <span>New Task</span>
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
