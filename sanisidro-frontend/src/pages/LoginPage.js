import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    usuario: '',
    contraseña: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar usuario
    if (!formData.usuario) {
      newErrors.usuario = 'El usuario es requerido';
    } else if (formData.usuario.length < 3) {
      newErrors.usuario = 'El usuario debe tener al menos 3 caracteres';
    }

    // Validar contraseña
    if (!formData.contraseña) {
      newErrors.contraseña = 'La contraseña es requerida';
    } else if (formData.contraseña.length < 6) {
      newErrors.contraseña = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // Llamar al backend Spring Boot
        const response = await fetch('http://localhost:8080/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usuario: formData.usuario,
            contraseña: formData.contraseña
          })
        });

        console.log('📡 Respuesta recibida:', response.status);
        const data = await response.json();
        console.log('📦 Datos recibidos:', data);

        if (response.ok) {
          // Login exitoso
          const userData = {
            usuario: formData.usuario,
            nombre: data.nombre,
            apellido: data.apellido,
            gmail: data.gmail
          };
          
          // Guardar token y datos del usuario
          localStorage.setItem('adminToken', 'token-sesion-admin');
          localStorage.setItem('adminData', JSON.stringify(userData));
          
          // Actualizar contexto de autenticación
          login(userData);
          
          // Mostrar modal de éxito
          setShowSuccessModal(true);
          
          // Redirigir al dashboard después de 2 segundos
          setTimeout(() => {
            navigate('/admin/dashboard');
          }, 2000);
        } else {
          // Error en el login
          setErrors({
            general: data.message || 'Credenciales incorrectas'
          });
        }
      } catch (error) {
        console.error('Error completo:', error);
        console.error('Mensaje de error:', error.message);
        console.error('Stack:', error.stack);
        setErrors({
          general: `Error: ${error.message}. Verifica que el backend esté activo en http://localhost:8080`
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    navigate('/admin/dashboard');
  };

  return (
    <div className="login-page">
      <Header />
      
      <div className="login-container">
        <div className="container">
          <div className="login-content">
            <div className="login-card fade-in">
              <h1 className="login-title">Administrador</h1>
              <p className="login-subtitle">Iniciar Sesión</p>
              
              {errors.general && (
                <div className="alert-error" style={{
                  padding: '12px',
                  marginBottom: '20px',
                  backgroundColor: '#fee',
                  border: '1px solid #fcc',
                  borderRadius: '8px',
                  color: '#c33',
                  fontSize: '14px'
                }}>
                  {errors.general}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="usuario">Usuario</label>
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleChange}
                    className={`form-input ${errors.usuario ? 'error' : ''}`}
                    placeholder="Ingresa tu usuario"
                    disabled={isLoading}
                  />
                  {errors.usuario && <span className="error-message">{errors.usuario}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contraseña">Contraseña</label>
                  <input
                    type="password"
                    id="contraseña"
                    name="contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                    className={`form-input ${errors.contraseña ? 'error' : ''}`}
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  {errors.contraseña && <span className="error-message">{errors.contraseña}</span>}
                </div>

                <button 
                  type="submit" 
                  className="login-btn pulse"
                  disabled={isLoading}
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
              </form>

              <div className="login-footer">
                <p>¿No tienes una cuenta? <Link to="/registro" className="register-link">Regístrate aquí</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="success-modal-overlay" onClick={closeModal}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon">
              <svg viewBox="0 0 52 52" className="checkmark">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
            <h2 className="success-title">¡Bienvenido de vuelta!</h2>
            <p className="success-message">
              Has iniciado sesión exitosamente como administrador.<br/>
              Redirigiendo al panel de administración...
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default LoginPage;