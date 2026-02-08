import React from 'react';

export function Sidebar({ activeItem, setActiveItem }) {
  const items = [
    { id: 'overview', icon: 'dashboard', label: 'Overview' },
    { id: 'missions', icon: 'videocam', label: 'Missions' },
    { id: 'commands', icon: 'terminal', label: 'Commands' },
  ];

  return (
    <div className="sidebar-nav">
      {items.map((item) => (
        <button
          key={item.id}
          className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
          onClick={() => setActiveItem(item.id)}
        >
          <span className="material-icons">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
