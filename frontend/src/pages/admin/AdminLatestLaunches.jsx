import React, { useState, useEffect } from 'react';
import { Plus, Trash, Edit, Save, X } from 'lucide-react';
import { authFetch } from '../../utils/auth';

const AdminLatestLaunches = () => {
    const [launches, setLaunches] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editMessage, setEditMessage] = useState('');

    useEffect(() => {
        fetchLaunches();
    }, []);

    const fetchLaunches = () => {
        authFetch('/api/latest-launches')
            .then(res => res.json())
            .then(data => setLaunches(data))
            .catch(err => console.error(err));
    };

    const handleAdd = () => {
        if (!newMessage) return;
        authFetch('/api/latest-launches', {
            method: 'POST',
            body: JSON.stringify({ message: newMessage })
        })
            .then(() => {
                setNewMessage('');
                fetchLaunches();
            });
    };

    const handleDelete = (id) => {
        authFetch(`/api/latest-launches/${id}`, {
            method: 'DELETE'
        })
            .then(() => fetchLaunches());
    };

    const startEdit = (launch) => {
        setEditingId(launch.id);
        setEditMessage(launch.message);
    };

    const saveEdit = (id) => {
        authFetch(`/api/latest-launches/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ message: editMessage })
        })
            .then(() => {
                setEditingId(null);
                fetchLaunches();
            });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Manage Latest Launches</h2>

            <div className="flex gap-4 mb-8">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Enter new launch message..."
                    className="flex-1 border p-2 rounded"
                />
                <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded flex items-center hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" /> Add
                </button>
            </div>

            <div className="space-y-4">
                {launches.map(launch => (
                    <div key={launch.id} className="flex items-center justify-between p-4 bg-gray-50 rounded border">
                        {editingId === launch.id ? (
                            <div className="flex-1 flex gap-2 mr-4">
                                <input
                                    value={editMessage}
                                    onChange={(e) => setEditMessage(e.target.value)}
                                    className="flex-1 border p-1 rounded"
                                />
                                <button onClick={() => saveEdit(launch.id)} className="text-blue-600"><Save className="w-5 h-5" /></button>
                                <button onClick={() => setEditingId(null)} className="text-gray-500"><X className="w-5 h-5" /></button>
                            </div>
                        ) : (
                            <p className="flex-1 font-medium">{launch.message}</p>
                        )}

                        <div className="flex gap-2">
                            {editingId !== launch.id && (
                                <button onClick={() => startEdit(launch)} className="text-blue-600 hover:text-blue-800 p-2">
                                    <Edit className="w-5 h-5" />
                                </button>
                            )}
                            <button onClick={() => handleDelete(launch.id)} className="text-red-500 hover:text-red-700 p-2">
                                <Trash className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminLatestLaunches;
