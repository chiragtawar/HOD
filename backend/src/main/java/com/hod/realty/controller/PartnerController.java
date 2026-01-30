package com.hod.realty.controller;

import com.hod.realty.model.Partner;
import com.hod.realty.repository.PartnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partners")
@CrossOrigin(origins = "http://localhost:5173")
public class PartnerController {

    @Autowired
    private PartnerRepository repository;

    @GetMapping
    public List<Partner> getAll() {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        return repository.findByTenantId(tenantId != null ? tenantId : 1L);
    }

    @PostMapping
    public Partner create(@RequestBody Partner partner) {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        partner.setTenantId(tenantId != null ? tenantId : 1L);
        return repository.save(partner);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Partner> update(@PathVariable Long id, @RequestBody Partner details) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(details.getName());
                    existing.setLogoUrl(details.getLogoUrl());
                    return ResponseEntity.ok(repository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
