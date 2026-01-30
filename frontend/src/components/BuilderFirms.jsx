import React, { useState, useEffect } from 'react';

const BuilderFirms = () => {
    const [builders, setBuilders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/partners')
            .then(res => res.json())
            .then(data => setBuilders(data))
            .catch(err => console.error(err));
    }, []);

    if (builders.length === 0) return null;

    return (
        <section className="py-16 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Our Trusted Partners</h2>
                    <div className="w-24 h-1 bg-accent mx-auto"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        We collaborate with the most reputed developers to bring you the best properties.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-80">
                    {builders.map((builder, index) => (
                        <div key={builder.id || index} className="flex flex-col items-center justify-center p-4 hover:opacity-100 transition grayscale hover:grayscale-0 duration-300">
                            <div className="h-20 w-full flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100 shadow-sm mb-3">
                                {builder.logoUrl ? (
                                    <img src={builder.logoUrl} alt={builder.name} className="max-h-16 max-w-full object-contain" />
                                ) : (
                                    <span className="text-sm font-bold text-gray-500">{builder.name}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BuilderFirms;
