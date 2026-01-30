import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const AboutFounder = ({ title, companyInfo }) => {
    if (!companyInfo) return null;

    const socialLinks = JSON.parse(companyInfo.socialLinksJson || '{}');

    return (
        <section className="py-20 bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 z-0"></div>
                        <img
                            src={companyInfo.founderImageUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
                            alt={companyInfo.founderName}
                            className="relative z-10 w-full h-[500px] object-cover shadow-2xl grayscale hover:grayscale-0 transition duration-500"
                        />
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 z-0"></div>
                    </div>

                    <div>
                        <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">{title || 'Our Leadership'}</h2>
                        <h3 className="text-4xl font-serif font-bold text-primary mb-6">{companyInfo.founderName}</h3>
                        <div className="w-20 h-1 bg-accent mb-8"></div>
                        <p className="text-lg text-gray-700 mb-8 leading-relaxed font-light italic">
                            "{companyInfo.founderBio}"
                        </p>

                        <div className="flex gap-4 mb-8">
                            {socialLinks.facebook && (
                                <a href={socialLinks.facebook} className="bg-white p-3 rounded-none shadow-sm hover:bg-accent transition text-primary hover:text-white">
                                    <Facebook size={20} />
                                </a>
                            )}
                            {socialLinks.instagram && (
                                <a href={socialLinks.instagram} className="bg-white p-3 rounded-none shadow-sm hover:bg-accent transition text-primary hover:text-white">
                                    <Instagram size={20} />
                                </a>
                            )}
                            {socialLinks.twitter && (
                                <a href={socialLinks.twitter} className="bg-white p-3 rounded-none shadow-sm hover:bg-accent transition text-primary hover:text-white">
                                    <Twitter size={20} />
                                </a>
                            )}
                            {socialLinks.linkedin && (
                                <a href={socialLinks.linkedin} className="bg-white p-3 rounded-none shadow-sm hover:bg-accent transition text-primary hover:text-white">
                                    <Linkedin size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutFounder;
