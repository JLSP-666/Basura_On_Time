import React, { useState } from 'react';
import {
  FaUserPlus,
  FaSignInAlt,
  FaTruckMoving,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome
} from 'react-icons/fa';
import logo from '../../assets/img/icons/logo.png';
import { ItemNavBar } from '../../UI/ItemNavBar/ItemNavBar';
import './Header.css';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="FontGeologica sticky top-0 bg-[var(--Voscuro2)] h-50 grid grid-cols-[1fr_auto] items-center z-50 text-white shadow-lg">
        
        {/* Logo y título */}
        <div className="flex items-center gap-4 m-4">
          <div className="border-2 bg-white rounded-full shadow-md flex justify-center items-center flex-shrink-0 h-12 w-16 md:h-20 md:w-20">
            <img src={logo} alt="logo" className="h-12 w-auto object-contain md:h-20" />
          </div>
          <div className="text-white max-w-[calc(100vw-80px)]">
            <p className="FontCursive text-2xl md:text-[60px] leading-tight">Basura On Time</p>
            <p className="text-sm text-gray-200 italic">Por un futuro más limpio, empezamos hoy.</p>
          </div>
        </div>

        {/* Menú escritorio */}
        <div className="hidden md:flex justify-end items-center gap-6 pr-6">
          {isLoggedIn ? (
            <>
              <ItemNavBar route='/PanelDU' icon={FaHome} label="Mi Panel" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-600 transition"
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">Cerrar sesión</span>
              </button>
            </>
          ) : (
            <>
              <ItemNavBar route='/Register' icon={FaUserPlus} label="Registro" />
              <ItemNavBar route='/InicioS' icon={FaSignInAlt} label="Login" />
              <ItemNavBar route='/LoginConductor' icon={FaTruckMoving} label="Conductor" />
            </>
          )}
        </div>

        {/* Botón hamburguesa móvil */}
        <div className="flex md:hidden justify-end pr-8">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div
          className="md:hidden fixed top-[200px] left-0 right-0 bg-[var(--Voscuro2)] text-white px-6 py-4 shadow-md z-50"
          onMouseLeave={() => setMenuOpen(false)}
        >
          {isLoggedIn ? (
            <>
              <ItemNavBar route='/PanelDU' icon={FaHome} label="Mi Panel" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-600 transition"
              >
                <FaSignOutAlt />
                <span>Cerrar sesión</span>
              </button>
            </>
          ) : (
            <>
              <ItemNavBar route='/Register' icon={FaUserPlus} label="Registro" />
              <ItemNavBar route='/InicioS' icon={FaSignInAlt} label="Login" />
              <ItemNavBar route='/LoginConductor' icon={FaTruckMoving} label="Conductor" />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Header;
