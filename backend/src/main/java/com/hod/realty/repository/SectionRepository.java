package com.hod.realty.repository;

import com.hod.realty.model.Section;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SectionRepository extends CrudRepository<Section, Long> {
    List<Section> findByTenantIdOrderByDisplayOrderAsc(Long tenantId);

    List<Section> findByTenantIdAndIsVisibleTrueOrderByDisplayOrderAsc(Long tenantId);
}
