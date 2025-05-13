import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import PatientNavbar from '../components/PatientNavbar';

function Notifications() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages/${user._id}`);
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      }
    };

    fetchMessages();
  }, [user]);

  return (
    <>
      <PatientNavbar />
      <div className="container mt-4">
        <h3>Your Messages</h3>
        {messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          messages.map((msg) => (
            <Card className="mb-3" key={msg._id}>
              <Card.Body>
                <Card.Title>From: Dr. {msg.doctorId.name}</Card.Title>
                <Card.Text>{msg.content}</Card.Text>
                <small className="text-muted">
                  Sent on {new Date(msg.timestamp).toLocaleString()}
                </small>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </>
  );
}

export default Notifications;
