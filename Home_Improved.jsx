import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import useTestimonialRotation from '../hooks/useTestimonialRotation';
import { FEATURES, TESTIMONIALS, STATS, ICON_SYMBOLS, TESTIMONIAL_INTERVAL } from '../constants/homeData';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Custom hook for testimonial rotation
  const { currentIndex, currentTestimonial, goToTestimonial } = useTestimonialRotation(
    TESTIMONIALS, 
    TESTIMONIAL_INTERVAL
  );

  // Memoized function for better performance
  const getIconSymbol = useCallback((iconType) => {
    return ICON_SYMBOLS[iconType] || '●';
  }, []);

  // Memoized event handlers for better performance
  const handleGetStarted = useCallback(() => {
    navigate('/signup');
  }, [navigate]);

  const handleSignIn = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleVideoPlay = useCallback(() => {
    setIsVideoPlaying(true);
  }, []);

  // Redirect authenticated users
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  return (
    <div className="landing-page">
      {/* Navigation Header */}
      <nav className="landing-nav" role="navigation" aria-label="Main navigation">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon" aria-hidden="true">BL</span>
            <span className="logo-text">Bonus Life</span>
          </div>
          <div className="nav-links">
            <a href="#features" aria-label="Go to features section">Features</a>
            <a href="#how-it-works" aria-label="Go to how it works section">How It Works</a>
            <a href="#testimonials" aria-label="Go to testimonials section">Reviews</a>
            <button 
              onClick={handleSignIn} 
              className="nav-signin"
              aria-label="Sign in to your account"
            >
              Sign In
            </button>
            <button 
              onClick={handleGetStarted} 
              className="nav-signup"
              aria-label="Get started with Bonus Life"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              Professional Fitness Solutions
            </div>

            <h1 id="hero-title" className="hero-title">
              Advanced Fitness
              <span className="highlight"> Management Platform</span>
            </h1>

            <p className="hero-description">
              Bonus Life delivers enterprise-grade fitness solutions with personalized training programs,
              comprehensive analytics, and professional guidance. Achieve measurable results through
              evidence-based methodologies and expert-designed protocols.
            </p>

            <div className="hero-benefits" role="list" aria-label="Key benefits">
              <div className="benefit" role="listitem">
                <span className="benefit-icon" aria-hidden="true">●</span>
                <span>Personalized Programs</span>
              </div>
              <div className="benefit" role="listitem">
                <span className="benefit-icon" aria-hidden="true">●</span>
                <span>Performance Analytics</span>
              </div>
              <div className="benefit" role="listitem">
                <span className="benefit-icon" aria-hidden="true">●</span>
                <span>Professional Support</span>
              </div>
            </div>

            <div className="hero-actions">
              <button 
                onClick={handleGetStarted} 
                className="primary-cta"
                aria-label="Begin your fitness assessment"
              >
                Begin Assessment
              </button>
              <button
                onClick={handleVideoPlay}
                className="secondary-cta"
                aria-label="View platform demonstration video"
              >
                View Platform Demo
              </button>
            </div>

            <div className="trust-indicators" role="list" aria-label="Trust indicators">
              <span className="trust-item" role="listitem">• Enterprise-grade security</span>
              <span className="trust-item" role="listitem">• HIPAA compliant</span>
              <span className="trust-item" role="listitem">• 25,000+ professionals</span>
            </div>
          </div>

          {/* Hero Visual - App Showcase */}
          <div className="hero-visual">
            <div className="app-showcase">
              <div className="showcase-phone">
                <div className="phone-content">
                  <div className="app-header">
                    <div className="user-greeting">
                      <div className="user-avatar" aria-label="User avatar">SM</div>
                      <div className="greeting-text">
                        <div className="welcome">Dashboard</div>
                        <div className="username">Sarah Mitchell</div>
                      </div>
                    </div>
                    <div className="streak-badge">Day 7</div>
                  </div>

                  <div className="daily-challenge">
                    <div className="challenge-header">
                      <span className="challenge-icon" aria-hidden="true">●</span>
                      <span className="challenge-title">Today's Program</span>
                    </div>
                    <div className="challenge-task">Strength Training - Upper Body</div>
                    <div className="challenge-progress">
                      <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-fill" style={{width: '80%'}}></div>
                      </div>
                      <span className="progress-text">4/5 exercises completed</span>
                    </div>
                    <button className="complete-btn">Continue Session</button>
                  </div>

                  <div className="quick-stats">
                    <div className="stat-item">
                      <div className="stat-number">87%</div>
                      <div className="stat-label">Compliance</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">Advanced</div>
                      <div className="stat-label">Level</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="floating-rewards">
                <div className="reward-popup">Session Complete</div>
                <div className="achievement-badge">Week 1 Milestone</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section" aria-labelledby="features-title">
        <div className="container">
          <h2 id="features-title" className="section-title">Professional Fitness Solutions</h2>
          <p className="section-subtitle">
            Comprehensive tools and expert guidance for optimal health outcomes
          </p>
          
          <div className="features-grid" role="list">
            {FEATURES.map((feature) => (
              <div key={feature.id} role="listitem">
                <FeatureCard feature={feature} getIconSymbol={getIconSymbol} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works" aria-labelledby="how-it-works-title">
        <div className="container">
          <h2 id="how-it-works-title" className="section-title">Implementation Process</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number" aria-hidden="true">1</div>
              <div className="step-content">
                <h3>Assessment & Goal Setting</h3>
                <p>Comprehensive fitness evaluation and objective-based program design</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number" aria-hidden="true">2</div>
              <div className="step-content">
                <h3>Personalized Program Development</h3>
                <p>Evidence-based training protocols customized to your specific requirements</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number" aria-hidden="true">3</div>
              <div className="step-content">
                <h3>Progress Monitoring & Analytics</h3>
                <p>Continuous performance tracking with detailed metrics and optimization</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number" aria-hidden="true">4</div>
              <div className="step-content">
                <h3>Results & Optimization</h3>
                <p>Achieve measurable outcomes through systematic approach and expert guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section" aria-labelledby="testimonials-title">
        <div className="container">
          <h2 id="testimonials-title" className="section-title">Professional Testimonials</h2>
          <div className="testimonial-carousel">
            <TestimonialCard testimonial={currentTestimonial} />
            
            <div className="testimonial-dots" role="tablist" aria-label="Testimonial navigation">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToTestimonial(index)}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" aria-labelledby="cta-title">
        <div className="container">
          <div className="cta-content">
            <h2 id="cta-title">Ready to Optimize Your Performance?</h2>
            <p>Join thousands of professionals who trust our evidence-based approach</p>
            <button 
              onClick={handleGetStarted} 
              className="cta-button primary large"
              aria-label="Begin professional fitness assessment"
            >
              Begin Professional Assessment
            </button>
            <p className="cta-note">Enterprise solutions available • HIPAA compliant</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer" role="contentinfo">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Bonus Life</h3>
              <p>Professional fitness solutions</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#testimonials">Reviews</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#contact">Contact</a>
                <a href="#privacy">Privacy</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Bonus Life. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
