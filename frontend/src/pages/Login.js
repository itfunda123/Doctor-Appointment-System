import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Login successful');
      navigate('/');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" className="form-control my-2" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" className="form-control my-2" placeholder="Password" onChange={handleChange} />
        <button className="btn btn-primary">Login</button>
      </form>
      <p className="mt-3">Not yet a member? <Link to="/register">Sign up</Link></p>
    </div>
  );
}

export default Login;
