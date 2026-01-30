package com.hod.realty.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "site_configs")
public class SiteConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tenant_id", nullable = false, unique = true)
    private Long tenantId;

    @Column(columnDefinition = "TEXT")
    private String headerJson; // JSON configuration for header (logo, menu items)

    @Column(columnDefinition = "TEXT")
    private String footerJson; // JSON configuration for footer (social links, contact info)
}
