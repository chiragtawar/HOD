package com.hod.realty.controller;

import com.hod.realty.model.Property;
import com.hod.realty.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*") // Allow access from React frontend
public class PropertyController {

    @Autowired
    private PropertyRepository propertyRepository;

    @GetMapping
    public List<Property> getAllProperties(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String location) {

        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        if (tenantId == null)
            tenantId = 1L;

        if (category != null && !category.isEmpty()) {
            return propertyRepository.findByTenantIdAndCategoryIgnoreCase(tenantId, category);
        }
        if (type != null && !type.isEmpty()) {
            return propertyRepository.findByTenantIdAndTypeIgnoreCase(tenantId, type);
        }
        if (location != null && !location.isEmpty()) {
            return propertyRepository.findByTenantIdAndLocationContainingIgnoreCase(tenantId, location);
        }
        return propertyRepository.findByTenantId(tenantId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        // ideally verify tenant ownership too
        return propertyRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Property createProperty(@RequestBody Property property) {
        Long tenantId = com.hod.realty.config.TenantContext.getTenantId();
        property.setTenantId(tenantId != null ? tenantId : 1L);
        return propertyRepository.save(property);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        if (propertyRepository.existsById(id)) {
            propertyRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
