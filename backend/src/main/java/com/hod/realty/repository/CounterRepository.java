package com.hod.realty.repository;

import com.hod.realty.model.Counter;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CounterRepository extends CrudRepository<Counter, Long> {
    List<Counter> findByTenantIdOrderByDisplayOrderAsc(Long tenantId);

    List<Counter> findByTenantIdAndIsVisibleTrueOrderByDisplayOrderAsc(Long tenantId);
}
