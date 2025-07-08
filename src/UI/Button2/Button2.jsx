import React from 'react';
import { NavLink } from 'react-router-dom';

export const Button2 = () => {
  return (
    <NavLink to="/SolicitudesE"> {/* Cambia esto por la ruta real si es diferente */}
      <button className="bg-[var(--Voscuro2)] text-white font-bold py-2 px-6 rounded-full shadow group cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 active:scale-95">
        Solicitar recolección
      </button>
    </NavLink>
  );
};

export default Button2;
