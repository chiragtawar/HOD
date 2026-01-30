import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Save } from 'lucide-react';
import { authFetch } from '../../utils/auth';

const AdminCounters = () => {
    const [counters, setCounters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCounter, setEditingCounter] = useState(null);
    const [formData, setFormData] = useState({
        label: '',
        countValue: '',
        displayOrder: 1,
        visible: true
    });

    useEffect(() => {
        fetchCounters();
    }, []);

    const fetchCounters = () => {
        setLoading(true);
        authFetch('/api/admin/counters')
            .then(res => res.json())
            .then(data => {
                setCounters(data);
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
        const url = editingCounter ? `/api/admin/counters/${editingCounter.id}` : '/api/admin/counters';
        const method = editingCounter ? 'PUT' : 'POST';

        authFetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(() => {
                fetchCounters();
                setShowModal(false);
                setEditingCounter(null);
            })
            .catch(err => console.error(err));
    };

    const handleEdit = (counter) => {
        setEditingCounter(counter);
        setFormData({ ...counter });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this counter?')) {
            authFetch(`/api/admin/counters/${id}`, { method: 'DELETE' })
                .then(() => fetchCounters())
                .catch(err => console.error(err));
        }
    };

    if (loading) return <div className="p-8">Loading counters...</div>;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">Homepage Counters</h2>
                <button
                    onClick={() => { setEditingCounter(null); setFormData({ label: '', countValue: '', displayOrder: counters.length + 1, visible: true }); setShowModal(true); }}
                    className="bg-accent text-slate-900 px-4 py-2 font-bold flex items-center hover:bg-yellow-500 transition"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Counter
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 font-medium">Order</th>
                            <th className="px-6 py-4 font-medium">Label</th>
                            <th className="px-6 py-4 font-medium">Value</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {counters.map((counter) => (
                            <tr key={counter.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">{counter.displayOrder}</td>
                                <td className="px-6 py-4 font-bold text-slate-900">{counter.label}</td>
                                <td className="px-6 py-4 text-primary font-bold">{counter.countValue}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${counter.visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                        {counter.visible ? 'Visible' : 'Hidden'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button onClick={() => handleEdit(counter)} className="text-slate-600 hover:text-primary"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(counter.id)} className="text-slate-600 hover:text-red-500"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900">{editingCounter ? 'Edit Counter' : 'Add New Counter'}</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Label (e.g., Happy Families)</label>
                                    <input type="text" name="label" value={formData.label} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Value (e.g., 500+)</label>
                                    <input type="text" name="countValue" value={formData.countValue} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Display Order</label>
                                        <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded" required />
                                    </div>
                                    <div className="flex items-end pb-3">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" name="visible" checked={formData.visible} onChange={handleInputChange} className="w-4 h-4 text-accent" />
                                            <span className="text-sm font-bold text-slate-700">Visible</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end gap-3">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 border border-slate-300 text-slate-600 hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-slate-900 text-white font-bold hover:bg-slate-800 transition">Save Counter</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCounters;
