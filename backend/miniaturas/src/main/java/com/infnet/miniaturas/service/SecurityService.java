package com.infnet.miniaturas.service;

import com.infnet.miniaturas.model.Usuario;
import com.infnet.miniaturas.model.dto.AuthUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.security.sasl.AuthenticationException;
import java.util.Optional;

@Service
public class SecurityService {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private TokenService tokenService;

    public String authenticate(AuthUserDTO authUserDTO) throws AuthenticationException {
        Optional<Usuario> byEmail = usuarioService.findByEmail(authUserDTO.email());
        if(byEmail.isEmpty()) throw new AuthenticationException("Usuario ou senha incorretos");
        Usuario usuario = byEmail.get();
        if(usuario.getPassword().equals(authUserDTO.password())) return tokenService.generateToken(usuario);
        else throw new AuthenticationException("Usuario ou senha incorretos");
    }
}