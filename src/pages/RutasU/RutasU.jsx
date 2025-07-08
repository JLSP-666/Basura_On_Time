import React, { useEffect, useState } from 'react';
import logoBasuraOnTime from '../../assets/img/icons/logoBasuraOnTime.png';

const RutasU = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isValidPdf, setIsValidPdf] = useState(false);

  useEffect(() => {
    const savedUrl = localStorage.getItem('pdfHorarioBOT');
    if (savedUrl) {
      fetch(savedUrl)
        .then(res => {
          if (res.ok && res.headers.get('Content-Type') === 'application/pdf') {
            setPdfUrl(savedUrl);
            setIsValidPdf(true);
          } else {
            setIsValidPdf(false);
          }
        })
        .catch(() => setIsValidPdf(false));
    }
  }, []);

  return (
    <section className="h-fit flex flex-col md:flex-row items-center justify-center p-4 py-20 gap-10 bg-[var(--Voscuro)]">

      {/* Logo en móvil */}
      <div className="flex md:hidden flex-col justify-center items-center mb-6">
        <img className="w-[120px] mb-2" src={logoBasuraOnTime} alt="Logo Basura On Time" />
        <p className="FontCursive text-3xl text-center text-white">BASURA ON TIME</p>
      </div>

      {/* Lateral solo para tablet/PC */}
      <div className="hidden md:flex flex-col justify-center items-center w-[200px] 2xl:w-[500px]">
        <img className="w-[160px] 2xl:w-[240px]" src={logoBasuraOnTime} alt="Logo Basura On Time" />
        <p className="FontCursive text-2xl 2xl:text-6xl text-center text-white mt-4">BASURA ON TIME</p>
      </div>

      {/* Contenido */}
      <div className="flex-1 flex flex-col items-center justify-start FontGeologica w-full">
        <p className="text-2xl md:text-4xl text-white mb-6 text-center">Horario recolección BOT</p>

        {isValidPdf ? (
          <div className="flex flex-col items-center w-full">
            <embed
              src={pdfUrl}
              type="application/pdf"
              className="w-full h-[300px] md:h-[500px] md:w-[700px] rounded-xl shadow-lg"
            />
            <p className="text-white mt-4 text-base md:text-lg">Horario de recolección en las áreas públicas</p>
          </div>
        ) : (
          <p className="text-white text-lg md:text-2xl mt-10 text-center">
            Aún no se ha cargado ningún documento válido.
          </p>
        )}
      </div>

    </section>
  );
};

export default RutasU;
