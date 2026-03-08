import React, { useState } from 'react';
import '../assets/css/UserProfile.css';
import Navbar from '../components/NavBar';

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('aktivni');

    // Dummy podaci za prikaz
    const renderContent = () => {
        switch (activeTab) {
            case 'aktivni':
                return (
                    <div className="tab-content glass-card fade-in">
                        <div className="match-item">
                            <div className="match-info">
                                <h4>Trening / Meč - Arena</h4>
                                <p>Datum: 12. Mart 2026. | Vrijeme: 18:00</p>
                            </div>
                            <button className="btn-action">Detalji</button>
                        </div>
                        <div className="match-item">
                            <div className="match-info">
                                <h4>Mali Fudbal - Zetra</h4>
                                <p>Datum: 15. Mart 2026. | Vrijeme: 20:00</p>
                            </div>
                            <button className="btn-action">Detalji</button>
                        </div>
                    </div>
                );
            case 'zavrseni':
                return (
                    <div className="tab-content glass-card fade-in">
                        <div className="match-item opacity-dim">
                            <div className="match-info">
                                <h4>Trening - Skenderija</h4>
                                <p>Završeno: 5. Mart 2026.</p>
                            </div>
                            <span className="status-badge">Završeno</span>
                        </div>
                    </div>
                );
            case 'recenzije':
                return (
                    <div className="tab-content glass-card fade-in">
                        <div className="review-item">
                            <div className="review-header">
                                <strong>@igrač_01</strong>
                                <span className="stars">★★★★★</span>
                            </div>
                            <p>"Odličan saigrač, sve po dogovoru!"</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Navbar />
            <div className="profile-page-container">
                {/* LIJEVI DIO: 30% - Osnovni podaci */}
                <aside className="profile-sidebar glass-card">
                    <div className="profile-image-container">
                        <div className="profile-avatar">
                            {/* Placeholder za sliku, možeš ubaciti <img> */}
                            <span>K</span>
                        </div>
                    </div>

                    <div className="profile-info">
                        <h2 className="profile-name">Kenan</h2>
                        <p className="profile-username">@webbykenan</p>

                        <div className="profile-stats">
                            <div className="stat">
                                <span className="stat-value">12</span>
                                <span className="stat-label">Mečeva</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">4.9</span>
                                <span className="stat-label">Ocjena</span>
                            </div>
                        </div>

                        <div className="profile-bio">
                            <p>Student i Web Developer. Spreman za nove izazove i mečeve na terenu.</p>
                        </div>

                        <button className="btn-edit-profile">Uredi Profil</button>
                    </div>
                </aside>

                {/* DESNI DIO: 70% - Tabovi i Termini */}
                <main className="profile-main">
                    {/* Tab Navigacija */}
                    <div className="tabs-container glass-card">
                        <button
                            className={`tab-btn ${activeTab === 'aktivni' ? 'active' : ''}`}
                            onClick={() => setActiveTab('aktivni')}
                        >
                            Aktivni termini
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'zavrseni' ? 'active' : ''}`}
                            onClick={() => setActiveTab('zavrseni')}
                        >
                            Završeni
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'recenzije' ? 'active' : ''}`}
                            onClick={() => setActiveTab('recenzije')}
                        >
                            Recenzije
                        </button>
                    </div>

                    {/* Sadržaj aktivnog taba */}
                    <div className="tab-content-wrapper">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </>
    );
};

export default UserProfile;