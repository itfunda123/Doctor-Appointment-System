import React, { useEffect, useState } from 'react';
import DoctorNavbar from '../components/DoctorNavbar';

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
        <h2>Welcome Dr. {user?.name}</h2>
        <p>This is your dashboard. You can view your appointments, manage your availability, and message your patients here.</p>

        <div className="search-box mb-4">
          <input
            type="text"
            placeholder="Search appointments..."
            onChange={handleSearchChange}
            className="form-control"
          />
        </div>

        <h3 id="availability">Manage Your Availability</h3>
        <form className="mb-4">
          <label>Available From:</label>
          <input
            type="time"
            name="start"
            value={availability.start || ''}
            onChange={handleAvailabilityChange}
            className="form-control mb-2"
          />
          <label>Available Until:</label>
          <input
            type="time"
            name="end"
            value={availability.end || ''}
            onChange={handleAvailabilityChange}
            className="form-control mb-2"
          />
          <button className="btn btn-primary">Save Availability</button>
        </form>

        <h3 id="appointments">Upcoming Appointments</h3>
        <table className="table">
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
                        <button className="btn btn-success me-2" onClick={() => handleApprove(appointment.id)}>
                          Approve
                        </button>
                        <button className="btn btn-danger" onClick={() => handleReject(appointment.id)}>
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-info"
                      data-bs-toggle="modal"
                      data-bs-target={`#messageModal-${appointment.id}`}
                    >
                      Send Message
                    </button>

                    {/* Modal */}
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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
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
                <td colSpan="5">No appointments available or no match found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <h3 id="messages">Sent Messages</h3>
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
      </div>
    </>
  );
}

export default DoctorDashboard;
