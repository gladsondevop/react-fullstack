package com.infnet.miniaturas.repository;

import com.infnet.miniaturas.model.Miniatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface MiniaturaRepository extends JpaRepository<Miniatura, Long>, JpaSpecificationExecutor<Miniatura> {
}
