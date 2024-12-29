package com.infnet.miniaturas.service;

import com.infnet.miniaturas.model.Miniatura;
import com.infnet.miniaturas.repository.MiniaturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class MiniaturaService {

    @Autowired
    private MiniaturaRepository miniaturaRepository;

    public Page<Miniatura> listar(int pageNumber, int pageSize) {
        Pageable pnPs = PageRequest.of(pageNumber, pageSize);
        return miniaturaRepository.findAll(pnPs);
    }

    public Miniatura getById(Long id) {
        return miniaturaRepository.findById(id).get();
    }

    public String salvar(Miniatura mini) {
        miniaturaRepository.save(mini);
        return "Miniatura incluída com sucesso.";
    }

    public String atualizar(Miniatura mini) {
        miniaturaRepository.save(mini);
        return "Miniatura atualizada com sucesso.";
    }

    public String deletar(Long id) {
        miniaturaRepository.delete(miniaturaRepository.findById(id).get());
        return "Miniatura excluída com sucesso.";
    }
}
