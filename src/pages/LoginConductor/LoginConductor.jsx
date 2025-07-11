import React, { useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { ItemNavBar } from '../../UI/BotonBack/BotonBack';
import logoBasuraOnTime from '../../assets/img/icons/logoBasuraOnTime.png';
import Swal from 'sweetalert2';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

export default function LoginConductor() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ correo: '', contraseña: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.correo || !loginData.contraseña) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
        confirmButtonColor: '#0A372D',
      });
      return;
    }

    try {
      const response = await axios.post('https://express-latest-6gmf.onrender.com/loginConductor', {
        email: loginData.correo,
        password: loginData.contraseña
      },);

      const token = response.data.token
      localStorage.setItem('token', token)

      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => navigate('/PanelC'));
    } catch (error) {
      console.error(error);
      let mensaje = 'Correo o contraseña incorrectos.';

      if (error.response?.data?.message) {
        mensaje = error.response.data.message;
      }

      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: mensaje,
        showConfirmButton: true,
        confirmButtonColor: '#0A372D'
      });
    }
  };

  return (
    <section className='sectFirst glass min-h-screen flex flex-col md:flex-row justify-center items-center p-4 md:gap-20'>
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-50 scale-80 md:scale-100">
        <ItemNavBar route="/" content="Volver" />
      </div>

      <div className='flex flex-col justify-center items-center mb-6 md:mb-0'>
        <img className='w-24 h-24 mb-4 md:w-[200px] md:h-[200px]' src={logoBasuraOnTime} alt="Logo" />
        <p className='FontCursive text-3xl md:text-6xl text-center text-white'>BASURA ON TIME</p>
      </div>

      <form onSubmit={handleSubmit} className='FontGeologica flex flex-col justify-center items-center gap-4 bg-[var(--Voscuro2)] w-full p-6 rounded-3xl md:w-[480px] md:gap-4 md:rounded-4xl md:p-8'>
        <p className='FontCursive text-2xl md:text-5xl p-4 text-white text-center'>Conductor</p>

        <input
          className='rounded-md bg-[var(--Vclaro2)] w-full max-w-[500px] h-8 md:h-10 text-center placeholder:text-center text-white text-sm md:text-lg'
          type="email"
          name="correo"
          placeholder='Correo electrónico'
          value={loginData.correo}
          onChange={handleChange}
          required
        />

        <div className="relative w-full max-w-[500px]">
          <input
            className='rounded-md bg-[var(--Vclaro2)] w-full h-8 md:h-10 text-white placeholder:text-center text-center text-sm md:text-lg'
            type={showPassword ? "text" : "password"}
            name="contraseña"
            placeholder='Contraseña'
            value={loginData.contraseña}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-white"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>

        <button
          type="submit"
          className='rounded-md w-full max-w-[500px] h-8 md:h-10 bg-[var(--Vclaro)] text-white group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 active:scale-95 text-sm md:text-lg'
        >
          Iniciar sesión
        </button>
      </form>
    </section>
  );
}
