import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import BookAppointment from './pages/BookAppointment';
import ViewAppointments from './pages/ViewAppointments';
import DoctorDashboard from './pages/DoctorDashboard';

function App() {
  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <Router>
        {/* Show patient Navbar only if NOT on the doctor dashboard route */}
        {!window.location.pathname.startsWith('/doctor-dashboard') && <Navbar />}

        <div className="content-wrap flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book" element={<BookAppointment />} />
            <Route path="/appointments" element={<ViewAppointments />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
