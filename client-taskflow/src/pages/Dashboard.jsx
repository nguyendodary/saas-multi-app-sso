import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar />
      <main className="flex-1 ml-64 p-10">
        <header className="mb-10">
          <h1 className="font-display text-3xl font-bold text-text-primary mb-3">
            TaskFlow Workspace
          </h1>
          <p className="text-text-secondary text-sm">
            Welcome back, <span className="font-semibold text-text-primary">{user?.name}</span>. You are logged in via SSO with <span className="text-accent-cyan font-medium">{user?.roles?.map(r => r.name).join(', ')}</span> privileges.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Column title="To Do" count={2}>
            <TaskCard 
              title="Review SSO Architecture" 
              tag="Security" 
              tagColor="bg-accent-purple/20 text-accent-purple border border-accent-purple/30" 
            />
            <TaskCard 
              title="Setup RBAC Middlewares" 
              tag="Backend" 
              tagColor="bg-accent-indigo/20 text-accent-indigo border border-accent-indigo/30" 
            />
          </Column>

          <Column title="In Progress" count={1}>
            <TaskCard 
              title="Build ZenNotes Application" 
              tag="Frontend" 
              tagColor="bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30" 
            />
          </Column>

          <Column title="Done" count={1}>
            <TaskCard 
              title="Configure Auth Server" 
              tag="Done" 
              tagColor="bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/30" 
            />
          </Column>
        </div>
      </main>
    </div>
  );
}

function Column({ title, count, children }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="font-semibold text-text-primary text-sm tracking-wide">{title}</h3>
        <span className="w-5 h-5 rounded-md bg-white/[0.05] text-text-muted text-[11px] font-bold flex items-center justify-center border border-border-subtle">
          {count}
        </span>
      </div>
      <div className="flex-1 bg-white/[0.02] border border-border-subtle/50 rounded-xl p-3 space-y-3">
        {children}
      </div>
    </div>
  );
}

function TaskCard({ title, tag, tagColor }) {
  return (
    <div className="glass-card p-4 hover:border-border-focus transition-all duration-300 cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${tagColor}`}>
          {tag}
        </span>
      </div>
      <h4 className="font-medium text-text-primary text-sm group-hover:text-accent-indigo transition-colors leading-relaxed">
        {title}
      </h4>
    </div>
  );
}
