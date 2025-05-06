// src/components/SendMessage.js
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const SendMessage = ({ patientName, patientId, doctorId }) => {
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSendMessage = async () => {
    try {
      const newMessage = {
        patientId,
        doctorId,
        content: message,
        timestamp: new Date(),
      };

      const response = await fetch(`/api/messages/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      });

      if (response.ok) {
        setMessage('');
        setShowModal(false);
        alert('Message sent successfully!');
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <Button
        variant="info"
        onClick={() => setShowModal(true)}
      >
        Message {patientName}
      </Button>

      {/* Modal to send message */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Message to {patientName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SendMessage;
