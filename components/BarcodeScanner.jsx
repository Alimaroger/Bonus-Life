import React, { useState, useRef, useEffect } from 'react';
import { lookupBarcode } from '../services/barcodeService';

const BarcodeScanner = ({ onBarcodeDetected, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [error, setError] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [detectedBarcode, setDetectedBarcode] = useState('');

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
          facingMode: 'environment', // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasCamera(true);
        setError('');
        startBarcodeDetection();
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
    setIsScanning(false);
  };

  const startBarcodeDetection = () => {
    setIsScanning(true);
    
    // Simulate barcode detection (in real app, use a library like QuaggaJS or ZXing)
    const detectBarcode = () => {
      if (!isScanning || !hasCamera) return;
      
      // Simulate barcode detection with random success
      if (Math.random() > 0.95) { // 5% chance per frame
        const mockBarcodes = [
          '0123456789012', // Coca Cola
          '0987654321098', // Apple
          '1234567890123', // Banana
          '9876543210987', // Chicken Breast
          '5555555555555', // Whole Wheat Bread
        ];
        
        const randomBarcode = mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)];
        handleBarcodeDetected(randomBarcode);
      } else {
        // Continue scanning
        setTimeout(detectBarcode, 100);
      }
    };
    
    setTimeout(detectBarcode, 1000); // Start after 1 second
  };

  const handleBarcodeDetected = async (barcode) => {
    setIsScanning(false);
    setDetectedBarcode(barcode);
    
    try {
      const productInfo = await lookupBarcode(barcode);
      setScanResult(productInfo);
      
      if (productInfo && productInfo.success) {
        onBarcodeDetected(productInfo);
      } else {
        setError('Product not found in database. Try manual entry.');
      }
    } catch (error) {
      console.error('Barcode lookup error:', error);
      setError('Failed to lookup product. Please try again.');
    }
  };

  const manualBarcodeEntry = () => {
    const barcode = prompt('Enter barcode manually:');
    if (barcode && barcode.length >= 8) {
      handleBarcodeDetected(barcode);
    }
  };

  const retryScanning = () => {
    setScanResult(null);
    setError('');
    setDetectedBarcode('');
    if (hasCamera) {
      startBarcodeDetection();
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-black/80 text-white p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">📊 Barcode Scanner</h2>
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
            
            {/* Barcode Scanning Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Scanning Frame */}
                <div className="w-80 h-32 border-4 border-white rounded-lg relative bg-black/20">
                  {/* Scanning Line */}
                  {isScanning && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="w-full h-1 bg-red-500 animate-pulse absolute top-1/2 transform -translate-y-1/2"></div>
                      <div className="w-1 h-full bg-red-500 animate-ping absolute left-1/2 transform -translate-x-1/2"></div>
                    </div>
                  )}
                  
                  {/* Corner Markers */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-red-500"></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-red-500"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-red-500"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-red-500"></div>
                </div>
                
                {/* Instructions */}
                <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-white text-center">
                  <p className="text-sm">Align barcode within the frame</p>
                  <p className="text-xs opacity-75">
                    {isScanning ? 'Scanning...' : 'Position barcode clearly'}
                  </p>
                  {detectedBarcode && (
                    <p className="text-xs text-green-400 mt-1">
                      Detected: {detectedBarcode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Scanning Status */}
            {isScanning && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  <span className="text-sm">Scanning for barcode...</span>
                </div>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Camera Access Required</h3>
              <p className="text-gray-300 mb-4">Please enable camera permissions to scan barcodes</p>
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
            <span className="flex-1">{error}</span>
            <button
              onClick={retryScanning}
              className="ml-2 bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-sm transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Scan Result */}
      {scanResult && scanResult.success && (
        <div className="bg-green-600 text-white p-4">
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            <div className="flex-1">
              <p className="font-semibold">Product Found!</p>
              <p className="text-sm opacity-90">
                {scanResult.product.name} - {scanResult.product.calories} cal/100g
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
        <div className="flex items-center justify-center space-x-8">
          {/* Manual Entry */}
          <button
            onClick={manualBarcodeEntry}
            className="text-white hover:text-red-400 transition-colors"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <span className="text-xs">Manual</span>
            </div>
          </button>

          {/* Scan Status */}
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isScanning ? 'bg-red-600 animate-pulse' : 'bg-gray-600'
            }`}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <p className="text-white text-xs mt-1">
              {isScanning ? 'Scanning...' : 'Ready'}
            </p>
          </div>

          {/* Flashlight */}
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
            Position barcode within the scanning area
          </p>
          <p className="text-white text-xs opacity-50 mt-1">
            Ensure good lighting and steady hands for best results
          </p>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
