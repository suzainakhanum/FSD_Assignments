# Lab 10: Full-Stack React Bootstrap & Express Web Application

A full-stack modern task management and API dashboard application built with **React**, **React-Bootstrap**, and **Express.js**.

---

## 🚀 Features

- **Full-Stack Architecture**: Decoupled Express API server and React + Vite frontend running concurrently.
- **RESTful API**: Express endpoints for complete Task CRUD (`GET`, `POST`, `PUT`, `DELETE`), system statistics, and real-time activity logs.
- **Modern React-Bootstrap UI**:
  - **Hero Banner**: Engaging welcome header with live status and quick action triggers.
  - **Stat Metrics**: Real-time counters for Total Tasks, Completed Tasks, In-Progress Tasks, and High Priority Items.
  - **Task Manager**: Filterable and searchable task dashboard with priority tags, status badges, and action buttons.
  - **Task Modal**: Interactive Bootstrap Modal for creating and editing tasks with form validation.
  - **Activity Drawer**: Offcanvas sidebar displaying user activities and timestamps.
  - **Live API Console**: Interactive endpoint tester to query backend routes directly from the UI.
  - **Bootstrap Showcase**: Overview cards highlighting UI components and responsive layout.

---

## 📁 Project Structure

```text
lab 10/
├── client/                     # Frontend React + Vite application
│   ├── public/                 # Static assets & icons
│   ├── src/
│   │   ├── assets/             # Images and SVG icons
│   │   ├── components/         # React-Bootstrap UI components
│   │   │   ├── ActivityOffcanvas.jsx
│   │   │   ├── ApiConsole.jsx
│   │   │   ├── BootstrapShowcase.jsx
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── ProjectsView.jsx
│   │   │   ├── StatCards.jsx
│   │   │   ├── TaskManager.jsx
│   │   │   └── TaskModal.jsx
│   │   ├── App.css
│   │   ├── App.jsx             # Main layout & state coordinator
│   │   ├── index.css           # Custom styles & design tokens
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                     # Backend Express server
│   ├── package.json
│   └── server.js               # Express REST API routes & middleware
├── .gitignore
├── package.json                # Root package with concurrently runner
└── README.md
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
Run from the `lab 10` root directory:
```bash
npm install
npm install --prefix client
npm install --prefix server
```

### 2. Run Application
Run both Express server and Vite React client simultaneously:
```bash
npm run dev
```

- **Client**: `http://localhost:5173`
- **Server API**: `http://localhost:5000/api`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | Fetch all tasks (supports query filters) |
| `GET` | `/api/tasks/:id` | Fetch task by ID |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update an existing task |
| `DELETE` | `/api/tasks/:id` | Delete a task |
| `GET` | `/api/stats` | Get task counts and completion metrics |
| `GET` | `/api/activities` | Get recent activity logs |
