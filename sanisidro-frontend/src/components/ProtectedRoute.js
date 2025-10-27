import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Verificar si existe el token de administrador
  const adminToken = localStorage.getItem('adminToken');
  const adminData = localStorage.getItem('adminData');
  
  // Si no hay token o datos de admin, redirigir al login
  if (!adminToken || !adminData) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // Si está autenticado, renderizar el componente hijo
  return children;
};

export default ProtectedRoute;