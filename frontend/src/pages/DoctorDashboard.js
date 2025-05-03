import React, { useEffect, useState } from 'react';

function DoctorDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [availability, setAvailability] = useState({});
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

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

  const handleSaveAvailability = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/doctors/${user.id}/availability`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(availability),
      });
      if (res.ok) {
        setSuccessMessage('Availability saved successfully.');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
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
        setSuccessMessage(`Message sent to Patient ${patientId}`);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Welcome Dr. {user?.name}</h2>
      <p className="text-muted">Manage your appointments, availability, and patient communication.</p>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {/* Search */}
      <div className="input-group mb-4">
        <span className="input-group-text"><i className="bi bi-search"></i></span>
        <input
          type="text"
          placeholder="Search appointments..."
          onChange={handleSearchChange}
          className="form-control"
        />
      </div>

      {/* Availability */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">Manage Your Availability</div>
        <div className="card-body">
          <form onSubmit={handleSaveAvailability}>
            <div className="mb-3">
              <label className="form-label">Available From:</label>
              <input
                type="time"
                name="start"
                value={availability.start || ''}
                onChange={handleAvailabilityChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Available Until:</label>
              <input
                type="time"
                name="end"
                value={availability.end || ''}
                onChange={handleAvailabilityChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-success">
              <i className="bi bi-save me-1"></i> Save Availability
            </button>
          </form>
        </div>
      </div>

      {/* Appointments */}
      <div className="card mb-4">
        <div className="card-header bg-info text-white">Upcoming Appointments</div>
        <div className="card-body table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Send Message</th>
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
                          <button className="btn btn-success btn-sm me-2" onClick={() => handleApprove(appointment.id)}>
                            <i className="bi bi-check-circle"></i>
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleReject(appointment.id)}>
                            <i className="bi bi-x-circle"></i>
                          </button>
                        </>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target={`#messageModal-${appointment.id}`}
                      >
                        <i className="bi bi-chat-dots"></i> Message
                      </button>

                      {/* Message Modal */}
                      <div className="modal fade" id={`messageModal-${appointment.id}`} tabIndex="-1" aria-labelledby="messageModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Send Message to {appointment.patientName}</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={() => handleSendMessage(appointment.patientId)}
                              >
                                Send Message
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
                  <td colSpan="5" className="text-center text-muted">No appointments available or no match found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sent Messages */}
      <div className="card mb-5">
        <div className="card-header bg-secondary text-white">Sent Messages</div>
        <div className="card-body">
          {sentMessages.length > 0 ? (
            <ul className="list-group">
              {sentMessages.map((msg, index) => (
                <li key={index} className="list-group-item">
                  <strong>To Patient {msg.patientId}:</strong> {msg.content}
                  <br />
                  <small className="text-muted">{new Date(msg.timestamp).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No messages sent yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
