import React from 'react';

export function MapView() {
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
