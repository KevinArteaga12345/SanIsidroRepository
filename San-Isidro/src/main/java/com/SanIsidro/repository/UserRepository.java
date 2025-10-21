package com.SanIsidro.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SanIsidro.model.Usuario; // Asegúrate de que esta ruta a tu modelo sea correcta

@Repository
public interface UserRepository extends JpaRepository<Usuario, Long> {

    /**
     * Permite buscar un usuario en la BD por su nombre de usuario (username).
     * Spring Data JPA implementa este método automáticamente ya que sigue la convención
     * findBy<NombreColumna>.
     */
    Optional<Usuario> findByUsername(String username);
}
