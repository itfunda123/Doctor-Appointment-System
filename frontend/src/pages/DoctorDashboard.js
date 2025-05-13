import React, { useEffect, useState } from 'react';
import DoctorNavbar from '../components/DoctorNavbar';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SendMessage from '../components/SendMessage';

function DoctorDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    if (!user?._id) return;

    try {
      const response = await fetch(`/api/appointments/doctor/${user._id}`);
      if (!response.ok) throw new Error('Failed to fetch appointments');
      const data = await response.json();

      console.log('Fetched appointments:', data); // 👈 Debug line added
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  return (
    <>
      <DoctorNavbar user={user} />
      <div className="container mt-4">
        <h2 className="mb-4">Welcome, Dr. {user?.name}</h2>

        <div className="row">
          <div className="col-md-4 mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Refresh Appointments</Card.Title>
                <Card.Text>Click to reload the latest patient appointments.</Card.Text>
                <Button variant="primary" className="w-100" onClick={fetchAppointments}>
                  Refresh Appointments
                </Button>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-4 mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Send Messages</Card.Title>
                <Card.Text>Use the message button next to a patient to message them.</Card.Text>
                <Button
                  variant="secondary"
                  className="w-100"
                  onClick={() => alert('Please use the message button in each appointment card.')}
                >
                  Info
                </Button>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-4 mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Set Availability</Card.Title>
                <Card.Text>Update your working schedule.</Card.Text>
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
              <div className="col-md-4 mb-4" key={appointment._id}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>{appointment.patientId?.name || 'Unnamed Patient'}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {new Date(appointment.date).toLocaleString()}
                    </Card.Subtitle>
                    <Card.Text>Status: {appointment.status}</Card.Text>

                    {appointment.status === 'pending' && (
                      <div className="d-flex justify-content-between mb-3">
                        <Button variant="success" className="me-2">Approve</Button>
                        <Button variant="danger">Reject</Button>
                      </div>
                    )}

                    <SendMessage
                      patientName={appointment.patientId?.name}
                      patientId={appointment.patientId?._id}
                      doctorId={user?._id}
                    />
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
