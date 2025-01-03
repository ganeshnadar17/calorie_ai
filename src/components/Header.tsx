import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Calorie Tracker AI
        </Link>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/')}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/entries')}`} to="/entries">
                Entries
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/upload')}`} to="/upload">
                Upload
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/contact')}`} to="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};