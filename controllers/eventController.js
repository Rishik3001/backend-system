const events = require('../models/eventModel');
const users = require('../models/userModel');
const sendEmail = require('../utils/emailSender');

function getEvents(req, res) {
  res.json(events);
}

function getEvent(req, res) {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json(event);
}

function createEvent(req, res) {
  const { title, description, date, time } = req.body;
  const event = {
    id: Date.now(),
    title, description, date, time,
    organizer: req.user.email,
    participants: []
  };
  events.push(event);
  res.status(201).json(event);
}

function updateEvent(req, res) {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ error: 'Event not found' });
  if (event.organizer !== req.user.email) return res.status(403).json({ error: 'Permission denied' });

  Object.assign(event, req.body);
  res.json(event);
}

function deleteEvent(req, res) {
  const index = events.findIndex(e => e.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Event not found' });
  if (events[index].organizer !== req.user.email) return res.status(403).json({ error: 'Permission denied' });

  events.splice(index, 1);
  res.json({ message: 'Deleted successfully' });
}

async function registerForEvent(req, res) {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ error: 'Event not found' });

  if (event.participants.find(p => p === req.user.email))
    return res.status(400).json({ error: 'Already registered' });

  event.participants.push(req.user.email);

  await sendEmail(req.user.email, 'Event Registration', `Registered for event ${event.title}`);
  res.json({ message: 'Registered for event' });
}

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent
};
