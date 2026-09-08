import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <svg className="nav-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span className="nav-logo-text"> AI Career Assistant</span>
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <a href="/#features" className="nav-link" onClick={() => setIsOpen(false)}>
            Features
          </a>
          <a href="/#how-it-works" className="nav-link" onClick={() => setIsOpen(false)}>
            How It Works
          </a>
          <Link
            to="/dashboard"
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link to="/profile" className="btn btn-primary nav-cta" onClick={() => setIsOpen(false)}>
            Get Started
          </Link>
        </div>

        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <span className={`nav-toggle-bar ${isOpen ? 'open' : ''}`} />
          <span className={`nav-toggle-bar ${isOpen ? 'open' : ''}`} />
          <span className={`nav-toggle-bar ${isOpen ? 'open' : ''}`} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
