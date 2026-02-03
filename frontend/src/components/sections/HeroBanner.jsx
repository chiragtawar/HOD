import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner = ({ content }) => {
    const { title, subtitle, backgroundImage, primaryBtnText, primaryBtnLink, secondaryBtnText, secondaryBtnLink } = JSON.parse(content || '{}');

    return (
        <section className="relative h-[600px] flex items-center">
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                    alt="Hero Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/60"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1
                    className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight"
                    dangerouslySetInnerHTML={{ __html: title || 'Buy, Sell & Invest in <br /><span class="text-accent">Verified Properties</span>' }}
                />
                <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
                    {subtitle || 'Turning Your Property Dreams into Reality. Exclusive listings in Faridabad, Noida & Gurgaon.'}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to={primaryBtnLink || "/contact"} className="bg-accent text-slate-900 px-8 py-4 rounded-none font-bold hover:bg-yellow-500 transition uppercase tracking-wider">
                        {primaryBtnText || 'Call Now'}
                    </Link>
                    <Link to={secondaryBtnLink || "/properties"} className="border-2 border-white text-white px-8 py-4 rounded-none font-bold hover:bg-white hover:text-slate-900 transition uppercase tracking-wider">
                        {secondaryBtnText || 'View Listings'}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;
