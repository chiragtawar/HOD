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

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <Link to="/properties" className="inline-flex items-center text-primary hover:text-accent mb-6 font-medium transition">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Listings
                </Link>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="relative h-[400px] md:h-[500px]">
                        <img
                            src={property.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"}
                            alt={property.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 m-6 flex gap-2">
                            {property.category && (
                                <span className="bg-accent text-slate-900 px-4 py-1.5 rounded-full font-bold shadow-md">
                                    {property.category}
                                </span>
                            )}
                            <span className="bg-slate-900 text-white px-6 py-2 rounded-full font-bold shadow-md text-lg">
                                ₹ {parseInt(property.price).toLocaleString('en-IN')}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 md:p-12">

                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <div className="flex items-center text-accent font-semibold mb-2">
                                    <MapPin className="h-5 w-5 mr-1" />
                                    {property.location}
                                </div>
                                <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">{property.title}</h1>

                                <div className="flex flex-wrap gap-6 text-gray-500 py-4 border-y border-gray-100">
                                    {property.bedrooms > 0 && (
                                        <div className="flex items-center text-lg">
                                            <Bed className="h-6 w-6 mr-2 text-primary" />
                                            <span className="font-bold text-gray-800 mr-1">{property.bedrooms}</span> Bed
                                        </div>
                                    )}
                                    {property.bathrooms > 0 && (
                                        <div className="flex items-center text-lg">
                                            <Bath className="h-6 w-6 mr-2 text-primary" />
                                            <span className="font-bold text-gray-800 mr-1">{property.bathrooms}</span> Bath
                                        </div>
                                    )}
                                    <div className="flex items-center text-lg">
                                        <Layout className="h-6 w-6 mr-2 text-primary" />
                                        <span className="font-bold text-gray-800 mr-1">{property.areaSqFt}</span> Sq.Ft
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-slate-900 mb-4">Description</h2>
                                <p className="text-gray-600 leading-relaxed text-lg">{property.description}</p>
                            </div>

                            {property.builder && (
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 mb-4">Builder</h2>
                                    <div className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                        <span className="text-lg text-gray-700">{property.builder}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-1">
                            <div className="bg-slate-50 p-6 rounded-xl border border-gray-100 sticky top-28">
                                <h3 className="text-xl font-bold text-slate-900 mb-6">Interested in this property?</h3>

                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input type="text" className="w-full rounded-md border-gray-300 shadow-sm border p-3 focus:ring-primary focus:border-primary" placeholder="Your Name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input type="tel" className="w-full rounded-md border-gray-300 shadow-sm border p-3 focus:ring-primary focus:border-primary" placeholder="+91 XXXXX XXXXX" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                        <textarea rows="3" className="w-full rounded-md border-gray-300 shadow-sm border p-3 focus:ring-primary focus:border-primary" placeholder="I am interested in this property..."></textarea>
                                    </div>
                                    <button type="button" className="w-full bg-primary text-white font-bold py-3 rounded-md hover:bg-slate-800 transition">
                                        Request Callback
                                    </button>
                                </form>

                                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                                    <p className="text-sm text-gray-500 mb-2">Or call us directly</p>
                                    <a href="tel:+919876543210" className="flex items-center justify-center text-lg font-bold text-primary hover:text-accent transition">
                                        <Phone className="h-5 w-5 mr-2" /> +91 98765 43210
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
