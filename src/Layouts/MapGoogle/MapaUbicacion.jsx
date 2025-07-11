import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

export default function MapaUbicacion({ latitud, longitud }) {
  const lat = parseFloat(latitud);
  const lng = parseFloat(longitud);

  if (isNaN(lat) || isNaN(lng)) {
    return <div>Coordenadas inválidas</div>;
  }

  const center = { lat, lng };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
    >
      <Marker position={center} />
    </GoogleMap>
  );
}
