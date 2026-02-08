import React, { useState, useEffect } from 'react';
import ROSLIB from 'roslib';

export function GamepadControl({ ros }) {
  const [speed, setSpeed] = useState(65);
  const [leftStick, setLeftStick] = useState({ x: 0, y: 0 });
  const [cmdVelTopic, setCmdVelTopic] = useState(null);

  // Initialize ROS topic for velocity commands
  useEffect(() => {
    if (!ros) return;

    const topic = new ROSLIB.Topic({
      ros: ros,
      name: '/cmd_vel',
      messageType: 'geometry_msgs/Twist'
    });

    setCmdVelTopic(topic);

    return () => {
      topic.unadvertise();
    };
  }, [ros]);

  // Publish velocity commands when joystick moves
  useEffect(() => {
    if (!cmdVelTopic) return;

    const twist = new ROSLIB.Message({
      linear: { 
        x: -leftStick.y * (speed / 100), 
        y: 0, 
        z: 0 
      },
      angular: { 
        x: 0, 
        y: 0, 
        z: leftStick.x * (speed / 100) 
      }
    });

    cmdVelTopic.publish(twist);
  }, [leftStick, speed, cmdVelTopic]);

  const handleStickMove = (stick, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    
    setLeftStick({
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
