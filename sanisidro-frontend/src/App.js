import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Index from './pages/Index';
import Carta from './pages/Carta';
import Carrito from './pages/Carrito';
import Reserva from './pages/Reserva';
import Nosotros from './pages/Nosotros';
import PanelAdmin from './pages/PanelAdmin';
import LoginAdmin from './pages/LoginAdmin';

import Header from './components/Header'; 

const UsuariosAdmin = () => <h1>Gestión de Usuarios (Tabla de Admins)</h1>;
const CartaAdmin = () => <h1>Gestión de la Carta (Modificar Productos)</h1>;
const ReportesAdmin = () => <h1>Reportes (Lista de Pedidos)</h1>;


function App() {
  return (
    <Router>
      <Header />
      
      <div className="content">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/carta" element={<Carta />} />
          <Route path="/carro" element={<Carrito />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/nosotros" element={<Nosotros />} />

          <Route path="/admin/login" element={<LoginAdmin />} />
          
          <Route path="/admin/panel" element={<PanelAdmin />}>
              <Route path="usuarios" element={<UsuariosAdmin />} />
              <Route path="carta" element={<CartaAdmin />} />
              <Route path="reportes" element={<ReportesAdmin />} />
          </Route>
          
          <Route path="*" element={<h1>404: Página no encontrada</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
