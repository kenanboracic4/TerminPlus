import React from 'react';
import '../assets/css/Navbar.css';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Navbar = () => {
 const { isLoggedIn, logout, userData} = useContext(AuthContext);
  return (
    <header className="hero-header">
      <div className="logo-brand-container">
        <span className="logo-text-massive">
          TERMIN<span className="logo-plus-neon">+</span>
        </span>
      </div>

      <nav className="desktop-nav">
        <ul>
          <li><a href="#pocetna">Početna</a></li>
          <li><a href="#kako-funkcionise">Kako funkcioniše</a></li>
          <li><a href="#pronadi">Pronađi termin</a></li>
        </ul>
      </nav>

      <div className="header-action">
        {!isLoggedIn ? (
          <>
            <a href="#prijava" className="nav-link-login">Prijava</a>
            <button className="btn-join">Registracija</button>
          </>
        ) : (
          <>
            <button className="btn-join hidden-mobile">Kreiraj igru</button>
            <a href="#profil" className="profile-btn" aria-label="Profil">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </a>
            <button className="btn-join hidden-mobile" onClick={logout}>Odjava</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;