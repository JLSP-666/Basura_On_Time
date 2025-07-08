import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { ItemNavBar } from '../../UI/BotonBack/BotonBack';
import logoBasuraOnTime from '../../assets/img/icons/logoBasuraOnTime.png';
import './ContraR.css';

const ContraR = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'Por favor, escribe tu correo electrónico.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

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
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const correoExiste = email === "correo@valido.com"; // Simulación

      Swal.close();

      if (correoExiste) {
        Swal.fire({
          icon: 'success',
          title: 'Enlace enviado',
          text: `Se ha enviado un enlace de recuperación a: ${email}`,
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Correo no encontrado',
          text: 'Este correo no está registrado. Por favor verifica o regístrate.',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar el enlace. Intenta más tarde.',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
    }
  };

  return (
    <section className='sectFirst glass min-h-screen flex flex-col md:flex-row justify-center items-center p-4 md:gap-20'>

      {/* Logo y texto */}
      <div className='flex flex-col justify-center items-center mb-6 md:mb-0'>
        <div className="absolute top-4 left-4 z-50">
          <ItemNavBar route="/" content=" " />
        </div>
        <img className='w-24 h-24 mb-4 md:w-[200px] md:h-[200px]' src={logoBasuraOnTime} alt="Logo" />
        <p className='FontCursive text-4xl text-center text-white md:text-6xl'>BASURA ON TIME</p>
      </div>

      {/* Formulario */}
      <div className='FontGeologica flex flex-col justify-center items-center gap-4 bg-[var(--Voscuro2)] w-full p-6 rounded-3xl md:w-[480px] md:gap-4 md:rounded-4xl md:p-8'>

        <p className='FontCursive text-3xl p-4 text-white text-center md:text-4xl md:p-6'>Recuperar contraseña</p>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-[500px] items-center'>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md bg-[var(--Vclaro2)] w-full h-10 text-center placeholder:text-center text-white"
            placeholder="ejemplo@correo.com"
          />

          <button
            type="submit"
            className="rounded-md w-full h-10 bg-[var(--Vclaro)] text-white font-semibold group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 active:scale-95"
          >
            Enviar enlace de recuperación
          </button>
        </form>

        <p className='text-sm text-white text-center max-w-[500px] mt-4'>
          Recibirás un enlace en tu correo para restablecer tu contraseña.
        </p>
      </div>
    </section>
  );
};

export default ContraR;
