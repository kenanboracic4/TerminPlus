import React, { useState } from 'react';
import '../assets/css/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  


  return (
    <div className="register-container">
      <div className="register-glass-card">
        <div className="register-header">
          <h2>Kreiraj nalog</h2>
          <p>Pridruži se i započni svoju avanturu</p>
        </div>

        <form  className="register-form">
         

          <div className="input-group">
            <label htmlFor="email">Email adresa</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tvoj@email.com"
              value={formData.email}
              
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
             
              required
            />
          </div>

          

          <button type="submit" className="register-btn">
            Prijavi se
          </button>
        </form>

        <div className="register-footer">
          <p>Nemas  nalog? <a href="/register">Registruj se</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;