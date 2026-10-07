import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedLayout } from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import ExerciseLibrary from './pages/ExerciseLibrary';
import NewWorkout from './pages/NewWorkout';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/exercises" element={<ExerciseLibrary />} />
        <Route path="/workouts/new" element={<NewWorkout />} />
      </Route>
      <Route path="*" element={<Navigate to="/exercises" replace />} />
    </Routes>
  );
}
