import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';

function DoctorAppointments({
  appointments,
  searchTerm,
  handleApprove,
  handleReject,
  handleMessageChange,
  handleSendMessage,
  message
}) {
  const filteredAppointments = appointments.filter((appointment) =>
    (appointment.patientName || '').toLowerCase().includes(searchTerm)
  );

  return (
    <Table striped bordered hover>
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
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.patientName || 'N/A'}</td>
              <td>{new Date(appointment.date).toLocaleString()}</td>
              <td>{appointment.status}</td>
              <td>
                {appointment.status.toLowerCase() === 'pending' && (
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleApprove(appointment._id)}
                      className="me-2"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleReject(appointment._id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Message"
                  value={message}
                  onChange={handleMessageChange}
                  className="mb-1"
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleSendMessage(appointment.patientId)}
                >
                  Send
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              No appointments found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default DoctorAppointments;
