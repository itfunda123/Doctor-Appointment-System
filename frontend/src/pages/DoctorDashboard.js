import React, { useEffect, useState } from 'react';
import DoctorNavbar from '../components/DoctorNavbar';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DoctorDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState({});  // Store messages for each patient

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

  const handleSendMessage = async (patientId, modalId) => {
    const messageContent = messages[patientId];

    if (!messageContent) {
      console.error('No message content provided');
      return;
    }

    try {
      const newMessage = {
        patientId,
        doctorId: user?.id,
        content: messageContent,
        timestamp: new Date(),
      };

      const response = await fetch(`/api/messages/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      });

      if (response.ok) {
        // After message is sent, clear the message state for that patient
        setMessages((prevMessages) => {
          const updatedMessages = { ...prevMessages };
          delete updatedMessages[patientId]; // Clear message after sending
          return updatedMessages;
        });
        // Close the modal after sending the message
        const modal = document.getElementById(modalId);
        if (modal) {
          const modalInstance = new window.bootstrap.Modal(modal);
          modalInstance.hide();
        }
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

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
                <Link to="/messages">
                  <Button variant="secondary" className="w-100">Send Message</Button>
                </Link>
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

                    <Button
                      variant="info"
                      className="mt-2"
                      data-bs-toggle="modal"
                      data-bs-target={`#messageModal-${appointment.id}`}
                    >
                      Message Patient
                    </Button>
                  </Card.Body>
                </Card>

                {/* Message Modal */}
                <div
                  className="modal fade"
                  id={`messageModal-${appointment.id}`}
                  tabIndex="-1"
                  aria-labelledby="messageModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="messageModalLabel">Send Message to {appointment.patientName}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <textarea
                          className="form-control"
                          rows="4"
                          value={messages[appointment.patientId] || ''}
                          onChange={(e) => setMessages((prevMessages) => ({
                            ...prevMessages,
                            [appointment.patientId]: e.target.value,
                          }))}
                          placeholder="Type your message here..."
                        />
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleSendMessage(appointment.patientId, `messageModal-${appointment.id}`)}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
