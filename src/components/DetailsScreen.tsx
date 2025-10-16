"use client";
import React, { useState } from 'react';
import { User, MapPin, Camera } from 'lucide-react';
import { Employee } from '../types/employee';

interface DetailsScreenProps {
  employee: Employee;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onCapture: () => void;
  onBack: () => void;
  startCamera: () => Promise<void>;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ employee, videoRef, canvasRef, onCapture, onBack, startCamera }) => {
  const [showCamera, setShowCamera] = useState(false);

  const handleCaptureClick = () => {
    setShowCamera(true);
    startCamera();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button onClick={onBack} className="mb-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition">← Back</button>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{employee.name}</h1>
              <p className="text-blue-600 font-semibold">{employee.position}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <div className="p-3 md:p-4 bg-gray-50 rounded">
              <p className="text-gray-600 text-xs md:text-sm">Office Location</p>
              <p className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2 break-words">
                <MapPin size={20} className="text-blue-600 flex-shrink-0" /> 
                <span className="break-words">{employee.office}</span>
              </p>
            </div>
            <div className="p-3 md:p-4 bg-gray-50 rounded">
              <p className="text-gray-600 text-xs md:text-sm">Extension</p>
              <p className="text-lg md:text-xl font-bold text-gray-800">{employee.extnumber}</p>
            </div>
            <div className="p-3 md:p-4 bg-gray-50 rounded">
              <p className="text-gray-600 text-xs md:text-sm">Annual Salary</p>
              <p className="text-lg md:text-xl font-bold text-gray-800">{employee.salary}</p>
            </div>
            <div className="p-3 md:p-4 bg-gray-50 rounded">
              <p className="text-gray-600 text-xs md:text-sm">Start Date</p>
              <p className="text-lg md:text-xl font-bold text-gray-800">{employee.startdate}</p>
            </div>
          </div>

          {!showCamera ? (
            <button
              onClick={handleCaptureClick}
              className="w-full px-6 py-4 bg-gray-700 text-white font-bold rounded hover:bg-gray-800 transition flex items-center justify-center gap-2"
            >
              <Camera size={24} /> Capture Photo
            </button>
          ) : (
            <div className="space-y-4">
              <video ref={videoRef} autoPlay className="w-full rounded border-4 border-gray-500" style={{ maxHeight: '400px' }} />
              <canvas ref={canvasRef} width={640} height={480} className="hidden" />
              <div className="flex gap-3">
                <button
                  onClick={onCapture}
                  className="flex-1 px-6 py-3 bg-gray-700 text-white font-bold rounded hover:bg-gray-800 transition"
                >
                  📸 Take Photo
                </button>
                <button
                  onClick={() => setShowCamera(false)}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white font-bold rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsScreen;
