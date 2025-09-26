import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, onLogout, manifest }) => {
  const [varieties, setVarieties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newVariety, setNewVariety] = useState({ name: '', color: 'Red', origin: '', notes: '', photo: null });

  const loadVarieties = async () => {
    setIsLoading(true);
    try {
      const response = await manifest.from('GrapeVariety').find({ include: ['grower'], sort: { createdAt: 'desc' } });
      setVarieties(response.data);
    } catch (error) {
      console.error('Failed to load grape varieties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVarieties();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVariety(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setNewVariety(prev => ({ ...prev, photo: e.target.files[0] }));
    }
  };

  const handleCreateVariety = async (e) => {
    e.preventDefault();
    if (!newVariety.name) return;
    try {
      const created = await manifest.from('GrapeVariety').create(newVariety);
      setVarieties(prev => [created, ...prev]);
      setNewVariety({ name: '', color: 'Red', origin: '', notes: '', photo: null });
      e.target.reset(); // Reset file input
    } catch (error) {
      console.error('Failed to create variety:', error);
      alert('Error creating variety. Check console for details.');
    }
  };

  const handleDeleteVariety = async (id) => {
    if (window.confirm('Are you sure you want to delete this variety?')) {
        try {
          await manifest.from('GrapeVariety').delete(id);
          setVarieties(prev => prev.filter(v => v.id !== id));
        } catch (error) {
          console.error('Failed to delete variety:', error);
          alert('You do not have permission to delete this item.');
        }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GrapeTracker Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name}!</p>
          </div>
          <div className="flex items-center space-x-4">
             <a 
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              Admin Panel
            </a>
            <button 
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Grape Variety</h2>
              <form onSubmit={handleCreateVariety} className="space-y-4">
                <input type="text" name="name" placeholder="Variety Name (e.g., Cabernet Sauvignon)" value={newVariety.name} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
                <select name="color" value={newVariety.color} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Red</option>
                  <option>White</option>
                  <option>Black</option>
                  <option>Rosé</option>
                </select>
                <input type="text" name="origin" placeholder="Country of Origin" value={newVariety.origin} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                <textarea name="notes" placeholder="Tasting notes, characteristics..." value={newVariety.notes} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" rows="3"></textarea>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                    <input type="file" name="photo" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-semibold transition">Add Variety</button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Grape Collection</h2>
              {isLoading ? (
                <p className="text-gray-500">Loading varieties...</p>
              ) : varieties.length === 0 ? (
                <p className="text-gray-500">No varieties added yet. Use the form to add your first one!</p>
              ) : (
                <div className="space-y-4">
                  {varieties.map(v => (
                    <div key={v.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                       <img src={v.photo?.thumbnail || 'https://placehold.co/100x100/e2e8f0/e2e8f0'} alt={v.name} className="w-24 h-24 rounded-md object-cover bg-gray-100" />
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg text-gray-800">{v.name}</h3>
                        <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${v.color === 'Red' ? 'bg-red-100 text-red-800' : v.color === 'White' ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'}`}>{v.color}</span>
                        <p className="text-sm text-gray-600 mt-1"><strong>Origin:</strong> {v.origin}</p>
                        <p className="text-sm text-gray-500 mt-1">{v.notes}</p>
                      </div>
                      {user.id === v.grower?.id && (
                        <button onClick={() => handleDeleteVariety(v.id)} className="text-gray-400 hover:text-red-600 transition p-1 rounded-full">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
