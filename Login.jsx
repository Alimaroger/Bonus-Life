import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message.replace("Firebase: ", ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Navigation */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">💪</span>
            </div>
            <span className="font-heading font-bold text-xl text-gray-900">Bonus Life</span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/about')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              About
            </button>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">En</span>
          </div>
        </div>
      </nav>

      {/* Centered Login Form */}
      <div className="max-w-md mx-auto px-6 pt-20 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 font-heading mb-4">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-600">
            Sign in to continue your fitness journey with Bonus Life
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                <div className="flex items-center">
                  <span className="text-red-500 mr-2">⚠️</span>
                  {error.replace("Firebase: ", "")}
                </div>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-gray-900"
                placeholder="Enter your email address"
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-gray-900"
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg'}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Links */}
            <div className="flex items-center justify-between text-sm pt-4">
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Forgot Password?
              </button>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 mt-8">
          <p className="text-sm">Join thousands transforming their health with Bonus Life</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
