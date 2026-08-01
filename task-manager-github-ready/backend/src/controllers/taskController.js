const Task = require('../models/Task');

const VALID_STATUSES = new Set(['todo', 'in-progress', 'done']);
const VALID_PRIORITIES = new Set(['low', 'medium', 'high']);

function validateTaskFields({ status, priority }) {
  if (status !== undefined && !VALID_STATUSES.has(status)) {
    return 'status must be one of: todo, in-progress, done';
  }
  if (priority !== undefined && !VALID_PRIORITIES.has(priority)) {
    return 'priority must be one of: low, medium, high';
  }
  return null;
}

exports.getTasks = async (req, res) => {
  try {
    const { status, priority } = req.query;
    const where = { userId: req.userId };
    if (status) where.status = status;
    if (priority) where.priority = priority;

    const tasks = await Task.findAll({ where, order: [['createdAt', 'DESC']] });
    return res.json(tasks);
  } catch (err) {
    console.error('Failed to fetch tasks:', err);
    return res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.json(task);
  } catch (err) {
    console.error('Failed to fetch task:', err);
    return res.status(500).json({ message: 'Failed to fetch task' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    if (!title || !title.trim()) return res.status(400).json({ message: 'title is required' });

    const validationError = validateTaskFields({ status, priority });
    if (validationError) return res.status(400).json({ message: validationError });

    const task = await Task.create({
      title: title.trim(),
      description,
      status,
      priority,
      dueDate,
      userId: req.userId,
    });
    return res.status(201).json(task);
  } catch (err) {
    console.error('Failed to create task:', err);
    return res.status(500).json({ message: 'Failed to create task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const { title, description, status, priority, dueDate } = req.body;
    const validationError = validateTaskFields({ status, priority });
    if (validationError) return res.status(400).json({ message: validationError });
    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ message: 'title cannot be empty' });
    }

    await task.update({
      title: title !== undefined ? title.trim() : task.title,
      description: description ?? task.description,
      status: status ?? task.status,
      priority: priority ?? task.priority,
      dueDate: dueDate ?? task.dueDate,
    });

    return res.json(task);
  } catch (err) {
    console.error('Failed to update task:', err);
    return res.status(500).json({ message: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.destroy();
    return res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Failed to delete task:', err);
    return res.status(500).json({ message: 'Failed to delete task' });
  }
};
