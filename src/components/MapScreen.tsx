import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Employee } from '../types/employee';

// Fix for default icon issue in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
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
  const cities: string[] = [...new Set(employees.map(emp => emp.office))];
  const cityCounts: CityCount[] = cities.map(city => ({
    city,
    count: employees.filter(emp => emp.office === city).length,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <button onClick={onBack} className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">← Back</button>

      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">🗺️ Employees by City</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cityCounts.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
                <p className="text-4xl font-bold">{item.count}</p>
                <p className="text-lg font-semibold">{item.city}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">City Locations on Map</h2>
          <MapContainer center={[25, 0]} zoom={2} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }} className="rounded-lg">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cityCounts.map(item => {
              const position = cityCoordinates[item.city];
              if (!position) return null;
              return (
                <Marker key={item.city} position={position}>
                  <Popup>
                    <strong>{item.city}</strong><br />
                    {item.count} employees
                  </Popup>
                  <Tooltip>
                    <span>{item.city}: {item.count} employees</span>
                  </Tooltip>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Employee Details by City</h2>
          <div className="space-y-4">
            {cityCounts.map((item, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-bold text-lg text-gray-800">{item.city}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {employees.filter(emp => emp.office === item.city).map((emp, i) => (
                    <p key={i} className="text-sm text-gray-600">• {emp.name}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapScreen;
