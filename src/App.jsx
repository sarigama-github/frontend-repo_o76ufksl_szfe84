import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import MapExplorer from './components/MapExplorer.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [route, setRoute] = useState('home'); // 'home' | 'profile' | 'admin'

  // Demo in-memory data (frontend-only mock for UI)
  const [installations, setInstallations] = useState([
    {
      id: 'rabat-1',
      name: 'Complexe Sportif Prince Moulay Abdellah',
      city: 'Rabat',
      sports: ['Football', 'Athlétisme', 'Basketball'],
      lat: 34.004,
      lng: -6.852,
      pos: { x: 46, y: 28 },
      description:
        "Grand complexe avec stade, pistes d'athlétisme et salles couvertes.",
    },
    {
      id: 'casa-1',
      name: 'Complexe Mohammed V',
      city: 'Casablanca',
      sports: ['Football', 'Natation'],
      lat: 33.588,
      lng: -7.611,
      pos: { x: 38, y: 40 },
      description: 'Stade mythique au cœur de Casablanca avec piscine olympique.',
    },
    {
      id: 'marrakech-1',
      name: 'Salle Omnisports M’hamid',
      city: 'Marrakech',
      sports: ['Handball', 'Basketball', 'Volley'],
      lat: 31.629,
      lng: -7.989,
      pos: { x: 42, y: 60 },
      description: 'Salle couverte moderne, idéale pour sports indoor.',
    },
  ]);

  const [requests, setRequests] = useState([
    {
      id: 'req-1',
      name: 'Terrain Municipal Agadir',
      city: 'Agadir',
      sports: ['Football', 'Tennis'],
      lat: 30.427,
      lng: -9.598,
      description: 'Terrain de quartier avec court de tennis attenant.',
      status: 'pending',
    },
  ]);

  const handleCreateRequest = (formData) => {
    const newReq = {
      id: `req-${Date.now()}`,
      ...formData,
      status: 'pending',
    };
    setRequests((prev) => [newReq, ...prev]);
  };

  const handleApprove = (id) => {
    const req = requests.find((r) => r.id === id);
    if (!req) return;
    // Add to installations with a basic position projection for demo
    const newInst = {
      id: `inst-${Date.now()}`,
      name: req.name,
      city: req.city,
      sports: req.sports,
      lat: req.lat,
      lng: req.lng,
      pos: {
        x: Math.min(90, Math.max(10, 50 + (req.lng || 0))),
        y: Math.min(90, Math.max(10, 50 - (req.lat || 0))),
      },
      description: req.description || '',
    };
    setInstallations((prev) => [newInst, ...prev]);
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleReject = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <Navbar current={route} onNavigate={setRoute} />

      {route === 'home' && (
        <>
          <HeroSection onExplore={() => {
            const el = document.getElementById('map-explorer');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }} />
          <div id="map-explorer" className="container mx-auto px-4 py-10">
            <MapExplorer installations={installations} />
          </div>
        </>
      )}

      {route === 'profile' && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-6">Mon profil</h2>
          <p className="text-slate-600 mb-8">
            Créez une demande pour ajouter une nouvelle installation sportive.
          </p>
          <ProfileRequestForm onSubmit={handleCreateRequest} />
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Mes demandes</h3>
            <ul className="space-y-3">
              {requests.map((r) => (
                <li key={r.id} className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="font-medium">{r.name}</div>
                  <div className="text-sm text-slate-600">{r.city} • {r.sports.join(', ')}</div>
                  <div className="text-xs text-amber-600 mt-1">Statut: {r.status}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {route === 'admin' && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-6">Administration</h2>
          <p className="text-slate-600 mb-8">
            Approuvez ou refusez les demandes d'ajout avant publication sur la carte.
          </p>
          <div className="grid gap-4">
            {requests.length === 0 && (
              <div className="text-slate-500">Aucune demande en attente.</div>
            )}
            {requests.map((r) => (
              <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-5 flex items-start justify-between gap-6">
                <div>
                  <div className="text-lg font-semibold">{r.name}</div>
                  <div className="text-sm text-slate-600">{r.city} • {r.sports.join(', ')}</div>
                  {r.description && (
                    <p className="text-sm text-slate-700 mt-2 max-w-prose">{r.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleReject(r.id)} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50">
                    Refuser
                  </button>
                  <button onClick={() => handleApprove(r.id)} className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">
                    Approuver
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Installations publiées</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {installations.map((i) => (
                <div key={i.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="font-medium">{i.name}</div>
                  <div className="text-sm text-slate-600">{i.city}</div>
                  <div className="text-xs text-slate-500 mt-1">{i.sports.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function ProfileRequestForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [sports, setSports] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const sportList = sports
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    onSubmit({ name, city, sports: sportList, lat: parseFloat(lat), lng: parseFloat(lng), description });
    setName('');
    setCity('');
    setSports('');
    setLat('');
    setLng('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 grid sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-slate-700 mb-1">Nom de l'installation</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Ville</label>
        <input value={city} onChange={(e) => setCity(e.target.value)} required className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Sports (séparés par des virgules)</label>
        <input value={sports} onChange={(e) => setSports(e.target.value)} placeholder="Football, Tennis, ..." className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Latitude</label>
        <input value={lat} onChange={(e) => setLat(e.target.value)} type="number" step="0.0001" required className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Longitude</label>
        <input value={lng} onChange={(e) => setLng(e.target.value)} type="number" step="0.0001" required className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>
      <div className="sm:col-span-2 flex justify-end">
        <button type="submit" className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Envoyer la demande</button>
      </div>
    </form>
  );
}

export default App;
