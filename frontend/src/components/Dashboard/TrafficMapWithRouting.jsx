// TrafficMapWithRouting.jsx
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Box } from '@mui/material';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const currentLocationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const destinationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map updates
const MapController = ({ currentLocation, route, routeInfo }) => {
  const map = useMap();

  useEffect(() => {
    if (currentLocation) {
      map.setView([currentLocation.lat, currentLocation.lng], 15);
    }
  }, [currentLocation, map]);

  useEffect(() => {
    if (route && routeInfo) {
      const group = new L.featureGroup([
        L.marker([routeInfo.source.lat, routeInfo.source.lng]),
        L.marker([routeInfo.destination.lat, routeInfo.destination.lng])
      ]);
      map.fitBounds(group.getBounds().pad(0.1));
    }
  }, [route, routeInfo, map]);

  return null;
};

const TrafficMapWithRouting = ({ 
  currentLocation, 
  locationHistory, 
  route, 
  routeInfo, 
  isTracking, 
  fullScreen = false 
}) => {
  const defaultCenter = [12.9716, 77.5946]; // Bangalore coordinates
  const mapCenter = currentLocation ? [currentLocation.lat, currentLocation.lng] : defaultCenter;

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Current location marker */}
        {currentLocation && (
          <Marker 
            position={[currentLocation.lat, currentLocation.lng]} 
            icon={currentLocationIcon}
          >
            <Popup>
              <div>
                <strong>Current Location</strong><br />
                Lat: {currentLocation.lat.toFixed(6)}<br />
                Lng: {currentLocation.lng.toFixed(6)}<br />
                {isTracking && <span style={{ color: 'green' }}>🔴 Live Tracking</span>}
              </div>
            </Popup>
          </Marker>
        )}

        {/* Location history trail */}
        {locationHistory.length > 1 && (
          <Polyline
            positions={locationHistory.map(loc => [loc.lat, loc.lng])}
            color="blue"
            weight={3}
            opacity={0.7}
            dashArray="5, 5"
          />
        )}

        {/* Route display */}
        {route && (
          <>
            <Polyline
              positions={route.coordinates}
              color="red"
              weight={5}
              opacity={0.8}
            />
            
            {/* Route markers */}
            {routeInfo && (
              <>
                <Marker 
                  position={[routeInfo.source.lat, routeInfo.source.lng]}
                  icon={currentLocationIcon}
                >
                  <Popup>
                    <div>
                      <strong>Source</strong><br />
                      Starting point of your route
                    </div>
                  </Popup>
                </Marker>
                
                <Marker 
                  position={[routeInfo.destination.lat, routeInfo.destination.lng]}
                  icon={destinationIcon}
                >
                  <Popup>
                    <div>
                      <strong>Destination</strong><br />
                      Distance: {routeInfo.distance} km<br />
                      Duration: {routeInfo.duration} min
                    </div>
                  </Popup>
                </Marker>
              </>
            )}
          </>
        )}

        <MapController 
          currentLocation={currentLocation} 
          route={route} 
          routeInfo={routeInfo} 
        />
      </MapContainer>
    </Box>
  );
};

export default TrafficMapWithRouting;
