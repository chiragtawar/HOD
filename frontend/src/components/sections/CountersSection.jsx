import React from 'react';
import { ShieldCheck, TrendingUp, Star } from 'lucide-react';

const icons = {
    ShieldCheck: ShieldCheck,
    TrendingUp: TrendingUp,
    Star: Star
};

const CountersSection = ({ title, counters }) => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-serif font-bold text-primary mb-4">{title || 'Why House of Dreams?'}</h2>
                    <div className="w-24 h-1 bg-accent mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {counters && counters.map((counter, index) => {
                        // Map index to specific icons for variety if not specified
                        const IconComponent = index === 0 ? ShieldCheck : (index === 1 ? TrendingUp : Star);

                        return (
                            <div key={counter.id} className="text-center p-8 bg-slate-50 hover:shadow-lg transition duration-300 group">
                                <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition">
                                    <IconComponent className="h-8 w-8 text-accent" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{counter.countValue}</h3>
                                <p className="text-gray-600 font-medium mb-1">{counter.label}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CountersSection;
