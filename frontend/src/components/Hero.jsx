import React, { useState } from 'react';
import '../assets/css/HeroSection.css';

import backgroundUrl from '../assets/stadium.jpg';

const HeroSection = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <section
            className="hero-section"
            style={{ backgroundImage: `url(${backgroundUrl})` }}
        >

            <div className="hero-overlay"></div>


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
                        </>
                    )}
                </div>
            </header>


            <main className="hero-main">
                <h1 className="main-headline">
                    Pronađi svoj sljedeći
                    <span className="text-accent"> termin za sekundu.</span>
                </h1>

                <p className="main-subheadline">
                    TerminPlus trenutno povezuje fudbalere i organizatore. Pronađi slobodna mjesta,
                    pridruži se ekipama i nikada više ne propusti dobru igru.
                </p>

                <div className="button-group">
                    <button className="btn-primary">
                        Pronađi termin
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>

                    <button className="btn-secondary">
                        Kreiraj termin
                        <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </button>
                </div>
            </main>
        </section>
    );
};

export default HeroSection;