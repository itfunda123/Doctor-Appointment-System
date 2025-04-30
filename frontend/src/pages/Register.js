import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/users/register', form);
    alert("Registered!");
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'email', 'password'].map((field) => (
          <input key={field} name={field} placeholder={field} className="form-control my-2" onChange={handleChange} />
        ))}
        <select name="role" className="form-control my-2" onChange={handleChange}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default Register;
