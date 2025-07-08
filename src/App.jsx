import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import Usuario from './pages/Usuario/Usuario';
import ContraR from './pages/ContraR/ContraR';
import Register from './pages/Register/Register';
import Admin from './pages/Admin/Admin'; // Login admin (público)
import PanelAdmin from './pages/PanelAdmin/PanelAdmin';
import Solicitudes from './pages/Solicitudes/Solicitudes';
import Rutas from './pages/Rutas/Rutas';
import Camiones from './pages/Camiones/Camiones';
import InicioS from './pages/InicioS/InicioS'; // Login usuario
import SolicitudesE from './pages/SolicitudesE/SolicitudesE';
import RutasU from './pages/RutasU/RutasU';
import Conductores from './pages/Conductores/Conductores';
import LoginConductor from './pages/LoginConductor/LoginConductor';
import UserDashboard from './pages/PanelDU/PanelDu';
import PanelEstadoCamiones from './pages/EstadoCamionesU/EstadoCamionesU';
import PanelC from './pages/PanelC/PanelC';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';

export function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/InicioS" element={<InicioS />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/ContraR" element={<ContraR />} />
      <Route path="/LoginConductor" element={<LoginConductor />} />

      {/* Rutas protegidas por usuario */}
      <Route path="/Usuario" element={
        <ProtectedRoute requiredRole="usuario">
          <Usuario />
        </ProtectedRoute>
      } />
      <Route path="/PanelDU" element={
        <ProtectedRoute requiredRole="usuario">
          <UserDashboard />
        </ProtectedRoute>
      } />
      <Route path="/PanelEstadoCamiones" element={
        <ProtectedRoute requiredRole="usuario">
          <PanelEstadoCamiones />
        </ProtectedRoute>
      } />
      <Route path="/SolicitudesE" element={
        <ProtectedRoute requiredRole="usuario">
          <SolicitudesE />
        </ProtectedRoute>
      } />
      <Route path="/RutasU" element={
        <ProtectedRoute requiredRole="usuario">
          <RutasU />
        </ProtectedRoute>
      } />

      {/* Rutas protegidas por conductor */}
      <Route path="/PanelC" element={
        
          <PanelC />
    
      } />

      {/* Rutas protegidas por admin */}
      <Route path="/PanelAdmin" element={
        <ProtectedRoute requiredRole="admin">
          <PanelAdmin />
        </ProtectedRoute>
      } />
      <Route path="/Camiones" element={
        <ProtectedRoute requiredRole="admin">
          <Camiones />
        </ProtectedRoute>
      } />
      <Route path="/Rutas" element={
        <ProtectedRoute requiredRole="admin">
          <Rutas />
        </ProtectedRoute>
      } />
      <Route path="/Solicitudes" element={
        <ProtectedRoute requiredRole="admin">
          <Solicitudes />
        </ProtectedRoute>
      } />
      <Route path="/Conductores" element={
        <ProtectedRoute requiredRole="admin">
          <Conductores />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
