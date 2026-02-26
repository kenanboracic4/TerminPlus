import React, { useState, useEffect, useContext, useMemo } from 'react';
import {
    Search, Plus, MapPin, AlignLeft, Calendar,
    Users, DollarSign, Map
} from 'lucide-react';

import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-bootstrap/Spinner';
import '../assets/css/Matches.css';
import Navbar from '../components/NavBar';
import Card from '../components/Card';

const Matches = () => {
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        title: '',
        sportId: '',
        date: '',
        neededPlayers: '',
        pricePerPerson: '',
        latitude: '',
        longitude: '',
        address: '',
        description: ''
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [distance, setDistance] = useState(50);
    const [selectedSport, setSelectedSport] = useState('');

    const [results, setResults] = useState([]);
    const [query, setQuery] = useState("");
    const [matches, setMatches] = useState([]);
    const [sports, setSports] = useState([]);


    const [userLocation, setUserLocation] = useState(() => {
        const saved = localStorage.getItem('userLocation');
        return saved ? JSON.parse(saved) : null;
    });


    const izracunajUdaljenost = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };



    useEffect(() => {

        const fetchFastLocation = async () => {
            if (userLocation) return;
            try {
                const res = await fetch('https://ipapi.co/json/');
                const data = await res.json();
                if (data.latitude && data.longitude) {
                    const coords = { lat: data.latitude, lon: data.longitude };
                    setUserLocation(coords);
                    localStorage.setItem('userLocation', JSON.stringify(coords));
                }
            } catch (e) {
                console.log("IP lokacija nije uspjela");
            }
        };

        fetchFastLocation();


        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const newCoords = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    };
                    setUserLocation(newCoords);
                    localStorage.setItem('userLocation', JSON.stringify(newCoords)); // Spasi za idući put
                },
                (error) => console.error(error),
                {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 10000
                }
            );
            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, []);

    useEffect(() => {

        const fetchSports = async () => {
            try {
                const response = await fetch('http://localhost:3000/matches/sports');
                const data = await response.json();
                setSports(data);

            } catch (error) {
                console.log(error);
                setSports([]);
            }
        }
        const fetchMatches = async () => {
            try {
                const response = await fetch('http://localhost:3000/matches/all');
                const data = await response.json();
                setMatches(data);

            } catch (error) {
                console.error(error);
                setMatches([]);
                setMessage('Greška prilikom učitavanja termina.');
            }
        }
        fetchMatches();
        fetchSports();
    }, []);


    useEffect(() => {
        if (query.length < 3) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5&countrycodes=ba,rs,hr,me,si,mk,al`
                );
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error("Greška pri pretrazi:", error);
                setResults([]);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    const selectLocation = (item) => {
        setQuery(item.display_name);
        setFormData({
            ...formData,
            address: item.display_name,
            latitude: item.lat,
            longitude: item.lon
        });
        setResults([]);
        console.log("Koordinate sačuvane:", item.lat, item.lon);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            setMessage("Greška: Niste ulogovani!");
            return;
        }
        try {
            setLoading(true);
            const newMatch = {
                title: formData.title,
                sportId: formData.sportId,
                date: formData.date,
                neededPlayers: formData.neededPlayers,
                pricePerPerson: formData.pricePerPerson,
                latitude: formData.latitude,
                longitude: formData.longitude,
                address: formData.address,
                description: formData.description
            };
            const response = await fetch('http://localhost:3000/matches/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newMatch)
            });

            if (response.ok) {
                setIsOpen(false);
                setMessage('Termin uspješno kreiran!');

                setMatches(prev => [newMatch, ...prev]);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Greška prilikom kreiranja termina.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Greška prilikom slanja podataka.');
        } finally {
            setLoading(false);
        }
    };

    const filteredMatches = useMemo(() => {

        if (!matches) return [];

        return matches.filter(match => {

            const sportMatches = !selectedSport || String(match.sportId) === String(selectedSport);


            let distanceMatches = true;
            if (userLocation && match.latitude && match.longitude) {
                const km = izracunajUdaljenost(
                    match.latitude, match.longitude,
                    userLocation.lat, userLocation.lon
                );
                distanceMatches = km <= Number(distance);
            }

            return sportMatches && distanceMatches;
        });
    }, [matches, selectedSport, distance, userLocation]);



    return (

        <>
            <Navbar isLoggedIn={true} />

            <div className="match-manager-container">

                <div className="top-bar-glass">

                    <form className="filter-form-wrapper">
                        <div className="filter-group">
                            <select
                                name="sportFilter"
                                className="custom-select"
                                value={selectedSport}
                                onChange={(e) => setSelectedSport(e.target.value)}
                            >
                                <option value="">Odaberi sport</option>
                                {sports.length > 0 ? sports.map((sport) => (
                                    <option key={sport.id} value={sport.id}>{sport.name}</option>
                                )) : <option value="">Nema sportova</option>}
                            </select>

                            <div className="slider-container">
                                <label>Udaljenost: <span>{distance} km</span></label>
                                <input
                                    type="range"
                                    min="1"
                                    max="50"
                                    value={distance}
                                    onChange={(e) => setDistance(e.target.value)}
                                    className="custom-slider"
                                />
                            </div>
                        </div>

                        <div className="action-group">
                            <button type="submit" className="btn-search">
                                <Search size={16} /> PRETRAŽI
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className="btn-publish"
                            >
                                <Plus size={16} /> {isOpen ? "ZATVORI" : "OBJAVI"}
                            </button>
                        </div>
                    </form>
                </div>

                {isOpen && (
                    <div className="form-glass-card">
                        <div className="form-header">
                            <h3>Kreiraj novi termin</h3>
                            <p>Popuni detalje za tvoj novi termin</p>
                        </div>

                        <form className="match-form" onSubmit={handleSubmit}>

                            <div className="input-group full-width">
                                <label>Naslov termina</label>
                                <input type="text"
                                    name="title"
                                    placeholder="npr. Večernji termin 5 na 5"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>


                            <div className="input-group">
                                <label>Sport</label>
                                <select
                                    name="sportId"
                                    value={formData.sportId}
                                    onChange={(e) => setFormData({ ...formData, sportId: e.target.value })}
                                >
                                    <option value="">Odaberi sport</option>
                                    {sports.length > 0 ? sports.map((sport) => {
                                        return <option key={sport.id} value={sport.id}>{sport.name}</option>
                                    })
                                        :
                                        <option value="">Nema sportova</option>
                                    }
                                </select>
                            </div>
                            <div className="input-group">
                                <label><Calendar size={14} /> Datum i vreme</label>
                                <input type="datetime-local" name="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                />
                            </div>


                            <div className="input-group">
                                <label><Users size={14} /> Potreban broj igrača</label>
                                <input type="number"
                                    name="maxPlayers"
                                    min="2"
                                    max="22"
                                    placeholder="npr. 10"
                                    value={formData.neededPlayers}
                                    onChange={(e) => setFormData({ ...formData, neededPlayers: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label><DollarSign size={14} /> Cena po osobi (KM)</label>
                                <input type="number"
                                    step="0.5"
                                    name="pricePerPerson"
                                    placeholder="npr. 5.50"
                                    value={formData.pricePerPerson}
                                    onChange={(e) => setFormData({ ...formData, pricePerPerson: e.target.value })}
                                />
                            </div>


                            <div className="input-group full-width">
                                <label><MapPin size={14} /> Adresa lokacije</label>
                                <input type="text"
                                    name="address"
                                    placeholder='Pretraži lokaciju (npr. Zetra, Sarajevo)'
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    autoComplete="off"
                                    required
                                />
                                {results.length > 0 && (
                                    <ul className="location-results">
                                        {results.map((item, index) => (
                                            <li key={index} onClick={() => selectLocation(item)}>
                                                <MapPin size={12} /> {item.display_name}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <input type="hidden" name="latitude" value={formData.latitude} />
                                <input type="hidden" name="longitude" value={formData.longitude} />
                            </div>


                            <div className="input-group full-width">
                                <label><AlignLeft size={14} /> Dodatni opis</label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    placeholder="Pravila, informacije o opremi..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="form-actions full-width">
                                <button type="submit" className="btn-submit">Spremi termin</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="matches-list">
                    {filteredMatches.length > 0 ?
                        <div className="matches-container-list">

                            {filteredMatches.map((match) => {
                                return <Card key={match.id} data={match} userLocations={userLocation} />;
                            })}
                        </div>
                        : <p className="no-matches-message">Nema dostupnih termina. Budi prvi koji će kreirati termin!</p>
                    }
                </div>
            </div >
        </>
    );
}

export default Matches;