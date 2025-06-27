import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

const WorkoutSession = ({ workout, onComplete, onExit }) => {
  const { currentUser } = useAuth();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);

  const currentExercise = workout.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / workout.exercises.length) * 100;

  useEffect(() => {
    if (currentExercise && isActive) {
      const duration = currentExercise.duration || (currentExercise.reps * currentExercise.sets * 2);
      setTimeRemaining(duration);
    }
  }, [currentExerciseIndex, isActive, currentExercise]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            handleExerciseComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const startSession = () => {
    setSessionStartTime(new Date());
    setIsActive(true);
    setShowInstructions(false);
  };

  const pauseSession = () => {
    setIsActive(false);
  };

  const resumeSession = () => {
    setIsActive(true);
  };

  const handleExerciseComplete = () => {
    const completedExercise = {
      ...currentExercise,
      completedAt: new Date(),
      timeSpent: currentExercise.duration || (currentExercise.reps * currentExercise.sets * 2)
    };

    setCompletedExercises(prev => [...prev, completedExercise]);

    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setIsActive(false);
      // Brief pause between exercises
      setTimeout(() => setIsActive(true), 3000);
    } else {
      // Workout complete
      setSessionComplete(true);
      setIsActive(false);
    }
  };

  const skipExercise = () => {
    handleExerciseComplete();
  };

  const handleSessionComplete = async () => {
    const sessionData = {
      workoutId: workout.id || 'custom',
      exercises: completedExercises,
      totalDuration: Math.floor((new Date() - sessionStartTime) / 1000 / 60),
      caloriesBurned: workout.estimatedCalories,
      rating: userRating,
      completedAt: new Date(),
      userId: currentUser.uid
    };

    try {
      // Save session to user's workout history
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      
      const workoutHistory = userData.workoutHistory || [];
      workoutHistory.push(sessionData);

      await updateDoc(userRef, {
        workoutHistory,
        totalWorkouts: (userData.totalWorkouts || 0) + 1,
        totalCaloriesBurned: (userData.totalCaloriesBurned || 0) + workout.estimatedCalories,
        lastWorkoutDate: new Date()
      });

      onComplete(sessionData);
    } catch (error) {
      console.error('Error saving workout session:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showInstructions) {
    return (
      <div className="workout-session">
        <div className="session-header">
          <button onClick={onExit} className="exit-btn">✕</button>
          <h2>🏋️‍♂️ Ready to Start?</h2>
        </div>

        <div className="workout-overview">
          <div className="workout-stats">
            <div className="stat">
              <span className="stat-number">{workout.exercises.length}</span>
              <span className="stat-label">Exercises</span>
            </div>
            <div className="stat">
              <span className="stat-number">{workout.totalDuration}</span>
              <span className="stat-label">Minutes</span>
            </div>
            <div className="stat">
              <span className="stat-number">{workout.estimatedCalories}</span>
              <span className="stat-label">Calories</span>
            </div>
          </div>

          <div className="exercise-preview">
            <h3>Today's Exercises:</h3>
            <div className="exercise-list">
              {workout.exercises.map((exercise, index) => (
                <div key={index} className="exercise-preview-item">
                  <span className="exercise-icon">
                    {exercise.type === 'cardio' ? '🏃‍♂️' : 
                     exercise.type === 'strength' ? '💪' : '🧘‍♀️'}
                  </span>
                  <span className="exercise-name">{exercise.name}</span>
                  <span className="exercise-detail">
                    {exercise.duration ? `${exercise.duration}s` : 
                     `${exercise.reps} × ${exercise.sets}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="start-section">
            <p className="motivation-text">
              💪 You've got this! Let's build those healthy habits together.
            </p>
            <button onClick={startSession} className="start-workout-btn">
              🚀 Start Workout
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="workout-session">
        <div className="session-complete">
          <div className="celebration">
            <h2>🎉 Workout Complete!</h2>
            <p>Amazing job! You've completed your workout.</p>
          </div>

          <div className="session-summary">
            <div className="summary-stats">
              <div className="stat">
                <span className="stat-number">{completedExercises.length}</span>
                <span className="stat-label">Exercises Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {Math.floor((new Date() - sessionStartTime) / 1000 / 60)}
                </span>
                <span className="stat-label">Minutes</span>
              </div>
              <div className="stat">
                <span className="stat-number">{workout.estimatedCalories}</span>
                <span className="stat-label">Calories Burned</span>
              </div>
            </div>

            <div className="rating-section">
              <h3>How was your workout?</h3>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    className={`star ${star <= userRating ? 'active' : ''}`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleSessionComplete}
              className="complete-session-btn"
              disabled={userRating === 0}
            >
              ✅ Complete Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="workout-session">
      <div className="session-header">
        <button onClick={onExit} className="exit-btn">✕</button>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">
          {currentExerciseIndex + 1} / {workout.exercises.length}
        </span>
      </div>

      <div className="current-exercise">
        <div className="exercise-type-badge">
          {currentExercise.type === 'cardio' ? '🏃‍♂️ Cardio' : 
           currentExercise.type === 'strength' ? '💪 Strength' : '🧘‍♀️ Flexibility'}
        </div>

        <h2 className="exercise-name">{currentExercise.name}</h2>

        <div className="exercise-details">
          {currentExercise.duration ? (
            <div className="timer">
              <span className="time-display">{formatTime(timeRemaining)}</span>
              <span className="time-label">seconds remaining</span>
            </div>
          ) : (
            <div className="reps-display">
              <span className="reps-number">{currentExercise.reps}</span>
              <span className="reps-label">reps × {currentExercise.sets} sets</span>
            </div>
          )}
        </div>

        <div className="exercise-instructions">
          <p>💡 {getExerciseInstructions(currentExercise.name)}</p>
        </div>

        <div className="session-controls">
          {!isActive ? (
            <button onClick={resumeSession} className="control-btn primary">
              ▶️ Start
            </button>
          ) : (
            <button onClick={pauseSession} className="control-btn secondary">
              ⏸️ Pause
            </button>
          )}
          
          <button onClick={handleExerciseComplete} className="control-btn success">
            ✅ Complete
          </button>
          
          <button onClick={skipExercise} className="control-btn skip">
            ⏭️ Skip
          </button>
        </div>
      </div>
    </div>
  );
};

const getExerciseInstructions = (exerciseName) => {
  const instructions = {
    "Push-ups": "Keep your body straight, lower chest to ground, push back up",
    "Squats": "Feet shoulder-width apart, lower as if sitting in chair, stand back up",
    "Plank": "Hold your body straight like a board, engage your core",
    "Jumping Jacks": "Jump feet apart while raising arms overhead, return to start",
    "Lunges": "Step forward, lower back knee toward ground, return to standing",
    "Burpees": "Squat down, jump back to plank, jump forward, jump up with arms overhead"
  };
  
  return instructions[exerciseName] || "Follow proper form and breathe steadily throughout the exercise";
};

export default WorkoutSession;
