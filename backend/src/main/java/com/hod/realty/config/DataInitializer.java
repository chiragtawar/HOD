package com.hod.realty.config;

import com.hod.realty.model.CompanyInfo;
import com.hod.realty.model.LatestLaunch;
import com.hod.realty.model.Partner;
import com.hod.realty.model.Property;
import com.hod.realty.repository.CompanyInfoRepository;
import com.hod.realty.repository.LatestLaunchRepository;
import com.hod.realty.repository.PartnerRepository;
import com.hod.realty.repository.PropertyRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class DataInitializer {

        @Bean
        CommandLineRunner initDatabase(PropertyRepository propertyRepository,
                        LatestLaunchRepository latestLaunchRepository,
                        PartnerRepository partnerRepository,
                        CompanyInfoRepository companyInfoRepository,
                        com.hod.realty.repository.SectionRepository sectionRepository,
                        com.hod.realty.repository.CounterRepository counterRepository,
                        com.hod.realty.repository.TenantRepository tenantRepository,
                        com.hod.realty.repository.SiteConfigRepository siteConfigRepository) {
                return args -> {
                        // Seed Tenant
                        if (tenantRepository.count() == 0) {
                                tenantRepository.save(new com.hod.realty.model.Tenant(1L, "localhost", "HOD Realty"));
                                // Add alias for 127.0.0.1 if needed or just rely on default 1L fallback
                        }

                        // Seed SiteConfig
                        if (siteConfigRepository.count() == 0) {
                                siteConfigRepository.save(new com.hod.realty.model.SiteConfig(1L, 1L,
                                                "{\"siteName\": \"House of Dreams\", \"logoUrl\": \"/logos/hod-logo-dark.png\", \"menuItems\": [{\"label\": \"Home\", \"link\": \"/\", \"order\": 1, \"visible\": true}, {\"label\": \"Properties\", \"link\": \"/properties\", \"order\": 2, \"visible\": true}, {\"label\": \"Investment Resources\", \"link\": \"/tools\", \"order\": 3, \"visible\": true}, {\"label\": \"About\", \"link\": \"/about\", \"order\": 4, \"visible\": true}, {\"label\": \"Contact\", \"link\": \"/contact\", \"order\": 5, \"visible\": true}]}",
                                                "{\"aboutText\": \"We help you find your dream home.\", \"address\": \"Sector 15, Faridabad\", \"phone\": \"+91 9876543210\", \"email\": \"info@houseofdreams.com\", \"copyrightText\": \"© 2024 House of Dreams. All rights reserved.\"}"));
                        }

                        if (sectionRepository.count() == 0) {
                                // 1. Hero Section
                                sectionRepository.save(new com.hod.realty.model.Section(null, 1L, "hero_section",
                                                "Hero Banner", true, 1,
                                                "{\"title\": \"Buy, Sell & Invest in <br /><span class='text-accent'>Verified Properties</span>\", \"subtitle\": \"Turning Your Property Dreams into Reality. Exclusive listings in Faridabad, Noida & Gurgaon by Chirag, Deepak & Shivam.\", \"backgroundImage\": \"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80\"}",
                                                "HeroBanner"));

                                // 2. Latest Launches Rail
                                sectionRepository
                                                .save(new com.hod.realty.model.Section(null, 1L, "latest_launches",
                                                                "Latest Launches", true, 2,
                                                                "{}",
                                                                "LatestLaunches"));

                                // 3. Why Choose Us (Counters)
                                sectionRepository.save(new com.hod.realty.model.Section(null, 1L, "why_choose_us",
                                                "Why House of Dreams?",
                                                true, 3,
                                                "{\"subtitle\": \"100% Verified Listings | Expert Investment Advice | Premium Experience\"}",
                                                "WhyChooseUs"));

                                // 4. Featured Properties
                                sectionRepository.save(
                                                new com.hod.realty.model.Section(null, 1L, "featured_properties",
                                                                "Featured Properties", true, 4,
                                                                "{\"subtitle\": \"Handpicked selections just for you.\"}",
                                                                "FeaturedProperties"));

                                // 5. Partners
                                sectionRepository.save(new com.hod.realty.model.Section(null, 1L, "partners",
                                                "Our Partners", true, 5,
                                                "{}",
                                                "PartnersRail"));

                                // 6. Founder Section
                                sectionRepository.save(new com.hod.realty.model.Section(null, 1L, "about_founder",
                                                "Meet Our Founder", true, 6,
                                                "{}",
                                                "AboutFounder"));

                                // 7. CTA
                                sectionRepository.save(new com.hod.realty.model.Section(null, 1L, "sell_cta",
                                                "Looking to Sell?", true, 7,
                                                "{\"title\": \"Looking to Sell your Property?\", \"subtitle\": \"List with us and get the best market price. Our extensive network ensures quick closures.\", \"buttonText\": \"Submit Requirement\", \"buttonLink\": \"/contact\"}",
                                                "CallToAction"));

                                // 8. Campaign Module
                                sectionRepository.save(new com.hod.realty.model.Section(null, 1L, "campaign_module",
                                                "Special Campaign", false, 8,
                                                "{\"campaignName\": \"Republic Day Sale\", \"message\": \"Get exclusive discounts on premium luxury villas this Republic Day!\", \"targetUsers\": \"Investors\"}",
                                                "CampaignModule"));
                        }

                        // 9. Rental Yield Estimator (New Section)
                        if (sectionRepository.findBySectionKey("rental_yield_estimator") == null) {
                                sectionRepository.save(new com.hod.realty.model.Section(null, 1L,
                                                "rental_yield_estimator",
                                                "Rental Yield Estimator", true, 9,
                                                "{\"description\": \"Calculate potential rental returns on your investment. (Coming Soon)\"}",
                                                "RentalYieldEstimator"));
                        }

                        if (counterRepository.count() == 0) {
                                counterRepository.save(
                                                new com.hod.realty.model.Counter(null, 1L, "Happy Families", "500+",
                                                                1, true));
                                counterRepository.save(
                                                new com.hod.realty.model.Counter(null, 1L, "Properties Sold", "200+",
                                                                2, true));
                                counterRepository.save(
                                                new com.hod.realty.model.Counter(null, 1L, "Years of Trust", "10+",
                                                                3, true));
                        }

                        if (propertyRepository.count() == 0) {
                                propertyRepository.save(new Property(null, 1L, "Luxury Villa in Sector 15",
                                                "Beautiful 4BHK villa with modern amenities, park facing.",
                                                new BigDecimal("25000000"), "Sector 15, Faridabad", "Villa", "Resale",
                                                null,
                                                true, true, false, // isFeatured, isVisible, isLatestLaunch
                                                "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                                                4, 4, 3500.0, null));

                                propertyRepository.save(new Property(null, 1L, "Modern Apartment in Neharpar",
                                                "Spacious 3BHK apartment in high-rise society.",
                                                new BigDecimal("8500000"), "Sector 88, Faridabad", "Apartment",
                                                "Resale", null,
                                                false, true, false,
                                                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                                                3, 3, 1800.0, null));

                                propertyRepository.save(new Property(null, 1L, "Commercial Plot on Main Road",
                                                "Prime location plot suitable for showroom.",
                                                new BigDecimal("50000000"), "Mathura Road, Faridabad", "Plot", "Resale",
                                                null,
                                                false, true, false,
                                                "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                                                0, 0, 250.0, null));

                                propertyRepository.save(new Property(null, 1L, "BPTP Discovery Park 3BHK",
                                                "Brand new ready to move apartment.",
                                                new BigDecimal("9500000"), "Sector 80, Faridabad", "Apartment", "New",
                                                "BPTP",
                                                true, true, true,
                                                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                                                3, 2, 1600.0, null));

                                propertyRepository.save(new Property(null, 1L, "Omaxe World Street Shop",
                                                "Commercial shop in world famous high street.",
                                                new BigDecimal("12000000"), "Sector 79, Faridabad", "Shop", "New",
                                                "Omaxe",
                                                false, true, true,
                                                "https://images.unsplash.com/photo-1555529733-0e670560f7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                                                0, 0, 400.0, null));
                        }

                        if (latestLaunchRepository.count() == 0) {
                                latestLaunchRepository
                                                .save(new LatestLaunch(null, 1L,
                                                                "BHUMIKA PLOTS: Newly Launched Plots in Sector-113"));
                                latestLaunchRepository
                                                .save(new LatestLaunch(null, 1L,
                                                                "COMMERCIAL + RESIDENTIAL MALL: New Opportunity in Faridabad"));
                        }

                        if (partnerRepository.count() == 0) {
                                partnerRepository.save(new Partner(null, 1L, "Bhumika Group",
                                                "/favicon.svg",
                                                "https://bhumikagroup.com", true));
                                partnerRepository.save(new Partner(null, 1L, "Navraj",
                                                "/favicon.svg",
                                                "https://navraj.com", true));
                                partnerRepository.save(
                                                new Partner(null, 1L, "BPTP",
                                                                "/favicon.svg",
                                                                "https://bptp.com", true));
                                partnerRepository.save(
                                                new Partner(null, 1L, "Omaxe",
                                                                "/favicon.svg",
                                                                "https://omaxe.com", true));
                                partnerRepository
                                                .save(new Partner(null, 1L, "Soha",
                                                                "/favicon.svg", "#",
                                                                true));
                                partnerRepository
                                                .save(new Partner(null, 1L, "Mansha",
                                                                "/favicon.svg", "#",
                                                                true));
                        }

                        if (companyInfoRepository.count() == 0) {
                                companyInfoRepository.save(new CompanyInfo(
                                                null, 1L,
                                                "Chirag, Deepak & Shivam",
                                                "We are a team of dedicated real estate professionals...",
                                                "Sector 15, Faridabad, Haryana",
                                                "+91 9876543210",
                                                "info@houseofdreams.com",
                                                "https://via.placeholder.com/300x300?text=Founders",
                                                "{\"facebook\": \"#\", \"instagram\": \"#\"}",
                                                null,
                                                true));
                        }
                };
        }
}
