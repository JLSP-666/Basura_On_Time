import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ItemNavBar from '../../UI/BotonBack/BotonBack';
import logoBasuraOnTime from '../../assets/img/icons/logoBasuraOnTime.png';
import axios from 'axios';
import './ContraR.css';

const ContraR = () => {
  const [email, setEmail] = useState('');
  const URL = 'https://express-latest-6gmf.onrender.com/validateEmail';

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Enviando...',
      text: 'Procesando la solicitud de recuperación',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    try {
      const response = await axios.post(URL, { email });
      const token = response.data.token;
      console.log(token);
      if (token) {
        localStorage.setItem('token', token);
      }
      if (response.status === 200) {
        Swal.fire({
          title: 'Éxito',
          text: 'Se ha enviado un enlace de recuperación a tu correo electrónico.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.mensaje || 'No se pudo enviar el enlace de recuperación.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <section className='sectFirst glass p-[50px] place-items-center'>
      <div className='flex flex-col justify-center items-center'>
        <div className="absolute top-4 left-4 z-50">
          <ItemNavBar route="/" content=" " />
        </div>
        <img className='img_logo' src={logoBasuraOnTime} alt="Logo" />
        <p id='FontCursive' className='text-6xl text-center text-white'>BASURA ON TIME</p>
      </div>

      <div className='FontGeologica flex flex-col justify-center items-center gap-5 bg-[var(--Voscuro2)] w-120 h-auto rounded-4xl p-10'>
        <p id='FontCursive' className='text-4xl text-white'>Recuperar contraseña</p>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full items-center'>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md bg-[var(--Vclaro2)] w-100 h-10 text-center placeholder:text-center text-white"
            placeholder="ejemplo@correo.com"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-md w-100 h-10 bg-[var(--Vclaro)] text-white font-semibold group cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 active:scale-95"
          >
            Enviar enlace de recuperación
          </button>
        </form>
        <p className='text-sm text-white text-center'>
          Recibirás un enlace en tu correo para restablecer tu contraseña.
        </p>
      </div>
    </section>
  );
};

export default ContraR;