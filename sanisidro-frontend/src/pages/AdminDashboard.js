import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    // Obtener datos del administrador desde localStorage
    const data = localStorage.getItem('adminData');
    if (data) {
      setAdminData(JSON.parse(data));
    }
  }, []);

  const handleLogout = () => {
    // Confirmar antes de cerrar sesión
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      // Limpiar localStorage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      
      // Redirigir al login
      navigate('/admin/login');
    }
  };

  if (!adminData) {
    return (
      <div className="dashboard-loading">
        <p>Cargando datos del administrador...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header del Dashboard */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Panel de Administración</h1>
          <button onClick={handleLogout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <div className="dashboard-container">
        {/* Card de Bienvenida */}
        <div className="welcome-card">
          <h2>¡Bienvenido, {adminData.nombre} {adminData.apellido}!</h2>
          <div className="admin-info">
            <div className="info-item">
              <span className="info-label">Usuario:</span>
              <span className="info-value">{adminData.usuario}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Correo:</span>
              <span className="info-value">{adminData.gmail}</span>
            </div>
          </div>
        </div>

        {/* Sección de Estadísticas */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Total Pedidos</h3>
              <p className="stat-number">124</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>Usuarios Registrados</h3>
              <p className="stat-number">45</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🍽️</div>
            <div className="stat-content">
              <h3>Productos</h3>
              <p className="stat-number">32</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h3>Reservas Hoy</h3>
              <p className="stat-number">8</p>
            </div>
          </div>
        </div>

        {/* Sección de Acciones Rápidas */}
        <div className="actions-section">
          <h3>Acciones Rápidas</h3>
          <div className="actions-grid">
            <button className="action-btn">
              <span>📝</span>
              Gestionar Pedidos
            </button>
            <button className="action-btn">
              <span>🍕</span>
              Gestionar Menú
            </button>
            <button className="action-btn">
              <span>👤</span>
              Gestionar Usuarios
            </button>
            <button className="action-btn">
              <span>📅</span>
              Gestionar Reservas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;