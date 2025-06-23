import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  companyName: string;
  location: string;
  lat?: number;
  lng?: number;
}

// Coordinates for Jamshedpur companies
const companyCoordinates: Record<string, { lat: number; lng: number }> = {
  'tata-steel-jamshedpur': { lat: 22.8046, lng: 86.2029 },
  'jusco-power': { lat: 22.7996, lng: 86.1844 },
  'tinplate-company': { lat: 22.8156, lng: 86.2086 },
  'usha-martin': { lat: 22.8019, lng: 86.1947 },
  'tata-steel-water': { lat: 22.8046, lng: 86.2029 },
  'jusco-water': { lat: 22.7723, lng: 86.1533 },
  'karandih-effluent': { lat: 22.7869, lng: 86.1844 },
  'adityapur-industrial': { lat: 22.7996, lng: 86.1844 },
  'tatanagar-soil': { lat: 22.8046, lng: 86.2029 },
  'uranium-corporation': { lat: 22.6525, lng: 86.3712 }
};

// Custom marker icon for industrial facilities
const industrialIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapComponent: React.FC<MapComponentProps> = ({ companyName, location }) => {
  const coordinates = companyCoordinates[companyName] || { lat: 22.8046, lng: 86.2029 };
  const displayName = companyName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="w-full h-64 relative border rounded-lg overflow-hidden">
      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker 
          position={[coordinates.lat, coordinates.lng]} 
          icon={industrialIcon}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">{displayName}</h3>
              <p className="text-sm text-gray-600">{location}</p>
              <p className="text-xs text-gray-500 mt-1">
                Lat: {coordinates.lat.toFixed(4)}, Lng: {coordinates.lng.toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;