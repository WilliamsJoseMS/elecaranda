import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Card";
import { motion, AnimatePresence } from "motion/react";
import { Table2, BookMarked } from "lucide-react";

const cableColors = [
  { type: "Fase (CA activa)", color: "bg-stone-800", bgColor: "bg-stone-100", textColor: "text-stone-800", label: "Negro", desc: "Corriente Activa" },
  { type: "Fase (CA activa)", color: "bg-amber-800", bgColor: "bg-amber-100", textColor: "text-amber-800", label: "Marrón", desc: "Corriente Activa" },
  { type: "Fase (CA activa)", color: "bg-slate-500", bgColor: "bg-slate-100", textColor: "text-slate-800", label: "Gris", desc: "Corriente Activa" },
  { type: "Neutro", color: "bg-blue-500", bgColor: "bg-blue-100", textColor: "text-blue-800", label: "Azul", desc: "Retorno de corriente" },
  { type: "Protección (Tierra)", color: "bg-gradient-to-r from-green-500 via-yellow-400 to-green-500 background-size-200", bgColor: "bg-green-50", textColor: "text-green-800", label: "Amarillo-Verde", desc: "Derivación a tierra" },
];

export default function Conductors() {
  const [selectedCable, setSelectedCable] = useState(cableColors[0]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <nav className="text-xs text-cyan-500 font-mono mb-1 uppercase tracking-widest">Módulo 03 &gt; Componentes</nav>
        <h1 className="text-3xl font-bold tracking-tight text-white">2. Conductores y Cables</h1>
        <p className="mt-2 text-slate-400">Tipos, aislamiento y código de colores según el REBT.</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 mb-4">Código de Colores (Corriente Alterna)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            {cableColors.map((cable, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setSelectedCable(cable)}
                className={`flex items-center space-x-4 p-3 rounded-lg border cursor-pointer transition-all ${selectedCable.label === cable.label ? "ring-1 ring-cyan-500 border-cyan-500 bg-slate-800/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]" : "border-slate-800 hover:bg-slate-800/30"}`}
              >
                <div className={`w-12 h-4 rounded-full shadow-inner border border-slate-700 ${cable.color}`} />
                <div className="flex-1">
                  <div className="font-medium text-slate-200">{cable.type}</div>
                  <div className="text-xs text-slate-500">{cable.label}</div>
                </div>
              </div>
            ))}
            <p className="text-sm text-slate-400 italic mt-4 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <span className="text-cyan-400 font-bold mr-1">NOTA:</span> En corriente continua (CC), se utilizará el color rojo como positivo (+) y el negro como negativo (-).
            </p>
          </div>
          
          <div className="flex justify-center h-full">
            <Card className="w-full max-w-sm border-slate-800 bg-slate-900/50">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCable.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center space-y-4"
                  >
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center shadow-lg border-4 border-slate-800 ${selectedCable.color}`}>
                      <div className="w-20 h-20 bg-copper rounded-full bg-[#b87333] border-2 border-orange-900/20 shadow-inner flex items-center justify-center">
                        {/* Copper wire texture visual */}
                        <div className="w-10 h-10 rounded-full border border-[#d68a48] opacity-50" />
                      </div>
                    </div>
                    <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${selectedCable.bgColor} ${selectedCable.textColor}`}>
                      {selectedCable.label}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedCable.type}</h3>
                      <p className="text-slate-400 mt-1">{selectedCable.desc}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cross-section selection guide */}
      <section>
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
          <Table2 className="w-5 h-5 text-emerald-400" /> Selección de Sección por Circuito (REBT / ITC-BT-25)
        </h2>
        <p className="text-sm text-slate-400 mb-4">La sección mínima de los conductores viene determinada por la intensidad máxima admisible y la caída de tensión. Vivienda estándar electrificación básica (5.750 W).</p>
        <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-950/60">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-[10px] text-slate-400 uppercase bg-slate-900 border-b border-slate-700 font-mono tracking-widest">
              <tr>
                <th className="px-4 py-3">Circuito</th>
                <th className="px-4 py-3 text-center">Sección (mm²)</th>
                <th className="px-4 py-3 text-center">PIA (A)</th>
                <th className="px-4 py-3 text-center">Puntos / Carga</th>
                <th className="px-4 py-3">Uso típico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {[
                { circuit: "C1 — Iluminación", section: "1.5", pia: "10", points: "30 pts", use: "Lámparas, downlights, tiras LED", color: "text-yellow-400" },
                { circuit: "C2 — Base 16A (enchufes)", section: "2.5", pia: "16", points: "20 bases", use: "Tomas uso general (salón, dormitorios)", color: "text-cyan-400" },
                { circuit: "C3 — Cocina / horno", section: "6", pia: "25", points: "2 bases", use: "Cocina eléctrica y horno. Base 25A.", color: "text-orange-400" },
                { circuit: "C4 — Lavadora / lavavajillas", section: "4", pia: "20", points: "3 bases", use: "Grandes electrodomésticos (16A/toma)", color: "text-purple-400" },
                { circuit: "C5 — Baño / cocina (auxiliar)", section: "2.5", pia: "16", points: "6 bases", use: "Tomas húmedas (con diferencial 30mA)", color: "text-blue-400" },
                { circuit: "C7 — Aire acondicionado", section: "2.5", pia: "25", points: "—", use: "Split o multisplit (circuito exclusivo)", color: "text-emerald-400" },
                { circuit: "C8 — Calentador eléctrico", section: "2.5", pia: "25", points: "—", use: "Termo eléctrico / calentador de agua", color: "text-slate-300" },
                { circuit: "C9 — Aire acond. adicional", section: "6", pia: "25", points: "—", use: "Instalaciones de electrif. elevada", color: "text-teal-400" },
              ].map((row, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-slate-800/30 transition-colors group"
                >
                  <td className={`px-4 py-3 font-bold ${row.color}`}>{row.circuit}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded font-bold text-white">{row.section}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-white font-bold">{row.pia}A</td>
                  <td className="px-4 py-3 text-center text-slate-400">{row.points}</td>
                  <td className="px-4 py-3 text-slate-400 group-hover:text-slate-200 transition-colors">{row.use}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 italic mt-2">Circuitos según ITC-BT-25 para electrificación básica. Para electrificación elevada (9.200 W) se añaden C6, C7, C8 y C9.</p>
      </section>

      {/* Designaciones de cable */}
      <section>
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-cyan-400" /> Designación de Cables (Nomenclatura)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { code: "H07Z1-K", breakdown: [["H", "Armonizado (europeo)"], ["07", "Tensión 450/750 V"], ["Z1", "Poliolefina libre de halógenos (LSZH)"], ["K", "Flexible para instalación fija"]], use: "El más usado en instalaciones interiores de vivienda. Libre de halógenos. Obligatorio en pública concurrencia.", color: "border-cyan-700 bg-cyan-950/10" },
            { code: "RZ1-K 0.6/1kV", breakdown: [["R", "Polietileno reticulado (XLPE)"], ["Z1", "LSZH libre de halógenos"], ["0.6/1kV", "Tensión asignada fase/fase"], ["K", "Flexible multiconductor"]], use: "Para derivaciones individuales y acometidas. Muy resistente mecánica y térmicamente.", color: "border-purple-700 bg-purple-950/10" },
            { code: "ES07Z1-K", breakdown: [["ES", "Norma española (no armonizado)"], ["07", "Tensión 450/750 V"], ["Z1", "Libre de halógenos"], ["K", "Flexible"]], use: "Similar al H07Z1 pero bajo norma española UNE. Apto para instalaciones interiores.", color: "border-emerald-700 bg-emerald-950/10" },
            { code: "VV 0.6/1kV", breakdown: [["V", "Aislamiento PVC"], ["V", "Cubierta PVC"], ["0.6/1kV", "Tensión asignada"], ["—", "Conductor rígido"]], use: "Uso general en canalizaciones protegidas. Menor coste, no libre de halógenos. No usar en pública concurrencia.", color: "border-slate-700 bg-slate-800/20" },
            { code: "RVFV 0.6/1kV", breakdown: [["R", "Polietileno reticulado"], ["V", "PVC (cubierta asiento)"], ["F", "Flejes de acero (ARMADURA)"], ["V", "PVC (cubierta exterior)"]], use: "Cable armado con flejes de acero. Alta protección contra roedores y golpes. Instalaciones enterradas.", color: "border-orange-700 bg-orange-950/10" },
            { code: "RZ1FZ1-K", breakdown: [["R", "Reticulado (XLPE)"], ["Z1", "Libre de halógenos"], ["F", "Hilos de acero (ARMADURA)"], ["Z1", "Libre de halógenos"]], use: "Cable armado libre de halógenos. Máxima protección mecánica y seguridad frente al fuego. Pública concurrencia.", color: "border-blue-700 bg-blue-950/10" },
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

      <section>
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 mb-4 mt-4">Clasificación CPR (Construcción)</h2>
        <p className="text-sm text-slate-400 mb-6">El Reglamento europeo CPR establece clasificaciones para los cables frente al fuego.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-red-950/20 border-red-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-400 text-lg">B2 / C</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-red-200/70">
              Máximas prestaciones frente al fuego. No propagan incendio ni emiten gases tóxicos/corrosivos. Local Pública Concurrencia (Cca-s1b,d1,a1).
            </CardContent>
          </Card>
          
          <Card className="bg-green-950/20 border-green-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-green-400 text-lg">Libres de Halógenos</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-green-200/70">
              Obligatorios en derivaciones individuales (ITC-BT 15) y locales de pública concurrencia (ITC-BT 28). AS / AS+ (Alta Seguridad).
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2 bg-slate-800/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-200 text-lg">Designación (Ejemplo: H07Z1-K)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-400 space-y-1">
              <p><b className="text-cyan-400">H:</b> Armonizado (Norma europea)</p>
              <p><b className="text-cyan-400">07:</b> Tensión asignada 450/750V</p>
              <p><b className="text-cyan-400">Z1:</b> Poliolefina termoplástica libre de halógenos</p>
              <p><b className="text-cyan-400">K:</b> Flexible para instalación fija</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
