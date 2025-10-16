import React from 'react';

interface PhotoResultScreenProps {
  image: string;
  onBack: () => void;
}

const PhotoResultScreen: React.FC<PhotoResultScreenProps> = ({ image, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <button onClick={onBack} className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">← Back to List</button>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h1 className="text-3xl font-bold text-white">📸 Captured Photo</h1>
          </div>
          <div className="p-8">
            <img src={image} alt="Captured" className="w-full rounded-lg shadow-lg mb-6" />
            <button
              onClick={onBack}
              className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoResultScreen;
