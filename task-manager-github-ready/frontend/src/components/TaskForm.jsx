import { useState, useEffect } from 'react';

const empty = { title: '', description: '', status: 'todo', priority: 'medium', dueDate: '' };

export default function TaskForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || '',
        description: initial.description || '',
        status: initial.status || 'todo',
        priority: initial.priority || 'medium',
        dueDate: initial.dueDate ? initial.dueDate.slice(0, 10) : '',
      });
    } else {
      setForm(empty);
    }
  }, [initial]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-panel border border-line rounded-md w-full max-w-md p-5">
        <p className="text-accent mb-4">{initial ? '$ edit-task' : '$ new-task'}</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-dim text-xs block mb-1">title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              autoFocus
              className="w-full bg-bg border border-line rounded px-3 py-2 text-text focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="text-dim text-xs block mb-1">description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full bg-bg border border-line rounded px-3 py-2 text-text focus:outline-none focus:border-accent"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-dim text-xs block mb-1">status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full bg-bg border border-line rounded px-3 py-2 text-text focus:outline-none focus:border-accent"
              >
                <option value="todo">todo</option>
                <option value="in-progress">in-progress</option>
                <option value="done">done</option>
              </select>
            </div>
            <div>
              <label className="text-dim text-xs block mb-1">priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full bg-bg border border-line rounded px-3 py-2 text-text focus:outline-none focus:border-accent"
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-dim text-xs block mb-1">due date</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full bg-bg border border-line rounded px-3 py-2 text-text focus:outline-none focus:border-accent"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1.5 text-dim hover:text-text text-sm"
            >
              cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 border border-accent-dim text-accent rounded hover:bg-accent-dim/20 text-sm"
            >
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
