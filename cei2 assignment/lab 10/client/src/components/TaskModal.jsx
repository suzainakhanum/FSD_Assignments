import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';

export default function TaskModal({ show, onHide, onSave, taskToEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Frontend',
    priority: 'Medium',
    status: 'Pending',
    assignee: '',
    dueDate: ''
  });

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        category: taskToEdit.category || 'Frontend',
        priority: taskToEdit.priority || 'Medium',
        status: taskToEdit.status || 'Pending',
        assignee: taskToEdit.assignee || '',
        dueDate: taskToEdit.dueDate || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Frontend',
        priority: 'Medium',
        status: 'Pending',
        assignee: '',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
    }
    setValidated(false);
  }, [taskToEdit, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    onSave(formData, taskToEdit?.id);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title className="fw-bold d-flex align-items-center gap-2 fs-5">
          <div className="p-2 rounded-3 bg-primary-subtle text-primary">
            <i className={`bi ${taskToEdit ? 'bi-pencil-square' : 'bi-plus-circle'}`}></i>
          </div>
          <span>{taskToEdit ? 'Edit Task Specifications' : 'Create New Development Task'}</span>
        </Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body className="py-4">
          <Row className="g-3">
            <Col xs={12}>
              <Form.Group controlId="taskTitle">
                <Form.Label className="fw-semibold small">Task Title *</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text><i className="bi bi-card-heading"></i></InputGroup.Text>
                  <Form.Control
                    type="text"
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Implement React-Bootstrap Offcanvas Drawer"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a descriptive title.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="taskCategory">
                <Form.Label className="fw-semibold small">Category</Form.Label>
                <Form.Select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                >
                  <option value="Frontend">Frontend (React-Bootstrap)</option>
                  <option value="Backend">Backend (Express / Port 5000)</option>
                  <option value="DevOps">DevOps & Runtime Ports</option>
                  <option value="Analytics">Analytics & Metrics</option>
                  <option value="QA & Testing">QA & Testing</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="taskPriority">
                <Form.Label className="fw-semibold small">Priority Level</Form.Label>
                <Form.Select 
                  name="priority" 
                  value={formData.priority} 
                  onChange={handleChange}
                >
                  <option value="Low">🟢 Low Priority</option>
                  <option value="Medium">🟠 Medium Priority</option>
                  <option value="High">🔴 High Priority</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="taskAssignee">
                <Form.Label className="fw-semibold small">Lead Assignee</Form.Label>
                <InputGroup>
                  <InputGroup.Text><i className="bi bi-person"></i></InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="assignee"
                    value={formData.assignee}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Connor"
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="taskDueDate">
                <Form.Label className="fw-semibold small">Due Date</Form.Label>
                <InputGroup>
                  <InputGroup.Text><i className="bi bi-calendar-event"></i></InputGroup.Text>
                  <Form.Control
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            {taskToEdit && (
              <Col xs={12} md={6}>
                <Form.Group controlId="taskStatus">
                  <Form.Label className="fw-semibold small">Status</Form.Label>
                  <Form.Select 
                    name="status" 
                    value={formData.status} 
                    onChange={handleChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            )}

            <Col xs={12}>
              <Form.Group controlId="taskDescription">
                <Form.Label className="fw-semibold small">Description & Acceptance Criteria</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide clear requirements, component specs, and expected outcomes..."
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="border-top">
          <Button variant="outline-secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit" 
            className="d-flex align-items-center gap-2 fw-semibold px-4"
            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', border: 'none' }}
          >
            <i className="bi bi-check-lg"></i>
            <span>{taskToEdit ? 'Save Changes' : 'Create Task'}</span>
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
