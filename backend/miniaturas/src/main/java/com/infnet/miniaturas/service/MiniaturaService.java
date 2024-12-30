package com.infnet.miniaturas.service;

import com.infnet.miniaturas.model.Miniatura;
import com.infnet.miniaturas.repository.MiniaturaRepository;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class MiniaturaService {

    @Autowired
    private MiniaturaRepository miniaturaRepository;

    public Page<Miniatura> listar(int pageNumber, int pageSize, String filterValue) {
        Specification<Miniatura> filter = Specification
                .where(StringUtils.isBlank(filterValue) ? null : valueLike("marca", filterValue))
                .or(StringUtils.isBlank(filterValue) ? null : valueLike("modelo", filterValue));

        Pageable pnPs = PageRequest.of(pageNumber, pageSize);
        return miniaturaRepository.findAll(filter, pnPs);
    }

    private Specification<Miniatura> valueLike(String field, String value) {
        return ((root, query, criteriaBuilder) ->
                criteriaBuilder.like(root.get(field), "%" + value +"%"));
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
