require('dotenv').config();
const mongoose = require('mongoose');
const Pokemon = require('./models/Pokemon');
const seedData = require('./data/seedData');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pokemon_api';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Pokemon.deleteMany({});
    console.log('Cleared existing pokemon collection');

    const inserted = await Pokemon.insertMany(seedData);
    console.log(`Inserted ${inserted.length} pokemon`);

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
