
import { BrowserRouter } from 'react-router-dom';
import { login } from '../../../src/components/api/api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      if (response?.token) {
        navigate('/user_login');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label htmlFor="password">Password</label>
      <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />

      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
