import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { Filter } from 'lucide-react';

const Listings = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();

    // Filters
    const [filterType, setFilterType] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterPriceMax, setFilterPriceMax] = useState('');

    useEffect(() => {
        // Initial fetch
        fetch('/api/properties')
            .then(res => res.json())
            .then(data => {
                setProperties(data);
                setFilteredProperties(data);
                setLoading(false);

                // Apply URL params if present
                const typeParam = searchParams.get('type');
                if (typeParam) {
                    setFilterType(typeParam === 'Commercial' || typeParam === 'Residential' ? '' : typeParam);
                    // Logic improvement needed for Residential/Commercial types if data doesn't match exactly.
                    // For now, if "New" or "Resale" passed as type, we might want to map it to category.
                    if (typeParam === 'New' || typeParam === 'Resale') {
                        setFilterCategory(typeParam);
                    } else if (typeParam !== 'Commercial' && typeParam !== 'Residential') {
                        setFilterType(typeParam);
                    }
                }
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [searchParams]);

    useEffect(() => {
        let result = properties;

        if (filterType) {
            result = result.filter(p => p.type.toLowerCase() === filterType.toLowerCase());
        }
        if (filterCategory) {
            result = result.filter(p => p.category && p.category.toLowerCase() === filterCategory.toLowerCase());
        }
        if (filterPriceMax) {
            result = result.filter(p => p.price <= parseInt(filterPriceMax));
        }

        setFilteredProperties(result);
    }, [filterType, filterCategory, filterPriceMax, properties]);

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">

                {/* Sidebar Filters */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                        <div className="flex items-center mb-6">
                            <Filter className="h-5 w-5 text-primary mr-2" />
                            <h2 className="font-bold text-lg text-primary">Filters</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 p-2 border"
                                >
                                    <option value="">All Categories</option>
                                    <option value="New">New Projects</option>
                                    <option value="Resale">Resale</option>
                                </select>
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 p-2 border"
                                >
                                    <option value="">All Types</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Plot">Plot</option>
                                    <option value="Shop">Shop</option>
                                </select>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Max Budget (₹)</label>
                                <input
                                    type="range"
                                    min="5000000"
                                    max="100000000"
                                    step="500000"
                                    value={filterPriceMax || 100000000}
                                    onChange={(e) => setFilterPriceMax(e.target.value)}
                                    className="w-full text-accent"
                                />
                                <div className="text-right text-xs text-gray-500 mt-1">
                                    Up to ₹ {parseInt(filterPriceMax || 100000000).toLocaleString('en-IN')}
                                </div>
                            </div>

                            <button
                                onClick={() => { setFilterCategory(''); setFilterType(''); setFilterPriceMax(''); }}
                                className="text-sm text-red-600 font-medium hover:underline"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="flex-grow">
                    <h1 className="text-2xl font-serif font-bold text-primary mb-6">
                        {filterCategory || 'All'} Properties
                        {filterType && <span className="text-gray-500 font-sans font-normal text-lg ml-2">({filterType})</span>}
                    </h1>

                    {loading ? (
                        <div className="text-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div></div>
                    ) : filteredProperties.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                            <p className="text-gray-500">No properties match your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProperties.map(property => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Listings;
