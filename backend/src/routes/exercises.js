const express = require('express');
const Exercise = require('../models/Exercise');
const requireAuth = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

// GET /api/exercises?muscleGroup=Chest&q=press
router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.muscleGroup) filter.muscleGroup = req.query.muscleGroup;
  if (req.query.q) {
    const escaped = String(req.query.q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.name = new RegExp(escaped, 'i');
  }
  const exercises = await Exercise.find(filter).sort({ muscleGroup: 1, name: 1 });
  res.json({ exercises });
});

module.exports = router;
