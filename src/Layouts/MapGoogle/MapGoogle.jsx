import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

export const MapaGoogle = ({latitud, longitud}) => {

    const latitudNum = parseFloat(latitud);
    const longitudNum = parseFloat(longitud);

    const center = {
      lat: latitudNum || 4.53389,
      lng: longitudNum || -75.68111
    };
    
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAbTX5wP7twg96yad7yEg99u9yT60ZPwp4', 
  });

  if (!isLoaded) return <div>Cargando...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
      <Marker position={center} />
    </GoogleMap>
  );
};

