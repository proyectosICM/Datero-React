import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

export function MapComponent(){
  return (
    <div className="container-registros">
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
        />
        <Marker position={[51.505, -0.09]}></Marker>
        </MapContainer>
    </div>

  );
};