import React, { useState } from 'react';
import { cleanupDuplicateUsers } from '../utils/userCleanup';

const AdminCleanup = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCleanup = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    setIsRunning(true);
    setShowConfirm(false);
    
    try {
      const result = await cleanupDuplicateUsers();
      setResults(result);
    } catch (error) {
      setResults({
        success: false,
        error: error.message,
        duplicatesFound: 0,
        duplicatesRemoved: 0
      });
    } finally {
      setIsRunning(false);
    }
  };

  const resetResults = () => {
    setResults(null);
    setShowConfirm(false);
  };

  return (
    <div className="admin-cleanup">
      <div className="cleanup-card">
        <h2>🧹 Database Cleanup Tool</h2>
        <p>This tool will remove duplicate user accounts and keep only the most recent one for each email address.</p>
        
        {!results && !isRunning && !showConfirm && (
          <div className="cleanup-actions">
            <button 
              onClick={handleCleanup}
              className="cleanup-btn primary"
            >
              🔍 Start Cleanup Process
            </button>
          </div>
        )}

        {showConfirm && (
          <div className="confirm-dialog">
            <div className="confirm-content">
              <h3>⚠️ Confirm Cleanup</h3>
              <p>This action will:</p>
              <ul>
                <li>✅ Keep the most recent account for each email</li>
                <li>🗑️ Delete older duplicate accounts</li>
                <li>📊 Show you a summary of changes</li>
              </ul>
              <p><strong>This action cannot be undone!</strong></p>
              
              <div className="confirm-actions">
                <button 
                  onClick={handleCleanup}
                  className="cleanup-btn danger"
                >
                  ✅ Yes, Clean Up Duplicates
                </button>
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="cleanup-btn secondary"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {isRunning && (
          <div className="cleanup-running">
            <div className="spinner"></div>
            <h3>🔄 Cleaning up duplicates...</h3>
            <p>Please wait while we process your database.</p>
          </div>
        )}

        {results && (
          <div className={`cleanup-results ${results.success ? 'success' : 'error'}`}>
            {results.success ? (
              <>
                <h3>✅ Cleanup Complete!</h3>
                <div className="results-stats">
                  <div className="stat">
                    <span className="stat-number">{results.duplicatesFound}</span>
                    <span className="stat-label">Duplicate emails found</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{results.duplicatesRemoved}</span>
                    <span className="stat-label">Duplicate accounts removed</span>
                  </div>
                </div>
                
                {results.duplicatesFound === 0 && (
                  <p className="no-duplicates">🎉 No duplicate accounts found! Your database is clean.</p>
                )}
                
                {results.duplicatesRemoved > 0 && (
                  <div className="cleanup-summary">
                    <p>✨ Successfully cleaned up your user database!</p>
                    <p>Each email now has only one associated account.</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <h3>❌ Cleanup Failed</h3>
                <p className="error-message">{results.error}</p>
              </>
            )}
            
            <button 
              onClick={resetResults}
              className="cleanup-btn secondary"
            >
              🔄 Run Again
            </button>
          </div>
        )}

        <div className="cleanup-info">
          <h4>ℹ️ What this tool does:</h4>
          <ul>
            <li><strong>Identifies duplicates:</strong> Finds multiple accounts with the same email</li>
            <li><strong>Keeps the newest:</strong> Preserves the most recently created account</li>
            <li><strong>Removes old ones:</strong> Deletes older duplicate accounts</li>
            <li><strong>Safe operation:</strong> Only removes clear duplicates, never active accounts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminCleanup;
