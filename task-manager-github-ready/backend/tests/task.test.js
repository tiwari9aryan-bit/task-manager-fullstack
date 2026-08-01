const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/db');

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  const res = await request(app).post('/api/auth/register').send({
    name: 'Aryan',
    email: 'tasks@example.com',
    password: 'password123',
  });
  token = res.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Tasks', () => {
  let taskId;

  it('rejects unauthenticated requests', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(401);
  });

  it('creates a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Write README', priority: 'high' });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Write README');
    taskId = res.body.id;
  });

  it('lists tasks for the authenticated user', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('updates a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'done' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('done');
  });

  it('deletes a task', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});
