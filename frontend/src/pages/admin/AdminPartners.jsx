import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { authFetch } from '../../utils/auth';

const AdminPartners = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPartner, setEditingPartner] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        logoUrl: '',
        websiteUrl: '',
        visible: true
    });

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = () => {
        setLoading(true);
        authFetch('/api/admin/partners')
            .then(res => res.json())
            .then(data => {
                setPartners(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editingPartner ? `/api/admin/partners/${editingPartner.id}` : '/api/admin/partners';
        const method = editingPartner ? 'PUT' : 'POST';

        authFetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(() => {
                fetchPartners();
                setShowModal(false);
                setEditingPartner(null);
            })
            .catch(err => console.error(err));
    };

    const handleEdit = (partner) => {
        setEditingPartner(partner);
        setFormData({ ...partner });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this partner?')) {
            authFetch(`/api/admin/partners/${id}`, { method: 'DELETE' })
                .then(() => fetchPartners())
                .catch(err => console.error(err));
        }
    };

    if (loading) return <div className="p-8">Loading partners...</div>;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">Trusted Partners</h2>
                <button
                    onClick={() => { setEditingPartner(null); setFormData({ name: '', logoUrl: '', websiteUrl: '', visible: true }); setShowModal(true); }}
                    className="bg-accent text-slate-900 px-4 py-2 font-bold flex items-center hover:bg-yellow-500 transition"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Partner
                </button>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {partners.map((partner) => (
                        <div key={partner.id} className="relative group bg-slate-50 border border-slate-200 p-4 rounded-lg flex flex-col items-center">
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                <button onClick={() => handleEdit(partner)} className="bg-white p-1.5 rounded shadow-sm text-slate-600 hover:text-primary"><Edit size={16} /></button>
                                <button onClick={() => handleDelete(partner.id)} className="bg-white p-1.5 rounded shadow-sm text-slate-600 hover:text-red-500"><Trash2 size={16} /></button>
                            </div>

                            <div className="h-24 flex items-center justify-center bg-white p-4 rounded w-full mb-4">
                                <img src={partner.logoUrl} alt={partner.name} className="max-h-full max-w-full object-contain" />
                            </div>

                            <h3 className="font-bold text-slate-900 text-center mb-1">{partner.name}</h3>

                            <div className="flex items-center gap-2 mt-auto">
                                <span className={`flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded ${partner.visible ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                                    {partner.visible ? <Eye size={10} /> : <EyeOff size={10} />}
                                    {partner.visible ? 'Visible' : 'Hidden'}
                                </span>
                                {partner.websiteUrl && partner.websiteUrl !== '#' && (
                                    <a href={partner.websiteUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary">
                                        <ExternalLink size={14} />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900">{editingPartner ? 'Edit Partner' : 'Add New Partner'}</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Partner Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Logo URL</label>
                                    <input type="text" name="logoUrl" value={formData.logoUrl} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Website URL</label>
                                    <input type="text" name="websiteUrl" value={formData.websiteUrl} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded" />
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <input type="checkbox" id="v-check" name="visible" checked={formData.visible} onChange={handleInputChange} className="w-4 h-4 text-accent" />
                                    <label htmlFor="v-check" className="text-sm font-bold text-slate-700 cursor-pointer">Visible on Website</label>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end gap-3">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 border border-slate-300 text-slate-600 hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-slate-900 text-white font-bold hover:bg-slate-800 transition">Save Partner</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPartners;
