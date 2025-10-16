'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { Employee } from '../types/employee';

// 👇 Import MapComponent dynamically (no SSR)
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
});

interface MapScreenProps {
  employees: Employee[];
  onBack: () => void;
}

interface CityCount {
  city: string;
  count: number;
}

const cityCoordinates: { [key: string]: [number, number] } = {
  "New York": [40.7128, -74.0060],
  "London": [51.5074, -0.1278],
  "San Francisco": [37.7749, -122.4194],
  "Tokyo": [35.6895, 139.6917],
  "Edinburgh": [55.9533, -3.1883],
  "Sydney": [-33.8688, 151.2093],
  "Singapore": [1.3521, 103.8198],
};

const MapScreen: React.FC<MapScreenProps> = ({ employees, onBack }) => {
  const cities = [...new Set(employees.map(emp => emp.office))];
  const cityCounts: CityCount[] = cities.map(city => ({
    city,
    count: employees.filter(emp => emp.office === city).length,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-stone-100 p-6">
      <button onClick={onBack} className="mb-6 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition">← Back</button>

      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">🗺️ Employees by City</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cityCounts.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-700 to-stone-800 rounded-lg p-6 text-white shadow-lg">
                <p className="text-4xl font-bold">{item.count}</p>
                <p className="text-lg font-semibold">{item.city}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">City Locations on Map</h2>
          <MapComponent cityCounts={cityCounts} cityCoordinates={cityCoordinates} />
        </div>
      </div>
    </div>
  );
};

export default MapScreen;
