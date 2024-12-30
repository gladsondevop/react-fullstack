package com.infnet.miniaturas.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.infnet.miniaturas.model.Usuario;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.List;

@Service
public class TokenService {
    private final String secret = "MY-SUPER-SECRET-1234";

    public String generateToken(Usuario usuario) {
        Algorithm algorithm = Algorithm.HMAC512(secret);
        return JWT.create()
                .withIssuer("com.infnet.miniaturas")
                .withSubject(usuario.getId().toString())
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7))
                .withIssuedAt(LocalDateTime.now().toInstant(ZoneOffset.UTC))
                .withClaim("email", usuario.getEmail())
                .withClaim("roles", List.of("ADMIN", "ROOT"))
                .sign(algorithm);
    }

    public DecodedJWT isValid(String token) {
        DecodedJWT decodedJWT;
        String valid = startsWithBearer(token);
        Algorithm algorithm = Algorithm.HMAC512(secret);
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer("ACME.COM")
                .build();
        decodedJWT = verifier.verify(valid);
        return decodedJWT;
    }

    public String getUsuario(DecodedJWT decodedJWT) {
        return decodedJWT.getSubject();
    }

    private String startsWithBearer(String token){
        if(!token.startsWith("Bearer")){
            throw new IllegalArgumentException("Invalid Token") ;
        }
        return token.replace("Bearer", "").trim();
    }
}