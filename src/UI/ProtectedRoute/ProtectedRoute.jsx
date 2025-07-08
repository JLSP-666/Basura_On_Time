import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  console.log('Token:', token);
  console.log('Rol:', rol);
  console.log('Ruta requiere:', requiredRole);

  if (!token) {
    if (requiredRole === 'admin') return <Navigate to="/Admin" />;
    if (requiredRole === 'usuario') return <Navigate to="/InicioS" />;
    if (requiredRole === 'conductor') return <Navigate to="/LoginConductor" />;
    return <Navigate to="/" />;
  }

  if (requiredRole && rol !== requiredRole) {
    if (rol === 'admin') return <Navigate to="/PanelAdmin" />;
    if (rol === 'usuario') return <Navigate to="/PanelDU" />;
    if (rol === 'conductor') return <Navigate to="/PanelC" />;
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
