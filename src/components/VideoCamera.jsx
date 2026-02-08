import React, { useEffect, useRef } from 'react';
import ROSLIB from 'roslib';

export function VideoCamera({ name, ros, topic = '/camera/image_raw' }) {
  const imgRef = useRef(null);

  useEffect(() => {
    if (!ros) return;

    const listener = new ROSLIB.Topic({
      ros: ros,
      name: topic,
      messageType: 'sensor_msgs/CompressedImage'
    });

    listener.subscribe((message) => {
      if (imgRef.current) {
        imgRef.current.src = `data:image/jpeg;base64,${message.data}`;
      }
    });

    return () => {
      listener.unsubscribe();
    };
  }, [ros, topic]);

  return (
    <div className="card card-dark h-100">
      <div className="card-header card-header-dark d-flex justify-content-between align-items-center">
        <span>📹 {name}</span>
        <div className="gap-2 d-flex">
          <button className="btn btn-sm btn-outline-light">📸</button>
          <button className="btn btn-sm btn-outline-light">🔄</button>
        </div>
      </div>
      <div className="camera-feed">
        <img ref={imgRef} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  );
}
