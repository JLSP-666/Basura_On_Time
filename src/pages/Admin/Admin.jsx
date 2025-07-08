import React, { useState } from 'react';
import logoBasuraOnTime from '../../assets/img/icons/logoBasuraOnTime.png';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import "./Admin.css";


const Admin = () => {
  const URL = "https://express-latest-6gmf.onrender.com/authAdmin";
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    Swal.fire({
      title: 'Procesando...',
      text: 'Estamos procesando tu solicitud',
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const response = await axios.post(URL, { email, password });
    const token = response.data.token;

    setTimeout(() => {
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('rol', 'admin'); // <-- ESTA LÍNEA ES CLAVE

        Swal.fire({
          title: 'Bienvenido',
          text: 'Has iniciado sesión correctamente',
          icon: 'success',
          showConfirmButton: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
          timer: 2000,
          timerProgressBar: true,
        }).then((result) => {
          if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
            navigate('/PanelAdmin');
            setEmail('');
            setPassword('');
          }
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo',
          confirmButtonColor: '#0A372D',
        });
      }
    }, 1500);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <section className='sectFirst glass min-h-screen flex flex-col md:flex-row justify-center items-center p-4 md:gap-20'>

      {/* Logo y título */}
      <div className='flex flex-col justify-center items-center mb-6 md:mb-0'>
        <img className='w-20 h-20 mb-4 md:w-[200px] md:h-[200px]' src={logoBasuraOnTime} alt="Logo" />
        <p className='FontCursive text-3xl text-center text-white md:text-6xl'>BASURA ON TIME</p>
      </div>

      {/* Formulario */}
      <div className='FontGeologica flex flex-col justify-center items-center gap-3 bg-[var(--Voscuro2)] w-full max-w-[400px] p-5 rounded-3xl md:w-[480px] md:p-8 md:gap-4'>
        <p className='FontCursive text-2xl p-3 text-white text-center md:text-5xl md:p-7'>Administrador</p>

        <input
          type="text"
          placeholder='Correo'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='rounded-md bg-[var(--Vclaro2)] w-full h-10 text-center placeholder:text-center text-white text-base md:text-lg'
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='rounded-md bg-[var(--Vclaro2)] w-full h-10 text-white placeholder:text-center text-center text-base md:text-lg'
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
          className='rounded-md w-full h-10 bg-[var(--Vclaro)] text-white group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 active:scale-95 text-base md:text-lg'
          onClick={handleLogin}
        >
          Iniciar sesión
        </button>
      </div>
    </section>
  );
};

export default Admin;
