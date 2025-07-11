import React, { useState } from "react";
import axios from "axios";
import logoBasuraOnTime from '../../assets/img/icons/logoBasuraOnTime.png';
import ItemNavBar from '../../UI/BotonBack/BotonBack';
import Swal from 'sweetalert2';


export default function ResetPasswordForm() {
  const URL = "https://express-latest-6gmf.onrender.com/reset-password";
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    email: "",
    Newpassword: "",
    validatePassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.Newpassword !== formData.validatePassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await axios.put(URL, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 200) {
        localStorage.removeItem("token");
        setMessage("Contraseña actualizada exitosamente.");
        setFormData({ email: "", Newpassword: "", validatePassword: "" });
        Swal.fire({
          icon: 'success',
          title: 'Contraseña actualizada',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        setMessage("Error al actualizar la contraseña. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      setMessage("Ocurrió un error al actualizar la contraseña. Inténtalo más tarde.");
    }
  };

  return (
    <section className="sectFirst glass p-[50px] place-items-center">
      {/* Logo y back button */}
      <div className="flex flex-col justify-center items-center">
        <div className="absolute top-4 left-4 z-50">
          <ItemNavBar route="/" content=" " />
        </div>
        <img className='img_logo' src={logoBasuraOnTime} alt="Logo" />
        <p id='FontCursive' className='text-6xl text-center text-white'>BASURA ON TIME</p>
      </div>

      {/* Formulario */}
      <div className='FontGeologica flex flex-col justify-center items-center gap-5 bg-[var(--Voscuro2)] w-120 h-auto rounded-4xl p-10 mt-6'>
        <p id='FontCursive' className='text-4xl text-white'>Cambiar contraseña</p>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full items-center'>
          <input
            type="email"
            name="email"
            required
            placeholder="Correo electrónico"
            className="rounded-md bg-[var(--Vclaro2)] w-100 h-10 text-center placeholder:text-center text-white"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="Newpassword"
            required
            placeholder="Nueva contraseña"
            className="rounded-md bg-[var(--Vclaro2)] w-100 h-10 text-center placeholder:text-center text-white"
            value={formData.Newpassword}
            onChange={handleChange}
          />
          <input
            type="password"
            name="validatePassword"
            required
            placeholder="Confirmar contraseña"
            className="rounded-md bg-[var(--Vclaro2)] w-100 h-10 text-center placeholder:text-center text-white"
            value={formData.validatePassword}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="rounded-md w-100 h-10 bg-[var(--Vclaro)] text-white font-semibold group cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 active:scale-95"
          >
            Actualizar contraseña
          </button>
        </form>

        {message && (
          <p className='text-sm text-white text-center mt-2'>{message}</p>
        )}

        <div className="mt-3 text-center">
          <a href="/InicioS" className="text-sm text-white underline hover:text-green-400">
            ¿Recordaste tu contraseña?
          </a>
        </div>
      </div>
    </section>
  );
}
