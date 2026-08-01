import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm border border-line bg-panel rounded-md p-6">
        <p className="text-accent mb-6">$ login</p>
        {error && <p className="text-danger text-sm mb-4">error: {error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-dim text-xs block mb-1">email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-bg border border-line rounded px-3 py-2 text-text focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="text-dim text-xs block mb-1">password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-bg border border-line rounded px-3 py-2 text-text focus:outline-none focus:border-accent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 border border-accent-dim text-accent rounded py-2 hover:bg-accent-dim/20 disabled:opacity-50"
          >
            {loading ? 'signing in...' : 'sign in'}
          </button>
        </form>
        <p className="text-dim text-sm mt-4">
          no account?{' '}
          <Link to="/register" className="text-accent hover:underline">
            register
          </Link>
        </p>
      </div>
    </div>
  );
}
