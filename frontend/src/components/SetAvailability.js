import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Row, Col, Container } from 'react-bootstrap';

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
      alert('✅ Availability updated successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Error saving availability');
    }
  };

  const days = Object.keys(availability);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow border-0">
            <Card.Header className="bg-primary text-white text-center">
              <h4 className="mb-0">Set Weekly Availability</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {days.map(day => (
                  <Form.Group key={day} className="mb-3">
                    <Form.Label className="fw-bold text-capitalize">{day}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. 9AM - 5PM"
                      value={availability[day]}
                      onChange={(e) => handleChange(day, e.target.value)}
                      className="shadow-sm"
                    />
                  </Form.Group>
                ))}
                <div className="d-grid mt-4">
                  <Button type="submit" variant="success" size="lg">
                    Save Availability
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SetAvailability;
