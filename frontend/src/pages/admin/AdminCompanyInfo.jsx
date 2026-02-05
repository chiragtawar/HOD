import React, { useState, useEffect } from 'react';
import { Save, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { authFetch } from '../../utils/auth';
import { useSiteConfig } from '../../context/SiteConfigContext';

const AdminCompanyInfo = () => {
    const { refreshConfig } = useSiteConfig();
    const [info, setInfo] = useState({
        founderName: '',
        founderBio: '',
        address: '',
        phone: '',
        email: '',
        founderImageUrl: '',
        googleMapUrl: '',
        socialLinksJson: '{}',
        visible: true
    });
    const [socialLinks, setSocialLinks] = useState({
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        authFetch('/api/admin/company-info')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setInfo(data);
                    try {
                        setSocialLinks(JSON.parse(data.socialLinksJson || '{}'));
                    } catch (e) {
                        console.error("Failed to parse social links", e);
                    }
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSave = () => {
        const payload = {
            ...info,
            socialLinksJson: JSON.stringify(socialLinks)
        };

        authFetch('/api/admin/company-info', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                setInfo(data);
                refreshConfig(); // Refresh global site config (Header/Footer)
                setMessage('Company info updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            })
            .catch(err => {
                console.error(err);
                setMessage('Failed to update info.');
            });
    };

    const handleSocialChange = (e) => {
        setSocialLinks({
            ...socialLinks,
            [e.target.name]: e.target.value
        });
    };

    if (loading) return <div className="p-8">Loading info...</div>;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">Company & Founder Info</h2>
                <p className="text-sm text-slate-500">Public contact details and founder profile</p>
            </div>

            <div className="p-6">
                {message && (
                    <div className="p-4 mb-6 bg-green-50 text-green-700 font-bold border-l-4 border-green-500">
                        {message}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h3 className="font-bold text-slate-900 border-b pb-2">Founder Profile</h3>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Founder Name(s)</label>
                            <input
                                type="text"
                                value={info.founderName}
                                onChange={(e) => setInfo({ ...info, founderName: e.target.value })}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-accent focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Bio / About Us</label>
                            <textarea
                                rows="6"
                                value={info.founderBio}
                                onChange={(e) => setInfo({ ...info, founderBio: e.target.value })}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-accent focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Founder Image URL</label>
                            <input
                                type="text"
                                value={info.founderImageUrl}
                                onChange={(e) => setInfo({ ...info, founderImageUrl: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="font-bold text-slate-900 border-b pb-2">Contact & Social</h3>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Office Address</label>
                            <input
                                type="text"
                                value={info.address}
                                onChange={(e) => setInfo({ ...info, address: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Google Map Embed URL</label>
                            <input
                                type="text"
                                value={info.googleMapUrl || ''}
                                onChange={(e) => setInfo({ ...info, googleMapUrl: e.target.value })}
                                className="w-full border p-2 rounded"
                                placeholder="https://www.google.com/maps/embed?..."
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                Tip: Use the <strong>Embed a map</strong> URL (with &lt;iframe src="..."&gt;) to show the map directly.
                                <br />Short links (maps.app.goo.gl) will show a "View Button" instead.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Phone</label>
                                <input
                                    type="text"
                                    value={info.phone}
                                    onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={info.email}
                                    onChange={(e) => setInfo({ ...info, email: e.target.value })}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <label className="block text-sm font-bold text-slate-700 mb-3">Social Media Links</label>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-slate-500"><Facebook size={18} /></div>
                                    <input name="facebook" value={socialLinks.facebook} onChange={handleSocialChange} className="flex-1 border p-2 rounded text-sm" placeholder="Facebook URL" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-slate-500"><Instagram size={18} /></div>
                                    <input name="instagram" value={socialLinks.instagram} onChange={handleSocialChange} className="flex-1 border p-2 rounded text-sm" placeholder="Instagram URL" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-slate-500"><Linkedin size={18} /></div>
                                    <input name="linkedin" value={socialLinks.linkedin} onChange={handleSocialChange} className="flex-1 border p-2 rounded text-sm" placeholder="LinkedIn URL" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t flex justify-between items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={info.visible}
                            onChange={(e) => setInfo({ ...info, visible: e.target.checked })}
                            className="w-5 h-5 text-accent"
                        />
                        <span className="font-bold text-slate-700">Show on Website</span>
                    </label>
                    <button
                        onClick={handleSave}
                        className="bg-accent text-slate-900 font-bold px-8 py-3 rounded-none hover:bg-yellow-500 transition flex items-center shadow-lg"
                    >
                        <Save className="w-5 h-5 mr-2" /> Save Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminCompanyInfo;
