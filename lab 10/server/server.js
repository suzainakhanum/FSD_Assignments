import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// In-Memory Database for demonstration
let tasks = [
  {
    id: 'TASK-101',
    title: 'Architect React-Bootstrap Layout & Navigation',
    description: 'Build top navigation bar with dark mode toggle, notification dropdown, and responsive collapse.',
    status: 'Completed',
    priority: 'High',
    category: 'Frontend',
    assignee: 'Alex Rivera',
    dueDate: '2026-10-02',
    progress: 100,
    tags: ['UI/UX', 'Bootstrap', 'Navbar']
  },
  {
    id: 'TASK-102',
    title: 'Configure Node/Express Server on Dedicated Port',
    description: 'Separate client port (5173) and server port (5000) with CORS middleware and REST API routes.',
    status: 'Completed',
    priority: 'High',
    category: 'Backend',
    assignee: 'Samira Patel',
    dueDate: '2026-10-04',
    progress: 100,
    tags: ['Express', 'API', 'Ports']
  },
  {
    id: 'TASK-103',
    title: 'Implement Interactive Task Management Modal',
    description: 'Add React-Bootstrap Modal with form validation, category picker, priority badges, and toast alerts.',
    status: 'In Progress',
    priority: 'Medium',
    category: 'Frontend',
    assignee: 'Jordan Lee',
    dueDate: '2026-10-08',
    progress: 65,
    tags: ['Modal', 'Forms', 'Validation']
  },
  {
    id: 'TASK-104',
    title: 'Analytics Data Visualization Cards',
    description: 'Render metric cards with progress indicators, status badges, and trend comparisons.',
    status: 'In Progress',
    priority: 'Medium',
    category: 'Analytics',
    assignee: 'Taylor Vance',
    dueDate: '2026-10-10',
    progress: 40,
    tags: ['Dashboard', 'Charts', 'KPIs']
  },
  {
    id: 'TASK-105',
    title: 'Server Health & Real-time Heartbeat Polling',
    description: 'Expose /api/health endpoint with uptime, port binding info, memory stats and timestamp.',
    status: 'Pending',
    priority: 'Low',
    category: 'DevOps',
    assignee: 'Elena Rostova',
    dueDate: '2026-10-15',
    progress: 10,
    tags: ['Monitoring', 'HealthCheck']
  },
  {
    id: 'TASK-106',
    title: 'Offcanvas Drawer for Quick Filters and Export',
    description: 'Provide slide-over filter panel using React-Bootstrap Offcanvas for granular table filtering.',
    status: 'Pending',
    priority: 'Low',
    category: 'Frontend',
    assignee: 'Marcus Chen',
    dueDate: '2026-10-18',
    progress: 0,
    tags: ['Offcanvas', 'Filter', 'Export']
  }
];

let projects = [
  {
    id: 'PRJ-01',
    name: 'Nimbus Cloud Engine',
    description: 'Next-gen distributed cloud compute platform with automated autoscaling.',
    status: 'Active',
    client: 'Apex Global Corp',
    budget: '$48,000',
    spent: '$32,400',
    progress: 68,
    teamSize: 6,
    lead: 'Alex Rivera'
  },
  {
    id: 'PRJ-02',
    name: 'CyberShield Zero-Trust Gateway',
    description: 'Enterprise identity security framework with multi-region SSO authentication.',
    status: 'Active',
    client: 'FinTech Secure Inc',
    budget: '$75,000',
    spent: '$61,200',
    progress: 84,
    teamSize: 8,
    lead: 'Samira Patel'
  },
  {
    id: 'PRJ-03',
    name: 'PulseFlow Analytics Suite',
    description: 'Real-time telemetry event streaming pipeline and customer conversion dashboard.',
    status: 'Planning',
    client: 'DataPulse Media',
    budget: '$30,000',
    spent: '$4,500',
    progress: 25,
    teamSize: 4,
    lead: 'Jordan Lee'
  }
];

let activities = [
  { id: 1, action: 'Task marked completed', target: 'Architect React-Bootstrap Layout', user: 'Alex Rivera', time: '10 mins ago', type: 'success' },
  { id: 2, action: 'Server started', target: `Port ${PORT} bound successfully`, user: 'System', time: '25 mins ago', type: 'info' },
  { id: 3, action: 'New task created', target: 'Server Health & Real-time Heartbeat', user: 'Samira Patel', time: '1 hour ago', type: 'primary' },
  { id: 4, action: 'Project progress updated', target: 'CyberShield Zero-Trust (84%)', user: 'Taylor Vance', time: '3 hours ago', type: 'warning' }
];

const startTime = Date.now();

// ---------------- API Routes ---------------- //

// Health Check & Server Info
app.get('/api/health', (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  res.json({
    status: 'online',
    serverPort: PORT,
    clientPort: 5173,
    uptimeSeconds,
    nodeVersion: process.version,
    platform: process.platform,
    timestamp: new Date().toISOString(),
    message: 'Backend server is running smoothly on Port ' + PORT
  });
});

// Dashboard Stats
app.get('/api/stats', (req, res) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  res.json({
    totalTasks,
    completedTasks,
    inProgressTasks,
    pendingTasks,
    completionRate,
    activeProjects: projects.filter(p => p.status === 'Active').length,
    totalProjects: projects.length,
    serverPort: PORT,
    clientPort: 5173
  });
});

// Get all tasks (supports query filters)
app.get('/api/tasks', (req, res) => {
  let result = [...tasks];
  const { status, priority, search } = req.query;

  if (status && status !== 'All') {
    result = result.filter(t => t.status.toLowerCase() === status.toLowerCase());
  }

  if (priority && priority !== 'All') {
    result = result.filter(t => t.priority.toLowerCase() === priority.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(t => 
      t.title.toLowerCase().includes(q) || 
      t.description.toLowerCase().includes(q) ||
      t.assignee.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q)
    );
  }

  res.json(result);
});

// Create task
app.post('/api/tasks', (req, res) => {
  const { title, description, priority, category, assignee, dueDate } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const nextIndex = tasks.length + 101;
  const newTask = {
    id: `TASK-${nextIndex}`,
    title: title.trim(),
    description: description || 'No description provided.',
    status: 'Pending',
    priority: priority || 'Medium',
    category: category || 'General',
    assignee: assignee || 'Unassigned',
    dueDate: dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    progress: 0,
    tags: [category || 'General']
  };

  tasks.unshift(newTask);

  activities.unshift({
    id: Date.now(),
    action: 'Task Created',
    target: newTask.title,
    user: newTask.assignee,
    time: 'Just now',
    type: 'primary'
  });

  res.status(201).json(newTask);
});

// Update task (toggle status, edit fields)
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    ...req.body
  };

  // Auto-update progress based on status if status changed
  if (req.body.status && req.body.status !== tasks[taskIndex].status) {
    if (req.body.status === 'Completed') updatedTask.progress = 100;
    else if (req.body.status === 'Pending') updatedTask.progress = 0;
    else if (req.body.status === 'In Progress' && updatedTask.progress === 0) updatedTask.progress = 50;
  }

  tasks[taskIndex] = updatedTask;

  activities.unshift({
    id: Date.now(),
    action: `Task updated (${updatedTask.status})`,
    target: updatedTask.title,
    user: updatedTask.assignee,
    time: 'Just now',
    type: updatedTask.status === 'Completed' ? 'success' : 'info'
  });

  res.json(updatedTask);
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deleted = tasks.splice(taskIndex, 1)[0];

  activities.unshift({
    id: Date.now(),
    action: 'Task deleted',
    target: deleted.title,
    user: 'System Admin',
    time: 'Just now',
    type: 'danger'
  });

  res.json({ message: 'Task deleted successfully', task: deleted });
});

// Projects endpoint
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// Activities endpoint
app.get('/api/activity', (req, res) => {
  res.json(activities.slice(0, 10));
});

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 [BACKEND SERVER] Running on PORT: ${PORT}`);
  console.log(`📡 Health Check URL: http://localhost:${PORT}/api/health`);
  console.log(`📊 API Base URL:     http://localhost:${PORT}/api/stats`);
  console.log(`💻 Expected Client:  http://localhost:5173`);
  console.log(`===============================================`);
});
