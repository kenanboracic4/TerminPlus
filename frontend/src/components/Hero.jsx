import React, { useState } from 'react';
import Navbar from './NavBar'; // Importaj novu komponentu
import '../assets/css/HeroSection.css';
import backgroundUrl from '../assets/stadium.jpg';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const { isLoggedIn} = React.useContext(AuthContext);

    return (
        <section
            className="hero-section"
            style={{ backgroundImage: `url(${backgroundUrl})` }}
        >
            <div className="hero-overlay"></div>

          
            <Navbar isLoggedIn={isLoggedIn} />

            <main className="hero-main">
                <h1 className="main-headline">
                    Pronađi svoj sljedeći
                    <span className="text-accent"> termin</span> za sekundu.
                </h1>

                <p className="main-subheadline">
                    TerminPlus trenutno povezuje fudbalere i organizatore. Pronađi slobodna mjesta,
                    pridruži se ekipama i nikada više ne propusti dobru igru.
                </p>

                <div className="button-group">
                    <Link to="/matches"on className="btn-primary">
                        Pronađi termin
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </Link>

                    <Link to="/matches" className="btn-secondary">
                        Kreiraj termin
                        <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </Link>
                </div>
            </main>
        </section>
    );
};

export default HeroSection;