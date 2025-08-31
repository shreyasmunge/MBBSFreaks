import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(username, email, password, password2);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} required />
      <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
      <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
      <input type='password' placeholder='Confirm Password' value={password2} onChange={e => setPassword2(e.target.value)} required />
      <button type='submit'>Register</button>
    </form>
  );
}
