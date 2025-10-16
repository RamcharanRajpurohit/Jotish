'use client'; // ensure client-side only

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface MapComponentProps {
  cityCounts: { city: string; count: number }[];
  cityCoordinates: { [key: string]: [number, number] };
}

const MapComponent: React.FC<MapComponentProps> = ({ cityCounts, cityCoordinates }) => {
  return (
    <MapContainer center={[25, 0]} zoom={2} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cityCounts.map((item) => {
        const position = cityCoordinates[item.city];
        if (!position) return null;
        return (
          <Marker key={item.city} position={position}>
            <Popup>
              <strong>{item.city}</strong>
              <br />
              {item.count} employees
            </Popup>
            <Tooltip>
              <span>{item.city}: {item.count} employees</span>
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
