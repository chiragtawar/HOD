package com.hod.realty.controller;

import com.hod.realty.model.*;
import com.hod.realty.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*") // Allow all origins for simplicity in development
public class AdminController {

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

    // --- SECTIONS ---
    @GetMapping("/sections")
    public List<Section> getAllSections() {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        return sectionRepository.findByTenantIdOrderByDisplayOrderAsc(tenantId != null ? tenantId : 1L);
    }

    @PostMapping("/sections")
    public Section createSection(@RequestBody Section section) {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        section.setTenantId(tenantId != null ? tenantId : 1L);
        return sectionRepository.save(section);
    }

    @PutMapping("/sections/{id}")
    public Section updateSection(@PathVariable Long id, @RequestBody Section section) {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        section.setId(id);
        section.setTenantId(tenantId != null ? tenantId : 1L);
        return sectionRepository.save(section);
    }

    @DeleteMapping("/sections/{id}")
    public void deleteSection(@PathVariable Long id) {
        // ideally verify tenant ownership
        sectionRepository.deleteById(id);
    }

    @PutMapping("/sections/order")
    public void updateSectionsOrder(@RequestBody List<Section> sections) {
        for (Section s : sections) {
            Section existing = sectionRepository.findById(s.getId()).orElse(null);
            if (existing != null) {
                existing.setDisplayOrder(s.getDisplayOrder());
                sectionRepository.save(existing);
            }
        }
    }

    // --- PROPERTIES ---
    @GetMapping("/properties")
    public List<Property> getAllProperties() {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        return propertyRepository.findByTenantId(tenantId != null ? tenantId : 1L);
    }

    @PostMapping("/properties")
    public Property createProperty(@RequestBody Property property) {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        property.setTenantId(tenantId != null ? tenantId : 1L);
        return propertyRepository.save(property);
    }

    @PutMapping("/properties/{id}")
    public Property updateProperty(@PathVariable Long id, @RequestBody Property property) {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        property.setId(id);
        property.setTenantId(tenantId != null ? tenantId : 1L);
        return propertyRepository.save(property);
    }

    @DeleteMapping("/properties/{id}")
    public void deleteProperty(@PathVariable Long id) {
        propertyRepository.deleteById(id);
    }

    // --- COUNTERS ---
    @GetMapping("/counters")
    public List<Counter> getAllCounters() {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        return counterRepository.findByTenantIdOrderByDisplayOrderAsc(tenantId != null ? tenantId : 1L);
    }

    @PostMapping("/counters")
    public Counter createCounter(@RequestBody Counter counter) {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        counter.setTenantId(tenantId != null ? tenantId : 1L);
        return counterRepository.save(counter);
    }

    @PutMapping("/counters/{id}")
    public Counter updateCounter(@PathVariable Long id, @RequestBody Counter counter) {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        counter.setId(id);
        counter.setTenantId(tenantId != null ? tenantId : 1L);
        return counterRepository.save(counter);
    }

    @DeleteMapping("/counters/{id}")
    public void deleteCounter(@PathVariable Long id) {
        counterRepository.deleteById(id);
    }

    // --- PARTNERS ---
    @GetMapping("/partners")
    public List<Partner> getAllPartners() {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        return partnerRepository.findByTenantId(tenantId != null ? tenantId : 1L);
    }

    @PostMapping("/partners")
    public Partner createPartner(@RequestBody Partner partner) {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        partner.setTenantId(tenantId != null ? tenantId : 1L);
        return partnerRepository.save(partner);
    }

    @PutMapping("/partners/{id}")
    public Partner updatePartner(@PathVariable Long id, @RequestBody Partner partner) {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        partner.setId(id);
        partner.setTenantId(tenantId != null ? tenantId : 1L);
        return partnerRepository.save(partner);
    }

    @DeleteMapping("/partners/{id}")
    public void deletePartner(@PathVariable Long id) {
        partnerRepository.deleteById(id);
    }

    // --- COMPANY INFO ---
    @GetMapping("/company-info")
    public CompanyInfo getCompanyInfo() {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        return companyInfoRepository.findByTenantId(tenantId != null ? tenantId : 1L).orElse(new CompanyInfo());
    }

    @PutMapping("/company-info")
    public CompanyInfo updateCompanyInfo(@RequestBody CompanyInfo info) {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        CompanyInfo existing = companyInfoRepository.findByTenantId(tenantId != null ? tenantId : 1L)
                .orElse(new CompanyInfo());

        existing.setFounderName(info.getFounderName());
        existing.setFounderBio(info.getFounderBio());
        existing.setAddress(info.getAddress());
        existing.setPhone(info.getPhone());
        existing.setEmail(info.getEmail());
        existing.setFounderImageUrl(info.getFounderImageUrl());
        existing.setGoogleMapUrl(info.getGoogleMapUrl());
        existing.setSocialLinksJson(info.getSocialLinksJson());
        existing.setVisible(info.isVisible());
        existing.setTenantId(tenantId != null ? tenantId : 1L);

        return companyInfoRepository.save(existing);
    }

    // --- SITE CONFIG ---
    @Autowired
    private com.hod.realty.repository.SiteConfigRepository siteConfigRepository;

    @GetMapping("/site-config")
    public com.hod.realty.model.SiteConfig getSiteConfig() {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        return siteConfigRepository.findByTenantId(tenantId != null ? tenantId : 1L)
                .orElse(new com.hod.realty.model.SiteConfig());
    }

    @PutMapping("/site-config")
    public com.hod.realty.model.SiteConfig updateSiteConfig(@RequestBody com.hod.realty.model.SiteConfig config) {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        java.util.Optional<com.hod.realty.model.SiteConfig> existingOpt = siteConfigRepository
                .findByTenantId(tenantId != null ? tenantId : 1L);
        if (existingOpt.isPresent()) {
            config.setId(existingOpt.get().getId());
        }
        config.setTenantId(tenantId != null ? tenantId : 1L);
        return siteConfigRepository.save(config);
    }
}
