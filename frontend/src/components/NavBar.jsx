import React, { useContext } from 'react';
import '../assets/css/Navbar.css';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isLoggedIn, logout, userData } = useContext(AuthContext);

  return (
    <header className="hero-header">
      <div className="logo-brand-container">
        <span className="logo-text-massive">
          TERMIN<span className="logo-plus-neon">+</span>
        </span>
      </div>

      <nav className="desktop-nav">
        <ul>
          <li><Link to="/">Početna</Link></li>
          <li><a href="#kako-funkcionise">Kako funkcioniše</a></li>
          <li><Link to="/matches">Pronađi termin</Link></li>
        </ul>
      </nav>

      <div className="header-action">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="nav-link-login">Prijava</Link>
            <Link to="/register" className="btn-join">Registracija</Link>
          </>
        ) : (
          <div className="user-profile-container">
            <Link to="/user-profile" >
              <div className="user-info">
                <div className="user-avatar">
                  {/* SVG ikonica za korisnika */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <span className="user-name">
                  {userData?.name || "Korisnik"}
                </span>
              </div>
            </Link>
            {/* Uspravna tanka linija */}
            <div className="nav-divider"></div>

            {/* Dugme za odjavu sa ikonicom */}
            <button className="btn-logout" onClick={logout}>
              <span>Odjava</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;