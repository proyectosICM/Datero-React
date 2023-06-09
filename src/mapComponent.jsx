import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

export function MapComponent() {
  //const position = [51.505, -0.09];
  return (
    <div className="container-registros">
      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

      </MapContainer>,
    </div>

  );
};