import { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/Card";

export default function Symbology() {
  const [activeTab, setActiveTab] = useState<"unifilar" | "multifilar" | "funcional">("unifilar");

  const symbols = [
    { name: "Caja de registro", unifilar: "circle-cross", funcional: "square" },
    { name: "Interruptor", unifilar: "switch-u", funcional: "switch-f" },
    { name: "Pulsador", unifilar: "push-u", funcional: "push-f" },
    { name: "Timbre / Zumbador", unifilar: "bell-u", funcional: "bell-f" },
    { name: "Punto de luz", unifilar: "light-u", funcional: "light-f" },
    { name: "Interruptor diferencial", unifilar: "diff-u", funcional: "diff-f" },
    { name: "Interruptor magnetotérmico", unifilar: "magneto-u", funcional: "magneto-f" },
  ];

  // Helper renderers for pseudo-SVGs of the symbols
  const renderSymbol = (type: string) => {
    switch (type) {
      case "circle-cross":
        return <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-current stroke-2 fill-none"><circle cx="20" cy="20" r="12" /><line x1="8" y1="20" x2="32" y2="20" /><line x1="20" y1="8" x2="20" y2="32" /></svg>;
      case "square":
        return <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-current stroke-2 fill-none stroke-dasharray-[4,2]"><rect x="10" y="10" width="20" height="20" /></svg>;
      case "switch-u":
         return <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-cyan-500 stroke-2 fill-none"><circle cx="20" cy="20" r="10" /><line x1="27" y1="13" x2="35" y2="5" /></svg>;
      case "switch-f":
         return <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-cyan-500 stroke-2 fill-none"><line x1="10" y1="20" x2="16" y2="20" /><line x1="16" y1="20" x2="26" y2="10" /><line x1="28" y1="20" x2="34" y2="20" /></svg>;
      case "push-u":
         return <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-cyan-500 stroke-2 fill-none"><circle cx="20" cy="20" r="10" /><circle cx="20" cy="20" r="4" className="fill-cyan-500" /></svg>;
      case "push-f":
         return <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-cyan-500 stroke-2 fill-none"><line x1="10" y1="20" x2="16" y2="20" /><line x1="16" y1="15" x2="28" y2="15" /><line x1="22" y1="15" x2="22" y2="5" /><line x1="28" y1="20" x2="34" y2="20" /></svg>;
      case "bell-u":
         return <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-cyan-500 stroke-2 fill-none"><path d="M 12 20 Q 20 10, 28 20" /><line x1="12" y1="20" x2="28" y2="20" /><line x1="20" y1="20" x2="20" y2="30" /></svg>;
      case "bell-f":
         return <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-cyan-500 stroke-2 fill-none"><path d="M 12 25 Q 20 15, 28 25" /><line x1="12" y1="25" x2="28" y2="25" /><line x1="16" y1="10" x2="16" y2="20" /><line x1="24" y1="10" x2="24" y2="20" /><line x1="16" y1="10" x2="24" y2="10" /></svg>;
      case "light-u":
      case "light-f":
         return <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-cyan-500 stroke-2 fill-none"><circle cx="20" cy="20" r="10" /><line x1="13" y1="13" x2="27" y2="27" /><line x1="13" y1="27" x2="27" y2="13" /></svg>;
      case "diff-u":
         return <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-cyan-500 stroke-2 fill-none"><rect x="15" y="10" width="10" height="20" rx="2" /><circle cx="20" cy="15" r="2" /><line x1="20" y1="5" x2="20" y2="10" /><line x1="20" y1="30" x2="20" y2="35" /></svg>;
      case "diff-f":
         return <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-cyan-500 stroke-1 fill-none"><rect x="5" y="5" width="20" height="30" className="stroke-dasharray-[2]" /><line x1="10" y1="0" x2="10" y2="10" /><line x1="20" y1="0" x2="20" y2="10" /><line x1="10" y1="10" x2="16" y2="18" /><line x1="20" y1="10" x2="26" y2="18" /><line x1="10" y1="20" x2="10" y2="40" /><line x1="20" y1="20" x2="20" y2="40" /></svg>;
      case "magneto-u":
         return <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-cyan-500 stroke-2 fill-none"><rect x="15" y="10" width="10" height="20" /><line x1="15" y1="15" x2="25" y2="15" /><path d="M 22 15 A 3 3 0 0 0 25 12" /><line x1="20" y1="5" x2="20" y2="10" /><line x1="20" y1="30" x2="20" y2="35" /></svg>;
      case "magneto-f":
         return <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-cyan-500 stroke-1 fill-none"><rect x="5" y="5" width="20" height="30" className="stroke-dasharray-[2]" /><line x1="10" y1="0" x2="10" y2="15" /><line x1="20" y1="0" x2="20" y2="15" /><path d="M 10 15 A 3 3 0 0 0 13 12" /><path d="M 20 15 A 3 3 0 0 0 23 12" /><line x1="10" y1="15" x2="16" y2="25" /><line x1="20" y1="15" x2="26" y2="25" /><line x1="10" y1="28" x2="10" y2="40" /><line x1="20" y1="28" x2="20" y2="40" /></svg>;
      default:
        return null;
    }
  };
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <nav className="text-xs text-cyan-500 font-mono mb-1 uppercase tracking-widest">Módulo 03 &gt; Simbología</nav>
        <h1 className="text-3xl font-bold tracking-tight text-white">3. Esquemas y Simbología</h1>
        <p className="mt-2 text-slate-400">Sistemas de representación (UNE-EN-60617) y galería de símbolos.</p>
      </div>

      <div className="flex space-x-2 pb-px mb-6 overflow-x-auto no-scrollbar">
        {["unifilar", "multifilar", "funcional"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-xl capitalize transition-all whitespace-nowrap ${
              activeTab === tab ? "bg-cyan-500/10 border border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]" : "bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <Card className="h-full bg-slate-800/30 border-slate-700">
            <CardContent className="pt-6">
              <h3 className="font-bold text-xl text-white capitalize mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                Esquema {activeTab}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {activeTab === "unifilar" && "Muestra la instalación en una sola línea. Usado principalmente en planos arquitectónicos para mostrar ubicación de elementos."}
                {activeTab === "multifilar" && "Representa cómo están conectados entre sí los mecanismos, con todo su cableado (fase, neutro, protección). Común en fichas de montaje."}
                {activeTab === "funcional" && "Símbolos entre dos conductores (L y N). Fácil de entender la lógica del circuito sin cruce de líneas."}
              </p>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-inner overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-slate-800/50 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-cyan-500 font-bold uppercase tracking-widest text-[10px]">Mecanismo</th>
                  <th className="px-6 py-4 text-cyan-500 font-bold uppercase tracking-widest text-[10px] text-center">
                    Símbolo {activeTab === "unifilar" ? "Unifilar" : "Funcional / Multifilar"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {symbols.map((sym, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4 font-medium text-slate-300 group-hover:text-white transition-colors">{sym.name}</td>
                    <td className="px-6 py-4 flex justify-center text-slate-400">
                      <div className="p-2 bg-slate-800/50 border border-slate-700 rounded-xl group-hover:border-cyan-500/50 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all">
                        {renderSymbol(activeTab === "unifilar" ? sym.unifilar : sym.funcional)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
