import React, { useState, useEffect } from 'react';
import logoBasuraOnTime from '../../assets/img/icons/logoBasuraOnTime.png';
import './Rutas.css';
import { ItemNavBar } from '../../UI/BotonBack/BotonBack';
import Swal from 'sweetalert2';

const Rutas = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const savedPdf = localStorage.getItem('pdfHorarioBOT');
    if (savedPdf) setPdfUrl(savedPdf);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Pdf = reader.result;
        setPdfUrl(base64Pdf);
        localStorage.setItem('pdfHorarioBOT', base64Pdf);
        Swal.fire({ icon: 'success', title: '¡PDF importado!', text: 'El documento se cargó correctamente.', showConfirmButton: false, timer: 2000 });
      };
      reader.readAsDataURL(file);
    } else {
      Swal.fire({ icon: 'error', title: 'Archivo no válido', text: 'Por favor selecciona un PDF válido.', showConfirmButton: false, timer: 2000 });
    }
  };

  const handleDeletePdf = () => {
    Swal.fire({
      title: '¿Eliminar PDF?', text: 'Esta acción no se puede deshacer.', icon: 'warning',
      showCancelButton: true, confirmButtonColor: '#d33', cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('pdfHorarioBOT');
        setPdfUrl(null);
        Swal.fire({ icon: 'success', title: 'PDF eliminado', text: 'El documento fue eliminado correctamente.', showConfirmButton: false, timer: 2000 });
      }
    });
  };

  return (
    <section className="sectFirst min-h-screen flex flex-col md:flex-row bg-[var(--Voscuro2)]">

      {/* Header móvil */}
      <div className="md:hidden bg-[var(--Voscuro2)] w-full flex flex-col items-center pt-8 pb-5 fixed top-0 left-0 z-50">
        <div className="absolute top-2 left-2 z-50 scale-80">
          <ItemNavBar route="/PanelAdmin" content=" " />
        </div>
        <img src={logoBasuraOnTime} alt="Logo" className="w-28 h-auto mt-2" />
        <p className="FontCursive text-base text-white mt-2 md:text-3xl">BASURA ON TIME</p>
      </div>

      {/* Logo lateral PC */}
      <div className="hidden md:flex flex-col justify-center items-center h-screen bg-[var(--Voscuro2)] fixed left-0 z-10 xl:w-100 2xl:w-160 lg:w-[660px]">
        <div className="absolute top-4 left-4 z-50">
          <ItemNavBar route="/PanelAdmin" content=" " />
        </div>
        <img className="xl:w-50 2xl:w-90 " src={logoBasuraOnTime} alt="Logo Basura On Time" />
        <p className="FontCursive xl:text-4xl 2xl:text-5xl text-center text-white">BASURA ON TIME</p>
      </div>

      {/* Contenido */}
      <div className="flex-1 flex flex-col items-center justify-start mt-35 sm:mt-5 xl:mt-0 xl:ml-105 2xl:ml-160 px-4 pt-28 md:pt-10 pb-6 FontGeologica w-full overflow-y-auto">

        <h1 className="text-xl md:text-5xl xl:text-2xl text-white mb-6 text-center">Documentos de recolección BOT</h1>

        <button
          onClick={() => document.getElementById("pdfInput").click()}
          className="group cursor-pointer flex justify-center items-center text-white bg-[var(--Voscuro2)] rounded-2xl px-6 py-2 text-sm md:text-xl transition-all hover:scale-105 hover:shadow-2xl active:scale-95 mb-8"
        >
          Importar PDF
        </button>

        <input
          type="file"
          id="pdfInput"
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {pdfUrl ? (
          <div className="flex flex-col items-center w-full max-w-[800px]">
            <div className="w-full h-auto rounded-xl shadow-lg overflow-hidden">
              <embed
                src={pdfUrl}
                type="application/pdf"
                className="rounded-xl w-full h-[40vh] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[500px] xl:w-full xl:h-[450px] 2xl:h-[450px]"
              />
            </div>
            <p className="text-white mt-5 text-center text-sm md:text-lg">Horario de recolección en las áreas públicas</p>
            <button
              onClick={handleDeletePdf}
              className="group cursor-pointer mt-4 text-white bg-red-600 px-6 py-2 rounded-xl text-sm md:text-lg hover:bg-red-700 transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
            >
              Eliminar PDF
            </button>
          </div>
        ) : (
          <p className="text-white text-sm md:text-lg mt-6 text-center">No hay documentos cargados.</p>
        )}
      </div>
    </section>

  );
};

export default Rutas;
