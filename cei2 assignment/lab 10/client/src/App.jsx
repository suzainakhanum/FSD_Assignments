import React, { useState, useEffect, useCallback } from 'react';
import { 
  Container, 
  Tabs, 
  Tab, 
  Toast, 
  ToastContainer, 
  Alert 
} from 'react-bootstrap';
import Navigation from './components/Navigation';
import HeroBanner from './components/HeroBanner';
import StatCards from './components/StatCards';
import TaskManager from './components/TaskManager';
import ProjectsView from './components/ProjectsView';
import ApiConsole from './components/ApiConsole';
import BootstrapShowcase from './components/BootstrapShowcase';
import TaskModal from './components/TaskModal';
import ActivityOffcanvas from './components/ActivityOffcanvas';

const API_BASE = '/api';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('pulse_theme') || 'dark';
  });

  const [activeTab, setActiveTab] = useState('tasks');
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState(null);
  const [serverHealth, setServerHealth] = useState(null);
  const [serverStatus, setServerStatus] = useState('offline');
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [isPinging, setIsPinging] = useState(false);

  // Modals & Drawers state
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showActivity, setShowActivity] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (title, message, variant = 'primary') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, variant, time: 'Just now' }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync theme attribute with document root
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('pulse_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Fetch Server Health
  const checkHealth = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (res.ok) {
        const data = await res.json();
        setServerHealth(data);
        setServerStatus('online');
      } else {
        setServerStatus('offline');
      }
    } catch {
      setServerStatus('offline');
    }
  }, []);

  // Fetch Dashboard Stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  // Fetch Tasks
  const fetchTasks = useCallback(async () => {
    setLoadingTasks(true);
    try {
      const res = await fetch(`${API_BASE}/tasks`);
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (err) {
      console.error('Failed to load tasks:', err);
    } finally {
      setLoadingTasks(false);
    }
  }, []);

  // Fetch Projects
  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  }, []);

  // Fetch Activities
  const fetchActivities = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/activity`);
      if (res.ok) {
        const data = await res.json();
        setActivities(data);
      }
    } catch (err) {
      console.error('Failed to load activities:', err);
    }
  }, []);

  // Initial load and periodic heartbeat
  useEffect(() => {
    checkHealth();
    fetchStats();
    fetchTasks();
    fetchProjects();
    fetchActivities();

    const interval = setInterval(() => {
      checkHealth();
      fetchStats();
    }, 10000);

    return () => clearInterval(interval);
  }, [checkHealth, fetchStats, fetchTasks, fetchProjects, fetchActivities]);

  // Ping Server action
  const handlePingServer = async () => {
    setIsPinging(true);
    const start = performance.now();
    try {
      const res = await fetch(`${API_BASE}/health`);
      const data = await res.json();
      const duration = Math.round(performance.now() - start);
      setServerHealth(data);
      setServerStatus('online');
      addToast(
        'Server Ping Responded',
        `Port ${data.serverPort} responded in ${duration}ms! Uptime: ${data.uptimeSeconds}s`,
        'success'
      );
    } catch (err) {
      setServerStatus('offline');
      addToast('Ping Failed', 'Unable to reach backend on Port 5000.', 'danger');
    } finally {
      setIsPinging(false);
    }
  };

  // Create or Update Task
  const handleSaveTask = async (formData, id) => {
    try {
      if (id) {
        // Update
        const res = await fetch(`${API_BASE}/tasks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          const updated = await res.json();
          setTasks(prev => prev.map(t => t.id === id ? updated : t));
          fetchStats();
          fetchActivities();
          addToast('Task Updated', `"${updated.title}" was successfully updated.`, 'info');
        }
      } else {
        // Create
        const res = await fetch(`${API_BASE}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          const created = await res.json();
          setTasks(prev => [created, ...prev]);
          fetchStats();
          fetchActivities();
          addToast('Task Created', `"${created.title}" added to active sprint.`, 'success');
        }
      }
    } catch (err) {
      addToast('Operation Error', err.message, 'danger');
    }
  };

  // Toggle status or change status directly
  const handleToggleStatus = async (task, forcedStatus = null) => {
    let nextStatus = forcedStatus;
    if (!nextStatus) {
      nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    }

    try {
      const res = await fetch(`${API_BASE}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        const updated = await res.json();
        setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
        fetchStats();
        fetchActivities();
        addToast('Status Changed', `${task.title} is now ${nextStatus}`, 'primary');
      }
    } catch (err) {
      addToast('Error Updating Status', err.message, 'danger');
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setTasks(prev => prev.filter(t => t.id !== id));
        fetchStats();
        fetchActivities();
        addToast('Task Deleted', `Task ${id} has been permanently removed.`, 'warning');
      }
    } catch (err) {
      addToast('Delete Error', err.message, 'danger');
    }
  };

  const openCreateModal = () => {
    setTaskToEdit(null);
    setShowModal(true);
  };

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setShowModal(true);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Navbar */}
      <Navigation 
        theme={theme}
        toggleTheme={toggleTheme}
        serverStatus={serverStatus}
        onOpenCreateModal={openCreateModal}
        onOpenActivity={() => setShowActivity(true)}
        stats={stats}
      />

      {/* Main Body Content */}
      <Container fluid className="px-lg-5 py-4 flex-grow-1">
        {serverStatus === 'offline' && (
          <Alert variant="warning" className="d-flex align-items-center justify-content-between mb-4 shadow-sm border-warning">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill fs-5 text-warning"></i>
              <div>
                <strong>Backend Server is Offline or Connecting:</strong> The client is configured to communicate with the Express API on <code>http://localhost:5000</code>. Ensure the server process is started!
              </div>
            </div>
            <button className="btn btn-warning btn-sm fw-semibold" onClick={handlePingServer}>
              Retry Connection
            </button>
          </Alert>
        )}

        {/* Hero Banner with Port indicators */}
        <HeroBanner 
          serverHealth={serverHealth}
          onPingServer={handlePingServer}
          isPinging={isPinging}
        />

        {/* Metric KPI Cards */}
        <StatCards 
          stats={stats}
          taskCount={tasks.length}
        />

        {/* Tabbed Workspace Interface */}
        <div className="mt-4">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k || 'tasks')}
            className="custom-nav-tabs mb-4 border-0"
          >
            <Tab 
              eventKey="tasks" 
              title={
                <span>
                  <i className="bi bi-kanban me-2"></i> Tasks &amp; Workflow ({tasks.length})
                </span>
              }
            >
              <TaskManager 
                tasks={tasks}
                loading={loadingTasks}
                onToggleStatus={handleToggleStatus}
                onDeleteTask={handleDeleteTask}
                onEditTask={openEditModal}
                onOpenCreateModal={openCreateModal}
              />
            </Tab>

            <Tab 
              eventKey="projects" 
              title={
                <span>
                  <i className="bi bi-grid-1x2 me-2"></i> Strategic Projects ({projects.length})
                </span>
              }
            >
              <ProjectsView projects={projects} />
            </Tab>

            <Tab 
              eventKey="api-console" 
              title={
                <span>
                  <i className="bi bi-terminal me-2"></i> REST API Console
                </span>
              }
            >
              <ApiConsole />
            </Tab>

            <Tab 
              eventKey="showcase" 
              title={
                <span>
                  <i className="bi bi-stars me-2"></i> React-Bootstrap Components
                </span>
              }
            >
              <BootstrapShowcase />
            </Tab>
          </Tabs>
        </div>
      </Container>

      {/* Footer */}
      <footer className="py-4 border-top mt-auto bg-body-tertiary">
        <Container fluid className="px-lg-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <span className="brand-gradient-text fw-bold">PulseCore</span>
              <span className="text-secondary small">| Fullstack React-Bootstrap &amp; Express Platform</span>
            </div>
            <div className="d-flex align-items-center gap-3 small text-secondary">
              <span>Client: <strong className="text-body">Port 5173</strong></span>
              <span>•</span>
              <span>Server: <strong className="text-body">Port 5000</strong></span>
              <span>•</span>
              <a 
                href="https://react-bootstrap.netlify.app/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-secondary text-decoration-none hover-underline"
              >
                React-Bootstrap Docs
              </a>
            </div>
          </div>
        </Container>
      </footer>

      {/* Task Create / Edit Modal */}
      <TaskModal 
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      {/* Activity Log Drawer */}
      <ActivityOffcanvas 
        show={showActivity}
        onHide={() => setShowActivity(false)}
        activities={activities}
      />

      {/* Floating Notifications Toasts */}
      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 2000 }}>
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            onClose={() => removeToast(toast.id)} 
            delay={4000} 
            autohide
            className="glass-card border-0 mb-2 shadow"
          >
            <Toast.Header className="bg-transparent border-bottom">
              <i className={`bi bi-circle-fill text-${toast.variant} me-2`} style={{ fontSize: '0.6rem' }}></i>
              <strong className="me-auto">{toast.title}</strong>
              <small className="text-muted">{toast.time}</small>
            </Toast.Header>
            <Toast.Body className="small">{toast.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </div>
  );
}
