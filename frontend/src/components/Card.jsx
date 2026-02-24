import React, { useState } from "react";
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Calendar, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  AlignLeft 
} from "lucide-react";
import "../assets/css/Card.css";

const Card = ({ data }) => {
 
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="term-card">
      
      
      <div className="card-main">
        
        
        <div className="card-col title-col">
          <h2>{data?.title || "IME TERMINA"}</h2>
          <div className="player-badge">
            <Users size={16} />
            <span>2 IGRAČA</span>
          </div>
        </div>

        
        <div className="card-col time-col">
          <div className="info-item">
            <Clock size={18} className="icon" />
            <span>21:00</span>
          </div>
          <div className="info-item">
            <Calendar size={18} className="icon" />
            <span>21.02.2026</span>
          </div>
        </div>

        
        <div className="card-col location-col">
          <div className="loc-row">
            <MapPin size={18} className="icon-green" />
            <span className="loc-name">Sportski Centar "Arena"</span>
          </div>
          <div className="distance-row">
            <Navigation size={14} className="icon" />
            <span>2.5 km udaljeno</span>
          </div>
        </div>

       
        <div className="card-col actions-col">
          <button 
            className="btn-details" 
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "ZATVORI" : "DETALJI"}
            {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <button className="btn-join">PRIDRUŽI SE</button>
        </div>

      </div>

     
      {showDetails && (
        <div className="details-section">
          <div className="details-grid">
            
            {/* Opis termina (Leva strana na desktopu) */}
            <div className="details-block">
              <h4><AlignLeft size={16} className="icon-green"/> Opis termina</h4>
              <p>
                Igramo 5 na 5, fali nam još par igrača. Teren je plaćen unapred, poneti po 5 KM.
                Igra se na veštačkoj travi (balon je zagrejan). Možete povesti i drugara ako fali.
              </p>
            </div>

            
            <div className="details-block">
              <h4><Users size={16} className="icon-green"/> Spisak prijavljenih igrača (8/10)</h4>
              <ul className="player-list">
                <li>1. Kenan (Organizator)</li>
                <li>2. Amar</li>
                <li>3. Emir</li>
                {/* ... Ostali igrači ... */}
                <li className="empty-slot">+ Slobodno mesto</li>
              </ul>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Card;