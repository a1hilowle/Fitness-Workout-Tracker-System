const mongoose = require('mongoose');

// Sprint 1: basic structure so a workout can be created with exercises.
// Sprint 2 will fill in sets/reps/weight logging via the `sets` array.
const setSchema = new mongoose.Schema(
  { reps: { type: Number, min: 0 }, weight: { type: Number, min: 0 } },
  { _id: false }
);

const workoutExerciseSchema = new mongoose.Schema(
  {
    exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
    sets: { type: [setSchema], default: [] },
  },
  { _id: false }
);

const workoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
    exercises: { type: [workoutExerciseSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Workout', workoutSchema);
