import { useState } from "react";
import { TruckIcon } from "lucide-react";

// Componente de tarjeta estilo oscuro sin bordes visibles
function Card({ children, className = "" }) {
  return (
    <section
      className={`rounded-2xl bg-[var(--Voscuro2)] shadow-lg ${className}`}
      role="region"
      aria-label="Estado de los camiones"
    >
      {children}
    </section>
  );
}

// Contenido interno con padding generoso
function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

// Input oscuro con foco visual claro
function Input({ className = "", ...props }) {
  return (
    <input
      className={`bg-[var(--Voscuro2)] text-white rounded-xl px-5 py-3 text-lg w-full placeholder:text-gray-400 focus:outline-none focus:ring-2 focus-[var(--Vclaro)] transition-all duration-200 ${className}`}
      {...props}
    />
  );
}

// Datos de prueba
const datosCamiones = [
  { id: "T001", ubicacion: "Ciudad A", carga: "Carga completa", estado: "En ruta" },
  { id: "T002", ubicacion: "Ciudad B", carga: "Vacío", estado: "En mantenimiento" },
  { id: "T003", ubicacion: "Ciudad C", carga: "Carga parcial", estado: "En ruta" },
  { id: "T004", ubicacion: "Ciudad D", carga: "Carga completa", estado: "Detenido" },
];

export default function PanelEstadoCamiones() {
  const [filtro, setFiltro] = useState("");

  const camionesFiltrados = datosCamiones.filter((camion) =>
    camion.estado.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 space-y-8 bg-[var(--Voscuro)] text-white min-h-screen font-sans overflow-y-auto">
      <header className="flex items-center gap-4 text-[var(--Vclaro)]">
        <TruckIcon className="w-8 h-8" />
        <h2 className="text-3xl md:text-4xl font-bold">Estado de los Camiones</h2>
      </header>

      <Input
        placeholder="Filtrar por estado (ej: En ruta)"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        aria-label="Filtrar camiones por estado"
      />

      {/* Vista PC */}
      <div className="hidden md:block">
        <Card>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-lg">
              <thead className="bg-[var(--Voscuro)] uppercase tracking-wide text-sm text-[var(--Vclaro)]">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Ubicación</th>
                  <th className="px-6 py-4">Carga</th>
                  <th className="px-6 py-4">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--Vclaro2)]">
                {camionesFiltrados.length > 0 ? (
                  camionesFiltrados.map((camion, i) => (
                    <tr
                      key={camion.id}
                      className={`transition-colors duration-150 ${
                        i % 2 === 0 ? "bg-[var(--Voscuro2)]" : "bg-[var(--Voscuro)]"
                      } hover:bg-[var(--Vclaro2)]`}
                    >
                      <td className="px-6 py-4">{camion.id}</td>
                      <td className="px-6 py-4">{camion.ubicacion}</td>
                      <td className="px-6 py-4">{camion.carga}</td>
                      <td className="px-6 py-4 font-semibold text-[var(--Vclaro)]">{camion.estado}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-[var(--Vgris)]">
                      No se encontraron camiones con ese estado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Vista Móvil */}
      <div className="flex flex-col gap-4 md:hidden overflow-y-auto pb-10 max-h-[70vh]">
        {camionesFiltrados.length > 0 ? (
          camionesFiltrados.map((camion) => (
            <div key={camion.id} className="bg-[var(--Voscuro2)] p-4 rounded-xl shadow-lg space-y-2">
              <p><span className="font-bold">ID:</span> {camion.id}</p>
              <p><span className="font-bold">Ubicación:</span> {camion.ubicacion}</p>
              <p><span className="font-bold">Carga:</span> {camion.carga}</p>
              <p><span className="font-bold">Estado:</span> <span className="text-[var(--Vclaro)] font-semibold">{camion.estado}</span></p>
            </div>
          ))
        ) : (
          <p className="text-center text-[var(--Vgris)] mt-10">
            No se encontraron camiones con ese estado.
          </p>
        )}
      </div>
    </div>
  );
}
