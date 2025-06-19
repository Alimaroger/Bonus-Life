import React, { useEffect, useState, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { auth, db } from "../firebase/firebase-config";
import { useAuth } from "../context/AuthContext";
import { getProgress, saveProgress } from '../firebase/firestoreService';
import { collection, query, where, getDocs } from 'firebase/firestore';
import "./Dashboard.css";

export default function Dashboard() {
  // State management
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);
  const [coachMessage, setCoachMessage] = useState("Let's crush today's workout!");
  const [isListening, setIsListening] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const workoutIntensity = useRef(5);
  const challengeId = "100-pushups";

  // Data fetching
  useEffect(() => {
    if (authLoading || !user) return;

    const fetchData = async () => {
      try {
        setDataLoading(true);
        setError(null);
        
        // Fetch workouts
        const workoutsRef = collection(db, "workouts");
        const workoutsQuery = query(workoutsRef, where("userId", "==", user.uid));
        const workoutsSnapshot = await getDocs(workoutsQuery);
        
        if (workoutsSnapshot.empty) {
          console.log("No workouts found for user");
        } else {
          setWorkouts(workoutsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })));
        }

        // Fetch progress
        const progressData = await getProgress(user.uid, challengeId);
        const currentProgress = progressData?.progress || 0;
        setProgress(currentProgress);
        generateCoachMessage(currentProgress);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load dashboard data. Please try again.");
        setProgress(0);
        setWorkouts([]);
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, [user, authLoading]);

  // Helper functions
  const generateCoachMessage = (progress) => {
    const messages = [
      "Great start! Let's add 5 more push-ups today!",
      "You're halfway there! Keep pushing!",
      "Almost there! Finish strong!",
      "Challenge completed! Time for a new goal!"
    ];
    const index = progress < 25 ? 0 : progress < 75 ? 1 : progress < 100 ? 2 : 3;
    setCoachMessage(messages[index]);
  };

  const updateProgress = async () => {
    if (!user) return;
    
    try {
      const newProgress = Math.min(progress + 5, 100);
      setProgress(newProgress);
      generateCoachMessage(newProgress);
      await saveProgress(user.uid, challengeId, newProgress);
    } catch (err) {
      console.error("Failed to update progress:", err);
      setError("Failed to save progress. Please try again.");
    }
  };

  const startWorkout = (workoutId) => {
    navigate(`/workout/${workoutId}`);
  };

  const toggleVoiceAssistant = () => {
    setIsListening(!isListening);
    // Web Speech API integration would go here
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  // UI States
  if (authLoading) {
    return (
      <div className="neon-loader">
        <div className="loading-spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h2>Oops!</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (dataLoading) {
    return (
      <div className="neon-loader">
        <div className="loading-spinner"></div>
        <p>Loading your fitness data...</p>
      </div>
    );
  }

  if (workouts.length === 0 && !dataLoading) {
    return (
      <div className="empty-state">
        <h2>Welcome to your dashboard!</h2>
        <p>No workouts found. Ready to create your first workout plan?</p>
        <button onClick={() => navigate('/workouts/new')}>
          Create First Workout
        </button>
      </div>
    );
  }

  // Main Render
  return (
    <div className="innovative-dashboard">
      {/* Navigation */}
      <nav className="holographic-nav">
        <div className="nav-brand">
          <span className="pulse">✦</span>
          <h1>BONUS LIFE</h1>
        </div>
        <div className="nav-links">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            data-text="Dashboard"
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/workouts" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            data-text="Workouts"
          >
            Workouts
          </NavLink>
          <NavLink 
            to="/nutrition" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            data-text="Nutrition"
          >
            Nutrition
          </NavLink>
          <NavLink 
            to="/progress" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            data-text="Progress"
          >
            Progress
          </NavLink>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <span className="icon">⎋</span>
        </button>
      </nav>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {/* AI Coach */}
        <section className="ai-coach-section">
          <div className="ai-coach-bubble">
            <div className="coach-avatar"></div>
            <p>{coachMessage}</p>
            <button 
              className={`voice-btn ${isListening ? 'listening' : ''}`}
              onClick={toggleVoiceAssistant}
            >
              {isListening ? '◉ Listening...' : '◉'}
            </button>
          </div>
        </section>

        {/* Progress Ring */}
        <section className="progress-section">
          <h2 className="section-title">PUSH-UP CHALLENGE</h2>
          <div className="holographic-progress">
            <div className="progress-ring">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle-fill"
                  strokeDasharray={`${progress}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="progress-text">
                <span>{progress}%</span>
                <small>COMPLETE</small>
              </div>
            </div>
            <button 
              onClick={updateProgress} 
              className="progress-btn"
              disabled={progress >= 100}
            >
              {progress >= 100 ? 'CHALLENGE COMPLETED' : 'ADD 5 PUSH-UPS'}
            </button>
          </div>
        </section>

        {/* Workout Intensity */}
        <section className="intensity-section">
          <h2 className="section-title">WORKOUT INTENSITY</h2>
          <div className="intensity-control">
            <div className="intensity-labels">
              <span>Light</span>
              <span>Moderate</span>
              <span>Intense</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              defaultValue="5"
              onChange={(e) => workoutIntensity.current = e.target.value}
              className="neuro-slider"
            />
          </div>
        </section>

        {/* Workouts */}
        <section className="workouts-section">
          <h2 className="section-title">RECOMMENDED FOR YOU</h2>
          <div className="workout-cards">
            {workouts.map((workout) => (
              <div key={workout.id} className="workout-card">
                <div className="workout-emoji">{workout.emoji || '🏋️'}</div>
                <h3>{workout.name}</h3>
                <p>{workout.duration} min • {workout.level || 'Intermediate'}</p>
                <button 
                  className="start-btn"
                  onClick={() => startWorkout(workout.id)}
                >
                  START
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section className="metrics-section">
          <h2 className="section-title">YOUR METRICS</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <h3>HEART RATE</h3>
              <p>72 <small>BPM</small></p>
            </div>
            <div className="metric-card">
              <h3>CALORIES</h3>
              <p>1,240 <small>TODAY</small></p>
            </div>
            <div className="metric-card">
              <h3>STEPS</h3>
              <p>8,542 <small>TODAY</small></p>
            </div>
            <div className="metric-card">
              <h3>SLEEP</h3>
              <p>7.2 <small>HOURS</small></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}