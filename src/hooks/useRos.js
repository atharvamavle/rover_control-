import { useState, useEffect } from 'react';
import ROSLIB from 'roslib';

export function useRos(rosUrl = 'ws://localhost:9090') {
  const [ros, setRos] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const rosInstance = new ROSLIB.Ros({
      url: rosUrl
    });

    rosInstance.on('connection', () => {
      console.log('✅ Connected to ROS Bridge');
      setConnected(true);
    });

    rosInstance.on('error', (error) => {
      console.error('❌ ROS Bridge Error:', error);
      setConnected(false);
    });

    rosInstance.on('close', () => {
      console.log('🔌 ROS Bridge Disconnected');
      setConnected(false);
    });

    setRos(rosInstance);

    return () => {
      rosInstance.close();
    };
  }, [rosUrl]);

  return { ros, connected };
}
