import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import './WorkoutDetail.css'; // Create this CSS file for styling

export default function WorkoutDetail() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, 'workouts', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setWorkout({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Workout not found');
        }
      } catch (err) {
        console.error('Error fetching workout:', err);
        setError('Failed to load workout');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading workout details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!workout) {
    return <div>No workout data available</div>;
  }

  return (
    <div className="workout-detail-container">
      <h2>{workout.name}</h2>
      
      <div className="workout-meta">
        <span>Duration: {workout.duration} minutes</span>
        <span>Level: {workout.level}</span>
        {workout.emoji && <span className="emoji">{workout.emoji}</span>}
      </div>

      <div className="workout-description">
        <h3>Description</h3>
        <p>{workout.description || 'No description provided.'}</p>
      </div>

      <div className="workout-exercises">
        <h3>Exercises</h3>
        {workout.exercises?.length > 0 ? (
          <ul>
            {workout.exercises.map((exercise, index) => (
              <li key={index}>
                <strong>{exercise.name}</strong>: {exercise.sets}x{exercise.reps}
              </li>
            ))}
          </ul>
        ) : (
          <p>No exercises listed for this workout.</p>
        )}
      </div>

      <button 
        className="start-workout-btn"
        onClick={() => console.log('Starting workout:', workout.id)}
      >
        Start This Workout
      </button>
    </div>
  );
}