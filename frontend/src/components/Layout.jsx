import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

import { useSiteConfig } from '../context/SiteConfigContext';
import { useEffect } from 'react';

const Layout = () => {
    const { siteConfig } = useSiteConfig();

    useEffect(() => {
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        document.head.appendChild(link);

        const headerData = siteConfig?.headerJson || {};
        const logoUrl = headerData.logoUrl;

        // If logo is set, use it. If not (Default Icon selected), use the known logo file as fallback for the tab
        link.href = logoUrl || '/favicon.svg';

    }, [siteConfig]);
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />

            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-50 animate-bounce"
                aria-label="Chat on WhatsApp"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
            </a>
        </div>
    );
};

export default Layout;
