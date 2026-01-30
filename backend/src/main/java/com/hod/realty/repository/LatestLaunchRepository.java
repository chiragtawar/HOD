package com.hod.realty.repository;

import com.hod.realty.model.LatestLaunch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LatestLaunchRepository extends JpaRepository<LatestLaunch, Long> {
    List<LatestLaunch> findByTenantId(Long tenantId);
}
