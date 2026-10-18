import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    closeMenu();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo" onClick={closeMenu}>EventHub</Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

        <div className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <NavLink to="/events" onClick={closeMenu}>Events</NavLink>

          {user ? (
            <>
              <NavLink to="/my-events" onClick={closeMenu}>My Events</NavLink>
              <span className="nav-user">Hi, {user.name}</span>
              <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
              <NavLink to="/register" onClick={closeMenu}>Register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;