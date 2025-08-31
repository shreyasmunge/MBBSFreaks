import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(username, password);
    if (success) onLogin();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} required />
      <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
      <button type='submit'>Login</button>
    </form>
  );
}
