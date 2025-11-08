import { Home, User, Shield } from 'lucide-react';

export default function Navbar({ current, onNavigate }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-600" />
          <span className="font-bold">SportMap Maroc</span>
        </div>
        <nav className="flex items-center gap-1">
          <button onClick={() => onNavigate('home')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-slate-100 ${current==='home' ? 'text-emerald-600 font-medium' : 'text-slate-700'}`}>
            <Home size={18} /> Accueil
          </button>
          <button onClick={() => onNavigate('profile')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-slate-100 ${current==='profile' ? 'text-emerald-600 font-medium' : 'text-slate-700'}`}>
            <User size={18} /> Profil
          </button>
          <button onClick={() => onNavigate('admin')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-slate-100 ${current==='admin' ? 'text-emerald-600 font-medium' : 'text-slate-700'}`}>
            <Shield size={18} /> Admin
          </button>
        </nav>
      </div>
    </header>
  );
}
