import React from 'react';
import '../assets/css/HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-section" id="kako-funkcionise">
      <div className="how-container">
        
    
        <div className="how-header">
          <h2 className="how-title">KAKO TERMINPLUS FUNKCIONIŠE</h2>
          <div className="title-underline"></div>
        </div>

       
        <div className="steps-wrapper">
          
        
          <div className="step-card">
            <div className="step-icon-wrapper">
              <svg className="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
            <h3 className="step-title">Pretraži slobodne termine</h3>
            <p className="step-description">
              Pronađi fudbalske mečeve u tvojoj blizini za sekundu. Filtriraj po lokaciji, 
              vrsti terena i nivou vještine kako bi našao savršen teren.
            </p>
          </div>

          
          <div className="step-connector"></div>

          
          <div className="step-card">
            <div className="step-icon-wrapper">
              <svg className="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="step-title">Pridruži se ili kreiraj igru</h3>
            <p className="step-description">
              Odmah osiguraj svoje mjesto ili organizuj vlastiti termin. Upravljanje 
              ekipama i brojem igrača nikada nije bilo ovako jednostavno.
            </p>
          </div>

          
          <div className="step-connector"></div>

         
          <div className="step-card">
            <div className="step-icon-wrapper">
              <svg className="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
                <path d="M16.5 7.5l2.5-2.5"></path>
                <path d="M7.5 7.5l-2.5-2.5"></path>
              </svg>
            </div>
            <h3 className="step-title">Igraj i prati statistiku</h3>
            <p className="step-description">
              Izađi na teren i pokaži svoje vještine. Poslije meča, prati svoj rejting, 
              provjeri tabele i unaprijedi svoj profil.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;