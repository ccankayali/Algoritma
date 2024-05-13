import React, { useState } from 'react';
import axios from 'axios';

function Forgot() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/forgot-password', { email });
            setMessage(response.data.message);
            console.log(response.data);
        } catch (error) {
            setMessage('Şifre sıfırlama sırasında bir hata oluştu.');
        }
    };

    return (
        <div>
            <h2>Şifremi Unuttum</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>E-posta:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    
                </div>
                <button type="submit">Şifre Sıfırla</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Forgot;
