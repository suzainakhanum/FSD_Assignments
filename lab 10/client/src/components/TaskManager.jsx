import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Badge, 
  Form, 
  InputGroup, 
  Row, 
  Col, 
  Card, 
  ProgressBar, 
  Dropdown, 
  Spinner,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';

export default function TaskManager({ 
  tasks, 
  loading, 
  onToggleStatus, 
  onDeleteTask, 
  onEditTask, 
  onOpenCreateModal 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Filter tasks based on search and dropdowns
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || task.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPriority = priorityFilter === 'All' || task.priority.toLowerCase() === priorityFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityBadgeClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'badge-priority-high';
      case 'medium': return 'badge-priority-medium';
      default: return 'badge-priority-low';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'badge-status-completed';
      case 'in progress': return 'badge-status-inprogress';
      default: return 'badge-status-pending';
    }
  };

  return (
    <Card className="glass-card border-0 mb-4">
      <Card.Header className="bg-transparent border-bottom p-3">
        <Row className="g-2 align-items-center justify-content-between">
          <Col xs={12} lg={4}>
            <InputGroup size="sm">
              <InputGroup.Text className="bg-body-secondary border-end-0">
                <i className="bi bi-search text-secondary"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search tasks, descriptions, or assignees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-body-secondary border-start-0"
              />
              {searchTerm && (
                <Button 
                  variant="outline-secondary" 
                  size="sm" 
                  onClick={() => setSearchTerm('')}
                >
                  <i className="bi bi-x-lg"></i>
                </Button>
              )}
            </InputGroup>
          </Col>

          <Col xs={12} lg={8}>
            <div className="d-flex flex-wrap align-items-center justify-content-lg-end gap-2">
              <Form.Select 
                size="sm" 
                style={{ width: 'auto', minWidth: '130px' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Form.Select>

              <Form.Select 
                size="sm" 
                style={{ width: 'auto', minWidth: '130px' }}
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All Priorities</option>
                <option value="High">🔴 High Priority</option>
                <option value="Medium">🟠 Medium Priority</option>
                <option value="Low">🟢 Low Priority</option>
              </Form.Select>

              <Button 
                variant="primary" 
                size="sm" 
                className="d-flex align-items-center gap-1 fw-semibold px-3"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', border: 'none' }}
                onClick={onOpenCreateModal}
              >
                <i className="bi bi-plus-lg"></i>
                <span>Add Task</span>
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Header>

      <Card.Body className="p-0">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <div className="mt-2 text-secondary small">Synchronizing tasks with Server on Port 5000...</div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-5">
            <div className="display-6 text-muted mb-2"><i className="bi bi-inbox"></i></div>
            <h6 className="fw-bold">No tasks match your criteria</h6>
            <p className="text-secondary small mb-3">Try adjusting your search query or filters.</p>
            <Button variant="outline-primary" size="sm" onClick={() => { setSearchTerm(''); setStatusFilter('All'); setPriorityFilter('All'); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover className="modern-table mb-0 align-middle">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>#</th>
                  <th>Task & Category</th>
                  <th>Assignee</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Progress</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id}>
                    <td>
                      <Form.Check 
                        type="checkbox"
                        checked={task.status === 'Completed'}
                        onChange={() => onToggleStatus(task)}
                        title="Mark Completed"
                      />
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <div className="d-flex align-items-center gap-2">
                          <span className={`fw-bold ${task.status === 'Completed' ? 'text-decoration-line-through text-secondary' : ''}`}>
                            {task.title}
                          </span>
                          <Badge bg="secondary-subtle" className="text-secondary border" style={{ fontSize: '0.65rem' }}>
                            {task.id}
                          </Badge>
                        </div>
                        <div className="d-flex align-items-center gap-2 mt-1">
                          <Badge bg="light" className="text-dark border" style={{ fontSize: '0.7rem' }}>
                            <i className="bi bi-tag me-1 text-primary"></i>{task.category || 'General'}
                          </Badge>
                          <small className="text-secondary text-truncate" style={{ maxWidth: '280px' }}>
                            {task.description}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div 
                          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                          style={{ width: '28px', height: '28px', fontSize: '0.75rem' }}
                        >
                          {task.assignee ? task.assignee.charAt(0).toUpperCase() : '?'}
                        </div>
                        <span className="small fw-semibold">{task.assignee || 'Unassigned'}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge-status ${getPriorityBadgeClass(task.priority)}`}>
                        <i className="bi bi-circle-fill" style={{ fontSize: '0.45rem' }}></i>
                        {task.priority}
                      </span>
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle 
                          as="button" 
                          className={`btn p-0 border-0 ${getStatusBadgeClass(task.status)}`}
                          style={{ cursor: 'pointer' }}
                        >
                          <i className={`bi ${task.status === 'Completed' ? 'bi-check-circle-fill' : task.status === 'In Progress' ? 'bi-arrow-repeat' : 'bi-hourglass-split'}`}></i>
                          <span>{task.status}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu size="sm">
                          <Dropdown.Item onClick={() => onToggleStatus(task, 'Pending')}>
                            <i className="bi bi-hourglass text-warning me-2"></i> Pending
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => onToggleStatus(task, 'In Progress')}>
                            <i className="bi bi-arrow-repeat text-primary me-2"></i> In Progress
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => onToggleStatus(task, 'Completed')}>
                            <i className="bi bi-check-circle text-success me-2"></i> Completed
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td>
                      <span className="small text-secondary font-monospace">
                        <i className="bi bi-calendar3 me-1"></i>
                        {task.dueDate || 'No Date'}
                      </span>
                    </td>
                    <td style={{ width: '120px' }}>
                      <div className="d-flex align-items-center gap-2">
                        <ProgressBar 
                          now={task.progress || (task.status === 'Completed' ? 100 : task.status === 'In Progress' ? 50 : 0)} 
                          variant={task.status === 'Completed' ? 'success' : task.status === 'In Progress' ? 'primary' : 'warning'}
                          style={{ height: '6px', width: '65px', borderRadius: '4px' }} 
                        />
                        <span className="small text-secondary font-monospace" style={{ fontSize: '0.75rem' }}>
                          {task.progress || (task.status === 'Completed' ? 100 : task.status === 'In Progress' ? 50 : 0)}%
                        </span>
                      </div>
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-1">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Edit Task</Tooltip>}>
                          <Button 
                            variant="outline-secondary" 
                            size="sm" 
                            className="p-1 px-2"
                            onClick={() => onEditTask(task)}
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                        </OverlayTrigger>

                        <OverlayTrigger placement="top" overlay={<Tooltip>Delete Task</Tooltip>}>
                          <Button 
                            variant="outline-danger" 
                            size="sm" 
                            className="p-1 px-2"
                            onClick={() => onDeleteTask(task.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>

      <Card.Footer className="bg-transparent border-top p-3 d-flex justify-content-between align-items-center small text-secondary">
        <span>Showing {filteredTasks.length} of {tasks.length} total tasks</span>
        <span>
          <i className="bi bi-hdd-network me-1 text-info"></i> Direct REST sync with <code>http://localhost:5000/api/tasks</code>
        </span>
      </Card.Footer>
    </Card>
  );
}
