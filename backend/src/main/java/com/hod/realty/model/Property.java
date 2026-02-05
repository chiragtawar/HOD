package com.hod.realty.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "properties")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tenant_id", nullable = false)
    private Long tenantId = 1L;

    private String title;

    @Column(length = 2000)
    private String description;

    private BigDecimal price;

    private String location; // e.g., "Sector 15, Faridabad"

    private String type; // e.g., "Apartment", "Plot", "Villa"

    private String category; // "New" or "Resale"
    private String builder; // e.g., "Omaxe", "BPTP" (only for New)

    private boolean isFeatured = false;
    private boolean isVisible = true;
    private boolean isLatestLaunch = false;

    private String imageUrl; // Placeholder for now

    @Column(length = 1000)
    private String amenities; // Comma separated list of amenities

    private Integer bedrooms;
    private Integer bathrooms;
    private Double areaSqFt;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
