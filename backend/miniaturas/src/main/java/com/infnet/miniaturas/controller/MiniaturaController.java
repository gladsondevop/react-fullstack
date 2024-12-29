package com.infnet.miniaturas.controller;

import com.infnet.miniaturas.model.Miniatura;
import com.infnet.miniaturas.service.MiniaturaService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("minis")
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "*")
public class MiniaturaController {

    @Autowired
    private MiniaturaService miniaturaService;

    @GetMapping
    public ResponseEntity<?> findAll(
            @RequestHeader(value = "page", defaultValue = "0") int page,
            @RequestHeader(value = "size", defaultValue = "5") int size) {
        return ResponseEntity.ok(miniaturaService.listar(page, size));
    }

    @GetMapping("{id}")
    public ResponseEntity getById(@PathVariable Long id) {
        return ResponseEntity.ok(miniaturaService.getById(id));
    }

    @PostMapping
    public ResponseEntity salvar(@RequestBody Miniatura mini) {
        return ResponseEntity.ok(miniaturaService.salvar(mini));
    }

    @PutMapping
    public ResponseEntity atualizar(@RequestBody Miniatura mini) {
        return ResponseEntity.ok(miniaturaService.atualizar(mini));
    }

    @DeleteMapping("{id}")
    public ResponseEntity deletar(@PathVariable Long id) {
        return ResponseEntity.ok(miniaturaService.deletar(id));
    }
}
