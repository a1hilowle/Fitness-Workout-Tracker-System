import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password);
      navigate('/exercises');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form className="card auth" onSubmit={submit}>
      <h1>Create account</h1>
      {error && <p className="error">{error}</p>}
      <label>Name<input value={name} onChange={(e) => setName(e.target.value)} required /></label>
      <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
      <label>Password (min 8 characters)
        <input type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Register</button>
      <p>Already registered? <Link to="/login">Log in</Link></p>
    </form>
  );
}
