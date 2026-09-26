const express = require('express');
const router = express.Router();
const Pokemon = require('../models/Pokemon');

// GET /pokemon - return the full list
router.get('/', async (req, res) => {
  try {
    const pokemon = await Pokemon.find();
    res.status(200).json(pokemon);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// GET /pokemon/:id - return a single item
router.get('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.status(200).json(pokemon);
  } catch (err) {
    // Invalid ObjectId format also counts as "not found" from the client's view
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// POST /pokemon - create a new item
router.post('/', async (req, res) => {
  try {
    const { name, type, stats } = req.body;

    if (!name || !type || !stats) {
      return res.status(400).json({
        error: 'Missing required field(s): name, type, and stats are all required'
      });
    }

    const newPokemon = new Pokemon(req.body);
    await newPokemon.save();
    res.status(201).json(newPokemon);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// PUT /pokemon/:id - update an existing item
router.put('/:id', async (req, res) => {
  try {
    const updated = await Pokemon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: 'query'
    });

    if (!updated) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// DELETE /pokemon/:id - delete an item
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Pokemon.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    res.status(200).json({ message: 'Pokemon deleted successfully', pokemon: deleted });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
