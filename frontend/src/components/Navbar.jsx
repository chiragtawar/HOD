import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Command, Phone } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'text-accent font-bold' : 'text-gray-600 hover:text-primary';

    // Import context locally to avoid moving the import up effectively
    const { siteConfig, companyInfo, loading } = useSiteConfig();

    if (loading) return <nav className="bg-white/95 h-20"></nav>;

    const headerData = siteConfig?.headerJson || {};
    const brandName = headerData.siteName || "House of Dreams";
    const logoUrl = headerData.logoUrl;
    const menuItems = headerData.menuItems || [
        { label: "Home", link: "/", visible: true },
        { label: "Properties", link: "/properties", visible: true },
        { label: "Investment Resources", link: "/tools", visible: true },
        { label: "About", link: "/about", visible: true },
        { label: "Contact", link: "/contact", visible: true }
    ];

    // Phone Logic: Company Info (Admin) > Config > Default
    const phoneNumber = companyInfo?.phone || "+91 98765 43210";
    const callLink = `tel:${phoneNumber.replace(/\s+/g, '')}`;

    return (
        <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <Link to="/" className="flex items-center group">
                        {logoUrl ? (
                            <img src={logoUrl} alt={brandName} className="h-10 w-auto" />
                        ) : (
                            <Command className="h-8 w-8 text-accent group-hover:rotate-12 transition-transform duration-300" />
                        )}
                        <div className="ml-3 flex flex-col">
                            <span className="text-xl font-serif font-bold text-primary leading-tight">{brandName}</span>
                            <span className="text-xs text-secondary tracking-widest uppercase group-hover:text-accent transition-colors">Realty</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        {menuItems.filter(item => item.visible).map((item, index) => (
                            <Link key={index} to={item.link} className={`${isActive(item.link)} text-sm uppercase tracking-wide transition`}>
                                {item.label}
                            </Link>
                        ))}

                        <a href={callLink} className="bg-primary text-white px-6 py-2.5 hover:bg-slate-800 transition flex items-center text-sm font-semibold tracking-wide">
                            <Phone className="h-4 w-4 mr-2 text-accent" />
                            {phoneNumber}
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
