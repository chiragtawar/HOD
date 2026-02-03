import React from 'react';
import { Calculator } from 'lucide-react';

const RentalYieldEstimator = ({ title, content }) => {
    const { description } = JSON.parse(content || '{}');

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 md:p-16 shadow-sm">
                    <div className="flex justify-center mb-6">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <Calculator className="h-10 w-10 text-primary" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-primary mb-4">{title || 'Rental Yield Estimator'}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        {description || 'Calculate potential rental returns on your investment. (Coming Soon)'}
                    </p>
                    <div className="inline-block bg-accent px-6 py-2 rounded-full font-bold text-slate-900 text-sm tracking-wide uppercase">
                        Coming Soon
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RentalYieldEstimator;
