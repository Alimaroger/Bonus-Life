import React, { useState, useRef, useEffect } from 'react';
import { analyzeFood } from '../services/foodAnalysisService';

const FoodScanner = ({ onFoodDetected, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [error, setError] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasCamera(true);
        setError('');
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Camera access denied. Please enable camera permissions.');
      setHasCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsAnalyzing(true);
    setError('');

    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw current video frame to canvas
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to blob for analysis
      canvas.toBlob(async (blob) => {
        try {
          const result = await analyzeFood(blob);
          setScanResult(result);
          
          if (result && result.foods && result.foods.length > 0) {
            onFoodDetected(result);
          } else {
            setError('No food detected. Please try again with a clearer image.');
          }
        } catch (error) {
          console.error('Food analysis error:', error);
          setError('Failed to analyze food. Please try again.');
        } finally {
          setIsAnalyzing(false);
        }
      }, 'image/jpeg', 0.8);
      
    } catch (error) {
      console.error('Capture error:', error);
      setError('Failed to capture image. Please try again.');
      setIsAnalyzing(false);
    }
  };

  const retryScanning = () => {
    setScanResult(null);
    setError('');
    setIsAnalyzing(false);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-black/80 text-white p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">📸 Food Scanner</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-red-400 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative">
        {hasCamera ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Scanning Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Scanning Frame */}
                <div className="w-64 h-64 border-4 border-white rounded-lg relative">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-red-500"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-red-500"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-red-500"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-red-500"></div>
                  
                  {/* Scanning Line Animation */}
                  {isAnalyzing && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="w-full h-1 bg-red-500 animate-pulse"></div>
                    </div>
                  )}
                </div>
                
                {/* Instructions */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-white text-center">
                  <p className="text-sm">Position food within the frame</p>
                  <p className="text-xs opacity-75">Ensure good lighting for best results</p>
                </div>
              </div>
            </div>

            {/* Hidden canvas for image capture */}
            <canvas ref={canvasRef} className="hidden" />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white">
            <div className="text-center">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold mb-2">Camera Access Required</h3>
              <p className="text-gray-300 mb-4">Please enable camera permissions to scan food</p>
              <button
                onClick={startCamera}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Enable Camera
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-600 text-white p-4">
          <div className="flex items-center">
            <span className="mr-2">⚠️</span>
            <span>{error}</span>
            <button
              onClick={retryScanning}
              className="ml-auto bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-sm transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Scan Result */}
      {scanResult && (
        <div className="bg-green-600 text-white p-4">
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            <div className="flex-1">
              <p className="font-semibold">Food Detected!</p>
              <p className="text-sm opacity-90">
                {scanResult.foods[0]?.name} - {scanResult.foods[0]?.calories} calories
              </p>
            </div>
            <button
              onClick={retryScanning}
              className="bg-green-700 hover:bg-green-800 px-3 py-1 rounded text-sm transition-colors"
            >
              Scan Again
            </button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-black/80 p-6">
        <div className="flex items-center justify-center space-x-6">
          {/* Gallery Button */}
          <button className="text-white hover:text-red-400 transition-colors">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs">Gallery</span>
            </div>
          </button>

          {/* Capture Button */}
          <button
            onClick={captureImage}
            disabled={!hasCamera || isAnalyzing}
            className={`relative ${
              hasCamera && !isAnalyzing
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-600 cursor-not-allowed'
            } transition-all duration-300`}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center">
              {isAnalyzing ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              ) : (
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full"></div>
                </div>
              )}
            </div>
          </button>

          {/* Flash Button */}
          <button className="text-white hover:text-red-400 transition-colors">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xs">Flash</span>
            </div>
          </button>
        </div>

        {/* Instructions */}
        <div className="text-center mt-4">
          <p className="text-white text-sm opacity-75">
            Point camera at food and tap the capture button
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodScanner;
