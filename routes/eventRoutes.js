const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const requireOrganizer = require('../middlewares/roleMiddleware');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent
} = require('../controllers/eventController');

router.get('/events', authenticate, getEvents);
router.get('/events/:id', authenticate, getEvent);
router.post('/events', authenticate, requireOrganizer, createEvent);
router.put('/events/:id', authenticate, requireOrganizer, updateEvent);
router.delete('/events/:id', authenticate, requireOrganizer, deleteEvent);
router.post('/events/:id/register', authenticate, registerForEvent);

module.exports = router;
