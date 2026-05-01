import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('member');
  const [error, setError] = useState('');
  
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password, role);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Authentication failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="glass-panel auth-box">
        <h2 className="text-center mb-4">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        {error && <div className="mb-4 text-center text-danger" style={{padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.25rem'}}>{error}</div>}
        
        <form onSubmit={handleSubmit} className="flex-col gap-4" style={{display: 'flex'}}>
          {!isLogin && (
            <>
              <input type="text" placeholder="Full Name" className="input-field" value={name} onChange={e => setName(e.target.value)} required />
              <select className="input-field" value={role} onChange={e => setRole(e.target.value)}>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </>
          )}
          <input type="email" placeholder="Email Address" className="input-field" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="input-field" value={password} onChange={e => setPassword(e.target.value)} required />
          
          <button type="submit" className="btn btn-primary w-full mt-4" style={{padding: '0.75rem'}}>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-muted mt-4" style={{fontSize: '0.875rem', cursor: 'pointer'}} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </p>
      </div>
    </div>
  );
};

export default Login;
