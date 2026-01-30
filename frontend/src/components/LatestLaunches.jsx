import React, { useState, useEffect } from 'react';
import { Megaphone } from 'lucide-react';

const LatestLaunches = () => {
    const [launches, setLaunches] = useState([]);

    useEffect(() => {
        fetch('/api/latest-launches')
            .then(res => res.json())
            .then(data => setLaunches(data))
            .catch(err => console.error(err));
    }, []);

    if (launches.length === 0) return null;

    return (
        <div className="bg-slate-900 text-white py-3 overflow-hidden">
            <div className="flex items-center animate-marquee whitespace-nowrap">
                <span className="mx-4 flex items-center text-accent font-bold">
                    <Megaphone className="h-5 w-5 mr-2" /> LATEST LAUNCHES:
                </span>
                {launches.map((launch, index) => (
                    <React.Fragment key={launch.id}>
                        <span className="mx-8 text-lg font-light">
                            {launch.message}
                        </span>
                        <span className="mx-4 text-gray-500">|</span>
                    </React.Fragment>
                ))}
                {/* Duplicate for infinite scroll effect */}
                {launches.map((launch, index) => (
                    <React.Fragment key={`dup-${launch.id}`}>
                        <span className="mx-8 text-lg font-light">
                            {launch.message}
                        </span>
                        <span className="mx-4 text-gray-500">|</span>
                    </React.Fragment>
                ))}
            </div>
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default LatestLaunches;
