const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  muscleGroup: {
    type: String,
    required: true,
    enum: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'],
  },
  equipment: { type: String, default: 'Bodyweight' },
  description: { type: String, default: '' },
});

module.exports = mongoose.model('Exercise', exerciseSchema);
