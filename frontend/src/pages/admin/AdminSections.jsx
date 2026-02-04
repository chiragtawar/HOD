import React, { useState, useEffect } from 'react';
import { GripVertical, Eye, EyeOff, Save, ChevronUp, ChevronDown, Edit3, X } from 'lucide-react';
import { authFetch } from '../../utils/auth';

const AdminSections = () => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Content Editing State
    const [editingSection, setEditingSection] = useState(null);
    const [contentForm, setContentForm] = useState({});

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = () => {
        setLoading(true);
        authFetch('/api/admin/sections')
            .then(res => res.json())
            .then(data => {
                setSections(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const handleToggleVisibility = (id) => {
        const updatedSections = sections.map(s =>
            s.id === id ? { ...s, visible: !s.visible } : s
        );
        setSections(updatedSections);
    };

    const moveSection = (index, direction) => {
        const newSections = [...sections];
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        if (newIndex >= 0 && newIndex < newSections.length) {
            [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
            // Update display orders
            const reordered = newSections.map((s, idx) => ({ ...s, displayOrder: idx + 1 }));
            setSections(reordered);
        }
    };

    const handleSaveOrder = () => {
        setSaving(true);
        authFetch('/api/admin/sections/order', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sections)
        })
            .then(() => {
                setSaving(false);
                alert('Order saved successfully!');
            })
            .catch(err => {
                console.error(err);
                setSaving(false);
            });
    };

    const handleUpdateSection = (section) => {
        authFetch(`/api/admin/sections/${section.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(section)
        })
            .then(() => fetchSections())
            .catch(err => console.error(err));
    };

    // --- Content Editing Handlers ---

    const openEditModal = (section) => {
        setEditingSection(section);
        try {
            setContentForm(JSON.parse(section.contentJson || '{}'));
        } catch (e) {
            setContentForm({});
        }
    };

    const handleContentChange = (key, value) => {
        setContentForm(prev => ({ ...prev, [key]: value }));
    };

    const saveContent = (e) => {
        e.preventDefault();
        const updatedSection = {
            ...editingSection,
            contentJson: JSON.stringify(contentForm)
        };

        authFetch(`/api/admin/sections/${editingSection.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedSection)
        })
            .then(() => {
                setEditingSection(null);
                fetchSections();
            })
            .catch(err => console.error(err));
    };

    if (loading) return <div className="p-8">Loading layout...</div>;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Homepage Layout</h2>
                    <p className="text-sm text-slate-500">Enable/Disable sections or drag to reorder</p>
                </div>
                <button
                    onClick={handleSaveOrder}
                    disabled={saving}
                    className="bg-slate-900 text-white px-6 py-2 font-bold flex items-center hover:bg-slate-800 transition disabled:opacity-50"
                >
                    <Save className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Save Order'}
                </button>
            </div>

            <div className="p-6">
                <div className="space-y-4">
                    {sections.map((section, index) => (
                        <div key={section.id} className="flex items-center bg-slate-50 border border-slate-200 p-4 rounded-lg group">
                            <div className="mr-4 text-slate-400 cursor-grab active:cursor-grabbing">
                                <GripVertical size={20} />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-slate-900">{section.title}</h3>
                                    <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-600 uppercase font-mono tracking-tighter">
                                        {section.sectionKey}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500">Component: {section.componentType}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => openEditModal(section)}
                                    className="text-slate-500 hover:text-blue-600 flex items-center gap-1 text-sm font-medium px-3 py-1 rounded hover:bg-white transition"
                                >
                                    <Edit3 size={16} /> Edit Content
                                </button>

                                <div className="flex flex-col">
                                    <button
                                        disabled={index === 0}
                                        onClick={() => moveSection(index, 'up')}
                                        className="text-slate-400 hover:text-primary disabled:opacity-30"
                                    >
                                        <ChevronUp size={20} />
                                    </button>
                                    <button
                                        disabled={index === sections.length - 1}
                                        onClick={() => moveSection(index, 'down')}
                                        className="text-slate-400 hover:text-primary disabled:opacity-30"
                                    >
                                        <ChevronDown size={20} />
                                    </button>
                                </div>

                                <button
                                    onClick={() => handleUpdateSection({ ...section, visible: !section.visible })}
                                    className={`p-2 rounded-full transition ${section.visible ? 'text-primary bg-white shadow-sm' : 'text-gray-400 bg-gray-100'}`}
                                >
                                    {section.visible ? <Eye size={20} /> : <EyeOff size={20} />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 italic text-xs text-slate-500">
                Note: "Latest Launches" visibility is controlled by the rail content. "Featured Properties" visibility is dynamic based on available data.
            </div>

            {/* Content Editing Modal */}
            {editingSection && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900">Edit {editingSection.title}</h3>
                            <button onClick={() => setEditingSection(null)} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={saveContent} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Section Title</label>
                                <input
                                    type="text"
                                    value={contentForm.title || ''}
                                    onChange={(e) => handleContentChange('title', e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Subtitle</label>
                                <textarea
                                    value={contentForm.subtitle || ''}
                                    onChange={(e) => handleContentChange('subtitle', e.target.value)}
                                    className="w-full border p-2 rounded h-24"
                                />
                            </div>
                            {editingSection.sectionKey === 'hero_section' && (
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Founder Names (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Chirag, Deepak & Shivam"
                                        value={contentForm.founderNames || ''}
                                        onChange={(e) => handleContentChange('founderNames', e.target.value)}
                                        className="w-full border p-2 rounded"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Appends "by [Names]" to the subtitle.</p>
                                </div>
                            )}
                            {editingSection.sectionKey === 'contact_cta' && (
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Button Text</label>
                                    <input
                                        type="text"
                                        value={contentForm.buttonText || ''}
                                        onChange={(e) => handleContentChange('buttonText', e.target.value)}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                            )}

                            <div className="pt-4 flex justify-end gap-2">
                                <button type="button" onClick={() => setEditingSection(null)} className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-slate-900 text-white font-bold rounded hover:bg-slate-800">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSections;
