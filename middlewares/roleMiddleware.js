function requireOrganizer(req, res, next) {
    if (req.user.role !== 'organizer')
      return res.status(403).json({ error: 'Organizer access required' });
    next();
  }
  
  module.exports = requireOrganizer;
  