import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';

function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, idx) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, idx * 500); // Staggered fade-in effect
    });
  }, []);

  return (
    <div className="container mt-5 text-center">
      <div 
        className="hero-section" 
        style={{ 
          backgroundImage: 'url("/assets/image1.jpg")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          padding: '100px 0',
          color: 'white' 
        }}
      >
        <h1 className="display-4 fade-in">Welcome to the Doctor Appointment System</h1>
        <p className="lead fade-in">Your health, your time. Book appointments with ease today.</p>
        <Button 
          href="/register" 
          className="btn btn-primary btn-lg mt-4 fade-in"
        >
          Register & Book Now
        </Button>
      </div>

      <div className="mt-4">
        <h3 className="fade-in">Why Choose Us?</h3>
        <p className="fade-in">We offer a seamless and hassle-free way to book your doctor appointments, ensuring your health is always prioritized.</p>
      </div>
    </div>
  );
}

export default Home;
