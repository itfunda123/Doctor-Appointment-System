import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import PatientNavbar from '../components/PatientNavbar';

function PatientDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <PatientNavbar />

      <div className="container mt-4">
        <h2 className="mb-4">Welcome, {user?.name}</h2>

        <div className="row">
          <div className="col-md-4">
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>Book Appointment</Card.Title>
                <Card.Text>Schedule a new consultation with your preferred doctor.</Card.Text>
                <Link to="/book">
                  <Button variant="primary">Book Now</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-4">
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>Appointment History</Card.Title>
                <Card.Text>Review your past and upcoming appointments.</Card.Text>
                <Link to="/appointments">
                  <Button variant="secondary">View History</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-4">
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>Notifications</Card.Title>
                <Card.Text>Check updates or messages from your doctors.</Card.Text>
                <Link to="/notifications">
                  <Button variant="info">View Notifications</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientDashboard;
