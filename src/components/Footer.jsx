export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-600">© {new Date().getFullYear()} SportMap Maroc. Tous droits réservés.</p>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <a href="#" className="hover:text-emerald-700">Confidentialité</a>
          <span>•</span>
          <a href="#" className="hover:text-emerald-700">Conditions</a>
        </div>
      </div>
    </footer>
  );
}
