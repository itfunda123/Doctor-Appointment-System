import React, { useEffect, useState } from 'react';
import DoctorNavbar from '../components/DoctorNavbar';
import { Card } from 'react-bootstrap';

function DoctorDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [availability, setAvailability] = useState({});
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);

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

  const handleApprove = async (appointmentId) => {
    try {
      await fetch(`/api/appointments/approve/${appointmentId}`, { method: 'POST' });
      setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
    } catch (error) {
      console.error('Error approving appointment:', error);
    }
  };

  const handleReject = async (appointmentId) => {
    try {
      await fetch(`/api/appointments/reject/${appointmentId}`, { method: 'POST' });
      setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
    } catch (error) {
      console.error('Error rejecting appointment:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleAvailabilityChange = (e) => {
    setAvailability({
      ...availability,
      [e.target.name]: e.target.value,
    });
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (patientId) => {
    try {
      const newMessage = {
        patientId,
        doctorId: user?.id,
        content: message,
        timestamp: new Date(),
      };

      const response = await fetch(`/api/messages/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      });

      if (response.ok) {
        setSentMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage('');
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
        <h2 className="mb-4 text-center">Welcome Dr. {user?.name}</h2>

        <div className="row mb-4">
          <div className="col-md-4">
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>Manage Availability</Card.Title>
                <form>
                  <label>From:</label>
                  <input
                    type="time"
                    name="start"
                    value={availability.start || ''}
                    onChange={handleAvailabilityChange}
                    className="form-control mb-2"
                  />
                  <label>Until:</label>
                  <input
                    type="time"
                    name="end"
                    value={availability.end || ''}
                    onChange={handleAvailabilityChange}
                    className="form-control mb-2"
                  />
                  <button className="btn btn-primary w-100">Save</button>
                </form>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-8">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Search Appointments</Card.Title>
                <input
                  type="text"
                  placeholder="Search by patient name..."
                  onChange={handleSearchChange}
                  className="form-control"
                />
              </Card.Body>
            </Card>
          </div>
        </div>

        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>Upcoming Appointments</Card.Title>
            <table className="table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {appointments.filter(appt => appt.patientName.toLowerCase().includes(searchTerm)).length > 0 ? (
                  appointments.filter(appt => appt.patientName.toLowerCase().includes(searchTerm)).map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.patientName}</td>
                      <td>{new Date(appointment.date).toLocaleString()}</td>
                      <td>{appointment.status}</td>
                      <td>
                        {appointment.status === 'Pending' && (
                          <>
                            <button className="btn btn-success me-2" onClick={() => handleApprove(appointment.id)}>Approve</button>
                            <button className="btn btn-danger" onClick={() => handleReject(appointment.id)}>Reject</button>
                          </>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-info"
                          data-bs-toggle="modal"
                          data-bs-target={`#messageModal-${appointment.id}`}
                        >
                          Message
                        </button>

                        <div className="modal fade" id={`messageModal-${appointment.id}`} tabIndex="-1">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">Send Message to {appointment.patientName}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                              </div>
                              <div className="modal-body">
                                <textarea
                                  className="form-control"
                                  rows="4"
                                  value={message}
                                  onChange={handleMessageChange}
                                  placeholder="Type your message here..."
                                />
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => handleSendMessage(appointment.patientId)}>
                                  Send
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No appointments available or no match found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card.Body>
        </Card>

        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Sent Messages</Card.Title>
            <ul className="list-group">
              {sentMessages.length > 0 ? (
                sentMessages.map((msg, index) => (
                  <li key={index} className="list-group-item">
                    <strong>To Patient {msg.patientId}:</strong> {msg.content} <br />
                    <small>{new Date(msg.timestamp).toLocaleString()}</small>
                  </li>
                ))
              ) : (
                <p>No messages sent yet.</p>
              )}
            </ul>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default DoctorDashboard;
