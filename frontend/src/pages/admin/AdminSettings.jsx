import React, { useState, useEffect } from 'react';
import { Save, Image, Command } from 'lucide-react';
import { authFetch } from '../../utils/auth';

const AdminSettings = () => {
    const [config, setConfig] = useState({
        siteName: '',
        logoUrl: '',
        menuItems: []
    });
    const [jsonInput, setJsonInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        authFetch('/api/admin/site-config')
            .then(res => res.json())
            .then(data => {
                if (data.headerJson) {
                    try {
                        const parsed = JSON.parse(data.headerJson);
                        setConfig(parsed);
                        setJsonInput(JSON.stringify(parsed, null, 2));
                    } catch (e) {
                        console.error('Failed to parse header JSON', e);
                    }
                }
                setLoading(false);
            });
    }, []);

    const handleSave = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            authFetch('/api/admin/site-config', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    headerJson: jsonInput,
                    // Preserve footerJson if we were fetching the full object, 
                    // but the API currently returns the SiteConfig object which has both.
                    // For simplicity, we are just updating the headerJson part here,
                    // but in a real app we should merge with existing footerJson.
                    // Assuming the backend handles partial updates or we re-fetch to merge.
                    // Based on Controller, it expects the full object.
                    // Let's re-fetch the full object first to be safe, or just send what we have if the backend supports it.
                    // The Controller uses save(), so we need to be careful not to wipe footerJson.
                    // TODO: A better way is to fetch the full object, update headerJson, and send it back.
                    // For now, let's assume we need to send the full object structure.
                })
            })
            // Wait, the controller expects a SiteConfig object which has headerJson string field.
            // We need to fetch the FULL SiteConfig object, not just headerJson.
        } catch (e) {
            setMessage('Invalid JSON format');
        }
    };

    // Correct Implementation
    const [fullConfig, setFullConfig] = useState(null);

    useEffect(() => {
        authFetch('/api/admin/site-config')
            .then(res => res.json())
            .then(data => {
                setFullConfig(data);
                if (data.headerJson) {
                    try {
                        const parsed = JSON.parse(data.headerJson);
                        setConfig(parsed);
                    } catch (e) { }
                }
                setLoading(false);
            });
    }, []);

    const updateConfig = (key, value) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    const saveSettings = () => {
        if (!fullConfig) return;

        const updatedHeaderJson = JSON.stringify(config);
        const payload = {
            ...fullConfig,
            headerJson: updatedHeaderJson
        };

        authFetch('/api/admin/site-config', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                setFullConfig(data);
                setMessage('Settings saved successfully!');
                setTimeout(() => setMessage(''), 3000);
            })
            .catch(err => {
                console.error(err);
                setMessage('Failed to save settings');
            });
    };

    if (loading) return <div className="p-8">Loading settings...</div>;

    const availableLogos = [
        'default',
        '/logos/hod-logo-dark.png',
        '/logos/hod-logo-dark-original.png',
        '/logos/logo-option-1.png',
        '/logos/logo-option-2.png'
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">Site Settings</h2>
                <p className="text-sm text-slate-500">Manage logo, site name, and global configuration</p>
            </div>

            <div className="p-6 space-y-8">
                {message && (
                    <div className="p-4 bg-green-50 text-green-700 font-bold border-l-4 border-green-500">
                        {message}
                    </div>
                )}

                <div className="space-y-4">
                    <h3 className="font-bold text-slate-900 border-b pb-2">Branding</h3>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Site Name</label>
                        <input
                            type="text"
                            value={config.siteName || ''}
                            onChange={(e) => updateConfig('siteName', e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Logo Selection</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {availableLogos.map((url) => {
                                const isDefault = url === 'default';
                                const isSelected = isDefault ? (!config.logoUrl) : (config.logoUrl === url);

                                return (
                                    <div
                                        key={url}
                                        onClick={() => updateConfig('logoUrl', isDefault ? '' : url)}
                                        className={`cursor-pointer border-2 p-4 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition ${isSelected ? 'border-primary bg-primary/5' : 'border-slate-200'}`}
                                    >
                                        <div className="h-12 flex items-center justify-center bg-gray-100 rounded w-full">
                                            {isDefault ? (
                                                <Command className="h-8 w-8 text-accent" />
                                            ) : (
                                                <img src={url} alt="Logo Option" className="max-h-10 max-w-full object-contain" />
                                            )}
                                        </div>
                                        <span className="text-xs text-slate-500 font-medium">
                                            {isDefault ? 'Default Icon' : (url.includes('original') ? 'Original Image' : url.split('/').pop())}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-bold text-slate-700 mb-1">Custom Logo URL</label>
                            <input
                                type="text"
                                value={config.logoUrl || ''}
                                onChange={(e) => updateConfig('logoUrl', e.target.value)}
                                className="w-full border p-2 rounded"
                                placeholder="/logos/custom-logo.png"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t flex justify-end">
                    <button
                        onClick={saveSettings}
                        className="bg-slate-900 text-white font-bold px-8 py-3 rounded hover:bg-slate-800 transition flex items-center"
                    >
                        <Save className="w-5 h-5 mr-2" /> Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
