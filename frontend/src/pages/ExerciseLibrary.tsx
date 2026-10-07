import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Exercise } from '../types';

const GROUPS = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];

export default function ExerciseLibrary() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [group, setGroup] = useState('All');
  const [error, setError] = useState('');

  useEffect(() => {
    const qs = group === 'All' ? '' : `?muscleGroup=${group}`;
    api<{ exercises: Exercise[] }>(`/exercises${qs}`)
      .then((d) => setExercises(d.exercises))
      .catch((e: Error) => setError(e.message));
  }, [group]);

  return (
    <>
      <h1>Exercise Library</h1>
      <div className="chips">
        {GROUPS.map((g) => (
          <button key={g} className={g === group ? 'chip active' : 'chip'} onClick={() => setGroup(g)}>{g}</button>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
      {exercises.length === 0 && !error && <p>No exercises found. Run <code>npm run seed</code> in the backend.</p>}
      <div className="grid">
        {exercises.map((ex) => (
          <div key={ex._id} className="card">
            <h3>{ex.name}</h3>
            <p className="muted">{ex.muscleGroup} · {ex.equipment}</p>
            <p>{ex.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
