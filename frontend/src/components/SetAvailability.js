// SetAvailability.js
import React, { useState, useEffect } from 'react';
import { Button, Form, Card } from 'react-bootstrap';

function SetAvailability() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [availability, setAvailability] = useState({
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
  });

  // Fetch existing availability
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch(`/api/availability/${user._id}`);
        if (response.ok) {
          const data = await response.json();
          setAvailability(data);
        }
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };
    fetchAvailability();
  }, [user]);

  const handleChange = (day, value) => {
    setAvailability(prev => ({ ...prev, [day]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/availability/${user._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(availability),
      });
      if (!response.ok) throw new Error('Failed to save availability');
      alert('Availability updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving availability');
    }
  };

  const days = Object.keys(availability);

  return (
    <div className="container mt-4">
      <Card className="p-4 shadow">
        <h3>Set Your Weekly Availability</h3>
        <Form onSubmit={handleSubmit}>
          {days.map(day => (
            <Form.Group key={day} className="mb-3">
              <Form.Label>{day.charAt(0).toUpperCase() + day.slice(1)}</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 9AM - 5PM"
                value={availability[day]}
                onChange={(e) => handleChange(day, e.target.value)}
              />
            </Form.Group>
          ))}
          <Button type="submit" variant="primary" className="w-100">Save Availability</Button>
        </Form>
      </Card>
    </div>
  );
}

export default SetAvailability;
