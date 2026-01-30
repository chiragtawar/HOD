import React, { useState, useEffect } from 'react';
import { Users, Target, ShieldCheck } from 'lucide-react';

const About = () => {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        fetch('/api/public/company-info')
            .then(res => res.json())
            .then(data => setInfo(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-primary text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">About House of Dreams Realty</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        We are a team of passionate real estate professionals dedicated to finding your perfect space in Faridabad and the NCR region.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                            alt="Meeting"
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Mission</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            At House of Dreams Realty, we believe that buying a property is more than just a transaction; make it a life-changing experience. Our goal is to bring transparency, trust, and professionalism to the real estate market.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            {info ? info.founderBio : 'Loading bio...'}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                            <div className="flex items-start">
                                <Target className="h-6 w-6 text-accent mr-3 mt-1" />
                                <div>
                                    <h4 className="font-bold text-slate-900">Client Centric</h4>
                                    <p className="text-sm text-gray-500">Your needs are our top priority.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <h4 className="font-bold text-slate-900">100% Transparent</h4>
                                <p className="text-sm text-gray-500">No hidden costs, clear paperwork.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership / Founders */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-serif font-bold text-primary mb-12">Our Leadership</h2>

                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
                        <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
                            {info && info.founderImageUrl ? (
                                <img src={info.founderImageUrl} alt="Founder" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400 text-4xl font-bold bg-slate-100">
                                    {(info && info.founderName) ? info.founderName[0] : 'F'}
                                </div>
                            )}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{info ? info.founderName : 'Loading...'}</h3>
                        <p className="text-accent font-medium mb-4">Founder & Visionary</p>
                        <p className="text-gray-500">
                            {info ? info.founderBio : 'Dedication to excellence in every transaction.'}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
