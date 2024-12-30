package com.infnet.miniaturas.service;

import com.infnet.miniaturas.model.Usuario;
import com.infnet.miniaturas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Optional<Usuario> findByEmail(String email) {
        Usuario byEmail = usuarioRepository.findByEmail(email);
        if (byEmail == null) {return Optional.empty(); }
        else { return Optional.of(byEmail); }
    }

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> findById(Long id) {
        Optional<Usuario> byId = usuarioRepository.findById(id);
        if(byId.isPresent()){
            Usuario usuario = byId.get();
            usuario.setPassword(null);
            return Optional.of(usuario);
        }
        return byId;
    }
}