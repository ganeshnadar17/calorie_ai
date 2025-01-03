import React from 'react';

export const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <a className="navbar-brand fs-4 fw-bold" href="#">
          Calorie Tracker AI
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#entries">Entries</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#upload">Upload</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};