import React from 'react';
import { Facebook, Instagram, Twitter, Command, Phone, Mail, MapPin } from 'lucide-react';

import { useSiteConfig } from '../context/SiteConfigContext';

const Footer = () => {
    const { siteConfig, companyInfo } = useSiteConfig();

    const headerData = siteConfig?.headerJson || {};
    const brandName = headerData.siteName || "House of Dreams Realty";
    const logoUrl = headerData.logoUrl;

    const footerData = siteConfig?.footerJson || {};
    const aboutText = footerData.aboutText || "Turning Your Property Dreams into Reality. Trusted partners for buying, selling, and investing in Faridabad, Noida, and Gurgaon.";

    // Dynamic Contact Info (Prefer CompanyInfo > SiteConfig > Default)
    const address = companyInfo?.address || footerData.address || "Sector 15, Faridabad, Haryana 121007";
    const phone = companyInfo?.phone || footerData.phone || "+91 98765 43210";
    const email = companyInfo?.email || footerData.email || "contact@houseofdreams.com";
    const copyright = footerData.copyrightText || `© ${new Date().getFullYear()} House of Dreams. All rights reserved.`;

    return (
        <footer className="bg-primary text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div>
                        <div className="flex items-center mb-4">
                            {logoUrl ? (
                                <img src={logoUrl} alt={brandName} className="h-10 w-auto mr-2 brightness-0 invert" />
                            ) : (
                                <Command className="h-8 w-8 text-accent mr-2" />
                            )}
                            <span className="text-2xl font-serif font-bold text-white">{brandName}</span>
                        </div>

                        <p className="text-gray-400 mb-6">
                            {aboutText}
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-accent transition"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-accent transition"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-accent transition"><Twitter className="h-5 w-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-accent">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><a href="/" className="text-gray-400 hover:text-white transition">Home</a></li>
                            <li><a href="/properties" className="text-gray-400 hover:text-white transition">Properties</a></li>
                            <li><a href="/about" className="text-gray-400 hover:text-white transition">About Us</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
                            <li><a href="/tools" className="text-gray-400 hover:text-white transition">Investment Tools</a></li>
                        </ul>
                    </div>

                    {/* Properties */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-accent">Properties</h3>
                        <ul className="space-y-3">
                            <li><a href="/properties?type=New" className="text-gray-400 hover:text-white transition">New Projects</a></li>
                            <li><a href="/properties?type=Resale" className="text-gray-400 hover:text-white transition">Resale Properties</a></li>
                            <li><a href="/properties?type=Commercial" className="text-gray-400 hover:text-white transition">Commercial</a></li>
                            <li><a href="/properties?type=Residential" className="text-gray-400 hover:text-white transition">Residential</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-accent">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 text-accent mr-3 mt-1" />
                                <span className="text-gray-400">{address}</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 text-accent mr-3" />
                                <span className="text-gray-400">{phone}</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 text-accent mr-3" />
                                <span className="text-gray-400">{email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>{copyright}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
