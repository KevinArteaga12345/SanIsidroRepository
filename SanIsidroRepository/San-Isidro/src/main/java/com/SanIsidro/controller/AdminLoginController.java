package com.SanIsidro.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SanIsidro.repository.AdministradorRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminLoginController {

    @Autowired
    private AdministradorRepository administradorRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String usuario = request.get("usuario");
        String contraseña = request.get("contraseña");

        return administradorRepository.findByUsuario(usuario)
                .map(admin -> {
                    if (admin.getContraseña().equals(contraseña)) {
                        Map<String, Object> response = new HashMap<>();
                        response.put("message", "Login exitoso");
                        response.put("nombre", admin.getNombre());
                        response.put("apellido", admin.getApellido());
                        response.put("gmail", admin.getGmail());
                        return ResponseEntity.ok(response);
                    } else {
                        return ResponseEntity.status(401).body(Map.of("message", "Contraseña incorrecta"));
                    }
                })
                .orElse(ResponseEntity.status(404).body(Map.of("message", "Usuario no encontrado")));
    }
}