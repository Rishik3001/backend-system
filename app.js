require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

app.use(express.json());
app.use('/', authRoutes);
app.use('/', eventRoutes);

module.exports = app;
