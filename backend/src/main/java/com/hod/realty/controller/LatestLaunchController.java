package com.hod.realty.controller;

import com.hod.realty.model.LatestLaunch;
import com.hod.realty.repository.LatestLaunchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/latest-launches")
@CrossOrigin(origins = "http://localhost:5173")
public class LatestLaunchController {

    @Autowired
    private LatestLaunchRepository repository;

    @GetMapping
    public List<LatestLaunch> getAll() {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        return repository.findByTenantId(tenantId != null ? tenantId : 1L);
    }

    @PostMapping
    public LatestLaunch create(@RequestBody LatestLaunch latestLaunch) {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        latestLaunch.setTenantId(tenantId != null ? tenantId : 1L);
        return repository.save(latestLaunch);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LatestLaunch> update(@PathVariable Long id, @RequestBody LatestLaunch details) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setMessage(details.getMessage());
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
