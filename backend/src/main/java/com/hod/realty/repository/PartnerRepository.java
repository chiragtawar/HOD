package com.hod.realty.repository;

import com.hod.realty.model.Partner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Long> {
    List<Partner> findByTenantIdAndIsVisibleTrue(Long tenantId);

    List<Partner> findByTenantId(Long tenantId);
}
