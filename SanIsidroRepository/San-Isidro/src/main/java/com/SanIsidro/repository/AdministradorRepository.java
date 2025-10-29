package com.SanIsidro.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SanIsidro.model.Administrador;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {
    
    // Método que busca un administrador por su nombre de usuario
    Optional<Administrador> findByUsuario(String usuario);
    
    // Métodos adicionales opcionales:
    // Optional<Administrador> findByGmail(String gmail);
    // Optional<Administrador> findByDni(String dni);
}