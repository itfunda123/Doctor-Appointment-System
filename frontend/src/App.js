import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import BookAppointment from './pages/BookAppointment';
import ViewAppointments from './pages/ViewAppointments';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import Notifications from './pages/Notifications';

// ✅ Import SetAvailability
import SetAvailability from './components/SetAvailability';

function AppWrapper() {
  const location = useLocation();
  const hideNavbarRoutes = ['/doctor-dashboard', '/patient-dashboard'];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      {shouldShowNavbar && <Navbar />}

      <div className="content-wrap flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/appointments" element={<ViewAppointments />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          
          {/* ✅ Add the route for SetAvailability */}
          <Route path="/availability" element={<SetAvailability />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
