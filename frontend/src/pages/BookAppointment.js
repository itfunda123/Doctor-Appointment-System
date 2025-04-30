import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ patientId: '', doctorId: '', date: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/doctors').then((res) => setDoctors(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/appointments', form);
    alert("Appointment Booked!");
  };

  return (
    <div className="container mt-5">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <select name="doctorId" className="form-control my-2" onChange={handleChange}>
          <option>Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>{doc.name}</option>
          ))}
        </select>
        <input type="text" name="patientId" placeholder="Your User ID" className="form-control my-2" onChange={handleChange} />
        <input type="datetime-local" name="date" className="form-control my-2" onChange={handleChange} />
        <button className="btn btn-success">Book</button>
      </form>
    </div>
  );
}

export default BookAppointment;
