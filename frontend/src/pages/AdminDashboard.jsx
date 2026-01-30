import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Users, Building, PlusCircle, Settings, LogOut, FileText, Megaphone, Info, Layout, Hash } from 'lucide-react';
import AdminLatestLaunches from './admin/AdminLatestLaunches';
import AdminPartners from './admin/AdminPartners';
import AdminCompanyInfo from './admin/AdminCompanyInfo';
import AdminSections from './admin/AdminSections';
import AdminCounters from './admin/AdminCounters';
import AdminProperties from './admin/AdminProperties';
import AdminSettings from './admin/AdminSettings';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('sections');

    const handleLogout = () => {
        localStorage.removeItem('auth');
        navigate('/admin/login');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'sections':
                return <AdminSections />;
            case 'properties':
                return <AdminProperties />;
            case 'counters':
                return <AdminCounters />;
            case 'launches':
                return <AdminLatestLaunches />;
            case 'partners':
                return <AdminPartners />;
            case 'company':
                return <AdminCompanyInfo />;
            case 'settings':
                return <AdminSettings />;
            default:
                return <div>Select a tab</div>;
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 text-white min-h-screen fixed">
                <div className="p-6 border-b border-slate-700">
                    <h1 className="text-xl font-bold font-serif text-accent">Admin Console</h1>
                </div>
                <nav className="mt-6 px-4 space-y-2 max-h-[calc(100vh-160px)] overflow-y-auto">
                    <button onClick={() => setActiveTab('sections')} className={`w-full flex items-center p-3 rounded transition ${activeTab === 'sections' ? 'bg-accent text-slate-900 font-bold' : 'text-gray-300 hover:bg-slate-800'}`}>
                        <Layout className="w-5 h-5 mr-3" /> Layout
                    </button>
                    <button onClick={() => setActiveTab('properties')} className={`w-full flex items-center p-3 rounded transition ${activeTab === 'properties' ? 'bg-accent text-slate-900 font-bold' : 'text-gray-300 hover:bg-slate-800'}`}>
                        <Building className="w-5 h-5 mr-3" /> Properties
                    </button>
                    <button onClick={() => setActiveTab('counters')} className={`w-full flex items-center p-3 rounded transition ${activeTab === 'counters' ? 'bg-accent text-slate-900 font-bold' : 'text-gray-300 hover:bg-slate-800'}`}>
                        <Hash className="w-5 h-5 mr-3" /> Counters
                    </button>
                    <button onClick={() => setActiveTab('launches')} className={`w-full flex items-center p-3 rounded transition ${activeTab === 'launches' ? 'bg-accent text-slate-900 font-bold' : 'text-gray-300 hover:bg-slate-800'}`}>
                        <Megaphone className="w-5 h-5 mr-3" /> Latest Launches
                    </button>
                    <button onClick={() => setActiveTab('partners')} className={`w-full flex items-center p-3 rounded transition ${activeTab === 'partners' ? 'bg-accent text-slate-900 font-bold' : 'text-gray-300 hover:bg-slate-800'}`}>
                        <Users className="w-5 h-5 mr-3" /> Partners
                    </button>
                    <button onClick={() => setActiveTab('company')} className={`w-full flex items-center p-3 rounded transition ${activeTab === 'company' ? 'bg-accent text-slate-900 font-bold' : 'text-gray-300 hover:bg-slate-800'}`}>
                        <Info className="w-5 h-5 mr-3" /> Company Info
                    </button>
                    <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center p-3 rounded transition ${activeTab === 'settings' ? 'bg-accent text-slate-900 font-bold' : 'text-gray-300 hover:bg-slate-800'}`}>
                        <Settings className="w-5 h-5 mr-3" /> Settings
                    </button>
                </nav>
                <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
                    <button onClick={handleLogout} className="w-full flex items-center p-3 text-red-400 hover:bg-slate-800 rounded transition">
                        <LogOut className="w-5 h-5 mr-3" /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-64 flex-1 p-8">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;
