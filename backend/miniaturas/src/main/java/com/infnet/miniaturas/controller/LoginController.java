package com.infnet.miniaturas.controller;

import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.infnet.miniaturas.model.Usuario;
import com.infnet.miniaturas.model.dto.AuthUserDTO;
import com.infnet.miniaturas.payload.AuthPayload;
import com.infnet.miniaturas.service.SecurityService;
import com.infnet.miniaturas.service.TokenService;
import com.infnet.miniaturas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.security.sasl.AuthenticationException;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("auth")
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "*")
public class LoginController {

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> autenticate(@RequestBody AuthUserDTO authUserDTO){
        try{
            String authenticate = securityService.authenticate(authUserDTO);
            return ResponseEntity.ok(new AuthPayload(authenticate));
        }catch (AuthenticationException ex){
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Usuario ou senha invalidos"));
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<Usuario> getUsuarioByEmail(@PathVariable String email) {
        Optional<Usuario> byEmail = usuarioService.findByEmail(email);
        return byEmail.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/my-profile")
    public ResponseEntity<?> getMyProfile(
            @RequestHeader(value = "authorization", required = true) String token) {
        try{
            String usuario = tokenService.getUsuario(tokenService.isValid(token));
            Optional<Usuario> byId = usuarioService.findById(Long.valueOf(usuario));
            return byId.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        }catch (SignatureVerificationException ex){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "Not Autorized"));
        }

    }

}
