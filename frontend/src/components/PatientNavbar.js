// components/PatientNavbar.js
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function PatientNavbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Patient Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/patient-dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/book">Book Appointment</Nav.Link>
            <Nav.Link as={Link} to="/appointments">My Appointments</Nav.Link>
            <Nav.Link as={Link} to="/notifications">Notifications</Nav.Link>
          </Nav>
          <span className="me-3">Hello, {user?.name}</span>
          <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PatientNavbar;
