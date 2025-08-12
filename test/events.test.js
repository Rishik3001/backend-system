const tap = require('tap');
const supertest = require('supertest');
const app = require('../app');
const server = supertest(app);

let organizerToken = '';
let attendeeToken = '';
let eventId = '';

const organizer = {
  name: 'Alice Organizer',
  email: 'alice@example.com',
  password: 'Password123',
  role: 'organizer'
};

const attendee = {
  name: 'Bob Attendee',
  email: 'bob@example.com',
  password: 'Password123',
  role: 'attendee'
};

// ===== Auth Tests =====

tap.test('POST /register organizer', async (t) => {
  const res = await server.post('/register').send(organizer);
  t.equal(res.status, 201);
  t.has(res.body, { message: 'Registered successfully' });
  t.end();
});

tap.test('POST /register attendee', async (t) => {
  const res = await server.post('/register').send(attendee);
  t.equal(res.status, 201);
  t.has(res.body, { message: 'Registered successfully' });
  t.end();
});

tap.test('POST /login organizer', async (t) => {
  const res = await server.post('/login').send({
    email: organizer.email,
    password: organizer.password
  });
  t.equal(res.status, 200);
  t.hasOwnProp(res.body, 'token');
  organizerToken = res.body.token;
  t.end();
});

tap.test('POST /login attendee', async (t) => {
  const res = await server.post('/login').send({
    email: attendee.email,
    password: attendee.password
  });
  t.equal(res.status, 200);
  t.hasOwnProp(res.body, 'token');
  attendeeToken = res.body.token;
  t.end();
});

// ===== Event Tests =====

tap.test('Organizer creates an event', async (t) => {
  const res = await server
    .post('/events')
    .set('Authorization', `Bearer ${organizerToken}`)
    .send({
      title: 'AI Summit 2025',
      description: 'Latest AI innovations',
      date: '2025-11-02',
      time: '09:30'
    });
  t.equal(res.status, 201);
  t.hasOwnProp(res.body, 'id');
  eventId = res.body.id;
  t.end();
});

tap.test('Attendee gets all events', async (t) => {
  const res = await server
    .get('/events')
    .set('Authorization', `Bearer ${attendeeToken}`);
  t.equal(res.status, 200);
  t.type(res.body, Array);
  t.ok(res.body.length > 0);
  t.end();
});

tap.test('Attendee registers for event', async (t) => {
  const res = await server
    .post(`/events/${eventId}/register`)
    .set('Authorization', `Bearer ${attendeeToken}`);
  t.equal(res.status, 200);
  t.has(res.body, { message: 'Registered for event' });
  t.end();
});

tap.test('Attendee cannot register twice', async (t) => {
  const res = await server
    .post(`/events/${eventId}/register`)
    .set('Authorization', `Bearer ${attendeeToken}`);
  t.equal(res.status, 400);
  t.hasOwnProp(res.body, 'error');
  t.end();
});

tap.test('Organizer updates the event', async (t) => {
  const res = await server
    .put(`/events/${eventId}`)
    .set('Authorization', `Bearer ${organizerToken}`)
    .send({
      description: 'Updated AI Summit details',
      time: '10:00'
    });
  t.equal(res.status, 200);
  t.equal(res.body.description, 'Updated AI Summit details');
  t.end();
});

tap.test('Organizer deletes the event', async (t) => {
  const res = await server
    .delete(`/events/${eventId}`)
    .set('Authorization', `Bearer ${organizerToken}`);
  t.equal(res.status, 200);
  t.has(res.body, { message: 'Deleted successfully' });
  t.end();
});


tap.teardown(() => {
  process.exit(0);
});
