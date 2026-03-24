import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';

export default function NotesPage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar />
      <main className="flex-1 ml-64 flex">
        {/* File Tree Panel */}
        <div className="w-64 border-r border-border-subtle bg-bg-secondary/30 flex flex-col p-5">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-4">Notebooks</h3>
          
          <div className="flex-1 space-y-1">
            <FolderItem name="SSO Implementation" open>
              <FileItem name="Architecture" active icon="📄" color="text-accent-cyan" />
              <FileItem name="RBAC Rules" icon="📄" color="text-accent-emerald" />
            </FolderItem>
            <FolderItem name="Personal Notes" />
          </div>
        </div>

        {/* Note Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="max-w-3xl w-full mx-auto px-10 py-16">
            <h1 className="font-display text-4xl font-bold text-text-primary mb-6">
              Architecture Overview
            </h1>

            <div className="flex items-center gap-4 mb-10">
              <span className="px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-semibold">System Design</span>
              <span className="text-sm text-text-muted">Updated today</span>
            </div>

            <div className="prose-dark space-y-8">
              <p className="text-text-secondary leading-relaxed text-lg">
                This document outlines the architecture for our <span className="text-text-primary font-medium">SaaS Multi-App SSO portal</span>. The environment seamlessly shares authentication state between Node.js modules using securely partitioned cookies.
              </p>

              {/* Dynamic User Details Block */}
              <div className="glass-card p-6 border-l-4 border-l-accent-emerald relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
                  Active Session Profile
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-text-muted mb-1 text-xs uppercase">Logged in as</p>
                    <p className="text-text-primary font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-text-muted mb-1 text-xs uppercase">Email Address</p>
                    <p className="text-text-primary font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-text-muted mb-1 text-xs uppercase">Access Tier</p>
                    <p className="text-text-primary font-medium">{user?.roles?.map(r => r.name).join(', ') || 'Standard'}</p>
                  </div>
                  <div>
                    <p className="text-text-muted mb-1 text-xs uppercase">Node App</p>
                    <p className="text-text-primary font-medium">ZenNotes (Port 3001)</p>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Security Mechanisms</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 text-text-secondary">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-cyan flex-shrink-0" />
                  <div>
                    <strong className="text-text-primary block mb-1">HttpOnly JWT Cookies</strong>
                    Tokens are securely stored and immune to XSS attacks. They are synchronized seamlessly across `localhost:3000` and `localhost:3001`.
                  </div>
                </li>
                <li className="flex items-start gap-4 text-text-secondary">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-cyan flex-shrink-0" />
                  <div>
                    <strong className="text-text-primary block mb-1">Axios Interceptors</strong>
                    Centralized API error handling catches 401 Unauthorized responses and handles silent token refreshes automatically.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function FolderItem({ name, open, children }) {
  return (
    <div className="mb-2">
      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary rounded-md hover:bg-white/[0.04] transition-all cursor-pointer font-medium">
        <svg className={`w-3.5 h-3.5 text-text-muted transition-transform ${open ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span className="text-text-muted">📁</span>
        {name}
      </button>
      {open && children && (
        <div className="ml-5 border-l border-border-subtle/50 pl-2 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}

function FileItem({ name, active, icon, color }) {
  return (
    <button className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-all cursor-pointer font-medium ${active ? 'text-text-primary bg-white/[0.05] shadow-sm' : 'text-text-muted hover:text-text-primary hover:bg-white/[0.02]'}`}>
      <span className={active ? color : 'text-text-muted'}>{icon}</span>
      {name}
    </button>
  );
}
