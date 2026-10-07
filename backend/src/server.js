require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

if (!process.env.JWT_SECRET) {
  console.error('Missing JWT_SECRET. Copy backend/.env.example to backend/.env first.');
  process.exit(1);
}

connectDB(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitness-tracker')
  .then(() => app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err.message);
    process.exit(1);
  });
