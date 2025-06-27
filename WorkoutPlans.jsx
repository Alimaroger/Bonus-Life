import React, { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { generatePersonalizedWorkout, generateWeeklyPlan } from '../utils/workoutGenerator';
import exerciseService from '../services/exerciseService';
import WorkoutSession from '../components/WorkoutSession';
import Navigation from '../components/Navigation';


export default function WorkoutPlans() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [showWorkoutSession, setShowWorkoutSession] = useState(false);
  const [weeklyPlan, setWeeklyPlan] = useState(null);
  const [activeTab, setActiveTab] = useState('quick');

  useEffect(() => {
    fetchUserProfile();
  }, [currentUser]);

  const fetchUserProfile = async () => {
    if (!currentUser) return;

    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserProfile(userData);

        // Generate weekly plan based on user profile
        if (userData.fitnessGoal && userData.fitnessLevel) {
          const plan = generateWeeklyPlan(userData);
          setWeeklyPlan(plan);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateQuickWorkout = (customDifficulty = null) => {
    if (!userProfile) return;

    const profileWithDifficulty = {
      ...userProfile,
      fitnessLevel: customDifficulty || userProfile.fitnessLevel
    };

    const workout = generatePersonalizedWorkout(profileWithDifficulty);
    setCurrentWorkout(workout);
    setShowWorkoutSession(true);
  };

  const startPredefinedPlan = (planType) => {
    if (!userProfile) return;

    // Modify user profile for specific plan type
    const planProfile = {
      ...userProfile,
      fitnessGoal: planType,
      availableTime: planType === 'quick' ? '15' : userProfile.availableTime || '30'
    };

    const workout = generatePersonalizedWorkout(planProfile);
    setCurrentWorkout(workout);
    setShowWorkoutSession(true);
  };

  const handleWorkoutComplete = (sessionData) => {
    setShowWorkoutSession(false);
    setCurrentWorkout(null);
    // Could show completion celebration here
    alert(`🎉 Great job! You burned ${sessionData.caloriesBurned} calories!`);
  };

  const handleExitWorkout = () => {
    setShowWorkoutSession(false);
    setCurrentWorkout(null);
  };

  const startLiveWorkout = (difficulty = 'beginner') => {
    // Generate a workout based on user profile and difficulty
    const workoutOptions = {
      difficulty: difficulty,
      duration: 20,
      exerciseCount: 5,
      categories: userProfile?.fitnessGoal === 'weight-loss' ? ['cardio', 'full-body'] :
                  userProfile?.fitnessGoal === 'muscle-gain' ? ['chest', 'legs', 'core'] :
                  ['full-body']
    };

    const liveWorkout = exerciseService.generateCustomWorkout(workoutOptions);

    // Navigate to live workout page with workout data
    navigate('/live-workout', {
      state: {
        workout: liveWorkout,
        userProfile: userProfile
      }
    });
  };

  if (loading) {
    return (
      <div className="workout-plans-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Generating your personalized workouts...</p>
        </div>
      </div>
    );
  }

  if (!userProfile || !userProfile.fitnessGoal) {
    return (
      <div className="workout-plans-container">
        <div className="setup-required">
          <h2>🎯 Complete Your Profile</h2>
          <p>We need a bit more information to create personalized workouts for you.</p>
          <button onClick={() => window.location.href = '/profile'} className="setup-btn">
            Complete Profile
          </button>
        </div>
      </div>
    );
  }

  if (showWorkoutSession && currentWorkout) {
    return (
      <WorkoutSession
        workout={currentWorkout}
        onComplete={handleWorkoutComplete}
        onExit={handleExitWorkout}
      />
    );
  }

  // Generate goal-specific plans based on user's primary goal
  const getGoalSpecificPlans = () => {
    const userGoal = userProfile.fitnessGoal;

    if (userGoal === 'muscle-gain') {
      return [
        {
          id: 'muscle-gain-beginner',
          title: "💪 Beginner Muscle Builder",
          description: "Start your muscle-building journey with basic strength exercises",
          duration: "20-25 min",
          calories: "80-120",
          focus: "Basic Strength",
          color: "#4ecdc4",
          difficulty: "beginner"
        },
        {
          id: 'muscle-gain-intermediate',
          title: "🏋️‍♂️ Intermediate Strength",
          description: "Progressive strength training for muscle growth",
          duration: "25-35 min",
          calories: "120-180",
          focus: "Progressive Strength",
          color: "#45b7d1",
          difficulty: "intermediate"
        },
        {
          id: 'muscle-gain-advanced',
          title: "🔥 Advanced Muscle Blast",
          description: "Intense strength training for serious muscle gains",
          duration: "35-45 min",
          calories: "180-250",
          focus: "Intense Strength",
          color: "#ff6b6b",
          difficulty: "advanced"
        }
      ];
    } else if (userGoal === 'weight-loss') {
      return [
        {
          id: 'weight-loss-beginner',
          title: "🚶‍♀️ Gentle Fat Burn",
          description: "Easy cardio exercises to start your weight loss journey",
          duration: "15-20 min",
          calories: "100-150",
          focus: "Light Cardio",
          color: "#96ceb4",
          difficulty: "beginner"
        },
        {
          id: 'weight-loss-intermediate',
          title: "🔥 Fat Burning Blast",
          description: "High-intensity cardio to maximize calorie burn",
          duration: "25-30 min",
          calories: "200-300",
          focus: "HIIT Cardio",
          color: "#ff6b6b",
          difficulty: "intermediate"
        },
        {
          id: 'weight-loss-advanced',
          title: "⚡ Extreme Fat Shredder",
          description: "Intense cardio and strength combo for maximum results",
          duration: "35-45 min",
          calories: "300-450",
          focus: "Extreme HIIT",
          color: "#e74c3c",
          difficulty: "advanced"
        }
      ];
    } else if (userGoal === 'flexibility') {
      return [
        {
          id: 'flexibility-beginner',
          title: "🧘‍♀️ Gentle Stretch",
          description: "Basic stretching and mobility exercises",
          duration: "15-20 min",
          calories: "30-60",
          focus: "Basic Flexibility",
          color: "#45b7d1",
          difficulty: "beginner"
        },
        {
          id: 'flexibility-intermediate',
          title: "🤸‍♀️ Yoga Flow",
          description: "Dynamic yoga sequences for improved flexibility",
          duration: "25-30 min",
          calories: "60-100",
          focus: "Yoga Flow",
          color: "#96ceb4",
          difficulty: "intermediate"
        },
        {
          id: 'flexibility-advanced',
          title: "🕉️ Advanced Yoga",
          description: "Challenging poses and deep stretches",
          duration: "30-40 min",
          calories: "80-120",
          focus: "Advanced Yoga",
          color: "#9b59b6",
          difficulty: "advanced"
        }
      ];
    } else {
      // General fitness - balanced approach
      return [
        {
          id: 'general-beginner',
          title: "⚡ Beginner Full Body",
          description: "Balanced mix of cardio, strength, and flexibility",
          duration: "20-25 min",
          calories: "100-150",
          focus: "Complete Workout",
          color: "#96ceb4",
          difficulty: "beginner"
        },
        {
          id: 'general-intermediate',
          title: "🏃‍♂️ Intermediate Fusion",
          description: "Moderate intensity full-body workout",
          duration: "30-35 min",
          calories: "180-250",
          focus: "Balanced Training",
          color: "#4ecdc4",
          difficulty: "intermediate"
        },
        {
          id: 'general-advanced',
          title: "🔥 Advanced Total Body",
          description: "High-intensity complete fitness challenge",
          duration: "40-45 min",
          calories: "250-350",
          focus: "Elite Training",
          color: "#ff6b6b",
          difficulty: "advanced"
        }
      ];
    }
  };

  const goalSpecificPlans = getGoalSpecificPlans();

  return (
    <>
      <Navigation />
      <div className="workout-plans-container">
        <div className="plans-header">
          <h1>🏋️‍♂️ Your Personalized Workouts</h1>
          <p>Workouts tailored specifically for your goals: <strong>{userProfile.fitnessGoal}</strong></p>
        </div>

      <div className="workout-tabs">
        <button
          className={`tab ${activeTab === 'quick' ? 'active' : ''}`}
          onClick={() => setActiveTab('quick')}
        >
          ⚡ Quick Workout
        </button>
        <button
          className={`tab ${activeTab === 'plans' ? 'active' : ''}`}
          onClick={() => setActiveTab('plans')}
        >
          📋 Workout Plans
        </button>
        <button
          className={`tab ${activeTab === 'weekly' ? 'active' : ''}`}
          onClick={() => setActiveTab('weekly')}
        >
          📅 Weekly Schedule
        </button>
      </div>

      {activeTab === 'quick' && (
        <div className="quick-workout-section">
          <div className="quick-workout-card">
            <div className="quick-header">
              <h2>⚡ Generate Quick Workout</h2>
              <p>Get a personalized workout based on your current goals and available time</p>
            </div>

            <div className="user-preferences">
              <div className="preference-item">
                <span className="pref-label">🎯 Goal:</span>
                <span className="pref-value">{userProfile.fitnessGoal}</span>
              </div>
              <div className="preference-item">
                <span className="pref-label">📊 Level:</span>
                <span className="pref-value">{userProfile.fitnessLevel}</span>
              </div>
              <div className="preference-item">
                <span className="pref-label">⏱️ Time:</span>
                <span className="pref-value">{userProfile.availableTime} minutes</span>
              </div>
            </div>

            <button onClick={generateQuickWorkout} className="generate-workout-btn">
              🚀 Generate My Workout
            </button>
          </div>
        </div>
      )}

      {activeTab === 'plans' && (
        <div className="plans-section">
          <div className="goal-header">
            <h2>🎯 {userProfile.fitnessGoal.replace('-', ' ').toUpperCase()} Workouts</h2>
            <p>Choose your difficulty level and start building towards your goal!</p>
          </div>

          <div className="plans-grid">
            {goalSpecificPlans.map((plan) => (
              <div key={plan.id} className="plan-card" style={{'--plan-color': plan.color}}>
                <div className="plan-header">
                  <h3>{plan.title}</h3>
                  <div className="plan-badge" style={{backgroundColor: plan.color}}>
                    {plan.difficulty.toUpperCase()}
                  </div>
                </div>

                <p className="plan-description">{plan.description}</p>

                <div className="plan-stats">
                  <div className="stat">
                    <span className="stat-icon">⏱️</span>
                    <span className="stat-text">{plan.duration}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">🔥</span>
                    <span className="stat-text">{plan.calories} cal</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">🎯</span>
                    <span className="stat-text">{plan.focus}</span>
                  </div>
                </div>

                <div className="plan-buttons">
                  <button
                    onClick={() => generateQuickWorkout(plan.difficulty)}
                    className="start-plan-btn"
                    style={{backgroundColor: plan.color}}
                  >
                    Generate Workout
                  </button>
                  <button
                    onClick={() => startLiveWorkout(plan.difficulty)}
                    className="live-workout-btn"
                  >
                    🔴 Start Live
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="goal-explanation">
            <div className="explanation-card">
              <h3>💡 Why These Workouts?</h3>
              <p>
                {userProfile.fitnessGoal === 'muscle-gain' &&
                  "These workouts focus heavily on strength training exercises that target different muscle groups. Each difficulty level progressively increases the challenge to help you build muscle effectively."
                }
                {userProfile.fitnessGoal === 'weight-loss' &&
                  "These workouts emphasize cardio and high-intensity exercises to maximize calorie burn. The difficulty levels help you progress safely while burning fat."
                }
                {userProfile.fitnessGoal === 'flexibility' &&
                  "These workouts focus on stretching, mobility, and yoga-based movements to improve your flexibility and range of motion gradually."
                }
                {(!userProfile.fitnessGoal || userProfile.fitnessGoal === 'general-fitness') &&
                  "These balanced workouts combine cardio, strength, and flexibility training to improve your overall fitness level."
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'weekly' && weeklyPlan && (
        <div className="weekly-section">
          <div className="weekly-header">
            <h2>📅 Your Weekly Plan</h2>
            <p>Structured workout schedule based on your goals</p>
          </div>

          <div className="weekly-grid">
            {weeklyPlan.map((day, index) => (
              <div key={index} className={`day-card ${day.completed ? 'completed' : ''}`}>
                <div className="day-header">
                  <h3>{day.dayName}</h3>
                  <span className="day-number">Day {day.day}</span>
                </div>

                <div className="day-workout-info">
                  <div className="workout-composition">
                    {day.workout.composition.cardio > 0 && (
                      <div className="composition-item">
                        <span className="comp-icon">🏃‍♂️</span>
                        <span>{day.workout.composition.cardio}min</span>
                      </div>
                    )}
                    {day.workout.composition.strength > 0 && (
                      <div className="composition-item">
                        <span className="comp-icon">💪</span>
                        <span>{day.workout.composition.strength}min</span>
                      </div>
                    )}
                    {day.workout.composition.flexibility > 0 && (
                      <div className="composition-item">
                        <span className="comp-icon">🧘‍♀️</span>
                        <span>{day.workout.composition.flexibility}min</span>
                      </div>
                    )}
                  </div>

                  <div className="day-stats">
                    <span className="day-duration">⏱️ {day.workout.totalDuration} min</span>
                    <span className="day-calories">🔥 {day.workout.estimatedCalories} cal</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCurrentWorkout(day.workout);
                    setShowWorkoutSession(true);
                  }}
                  className={`day-start-btn ${day.completed ? 'completed' : ''}`}
                  disabled={day.completed}
                >
                  {day.completed ? '✅ Completed' : '▶️ Start'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
}
