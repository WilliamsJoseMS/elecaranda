import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Card";
import { motion, AnimatePresence } from "motion/react";
import { Table2, BookMarked, Activity, Zap, ShieldCheck, Info } from "lucide-react";

const cableColors = [
  { 
    type: "Fase (L1)", 
    label: "Marrón", 
    desc: "Conductor activo principal en instalaciones monofásicas. Lleva la tensión de 230V a los receptores.",
    role: "L1 / Fase",
    system: "Monofásico / Trifásico",
    color: "from-amber-800 to-amber-950", 
    border: "border-amber-700/50"
  },
  { 
    type: "Fase (L2)", 
    label: "Negro", 
    desc: "Segundo conductor activo. Se utiliza en instalaciones trifásicas (400V) para equilibrar cargas.",
    role: "L2",
    system: "Trifásico",
    color: "from-zinc-800 to-black", 
    border: "border-zinc-700/50"
  },
  { 
    type: "Fase (L3)", 
    label: "Gris", 
    desc: "Tercer conductor activo. Imprescindible en motores trifásicos y grandes instalaciones.",
    role: "L3",
    system: "Trifásico",
    color: "from-slate-500 to-slate-700", 
    border: "border-slate-600/50"
  },
  { 
    type: "Neutro (N)", 
    label: "Azul", 
    desc: "Conductor de retorno. Permite el cierre del circuito y compensa desequilibrios.",
    role: "N",
    system: "Universal",
    color: "from-blue-500 to-blue-700", 
    border: "border-blue-400/50"
  },
  { 
    type: "Protección (PE)", 
    label: "Amarillo-Verde", 
    desc: "Conductor de seguridad. Conecta las masas metálicas a tierra para evitar electrocuciones.",
    role: "PE / Tierra",
    system: "Seguridad",
    color: "bg-[linear-gradient(90deg,#22c55e_0%,#eab308_25%,#22c55e_50%,#eab308_75%,#22c55e_100%)]", 
    border: "border-green-600/50"
  },
];

export default function Conductors() {
  const [selectedCable, setSelectedCable] = useState(cableColors[0]);
  const [calcPower, setCalcPower] = useState(3000);
  const [calcLength, setCalcLength] = useState(20);
  const [calcSection, setCalcSection] = useState(2.5);

  const calculateCDT = () => {
    // Formula mono: e = (2 * P * L) / (gamma * S * U)
    // gamma for Cu at 70ºC = 48
    const gamma = 48;
    const U = 230;
    const e = (2 * calcPower * calcLength) / (gamma * calcSection * U);
    const percent = (e / U) * 100;
    return { volts: e.toFixed(2), percent: percent.toFixed(2) };
  };

  const cdt = calculateCDT();
  const isCdtValid = parseFloat(cdt.percent) <= 3;

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-12">
      <div>
        <nav className="text-xs text-cyan-500 font-mono mb-1 uppercase tracking-widest">Módulo 03 &gt; Componentes</nav>
        <h1 className="text-3xl font-bold tracking-tight text-white">2. Conductores y Cables</h1>
        <p className="mt-2 text-slate-400">Tipos de conductores, código de colores REBT y criterios de selección por sección.</p>
      </div>

      {/* CÓDIGO DE COLORES PREMIUM */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <Zap className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Código de Colores Reglamentario</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          <div className="xl:col-span-5 space-y-3">
            {cableColors.map((cable, idx) => (
              <motion.div 
                key={idx}
                onMouseEnter={() => setSelectedCable(cable)}
                whileHover={{ x: 10 }}
                className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  selectedCable.label === cable.label 
                    ? "bg-slate-800/40 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.1)] ring-1 ring-cyan-500/20" 
                    : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`relative w-16 h-5 rounded-full border shadow-lg overflow-hidden ${cable.color.includes('bg-') ? cable.color : 'bg-gradient-to-r ' + cable.color} ${cable.border}`}>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black/30" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-200 text-sm group-hover:text-white transition-colors">{cable.type}</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">{cable.label}</div>
                  </div>
                </div>
                <div className={`text-[10px] font-mono px-2 py-1 rounded bg-slate-950 border border-slate-800 ${selectedCable.label === cable.label ? "text-cyan-400" : "text-slate-500"}`}>
                  {cable.role}
                </div>
              </motion.div>
            ))}
            
            <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-all" />
              <div className="flex gap-4 items-start relative z-10">
                <Info className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="text-red-400 font-bold mb-1 uppercase tracking-tighter text-xs">Nota: Corriente Continua (CC)</div>
                  <p className="text-slate-400 leading-relaxed text-xs">
                    Para circuitos de continua (baterías, solar), se utiliza el <span className="text-red-500 font-bold">Rojo</span> para el polo positivo (+) y el <span className="text-slate-200 font-bold underline">Negro</span> para el polo negativo (-).
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="xl:col-span-7 h-full min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCable.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full"
              >
                <Card className="h-full bg-slate-900/80 backdrop-blur-xl border-slate-800 shadow-2xl relative overflow-hidden group">
                  <div className={`absolute top-0 left-0 w-1 h-full ${selectedCable.color.includes('bg-') ? selectedCable.color : 'bg-gradient-to-b ' + selectedCable.color} opacity-50`} />
                  
                  <CardContent className="p-8 space-y-8">
                    {/* Visual Preview */}
                    <div className="relative flex justify-center py-12">
                      <div className={`absolute inset-0 ${selectedCable.color.includes('bg-') ? selectedCable.color : 'bg-gradient-to-r ' + selectedCable.color} opacity-5 blur-[100px] transition-all`} />
                      
                      {/* Realistic Cable Rendering */}
                      <div className="relative z-10">
                        <div className={`w-64 h-16 rounded-full border-2 relative shadow-2xl overflow-hidden ${selectedCable.color.includes('bg-') ? selectedCable.color : 'bg-gradient-to-r ' + selectedCable.color} ${selectedCable.border}`}>
                          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black/40" />
                          
                          {/* Inner Copper core peek */}
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#b87333] rounded-l-full border-l-2 border-orange-900/30 shadow-inner flex items-center">
                             <div className="w-full h-1 bg-white/20" />
                          </div>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-3 bg-black/40 rounded-full blur-md" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="text-3xl font-black text-white tracking-tight">{selectedCable.type}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">{selectedCable.label}</span>
                            <span className="w-1 h-1 bg-slate-700 rounded-full" />
                            <span className="text-slate-500 text-xs">{selectedCable.system}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Identificación</div>
                          <div className="bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 text-xl font-mono font-black text-white">
                            {selectedCable.role}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                          <div className="flex items-center gap-2 text-cyan-400 mb-2">
                            <Info className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Función Técnica</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {selectedCable.desc}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                          <div className="flex items-center gap-2 text-emerald-400 mb-2">
                            <ShieldCheck className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Normativa REBT</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Uso obligatorio según <span className="text-white font-bold">ITC-BT-19</span> para instalaciones interiores de baja tensión.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* GALERÍA DE ESCENARIOS REALES */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          <Info className="w-5 h-5 text-cyan-400" /> Ejemplos y Escenarios Reales de Circuitos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: "C1", title: "Iluminación", icon: "💡", example: "Máximo 30 puntos de luz (downlights, lámparas) por circuito.", detail: "Usa cable de 1.5mm² y PIA de 10A." },
            { id: "C2", title: "Uso General", icon: "🔌", example: "Máximo 20 tomas de corriente (TV, cargadores, PC).", detail: "Usa cable de 2.5mm² y PIA de 16A." },
            { id: "C3", title: "Cocina y Horno", icon: "🍳", example: "Alimenta la placa vitrocerámica y el horno eléctrico.", detail: "Sección de 6mm² para aguantar picos de 25A." },
            { id: "C4", title: "Lavado y Termo", icon: "🧺", example: "Lavadora, lavavajillas y termo eléctrico (calentador).", detail: "Sección de 4mm² con PIA de 20A." },
            { id: "C5", title: "Baño y Auxiliar", icon: "🚿", example: "Tomas del baño y encima de la encimera de cocina.", detail: "Protección especial para zonas húmedas (2.5mm²)." },
            { id: "C9", title: "Climatización", icon: "❄️", example: "Unidades exteriores de aire acondicionado o Split.", detail: "Circuito independiente de 6mm² y 25A." },
            { id: "C10", title: "Secadora", icon: "👕", example: "Toma exclusiva para secadora de ropa independiente.", detail: "Igual que C2 pero dedicado (2.5mm²)." },
            { id: "C12", title: "Vehículo Eléctrico", icon: "🚗", example: "Punto de recarga en garaje (Wallbox).", detail: "Según longitud, puede requerir 4mm² o 6mm²." },
          ].map((item) => (
            <Card key={item.id} className="bg-slate-900/40 border-slate-800 hover:border-cyan-500/30 transition-all group overflow-hidden">
              <div className="absolute top-0 right-0 p-2 text-2xl opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                {item.icon}
              </div>
              <CardContent className="p-4">
                <div className="text-cyan-500 font-black text-xl mb-1">{item.id}</div>
                <div className="text-white font-bold text-sm mb-2">{item.title}</div>
                <p className="text-[11px] text-slate-400 mb-3 leading-tight">{item.example}</p>
                <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
                  {item.detail}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
          <Table2 className="w-5 h-5 text-emerald-400" /> Selección de Sección por Circuito (ITC-BT-25)
        </h2>
        <p className="text-sm text-slate-400 mb-4">Secciones mínimas y protecciones para Electrificación Básica (5.750 W) y Elevada (9.200 W) según la ITC-BT-25.</p>
        <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-950/60">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-[10px] text-slate-400 uppercase bg-slate-900 border-b border-slate-700 font-mono tracking-widest">
              <tr>
                <th className="px-4 py-3">Circuito</th>
                <th className="px-4 py-3 text-center">Sección (mm²)</th>
                <th className="px-4 py-3 text-center">PIA (A)</th>
                <th className="px-4 py-3">Uso típico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {[
                { circuit: "C1 — Iluminación", section: "1.5", pia: "10", use: "Lámparas, downlights, tiras LED", type: "Básica", color: "text-yellow-400" },
                { circuit: "C2 — Enchufes", section: "2.5", pia: "16", use: "Tomas uso general (salón, dormitorios)", type: "Básica", color: "text-cyan-400" },
                { circuit: "C3 — Cocina / Horno", section: "6", pia: "25", use: "Cocina eléctrica y horno. Base 25A.", type: "Básica", color: "text-orange-400" },
                { circuit: "C4 — Lavadora/Lavavajillas", section: "4", pia: "20", use: "Grandes electrodomésticos (lavadora, lavavajillas, termo)", type: "Básica", color: "text-purple-400" },
                { circuit: "C5 — Baño / Cocina aux.", section: "2.5", pia: "16", use: "Tomas húmedas y encimeras cocina", type: "Básica", color: "text-blue-400" },
                { circuit: "C6 — Adicional C1", section: "1.5", pia: "10", use: "Iluminación adicional (si >30 puntos)", type: "Elevada", color: "text-yellow-600" },
                { circuit: "C7 — Adicional C2", section: "2.5", pia: "16", use: "Enchufes adicionales (si >20 tomas)", type: "Elevada", color: "text-cyan-600" },
                { circuit: "C8 — Calefacción", section: "6", pia: "25", use: "Sistemas de calefacción eléctrica", type: "Elevada", color: "text-red-400" },
                { circuit: "C9 — Aire Acondicionado", section: "6", pia: "25", use: "Sistemas de climatización", type: "Elevada", color: "text-emerald-400" },
                { circuit: "C10 — Secadora", section: "2.5", pia: "16", use: "Secadora independiente", type: "Elevada", color: "text-pink-400" },
                { circuit: "C11 — Domótica", section: "1.5", pia: "10", use: "Sistemas de automatización y seguridad", type: "Elevada", color: "text-indigo-400" },
                { circuit: "C12 — Vehículo Eléctrico", section: "4 / 6", pia: "16 / 32", use: "Punto de recarga (ITC-BT-52)", type: "Elevada", color: "text-teal-400" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors border-b border-slate-800/50">
                  <td className={`px-4 py-3 font-bold ${row.color}`}>
                    <div className="flex flex-col">
                      <span>{row.circuit}</span>
                      <span className={`text-[8px] uppercase tracking-tighter ${row.type === 'Elevada' ? 'text-amber-500' : 'text-slate-500'}`}>{row.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded font-bold text-white whitespace-nowrap">{row.section}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-white font-bold">{row.pia}A</td>
                  <td className="px-4 py-3 text-slate-400 text-xs leading-tight">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* NOMENCLATURA DE CABLES */}
      <section>
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-cyan-400" /> Designación de Cables (Nomenclatura)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { code: "H07Z1-K", breakdown: [["H", "Armonizado"], ["07", "450/750 V"], ["Z1", "LSZH (Libre halógenos)"], ["K", "Flexible"]], use: "Interiores de vivienda. Obligatorio en pública concurrencia.", color: "border-cyan-700 bg-cyan-950/10" },
            { code: "RZ1-K 0.6/1kV", breakdown: [["R", "Reticulado (XLPE)"], ["Z1", "LSZH"], ["0.6/1kV", "Tensión Industrial"], ["K", "Flexible"]], use: "Derivaciones individuales y acometidas. Muy resistente.", color: "border-purple-700 bg-purple-950/10" },
            { code: "RVFV 0.6/1kV", breakdown: [["R", "Reticulado"], ["V", "PVC"], ["F", "Armadura Flejes Acero"], ["V", "PVC"]], use: "Cable armado para instalaciones enterradas y protección contra golpes/roedores.", color: "border-orange-700 bg-orange-950/10" },
            { code: "RZ1FZ1-K", breakdown: [["R", "XLPE"], ["Z1", "LSZH"], ["F", "Armadura Hilos Acero"], ["Z1", "LSZH"]], use: "Armado libre de halógenos. Pública concurrencia.", color: "border-blue-700 bg-blue-950/10" },
            { code: "RZ1MAZ1-K", breakdown: [["MA", "Armadura ALUMINIO"], ["Z1", "Doble LSZH"]], use: "Unipolar armado. El aluminio evita corrientes inducidas (Efecto Foucault).", color: "border-emerald-700 bg-emerald-950/10" },
          ].map((cable) => (
            <Card key={cable.code} className={`${cable.color} border`}>
              <CardContent className="pt-4 pb-4 px-5">
                <div className="font-mono font-black text-xl text-white mb-3">{cable.code}</div>
                <div className="space-y-1 mb-3">
                  {cable.breakdown.map(([code, desc]) => (
                    <div key={code} className="flex gap-2 text-xs">
                      <span className="font-mono font-bold text-cyan-400 w-16 shrink-0">{code}</span>
                      <span className="text-slate-400">{desc}</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-slate-300 bg-slate-900/50 rounded-lg p-2 border border-slate-700/40">{cable.use}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* DIÁMETROS COMPARATIVOS */}
      <section>
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-orange-400" /> Diámetros Exteriores: Estándar vs Armado
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-950/60">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-[10px] text-slate-400 uppercase bg-slate-900 border-b border-slate-700 font-mono tracking-widest">
              <tr>
                <th className="px-4 py-3">Sección (mm²)</th>
                <th className="px-4 py-3 text-center">RZ1-K (mm)</th>
                <th className="px-4 py-3 text-center">Armado (mm)</th>
                <th className="px-4 py-3 text-center">Incremento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {[
                { sec: "3 x 2.5", std: 10.2, arm: 14.8 },
                { sec: "3 x 6", std: 12.8, arm: 17.5 },
                { sec: "4 x 16", std: 20.5, arm: 26.5 },
                { sec: "4 x 25", std: 25.0, arm: 31.0 },
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3 font-bold text-slate-200">{row.sec}</td>
                  <td className="px-4 py-3 text-center text-cyan-400">{row.std.toFixed(1)}</td>
                  <td className="px-4 py-3 text-center text-orange-400">{row.arm.toFixed(1)}</td>
                  <td className="px-4 py-3 text-center text-slate-500">~{(((row.arm - row.std) / row.std) * 100).toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CALCULADORA DE CAÍDA DE TENSIÓN */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          <Activity className="w-5 h-5 text-orange-400" /> Simulador de Caída de Tensión (CDT)
        </h2>
        <Card className="bg-slate-900 border-slate-800 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="p-6 space-y-6 lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Potencia del Circuito (W)</label>
                    <div className="relative">
                      <input 
                        type="range" min="100" max="9200" step="100" 
                        value={calcPower} onChange={(e) => setCalcPower(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                      <div className="flex justify-between mt-2 font-mono text-xs">
                        <span className="text-slate-500">100W</span>
                        <span className="text-cyan-400 font-bold">{calcPower}W</span>
                        <span className="text-slate-500">9.2kW</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Longitud de Línea (m)</label>
                    <div className="relative">
                      <input 
                        type="range" min="1" max="100" step="1" 
                        value={calcLength} onChange={(e) => setCalcLength(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                      <div className="flex justify-between mt-2 font-mono text-xs">
                        <span className="text-slate-500">1m</span>
                        <span className="text-cyan-400 font-bold">{calcLength}m</span>
                        <span className="text-slate-500">100m</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sección del Conductor (mm²)</label>
                  <div className="flex flex-wrap gap-2">
                    {[1.5, 2.5, 4, 6, 10, 16].map((s) => (
                      <button
                        key={s}
                        onClick={() => setCalcSection(s)}
                        className={`px-4 py-2 rounded-lg border text-xs font-mono transition-all ${
                          calcSection === s 
                            ? "bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-500/20" 
                            : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                        }`}
                      >
                        {s} mm²
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-6 flex flex-col justify-center items-center border-l border-slate-800 space-y-6">
                <div className="text-center">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Caída Estimada</div>
                  <motion.div 
                    key={cdt.volts}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`text-4xl font-black font-mono ${isCdtValid ? "text-emerald-400" : "text-red-400"}`}
                  >
                    {cdt.percent}%
                  </motion.div>
                  <div className="text-xs text-slate-500 mt-1 font-mono">({cdt.volts} V)</div>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500">
                    <span>Estado REBT</span>
                    <span className={isCdtValid ? "text-emerald-500" : "text-red-500"}>
                      {isCdtValid ? "APTO (≤ 3%)" : "NO APTO (> 3%)"}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(parseFloat(cdt.percent) * 33.3, 100)}%` }}
                      className={`h-full transition-colors duration-500 ${
                        isCdtValid ? "bg-emerald-500" : "bg-red-500"
                      }`}
                    />
                  </div>
                </div>

                {!isCdtValid && (
                  <div className="flex items-center gap-2 p-3 bg-red-950/20 border border-red-900/30 rounded-lg text-[10px] text-red-300">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>La sección es insuficiente. Aumenta mm² o reduce la longitud para cumplir la ITC-BT-19.</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CPR CLASIFICACIÓN */}
      <section>
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 mb-4">Clasificación CPR (Seguridad frente al Fuego)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-emerald-950/20 border-emerald-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-400 text-lg">Cca-s1b,d1,a1</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-slate-400">
              Máxima seguridad. Obligatorio en hospitales, cines, colegios y locales de pública concurrencia. No propaga llama.
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-200 text-lg">Eca</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-slate-400">
              Seguridad básica. Uso general en viviendas y locales sin riesgo especial donde no se exija LSZH.
            </CardContent>
          </Card>
          <Card className="bg-red-950/20 border-red-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-400 text-lg">Fca</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-slate-400">
              Sin clasificación. No apto para instalación fija en edificación según el reglamento europeo CPR.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
