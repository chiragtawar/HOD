import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const SiteConfigContext = createContext();

export const useSiteConfig = () => useContext(SiteConfigContext);

export const SiteConfigProvider = ({ children }) => {
    const [siteConfig, setSiteConfig] = useState(null);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            // Fetch both config and company info in parallel
            const [configRes, infoRes] = await Promise.all([
                axios.get('/api/public/config'),
                axios.get('/api/public/company-info')
            ]);

            console.log("Site Config fetched:", configRes.data);
            console.log("Company Info fetched:", infoRes.data);

            // Parse JSON fields for config
            let config = configRes.data;
            if (typeof config.headerJson === 'string') {
                config.headerJson = JSON.parse(config.headerJson);
            }
            if (typeof config.footerJson === 'string') {
                config.footerJson = JSON.parse(config.footerJson);
            }

            setSiteConfig(config);
            setCompanyInfo(infoRes.data);
        } catch (error) {
            console.error("Failed to fetch site data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refreshConfig = () => {
        setLoading(true);
        fetchData();
    };

    return (
        <SiteConfigContext.Provider value={{ siteConfig, companyInfo, loading, refreshConfig }}>
            {children}
        </SiteConfigContext.Provider>
    );
};
