import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <Link to="/" onClick={closeMenu}>
              <Logo width={40} height={40} />
            </Link>
          </div>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${isActive('/')}`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className={`nav-link ${isActive('/about')}`}
                  onClick={closeMenu}
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/services"
                  className={`nav-link ${isActive('/services')}`}
                  onClick={closeMenu}
                >
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/projects"
                  className={`nav-link ${isActive('/projects')}`}
                  onClick={closeMenu}
                >
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/blog"
                  className={`nav-link ${isActive('/blog')}`}
                  onClick={closeMenu}
                >
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/contact"
                  className={`nav-link ${isActive('/contact')}`}
                  onClick={closeMenu}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item nav-cta">
                <Link
                  to="/contact"
                  className="btn btn-primary"
                  onClick={closeMenu}
                >
                  Get Quote
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;