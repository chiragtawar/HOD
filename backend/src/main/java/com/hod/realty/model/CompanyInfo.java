package com.hod.realty.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "company_info")
public class CompanyInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tenant_id", nullable = false)
    private Long tenantId = 1L;

    private String founderName;

    @Column(length = 1000)
    private String founderBio;

    private String address;
    private String phone;
    private String email;

    private String founderImageUrl;

    @Column(columnDefinition = "TEXT")
    private String socialLinksJson;

    @Column(columnDefinition = "TEXT")
    private String googleMapUrl;

    private boolean isVisible = true;
}
