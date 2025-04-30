import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/users/register', form);
    alert("Registered!");
    navigate('/login');
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
      <p className="mt-3">Already a member? <Link to="/login">Sign in</Link></p>
    </div>
  );
}

export default Register;
