import Navbar from './Navbar.jsx';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <main className="mx-auto flex max-w-6xl flex-1 flex-col gap-6 px-4 py-6 md:py-10">
        {children}
      </main>
      <footer className="border-t border-slate-800/80 bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} PlantOne Foundation</span>
          <span>Made with care for trees and donors</span>
        </div>
      </footer>
    </div>
  );
}
