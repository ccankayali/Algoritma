import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Başarıyla giriş yapıldı!');
                navigate('/Main');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Giriş işlemi sırasında bir hata oluştu:', error);
        }
    };

    return (
        <div style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', color: 'white' }}>
                <h2>Giriş Yap</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="E-posta"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ padding: '1rem' }}
                    />
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ padding: '1rem' }}
                    />
                    <button type="submit" className="btn btn-primary">Giriş Yap</button>
                </form>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default Login;
