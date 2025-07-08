import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import logoBasuraOnTime from "../../assets/img/icons/logoBasuraOnTime.png";

const SolicitudForm = () => {
  const token = localStorage.getItem("token");
  const URL = "https://express-latest-6gmf.onrender.com/requests";

  const [zona, setZona] = useState("");
  const [fecha_solicitud, setFechaSolicitud] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [tipo_residuo, setTipoResiduo] = useState("");
  const [tamano, setTamano] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor inicia sesión para enviar la solicitud.",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    Swal.fire({
      title: "Enviando solicitud...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const formData = { zona, fecha_solicitud, cantidad, tipo_residuo, tamano };
      await axios.post(URL, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Solicitud enviada",
        text: "Tu solicitud fue enviada correctamente",
        timer: 2000,
        showConfirmButton: false,
      });

      setZona("");
      setFechaSolicitud("");
      setCantidad("");
      setTipoResiduo("");
      setTamano("");

    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un problema al enviar la solicitud.",
      });
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen bg-[var(--Voscuro)] flex flex-col md:flex-row justify-center items-center p-4 pt-20 md:gap-20 relative">

      {/* Logo y título */}
      <div className="flex flex-col justify-center items-center mb-10 md:mb-0">
        <img className="w-24 h-24 mb-4 md:w-[200px] md:h-[200px]" src={logoBasuraOnTime} alt="Logo" />
        <p className="FontCursive text-3xl md:text-6xl text-center text-white">BASURA ON TIME</p>
      </div>

      {/* Formulario */}
      <div className="FontGeologica bg-[var(--Voscuro2)] w-full max-w-[450px] md:w-[550px] p-6 md:p-8 rounded-3xl md:rounded-4xl shadow-lg">
        <h2 className="FontCursive text-3xl md:text-5xl text-white text-center mb-6">Solicitud Especial</h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <InputField label="Zona" value={zona} onChange={(e) => setZona(e.target.value)} />
          <InputField label="Fecha de Solicitud" type="date" value={fecha_solicitud} onChange={(e) => setFechaSolicitud(e.target.value)} />
          <InputField label="Cantidad" type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
          <InputField label="Tipo de Residuo" value={tipo_residuo} onChange={(e) => setTipoResiduo(e.target.value)} />
          <InputField label="Tamaño" value={tamano} onChange={(e) => setTamano(e.target.value)} />
          <button
            type="submit"
            className="rounded-md w-full h-10 bg-[var(--Vclaro)] text-white text-sm md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 active:scale-95"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
};

const InputField = ({ label, type = "text", value, onChange }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={label}
    className="rounded-md bg-[var(--Vclaro2)] w-full h-10 text-center placeholder:text-center text-white text-sm md:text-lg"
  />
);

export default SolicitudForm;
