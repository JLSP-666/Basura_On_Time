import { useState, useEffect } from "react";
import { TruckIcon } from "lucide-react";
import MapaRuta from "../../Layouts/MapGoogle/MapaRuta";
import axios from "axios";

export default function PanelEstadoCamiones({ destinolat, destinoLng }) {
  const [latitud, setLatitud] = useState();
  const [longitud, setLongitud] = useState();
  const [noConductor, setNoConductor] = useState(false); // 👈 Nuevo estado
  const token = localStorage.getItem("token");

  const URL = "https://express-latest-6gmf.onrender.com/GetTruck_location";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        setLatitud(data.lat);
        setLongitud(data.lng);
        setNoConductor(false); // 👈 Hay datos, quitar mensaje
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("🚫 No hay conductor en ruta.");
          setNoConductor(true);
        } else {
          console.error(error);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-8 bg-[var(--Voscuro)] text-white min-h-screen font-sans overflow-y-auto">
      <header className="flex items-center gap-4 text-[var(--Vclaro)]">
        <TruckIcon className="w-8 h-8" />
        <h2 className="text-3xl md:text-4xl font-bold">Estado del Camión</h2>
      </header>

      {noConductor && (
        <div className="text-red-500 font-bold text-xl">
          🚫 No hay conductor en ruta actualmente.
        </div>
      )}

      {!noConductor && latitud && longitud && (
        <MapaRuta
          origenLat={destinolat}
          origenLng={destinoLng}
          destinoLat={latitud}
          destinoLng={longitud}
        />
      )}
    </div>
  );
}
