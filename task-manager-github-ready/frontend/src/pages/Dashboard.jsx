import { useEffect, useState, useCallback } from 'react';
import client from '../api/client';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const STATUS_CYCLE = { todo: 'in-progress', 'in-progress': 'done', done: 'todo' };

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;
      const { data } = await client.get('/tasks', { params });
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || 'failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, priorityFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function handleCycleStatus(task) {
    const next = STATUS_CYCLE[task.status];
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status: next } : t)));
    try {
      await client.put(`/tasks/${task.id}`, { status: next });
    } catch {
      fetchTasks();
    }
  }

  async function handleDelete(task) {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    try {
      await client.delete(`/tasks/${task.id}`);
    } catch {
      fetchTasks();
    }
  }

  async function handleFormSubmit(form) {
    try {
      if (editingTask) {
        await client.put(`/tasks/${editingTask.id}`, form);
      } else {
        await client.post('/tasks', form);
      }
      setFormOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'save failed');
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <p className="text-dim">
          <span className="text-accent">$</span> list-tasks
          {statusFilter && ` --status=${statusFilter}`}
          {priorityFilter && ` --priority=${priorityFilter}`}
        </p>
        <button
          onClick={() => {
            setEditingTask(null);
            setFormOpen(true);
          }}
          className="border border-accent-dim text-accent rounded px-3 py-1.5 text-sm hover:bg-accent-dim/20"
        >
          + new task
        </button>
      </div>

      <div className="flex gap-2 mb-6 text-xs">
        {['', 'todo', 'in-progress', 'done'].map((s) => (
          <button
            key={s || 'all'}
            onClick={() => setStatusFilter(s)}
            className={`px-2 py-1 rounded border ${
              statusFilter === s ? 'border-accent text-accent' : 'border-line text-dim'
            }`}
          >
            {s || 'all'}
          </button>
        ))}
        <span className="text-line">|</span>
        {['', 'low', 'medium', 'high'].map((p) => (
          <button
            key={p || 'any'}
            onClick={() => setPriorityFilter(p)}
            className={`px-2 py-1 rounded border ${
              priorityFilter === p ? 'border-accent text-accent' : 'border-line text-dim'
            }`}
          >
            {p || 'any priority'}
          </button>
        ))}
      </div>

      {error && <p className="text-danger text-sm mb-4">error: {error}</p>}

      {loading ? (
        <p className="text-dim">loading...</p>
      ) : tasks.length === 0 ? (
        <p className="text-dim">no tasks match this filter.</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onCycleStatus={handleCycleStatus}
              onEdit={(t) => {
                setEditingTask(t);
                setFormOpen(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {formOpen && (
        <TaskForm
          initial={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setFormOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
