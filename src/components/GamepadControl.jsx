import React, { useState } from 'react';

export function GamepadControl() {
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
