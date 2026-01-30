package com.hod.realty.repository;

import com.hod.realty.model.SiteConfig;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SiteConfigRepository extends CrudRepository<SiteConfig, Long> {
    Optional<SiteConfig> findByTenantId(Long tenantId);
}
