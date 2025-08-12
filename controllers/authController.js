const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/userModel');
const sendEmail = require('../utils/emailSender');
require('dotenv').config();

async function register(req, res) {
  const { name, email, password, role } = req.body;
  if (users.find(u => u.email === email))
    return res.status(400).json({ error: 'Email already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), name, email, password: hashed, role };
  users.push(user);

  await sendEmail(email, 'Registration Successful', 'Welcome!');
  res.status(201).json({ message: 'Registered successfully' });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
}

module.exports = { register, login };
