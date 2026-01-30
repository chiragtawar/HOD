import React from 'react';

const PartnersSection = ({ title, partners }) => {
    if (!partners || partners.length === 0) return null;

    return (
        <section className="py-16 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em] mb-2">{title || 'Trusted Partners'}</h3>
                    <div className="w-12 h-0.5 bg-accent mx-auto"></div>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {partners.map((partner) => (
                        <a
                            key={partner.id}
                            href={partner.websiteUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center transform hover:scale-110 transition duration-300 group"
                        >
                            <img
                                src={partner.logoUrl}
                                alt={partner.name}
                                className="h-10 md:h-14 object-contain mb-3 group-hover:brightness-110"
                            />
                            <span className="text-sm font-semibold text-gray-500 group-hover:text-primary transition-colors">
                                {partner.name}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section >
    );
};

export default PartnersSection;
