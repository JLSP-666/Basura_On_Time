import React, { useState, useEffect } from 'react';
import logoBasuraOnTime from '../../assets/img/icons/logoBasuraOnTime.png';
import { FcOk } from "react-icons/fc";
import Swal from 'sweetalert2';
import axios from 'axios';
import { ItemNavBar } from '../../UI/BotonBack/BotonBack';
import './Solicitudes.css';

const Solicitudes = () => {
  const URL = 'https://express-latest-6gmf.onrender.com/settingsRequest';
  const URLE = 'https://express-latest-6gmf.onrender.com/stateSoli';
  const token = localStorage.getItem("token");

  const [solicitudes, setSolicitudes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data.data);
        setSolicitudes(response.data.data);
      } catch (error) {
        console.error('Error al obtener solicitudes:', error);
      }
    };

    fetchSolicitudes();
  }, []);

  const aceptarSolicitud = async (index) => {
    const solicitud = solicitudes[index];
    const idSolicitud = solicitud.id_solicitud;
    console.log(idSolicitud);

    Swal.fire({
      title: '¿Aceptar esta solicitud?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      allowEscapeKey: false,
      allowOutsideClick: false,
      confirmButtonColor: '#0A372D',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Hacer petición al backend
          await axios.patch(URLE, {
            id_solicitud: idSolicitud,
            estado: 'Aceptada'
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          // Actualizar estado localmente
          const nuevasSolicitudes = [...solicitudes];
          nuevasSolicitudes[index].estado = 'Aceptada';
          setSolicitudes(nuevasSolicitudes);

          Swal.fire({
            icon: 'success',
            title: 'Solicitud aceptada',
            timer: 1500,
            showConfirmButton: false
          });

        } catch (error) {
          console.error('Error al actualizar estado:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar la solicitud.'
          });
        }
      }
    });
  };

  const filteredSolicitudes = solicitudes.filter(s =>
    s.zona?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.fecha_solicitud?.includes(searchTerm) ||
    s.tamano?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.nombres?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.cantidad?.toString().includes(searchTerm) ||
    s.estado?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="sectFirst min-h-screen flex flex-col md:flex-row bg-[var(--Voscuro2)]">
      {/* Sidebar PC */}
      <div className="hidden md:flex flex-col justify-center items-center w-[220px] xl:w-[200px] 2xl:w-[280px] h-screen bg-[var(--Voscuro2)] fixed left-0 z-10">
        <div className="absolute top-4 left-4 z-50">
          <ItemNavBar route="/PanelAdmin" content=" " />
        </div>
        <img className="xl:w-30 2xl:w-50" src={logoBasuraOnTime} alt="Logo Basura On Time" />
        <p className="FontCursive xl:text-2xl 2xl:text-3xl text-center text-white">BASURA ON TIME</p>
      </div>

      {/* Header móvil */}
      <div className="md:hidden bg-[var(--Voscuro2)] w-full flex flex-col items-center pt-5 pb-5 fixed top-0 left-0 z-50">
        <div className="absolute top-2 left-2 z-50 scale-80">
          <ItemNavBar route="/PanelAdmin" content=" " />
        </div>
        <img src={logoBasuraOnTime} alt="Logo Basura On Time" className="w-15 h-auto mt-2" />
        <p className="FontCursive text-base md:text-3xl text-white mt-2">BASURA ON TIME</p>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col items-center justify-start md:pl-[220px] xl:pl-[240px] 2xl:pl-[280px] px-4 pt-28 md:pt-6 pb-6 FontGeologica relative w-full overflow-hidden">
        <div className="mt-10 sm:mt-5 w-full max-w-[1100px] bg-[var(--Voscuro2)] p-6 rounded-lg text-white">
          <h1 className="text-xl md:text-5xl text-white mb-6 text-center">Gestión de Solicitudes</h1>

          <div className="flex flex-col md:flex-row gap-8 mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-white rounded-md border border-[var(--Vclaro3)] text-center w-full h-12 md:w-120 text-sm md:text-xl"
              placeholder="Buscar solicitud..."
            />
          </div>

          <div className="w-full overflow-x-auto text-white max-h-[500px] overflow-y-auto">
            <div className="hidden md:grid grid-cols-7 gap-2 text-center items-center text-lg rounded-t-md h-14 p-3 border border-[var(--Vclaro3)] bg-[var(--Voscuro4)] min-w-[700px]">
              <p>Zona</p>
              <p>Cant.</p>
              <p>Fecha</p>
              <p>Tamaño</p>
              <p>Solicitante</p>
              <p>Estado</p>
              <p>Acciones</p>
            </div>

            {filteredSolicitudes.length === 0 ? (
              <p className='text-white text-center mt-3 text-sm'>No hay solicitudes que coincidan.</p>
            ) : filteredSolicitudes.map(({ zona, cantidad, fecha_solicitud, tamano, nombres, estado }, index) => (
              <div key={index} className={`grid grid-cols-1 md:grid-cols-7 gap-3 md:gap-2 text-left md:text-center text-sm md:text-lg p-4 border border-[var(--Vclaro3)] min-w-[220px] md:min-w-0 ${estado === 'Aceptada' ? 'bg-green-700 bg-opacity-40' : ''}`}>

                <div><span className="font-bold md:hidden">Zona: </span>{zona}</div>
                <div><span className="font-bold md:hidden">Cant.: </span>{cantidad}</div>
                <div className="truncate max-w-[120px] overflow-hidden whitespace-nowrap">
                  <span className="font-bold md:hidden">Fecha: </span>{fecha_solicitud}
                </div>
                <div><span className="font-bold md:hidden">Tamaño: </span>{tamano}</div>
                <div><span className="font-bold md:hidden">Solicitante: </span>{nombres}</div>
                <div><span className="font-bold md:hidden">Estado: </span>{estado}</div>

                <div className="flex gap-2 md:justify-center justify-start mt-2 md:mt-0">
                  <button
                    disabled={estado === 'Aceptada'}
                    onClick={() => aceptarSolicitud(index)}
                    className={`flex justify-center items-center rounded-md w-10 h-10
                      ${estado === 'Aceptada' ? 'bg-[var(--Vclaro3)] cursor-not-allowed' : 'bg-[var(--Vclaro3)] hover:scale-105 hover:shadow-2xl hover:bg-opacity-90'}
                      text-white group transition-all duration-300 ease-in-out active:scale-95`}
                    title={estado === 'Aceptada' ? 'Solicitud aceptada' : 'Aceptar solicitud'}
                  >
                    <FcOk className='cursor-pointer transition-transform duration-300 group-hover:rotate-2 group-hover:scale-105' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solicitudes;
