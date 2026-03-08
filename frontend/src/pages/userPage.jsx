import React, { useContext, useEffect, useState } from 'react';
import '../assets/css/UserProfile.css';
import Navbar from '../components/NavBar';
import { AuthContext } from '../context/AuthContext';

const UserProfile = () => {
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('aktivni');
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        avgReview: 0
    })

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log(token);

                const response = await fetch('http://localhost:3000/user/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`

                    }

                });
                const data = await response.json();
                setUserData({
                    name: data.name,
                    email: data.email,
                    avgReview: data.avgReview
                })
                setLoading(false);

            } catch (err) {
                console.log(err);
                setLoading(true);
            }
        }

        fetchUserData();

    }, [])

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
                        <h2 className="profile-name">{userData.name}</h2>
                        <p className="profile-username">{userData.email}</p>

                        <div className="profile-stats">

                            <div className="stat">
                                <span className="stat-value">{userData.avgReview}</span>
                                <span className="stat-label">Ocjena</span>
                            </div>
                        </div>

                        <div className="profile-bio">
                            <p>{userData.bio || "Dodajte opis za Vaš profil"}</p>
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