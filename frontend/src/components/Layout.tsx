import { Link, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export function ProtectedLayout() {
  const { user, loading, logout } = useAuth();
  if (loading) return <p className="center">Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <>
      <nav className="nav">
        <strong>FitTrack</strong>
        <Link to="/exercises">Exercise Library</Link>
        <Link to="/workouts/new">New Workout</Link>
        <span className="spacer" />
        <span>Hi, {user.name}</span>
        <button onClick={logout}>Log out</button>
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
