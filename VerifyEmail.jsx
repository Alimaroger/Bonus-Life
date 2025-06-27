import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendEmailVerification, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { useAuth } from '../context/AuthContext';

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Check if user is already verified
  useEffect(() => {
    if (currentUser?.emailVerified) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  // Countdown timer for resend button
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Check verification status periodically
  useEffect(() => {
    const checkVerification = async () => {
      if (currentUser) {
        await currentUser.reload();
        if (currentUser.emailVerified) {
          setMessage('Email verified successfully! Redirecting to dashboard...');
          setTimeout(() => navigate('/dashboard'), 2000);
        }
      }
    };

    const interval = setInterval(checkVerification, 3000);
    return () => clearInterval(interval);
  }, [currentUser, navigate]);

  const handleResendEmail = async () => {
    if (!currentUser || countdown > 0) return;

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      await sendEmailVerification(currentUser, {
        url: `${window.location.origin}/dashboard`,
        handleCodeInApp: false,
      });
      
      setMessage('Verification email sent! Check your inbox and spam folder.');
      setCountdown(60); // 60 second cooldown
    } catch (error) {
      console.error('Resend email error:', error);
      setError('Failed to send verification email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleCheckVerification = async () => {
    if (!currentUser) return;

    setIsLoading(true);
    try {
      await currentUser.reload();
      if (currentUser.emailVerified) {
        setMessage('Email verified successfully! Redirecting to dashboard...');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setError('Email not verified yet. Please check your email and click the verification link.');
      }
    } catch (error) {
      console.error('Check verification error:', error);
      setError('Failed to check verification status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="page-bg">
        <div className="container-custom">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in first</h2>
              <Link to="/login" className="btn-primary">
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-bg">
      <div className="container-custom">
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {/* Header */}
            <div className="text-center">
              <Link to="/" className="inline-block mb-8">
                <h1 className="text-3xl font-bold text-red-600 font-heading">
                  💪 Bonus Life
                </h1>
              </Link>
              <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-red-600 text-4xl">📧</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 font-heading">
                Verify Your Email
              </h2>
              <p className="mt-2 text-gray-600">
                We've sent a verification link to
              </p>
              <p className="font-semibold text-gray-900">
                {currentUser?.email}
              </p>
            </div>

            {/* Messages */}
            <div className="space-y-4">
              {message && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✅</span>
                    {message}
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2">❌</span>
                    {error}
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Next Steps:</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <span className="text-red-600 mr-2">1.</span>
                  <span>Check your email inbox for a verification message</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-600 mr-2">2.</span>
                  <span>Click the verification link in the email</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-600 mr-2">3.</span>
                  <span>Return here and click "I've verified my email"</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleCheckVerification}
                disabled={isLoading}
                className={`w-full btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Checking...
                  </div>
                ) : (
                  "✅ I've verified my email"
                )}
              </button>

              <button
                onClick={handleResendEmail}
                disabled={isLoading || countdown > 0}
                className={`w-full btn-secondary ${(isLoading || countdown > 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {countdown > 0 ? (
                  `📧 Resend email in ${countdown}s`
                ) : isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  '📧 Resend verification email'
                )}
              </button>
            </div>

            {/* Help Section */}
            <div className="card bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Check your spam/junk folder</p>
                <p>• Make sure you clicked the correct link</p>
                <p>• The verification link expires in 24 hours</p>
                <p>• Still having trouble? <Link to="/contact" className="text-red-600 hover:text-red-700">Contact Support</Link></p>
              </div>
            </div>

            {/* Sign Out Option */}
            <div className="text-center">
              <button
                onClick={handleSignOut}
                className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
              >
                Sign out and use a different email
              </button>
            </div>

            {/* Security Notice */}
            <div className="text-center text-xs text-gray-500">
              <p>🔒 Email verification helps keep your account secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
