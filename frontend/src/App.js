import './App.css'; // Make sure you import the CSS
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import BookAppointment from './pages/BookAppointment';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book" element={<BookAppointment />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
