import React, { useEffect, useState } from 'react';
import DoctorNavbar from '../components/DoctorNavbar';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SendMessage from '../components/SendMessage';

function DoctorDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/appointments/doctor/${user?.id}`);
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [user]);

  return (
    <>
      <DoctorNavbar user={user} />

      <div className="container mt-4">
        <h2 className="mb-4">Welcome, Dr. {user?.name}</h2>

        {/* Action Cards for managing appointments, messaging, and availability */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Manage Appointments</Card.Title>
                <Card.Text>View, approve, or reject patient appointments.</Card.Text>
                <Link to="/appointments">
                  <Button variant="primary" className="w-100">View Appointments</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-4 mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Send Messages</Card.Title>
                <Card.Text>Send messages to your patients about appointments.</Card.Text>
                {/* Use Button with onClick instead of Link */}
                <Button 
                  variant="secondary" 
                  className="w-100"
                  onClick={() => {
                    // This prevents navigation and does nothing for now
                    // You might want to add functionality later
                    alert("Please select a patient from the appointments below to send a message.");
                  }}
                >
                  Send Message
                </Button>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-4 mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Set Availability</Card.Title>
                <Card.Text>Set your working hours and availability for appointments.</Card.Text>
                <Link to="/availability">
                  <Button variant="info" className="w-100">Set Availability</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Display Upcoming Appointments */}
        <h3 className="mt-4">Upcoming Appointments</h3>
        <div className="row">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div className="col-md-4 mb-4" key={appointment.id}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>{appointment.patientName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {new Date(appointment.date).toLocaleString()}
                    </Card.Subtitle>
                    <Card.Text>Status: {appointment.status}</Card.Text>

                    {appointment.status === 'pending' && (
                      <div className="d-flex justify-content-between">
                        <Button variant="success" className="me-2">Approve</Button>
                        <Button variant="danger">Reject</Button>
                      </div>
                    )}

                    <div className="mt-3">
                      {/* Keep SendMessage component as is - it already has its own button and modal */}
                      <SendMessage
                        patientName={appointment.patientName}
                        patientId={appointment.patientId}
                        doctorId={user?.id}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p>No upcoming appointments</p>
          )}
        </div>
      </div>
    </>
  );
}

export default DoctorDashboard;