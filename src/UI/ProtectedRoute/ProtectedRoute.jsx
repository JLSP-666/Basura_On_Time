import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol')?.toLowerCase();
  const required = requiredRole?.toLowerCase();

  console.log('Token:', token);
  console.log('Rol guardado:', rol);
  console.log('Se requiere rol:', required);

  if (!token) {
    if (required === 'admin') return <Navigate to="/Admin" />;
    if (required === 'usuario') return <Navigate to="/InicioS" />;
    if (required === 'conductor') return <Navigate to="/LoginConductor" />;
    return <Navigate to="/" />;
  }

  if (required && rol !== required) {
    if (rol === 'admin') return <Navigate to="/PanelAdmin" />;
    if (rol === 'usuario') return <Navigate to="/PanelDU" />;
    if (rol === 'conductor') return <Navigate to="/PanelC" />;
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
