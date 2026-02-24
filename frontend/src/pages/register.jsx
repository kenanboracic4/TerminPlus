import React, { useState } from 'react';

import '../assets/css/Register.css';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage('');


      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('Uspešna registracija! Sada se možete prijaviti.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Greška prilikom registracije.');
      }
    } catch (error) {
      setMessage('Greška prilikom povezivanja sa serverom.');
    } finally {
      setLoading(false);
    }
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
            <label htmlFor="name">Ime</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Unesi svoje ime"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="tvoj@email.com"
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
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>



          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Registruj se'}
          </button>
          {message && <p className="register-message">{message}</p>}
        </form>

        <div className="register-footer">
          <p>Već imaš nalog? <Link to ="/login" >Prijavi se</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;