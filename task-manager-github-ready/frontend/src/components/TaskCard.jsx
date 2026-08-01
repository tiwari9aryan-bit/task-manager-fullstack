const STATUS_MARK = {
  todo: '[ ]',
  'in-progress': '[~]',
  done: '[x]',
};

const PRIORITY_COLOR = {
  low: 'text-dim',
  medium: 'text-warn',
  high: 'text-danger',
};

export default function TaskCard({ task, onCycleStatus, onEdit, onDelete }) {
  return (
    <div className="border border-line rounded-md p-4 bg-panel hover:border-accent-dim transition-colors group">
      <div className="flex items-start justify-between gap-3">
        <button
          onClick={() => onCycleStatus(task)}
          className="font-mono text-accent text-lg leading-none pt-0.5"
          title="cycle status"
        >
          {STATUS_MARK[task.status]}
        </button>

        <div className="flex-1 min-w-0">
          <p className={`truncate ${task.status === 'done' ? 'line-through text-dim' : 'text-text'}`}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-dim text-sm mt-1 line-clamp-2">{task.description}</p>
          )}
          <div className="flex items-center gap-3 mt-2 text-xs">
            <span className={PRIORITY_COLOR[task.priority]}>{task.priority}</span>
            {task.dueDate && (
              <span className="text-dim">due {new Date(task.dueDate).toLocaleDateString()}</span>
            )}
          </div>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(task)} className="text-dim hover:text-accent text-xs">
            edit
          </button>
          <button onClick={() => onDelete(task)} className="text-dim hover:text-danger text-xs">
            del
          </button>
        </div>
      </div>
    </div>
  );
}
