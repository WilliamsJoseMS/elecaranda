import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Card";
import { motion } from "motion/react";
import { Zap, Activity, TrendingDown } from "lucide-react";

export default function Basics() {
  const [voltage, setVoltage] = useState<number | "">("");
  const [current, setCurrent] = useState<number | "">("");
  const [resistance, setResistance] = useState<number | "">("");

  // Caída de tensión calculator state
  const [cdtLength, setCdtLength] = useState<number | "">("");
  const [cdtCurrent, setCdtCurrent] = useState<number | "">("");
  const [cdtSection, setCdtSection] = useState<number | "">(2.5);
  const [cdtPhases, setCdtPhases] = useState<"mono" | "tri">("mono");
  const [cdtResult, setCdtResult] = useState<{ drop: number; dropPct: number; maxAllowed: number; ok: boolean } | null>(null);

  const RESISTIVITY_COPPER = 0.017241; // Ω·mm²/m
  const NOMINAL_VOLTAGE = 230; // V (monofásico)

  const calcCdt = () => {
    const L = Number(cdtLength);
    const I = Number(cdtCurrent);
    const S = Number(cdtSection);
    if (!L || !I || !S) return;
    const k = cdtPhases === "mono" ? 2 : Math.sqrt(3);
    const drop = (k * L * I * RESISTIVITY_COPPER) / S;
    const dropPct = (drop / NOMINAL_VOLTAGE) * 100;
    const maxAllowed = cdtPhases === "mono" ? 3 : 3; // 3% for most circuits (ITC-BT-19)
    setCdtResult({ drop, dropPct, maxAllowed, ok: dropPct <= maxAllowed });
  };

  const calculate = (type: "V" | "I" | "R") => {
    if (type === "V" && current !== "" && resistance !== "") {
      setVoltage(Number(current) * Number(resistance));
    } else if (type === "I" && voltage !== "" && resistance !== "") {
      setCurrent(Number(voltage) / Number(resistance));
    } else if (type === "R" && voltage !== "" && current !== "") {
      setResistance(Number(voltage) / Number(current));
    }
  };

  const clear = () => {
    setVoltage("");
    setCurrent("");
    setResistance("");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <nav className="text-xs text-cyan-500 font-mono mb-1 uppercase tracking-widest">Módulo 03 &gt; Conceptos</nav>
        <h1 className="text-3xl font-bold tracking-tight text-white">1. Conceptos Básicos</h1>
        <p className="mt-2 text-slate-400">Fundamentos de la electricidad, potencia energética y cálculo de circuitos simples.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Formatos de Corriente y Potencia */}
        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">Corriente y Voltaje</h2>
            
            <Card>
              <CardHeader className="bg-slate-800/30">
                <CardTitle className="text-lg flex items-center gap-2"><Zap className="w-5 h-5 text-cyan-400" /> Corriente Continua (CC)</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 text-sm text-slate-400">
                <p>El flujo continuo de electrones a través de un conductor entre dos puntos de distinto potencial. Los electrones siempre circulan en la misma dirección (del polo negativo al positivo, aunque por convenio se considera de positivo a negativo para el análisis de circuitos).</p>
                <div className="mt-8 flex items-center justify-center p-6 bg-slate-950 rounded-xl border border-slate-800 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] overflow-hidden relative">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_20%,rgba(6,182,212,0.1)_50%,transparent_80%)] animate-pulse" />
                  
                  {/* Cable Visual */}
                  <div className="absolute left-[20%] right-[20%] top-1/2 -translate-y-1/2 h-6 bg-slate-800 rounded-full overflow-hidden flex items-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] border border-slate-700">
                    <motion.div 
                      animate={{ x: ["-100%", "400%"] }} 
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="h-full w-32 bg-gradient-to-r from-transparent via-cyan-400 to-white rounded-full shadow-[0_0_25px_cyan]"
                    />
                  </div>

                  <div className="relative w-full flex justify-center items-center text-slate-500 pointer-events-auto mt-4">
                    <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-sm bg-slate-950/80 p-4 rounded-xl border border-slate-800 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] z-10 relative backdrop-blur-sm">
                      <div className="flex items-center gap-6 w-full justify-center">
                        {/* Símbolo de Batería (Normalizado) */}
                        <div className="flex flex-col items-center group">
                          <span className="text-[9px] text-slate-500 font-mono mb-2 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">Símbolo (Bat)</span>
                          <svg viewBox="0 0 100 50" className="h-10 stroke-cyan-400 stroke-[3] fill-none drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                            <line x1="10" y1="25" x2="40" y2="25" />
                            <line x1="40" y1="10" x2="40" y2="40" />
                            <line x1="60" y1="16" x2="60" y2="34" strokeWidth="6" />
                            <line x1="60" y1="25" x2="90" y2="25" />
                            <text x="25" y="15" className="fill-cyan-400 text-[14px] font-bold stroke-none">+</text>
                            <text x="65" y="15" className="fill-cyan-400 text-[14px] font-bold stroke-none">-</text>
                          </svg>
                        </div>
                        {/* Señal Continua */}
                        <div className="flex flex-col items-center border-l border-slate-800 pl-6 group">
                          <span className="text-[9px] text-slate-500 font-mono mb-2 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">Señal Continua</span>
                          <svg viewBox="0 0 150 50" className="w-28 h-10 stroke-cyan-500 fill-none">
                            <line x1="10" y1="40" x2="140" y2="40" className="stroke-slate-600 stroke-1" />
                            <line x1="10" y1="5" x2="10" y2="40" className="stroke-slate-600 stroke-1" />
                            <text x="0" y="18" className="fill-slate-500 text-[10px] stroke-none">V</text>
                            <text x="135" y="48" className="fill-slate-500 text-[10px] stroke-none">t</text>
                            <line x1="10" y1="20" x2="140" y2="20" className="stroke-cyan-400 stroke-[3] drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-slate-800/30">
                <CardTitle className="text-lg flex items-center gap-2"><Activity className="w-5 h-5 text-emerald-400" /> Corriente Alterna (CA)</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 text-sm text-slate-400">
                <p>Corriente eléctrica en la que la magnitud y dirección varían cíclicamente (generalmente forma de onda senoidal). En España, la CA en viviendas es de <strong>230V a 50Hz</strong>. Es ideal para transportar energía a grandes distancias mediante transformadores.</p>
                 <div className="mt-6 overflow-hidden h-28 bg-slate-950 rounded-xl border border-slate-800 relative flex items-center justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
                    <svg viewBox="0 0 500 100" className="w-full h-full stroke-emerald-500 stroke-[4] fill-none drop-shadow-[0_0_8px_rgba(16,185,129,0.9)] opacity-90">
                      {/* Eje X (Línea de tiempo) */}
                      <line x1="0" y1="50" x2="500" y2="50" className="stroke-slate-800 stroke-1 drop-shadow-none" />
                      <motion.path 
                         initial={{ pathLength: 0, pathOffset: 1 }}
                         animate={{ pathLength: 1, pathOffset: 0 }}
                         transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                         d="M 0 50 Q 62.5 0, 125 50 T 250 50 T 375 50 T 500 50" 
                      />
                      <path d="M 0 50 Q 62.5 0, 125 50 T 250 50 T 375 50 T 500 50" className="stroke-slate-700 opacity-50" />
                      <line x1="0" y1="50" x2="500" y2="50" className="stroke-slate-800 stroke-1" strokeDasharray="4 4" />
                    </svg>
                 </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4 pt-4">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">Potencia y Energía</h2>
            <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-orange-900/50 overflow-hidden">
              <div className="h-32 w-full border-b border-slate-800 relative bg-slate-900">
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90 z-10 pointer-events-none"></div>
                 <img 
                   src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1200&auto=format&fit=crop" 
                   alt="Bombilla incandescente iluminando" 
                   className="w-full h-full object-cover opacity-70" 
                   referrerPolicy="no-referrer" 
                   crossOrigin="anonymous" 
                 />
              </div>
              <CardContent className="pt-6 text-sm text-slate-400 space-y-4 relative z-20">
                 <p>La <strong className="text-orange-400">Potencia (P)</strong> es la rapidez con la que se consume la energía. Se mide en Vatios (W).</p>
                 <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center">
                   <div className="text-2xl text-white">P = V × I</div>
                 </div>
                 <p>La <strong className="text-cyan-400">Energía (E)</strong> es la potencia consumida a lo largo de un tiempo. Se factura en Kilovatios-hora (kWh).</p>
                 <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center">
                   <div className="text-2xl text-white">E = P × t</div>
                   <div className="text-xs text-slate-500 mt-2">(t expresado en horas para obtener Wh o kWh)</div>
                 </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Right Column: Calculadora y Circuitos */}
        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">Ley de Ohm</h2>
            <Card>
              <CardHeader className="bg-slate-800/30">
                <CardTitle className="text-lg">Calculadora Interactiva (V = I · R)</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <p className="text-sm text-slate-400 mb-4">Introduce 2 valores y presiona "Calcular" en el valor que falta.</p>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Voltaje (V)</label>
                    <input 
                      type="number" 
                      value={voltage} 
                      onChange={e => setVoltage(e.target.value)} 
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                      placeholder="Voltios"
                    />
                    <button onClick={() => calculate("V")} className="w-full bg-slate-800 text-cyan-400 border border-cyan-900 shadow-[0_0_10px_rgba(6,182,212,0.1)] py-2 rounded-lg text-xs font-bold hover:bg-cyan-900/50 hover:border-cyan-500 transition-all uppercase tracking-wider">
                      CALC V
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Intensidad (I)</label>
                    <input 
                      type="number" 
                      value={current} 
                      onChange={e => setCurrent(e.target.value)} 
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                      placeholder="Amperios"
                    />
                    <button onClick={() => calculate("I")} className="w-full bg-slate-800 text-cyan-400 border border-cyan-900 shadow-[0_0_10px_rgba(6,182,212,0.1)] py-2 rounded-lg text-xs font-bold hover:bg-cyan-900/50 hover:border-cyan-500 transition-all uppercase tracking-wider">
                      CALC I
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Resistencia (R)</label>
                    <input 
                      type="number" 
                      value={resistance} 
                      onChange={e => setResistance(e.target.value)} 
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                      placeholder="Ohmios"
                    />
                    <button onClick={() => calculate("R")} className="w-full bg-slate-800 text-cyan-400 border border-cyan-900 shadow-[0_0_10px_rgba(6,182,212,0.1)] py-2 rounded-lg text-xs font-bold hover:bg-cyan-900/50 hover:border-cyan-500 transition-all uppercase tracking-wider">
                      CALC R
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button onClick={clear} className="text-xs font-mono text-slate-500 hover:text-cyan-400 uppercase tracking-widest transition-colors">Limpiar</button>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row items-center justify-around h-48 relative shadow-inner">
                    {/* Visual Triangle */}
                    <div className="w-32 h-32 relative shrink-0">
                       <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-900 stroke-cyan-500/50 stroke-2 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                          <polygon points="50,10 90,90 10,90" strokeLinejoin="round" />
                          <line x1="28" y1="50" x2="72" y2="50" />
                          <line x1="50" y1="50" x2="50" y2="90" />
                       </svg>
                       <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono font-bold text-xl text-cyan-300 pointer-events-none">V</div>
                       <div className="absolute top-[75%] left-[30%] -translate-x-1/2 -translate-y-1/2 font-mono font-bold text-xl text-emerald-400 pointer-events-none">I</div>
                       <div className="absolute top-[75%] left-[70%] -translate-x-1/2 -translate-y-1/2 font-mono font-bold text-xl text-orange-400 pointer-events-none">R</div>
                    </div>
                    {/* Explicación Triángulo */}
                    <div className="mt-4 md:mt-0 text-xs text-slate-400 space-y-2 font-mono ml-4">
                      <p><strong className="text-white">V</strong> = I × R</p>
                      <p><strong className="text-white">I</strong> = V / R</p>
                      <p><strong className="text-white">R</strong> = V / I</p>
                    </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4 pt-4">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">Tipos de Circuitos</h2>
            <div className="grid grid-cols-1 gap-4">
               <Card className="bg-slate-800/30 border-slate-700">
                  <CardHeader className="p-4 pb-2">
                     <CardTitle className="text-base text-cyan-400">Circuito Serie</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-sm text-slate-400 flex flex-col md:flex-row items-center gap-4">
                     <div className="flex-1 space-y-1">
                        <p>Los componentes se conectan uno tras otro.</p>
                        <ul className="text-xs list-disc pl-4 mt-2">
                           <li>La <strong>Intensidad (I)</strong> es IGUAL en todos.</li>
                           <li>El <strong>Voltaje (V)</strong> se reparte entre las resistencias.</li>
                           <li>Si un elemento se funde, toda la línea se apaga.</li>
                        </ul>
                     </div>
                     <div className="w-24 h-16 shrink-0 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center p-2">
                         <svg viewBox="0 0 100 50" className="w-full h-full stroke-cyan-500 fill-none stroke-2">
                            <rect x="5" y="15" width="10" height="20" />
                            <line x1="15" y1="25" x2="35" y2="25" />
                            <circle cx="45" cy="25" r="10" />
                            <line x1="41" y1="21" x2="49" y2="29" /><line x1="41" y1="29" x2="49" y2="21" />
                            <line x1="55" y1="25" x2="75" y2="25" />
                            <circle cx="85" cy="25" r="10" />
                            <line x1="81" y1="21" x2="89" y2="29" /><line x1="81" y1="29" x2="89" y2="21" />
                         </svg>
                     </div>
                  </CardContent>
               </Card>
               
               <Card className="bg-slate-800/30 border-slate-700">
                  <CardHeader className="p-4 pb-2">
                     <CardTitle className="text-base text-emerald-400">Circuito Paralelo</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-sm text-slate-400 flex flex-col md:flex-row items-center gap-4">
                     <div className="flex-1 space-y-1">
                        <p>Los componentes se conectan derivando de nudos comunes. Es el estándar en instalaciones de vivienda.</p>
                        <ul className="text-xs list-disc pl-4 mt-2">
                           <li>El <strong>Voltaje (V)</strong> es IGUAL en todos (ej. 230V).</li>
                           <li>La <strong>Intensidad (I)</strong> se divide por las ramas según su consumo.</li>
                           <li>Si un elemento falla, el resto sigue funcionando.</li>
                        </ul>
                     </div>
                     <div className="w-24 h-24 shrink-0 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center p-2">
                         <svg viewBox="0 0 100 100" className="w-full h-full stroke-emerald-500 fill-none stroke-[2]">
                            <rect x="5" y="40" width="10" height="20" />
                            <line x1="15" y1="50" x2="30" y2="50" />
                            <line x1="30" y1="20" x2="30" y2="80" />
                            {/* Branch 1 */}
                            <line x1="30" y1="20" x2="45" y2="20" />
                            <circle cx="55" cy="20" r="10" />
                            <line x1="51" y1="16" x2="59" y2="24" /><line x1="51" y1="24" x2="59" y2="16" />
                            <line x1="65" y1="20" x2="80" y2="20" />
                            {/* Branch 2 */}
                            <line x1="30" y1="80" x2="45" y2="80" />
                            <circle cx="55" cy="80" r="10" />
                            <line x1="51" y1="76" x2="59" y2="84" /><line x1="51" y1="84" x2="59" y2="76" />
                            <line x1="65" y1="80" x2="80" y2="80" />
                            {/* Return */}
                            <line x1="80" y1="20" x2="80" y2="80" />
                         </svg>
                     </div>
                  </CardContent>
               </Card>
                <Card className="bg-slate-800/30 border-slate-700">
                  <CardHeader className="p-4 pb-2">
                     <CardTitle className="text-base text-purple-400">Circuito Mixto</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-sm text-slate-400 flex flex-col md:flex-row items-center gap-4">
                     <div className="flex-1 space-y-1">
                        <p>Combinación de serie y paralelo en una misma instalación.</p>
                        <ul className="text-xs list-disc pl-4 mt-2">
                           <li>Permite agrupar cargas con comportamientos distintos.</li>
                           <li>Complejidad media: el cálculo requiere simplificación de nudos.</li>
                           <li>Común en equipos electrónicos y cuadros complejos.</li>
                        </ul>
                     </div>
                     <div className="w-24 h-24 shrink-0 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center p-2">
                         <svg viewBox="0 0 100 80" className="w-full h-full stroke-purple-500 fill-none stroke-[2]">
                            <rect x="5" y="30" width="10" height="20" />
                            <line x1="15" y1="40" x2="25" y2="40" />
                            <circle cx="35" cy="40" r="10" />
                            <line x1="31" y1="36" x2="39" y2="44" /><line x1="31" y1="44" x2="39" y2="36" />
                            <line x1="45" y1="40" x2="55" y2="40" />
                            <line x1="55" y1="15" x2="55" y2="65" />
                            <circle cx="70" cy="15" r="8" /><line x1="66" y1="11" x2="74" y2="19" /><line x1="66" y1="19" x2="74" y2="11" />
                            <circle cx="70" cy="65" r="8" /><line x1="66" y1="61" x2="74" y2="69" /><line x1="66" y1="69" x2="74" y2="61" />
                            <line x1="78" y1="15" x2="90" y2="15" /><line x1="78" y1="65" x2="90" y2="65" /><line x1="90" y1="15" x2="90" y2="65" />
                         </svg>
                     </div>
                  </CardContent>
               </Card>

               <Card className="bg-slate-800/30 border-slate-700">
                  <CardHeader className="p-4 pb-2">
                     <CardTitle className="text-base text-yellow-500">Circuito Conmutado (2 puntos)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-sm text-slate-400 flex flex-col md:flex-row items-center gap-4">
                     <div className="flex-1 space-y-1">
                        <p>Control de un punto de luz desde dos interruptores diferentes.</p>
                        <ul className="text-xs list-disc pl-4 mt-2">
                           <li>Ideal para pasillos y dormitorios (puerta y cabecero).</li>
                           <li>Usa dos interruptores conmutados unidos por dos hilos.</li>
                           <li>El estado de la lámpara depende de la posición de ambos.</li>
                        </ul>
                     </div>
                     <div className="w-24 h-24 shrink-0 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center p-2">
                         <svg viewBox="0 0 100 60" className="w-full h-full stroke-yellow-500 fill-none stroke-[2]">
                            <line x1="5" y1="30" x2="15" y2="30" />
                            <circle cx="20" cy="30" r="2" fill="currentColor" />
                            <line x1="20" y1="30" x2="35" y2="15" strokeDasharray="2,2" />
                            <line x1="40" y1="15" x2="60" y2="15" />
                            <line x1="40" y1="45" x2="60" y2="45" />
                            <circle cx="80" cy="30" r="2" fill="currentColor" />
                            <line x1="80" y1="30" x2="65" y2="45" strokeDasharray="2,2" />
                            <line x1="80" y1="30" x2="95" y2="30" />
                         </svg>
                     </div>
                  </CardContent>
               </Card>

               <Card className="bg-slate-800/30 border-slate-700">
                  <CardHeader className="p-4 pb-2">
                     <CardTitle className="text-base text-red-500">Circuito de Cruzamiento (3+ puntos)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-sm text-slate-400 flex flex-col md:flex-row items-center gap-4">
                     <div className="flex-1 space-y-1">
                        <p>Control desde tres o más puntos usando un interruptor especial.</p>
                        <ul className="text-xs list-disc pl-4 mt-2">
                           <li>Combina 2 conmutadores en los extremos + 1 cruzamiento.</li>
                           <li>Se puede ampliar a N puntos añadiendo más cruzamientos.</li>
                           <li>Esquema estándar para escaleras y salones grandes.</li>
                        </ul>
                     </div>
                     <div className="w-24 h-24 shrink-0 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center p-2">
                         <svg viewBox="0 0 100 60" className="w-full h-full stroke-red-500 fill-none stroke-[2]">
                            <rect x="40" y="20" width="20" height="20" />
                            <line x1="40" y1="25" x2="60" y2="35" />
                            <line x1="40" y1="35" x2="60" y2="25" />
                            <line x1="10" y1="30" x2="40" y2="30" />
                            <line x1="60" y1="30" x2="90" y2="30" />
                         </svg>
                     </div>
                  </CardContent>
               </Card>
            </div>
          </section>

        </div>
      </div>

      {/* Caída de tensión */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-orange-400" /> Calculadora de Caída de Tensión
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="bg-slate-800/30">
              <CardTitle className="text-base">ΔV = k · L · I · ρ / S</CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-sm text-center space-y-1">
                <div className="text-white">ΔV = <span className="text-orange-400">k</span> × L(m) × I(A) × 0.01724 / S(mm²)</div>
                <div className="text-xs text-slate-500">k = 2 (monofásico) · k = √3 (trifásico)</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Longitud L (m)</label>
                  <input type="number" min="1" value={cdtLength} onChange={e => setCdtLength(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-orange-500 focus:outline-none font-mono text-sm"
                    placeholder="ej. 25" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Intensidad I (A)</label>
                  <input type="number" min="0.1" step="0.1" value={cdtCurrent} onChange={e => setCdtCurrent(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-orange-500 focus:outline-none font-mono text-sm"
                    placeholder="ej. 16" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Sección S (mm²)</label>
                  <select value={cdtSection} onChange={e => setCdtSection(Number(e.target.value))}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:border-orange-500 focus:outline-none font-mono text-sm">
                    {[1.5, 2.5, 4, 6, 10, 16, 25, 35, 50].map(s => <option key={s} value={s}>{s} mm²</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Circuito</label>
                  <div className="flex gap-2 h-[38px]">
                    <button onClick={() => setCdtPhases("mono")} className={`flex-1 rounded-lg text-xs font-bold border transition-all ${cdtPhases === "mono" ? "bg-orange-500/20 border-orange-500 text-orange-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>Mono</button>
                    <button onClick={() => setCdtPhases("tri")} className={`flex-1 rounded-lg text-xs font-bold border transition-all ${cdtPhases === "tri" ? "bg-orange-500/20 border-orange-500 text-orange-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>Trifásico</button>
                  </div>
                </div>
              </div>

              <button onClick={calcCdt} disabled={!cdtLength || !cdtCurrent || !cdtSection}
                className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold text-sm transition-all tracking-wide uppercase">
                Calcular ΔV
              </button>

              {cdtResult && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl p-4 border font-mono space-y-2 ${cdtResult.ok ? "bg-emerald-950/20 border-emerald-700/40" : "bg-red-950/20 border-red-700/40"}`}>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Caída de tensión (ΔV):</span>
                    <span className={`font-bold ${cdtResult.ok ? "text-emerald-300" : "text-red-300"}`}>{cdtResult.drop.toFixed(2)} V</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Caída porcentual:</span>
                    <span className={`font-bold text-lg ${cdtResult.ok ? "text-emerald-300" : "text-red-400"}`}>{cdtResult.dropPct.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 border-t border-slate-700/40 pt-2">
                    <span>Límite REBT (ITC-BT-19):</span>
                    <span className="text-slate-300">≤ {cdtResult.maxAllowed}%</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm font-bold mt-1 ${cdtResult.ok ? "text-emerald-400" : "text-red-400"}`}>
                    {cdtResult.ok ? "✓ Cumple reglamento" : "✗ Supera el límite — aumentar sección del cable"}
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader className="bg-slate-800/30">
              <CardTitle className="text-base text-orange-400">Límites Reglamentarios (REBT)</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-400 space-y-3">
              <div className="overflow-x-auto rounded-lg border border-slate-700">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-800/50 text-slate-400 uppercase">
                    <tr>
                      <th className="px-3 py-2">Tipo de circuito</th>
                      <th className="px-3 py-2 text-right">ΔV máx.</th>
                      <th className="px-3 py-2 text-right">Norma</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr className="bg-orange-950/10"><td className="px-3 py-2">Derivación Individual (DI)</td><td className="px-3 py-2 text-right font-mono font-bold text-orange-300">1%</td><td className="px-3 py-2 text-right font-mono text-slate-500">ITC-BT-15</td></tr>
                    <tr><td className="px-3 py-2">Inst. interior (alumb.)</td><td className="px-3 py-2 text-right font-mono font-bold">3%</td><td className="px-3 py-2 text-right font-mono text-slate-500">ITC-BT-19</td></tr>
                    <tr><td className="px-3 py-2">Inst. interior (otros)</td><td className="px-3 py-2 text-right font-mono font-bold">5%</td><td className="px-3 py-2 text-right font-mono text-slate-500">ITC-BT-19</td></tr>
                    <tr><td className="px-3 py-2">Alumbrado exterior</td><td className="px-3 py-2 text-right font-mono font-bold">5%</td><td className="px-3 py-2 text-right font-mono text-slate-500">ITC-BT-09</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 italic mt-3">La caída de tensión acumulada desde el origen de la instalación (CT o CGP) hasta el receptor no puede superar los porcentajes indicados.</p>
              <div className="bg-cyan-950/20 border border-cyan-800/30 rounded-lg p-3 text-xs text-slate-300">
                <strong className="text-cyan-400 block mb-1">Ejemplo práctico:</strong>
                Circuito de iluminación, 15 m, 10 A, 1.5 mm² (monofásico):
                <span className="font-mono block mt-1 text-white">ΔV = 2 × 15 × 10 × 0.01724 / 1.5 = <span className="text-orange-300">3.45 V (1.50%)</span></span>
                → Cumple el límite del 3%.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
