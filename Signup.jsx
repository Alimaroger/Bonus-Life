import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase-config';
import './SignUp.css';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    gender: '',
    age: '',
    height: '',
    weight: '',
    fitnessLevel: 'beginner',
    goals: [],
    injuries: '',
    workoutFrequency: '3-4'
  });

  const navigate = useNavigate();

  const fitnessGoals = [
    { id: 'weight-loss', label: 'Weight Loss' },
    { id: 'muscle-gain', label: 'Muscle Gain' },
    { id: 'strength', label: 'Strength Building' },
    { id: 'endurance', label: 'Endurance' },
    { id: 'flexibility', label: 'Flexibility' },
    { id: 'rehabilitation', label: 'Rehabilitation' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleGoalToggle = (goalId) => {
    setUserData(prev => {
      const newGoals = prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId];
      return { ...prev, goals: newGoals };
    });
  };

  const validateStep1 = () => {
    if (!fullName.trim()) return setError('Please enter your full name.');
    if (!email.includes('@')) return setError('Please enter a valid email.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    setError('');
    return true;
  };

  const validateStep2 = () => {
    if (!userData.gender) return setError('Please select your gender.');
    if (!userData.age || isNaN(userData.age)) return setError('Please enter a valid age.');
    setError('');
    return true;
  };

  const handleNext = () => {
    if ((step === 1 && !validateStep1()) || (step === 2 && !validateStep2())) return;
    setStep(prev => prev + 1);
  };

  const handleBack = () => setStep(prev => prev - 1);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (step < 3) return handleNext();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const newUserProfile = {
        fullName,
        email: user.email,
        subscription: 'Free',
        joinDate: serverTimestamp(),
        ...userData
      };

      await setDoc(doc(db, 'users', user.uid), newUserProfile);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-progress" style={{ '--progress': `${(step / 3) * 100}%` }}></div>

      <div className="signup-box">
        <header className="signup-header">
          <h1>Bonus Life</h1>
          <h2>{['Create Your Account', 'About You', 'Fitness Goals'][step - 1]}</h2>
        </header>

        <form onSubmit={handleSignUp} className="signup-form" noValidate>
          {step === 1 && (
            <>
              <InputField label="Full Name" value={fullName} onChange={setFullName} id="fullName" />
              <InputField label="Email Address" value={email} onChange={setEmail} id="email" type="email" />
              <InputField label="Password" value={password} onChange={setPassword} id="password" type="password" />
            </>
          )}

          {step === 2 && (
            <>
              <GenderSelector gender={userData.gender} onSelect={(gender) => setUserData(prev => ({ ...prev, gender }))} />
              <InputField label="Age" value={userData.age} onChange={(val) => setUserData(prev => ({ ...prev, age: val }))} id="age" type="number" />
              <InputField label="Height (cm)" value={userData.height} onChange={(val) => setUserData(prev => ({ ...prev, height: val }))} id="height" type="number" />
              <InputField label="Weight (kg)" value={userData.weight} onChange={(val) => setUserData(prev => ({ ...prev, weight: val }))} id="weight" type="number" />
            </>
          )}

          {step === 3 && (
            <>
              <FitnessLevelSelector level={userData.fitnessLevel} onChange={(level) => setUserData(prev => ({ ...prev, fitnessLevel: level }))} />
              <GoalSelector goals={userData.goals} onToggle={handleGoalToggle} fitnessGoals={fitnessGoals} />
              <label>Workout Frequency</label>
              <select name="workoutFrequency" value={userData.workoutFrequency} onChange={handleInputChange}>
                <option value="1-2">1-2 times per week</option>
                <option value="3-4">3-4 times per week</option>
                <option value="5+">5+ times per week</option>
              </select>
              <label>Injuries or Health Concerns</label>
              <textarea name="injuries" value={userData.injuries} onChange={handleInputChange} rows="3" placeholder="E.g. Bad knee, asthma..." />
            </>
          )}

          {error && <p className="error-message">{error}</p>}

          <div className="form-actions">
            {step > 1 && <button type="button" onClick={handleBack}>Back</button>}
            <button type="submit">{step === 3 ? 'Complete Sign Up' : 'Continue'}</button>
          </div>
        </form>

        {step === 1 && (
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange, id, type = "text" }) => (
  <div className="form-group floating">
    <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} required />
    <label htmlFor={id}>{label}</label>
  </div>
);

const GenderSelector = ({ gender, onSelect }) => (
  <div className="form-group">
    <label>Gender</label>
    <div className="gender-options">
      {['male', 'female', 'other'].map(g => (
        <button key={g} type="button" className={`gender-option ${gender === g ? 'active' : ''}`} onClick={() => onSelect(g)}>
          {g.charAt(0).toUpperCase() + g.slice(1)}
        </button>
      ))}
    </div>
  </div>
);

const FitnessLevelSelector = ({ level, onChange }) => (
  <div className="form-group">
    <label>Fitness Level</label>
    <div className="fitness-levels">
      {['beginner', 'intermediate', 'advanced'].map(l => (
        <button key={l} type="button" className={`level-option ${level === l ? 'active' : ''}`} onClick={() => onChange(l)}>
          {l.charAt(0).toUpperCase() + l.slice(1)}
        </button>
      ))}
    </div>
  </div>
);

const GoalSelector = ({ goals, onToggle, fitnessGoals }) => (
  <div className="form-group">
    <label>Fitness Goals</label>
    <div className="goal-options">
      {fitnessGoals.map(goal => (
        <div key={goal.id} className={`goal-option ${goals.includes(goal.id) ? 'selected' : ''}`} onClick={() => onToggle(goal.id)}>
          <div className="goal-checkbox">{goals.includes(goal.id) && '✓'}</div>
          <span>{goal.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default SignUp;
