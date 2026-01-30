package com.hod.realty.controller;

import com.hod.realty.model.*;
import com.hod.realty.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    private SectionRepository sectionRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private CounterRepository counterRepository;

    @Autowired
    private PartnerRepository partnerRepository;

    @Autowired
    private CompanyInfoRepository companyInfoRepository;

    @Autowired
    private LatestLaunchRepository latestLaunchRepository;

    @Autowired
    private com.hod.realty.repository.SiteConfigRepository siteConfigRepository;

    @Autowired
    private com.hod.realty.repository.TenantRepository tenantRepository;

    @Autowired
    private com.hod.realty.config.TenantFilter tenantFilter; // Just to ensure it's loaded, though not strictly needed
                                                             // here

    @GetMapping("/homepage")
    public ResponseEntity<Map<String, Object>> getHomepageData() {
        Map<String, Object> response = new HashMap<>();

        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        if (tenantId == null) {
            // Fallback or error
            tenantId = 1L;
        }

        // Fetch visible sections ordered by displayOrder
        List<Section> sections = sectionRepository.findByTenantIdAndIsVisibleTrueOrderByDisplayOrderAsc(tenantId);
        response.put("sections", sections);

        // Fetch properties (featured and latest)
        // Let's return all visible properties
        List<Property> properties = propertyRepository.findByTenantIdAndIsVisibleTrue(tenantId);
        response.put("properties", properties);

        // Fetch counters
        List<Counter> counters = counterRepository.findByTenantIdAndIsVisibleTrueOrderByDisplayOrderAsc(tenantId);
        response.put("counters", counters);

        // Fetch partners
        List<Partner> partners = partnerRepository.findByTenantIdAndIsVisibleTrue(tenantId);
        response.put("partners", partners);

        // Fetch company info
        // Assuming single record
        java.util.Optional<CompanyInfo> companyInfo = companyInfoRepository.findByTenantId(tenantId);
        if (companyInfo.isPresent()) {
            response.put("companyInfo", companyInfo.get());
        }

        // Fetch latest launches messages
        List<LatestLaunch> latestLaunches = latestLaunchRepository.findByTenantId(tenantId);
        response.put("latestLaunches", latestLaunches);

        // Fetch Site Config (Header/Footer)
        java.util.Optional<com.hod.realty.model.SiteConfig> siteConfig = siteConfigRepository.findByTenantId(tenantId);
        if (siteConfig.isPresent()) {
            response.put("siteConfig", siteConfig.get());
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/config")
    public ResponseEntity<com.hod.realty.model.SiteConfig> getSiteConfig() {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        if (tenantId == null)
            tenantId = 1L;
        return siteConfigRepository.findByTenantId(tenantId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/company-info")
    public ResponseEntity<CompanyInfo> getCompanyInfo() {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        if (tenantId == null)
            tenantId = 1L;
        return companyInfoRepository.findByTenantId(tenantId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.ok(new CompanyInfo()));
    }
}
