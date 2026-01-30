import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PropertyCard from '../PropertyCard';

const FeaturedProperties = ({ title, content, properties }) => {
    const { subtitle } = JSON.parse(content || '{}');
    const featuredList = properties ? properties.filter(p => p.featured) : [];

    return (
        <section className="py-20 bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-primary mb-2">{title || 'Featured Properties'}</h2>
                        <p className="text-gray-600">{subtitle || 'Handpicked selections just for you.'}</p>
                    </div>
                    <Link to="/properties" className="text-primary font-bold hover:text-accent flex items-center transition">
                        View All <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredList.slice(0, 3).map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProperties;
