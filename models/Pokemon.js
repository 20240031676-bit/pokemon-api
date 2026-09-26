const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true
    },
    type: {
      type: [String],
      required: [true, 'type is required'],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'type must be a non-empty array (e.g. ["Fire"])'
      }
    },
    stats: {
      hp: { type: Number, required: [true, 'stats.hp is required'] },
      attack: { type: Number, required: [true, 'stats.attack is required'] },
      defense: { type: Number, required: [true, 'stats.defense is required'] },
      speed: { type: Number, required: [true, 'stats.speed is required'] }
    },
    generation: {
      type: Number
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pokemon', pokemonSchema);
