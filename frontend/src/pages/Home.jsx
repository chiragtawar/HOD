import React, { useEffect, useState } from 'react';
import HeroBanner from '../components/sections/HeroBanner';
import LatestLaunchesSection from '../components/sections/LatestLaunchesSection';
import CountersSection from '../components/sections/CountersSection';
import FeaturedProperties from '../components/sections/FeaturedProperties';
import PartnersSection from '../components/sections/PartnersSection';
import AboutFounder from '../components/sections/AboutFounder';
import CampaignCTA from '../components/sections/CampaignCTA';
import RentalYieldEstimator from '../components/sections/RentalYieldEstimator';

import config from '../config';

const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${config.API_BASE_URL}/api/public/homepage`)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!data) return null;

    const renderSection = (section) => {
        switch (section.componentType) {
            case 'HeroBanner':
                return <HeroBanner key={section.id} content={section.contentJson} />;
            case 'LatestLaunches':
                return <LatestLaunchesSection key={section.id} latestLaunches={data.latestLaunches} />;
            case 'WhyChooseUs':
                return <CountersSection key={section.id} title={section.title} counters={data.counters} />;
            case 'FeaturedProperties':
                return <FeaturedProperties key={section.id} title={section.title} content={section.contentJson} properties={data.properties} />;
            case 'PartnersRail':
                return <PartnersSection key={section.id} title={section.title} partners={data.partners} />;
            case 'AboutFounder':
                return <AboutFounder key={section.id} title={section.title} companyInfo={data.companyInfo} />;
            case 'CallToAction':
            case 'CampaignModule':
                return <CampaignCTA key={section.id} title={section.title} content={section.contentJson} />;
            case 'RentalYieldEstimator':
                return <RentalYieldEstimator key={section.id} title={section.title} content={section.contentJson} />;
            default:
                return null;
        }
    };

    return (
        <div>
            {data.sections.map(section => renderSection(section))}
        </div>
    );
};

export default Home;
