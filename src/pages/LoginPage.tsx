import { useState } from 'react';
import { logIn, signUp } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

    const handleSubmit = async () => {
    try {
      if (isSignUp) await signUp(email, password, name);
      else await logIn(email, password);
      navigate('/setup-quiz'); // Redirect to quiz page after successful login
    } catch (e: any) {
    const code = e.code;
    if (code === "auth/wrong-password" || code === "auth/invalid-credential") setError("Wrong password, try again.");
    else if (code === "auth/user-not-found") setError("No account found with that email.");
    else if (code === "auth/email-already-in-use") setError("Email already in use.");
    else setError("Something went wrong, try again.");
    }
    };
    
  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 24 }}>
      <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {isSignUp && (
        <input placeholder="Name" value={name}
          onChange={e => setName(e.target.value)} style={input} />
      )}
      <input placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)} style={input} />
      <input placeholder="Password" type="password" value={password}
        onChange={e => setPassword(e.target.value)} style={input} />

      <button onClick={handleSubmit} style={btn}>
        {isSignUp ? 'Create Account' : 'Sign In'}
      </button>

      <p onClick={() => setIsSignUp(!isSignUp)}
        style={{ cursor: 'pointer', color: '#6366f1', marginTop: 16 }}>
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
}

const input: React.CSSProperties = { 
  display: 'block', width: '100%', 
  padding: 10, marginBottom: 12, fontSize: 16 
};
const btn: React.CSSProperties = { 
  width: '100%', padding: 12, background: '#6366f1', 
  color: '#fff', border: 'none', borderRadius: 8, 
  fontSize: 16, cursor: 'pointer' 
};