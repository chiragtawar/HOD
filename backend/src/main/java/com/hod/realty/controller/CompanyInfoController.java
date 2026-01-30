package com.hod.realty.controller;

import com.hod.realty.model.CompanyInfo;
import com.hod.realty.repository.CompanyInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company-info")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyInfoController {

    @Autowired
    private CompanyInfoRepository repository;

    @GetMapping
    public CompanyInfo getInfo() {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        return repository.findByTenantId(tenantId != null ? tenantId : 1L).orElse(new CompanyInfo());
    }

    @PostMapping
    public CompanyInfo update(@RequestBody CompanyInfo info) {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        java.util.Optional<CompanyInfo> existingOpt = repository.findByTenantId(tenantId != null ? tenantId : 1L);
        if (existingOpt.isPresent()) {
            CompanyInfo existing = existingOpt.get();
            existing.setFounderName(info.getFounderName());
            existing.setFounderBio(info.getFounderBio());
            existing.setAddress(info.getAddress());
            existing.setPhone(info.getPhone());
            existing.setEmail(info.getEmail());
            existing.setGoogleMapUrl(info.getGoogleMapUrl());
            existing.setFounderImageUrl(info.getFounderImageUrl());
            existing.setSocialLinksJson(info.getSocialLinksJson());
            existing.setVisible(info.isVisible());
            // ensure tenant id is kept or set
            existing.setTenantId(tenantId != null ? tenantId : 1L);
            return repository.save(existing);
        } else {
            info.setTenantId(tenantId != null ? tenantId : 1L);
            return repository.save(info);
        }
    }
}
