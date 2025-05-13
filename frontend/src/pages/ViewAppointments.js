import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      alert('Please login to view appointments');
      navigate('/login');
      return;
    }

    const fetchAppointments = () => {
      axios.get('http://localhost:5000/api/appointments')
        .then((res) => {
          const userAppointments = res.data.filter(
            (appt) => appt.patientId._id === user._id
          );
          setAppointments(userAppointments);
        })
        .catch((err) => {
          console.error(err);
          alert('Failed to fetch appointments');
        });
    };

    fetchAppointments(); // Fetch initially

    const interval = setInterval(fetchAppointments, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [user, navigate]);

  return (
    <div className="container mt-5">
      <h2>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="thead-dark">
            <tr>
              <th>Doctor</th>
              <th>Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.doctorId.name}</td>
                <td>{new Date(appt.date).toLocaleString()}</td>
                <td>{appt.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewAppointments;
