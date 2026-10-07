require('dotenv').config();
const mongoose = require('mongoose');
const Exercise = require('./models/Exercise');

const exercises = [
  ['Bench Press', 'Chest', 'Barbell', 'Lie on a bench and press the bar up from chest level.'],
  ['Incline Dumbbell Press', 'Chest', 'Dumbbells', 'Press dumbbells upward on an incline bench.'],
  ['Push-Up', 'Chest', 'Bodyweight', 'Lower and press your body from a plank position.'],
  ['Chest Fly', 'Chest', 'Dumbbells', 'Arc dumbbells together over the chest.'],
  ['Pull-Up', 'Back', 'Bodyweight', 'Pull your chin above a bar from a dead hang.'],
  ['Barbell Row', 'Back', 'Barbell', 'Hinge forward and row the bar to your torso.'],
  ['Lat Pulldown', 'Back', 'Cable', 'Pull the bar down to your upper chest.'],
  ['Deadlift', 'Back', 'Barbell', 'Lift the bar from the floor to hip level with a flat back.'],
  ['Squat', 'Legs', 'Barbell', 'Lower hips below knees with the bar on your back, then stand.'],
  ['Lunge', 'Legs', 'Dumbbells', 'Step forward and lower the back knee toward the floor.'],
  ['Leg Press', 'Legs', 'Machine', 'Press the platform away with your feet.'],
  ['Romanian Deadlift', 'Legs', 'Barbell', 'Hinge at the hips with slightly bent knees.'],
  ['Calf Raise', 'Legs', 'Bodyweight', 'Rise onto your toes and lower slowly.'],
  ['Overhead Press', 'Shoulders', 'Barbell', 'Press the bar from shoulders to overhead.'],
  ['Lateral Raise', 'Shoulders', 'Dumbbells', 'Raise dumbbells out to your sides to shoulder height.'],
  ['Face Pull', 'Shoulders', 'Cable', 'Pull the rope toward your face with elbows high.'],
  ['Bicep Curl', 'Arms', 'Dumbbells', 'Curl dumbbells up by bending at the elbow.'],
  ['Tricep Dip', 'Arms', 'Bodyweight', 'Lower and press your body between parallel bars or a bench.'],
  ['Plank', 'Core', 'Bodyweight', 'Hold a straight line on forearms and toes.'],
  ['Crunch', 'Core', 'Bodyweight', 'Curl your shoulders toward your hips.'],
].map(([name, muscleGroup, equipment, description]) => ({ name, muscleGroup, equipment, description }));

async function run() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitness-tracker');
  for (const ex of exercises) {
    await Exercise.updateOne({ name: ex.name }, { $set: ex }, { upsert: true });
  }
  console.log(`Seeded ${exercises.length} exercises`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
