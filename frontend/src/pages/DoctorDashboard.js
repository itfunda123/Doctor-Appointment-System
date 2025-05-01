import React, { useEffect, useState } from 'react';

function DoctorDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from the server (replace with your API call)
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
    // API call to approve the appointment
    try {
      await fetch(`/api/appointments/approve/${appointmentId}`, { method: 'POST' });
      setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
    } catch (error) {
      console.error('Error approving appointment:', error);
    }
  };

  const handleReject = async (appointmentId) => {
    // API call to reject the appointment
    try {
      await fetch(`/api/appointments/reject/${appointmentId}`, { method: 'POST' });
      setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
    } catch (error) {
      console.error('Error rejecting appointment:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Welcome Dr. {user?.name}</h2>
      <p>This is your dashboard. You can view your appointments and manage your availability here.</p>

      <h3>Upcoming Appointments</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Patient</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patientName}</td>
                <td>{new Date(appointment.date).toLocaleString()}</td>
                <td>{appointment.status}</td>
                <td>
                  {appointment.status === 'Pending' && (
                    <>
                      <button className="btn btn-success" onClick={() => handleApprove(appointment.id)}>
                        Approve
                      </button>
                      <button className="btn btn-danger" onClick={() => handleReject(appointment.id)}>
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No appointments available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorDashboard;
