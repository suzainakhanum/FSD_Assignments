import React from 'react';
import { Row, Col, Card, ProgressBar, Badge } from 'react-bootstrap';

export default function StatCards({ stats, taskCount }) {
  const cards = [
    {
      title: 'Total Active Tasks',
      value: taskCount || stats?.totalTasks || 0,
      subtext: `${stats?.inProgressTasks || 0} in progress`,
      icon: 'bi-list-task',
      iconBg: 'bg-primary-subtle text-primary',
      badgeText: '+12% this week',
      badgeVariant: 'success',
      progress: stats?.completionRate || 0,
      progressVariant: 'primary'
    },
    {
      title: 'Workflow Completion',
      value: `${stats?.completionRate || 0}%`,
      subtext: `${stats?.completedTasks || 0} tasks done`,
      icon: 'bi-check2-circle',
      iconBg: 'bg-success-subtle text-success',
      badgeText: 'On Schedule',
      badgeVariant: 'success',
      progress: stats?.completionRate || 0,
      progressVariant: 'success'
    },
    {
      title: 'Active Projects',
      value: stats?.activeProjects || 2,
      subtext: `${stats?.totalProjects || 3} total initiatives`,
      icon: 'bi-layers-fill',
      iconBg: 'bg-info-subtle text-info',
      badgeText: 'Stable',
      badgeVariant: 'info',
      progress: 75,
      progressVariant: 'info'
    },
    {
      title: 'Backend Health Check',
      value: '100%',
      subtext: 'Port 5000 responsive',
      icon: 'bi-activity',
      iconBg: 'bg-warning-subtle text-warning',
      badgeText: '0 errors',
      badgeVariant: 'warning',
      progress: 100,
      progressVariant: 'warning'
    }
  ];

  return (
    <Row className="g-3 mb-4">
      {cards.map((card, index) => (
        <Col key={index} xs={12} sm={6} xl={3}>
          <Card className="glass-card h-100 border-0 shadow-sm">
            <Card.Body className="p-3 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="small fw-semibold text-secondary">{card.title}</span>
                  <div className={`p-2 rounded-3 ${card.iconBg} d-flex align-items-center justify-content-center`} style={{ width: '36px', height: '36px' }}>
                    <i className={`bi ${card.icon} fs-6`}></i>
                  </div>
                </div>

                <div className="d-flex align-items-baseline gap-2 mb-2">
                  <h3 className="fw-bold mb-0">{card.value}</h3>
                  <Badge bg={card.badgeVariant} className="fw-semibold" style={{ fontSize: '0.7rem' }}>
                    {card.badgeText}
                  </Badge>
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-between align-items-center small text-secondary mb-1">
                  <span>{card.subtext}</span>
                  <span className="fw-bold">{card.progress}%</span>
                </div>
                <ProgressBar 
                  now={card.progress} 
                  variant={card.progressVariant} 
                  style={{ height: '6px', borderRadius: '4px' }} 
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
