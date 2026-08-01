import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm border border-line bg-panel rounded-md p-6">
        <p className="text-accent mb-6">$ register</p>
        {error && <p className="text-danger text-sm mb-4">error: {error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-dim text-xs block mb-1">name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-bg border border-line rounded px-3 py-2 text-text focus:outline-none focus:border-accent"
            />
          </div>
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
              minLength={6}
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
            {loading ? 'creating account...' : 'create account'}
          </button>
        </form>
        <p className="text-dim text-sm mt-4">
          have an account?{' '}
          <Link to="/login" className="text-accent hover:underline">
            sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
