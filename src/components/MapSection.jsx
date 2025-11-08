import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapPin, Filter, ChevronDown } from 'lucide-react';

// Lightweight Leaflet via CDN in index.html; fall back to simple static if not loaded
const hasLeaflet = () => typeof window !== 'undefined' && window.L;

const sportsTypes = [
  'Football',
  'Basketball',
  'Tennis',
  'Piscine',
  'Athlétisme',
  'Fitness',
];

const mockData = [
  {
    id: '1',
    name: 'Complexe Sportif Moulay Abdellah',
    city: 'Rabat',
    type: 'Football',
    equipments: ['Stade', 'Piste', 'Salle'],
    lat: 34.0103,
    lng: -6.8427,
  },
  {
    id: '2',
    name: 'Parc de la Ligue Arabe',
    city: 'Casablanca',
    type: 'Tennis',
    equipments: ['Courts', 'Jogging'],
    lat: 33.5899,
    lng: -7.6039,
  },
  {
    id: '3',
    name: 'Piscine Olympique',
    city: 'Marrakech',
    type: 'Piscine',
    equipments: ['Bassin olympique', 'Saut'],
    lat: 31.6295,
    lng: -7.9811,
  },
];

export default function MapSection() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [active, setActive] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const mapRef = useRef(null);

  const filtered = useMemo(() => {
    return mockData.filter((x) => {
      const matchQ = `${x.name} ${x.city} ${x.type}`.toLowerCase().includes(query.toLowerCase());
      const matchT = !type || x.type === type;
      return matchQ && matchT;
    });
  }, [query, type]);

  useEffect(() => {
    if (!hasLeaflet() || initialized) return;
    const L = window.L;
    const map = L.map('map-root').setView([31.7917, -7.0926], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    filtered.forEach((p) => {
      const m = L.marker([p.lat, p.lng]).addTo(map);
      m.on('click', () => setActive(p.id));
    });

    mapRef.current = map;
    setInitialized(true);
  }, [initialized]);

  useEffect(() => {
    if (!hasLeaflet() || !mapRef.current) return;
    const L = window.L;
    // Clear markers by resetting layer: simple approach – recreate map markers on filter change
    mapRef.current.eachLayer((layer) => {
      if (layer._url) return; // keep tile layer
      mapRef.current.removeLayer(layer);
    });
    filtered.forEach((p) => {
      const m = L.marker([p.lat, p.lng]).addTo(mapRef.current);
      m.on('click', () => setActive(p.id));
    });
  }, [filtered]);

  const activePlace = filtered.find((x) => x.id === active) || null;

  return (
    <section id="carte" className="py-10">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Carte des installations</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div id="map-root" className="h-[480px] w-full rounded-xl border overflow-hidden" />
          </div>
          <aside className="space-y-4">
            <div className="p-4 border rounded-xl bg-white">
              <div className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2"><Filter size={16}/> Filtres</div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher ville, nom, type..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="relative mt-3">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full appearance-none px-3 py-2 border rounded-lg bg-white pr-8"
                >
                  <option value="">Type d'installation</option>
                  {sportsTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              </div>
            </div>
            {activePlace && (
              <div className="p-4 border rounded-xl bg-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">{activePlace.name}</h3>
                    <p className="text-sm text-slate-600">{activePlace.city} • {activePlace.type}</p>
                  </div>
                  <MapPin className="text-emerald-600" size={20} />
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium text-slate-700">Équipements</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activePlace.equipments.map((eq) => (
                      <span key={eq} className="px-2 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{eq}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
