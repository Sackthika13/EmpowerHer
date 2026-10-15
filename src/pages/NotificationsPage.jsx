import React, { useState } from 'react';
import { 
  Bell, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw, 
  Check, 
  ArrowRight 
} from 'lucide-react';

const NotificationsPage = ({ notifications, setNotifications }) => {
  const [activeTab, setActiveTab] = useState('all');

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredNotifs = notifications.filter(n => {
    if (activeTab === 'deadline') return n.type === 'deadline';
    if (activeTab === 'update') return n.type === 'update';
    if (activeTab === 'alert') return n.type === 'alert';
    return true;
  });

  return (
    <div className="notifications-page-container">
      <div className="page-header-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Notifications & Deadline Alerts</h2>
          <p className="subtitle-text">Stay updated on scheme application deadlines and status changes.</p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={markAllRead}>
          <Check size={14} /> Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="filter-panel-card glass-card" style={{ marginBottom: '24px' }}>
        <div className="category-tabs">
          <button className={`cat-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
            All Notifications ({notifications.length})
          </button>
          <button className={`cat-tab ${activeTab === 'deadline' ? 'active' : ''}`} onClick={() => setActiveTab('deadline')}>
            Deadline Reminders
          </button>
          <button className={`cat-tab ${activeTab === 'update' ? 'active' : ''}`} onClick={() => setActiveTab('update')}>
            Application Updates
          </button>
          <button className={`cat-tab ${activeTab === 'alert' ? 'active' : ''}`} onClick={() => setActiveTab('alert')}>
            New Alerts
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="applications-grid">
        {filteredNotifs.map((notif) => (
          <div key={notif.id} className={`notif-item-card glass-card ${notif.read ? 'read' : 'unread'}`} style={{ padding: '20px' }}>
            <div className="notif-icon-wrap" style={{ fontSize: '1.2rem' }}>
              {notif.type === 'deadline' ? <Clock size={20} color="#e63946" /> : notif.type === 'update' ? <CheckCircle2 size={20} color="#2ec4b6" /> : <Sparkles size={20} color="var(--primary)" />}
            </div>

            <div className="notif-content" style={{ flex: 1 }}>
              <div className="notif-top-row">
                <strong style={{ fontSize: '1rem' }}>{notif.title}</strong>
                <span className="notif-time">{notif.time}</span>
              </div>
              <p style={{ margin: '6px 0 10px', fontSize: '0.9rem', color: '#555' }}>{notif.message}</p>

              <div className="notif-actions">
                <span className="notif-category-tag">{notif.type.toUpperCase()}</span>
                <span style={{ fontSize: '0.8rem', color: '#888' }}>{notif.read ? 'Read' : 'Unread'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
