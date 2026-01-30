import React, { useState, useEffect } from 'react';
import config from '../config';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        fetch(`${config.API_BASE_URL}/api/public/company-info`)
            .then(res => res.json())
            .then(data => setInfo(data))
            .catch(err => console.error(err));
    }, []);

    if (!info) return <div className="p-20 text-center">Loading contact info...</div>;

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-primary text-white py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-serif font-bold">Contact Us</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Get In Touch</h2>
                    <p className="text-gray-600 mb-8">
                        Ready to find your dream property? Visit our office or contact us via phone/email. We are available 7 days a week.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="bg-accent/10 p-3 rounded-full mr-4">
                                <MapPin className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Office Address</h3>
                                <p className="text-gray-600">{info.address || 'Loading...'}</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-accent/10 p-3 rounded-full mr-4">
                                <Phone className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Phone</h3>
                                <p className="text-gray-600">{info.phone || 'Loading...'}</p>
                                <p className="text-gray-500 text-sm">Mon-Sun 10am - 8pm</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-accent/10 p-3 rounded-full mr-4">
                                <Mail className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Email</h3>
                                <p className="text-gray-600">{info.email || 'Loading...'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Google Map Integration */}
                    {info.googleMapUrl ? (
                        info.googleMapUrl.includes('embed') ? (
                            <div className="mt-8 h-64 rounded-xl w-full overflow-hidden shadow-sm border border-gray-200">
                                <iframe
                                    src={info.googleMapUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        ) : (
                            <div className="mt-8 h-64 rounded-xl w-full overflow-hidden shadow-sm border border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                                <MapPin className="h-10 w-10 text-accent mb-3" />
                                <p className="text-slate-600 font-medium mb-4">View our location on Google Maps</p>
                                <a
                                    href={info.googleMapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-slate-800 transition"
                                >
                                    Open Maps
                                </a>
                            </div>
                        )
                    ) : (
                        <div className="mt-8 bg-gray-100 h-64 rounded-xl w-full flex items-center justify-center text-gray-400 text-sm">
                            Map location not configured
                        </div>
                    )}
                </div>

                {/* Enquiry Form */}
                <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input type="text" className="w-full rounded-md border-gray-300 border p-3 focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input type="text" className="w-full rounded-md border-gray-300 border p-3 focus:ring-primary focus:border-primary" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" className="w-full rounded-md border-gray-300 border p-3 focus:ring-primary focus:border-primary" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input type="tel" className="w-full rounded-md border-gray-300 border p-3 focus:ring-primary focus:border-primary" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">I am interested in</label>
                            <select className="w-full rounded-md border-gray-300 border p-3 focus:ring-primary focus:border-primary">
                                <option>Buying Property</option>
                                <option>Selling Property</option>
                                <option>Investment Advice</option>
                                <option>General Enquiry</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea rows="4" className="w-full rounded-md border-gray-300 border p-3 focus:ring-primary focus:border-primary"></textarea>
                        </div>

                        <button className="w-full bg-accent text-slate-900 font-bold py-4 rounded-md hover:bg-yellow-500 transition shadow-lg">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
