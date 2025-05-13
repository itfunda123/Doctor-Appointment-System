import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function SendMessage({ patientId, doctorId, patientName }) {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState('');

  const handleSend = async () => {
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctorId, patientId, content }),
      });

      if (!response.ok) throw new Error('Failed to send message');
      alert('Message sent successfully');
      setContent('');
      setShow(false);
    } catch (err) {
      alert('Error sending message');
    }
  };

  return (
    <>
      <Button variant="outline-primary" onClick={() => setShow(true)}>
        Message
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Message to {patientName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your message..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button variant="primary" onClick={handleSend}>Send</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SendMessage;
