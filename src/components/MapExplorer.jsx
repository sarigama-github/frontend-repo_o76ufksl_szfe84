import { useMemo, useState } from 'react';
import { MapPin, X } from 'lucide-react';

export default function MapExplorer({ installations }) {
  const [active, setActive] = useState(null);
  const [query, setQuery] = useState('');
  const [sport, setSport] = useState('');

  const sports = useMemo(() => {
    const set = new Set();
    installations.forEach(i => i.sports.forEach(s => set.add(s)));
    return Array.from(set).sort();
  }, [installations]);

  const filtered = useMemo(() => {
    return installations.filter((i) => {
      const matchesName = i.name.toLowerCase().includes(query.toLowerCase()) || i.city.toLowerCase().includes(query.toLowerCase());
      const matchesSport = !sport || i.sports.includes(sport);
      return matchesName && matchesSport;
    });
  }, [installations, query, sport]);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex gap-2">
            <input placeholder="Rechercher par nom ou ville" value={query} onChange={(e)=>setQuery(e.target.value)} className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            <select value={sport} onChange={(e)=>setSport(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="">Tous les sports</option>
              {sports.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white divide-y max-h-[420px] overflow-auto">
          {filtered.map((i)=> (
            <button key={i.id} onClick={()=>setActive(i)} className="w-full text-left p-4 hover:bg-slate-50">
              <div className="font-medium">{i.name}</div>
              <div className="text-xs text-slate-600">{i.city} • {i.sports.join(', ')}</div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="p-6 text-sm text-slate-500">Aucun résultat</div>
          )}
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden h-[520px]">
          <MoroccoMap>
            {filtered.map((i)=> (
              <Pin key={i.id} position={i.pos} onClick={()=>setActive(i)} />
            ))}
          </MoroccoMap>

          {active && (
            <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-6">
              <div className="rounded-xl border border-slate-200 bg-white shadow-lg p-4 md:p-5 flex items-start gap-4">
                <div className="shrink-0">
                  <div className="h-12 w-12 grid place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                    <MapPin />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-lg font-semibold">{active.name}</div>
                  <div className="text-sm text-slate-600">{active.city}</div>
                  <div className="mt-2 text-sm text-slate-700">{active.description}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.sports.map((s) => (
                      <span key={s} className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{s}</span>
                    ))}
                  </div>
                </div>
                <button onClick={()=>setActive(null)} className="p-2 rounded-lg hover:bg-slate-100"><X size={18} /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Pin({ position, onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute -translate-x-1/2 -translate-y-full group"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      <div className="relative">
        <MapPin className="text-emerald-600 drop-shadow" />
        <span className="absolute left-1/2 -translate-x-1/2 -bottom-6 whitespace-nowrap rounded bg-emerald-600 text-white text-xs px-2 py-0.5 opacity-0 group-hover:opacity-100 transition">Voir les détails</span>
      </div>
    </button>
  );
}

function MoroccoMap({ children }) {
  return (
    <div className="relative h-full w-full">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Morocco_location_map.svg/800px-Morocco_location_map.svg.png"
        alt="Carte du Maroc"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
