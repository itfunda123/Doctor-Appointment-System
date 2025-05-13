import React, { useEffect, useState } from 'react';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    console.log("Doctor loaded from localStorage:", storedUser);
  }, []);

  const fetchAppointments = async () => {
    if (!user || !user._id) return;

    console.log("Fetching with doctor ID:", user._id);

    try {
      const response = await fetch(`/api/appointments/doctor/${user._id}`);
      const data = await response.json();
      console.log("Fetched appointments:", data);
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Doctor Dashboard</h2>
      <button className="btn btn-primary mb-3" onClick={fetchAppointments}>
        Refresh Appointments
      </button>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.patientId?.name || 'Unknown'}</td>
                <td>{new Date(appt.date).toLocaleString()}</td>
                <td>{appt.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorDashboard;
