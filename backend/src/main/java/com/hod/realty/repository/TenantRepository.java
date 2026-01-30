package com.hod.realty.repository;

import com.hod.realty.model.Tenant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TenantRepository extends CrudRepository<Tenant, Long> {
    Tenant findByDomain(String domain);
}
