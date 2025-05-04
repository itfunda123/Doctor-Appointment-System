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
import PatientDashboard from './components/PatientDashboard';

function App() {
  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <Router>
        {/* Show Navbar only if NOT on the doctor dashboard route */}
        {!window.location.pathname.startsWith('/doctor-dashboard') && <Navbar />}

        <div className="content-wrap flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book" element={<BookAppointment />} />
            <Route path="/appointments" element={<ViewAppointments />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} /> {/* ✅ NEW */}
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
