import React from 'react';

export function Navbar({ isConnected, setIsConnected }) {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg sticky-top">
      <div className="container-fluid">
        <span
          className="material-icons me-2"
          style={{ fontSize: '2rem', color: '#1e88e5' }}
        >
          precision_manufacturing
        </span>
        <span className="navbar-brand">Deakin Rover Mission Control</span>
        <div className="ms-auto d-flex gap-2 align-items-center">
          <small className="text-muted">Sarah Patel</small>
          <button
            className="btn btn-sm btn-primary-custom"
            onClick={() => setIsConnected(!isConnected)}
          >
            {isConnected ? '✓ Connected' : '🔗 Connect'}
          </button>
          <button className="btn btn-sm btn-danger">⚠ E-STOP</button>
        </div>
      </div>
    </nav>
  );
}
