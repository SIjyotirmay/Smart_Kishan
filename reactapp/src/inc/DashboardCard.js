import React from 'react';
import './DashboardCard.css';

function DashboardCard({ title, description, icon: Icon, stats, onClick }) {
  return (
    <div className="dashboard-card" onClick={onClick}>
      <div className="dashboard-icon">
        <Icon className="dashboard-icon-inner" />
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
      <div className="dashboard-stats">{stats}</div>
    </div>
  );
}

export default DashboardCard;
