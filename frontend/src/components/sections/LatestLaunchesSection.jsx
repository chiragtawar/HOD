import React from 'react';
import { Megaphone } from 'lucide-react';

const LatestLaunchesSection = ({ latestLaunches }) => {
    if (!latestLaunches || latestLaunches.length === 0) return null;

    return (
        <div className="bg-primary py-3 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 flex items-center">
                <div className="flex items-center gap-2 bg-accent px-3 py-1 text-slate-900 font-bold text-sm uppercase tracking-tighter shrink-0 mr-4">
                    <Megaphone size={16} />
                    <span>Latest Launches</span>
                </div>
                <div className="relative flex-1 overflow-hidden h-6">
                    <div className="absolute whitespace-nowrap animate-marquee flex items-center gap-12">
                        {latestLaunches.map((item, index) => (
                            <span key={item.id} className="text-white font-medium">
                                {item.message}
                            </span>
                        ))}
                        {/* Duplicate for seamless loop */}
                        {latestLaunches.map((item, index) => (
                            <span key={`dup-${item.id}`} className="text-white font-medium">
                                {item.message}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestLaunchesSection;
