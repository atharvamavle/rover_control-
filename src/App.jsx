import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { 
  Navbar, 
  Sidebar, 
  VideoCamera, 
  GamepadControl, 
  MapView 
} from './components';
import { useRos } from './hooks/useRos';

function App() {
  const [activeItem, setActiveItem] = useState('overview');
  const { ros, connected } = useRos('ws://192.168.1.100:9090'); //replace with actual rover IP, this connects to Ros Bridge on Rover

  return (
    <>
      <Navbar isConnected={connected} setIsConnected={() => {}} />
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="main-container">
        <div className="row g-3 mb-3">
          <div className="col-lg-4">
            <VideoCamera name="Front Camera" ros={ros} topic="/front_camera/image_raw" />
          </div>
          <div className="col-lg-4">
            <VideoCamera name="Arm Camera" ros={ros} topic="/arm_camera/image_raw" />
          </div>
          <div className="col-lg-4">
            <VideoCamera name="Side Camera" ros={ros} topic="/side_camera/image_raw" />
          </div>
        </div>

        <div className="row g-3">
          <div className="col-lg-6">
            <MapView ros={ros} />
            <GamepadControl ros={ros} />
          </div>

          <div className="col-lg-6">
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
