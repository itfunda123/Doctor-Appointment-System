import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand">DocApp</Link>
      <div className="navbar-nav">
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/book" className="nav-link">Book</Link>
      </div>
    </nav>
  );
}

export default Navbar;
