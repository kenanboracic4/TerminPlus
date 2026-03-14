import React, { useContext, useEffect, useState } from 'react';
import '../assets/css/UserProfile.css';
import Navbar from '../components/NavBar';
import { AuthContext } from '../context/AuthContext';
import { AlignLeft, User, Info } from 'lucide-react';

const UserProfile = () => {
    const { token } = useContext(AuthContext);
    const [showDetails, setShowDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('aktivni');
    const [userMatches, setUserMatches] = useState([]);
    const [userFinishedMatches, setUserFinishedMatches] = useState([]);
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
        };

        const fetchUserMatches = async () => {
            try {
                const response = await fetch('http://localhost:3000/matches/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                console.table(data);
                setUserMatches(data.filter(match => match.status === 'Aktivno'));
                setUserFinishedMatches(data.filter(match => match.status === 'Završeno'));
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(true);
            }
        }

        fetchUserData();
        fetchUserMatches();
    }, [])

    const renderContent = () => {
        switch (activeTab) {
            case 'aktivni':
                return (
                    <div className="tab-content glass-card fade-in">
                        {userMatches && userMatches.length > 0 ? (
                            userMatches.map((match) => (
                                <div key={match.id} className="match-item">
                                    {/* Gornji dio: Naslov i Dugme */}
                                    <div className="match-top-row">
                                        <div className="match-info">
                                            <h4>{match.title}</h4>
                                            <p>
                                                {new Date(match.date).toLocaleDateString('sr-Latn-BA')} |
                                                {new Date(match.date).toLocaleTimeString('sr-Latn-BA', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                        <button
                                            className="btn-action"
                                            onClick={() => setShowDetails(showDetails === match.id ? null : match.id)}
                                        >
                                            {showDetails === match.id ? 'Zatvori' : 'Detalji'}
                                        </button>
                                    </div>

                                    {/* Donji dio: Detalji koji se pojavljuju na klik */}
                                    {showDetails === match.id && (
                                        <div className="details-section fade-in">
                                            <hr className="details-divider" />
                                            <div className="details-grid">
                                                <div className="details-block">
                                                    <h5 className="details-title">
                                                        <AlignLeft size={16} className="icon-green" /> O terminu
                                                    </h5>
                                                    <p className="description-text">
                                                        {match?.description || "Organizator nije dodao specifičan opis za ovaj termin."}
                                                    </p>

                                                    <div className="meta-container">
                                                        <div className="info-item">
                                                            <User size={14} className="icon" />
                                                            <span>Organizator: <strong>{match?.creatorName}</strong></span>
                                                        </div>
                                                        <div className="info-item">
                                                            <Info size={14} className="icon" />
                                                            <span>Kreirano: {match?.createdAt ? new Date(match?.createdAt).toLocaleDateString('sr-Latn-BA') : "Nepoznato"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="no-data-msg">Nema termina za prikaz</p>
                        )}
                    </div>
                );
            case 'zavrseni':
                return (
                    <div className="tab-content glass-card fade-in">
                        {userFinishedMatches && userFinishedMatches.length > 0
                            ? userFinishedMatches.map(match => {
                                return <div key={match.id} className="match-item opacity-dim">
                                    <div className="match-info">
                                        <h4>{match.title}</h4>
                                        <p>
                                            Datum: {new Date(match.date).toLocaleDateString('sr-Latn-BA')} |
                                            Vrijeme: {new Date(match.date).toLocaleTimeString('sr-Latn-BA', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>

                                </div>
                            })
                            : <p>Nema završenih termina</p>
                        }
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

                <aside className="profile-sidebar glass-card">
                    <div className="profile-image-container">
                        <div className="profile-avatar">

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


                <main className="profile-main">

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