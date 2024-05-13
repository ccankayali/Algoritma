import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/signup', { name, email, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Kayıt başarısız oldu.');
    }
  };

  return (
    <div style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h2>Kayıt Ol</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" className="form-control" placeholder="İsim" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '1rem'}} />
          <input type="email" className="form-control" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '1rem'}} />
          <input type="password" className="form-control" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '1rem'}} />
          <button type="submit" className="btn btn-primary">Kayıt Ol</button>
          <Link to="/Login" className="btn btn-secondary">Giriş</Link>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Register;
