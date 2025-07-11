import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

export default function MapaRuta({ origenLat, origenLng, destinoLat, destinoLng }) {
  const mapRef = useRef(null);
  const [directions, setDirections] = useState(null);
  const intervalRef = useRef(null);
  console.log(destinoLat, destinoLng)

  const origen = {
    lat: parseFloat(origenLat),
    lng: parseFloat(origenLng),
  };

  const destino = {
    lat: parseFloat(destinoLat),
    lng: parseFloat(destinoLng),
  };

  const safeOrigen = {
    lat: isNaN(origen.lat) ? 4.598056 : origen.lat,
    lng: isNaN(origen.lng) ? -74.076111 : origen.lng,
  };

  const safeDestino = {
    lat: isNaN(destino.lat) ? 4.701389 : destino.lat,
    lng: isNaN(destino.lng) ? -74.146944 : destino.lng,
  };

  const fetchDirections = () => {
    if (window.google && mapRef.current) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: safeOrigen,
          destination: safeDestino,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            console.log("Ruta calculada:", result);
            setDirections(result);
          } else {
            console.error("Error calculando ruta:", status);
          }
        }
      );
    } else {
      console.warn("Google Maps o mapa no listo aún.");
    }
  };

  // Llamo y creo el intervalo SOLO cuando el mapa se carga
  const handleMapLoad = (map) => {
    mapRef.current = map;

    fetchDirections(); // 🔥 Llamada inmediata

    intervalRef.current = setInterval(fetchDirections, 5 * 60 * 1000); // Cada 5 min
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <h1>Usted esta a esta distancia con el camion</h1>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={safeOrigen}
        zoom={12}
        onLoad={handleMapLoad}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </>
  );
}
