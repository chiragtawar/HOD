import React from 'react';
import { MapPin, Bed, Bath, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
    return (
        <div className="bg-white group rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={property.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur text-primary px-3 py-1 rounded-sm font-bold text-sm shadow-sm">
                    ₹ {parseInt(property.price).toLocaleString('en-IN')}
                </div>

                {property.category && (
                    <div className="absolute top-4 left-4 bg-accent text-slate-900 px-3 py-1 rounded-sm font-bold text-xs uppercase tracking-wider shadow-sm">
                        {property.category}
                    </div>
                )}
            </div>

            <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center text-accent text-xs font-semibold mb-2 uppercase tracking-wide">
                    <MapPin className="h-3 w-3 mr-1" />
                    {property.location}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif line-clamp-1 group-hover:text-primary transition-colors">
                    <Link to={`/property/${property.id}`}>
                        {property.title}
                    </Link>
                </h3>

                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3 mb-4 mt-auto">
                    {property.bedrooms > 0 && (
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-500">Beds</span>
                            <span className="font-bold text-gray-800 flex items-center"><Bed className="h-3 w-3 mr-1" />{property.bedrooms}</span>
                        </div>
                    )}
                    {property.bathrooms > 0 && (
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-500">Baths</span>
                            <span className="font-bold text-gray-800 flex items-center"><Bath className="h-3 w-3 mr-1" />{property.bathrooms}</span>
                        </div>
                    )}
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500">Sq.Ft</span>
                        <span className="font-bold text-gray-800 flex items-center"><Layout className="h-3 w-3 mr-1" />{property.areaSqFt}</span>
                    </div>
                </div>

                <Link
                    to={`/property/${property.id}`}
                    className="w-full block text-center border border-primary text-primary font-bold py-2 rounded hover:bg-primary hover:text-white transition uppercase text-sm"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default PropertyCard;
