import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand">DocApp</Link>
      <div className="navbar-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/book" className="nav-link">Book</Link>
        {user && (
          <>
            <span className="nav-link disabled">Hello, {user.name}</span>
            <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
