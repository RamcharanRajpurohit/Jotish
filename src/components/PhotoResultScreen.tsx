import React from 'react';

interface PhotoResultScreenProps {
  image: string;
  onBack: () => void;
}

const PhotoResultScreen: React.FC<PhotoResultScreenProps> = ({ image, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-stone-100 p-6">
      <button onClick={onBack} className="mb-6 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition">← Back to List</button>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-700 to-stone-800 px-6 py-4">
            <h1 className="text-3xl font-bold text-white">📸 Captured Photo</h1>
          </div>
          <div className="p-8">
            <img src={image} alt="Captured" className="w-full rounded-lg shadow-lg mb-6" />
            <button
              onClick={onBack}
              className="w-full px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-800 transition"
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
