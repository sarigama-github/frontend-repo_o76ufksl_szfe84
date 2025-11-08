import React from 'react';
import { MapPin, Search, Star } from 'lucide-react';

export default function Hero({ onExplore }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-200 blur-3xl opacity-40" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-200 blur-3xl opacity-40" />
      </div>
      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-16 md:pt-24 pb-12 md:pb-20 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium">
          <Star size={14} /> Version Démo
        </div>
        <h1 className="mt-4 text-3xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          Cartographiez toutes les installations sportives au Maroc
        </h1>
        <p className="mt-4 text-slate-600 max-w-2xl text-base md:text-lg">
          Explorez les stades, piscines, salles de sport, terrains et plus encore. Filtrez par ville, type d\'équipement et accédez aux détails en un clic.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button onClick={onExplore} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition">
            <MapPin size={18} /> Explorer la carte
          </button>
          <a href="#comment-ca-marche" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white text-slate-900 font-medium border hover:bg-slate-50 transition">
            <Search size={18} /> Comment ça marche ?
          </a>
        </div>
      </div>
    </section>
  );
}
