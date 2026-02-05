import React, { useEffect, useState } from 'react';
import config from '../config';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Layout, ArrowLeft, CheckCircle, Phone } from 'lucide-react';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${config.API_BASE_URL}/api/properties/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Not found');
                return res.json();
            })
            .then(data => {
                setProperty(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
    if (!property) return <div className="min-h-screen flex items-center justify-center">Property not found</div>;

    const handleContactSubmit = (e) => {
        e.preventDefault();
        // Here you would handle generic "Contact Us" submission
        alert("Thank you! Our team will contact you shortly.");
    };

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header / Gallery */}
            <div className="relative h-[400px] md:h-[500px] w-full bg-slate-100">
                <img
                    src={property.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 p-6">
                    <Link to="/properties" className="inline-flex items-center text-white bg-black/50 hover:bg-black/70 px-4 py-2 rounded-full transition backdrop-blur-sm">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{property.title}</h1>
                        <div className="flex items-center text-gray-500 font-medium">
                            <MapPin className="h-5 w-5 mr-1 text-accent" />
                            {property.location}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-slate-900">
                            ₹ {parseInt(property.price).toLocaleString('en-IN')}
                        </div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold mt-1">
                            {property.category || 'Property'}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Key Features */}
                        <div className="bg-slate-50 rounded-xl p-8 border border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 border-b pb-4">Property Overview</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div className="flex items-center">
                                    <div className="bg-white p-3 rounded shadow-sm mr-4 text-primary"><Bed size={24} /></div>
                                    <div>
                                        <p className="text-sm text-gray-500">Bedrooms</p>
                                        <p className="font-bold text-slate-800">{property.bedrooms || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-white p-3 rounded shadow-sm mr-4 text-primary"><Bath size={24} /></div>
                                    <div>
                                        <p className="text-sm text-gray-500">Bathrooms</p>
                                        <p className="font-bold text-slate-800">{property.bathrooms || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-white p-3 rounded shadow-sm mr-4 text-primary"><Layout size={24} /></div>
                                    <div>
                                        <p className="text-sm text-gray-500">Area</p>
                                        <p className="font-bold text-slate-800">{property.areaSqFt} sq ft</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Description</h2>
                            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                                {property.description}
                            </p>
                        </div>

                        {/* Amenities */}
                        {property.amenities && (
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 mb-6">Amenities</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {property.amenities.split(',').map((amenity, index) => (
                                        <div key={index} className="flex items-center text-gray-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <div className="h-2 w-2 rounded-full bg-accent mr-3"></div>
                                            <span className="font-medium">{amenity.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Contact */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 bg-white border border-gray-200 rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Interested?</h3>
                            <p className="text-gray-500 mb-6 text-sm">Contact us directly to know more about this property.</p>

                            <form onSubmit={handleContactSubmit} className="space-y-4">
                                <input type="text" placeholder="Your Name" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary outline-none" required />
                                <input type="tel" placeholder="Phone Number" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary outline-none" required />
                                <input type="email" placeholder="Email Address" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary outline-none" />
                                <textarea rows="3" placeholder="I am interested in..." className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary outline-none"></textarea>

                                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-lg transition shadow-md text-lg">
                                    Contact Us Now
                                </button>
                            </form>

                            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                                <p className="text-xs text-gray-400 mb-2">Direct Line</p>
                                <a href={`tel:${config.CONTACT_PHONE || '+919876543210'}`} className="text-xl font-bold text-slate-800 hover:text-red-600 transition flex items-center justify-center gap-2">
                                    <Phone size={20} /> +91 {config.CONTACT_PHONE || '98765 43210'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
