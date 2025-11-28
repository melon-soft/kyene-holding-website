import React, { useState } from 'react';
// FIX: Changed import to a default import to resolve module resolution error.
import Logo from '../components/Logo';

interface LoginPageProps {
  navigate: (path: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you'd use a secure authentication method.
    // For this demo, we'll use hardcoded credentials.
    if (username === 'admin' && password === 'password') {
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <Logo className="w-52 mx-auto text-slate-800" />
          <h1 className="mt-4 text-2xl font-bold text-center text-slate-900">Admin Login</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <label htmlFor="username" className="text-sm font-medium text-slate-700">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin"
            />
          </div>
          <div>
            <label htmlFor="password"className="text-sm font-medium text-slate-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="password"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
