import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

export default function Profile() {
  const [form, setForm] = useState({
    name: '',
    city: '',
    type: '',
    equipments: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-10">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Mon profil</h2>
        <p className="text-slate-600 mt-2">Proposez l'ajout d'une installation à cartographier. Votre demande sera validée par un administrateur.</p>

        <form onSubmit={onSubmit} className="mt-6 p-5 border rounded-xl bg-white space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Nom de l'installation</label>
              <input required value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} className="mt-1 w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Ville</label>
              <input required value={form.city} onChange={(e)=>setForm({...form, city:e.target.value})} className="mt-1 w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Type</label>
              <input required value={form.type} onChange={(e)=>setForm({...form, type:e.target.value})} className="mt-1 w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Équipements (séparés par des virgules)</label>
              <input value={form.equipments} onChange={(e)=>setForm({...form, equipments:e.target.value})} className="mt-1 w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700">
            <PlusCircle size={18}/> Envoyer la demande
          </button>
          {submitted && (
            <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-md">
              Demande envoyée ! (Simulation) — Dans la version complète, cela créera une demande côté serveur pour validation.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
