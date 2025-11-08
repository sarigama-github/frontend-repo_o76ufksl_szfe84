import React, { useMemo, useState } from 'react';
import { CheckCircle2, Ban, Plus } from 'lucide-react';

const pendingMock = [
  { id: 'p1', name: "Terrain municipal", city: 'Agadir', type: 'Football', equipments: ['Pelouse', 'Eclairage'] },
  { id: 'p2', name: "Salle Al Amal", city: 'Fès', type: 'Basketball', equipments: ['Parquet', 'Gradins'] },
];

export default function Admin() {
  const [pending, setPending] = useState(pendingMock);
  const [items, setItems] = useState([]);

  const approve = (id) => {
    const item = pending.find((x) => x.id === id);
    setItems((curr) => [...curr, item]);
    setPending((curr) => curr.filter((x) => x.id !== id));
  };
  const reject = (id) => setPending((curr) => curr.filter((x) => x.id !== id));

  const summary = useMemo(() => ({ added: items.length, remaining: pending.length }), [items.length, pending.length]);

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Espace Admin</h2>
          <div className="text-sm text-slate-600">Ajoutés: <span className="font-medium text-emerald-700">{summary.added}</span> • En attente: <span className="font-medium">{summary.remaining}</span></div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {pending.map((p) => (
            <div key={p.id} className="p-4 border rounded-xl bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">{p.name}</h3>
                  <p className="text-sm text-slate-600">{p.city} • {p.type}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.equipments.map((e) => (
                      <span key={e} className="px-2 py-1 text-xs rounded-full bg-slate-50 text-slate-700 border">{e}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => approve(p.id)} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-700"><CheckCircle2 size={16}/> Approuver</button>
                  <button onClick={() => reject(p.id)} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-rose-600 text-white text-sm hover:bg-rose-700"><Ban size={16}/> Refuser</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><Plus size={18}/> Ajouts récents</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {items.map((p) => (
                <div key={p.id} className="p-4 border rounded-xl bg-white">
                  <div className="font-medium text-slate-900">{p.name}</div>
                  <div className="text-sm text-slate-600">{p.city} • {p.type}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
