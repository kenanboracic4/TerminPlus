import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Clock,
  Calendar,
  Users,
  ChevronDown,
  ChevronUp,
  AlignLeft,
  Trophy,
  Wallet,
  Info,
  User,
  Activity
} from "lucide-react";
import "../assets/css/Card.css";

const Card = ({ data, userLocations }) => {
  const [showDetails, setShowDetails] = useState(false);

  const izracunajUdaljenost = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };



  const ukupnoMjesta = data?.neededPlayers || 1;
  const popunjenaMjesta = data?.currentPlayers || 1;
  const slobodnaMjesta = Math.max(0, ukupnoMjesta - popunjenaMjesta);
  const isPopunjeno = slobodnaMjesta === 0;


  const terminDatum = data?.date ? new Date(data.date) : null;
  const vrijeme = terminDatum ? terminDatum.toLocaleTimeString('sr-Latn-BA', { hour: '2-digit', minute: '2-digit' }) : "00:00";
  const datumOdržavanja = terminDatum ? terminDatum.toLocaleDateString('sr-Latn-BA') : "Nepoznato";

  return (
    <div className="term-card" style={{ opacity: isPopunjeno ? 0.8 : 1 }}>
      <div className="card-main">


        <div className="card-col title-col">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: 'var(--accent-yellow)', textTransform: 'uppercase', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Trophy size={12} /> {data?.sport?.name || "Sport"}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Activity size={12} /> {data?.status}
            </span>
          </div>

          <h2>{data?.title || "IME TERMINA"}</h2>

          <div className="player-badge" style={{
            backgroundColor: isPopunjeno ? 'rgba(239, 68, 68, 0.15)' : 'var(--accent-yellow-dim)',
            color: isPopunjeno ? '#ef4444' : 'var(--accent-yellow)',
            borderColor: isPopunjeno ? 'rgba(239, 68, 68, 0.2)' : 'rgba(250, 204, 21, 0.2)'
          }}>
            <Users size={16} />
            <span>
              {isPopunjeno
                ? "SVA MJESTA POPUNJENA"
                : `FALI JOŠ ${slobodnaMjesta} ${slobodnaMjesta === 1 ? 'IGRAČ' : 'IGRAČA'}`}
            </span>
          </div>
        </div>

        {/* KOLONA 2: Vrijeme, Datum i Cijena */}
        <div className="card-col time-col">
          <div className="info-item">
            <Clock size={18} className="icon-green" />
            <span style={{ fontWeight: 'bold', color: 'var(--text-main)', fontSize: '16px' }}>{vrijeme}</span>
          </div>
          <div className="info-item">
            <Calendar size={18} className="icon" />
            <span>{datumOdržavanja}</span>
          </div>
          <div className="info-item" style={{ marginTop: '4px' }}>
            <Wallet size={16} className="icon" />
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{data?.pricePerPerson} KM / osoba</span>
          </div>
        </div>


        <div className="card-col location-col">
          <div className="loc-row">
            <MapPin size={18} className="icon-green" />
            <span className="loc-name">
              {data?.address?.split(',')[0]}
              {data?.address?.split(',')[1] && data?.address?.split(',')[1].trim().length <= 3
                ? `, ${data.address.split(',')[1].trim()}`
                : ""}
            </span>
          </div>
          <div className="distance-row">
            <Navigation size={14} className="icon" />
            <span>
              {userLocations
                ? `${izracunajUdaljenost(data.latitude, data.longitude, userLocations.lat, userLocations.lon).toFixed(1)} km od vas`
                : "Lokacija nedostupna"}
            </span>
          </div>
        </div>


        <div className="card-col actions-col">
          <button
            className="btn-details"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "SAKRIJ DETALJE" : "VIŠE DETALJA"}
            {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <button
            className="btn-join"
            disabled={isPopunjeno}
            style={{
              backgroundColor: isPopunjeno ? '#333' : 'var(--accent-yellow)',
              color: isPopunjeno ? '#888' : '#000',
              cursor: isPopunjeno ? 'not-allowed' : 'pointer',
              boxShadow: isPopunjeno ? 'none' : ''
            }}
          >
            {isPopunjeno ? "POPUNJENO" : "PRIDRUŽI SE"}
          </button>
        </div>
      </div>

      {/* SEKCIJA DETALJA */}
      {showDetails && (
        <div className="details-section">
          <div className="details-grid">

            {/* LJEVA STRANA: Opis */}
            <div className="details-block">
              <h4><AlignLeft size={16} className="icon-green" /> O terminu</h4>
              <p style={{ marginBottom: "20px" }}>
                {data?.description || "Organizator nije dodao specifičan opis za ovaj termin."}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px' }}>
                <div className="info-item">
                  <User size={16} className="icon" />
                  <span>Organizator: <strong style={{ color: "var(--text-main)" }}>{data?.creatorName}</strong></span>
                </div>
                <div className="info-item">
                  <Info size={16} className="icon" />
                  <span>Kreirano: {data?.createdAt ? new Date(data.createdAt).toLocaleDateString('sr-Latn-BA') : "Nepoznato"}</span>
                </div>
              </div>
            </div>

            {/* DESNA STRANA: Igrači */}


          </div>
        </div>
      )}
    </div>
  );
};

export default Card;