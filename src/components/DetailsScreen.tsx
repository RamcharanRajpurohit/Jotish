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
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ employee, videoRef, canvasRef, onCapture, onBack }) => {
  const [showCamera, setShowCamera] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <button onClick={onBack} className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">← Back</button>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{employee.name}</h1>
              <p className="text-blue-600 font-semibold">{employee.position}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-600 text-sm">Office Location</p>
              <p className="text-xl font-bold text-gray-800 flex items-center gap-2"><MapPin size={20} className="text-blue-600" /> {employee.office}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-gray-600 text-sm">Extension</p>
              <p className="text-xl font-bold text-gray-800">{employee.extnumber}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-gray-600 text-sm">Annual Salary</p>
              <p className="text-xl font-bold text-gray-800">{employee.salary}</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-gray-600 text-sm">Start Date</p>
              <p className="text-xl font-bold text-gray-800">{employee.startdate}</p>
            </div>
          </div>

          {!showCamera ? (
            <button
              onClick={() => setShowCamera(true)}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <Camera size={24} /> Capture Photo
            </button>
          ) : (
            <div className="space-y-4">
              <video ref={videoRef} autoPlay className="w-full rounded-lg border-4 border-blue-500" style={{ maxHeight: '400px' }} />
              <canvas ref={canvasRef} width={640} height={480} className="hidden" />
              <div className="flex gap-3">
                <button
                  onClick={onCapture}
                  className="flex-1 px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
                >
                  📸 Take Photo
                </button>
                <button
                  onClick={() => setShowCamera(false)}
                  className="flex-1 px-6 py-3 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500 transition"
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
