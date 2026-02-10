import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, IndianRupee, ChevronDown } from 'lucide-react';

const SearchBar = () => {
    const navigate = useNavigate();
    const [city, setCity] = useState('Noida'); // Default to Noida as per requirement
    const [type, setType] = useState('');
    const [budget, setBudget] = useState('');

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (city) params.append('city', city);
        if (type) params.append('type', type);
        // Budget logic would need parsing in real app, passing raw for now
        if (budget) params.append('budget', budget);

        navigate(`/properties?${params.toString()}`);
    };

    return (
        <div className="max-w-4xl mx-auto w-full relative z-30 -mt-8">
            {/* Top Tabs */}
            <div className="flex space-x-2 mb-2 px-4">
                <button className="bg-white text-primary font-bold px-6 py-2 rounded-t-lg shadow-sm text-sm uppercase tracking-wide">Buy</button>
                <button className="bg-white/80 text-gray-600 font-semibold px-6 py-2 rounded-t-lg hover:bg-white text-sm uppercase tracking-wide">Rent</button>
                <button className="bg-white/80 text-gray-600 font-semibold px-6 py-2 rounded-t-lg hover:bg-white text-sm uppercase tracking-wide">New Projects</button>
            </div>

            {/* Search Capsule */}
            <div className="bg-white rounded-full shadow-2xl p-2 flex items-center h-20 border border-gray-100">

                {/* Location */}
                <div className="flex-1 px-6 border-r border-gray-200 h-full flex items-center relative group">
                    <MapPin className="text-accent w-5 h-5 mr-3 shrink-0" />
                    <div className="w-full">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Location</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full outline-none font-semibold text-slate-800 placeholder-gray-300"
                            placeholder="Enter City"
                        />
                    </div>
                </div>

                {/* Property Type */}
                <div className="flex-1 px-6 border-r border-gray-200 h-full flex items-center relative group">
                    <Home className="text-red-500 w-5 h-5 mr-3 shrink-0" />
                    <div className="w-full relative">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Property Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full outline-none font-semibold text-slate-800 bg-transparent appearance-none cursor-pointer py-1"
                        >
                            <option value="">All Residential</option>
                            <option value="Flat">Flat / Apartment</option>
                            <option value="Villa">Villa / House</option>
                            <option value="Plot">Plot</option>
                            <option value="Commercial">Commercial</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>

                {/* Budget */}
                <div className="flex-1 px-6 h-full flex items-center relative group">
                    <IndianRupee className="text-green-600 w-5 h-5 mr-3 shrink-0" />
                    <div className="w-full relative">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Budget</label>
                        <select
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="w-full outline-none font-semibold text-slate-800 bg-transparent appearance-none cursor-pointer py-1"
                        >
                            <option value="">Max Price</option>
                            <option value="5000000">₹ 50 Lac</option>
                            <option value="10000000">₹ 1 Cr</option>
                            <option value="20000000">₹ 2 Cr</option>
                            <option value="50000000">₹ 5 Cr+</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>

                {/* Search Button */}
                <button
                    onClick={handleSearch}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-full h-14 px-8 flex items-center font-bold text-lg transition shadow-lg shrink-0 mr-1"
                >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                </button>

            </div>
        </div>
    );
};

export default SearchBar;
