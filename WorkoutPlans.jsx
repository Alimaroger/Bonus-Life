// This component displays a list of workout plans with their details.
import React from "react";
import "./WorkoutPlans.css";
import { useState } from "react";

const plans = [
  {
    title: "Weight Loss Challenge",
    duration: "4 Weeks",
    level: "Beginner",
    description: "Burn fat and build endurance with daily cardio workouts.",
  },
  {
    title: "Muscle Gain Program",
    duration: "6 Weeks",
    level: "Intermediate",
    description: "Build muscle with targeted strength training plans.",
  },
  {
    title: "Yoga & Flexibility",
    duration: "3 Weeks",
    level: "All Levels",
    description: "Relax, stretch, and strengthen with daily yoga flows.",
  },
];

// The WorkoutPlans component renders a list of workout plans.
export default function WorkoutPlans() {
    const [progress, setProgress] = useState([20, 45, 10]);

    const handleAdvanceProgress = (index) => {
        setProgress((prev) =>
            prev.map((p, i) => (i === index ? Math.min(p + 10, 100) : p))
        );
    };


    return (
    <div className="plans-container">
      <h1>Workout Plans</h1>
      <div className="plans-grid">
        {plans.map((plan, index) => (
          <div key={index} className="plan-card">
            <h2>{plan.title}</h2>
            <p><strong>Duration:</strong> {plan.duration}</p>
            <p><strong>Level:</strong> {plan.level}</p>
            <p>{plan.description}</p>

            <div className="progress-wrapper">
                <div className="progress-bar" styles={{ width: `${progress[index]}%` }}></div>
            </div>
            <p>{progress[index]}% completed</p> 
            {index === 1 || index === 2 ? (
                <button className="subscribe-button">Subscribe to Unlock</button>
            
            ) : (
               
            <button className="start-plan-button" onclick={() => handleAdvanceProgress(index)}>
                Advance Progress
            </button>
            )}
         </div>
        ))}
        </div>
        </div>
  );
}
