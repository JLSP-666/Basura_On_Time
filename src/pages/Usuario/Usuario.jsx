import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Mail, User, Phone, Lock } from 'lucide-react';
import Swal from 'sweetalert2';
import logoBasuraOnTime from '../../assets/img/icons/logoBasuraOnTime.png';
import { MapaGoogle } from '../../Layouts/MapGoogle/MapGoogle';
import './Usuario.css';

const UserProfileApp = () => {
  const URL = 'https://express-latest-6gmf.onrender.com/profile';
  const token = localStorage.getItem('token');

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { email, nombres, apellidos, telefono, latitud, longitud } = response.data.data[0];
        setEmail(email);
        setNombre(nombres);
        setApellido(apellidos);
        setTelefono(telefono);
        setLatitud(latitud);
        setLongitud(longitud);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
    fetchUserData();
  }, [token]);

  const handleEliminarCuenta = () => {
    if (!passwordConfirm.trim()) {
      Swal.fire({ icon: 'warning', title: 'Introduce tu contraseña', timer: 2000, showConfirmButton: false });
      return;
    }
    setShowModal(false);
    setPasswordConfirm('');
    Swal.fire({ icon: 'success', title: 'Cuenta eliminada', timer: 2000, showConfirmButton: false });
  };

  const handleGuardarCambios = () => {
    setShowEditModal(false);
    Swal.fire({ icon: 'success', title: 'Información actualizada', timer: 2000, showConfirmButton: false });
  };

  return (
    <div className="min-h-screen bg-[var(--Voscuro)] mt-5 px-2 sm:px-4 md:px-8 flex justify-center overflow-x-hidden">
      <div className="bg-[var(--Voscuro2)] rounded-4xl shadow-lg w-full max-w-7xl flex flex-col md:flex-row overflow-hidden mx-auto">

        {/* Logo lateral solo visible en md+ */}
        <div className="hidden md:flex bg-[var(--Voscuro2)] flex-col items-center justify-center h-full md:w-1/3 text-center rounded-l-4xl border-r-2 border-[var(--Voscuro)] px-10">
          <img src={logoBasuraOnTime} alt="Logo Basura On Time" className="w-40 mb-4" />
          <p className="FontCursive text-2xl md:text-4xl text-white font-semibold">Basura On Time</p>
        </div>

        {/* Información del usuario */}
        <div className="bg-white p-4 sm:p-6 md:p-8 w-full md:w-2/3 rounded-r-4xl flex flex-col gap-6 text-[var(--Voscuro)] overflow-x-hidden text-sm sm:text-base">
          <div className="flex items-center gap-4 sm:gap-6 mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{nombre} {apellido}</h2>
          </div>

          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <User size={20} /> Información Personal
            </h3>
            <button
              onClick={() => setShowEditModal(true)}
              className="rounded-md w-full max-w-[140px] h-10 bg-[var(--Vclaro)] text-white hover:scale-105 hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2 font-semibold text-sm sm:text-base"
            >
              <Pencil size={18} /> Editar
            </button>
          </div>

          <div><label className="text-sm text-gray-600 flex items-center gap-1"><Mail size={16} /> Correo</label><p className="mt-1 text-base">{email}</p></div>
          <div><label className="text-sm text-gray-600 flex items-center gap-1"><User size={16} /> Nombres</label><p className="mt-1 text-base">{nombre}</p></div>
          <div><label className="text-sm text-gray-600 flex items-center gap-1"><User size={16} /> Apellidos</label><p className="mt-1 text-base">{apellido}</p></div>
          <div><label className="text-sm text-gray-600 flex items-center gap-1"><Phone size={16} /> Teléfono</label><p className="mt-1 text-base">{Telefono}</p></div>

          <MapaGoogle latitud={latitud} longitud={longitud} />

          <div><label className="text-sm text-gray-600 flex items-center gap-1"><Lock size={16} /> Contraseña</label><p className="mt-1 text-base">••••••••</p></div>

          <button
            onClick={() => setShowModal(true)}
            className="rounded-md w-full h-10 bg-[var(--Rojo)] text-white hover:scale-105 hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2 font-semibold mt-8"
          >
            <Trash2 size={20} /> Eliminar cuenta
          </button>
        </div>
      </div>

      {/* Modal Eliminar Cuenta */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[var(--Voscuro4)] p-6 rounded-lg shadow-lg max-w-sm w-full text-center text-white space-y-4">
            <h3 className="text-xl font-semibold">¿Estás seguro?</h3>
            <p className="text-sm text-gray-300">Esta acción eliminará tu cuenta permanentemente.</p>
            <input
              type="password"
              placeholder="Introduce tu contraseña"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-[var(--Voscuro2)] text-white placeholder-gray-300"
            />
            <div className="flex justify-center gap-4 pt-4">
              <button onClick={() => { setShowModal(false); setPasswordConfirm(''); Swal.fire({ icon: 'info', title: 'Cancelado', timer: 1500, showConfirmButton: false }); }} className="rounded-md w-full max-w-[120px] h-10 bg-[var(--Vclaro3)] text-white hover:scale-105 font-semibold">Cancelar</button>
              <button onClick={handleEliminarCuenta} disabled={!passwordConfirm.trim()} className={`rounded-md w-full max-w-[120px] h-10 text-white font-semibold ${passwordConfirm.trim() ? 'bg-[var(--Rojo)] hover:scale-105' : 'bg-[var(--Rojo)] opacity-60 cursor-not-allowed'}`}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Información */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[var(--Voscuro4)] p-6 rounded-lg shadow-lg max-w-md w-full text-white space-y-4">
            <h3 className="text-xl font-semibold text-center">Editar Información</h3>
            <div><label className="text-sm text-gray-300">Correo electrónico</label><input type="email" className="w-full px-4 py-2 border rounded-md bg-[var(--Voscuro2)] text-white" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div><label className="text-sm text-gray-300">Nombre</label><input type="text" className="w-full px-4 py-2 border rounded-md bg-[var(--Voscuro2)] text-white" value={nombre} onChange={(e) => setNombre(e.target.value)} /></div>
            <div><label className="text-sm text-gray-300">Apellido</label><input type="text" className="w-full px-4 py-2 border rounded-md bg-[var(--Voscuro2)] text-white" value={apellido} onChange={(e) => setApellido(e.target.value)} /></div>
            <div><label className="text-sm text-gray-300">Teléfono</label><input type="tel" className="w-full px-4 py-2 border rounded-md bg-[var(--Voscuro2)] text-white" value={Telefono} onChange={(e) => setTelefono(e.target.value)} /></div>
            <div className="flex justify-end gap-4 pt-4">
              <button onClick={() => { setShowEditModal(false); Swal.fire({ icon: 'info', title: 'Cancelado', timer: 1500, showConfirmButton: false }); }} className="bg-[var(--Rojo)] text-white px-4 py-2 rounded hover:scale-105 font-semibold">Cancelar</button>
              <button onClick={handleGuardarCambios} className="bg-[var(--Vclaro3)] text-white px-4 py-2 rounded hover:scale-105 font-semibold">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileApp;
