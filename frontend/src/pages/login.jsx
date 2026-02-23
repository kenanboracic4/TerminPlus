import React, { useState } from 'react';
import '../assets/css/Register.css';
import Spinner from 'react-bootstrap/Spinner';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
       
        login(data.token, data.user);
        setMessage('Uspješno ste se prijavili!');
      } else {
        setMessage(data.message || 'Pogrešni podaci.');
      }
    } catch (error) {
      setMessage('Greška prilikom prijave.');
    } finally {
      setLoading(false);
    }
  }




  return (
    <div className="register-container">
      <div className="register-glass-card">
        <div className="register-header">
          <h2>Kreiraj nalog</h2>
          <p>Pridruži se i započni svoju avanturu</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">


          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tvoj@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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



          <button type="submit" className="register-btn" disabled={loading} >
            {loading ? <Spinner animation="border" size="sm" /> : 'Prijavi se'}
          </button>
          {message && <p className="register-message">{message}</p>}
        </form>

        <div className="register-footer">
          <p>Nemas  nalog? <a href="/register">Registruj se</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;