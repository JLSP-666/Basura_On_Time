import React, { useState } from 'react';
import Swal from 'sweetalert2';
import logoBasuraOnTime from '../../assets/img/icons/logoBasuraOnTime.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ItemNavBar } from '../../UI/BotonBack/BotonBack';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import "./Register.css";

const Register = () => {
  const URL = 'https://express-latest-6gmf.onrender.com/register';

  const [id_rol] = useState(2);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setNombres(e.target.value);
  const handleLastNameChange = (e) => setApellidos(e.target.value);
  const handlePhoneChange = (e) => setTelefono(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const registerData = async () => {
    try {
      await axios.post(URL, {
        id_rol,
        email,
        password,
        nombres,
        apellidos,
        telefono,
        latitud,
        longitud
      });

      Swal.fire({
        title: 'Bienvenido a Basura on time',
        text: 'Te has registrado con éxito',
        icon: 'success',
        showConfirmButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 2000,
        timerProgressBar: true
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo completar el registro',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
        confirmButtonColor: '#0A372D',
        timer: 2000,
        timerProgressBar: true
      });
    }
  };

  const handleGuardarDireccion = () => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLatitud(latitude);
        setLongitud(longitude);

        Swal.fire({
          icon: 'success',
          title: 'Ubicación guardada',
          text: `Latitud: ${latitude}, Longitud: ${longitude}`,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }, (error) => {
        console.error('Error obteniendo la ubicación:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo obtener la ubicación.',
        });
      });
    } catch (error) {
      console.error('Error al guardar ubicación:', error);
    }
  };

  return (
    <section className='sectFirst glass min-h-screen flex flex-col md:flex-row justify-center items-center p-4 md:gap-20'>
      {/* Botón de Volver */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-50 scale-80 md:scale-100">
        <ItemNavBar route="/" content="Volver" />
      </div>

      {/* Logo y Título */}
      <div className='flex flex-col justify-center items-center mb-6 md:mb-0'>
        <img className='w-24 h-24 mb-4 md:w-[200px] md:h-[200px]' src={logoBasuraOnTime} alt="Logo Basura on Time" />
        <p className='FontCursive text-3xl md:text-6xl text-center text-white'>BASURA ON TIME</p>
      </div>

      {/* Formulario */}
      <div className='FontGeologica flex flex-col justify-center items-center gap-4 bg-[var(--Voscuro2)] w-full p-6 rounded-3xl md:w-[480px] md:gap-4 md:rounded-4xl md:p-8'>

        <p className='FontCursive text-2xl md:text-5xl p-4 text-white text-center'>Registro</p>

        <input onChange={handleNameChange} className='rounded-md bg-[var(--Vclaro2)] w-full h-8 md:h-10 text-center text-white text-sm md:text-lg placeholder:text-center' type="text" placeholder='Nombres' />
        <input onChange={handleLastNameChange} className='rounded-md bg-[var(--Vclaro2)] w-full h-8 md:h-10 text-center text-white text-sm md:text-lg placeholder:text-center' type="text" placeholder='Apellidos' />
        <input onChange={handleEmailChange} className='rounded-md bg-[var(--Vclaro2)] w-full h-8 md:h-10 text-center text-white text-sm md:text-lg placeholder:text-center' type="text" placeholder='Correo electrónico' />
        <input onChange={handlePhoneChange} className='rounded-md bg-[var(--Vclaro2)] w-full h-8 md:h-10 text-center text-white text-sm md:text-lg placeholder:text-center' type="text" placeholder='Número de teléfono' />

        <div className="relative w-full">
          <input
            onChange={handlePasswordChange}
            className='rounded-md bg-[var(--Vclaro2)] w-full h-8 md:h-10 text-white text-sm md:text-lg text-center placeholder:text-center'
            type={showPassword ? "text" : "password"}
            placeholder='Contraseña'
            value={password}
          />
          <button
            onClick={toggleShowPassword}
            type="button"
            className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-white"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>

        <button
          className='rounded-md w-full h-8 md:h-10 bg-[var(--Vclaro)] text-white group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 active:scale-95 text-sm md:text-lg'
          onClick={registerData}
        >
          Registrarse
        </button>

        <button
          className='rounded-md w-full h-8 md:h-10 bg-[var(--Voscuro3)] text-white group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 active:scale-95 text-sm md:text-lg'
          onClick={handleGuardarDireccion}
        >
          Guardar Dirección
        </button>
      </div>
    </section>
  );
};

export default Register;
