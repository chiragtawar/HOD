package com.hod.realty.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "sections")
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tenant_id", nullable = false)
    private Long tenantId = 1L; // Default to 1 for migration

    @Column(unique = true, nullable = false)
    private String sectionKey; // e.g., "hero_banner", "featured_properties"

    private String title;

    private boolean isVisible = true;

    private Integer displayOrder;

    @Column(columnDefinition = "TEXT")
    private String contentJson; // JSON string for flexible content

    private String componentType; // e.g., "HeroBanner", "GridConfig"
}
