import React from 'react';
import { Link } from 'react-router-dom';

const CampaignCTA = ({ title, content }) => {
    const { message, campaignName, buttonText, buttonLink } = JSON.parse(content || '{}');

    return (
        <section className="py-20 bg-primary text-white">
            <div className="max-w-4xl mx-auto text-center px-4">
                {campaignName && (
                    <span className="inline-block bg-accent text-slate-900 px-4 py-1 font-bold text-xs uppercase tracking-widest mb-6">
                        {campaignName}
                    </span>
                )}
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">{title || 'Looking to Sell?'}</h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    {message || 'List with us and get the best market price. Our extensive network ensures quick closures.'}
                </p>
                <Link to={buttonLink || "/contact"} className="bg-accent text-slate-900 px-8 py-3 font-bold hover:bg-white transition inline-block uppercase tracking-wider text-sm">
                    {buttonText || 'Submit Requirement'}
                </Link>
            </div>
        </section>
    );
};

export default CampaignCTA;
