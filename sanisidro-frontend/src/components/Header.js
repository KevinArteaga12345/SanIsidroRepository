import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// import './Header.css'; 

const Header = () => {
    // Obtenemos la ubicación actual para verificar la ruta
    const location = useLocation();

    // ----------------------------------------------------
    // LÓGICA CLAVE: OCULTAR SOLO SI ESTAMOS DENTRO DEL PANEL
    // ----------------------------------------------------
    // La ruta del panel es "/admin/panel" y todas sus sub-rutas.
    // La ruta de login es "/admin/login" y DEBE MOSTRAR EL HEADER.
    if (location.pathname.startsWith('/admin/panel')) {
        return null; 
    }

    // ----------------------------------------------------
    // Renderizado normal del Header para el área pública y LoginAdmin
    // ----------------------------------------------------
    return (
        <nav className="main-header">
            <ul className="nav-list">
                
                <li style={{ marginRight: 'auto', fontSize: '1.4em', fontWeight: 'bold' }}>
                    <Link to="/">SAN ISIDRO</Link>
                </li>
                
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/carta">Carta</Link></li>
                <li><Link to="/nosotros">Nosotros</Link></li>
                <li><Link to="/reserva">Reserva</Link></li>
                <li><Link to="/carro">Carro</Link></li>

                <li style={{ marginLeft: '40px' }}>
                    <Link to="/admin/login" className="admin-link" style={{ 
                        backgroundColor: 'var(--color-primary)', 
                        color: 'white', 
                        padding: '8px 15px', 
                        borderRadius: '4px' 
                    }}>
                        ADMIN
                    </Link>
                </li>
                
            </ul>
        </nav>
    );
};

export default Header;
