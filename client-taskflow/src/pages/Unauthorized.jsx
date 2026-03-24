import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-accent-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 9v4m0 4h.01" />
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
        </div>
        <h1 className="font-display text-3xl font-bold text-text-primary mb-3">Access Denied</h1>
        <p className="text-text-secondary mb-8 leading-relaxed">
          You don't have the required permissions to access <strong className="text-accent-cyan">TaskFlow</strong>. 
          This application requires an <strong className="text-accent-purple">Admin</strong> role.
        </p>
        <div className="flex gap-3 justify-center">
          <a
            href="http://localhost:3001"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent-indigo to-accent-purple text-white text-sm font-semibold hover:shadow-lg hover:shadow-accent-indigo/20 transition-all"
          >
            Go to ZenNotes
          </a>
          <a
            href="http://localhost:5000/login"
            className="px-6 py-3 rounded-lg bg-white/[0.04] border border-border-subtle text-text-secondary text-sm font-semibold hover:text-text-primary hover:border-border-focus transition-all"
          >
            Switch Account
          </a>
        </div>
      </div>
    </div>
  );
}
