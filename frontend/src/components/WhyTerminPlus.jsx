import React from 'react';
import '../assets/css/WhyTerminPlus.css';

const WhyTerminPlus = () => {
  const features = [
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
      text: "Dostupnost u realnom vremenu"
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
      text: "Trenutna potvrda rezervacije"
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
      text: "Pametne notifikacije"
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
      text: "Sistem ocjenjivanja igrača"
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>,
      text: "Panel za organizatore"
    }
  ];

  return (
    <section id="zasto-terminplus" className="why-section">
      <div className="why-container">
        
        <div className="why-content">
          <span className="why-subtitle">Zašto TerminPlus</span>
          <h2 className="why-title">
            Napravljeno za igrače. <br />
            <span className="text-accent">Učestvujte u igri.</span>
          </h2>

          <div className="features-list">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <span className="feature-text">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="why-mockup">
          <div className="mockup-float-container">
            <div className="mockup-glow"></div>

            <div className="phone-frame">
              <div className="btn-mute"></div>
              <div className="btn-vol-up"></div>
              <div className="btn-vol-down"></div>
              <div className="btn-power"></div>

              <div className="phone-screen">
                
                <div className="notch">
                  <div className="camera-dot"></div>
                  <div className="speaker-grill"></div>
                </div>

                <div className="phone-status-bar">
                  <span className="time">9:41</span>
                  <div className="status-icons">
                    <div className="signal-bars">
                      <i></i><i></i><i></i><i></i>
                    </div>
                    <div className="phone-battery"></div>
                  </div>
                </div>

                <div className="app-content">
                  <div className="app-header">
                    <span className="app-brand">TerminPlus</span>
                    <h3 className="app-title">Mečevi u blizini</h3>
                  </div>

                  <div className="app-matches">
                    <div className="match-card">
                      <div className="match-info">
                        <h4>5v5 Arena Termin</h4>
                        <p>Danas, 18:00</p>
                      </div>
                      <span className="match-badge badge-green">2 mjesta</span>
                    </div>

                    <div className="match-card">
                      <div className="match-info">
                        <h4>Nedjeljna Liga</h4>
                        <p>Ned, 10:00</p>
                      </div>
                      <span className="match-badge badge-blue">4 mjesta</span>
                    </div>

                    <div className="match-card">
                      <div className="match-info">
                        <h4>Noćni Termin</h4>
                        <p>Pet, 21:00</p>
                      </div>
                      <span className="match-badge badge-purple">1 mjesto</span>
                    </div>
                  </div>

                  <div className="app-btn">
                    Pronađi više mečeva
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyTerminPlus;