package com.hod.realty.config;

import com.hod.realty.model.Tenant;
import com.hod.realty.repository.TenantRepository;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class TenantFilter implements Filter {

    @Autowired
    private TenantRepository tenantRepository;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String host = httpRequest.getHeader("Host");

        // Remove port if present (e.g. localhost:8080 -> localhost)
        if (host != null && host.contains(":")) {
            host = host.split(":")[0];
        }

        if (host != null) {
            Tenant tenant = tenantRepository.findByDomain(host);
            if (tenant != null) {
                TenantContext.setTenantId(tenant.getId());
            } else {
                // Determine if we should fail or fallback.
                // For now, let's fallback to default tenant (ID 1) for localhost dev
                // convenience if not found,
                // or maybe we should return 404. Ideally in strict mode return 404.
                // But for refactor transition, let's try to default to 1 if it's localhost or
                // failing.

                // FIXME: In production, strict check. For now, default to 1L
                TenantContext.setTenantId(1L);
            }
        } else {
            TenantContext.setTenantId(1L);
        }

        try {
            chain.doFilter(request, response);
        } finally {
            TenantContext.clear();
        }
    }
}
