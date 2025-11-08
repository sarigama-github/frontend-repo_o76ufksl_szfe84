import { MapPin, Filter } from 'lucide-react';

export default function HeroSection({ onExplore }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-50 to-white" />
      <div className="relative container mx-auto px-4 py-20 grid lg:grid-cols-2 items-center gap-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Cartographiez toutes les installations sportives au Maroc
          </h1>
          <p className="mt-4 text-lg text-slate-700 max-w-prose">
            Explorez les stades, salles et terrains près de chez vous. Filtrez par sport, 
            découvrez les équipements disponibles et obtenez des informations détaillées.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onExplore} className="px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow">
              Explorer la carte
            </button>
            <button onClick={onExplore} className="px-5 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-50">
              <span className="inline-flex items-center gap-2"><Filter size={18}/> Filtrer par sport</span>
            </button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            <Stat label="Villes" value="+20" />
            <Stat label="Installations" value="+500" />
            <Stat label="Sports" value="+30" />
          </div>
        </div>
        <div className="relative h-80 lg:h-[420px]">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 opacity-20" />
          <div className="relative h-full w-full rounded-2xl border border-slate-200 bg-white grid place-items-center shadow-lg">
            <MapPin className="text-emerald-600" size={64} />
            <p className="mt-2 text-slate-600">Carte interactive</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-slate-600">{label}</div>
    </div>
  );
}
