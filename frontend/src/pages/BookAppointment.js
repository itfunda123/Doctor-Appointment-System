import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookAppointment() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ patientId: '', doctorId: '', date: '' });

  useEffect(() => {
    if (!user) {
      alert('Please login to book an appointment');
      navigate('/login');
      return;
    }

    setForm((prev) => ({ ...prev, patientId: user._id })); // Auto-fill patientId from user data

    axios.get('http://localhost:5000/api/users/doctors')
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error(err));
  }, [user, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/appointments', form);
      alert('Appointment Booked!');
    } catch (error) {
      console.error(error);
      alert('Failed to book appointment');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <select name="doctorId" className="form-control my-2" onChange={handleChange} required>
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>{doc.name}</option>
          ))}
        </select>
        <input 
          type="datetime-local" 
          name="date" 
          className="form-control my-2" 
          onChange={handleChange} 
          required 
        />
        <button className="btn btn-success">Book</button>
      </form>
    </div>
  );
}

export default BookAppointment;
