import { FormEvent, useEffect, useState } from 'react';
import { api } from '../api';
import type { Exercise } from '../types';

export default function NewWorkout() {
  const [name, setName] = useState('');
  const [library, setLibrary] = useState<Exercise[]>([]);
  const [selected, setSelected] = useState<Exercise[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api<{ exercises: Exercise[] }>('/exercises')
      .then((d) => setLibrary(d.exercises))
      .catch((e: Error) => setError(e.message));
  }, []);

  const toggle = (ex: Exercise) =>
    setSelected((cur) => (cur.some((c) => c._id === ex._id) ? cur.filter((c) => c._id !== ex._id) : [...cur, ex]));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await api('/workouts', { method: 'POST', body: { name, exercises: selected.map((s) => s._id) } });
      setMessage('Workout created! (Logging sets, reps and weights comes in Sprint 2.)');
      setName('');
      setSelected([]);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form onSubmit={submit}>
      <h1>New Workout</h1>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <label>Workout name
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Push Day" required />
      </label>

      <h2>Selected ({selected.length})</h2>
      {selected.length === 0 ? <p className="muted">Pick exercises below.</p> : (
        <ol>{selected.map((s) => <li key={s._id}>{s.name}</li>)}</ol>
      )}

      <h2>Choose exercises</h2>
      <div className="grid">
        {library.map((ex) => {
          const on = selected.some((s) => s._id === ex._id);
          return (
            <button type="button" key={ex._id} className={on ? 'card pick active' : 'card pick'} onClick={() => toggle(ex)}>
              <strong>{ex.name}</strong>
              <span className="muted">{ex.muscleGroup}</span>
            </button>
          );
        })}
      </div>
      <button type="submit" disabled={!name.trim() || selected.length === 0}>Create workout</button>
    </form>
  );
}
