import React from 'react';

export function VideoCamera({ name }) {
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
