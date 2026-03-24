export default function KanbanBoard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* To Do Column */}
      <KanbanColumn
        title="To Do"
        count={4}
        color="text-accent-amber"
        dot="bg-accent-amber"
        cards={[
          {
            tag: 'HIGH PRIORITY',
            tagColor: 'bg-accent-red/15 text-accent-red',
            title: 'Implement multi-region database replication',
            description: 'Ensure consistency across US-East and EU-West regions with low latency...',
            date: 'Oct 28',
            icon: '🔥',
            avatars: 1,
          },
          {
            tag: 'CORE LOGIC',
            tagColor: 'bg-accent-indigo/15 text-accent-indigo',
            title: 'OAuth2 Identity Provider Integration',
            description: '',
            date: '',
            icon: '',
            avatars: 2,
            comments: 10,
          },
        ]}
      />

      {/* In Progress Column */}
      <KanbanColumn
        title="In Progress"
        count={3}
        color="text-accent-cyan"
        dot="bg-accent-cyan"
        cards={[
          {
            tag: 'USER EXPERIENCE',
            tagColor: 'bg-accent-purple/15 text-accent-purple',
            title: 'Re-architecting Dashboard Grid System',
            description: 'Moving to a flexible Bento-style grid for better data visualization scaling.',
            progress: 65,
            subtasks: '4/6 Subtasks',
            avatars: 3,
            files: 6,
          },
          {
            tag: 'DEVOPS',
            tagColor: 'bg-accent-emerald/15 text-accent-emerald',
            title: 'CI/CD Pipeline Optimization',
            description: '',
            date: '3d left',
            avatars: 2,
          },
        ]}
      />

      {/* Done Column */}
      <KanbanColumn
        title="Done"
        count={0}
        color="text-accent-emerald"
        dot="bg-accent-emerald"
        cards={[
          {
            tag: 'SUCCESS',
            tagColor: 'bg-accent-emerald/15 text-accent-emerald',
            title: 'API Documentation Final Review',
            description: '',
            completed: 'Completed Oct 18',
            avatars: 1,
          },
          {
            tag: 'COMPLIANCE',
            tagColor: 'bg-accent-cyan/15 text-accent-cyan',
            title: 'GDPR Audit Certification',
            description: '',
            completed: 'Completed Oct 15',
            avatars: 1,
          },
        ]}
      />
    </div>
  );
}

function KanbanColumn({ title, count, color, dot, cards }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dot}`} />
          <h3 className={`text-sm font-semibold ${color}`}>{title}</h3>
          <span className="text-[11px] text-text-muted bg-white/5 px-1.5 py-0.5 rounded">{count || cards.length}</span>
        </div>
        <button className="text-text-muted hover:text-text-primary transition-colors cursor-pointer">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>

      <div className="space-y-3">
        {cards.map((card, i) => (
          <KanbanCard key={i} {...card} />
        ))}
      </div>
    </div>
  );
}

function KanbanCard({ tag, tagColor, title, description, date, progress, subtasks, completed, avatars, comments, files }) {
  return (
    <div className="glass-card p-4 hover:border-border-focus/40 transition-all duration-300 cursor-pointer group hover:-translate-y-0.5">
      {tag && (
        <span className={`tag mb-3 ${tagColor}`}>{tag}</span>
      )}
      <h4 className="text-sm font-semibold text-text-primary mb-1 group-hover:text-accent-cyan transition-colors">
        {title}
      </h4>
      {description && (
        <p className="text-xs text-text-muted leading-relaxed mb-3">{description}</p>
      )}

      {/* Progress bar */}
      {progress !== undefined && (
        <div className="mb-3">
          <div className="flex justify-between text-[11px] mb-1.5">
            <span className="text-text-muted">{progress}% Complete</span>
            <span className="text-text-muted">{subtasks}</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-indigo to-accent-purple rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-subtle/50">
        <div className="flex items-center gap-2">
          {date && (
            <span className="text-[11px] text-text-muted flex items-center gap-1">
              📅 {date}
            </span>
          )}
          {completed && (
            <span className="text-[11px] text-accent-emerald">{completed}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {comments !== undefined && (
            <span className="text-[11px] text-text-muted flex items-center gap-1">
              💬 {comments} comments
            </span>
          )}
          {files !== undefined && (
            <span className="text-[11px] text-text-muted flex items-center gap-1">
              📎 {files} files
            </span>
          )}
          {/* Avatar stack */}
          <div className="flex -space-x-2">
            {Array.from({ length: avatars || 0 }).map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-bg-card-solid bg-gradient-to-br from-accent-indigo/60 to-accent-purple/60"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
