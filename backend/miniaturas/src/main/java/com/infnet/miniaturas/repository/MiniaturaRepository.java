package com.infnet.miniaturas.repository;

import com.infnet.miniaturas.model.Miniatura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MiniaturaRepository extends JpaRepository<Miniatura, Long> {
}
