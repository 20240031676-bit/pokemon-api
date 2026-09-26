require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();
app.use(express.json());

// Simple request log — helpful while testing with curl/Postman
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/pokemon', pokemonRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Pokemon API is running. Try GET /pokemon' });
});

// Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pokemon_api';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
