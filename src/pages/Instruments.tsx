import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Activity, ShieldAlert, Wrench, CheckCircle2, XCircle, Info } from "lucide-react";

type Mode = "off" | "v_dc" | "v_ac" | "resistance" | "continuity";

export default function Instruments() {
  const [mode, setMode] = useState<Mode>("off");
  const [probeConnected, setProbeConnected] = useState(false);

  const getScreenText = () => {
    switch (mode) {
      case "off": return "";
      case "v_dc": return probeConnected ? "12.04" : "0.00";
      case "v_ac": return probeConnected ? "230.5" : "0.0";
      case "resistance": return probeConnected ? "270" : "1 .";
      case "continuity": return probeConnected ? "0.01" : "1 .";
      default: return "";
    }
  };

  const getUnit = () => {
    switch (mode) {
      case "v_dc": return "V DC";
      case "v_ac": return "V AC";
      case "resistance": return "Ω";
      case "continuity": return "Ω";
      default: return "";
    }
  };

  const dialRotation = {
    off: 0,
    v_ac: 45,
    v_dc: 135,
    resistance: 225,
    continuity: 315
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <div>
        <nav className="text-xs text-cyan-500 font-mono mb-1 uppercase tracking-widest flex items-center gap-2">
          <Activity className="w-3 h-3" /> Módulo 07 &gt; Instrumentos de Medida
        </nav>
        <h1 className="text-3xl font-bold tracking-tight text-white">7. El Multímetro (Polímetro)</h1>
        <p className="mt-2 text-slate-400 max-w-2xl">Aprende a manejar el instrumento fundamental del electricista. Domina las escalas, los puertos y los protocolos de seguridad.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* MULTIMETER VISUALIZER */}
        <section className="flex justify-center">
          <div className="relative p-2 rounded-[2.5rem] bg-orange-500 shadow-[0_20px_50px_rgba(249,115,22,0.2)] border-b-[8px] border-orange-700">
            <Card className="w-80 bg-slate-900 border-slate-800 rounded-[2rem] overflow-hidden shadow-inner relative">
              {/* Top brand section */}
              <div className="px-6 pt-6 pb-2 flex justify-between items-center">
                <span className="text-white font-black italic tracking-tighter text-lg">ELECARANDA</span>
                <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                </div>
              </div>

              <CardContent className="px-6 py-4 flex flex-col items-center space-y-6">
                
                {/* LCD Display */}
                <div className="w-full relative group">
                  <div className="absolute -inset-1 bg-cyan-500/20 blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-full bg-[#1e2925] p-5 rounded-xl border-4 border-slate-950 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] flex flex-col justify-between min-h-[100px]">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-cyan-900 font-bold uppercase tracking-tighter">Auto Range</span>
                        {mode === "continuity" && probeConnected && (
                          <motion.div 
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 0.5 }}
                            className="text-[10px] font-mono text-cyan-400 font-bold"
                          >
                            (( • )) BEEP
                          </motion.div>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-cyan-700 font-bold">{getUnit()}</span>
                    </div>
                    
                    <div className="text-right">
                      <motion.div 
                        key={getScreenText()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-mono text-5xl text-cyan-400 font-bold tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]"
                      >
                        {mode === "off" ? "" : getScreenText()}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Dial Container */}
                <div className="relative w-48 h-48 rounded-full bg-slate-800 shadow-[0_10px_20px_rgba(0,0,0,0.4),inset_0_2px_5px_rgba(255,255,255,0.05)] border-4 border-slate-950 flex items-center justify-center">
                  {/* Labels */}
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="absolute top-2 text-[10px] font-black text-red-500 tracking-tighter">OFF</div>
                    <div className="absolute top-8 right-6 text-[11px] font-black text-white">V <span className="text-yellow-500">~</span></div>
                    <div className="absolute bottom-8 right-6 text-[11px] font-black text-white">V <span className="text-cyan-500">-</span></div>
                    <div className="absolute bottom-8 left-6 text-[11px] font-black text-white">Ω</div>
                    <div className="absolute top-8 left-6 text-[11px] font-black text-white">(( • ))</div>
                  </div>

                  {/* Rotatable Dial */}
                  <motion.div 
                    animate={{ rotate: dialRotation[mode] }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="w-28 h-28 rounded-full bg-gradient-to-b from-slate-700 to-slate-900 border-4 border-slate-950 shadow-2xl flex justify-center items-start pt-2 cursor-pointer group"
                    onClick={() => {
                      const modes: Mode[] = ["off", "v_ac", "v_dc", "resistance", "continuity"];
                      const currentIndex = modes.indexOf(mode);
                      setMode(modes[(currentIndex + 1) % modes.length]);
                    }}
                  >
                    <div className="w-1.5 h-10 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] group-hover:scale-y-110 transition-transform" />
                  </motion.div>
                </div>

                {/* Ports Section */}
                <div className="flex justify-around w-full pt-4 px-4 pb-2">
                   {[
                     { label: "10A", color: "bg-red-600", border: "border-red-400" },
                     { label: "COM", color: "bg-black", border: "border-slate-700" },
                     { label: "VΩmA", color: "bg-red-600", border: "border-red-400" }
                   ].map((port) => (
                     <div key={port.label} className="flex flex-col items-center gap-1.5">
                       <span className="text-[9px] font-bold text-slate-500 uppercase">{port.label}</span>
                       <div className={`w-8 h-8 rounded-full ${port.color} border-4 ${port.border} shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)] flex items-center justify-center relative`}>
                         <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800" />
                         {/* Probe simulation */}
                         {probeConnected && port.label !== "10A" && (
                            <motion.div 
                              initial={{ scale: 0 }} animate={{ scale: 1 }}
                              className={`absolute -bottom-10 w-1.5 h-12 ${port.label === 'COM' ? 'bg-slate-400' : 'bg-red-500'} rounded-full`}
                            />
                         )}
                       </div>
                     </div>
                   ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CONTROLS & INFO */}
        <section className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <CardHeader className="border-b border-slate-800/50">
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-cyan-400" /> Panel de Control del Simulador
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">1. Selección de Magnitud</label>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      { id: "off", label: "Apagado", color: "slate" },
                      { id: "v_dc", label: "Tensión CC", color: "cyan" },
                      { id: "v_ac", label: "Tensión CA", color: "yellow" },
                      { id: "resistance", label: "Resistencia", color: "purple" },
                      { id: "continuity", label: "Continuidad", color: "emerald" }
                    ].map((m) => (
                      <button 
                        key={m.id}
                        onClick={() => { setMode(m.id as Mode); setProbeConnected(false); }}
                        className={`px-4 py-2 rounded-lg border text-[11px] font-bold transition-all ${
                          mode === m.id 
                            ? "bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-500/20" 
                            : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-4">2. Conexión a Circuito de Prueba</label>
                <Button 
                  disabled={mode === "off"}
                  onClick={() => setProbeConnected(!probeConnected)}
                  className={`w-full py-6 rounded-xl font-bold transition-all flex items-center justify-center gap-3 ${
                    probeConnected 
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white" 
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  }`}
                >
                  {probeConnected ? <CheckCircle2 className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                  {probeConnected ? "PUNTAS CONECTADAS" : "CONECTAR PUNTAS"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* DYNAMIC HELP CARD */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className={`border-l-4 overflow-hidden ${
                mode === "off" ? "border-slate-700 bg-slate-900/40" :
                mode === "v_dc" ? "border-cyan-500 bg-cyan-950/10" :
                mode === "v_ac" ? "border-yellow-500 bg-yellow-950/10" :
                mode === "resistance" ? "border-purple-500 bg-purple-950/10" :
                "border-emerald-500 bg-emerald-950/10"
              }`}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg bg-slate-900 border ${
                      mode === "v_dc" ? "text-cyan-400 border-cyan-800" :
                      mode === "v_ac" ? "text-yellow-400 border-yellow-800" :
                      mode === "resistance" ? "text-purple-400 border-purple-800" :
                      mode === "continuity" ? "text-emerald-400 border-emerald-800" :
                      "text-slate-400 border-slate-800"
                    }`}>
                      {mode === "off" ? <Info className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-white text-sm">
                        {mode === "off" && "Primeros Pasos"}
                        {mode === "v_dc" && "Medición de Tensión Continua (V DC)"}
                        {mode === "v_ac" && "Medición de Tensión Alterna (V AC)"}
                        {mode === "resistance" && "Medición de Resistencia (Ω)"}
                        {mode === "continuity" && "Prueba de Continuidad (( • ))"}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {mode === "off" && "Gira el selector central para empezar. El multímetro ELECARANDA es autorrango, detectará automáticamente la magnitud correcta."}
                        {mode === "v_dc" && "Para medir pilas o baterías. Conecta la punta negra en COM y la roja en VΩ. Si el valor es negativo, la polaridad está invertida."}
                        {mode === "v_ac" && "Uso principal en enchufes y cuadros eléctricos. Máxima precaución. Verifica que las puntas están en buen estado antes de tocar cobre desnudo."}
                        {mode === "resistance" && "IMPORTANTE: Mide siempre SIN TENSIÓN. Si hay corriente en el circuito, el valor será erróneo y podrías fundir el fusible interno."}
                        {mode === "continuity" && "Ideal para detectar cables cortados. Si la resistencia es inferior a 10Ω, el altavoz interno emitirá un pitido constante."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* SAFETY WARNING */}
          <Card className="bg-red-950/10 border-red-900/30">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 bg-red-950/30 rounded-full">
                <ShieldAlert className="w-5 h-5 text-red-500" />
              </div>
              <div className="text-[11px] text-red-200/70 italic">
                <strong>REGLA DE ORO:</strong> Nunca cambies la posición del selector mientras las puntas están tocando un circuito con tensión. Podría provocar un arco eléctrico.
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
