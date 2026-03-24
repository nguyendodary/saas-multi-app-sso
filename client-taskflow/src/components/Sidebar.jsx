import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/authSlice';

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navItems = [
    { to: '/', label: 'TaskFlow App', icon: TaskFlowIcon },
    { to: '/zennotes', label: 'ZenNotes App', icon: ZenNotesIcon, external: 'http://localhost:3001' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-bg-sidebar border-r border-border-subtle flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-border-subtle">
        <h1 className="font-display text-lg font-bold text-text-primary tracking-tight">
          SaaS Multi-App
        </h1>
        <p className="text-[11px] font-bold tracking-widest uppercase text-accent-cyan mt-1">
          SSO Portal
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Applications</p>
        
        {navItems.map((item) =>
          item.external ? (
            <a
              key={item.label}
              href={item.external}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-text-muted hover:text-text-primary hover:bg-white/[0.04] transition-all duration-200"
            >
              <item.icon />
              {item.label}
              <span className="ml-auto opacity-40">
                <ExternalLinkIcon />
              </span>
            </a>
          ) : (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-accent-indigo bg-accent-indigo/[0.1] shadow-[inset_0_0_20px_rgba(79,70,229,0.05)]'
                    : 'text-text-muted hover:text-text-primary hover:bg-white/[0.04]'
                }`
              }
            >
              <item.icon />
              {item.label}
            </NavLink>
          )
        )}
      </nav>

      {/* User profile */}
      <div className="p-5 border-t border-border-subtle flex items-center gap-3 bg-white/[0.01]">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-indigo to-accent-purple flex items-center justify-center text-white font-bold shadow-md">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-primary truncate">{user?.name || 'User'}</p>
          <p className="text-xs text-text-muted truncate">
            {user?.roles?.map(r => r.name).join(', ') || 'Standard User'}
          </p>
        </div>
        <button
          onClick={() => dispatch(logout())}
          className="p-2 text-text-muted hover:text-accent-red hover:bg-accent-red/10 rounded-lg transition-colors cursor-pointer"
          title="Logout across all apps"
        >
          <LogoutIcon />
        </button>
      </div>
    </aside>
  );
}

function TaskFlowIcon() {
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 12h6M9 16h6" />
    </svg>
  );
}

function ZenNotesIcon() {
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <path d="M14 2v6h6" /><path d="M8 13h8M8 17h5" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
