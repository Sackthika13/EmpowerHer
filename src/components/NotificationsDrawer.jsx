import React, { useState } from 'react';
import { 
  Bell, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw, 
  X, 
  Check, 
  ArrowRight,
  AlertTriangle
} from 'lucide-react';

const NotificationsDrawer = ({ isOpen, onClose, notifications, setNotifications, onSelectScheme }) => {
  const [activeTab, setActiveTab] = useState('all');

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredNotifs = notifications.filter(n => {
    if (activeTab === 'deadline') return n.type === 'deadline';
    if (activeTab === 'update') return n.type === 'update';
    if (activeTab === 'alert') return n.type === 'alert';
    if (activeTab === 'renewal') return n.type === 'renewal';
    return true;
  });

  const getIconForType = (type) => {
    switch (type) {
      case 'deadline': return <Clock size={16} color="#e63946" />;
      case 'update': return <CheckCircle2 size={16} color="#2ec4b6" />;
      case 'alert': return <Sparkles size={16} color="#ff4d6d" />;
      case 'renewal': return <RefreshCw size={16} color="#7012ce" />;
      default: return <Bell size={16} color="var(--primary)" />;
    }
  };

  return (
    <div className="drawer-overlay">
      <div className="notifications-drawer glass-card">
        <div className="drawer-header">
          <div className="title-with-icon">
            <Bell size={20} color="var(--primary)" />
            <div>
              <h3 style={{ margin: 0 }}>Reminders & Notifications</h3>
              <span className="sub-text">Updates on Deadlines, Applications & New Schemes</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button className="text-link-btn" onClick={markAllAsRead}>Mark all read</button>
            <button className="icon-mini-btn" onClick={onClose} style={{ background: '#f0f0f0' }}>
              <X size={16} color="#333" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="drawer-tabs">
          <button className={`drawer-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
            All ({notifications.length})
          </button>
          <button className={`drawer-tab ${activeTab === 'deadline' ? 'active' : ''}`} onClick={() => setActiveTab('deadline')}>
            Deadlines
          </button>
          <button className={`drawer-tab ${activeTab === 'update' ? 'active' : ''}`} onClick={() => setActiveTab('update')}>
            App Updates
          </button>
          <button className={`drawer-tab ${activeTab === 'alert' ? 'active' : ''}`} onClick={() => setActiveTab('alert')}>
            New Alerts
          </button>
          <button className={`drawer-tab ${activeTab === 'renewal' ? 'active' : ''}`} onClick={() => setActiveTab('renewal')}>
            Renewals
          </button>
        </div>

        {/* List of Notifications */}
        <div className="drawer-body">
          {filteredNotifs.length === 0 ? (
            <div className="empty-notif text-center" style={{ padding: '40px 20px' }}>
              <Bell size={36} color="#ccc" />
              <p style={{ color: '#666', marginTop: '10px' }}>No notifications found in this category.</p>
            </div>
          ) : (
            filteredNotifs.map((notif) => (
              <div 
                key={notif.id} 
                className={`notif-item-card ${notif.read ? 'read' : 'unread'}`}
              >
                <div className="notif-icon-wrap">
                  {getIconForType(notif.type)}
                </div>

                <div className="notif-content">
                  <div className="notif-top-row">
                    <strong className="notif-title">{notif.title}</strong>
                    <span className="notif-time">{notif.time}</span>
                  </div>

                  <p className="notif-desc">{notif.message}</p>

                  <div className="notif-actions">
                    <span className="notif-category-tag">{notif.type.toUpperCase()}</span>
                    <button 
                      className="btn-text-action"
                      onClick={() => {
                        onClose();
                        if (onSelectScheme) onSelectScheme();
                      }}
                    >
                      Action Now <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsDrawer;
