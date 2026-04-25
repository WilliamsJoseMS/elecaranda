import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Card";
import { GitCommitHorizontal, CalendarDays, BarChart4, Calculator, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const ganttTasks = [
  { name: "1. Replanteo y mediciones", start: 0, duration: 2, color: "bg-cyan-500", critical: true },
  { name: "2. Rozas y paso de tubería", start: 2, duration: 4, color: "bg-cyan-400", critical: true },
  { name: "3. Cajas de registro", start: 3, duration: 2, color: "bg-blue-400", critical: false },
  { name: "4. Tendido de cables", start: 6, duration: 3, color: "bg-cyan-500", critical: true },
  { name: "5. Montaje de cuadro eléctrico", start: 6, duration: 2, color: "bg-purple-400", critical: false },
  { name: "6. Conexión y conexionado", start: 9, duration: 2, color: "bg-cyan-500", critical: true },
  { name: "7. Pruebas y certificación", start: 11, duration: 1, color: "bg-emerald-400", critical: true },
];
const TOTAL_DAYS = 12;

const caseStudyTasks = [
  { id: "A", name: "Montaje Cuadro", duration: 1, dep: "-", es: 0, ef: 1, ls: 0, lf: 1, h: 0, critical: true },
  { id: "B", name: "Canalizaciones", duration: 3, dep: "A", es: 1, ef: 4, ls: 1, lf: 4, h: 0, critical: true },
  { id: "C", name: "Cableado", duration: 4, dep: "A", es: 1, ef: 5, ls: 4, lf: 8, h: 3, critical: false },
];

export default function Planning() {
  const [pertOptimist, setPertOptimist] = useState<number | "">("");
  const [pertMost, setPertMost] = useState<number | "">("");
  const [pertPessimist, setPertPessimist] = useState<number | "">("");
  const [pertResult, setPertResult] = useState<{ te: number; sigma: number; variance: number } | null>(null);

  const calcPERT = () => {
    const o = Number(pertOptimist);
    const m = Number(pertMost);
    const p = Number(pertPessimist);
    if (!pertOptimist || !pertMost || !pertPessimist) return;
    const te = (o + 4 * m + p) / 6;
    const sigma = (p - o) / 6;
    setPertResult({ te, sigma, variance: sigma * sigma });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-10">
      <div>
        <nav className="text-xs text-cyan-500 font-mono mb-1 uppercase tracking-widest">Módulos 03 &amp; 04 &gt; Organización y Planificación</nav>
        <h1 className="text-3xl font-bold tracking-tight text-white">6. Planificación de Proyectos</h1>
        <p className="mt-2 text-slate-400">Diagramas de GANTT, redes de precedencias PDM/ADM, técnica PERT y gestión de recursos.</p>
      </div>

      {/* GANTT Interactive */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          <BarChart4 className="w-5 h-5 text-purple-400" /> Diagrama de GANTT — Instalación Tipo
        </h2>
        <Card className="bg-slate-900 border-slate-800 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-[700px] p-6">
                {/* Header days */}
                <div className="flex mb-2 ml-48">
                  {Array.from({ length: TOTAL_DAYS }).map((_, i) => (
                    <div key={i} className="flex-1 text-center text-[10px] text-slate-500 font-mono border-l border-slate-800 first:border-l-0">D{i + 1}</div>
                  ))}
                </div>

                {/* Task rows */}
                <div className="space-y-2">
                  {ganttTasks.map((task, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.07 }}
                      className="flex items-center gap-2 group"
                    >
                      <div className="w-48 shrink-0 text-xs text-slate-300 text-right pr-3 font-medium group-hover:text-white transition-colors leading-tight">
                        {task.name}
                        {task.critical && <span className="ml-1 text-[9px] text-red-400 font-bold">●</span>}
                      </div>
                      <div className="flex-1 flex relative h-8 bg-slate-950 rounded border border-slate-800">
                        {Array.from({ length: TOTAL_DAYS }).map((_, i) => (
                          <div key={i} className="flex-1 border-l border-slate-800/50 first:border-l-0" />
                        ))}
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: idx * 0.07 + 0.2, duration: 0.5, ease: "easeOut" }}
                          style={{
                            position: "absolute",
                            left: `${(task.start / TOTAL_DAYS) * 100}%`,
                            width: `${(task.duration / TOTAL_DAYS) * 100}%`,
                            top: "4px",
                            bottom: "4px",
                            transformOrigin: "left",
                          }}
                          className={`${task.color} rounded shadow-sm flex items-center px-2 ${task.critical ? "shadow-[0_0_8px_rgba(6,182,212,0.4)]" : ""}`}
                        >
                          <span className="text-[10px] font-bold text-slate-900 truncate">{task.duration}d</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center gap-6 mt-5 pt-4 border-t border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.6)]" /> Tarea en Ruta Crítica <span className="text-red-400 ml-1">●</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-purple-400" /> Con holgura (no crítica)</div>
                  <div className="ml-auto font-mono text-slate-500">Duración total: <strong className="text-white">12 días</strong></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <p className="text-xs text-slate-500 italic">Las tareas marcadas con ● pertenecen a la ruta crítica. Un retraso en cualquiera de ellas extiende el proyecto completo.</p>
      </section>

      {/* CPM Theory Card */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          <GitCommitHorizontal className="w-5 h-5 text-red-400" /> Método del Camino Crítico (CPM)
        </h2>
        <Card className="bg-slate-900 border-red-900/30 overflow-hidden">
          <div className="bg-red-500/10 p-4 border-b border-red-900/20">
            <p className="text-sm text-red-300">
              <strong className="text-white">Definición (Pág 81):</strong> El camino crítico es la secuencia de tareas que determina la duración mínima del proyecto. Si una de estas tareas se retrasa, el proyecto completo se retrasa.
            </p>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-cyan-400 font-bold text-xs uppercase tracking-tighter">ES / EF</div>
                <p className="text-[11px] text-slate-400 italic">Early Start / Early Finish</p>
                <p className="text-xs text-slate-300">Lo más pronto que puede empezar/terminar una tarea según sus predecesoras.</p>
              </div>
              <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-purple-400 font-bold text-xs uppercase tracking-tighter">LS / LF</div>
                <p className="text-[11px] text-slate-400 italic">Late Start / Late Finish</p>
                <p className="text-xs text-slate-300">Lo más tarde que puede empezar/terminar sin retrasar la fecha final del proyecto.</p>
              </div>
              <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-red-900/30">
                <div className="text-red-400 font-bold text-xs uppercase tracking-tighter">Holgura (H = LS - ES)</div>
                <p className="text-[11px] text-slate-400 italic">Slack Time</p>
                <p className="text-xs text-slate-300">Si <span className="font-bold text-white">H = 0</span>, la tarea es <strong className="text-red-400">CRÍTICA</strong>.</p>
              </div>
            </div>

            <h3 className="text-white font-bold text-sm mb-4">Ejemplo de Cálculo (Matriz de Dependencias - Pág 77)</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-400">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Descripción</th>
                    <th className="px-4 py-3 text-center">Dur.</th>
                    <th className="px-4 py-3 text-center">Dep.</th>
                    <th className="px-4 py-3 text-center">ES</th>
                    <th className="px-4 py-3 text-center">EF</th>
                    <th className="px-4 py-3 text-center">LS</th>
                    <th className="px-4 py-3 text-center">LF</th>
                    <th className="px-4 py-3 text-center">Holgura</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {caseStudyTasks.map(t => (
                    <tr key={t.id} className={`${t.critical ? "bg-red-950/10" : ""}`}>
                      <td className="px-4 py-3 font-bold text-white">{t.id}</td>
                      <td className="px-4 py-3 text-slate-300">{t.name}</td>
                      <td className="px-4 py-3 text-center font-mono">{t.duration}d</td>
                      <td className="px-4 py-3 text-center text-slate-500">{t.dep}</td>
                      <td className="px-4 py-3 text-center font-mono text-cyan-400">{t.es}</td>
                      <td className="px-4 py-3 text-center font-mono text-cyan-400">{t.ef}</td>
                      <td className="px-4 py-3 text-center font-mono text-purple-400">{t.ls}</td>
                      <td className="px-4 py-3 text-center font-mono text-purple-400">{t.lf}</td>
                      <td className={`px-4 py-3 text-center font-bold ${t.h === 0 ? "text-red-500" : "text-emerald-400"}`}>
                        {t.h}d {t.h === 0 && "🔥"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* PDM / ADM Network Diagrams */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          <GitCommitHorizontal className="w-5 h-5 text-cyan-400" /> Redes de Precedencias: PDM vs. ADM
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PDM */}
          <Card className="bg-slate-900 border-slate-800 overflow-hidden">
            <CardHeader className="bg-slate-800/40 border-b border-slate-700 pb-3">
              <CardTitle className="text-cyan-300 text-base">PDM — Activity on Node (AON)</CardTitle>
              <p className="text-xs text-slate-400 mt-1">Cada nodo es una tarea. Las flechas indican dependencias.</p>
            </CardHeader>
            <CardContent className="p-5">
              <div className="bg-slate-950 rounded-xl p-5 flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-20 h-14 bg-slate-800 border-2 border-slate-600 rounded flex flex-col items-center justify-center shadow text-center">
                    <span className="text-[9px] text-slate-500 uppercase">ES=0 EF=2</span>
                    <span className="text-sm font-bold text-white">A (2d)</span>
                    <span className="text-[9px] text-slate-500 uppercase">LS=0 LF=2</span>
                  </div>
                  <div className="h-0.5 w-8 bg-cyan-500 relative shrink-0">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 border-[4px] border-transparent border-l-cyan-500" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="w-20 h-14 bg-cyan-900/30 border-2 border-cyan-500 rounded flex flex-col items-center justify-center text-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                      <span className="text-[9px] text-cyan-400 uppercase font-bold">CRÍTICA</span>
                      <span className="text-sm font-bold text-white">B (5d)</span>
                      <span className="text-[9px] text-cyan-400">H=0</span>
                    </div>
                    <div className="w-20 h-14 bg-slate-800 border-2 border-slate-600 rounded flex flex-col items-center justify-center text-center">
                      <span className="text-[9px] text-slate-500 uppercase">Holgura</span>
                      <span className="text-sm font-bold text-white">C (4d)</span>
                      <span className="text-[9px] text-slate-500">H=1d</span>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="text-xs text-slate-400 mt-4 space-y-1.5 pl-4 list-disc">
                <li>Soporta relaciones <strong className="text-slate-200">FI, FF, II, IF</strong>.</li>
                <li>Es el método más usado en software moderno (MS Project).</li>
              </ul>
            </CardContent>
          </Card>

          {/* ADM */}
          <Card className="bg-slate-900 border-slate-800 overflow-hidden">
            <CardHeader className="bg-slate-800/40 border-b border-slate-700 pb-3">
              <CardTitle className="text-purple-300 text-base">ADM — Activity on Arrow (AOA)</CardTitle>
              <p className="text-xs text-slate-400 mt-1">Las actividades son las flechas; los nodos son eventos.</p>
            </CardHeader>
            <CardContent className="p-5">
              <div className="bg-slate-950 rounded-xl p-5 flex items-center justify-center">
                <svg viewBox="0 0 240 100" className="w-full max-w-xs">
                  <circle cx="20" cy="50" r="12" className="fill-slate-800 stroke-slate-500 stroke-2" />
                  <text x="20" y="53" textAnchor="middle" className="fill-slate-300 text-[10px]" fontSize="10">1</text>
                  
                  <circle cx="100" cy="20" r="12" className="fill-slate-800 stroke-cyan-500 stroke-2" />
                  <text x="100" y="23" textAnchor="middle" className="fill-cyan-300 text-[10px]" fontSize="10">2</text>
                  
                  <circle cx="100" cy="80" r="12" className="fill-slate-800 stroke-slate-500 stroke-2" />
                  <text x="100" y="83" textAnchor="middle" className="fill-slate-300 text-[10px]" fontSize="10">3</text>
                  
                  <circle cx="200" cy="50" r="12" className="fill-slate-800 stroke-cyan-500 stroke-2" />
                  <text x="200" y="53" textAnchor="middle" className="fill-cyan-300 text-[10px]" fontSize="10">4</text>

                  <line x1="32" y1="40" x2="88" y2="26" stroke="#22d3ee" strokeWidth="1.5" />
                  <line x1="32" y1="60" x2="88" y2="74" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="112" y1="26" x2="188" y2="44" stroke="#22d3ee" strokeWidth="1.5" />
                  <line x1="112" y1="74" x2="188" y2="56" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="100" y1="32" x2="100" y2="68" stroke="#64748b" strokeWidth="1" strokeDasharray="3,2" />
                </svg>
              </div>
              <ul className="text-xs text-slate-400 mt-4 space-y-1.5 pl-4 list-disc">
                <li>Usa <strong className="text-slate-200">actividades ficticias (dummy)</strong> para lógica.</li>
                <li>Solo permite relaciones <strong className="text-slate-200">Fin-Inicio</strong>.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* PERT Calculator */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-emerald-400" /> Calculadora PERT — Duración Esperada
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6 space-y-5">
              <div className="bg-slate-950 border border-slate-700 rounded-xl p-4 font-mono text-center space-y-2">
                <div className="text-lg text-white">T<sub>e</sub> = (O + 4·M + P) / 6</div>
                <div className="text-sm text-slate-400">σ = (P − O) / 6 &nbsp;&nbsp; σ² = ((P−O) / 6)²</div>
              </div>
              <p className="text-sm text-slate-400">La técnica PERT (Program Evaluation and Review Technique) estima la duración esperada de una tarea usando tres escenarios.</p>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Optimista (O)</label>
                  <input type="number" min="0" value={pertOptimist} onChange={e => setPertOptimist(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none font-mono text-sm"
                    placeholder="días" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">Más probable (M)</label>
                  <input type="number" min="0" value={pertMost} onChange={e => setPertMost(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none font-mono text-sm"
                    placeholder="días" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-red-400 uppercase tracking-widest block">Pesimista (P)</label>
                  <input type="number" min="0" value={pertPessimist} onChange={e => setPertPessimist(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-red-500 focus:outline-none font-mono text-sm"
                    placeholder="días" />
                </div>
              </div>

              <button
                onClick={calcPERT}
                disabled={!pertOptimist || !pertMost || !pertPessimist}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold text-sm transition-all tracking-wide uppercase"
              >
                Calcular
              </button>

              {pertResult && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-950/30 border border-emerald-700/50 rounded-xl p-4 font-mono space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Duración esperada (T<sub>e</sub>):</span>
                    <span className="text-emerald-300 font-bold">{pertResult.te.toFixed(2)} días</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Desviación típica (σ):</span>
                    <span className="text-yellow-300 font-bold">± {pertResult.sigma.toFixed(2)} días</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Varianza (σ²):</span>
                    <span className="text-slate-300">{pertResult.variance.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-2 border-t border-emerald-800/40 pt-2">
                    Intervalo al 68%: [{(pertResult.te - pertResult.sigma).toFixed(1)} – {(pertResult.te + pertResult.sigma).toFixed(1)}] días
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader className="border-b border-slate-700 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-600">
                  <CalendarDays className="w-5 h-5 text-emerald-400" />
                </div>
                <CardTitle className="text-lg text-white">Rendimientos y Recursos</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-400 space-y-4">
              <p>El <strong className="text-slate-200">Rendimiento</strong> es la cantidad de trabajo ejecutada por unidad de tiempo (ej. m de tubo/hora, puntos de luz/jornada).</p>
              <div className="overflow-x-auto rounded-lg border border-slate-700">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-800/50 text-slate-400 uppercase">
                    <tr>
                      <th className="px-3 py-2">Actividad</th>
                      <th className="px-3 py-2 text-right">Rendimiento tipo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr><td className="px-3 py-2">Tubo corrugado empotrado</td><td className="px-3 py-2 text-right font-mono">15–25 m/h</td></tr>
                    <tr><td className="px-3 py-2">Cable en tubo instalado</td><td className="px-3 py-2 text-right font-mono">30–50 m/h</td></tr>
                    <tr><td className="px-3 py-2">Montaje de mecanismos</td><td className="px-3 py-2 text-right font-mono">6–10 ud/h</td></tr>
                    <tr><td className="px-3 py-2">Conexionado en cuadro</td><td className="px-3 py-2 text-right font-mono">1–2 h/cuadro</td></tr>
                    <tr><td className="px-3 py-2">Caja de registro</td><td className="px-3 py-2 text-right font-mono">4–6 ud/h</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-amber-950/20 border border-amber-700/30 rounded-lg p-3 flex gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200/80">El calendario de recursos gestiona la disponibilidad de oficiales y herramientas. Antes de cablear hay que esperar a que el albañil cierre las rozas.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Organización de proyectos */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">Fases de Organización del Proyecto</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { num: "01", title: "Visita de obra", desc: "Replanteo inicial: mediciones, situación del edificio, acometida y carga prevista.", color: "border-cyan-800 bg-cyan-950/20", badge: "text-cyan-400" },
            { num: "02", title: "Definición de tareas", desc: "Desglose de la obra en unidades de trabajo (WBS). EDT — Estructura de Desglose de Trabajo.", color: "border-blue-800 bg-blue-950/20", badge: "text-blue-400" },
            { num: "03", title: "Asignación de recursos", desc: "Oficiales, peones, subcontratas y herramientas. Plan de cargas de trabajo.", color: "border-purple-800 bg-purple-950/20", badge: "text-purple-400" },
            { num: "04", title: "Plan de Calidad", desc: "Protocolos de inspección, registros de pruebas y control de no conformidades.", color: "border-emerald-800 bg-emerald-950/20", badge: "text-emerald-400" },
          ].map((item) => (
            <Card key={item.num} className={`${item.color} border`}>
              <CardContent className="pt-5 pb-4 px-4 space-y-2">
                <div className={`text-3xl font-black ${item.badge} opacity-40`}>{item.num}</div>
                <h3 className="font-bold text-white text-sm">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tipos de dependencias */}
      <section>
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 mb-4">Tipos de Dependencias en PDM</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { code: "FI", name: "Fin → Inicio", desc: "La sucesora no empieza hasta que la predecesora termina. La más común.", color: "text-cyan-400" },
            { code: "II", name: "Inicio → Inicio", desc: "Las dos tareas comienzan al mismo tiempo (o con un lag).", color: "text-purple-400" },
            { code: "FF", name: "Fin → Fin", desc: "Ambas deben finalizar a la vez. Ej: pruebas finales y redacción del acta.", color: "text-emerald-400" },
            { code: "IF", name: "Inicio → Fin", desc: "La predecesora no puede terminar hasta que la sucesora inicia. Muy infrecuente.", color: "text-orange-400" },
          ].map((dep) => (
            <Card key={dep.code} className="bg-slate-900/60 border-slate-800">
              <CardContent className="pt-4 pb-4 px-4">
                <div className={`text-2xl font-black mb-1 font-mono ${dep.color}`}>{dep.code}</div>
                <div className="text-xs font-bold text-slate-200 mb-1">{dep.name}</div>
                <p className="text-xs text-slate-500">{dep.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
}
