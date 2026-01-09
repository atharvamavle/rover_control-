import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Navbar Component
function Navbar({ isConnected, setIsConnected }) {
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

// Sidebar Component
function Sidebar({ activeItem, setActiveItem }) {
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

// Video Camera Component
function VideoCamera({ name }) {
  return (
    <div className="card card-dark h-100">
      <div className="card-header card-header-dark d-flex justify-content-between align-items-center">
        <span>📹 {name}</span>
        <div className="gap-2 d-flex">
          <button className="btn btn-sm btn-outline-light">📸</button>
          <button className="btn btn-sm btn-outline-light">🔄</button>
        </div>
      </div>
      <div className="camera-feed">🎥 WebRTC Stream</div>
    </div>
  );
}

// Compass Gauge Component
function CompassGauge({ label, value }) {
  const rotation = value % 360;
  return (
    <div className="compass-gauge">
      <div className="compass-label">{label}</div>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="rgba(30, 136, 229, 0.05)"
          stroke="#1e88e5"
          strokeWidth="1.5"
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 50 + 40 * Math.cos(rad - Math.PI / 2);
          const y1 = 50 + 40 * Math.sin(rad - Math.PI / 2);
          const x2 = 50 + 45 * Math.cos(rad - Math.PI / 2);
          const y2 = 50 + 45 * Math.sin(rad - Math.PI / 2);
          return (
            <line
              key={deg}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#1e88e5"
              strokeWidth="1"
            />
          );
        })}
        <g transform={`rotate(${rotation} 50 50)`}>
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="15"
            stroke="#1e88e5"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="3" fill="#1e88e5" />
        </g>
        <circle cx="50" cy="50" r="3.5" fill="#1e88e5" />
      </svg>
      <div className="compass-value">{rotation.toFixed(1)}°</div>
    </div>
  );
}

// Speed Gauge Component
function SpeedGauge({ wheelName, speed }) {
  return (
    <div className="text-center">
      <small className="text-muted d-block mb-2">{wheelName}</small>
      <svg viewBox="0 0 100 100" style={{ width: '70px', height: '70px' }}>
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="rgba(30, 136, 229, 0.05)"
          stroke="#1e88e5"
          strokeWidth="2"
        />
        {[0, 30, 60, 90, 120, 150].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 50 + 35 * Math.cos(rad - Math.PI / 2);
          const y1 = 50 + 35 * Math.sin(rad - Math.PI / 2);
          const x2 = 50 + 40 * Math.cos(rad - Math.PI / 2);
          const y2 = 50 + 40 * Math.sin(rad - Math.PI / 2);
          return (
            <line
              key={deg}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#1e88e5"
              strokeWidth="1"
            />
          );
        })}
        <g transform={`rotate(${speed * 1.5} 50 50)`}>
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="20"
            stroke="#4caf50"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="3" fill="#4caf50" />
        </g>
      </svg>
      <div className="text-primary fw-bold small mt-2">{speed}%</div>
    </div>
  );
}

// Gamepad Control Component
function GamepadControl() {
  const [speed, setSpeed] = useState(65);
  const [leftStick, setLeftStick] = useState({ x: 0, y: 0 });
  const [rightStick, setRightStick] = useState({ x: 0, y: 0 });

  const handleStickMove = (stick, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    if (stick === 'left')
      setLeftStick({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    else
      setRightStick({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
  };

  return (
    <div className="card card-dark">
      <div className="card-header card-header-dark">
        🎮 Gamepad Control (PS4)
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-around gap-3 mb-3">
          <div>
            <small className="text-muted d-block mb-2">Move</small>
            <div
              className="analog-stick"
              onMouseMove={(e) => handleStickMove('left', e)}
            >
              <div
                className="stick-indicator"
                style={{
                  left: `${(leftStick.x + 1) * 50}%`,
                  top: `${(leftStick.y + 1) * 50}%`,
                }}
              />
            </div>
          </div>
          <div>
            <small className="text-muted d-block mb-2">Rotate</small>
            <div
              className="analog-stick"
              onMouseMove={(e) => handleStickMove('right', e)}
            >
              <div
                className="stick-indicator"
                style={{
                  left: `${(rightStick.x + 1) * 50}%`,
                  top: `${(rightStick.y + 1) * 50}%`,
                }}
              />
            </div>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="d-flex justify-content-between mb-2">
          <small className="text-muted">Max Speed</small>
          <small className="text-primary fw-bold">{speed}%</small>
        </div>
        <input
          type="range"
          className="form-range"
          min="0"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />
      </div>
    </div>
  );
}

// Navigation Map Component
function MapView() {
  const markers = [
    { id: 1, x: 25, y: 30, type: 'waypoint' },
    { id: 2, x: 60, y: 50, type: 'sample' },
    { id: 3, x: 75, y: 25, type: 'objective' },
  ];

  return (
    <div className="card card-dark mb-3">
      <div className="card-header card-header-dark">Navigation Map</div>
      <div className="card-body">
        <div className="map-container">
          <span className="map-label">Satellite View</span>
          <svg
            style={{ width: '100%', height: '100%', position: 'absolute' }}
            viewBox="0 0 100 100"
          >
            {[...Array(10)].map((_, i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={i * 10}
                x2="100"
                y2={i * 10}
                stroke="rgba(30, 136, 229, 0.1)"
                strokeWidth="0.5"
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * 10}
                y1="0"
                x2={i * 10}
                y2="100"
                stroke="rgba(30, 136, 229, 0.1)"
                strokeWidth="0.5"
              />
            ))}
            {markers.map((marker) => (
              <g key={marker.id}>
                <circle
                  cx={marker.x}
                  cy={marker.y}
                  r="2.5"
                  fill={
                    marker.type === 'waypoint'
                      ? '#1e88e5'
                      : marker.type === 'sample'
                      ? '#ff9800'
                      : '#f44336'
                  }
                  opacity="0.8"
                />
                <circle
                  cx={marker.x}
                  cy={marker.y}
                  r="4"
                  fill="none"
                  stroke={
                    marker.type === 'waypoint'
                      ? '#1e88e5'
                      : marker.type === 'sample'
                      ? '#ff9800'
                      : '#f44336'
                  }
                  strokeWidth="1"
                  opacity="0.5"
                />
              </g>
            ))}
            <circle cx="50" cy="50" r="2" fill="#4caf50" />
            <path
              d="M 50 50 L 52 45"
              stroke="#4caf50"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-outline-primary btn-sm flex-grow-1">
            ⬜ Add Waypoint
          </button>
          <button className="btn btn-outline-danger btn-sm flex-grow-1">
            🚩 Resume
          </button>
          <button className="btn btn-outline-warning btn-sm flex-grow-1">
            ⏸ Calculate
          </button>
          <button className="btn btn-outline-success btn-sm flex-grow-1">
            ✓ Set Route
          </button>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [activeItem, setActiveItem] = useState('overview');
  const [isConnected, setIsConnected] = useState(false);
  const wheelSpeeds = { fl: 45, fr: 48, bl: 42, br: 46 };

  return (
    <>
      <Navbar isConnected={isConnected} setIsConnected={setIsConnected} />
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="main-container">
        <div className="row g-3 mb-3">
          <div className="col-lg-4">
            <VideoCamera name="Front Camera" />
          </div>
          <div className="col-lg-4">
            <VideoCamera name="Arm Camera" />
          </div>
          <div className="col-lg-4">
            <VideoCamera name="Side Camera" />
          </div>
        </div>

        <div className="row g-3">
          <div className="col-lg-6">
            <MapView />
            <GamepadControl />
          </div>

          <div className="col-lg-3">
            <div className="card card-dark mb-3">
              <div className="card-header card-header-dark">
                ✈ Orientation Indicators
              </div>
              <div className="card-body d-flex justify-content-around flex-wrap gap-3">
                <CompassGauge label="Roll" value={12} />
                <CompassGauge label="Pitch" value={8} />
                <CompassGauge label="Yaw" value={245} />
              </div>
            </div>

            <div className="card card-dark">
              <div className="card-header card-header-dark">
                ⚙ Wheel Speed Gauges
              </div>
              <div className="card-body">
                <div className="row g-2">
                  <div className="col-6">
                    <SpeedGauge wheelName="Front Left" speed={wheelSpeeds.fl} />
                  </div>
                  <div className="col-6">
                    <SpeedGauge
                      wheelName="Front Right"
                      speed={wheelSpeeds.fr}
                    />
                  </div>
                  <div className="col-6">
                    <SpeedGauge wheelName="Back Left" speed={wheelSpeeds.bl} />
                  </div>
                  <div className="col-6">
                    <SpeedGauge wheelName="Back Right" speed={wheelSpeeds.br} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card card-dark mb-3">
              <div className="card-header card-header-dark">
                🚀 Task Controls
              </div>
              <div className="card-body d-flex flex-column gap-2">
                <button className="btn btn-success btn-sm">▶ Start Nav</button>
                <button className="btn btn-warning btn-sm">⏸ Pause</button>
                <button className="btn btn-danger btn-sm">⏹ Stop</button>
                <button className="btn btn-primary btn-sm">🔧 Calibrate</button>
              </div>
            </div>

            <div className="card card-dark mb-3">
              <div className="card-header card-header-dark">
                🔴 Beacon Control
              </div>
              <div className="card-body">
                <input
                  type="color"
                  className="form-control form-control-color mb-2"
                  defaultValue="#1e88e5"
                />
                <select className="form-select form-select-sm">
                  <option>Standby (Off)</option>
                  <option>Autonomous (Blue Flash)</option>
                  <option>Error (Red)</option>
                  <option>Active (Green)</option>
                </select>
              </div>
            </div>

            <div className="card card-dark">
              <div className="card-header card-header-dark">
                System Settings
              </div>
              <div className="card-body" style={{ fontSize: '0.85rem' }}>
                <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                  <small className="text-muted">Type</small>
                  <small className="text-primary fw-bold">Wheeled Rover</small>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                  <small className="text-muted">Modified</small>
                  <small className="text-primary fw-bold">2025-01-15</small>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                  <small className="text-muted">Status</small>
                  <small style={{ color: '#4caf50', fontWeight: 'bold' }}>
                    Connected
                  </small>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                  <small className="text-muted">Battery</small>
                  <small className="text-primary fw-bold">87.5%</small>
                </div>
                <div className="d-flex justify-content-between">
                  <small className="text-muted">Uptime</small>
                  <small className="text-primary fw-bold">5h 42m</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
