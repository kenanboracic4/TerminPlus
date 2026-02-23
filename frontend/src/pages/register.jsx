import React, { useState } from 'react';
import '../assets/css/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Podaci spremni za backend:', formData);
    // Ovdje kasnije dodaješ logiku za API poziv
  };

  return (
    <div className="register-container">
      <div className="register-glass-card">
        <div className="register-header">
          <h2>Kreiraj nalog</h2>
          <p>Pridruži se i započni svoju avanturu</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label htmlFor="name">Ime i prezime</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Unesi svoje ime"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email adresa</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tvoj@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Lozinka</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="location">Lokacija</label>
            <div className="select-wrapper">
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Odaberi svoj grad</option>
                <option value="sarajevo">Sarajevo</option>
                <option value="mostar">Mostar</option>
                <option value="banja_luka">Banja Luka</option>
                <option value="tuzla">Tuzla</option>
                <option value="zenica">Zenica</option>
              </select>
            </div>
          </div>

          <button type="submit" className="register-btn">
            Registruj se
          </button>
        </form>

        <div className="register-footer">
          <p>Već imaš nalog? <a href="/login">Prijavi se</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;