// UserDashboard.jsx fusionado con lógica backend, notificaciones, y diseño completo

import {
  UserCircle,
  Home,
  Truck,
  MapPin,
  Menu,
  LogOut,
  X as CloseIcon,
  FileText
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

import PanelEstadoCamionesU from "../EstadoCamionesU/EstadoCamionesU";
import RutasU from "../RutasU/RutasU"
import Usuario from "../Usuario/Usuario";
import Solicitud from "../SolicitudesE/SolicitudesE";

export default function UserDashboard() {
  const URL = 'https://express-latest-6gmf.onrender.com/profile';
  const URLN = 'https://express-latest-6gmf.onrender.com/notify/enviar-sms';
  const socket = io('https://express-latest-6gmf.onrender.com');
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({ nombres: "", email: "" });
  const [id_usuario, setId_usuario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [vista, setVista] = useState("inicio");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data.data[0];
        setUser(data);
        setId_usuario(data.id_usuario);
        setTelefono(data.telefono);
      } catch (error) {
        console.error('Error verifying token:', error);
        localStorage.removeItem('token');
        navigate('/InicioS');
      }
    };
    verifyToken();
  }, []);

  useEffect(() => {
    if (id_usuario) {
      socket.emit('register_user', String(id_usuario).trim());

      socket.on('truck_nearby', async (data) => {
        alert(`El camión está cerca: ${data.message}`);
        const mensaje = `El camión está cerca: ${data.message}`;
        const numero = "57" + telefono;

        try {
          await axios.post(URLN, { numero, mensaje }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (error) {
          console.error('Error enviando SMS:', error);
        }
      });

      return () => socket.off('truck_nearby');
    }
  }, [id_usuario]);

  const renderVista = () => {
    switch (vista) {
      case "camiones": return <PanelEstadoCamionesU />;
      case "rutas": return <RutasU />;
      case "usuario": return <Usuario />;
      case "solicitud": return <Solicitud />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Actividad reciente">
              <ul className="space-y-2 text-sm text-gray-300">
                <li>No hay actividad reciente.</li>
              </ul>
            </Card>
            <Card title="Resumen de cuenta">
              <p className="text-sm text-gray-300">
                Usuario registrado como <strong>{user.email}</strong>
              </p>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="FontGeologica min-h-screen flex flex-col md:flex-row bg-[var(--Voscuro)] text-white">
      {/* Menú móvil */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[var(--Voscuro2)] shadow-md z-50">
        <h2 className="text-xl font-bold">Panel</h2>
        <button onClick={() => setMenuAbierto(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar escritorio */}
      <aside className="w-64 bg-[var(--Voscuro2)] shadow-lg hidden md:flex flex-col pt-2">
        <SidebarNav vista={vista} setVista={setVista} />
      </aside>

      {/* Sidebar móvil */}
      {menuAbierto && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuAbierto(false)}></div>
          <div className="fixed top-0 left-0 w-64 h-full bg-[var(--Voscuro2)] shadow-md p-4 z-50 animate-slide-in pt-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Menú</h2>
              <button onClick={() => setMenuAbierto(false)}>
                <CloseIcon size={24} />
              </button>
            </div>
            <SidebarNav
              vista={vista}
              setVista={(v) => {
                setVista(v);
                setMenuAbierto(false);
              }}
            />
          </div>
        </>
      )}

      {/* Contenido principal */}
      <main className="flex-1 p-4 md:p-6">
        <header className="flex items-start justify-between">
          <h1 className="text-3xl font-bold">¡Hola, {user.nombres}!</h1>
          <UserCircle className="text-white" size={45} />
        </header>

        {renderVista()}
      </main>

      {/* Animación */}
      <style>
        {`
          @keyframes slide-in {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0); }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}

function SidebarNav({ vista, setVista }) {
  return (
    <nav className="flex flex-col gap-2 px-4 py-4">
      <NavItem active={vista === "inicio"} icon={<Home size={20} />} label="Inicio" onClick={() => setVista("inicio")} />
      <NavItem active={vista === "camiones"} icon={<Truck size={20} />} label="Camiones" onClick={() => setVista("camiones")} />
      <NavItem active={vista === "rutas"} icon={<MapPin size={20} />} label="Rutas" onClick={() => setVista("rutas")} />
      <NavItem active={vista === "usuario"} icon={<UserCircle size={20} />} label="Usuario" onClick={() => setVista("usuario")} />
      <NavItem active={vista === "solicitud"} icon={<FileText size={20} />} label="Solicitudes" onClick={() => setVista("solicitud")} />
    </nav>
  );
}

function NavItem({ icon, label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-left font-medium transition ${active ? "bg-[var(--Voscuro)] text-white" : "text-gray-300 hover:bg-[var(--Voscuro)]"}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-[var(--Voscuro)] p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}
