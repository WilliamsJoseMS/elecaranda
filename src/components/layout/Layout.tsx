import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { BookOpen, Zap, Compass, PenTool, ClipboardCheck, LayoutDashboard, FileText, Box, CalendarDays, ShieldCheck, Menu, X } from "lucide-react";

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: "Introducción", path: "/", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "1. Conceptos Básicos", path: "/basics", icon: <BookOpen className="w-5 h-5" /> },
    { name: "2. Conductores", path: "/conductors", icon: <Zap className="w-5 h-5" /> },
    { name: "3. Simbología", path: "/symbology", icon: <Compass className="w-5 h-5" /> },
    { name: "4. Doc. y Normativa", path: "/documentation", icon: <FileText className="w-5 h-5" /> },
    { name: "5. Aprovisionamiento", path: "/provisioning", icon: <Box className="w-5 h-5" /> },
    { name: "6. Planificación", path: "/planning", icon: <CalendarDays className="w-5 h-5" /> },
    { name: "7. Instrumentos", path: "/instruments", icon: <PenTool className="w-5 h-5" /> },
    { name: "8. Pruebas y Cert.", path: "/testing", icon: <ShieldCheck className="w-5 h-5" /> },
    { name: "Evaluación", path: "/quiz", icon: <ClipboardCheck className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col backdrop-blur-md z-30 transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-16 p-4 border-b border-cyan-900/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] text-slate-950">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <h1 className="font-bold text-lg text-white tracking-tight">ELEE0310</h1>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">
          Módulos
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors font-medium text-sm border ${
                  isActive
                    ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-300"
                    : "border-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-800/50 hover:text-slate-200"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-gradient-to-br from-slate-950 to-slate-900">
        <header className="h-16 border-b border-cyan-900/50 bg-slate-900/80 backdrop-blur-md flex items-center justify-between lg:justify-end px-4 lg:px-8 shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-10">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-cyan-500 font-semibold">Progreso del Módulo</span>
              <div className="w-32 sm:w-48 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden border border-slate-700">
                <div className="w-[45%] h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white">
              W
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-0">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <footer className="shrink-0 border-t border-slate-800/60 bg-slate-900/60 backdrop-blur-md px-8 py-3 flex flex-col sm:flex-row items-center justify-center gap-2 z-10">
          <p className="text-[10px] sm:text-[11px] text-slate-500 tracking-wide text-center">
            Desarrollado por{" "}
            <span className="font-semibold text-cyan-400 tracking-wider">Williams Cuamo</span>
            {" "}·{" "}
            <span className="text-slate-600">ELEE0310 / MF1180_3</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
