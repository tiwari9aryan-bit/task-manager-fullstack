import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b border-line px-6 py-4 flex items-center justify-between">
      <div className="text-accent tracking-tight">
        <span className="text-dim">~/</span>task-manager
        <span className="blink text-accent">_</span>
      </div>
      {user && (
        <div className="flex items-center gap-4 text-sm text-dim">
          <span>
            user@<span className="text-text">{user.name}</span>
          </span>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="border border-line px-3 py-1 rounded hover:border-accent hover:text-accent transition-colors"
          >
            logout
          </button>
        </div>
      )}
    </header>
  );
}
