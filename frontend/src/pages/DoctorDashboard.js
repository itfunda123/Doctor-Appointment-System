import React, { useEffect, useState } from 'react';
import DoctorNavbar from '../components/DoctorNavbar';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SendMessage from '../components/SendMessage';

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load doctor user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('Doctor loaded from localStorage:', parsedUser);
        setUser(parsedUser);
        if (parsedUser._id) {
          fetchAppointments(parsedUser._id);
        }
      } catch (err) {
        console.error('Error parsing user from localStorage:', err);
      }
    }
  }, []);

  const fetchAppointments = async (doctorId) => {
    try {
      console.log('Fetching appointments for doctor ID:', doctorId);
      const response = await fetch(`/api/appointments/doctor/${doctorId}`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      console.log('Appointments fetched:', data);
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
    }
  };

  const handleRefresh = () => {
    if (user?._id) {
      fetchAppointments(user._id);
    }
  };

  return (
    <>
      <DoctorNavbar user={user} />

      <div className="container mt-4">
        <h2 className="mb-4">Welcome, Dr. {user?.name || '...'}</h2>

        <div className="row">
          <div className="col-md-4 mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Refresh Appointments</Card.Title>
                <Card.Text>Click to reload your appointments.</Card.Text>
                <Button variant="primary" className="w-100" onClick={handleRefresh}>
                  Refresh Appointments
                </Button>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-4 mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Send Messages</Card.Title>
                <Card.Text>Send messages to your patients.</Card.Text>
                <Button
                  variant="secondary"
                  className="w-100"
                  onClick={() => alert('Select a patient from appointments to message.')}
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
                <Card.Text>Manage your availability schedule.</Card.Text>
                <Link to="/availability">
                  <Button variant="info" className="w-100">
                    Set Availability
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Display Appointments */}
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
                      <div className="d-flex justify-content-between">
                        <Button variant="success" className="me-2">Approve</Button>
                        <Button variant="danger">Reject</Button>
                      </div>
                    )}

                    <div className="mt-3">
                      <SendMessage
                        patientName={appointment.patientId?.name}
                        patientId={appointment.patientId?._id}
                        doctorId={user?._id}
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
