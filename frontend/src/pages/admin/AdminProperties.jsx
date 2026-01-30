import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, Megaphone } from 'lucide-react';
import { authFetch } from '../../utils/auth';

const AdminProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProperty, setEditingProperty] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        type: '',
        category: 'New',
        builder: '',
        bedrooms: '',
        bathrooms: '',
        areaSqFt: '',
        imageUrl: '',
        isFeatured: false,
        isVisible: true,
        isLatestLaunch: false
    });

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = () => {
        setLoading(true);
        authFetch('/api/admin/properties')
            .then(res => res.json())
            .then(data => {
                setProperties(data);
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
        const url = editingProperty ? `/api/admin/properties/${editingProperty.id}` : '/api/admin/properties';
        const method = editingProperty ? 'PUT' : 'POST';

        authFetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(() => {
                fetchProperties();
                setShowModal(false);
                setEditingProperty(null);
                setFormData({
                    title: '',
                    description: '',
                    price: '',
                    location: '',
                    type: '',
                    category: 'New',
                    builder: '',
                    bedrooms: '',
                    bathrooms: '',
                    areaSqFt: '',
                    imageUrl: '',
                    isFeatured: false,
                    isVisible: true,
                    isLatestLaunch: false
                });
            })
            .catch(err => console.error(err));
    };

    const handleEdit = (property) => {
        setEditingProperty(property);
        setFormData({ ...property });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            authFetch(`/api/admin/properties/${id}`, { method: 'DELETE' })
                .then(() => fetchProperties())
                .catch(err => console.error(err));
        }
    };

    const toggleStatus = (property, field) => {
        const updated = { ...property, [field]: !property[field] };
        authFetch(`/api/admin/properties/${property.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
        })
            .then(() => fetchProperties())
            .catch(err => console.error(err));
    };

    if (loading) return <div className="p-8">Loading properties...</div>;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">Manage Properties</h2>
                <button
                    onClick={() => { setEditingProperty(null); setShowModal(true); }}
                    className="bg-accent text-slate-900 px-4 py-2 font-bold flex items-center hover:bg-yellow-500 transition"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Property
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 font-medium">Property</th>
                            <th className="px-6 py-4 font-medium">Location & Type</th>
                            <th className="px-6 py-4 font-medium">Price</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {properties.map((property) => (
                            <tr key={property.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <img src={property.imageUrl} alt={property.title} className="w-12 h-12 object-cover rounded mr-3" />
                                        <div>
                                            <div className="font-bold text-slate-900">{property.title}</div>
                                            <div className="text-xs text-slate-500">{property.category} | {property.builder || 'N/A'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-slate-900">{property.location}</div>
                                    <div className="text-xs text-slate-500">{property.type}</div>
                                </td>
                                <td className="px-6 py-4 font-bold text-slate-900">
                                    ₹{property.price.toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => toggleStatus(property, 'isVisible')}
                                            className={`p-1 rounded ${property.isVisible ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-50'}`}
                                            title={property.isVisible ? 'Visible' : 'Hidden'}
                                        >
                                            {property.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                                        </button>
                                        <button
                                            onClick={() => toggleStatus(property, 'isFeatured')}
                                            className={`p-1 rounded ${property.isFeatured ? 'text-accent bg-yellow-50' : 'text-gray-400 bg-gray-50'}`}
                                            title={property.isFeatured ? 'Featured' : 'Not Featured'}
                                        >
                                            <Star size={18} fill={property.isFeatured ? 'currentColor' : 'none'} />
                                        </button>
                                        <button
                                            onClick={() => toggleStatus(property, 'isLatestLaunch')}
                                            className={`p-1 rounded ${property.isLatestLaunch ? 'text-blue-600 bg-blue-50' : 'text-gray-400 bg-gray-50'}`}
                                            title={property.isLatestLaunch ? 'Latest Launch' : 'Standard'}
                                        >
                                            <Megaphone size={18} />
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button onClick={() => handleEdit(property)} className="text-slate-600 hover:text-primary"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(property.id)} className="text-slate-600 hover:text-red-500"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white">
                            <h3 className="text-xl font-bold text-slate-900">{editingProperty ? 'Edit Property' : 'Add New Property'}</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Title</label>
                                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                                        <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded h-32" required></textarea>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Price (₹)</label>
                                            <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Type</label>
                                            <select name="type" value={formData.type} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded" required>
                                                <option value="">Select Type</option>
                                                <option value="Apartment">Apartment</option>
                                                <option value="Villa">Villa</option>
                                                <option value="Plot">Plot</option>
                                                <option value="Shop">Shop</option>
                                                <option value="Floor">Floor</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                                        <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded" required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                                            <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded">
                                                <option value="New">New</option>
                                                <option value="Resale">Resale</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Builder</label>
                                            <input type="text" name="builder" value={formData.builder} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded" disabled={formData.category === 'Resale'} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Beds</label>
                                            <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Baths</label>
                                            <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Area (sqft)</label>
                                            <input type="number" name="areaSqFt" value={formData.areaSqFt} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Image URL</label>
                                        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded" required />
                                    </div>
                                    <div className="flex flex-wrap gap-4 pt-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" name="isVisible" checked={formData.isVisible} onChange={handleInputChange} className="w-4 h-4 text-accent" />
                                            <span className="text-sm font-bold text-slate-700">Visible</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="w-4 h-4 text-accent" />
                                            <span className="text-sm font-bold text-slate-700">Featured</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" name="isLatestLaunch" checked={formData.isLatestLaunch} onChange={handleInputChange} className="w-4 h-4 text-accent" />
                                            <span className="text-sm font-bold text-slate-700">Latest Launch</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end gap-3">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 border border-slate-300 text-slate-600 hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-slate-900 text-white font-bold hover:bg-slate-800 transition">Save Property</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProperties;
