// DoctorNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function DoctorNavbar({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">Dr. {user?.name}</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#appointments">Appointments</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#availability">Availability</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#messages">Messages</a>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-light ms-2" onClick={() => {
                localStorage.removeItem('user');
                window.location.href = '/login';
              }}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default DoctorNavbar;
