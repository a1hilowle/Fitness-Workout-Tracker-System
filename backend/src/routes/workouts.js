const express = require('express');
const mongoose = require('mongoose');
const Workout = require('../models/Workout');
const requireAuth = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

// POST /api/workouts  { name, exercises: [exerciseId, ...] }
router.post('/', async (req, res) => {
  try {
    const { name, exercises = [] } = req.body || {};
    if (!name || !String(name).trim()) {
      return res.status(400).json({ error: 'Workout name is required' });
    }
    if (!Array.isArray(exercises) || !exercises.every((id) => mongoose.isValidObjectId(id))) {
      return res.status(400).json({ error: 'exercises must be a list of exercise ids' });
    }
    const workout = await Workout.create({
      user: req.userId,
      name,
      exercises: exercises.map((id) => ({ exercise: id, sets: [] })),
    });
    res.status(201).json({ workout });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not create workout' });
  }
});

// GET /api/workouts  (current user's workouts, newest first)
router.get('/', async (req, res) => {
  const workouts = await Workout.find({ user: req.userId })
    .sort({ date: -1 })
    .populate('exercises.exercise');
  res.json({ workouts });
});

module.exports = router;
