package com.hod.realty.repository;

import com.hod.realty.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import java.math.BigDecimal;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByTenantIdAndLocationContainingIgnoreCase(Long tenantId, String location);

    List<Property> findByTenantIdAndTypeIgnoreCase(Long tenantId, String type);

    List<Property> findByTenantIdAndCategoryIgnoreCase(Long tenantId, String category);

    // For more complex filtering, we can use Specifications later, but simple
    // methods work for now
    List<Property> findByTenantIdAndPriceBetween(Long tenantId, BigDecimal min, BigDecimal max);

    List<Property> findByTenantIdAndIsVisibleTrue(Long tenantId);

    List<Property> findByTenantId(Long tenantId);
}
