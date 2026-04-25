import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";

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
      case "continuity": return probeConnected ? "0.00" : "1 .";
      default: return "";
    }
  };

  const getUnit = () => {
    switch (mode) {
      case "v_dc": return "V";
      case "v_ac": return "V";
      case "resistance": return "Ω";
      case "continuity": return "Ω";
      default: return "";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <nav className="text-xs text-cyan-500 font-mono mb-1 uppercase tracking-widest">Módulo 04 &gt; Medición</nav>
        <h1 className="text-3xl font-bold tracking-tight text-white">4. Instrumentos de Medida</h1>
        <p className="mt-2 text-slate-400">Conoce el polímetro y aprende los procedimientos de medición.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-4">
          <Card className="bg-slate-900 border-none shadow-2xl overflow-hidden text-slate-100 relative max-w-sm mx-auto w-full">
            <CardHeader className="bg-slate-800 pb-2">
              <CardTitle className="text-xl flex justify-between items-center">
                <span>DMM-8007</span>
                <span className="text-xs uppercase text-slate-400">Multímetro Digital</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col items-center space-y-8">
              
              {/* LCD Screen */}
              <div className="w-full bg-[#9bada4] p-4 rounded-lg shadow-inner border-4 border-slate-700 flex justify-between items-end min-h-[80px]">
                {mode === "continuity" && probeConnected && (
                  <span className="text-xs font-bold font-mono text-black animate-pulse">BEEP!</span>
                )}
                {mode === "continuity" && !probeConnected && <span />}
                
                <div className="font-mono text-4xl text-black font-bold tracking-widest text-right flex-1">
                  {getScreenText()} <span className="text-xl">{getUnit()}</span>
                </div>
              </div>

              {/* Selector Dial */}
              <div className="relative w-40 h-40 rounded-full border-8 border-slate-800 bg-slate-700 flex items-center justify-center cursor-pointer shadow-lg">
                {/* Tick marks around dial */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="absolute top-2 text-xs font-bold text-red-400">OFF</div>
                   <div className="absolute top-6 right-6 text-xs font-bold text-white">V~</div>
                   <div className="absolute bottom-6 right-6 text-xs font-bold text-white">V-</div>
                   <div className="absolute bottom-6 left-6 text-xs font-bold text-white">Ω</div>
                   <div className="absolute top-6 left-6 text-xs font-bold text-white">*)</div>
                </div>
                
                <div 
                  className="w-24 h-24 rounded-full bg-slate-600 border-4 border-slate-900 flex justify-center items-start transition-transform duration-300 ease-out shadow-inner relative"
                  style={{ 
                    transform: `rotate(${
                      mode === 'off' ? 0 : 
                      mode === 'v_ac' ? 45 : 
                      mode === 'v_dc' ? 135 : 
                      mode === 'resistance' ? 225 : 
                      315 // continuity
                    }deg)` 
                  }}
                >
                  <div className="w-1 h-8 bg-white mt-2 rounded-full" />
                </div>
              </div>

              {/* Ports */}
              <div className="flex space-x-6 w-full justify-center">
                 <div className="flex flex-col items-center">
                    <span className="text-[10px] mb-1">10A</span>
                    <div className="w-6 h-6 rounded-full bg-red-900 border-2 border-red-500 shadow-inner" />
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-[10px] mb-1">COM</span>
                    <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-500 shadow-inner" />
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-[10px] mb-1">VΩmA</span>
                    <div className="w-6 h-6 rounded-full bg-red-900 border-2 border-red-500 shadow-inner" />
                 </div>
              </div>

            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Controles del Simulador</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">1. Selecciona Modo:</label>
                 <div className="flex flex-wrap gap-2">
                    <Button variant={mode === "off" ? "default" : "outline"} onClick={() => setMode("off")}>OFF</Button>
                    <Button variant={mode === "v_dc" ? "default" : "outline"} onClick={() => setMode("v_dc")}>Voltaje CC (V-)</Button>
                    <Button variant={mode === "v_ac" ? "default" : "outline"} onClick={() => setMode("v_ac")}>Voltaje CA (V~)</Button>
                    <Button variant={mode === "resistance" ? "default" : "outline"} onClick={() => setMode("resistance")}>Resistencia (Ω)</Button>
                    <Button variant={mode === "continuity" ? "default" : "outline"} onClick={() => setMode("continuity")}>Continuidad</Button>
                 </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-700">
                <label className="text-sm font-semibold text-slate-300">2. Conectar Puntas a Circuito:</label>
                <div className="flex space-x-4">
                  <Button 
                    variant={probeConnected ? "default" : "secondary"}
                    onClick={() => setProbeConnected(!probeConnected)}
                    disabled={mode === "off"}
                    className="w-full"
                  >
                    {probeConnected ? "Desconectar Puntas" : "Conectar Puntas"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-cyan-950/20 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg text-cyan-400 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                {mode === "off" && "¿Qué queremos medir?"}
                {mode === "v_dc" && "Medición de Tensión Continua (Pilas, Baterías)"}
                {mode === "v_ac" && "Medición de Tensión Alterna (Enchufes, Red)"}
                {mode === "resistance" && "Medición de Resistencia"}
                {mode === "continuity" && "Prueba de Continuidad"}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {mode === "off" && "Gira el selector para escoger la magnitud a medir. Recuerda la norma de oro: empieza siempre midiendo en escalas altas si no conoces el valor aproximado."}
                {mode === "v_dc" && "Conexión en paralelo. La punta roja va al polo positivo y la negra al negativo. Si te equivocas, saldrá un signo negativo en la pantalla, pero el polímetro digital no se rompe."}
                {mode === "v_ac" && "Conexión en paralelo. No importa la polaridad. La CA en España es de aprox. 230V. ¡PRECAUCIÓN! Asegúrate de tener la escala en V~ superior a 230V o dañarás el aparato."}
                {mode === "resistance" && "Mide la oposición al paso de corriente. Se mide SIEMPRE sin tensión en el circuito (desconecta la pila o baja el automático). La lectura 1 . significa resistencia infinita (circuito abierto)."}
                {mode === "continuity" && "Comprobación rápida para ver si un cable está partido. Manda una pequeña corriente. Si lee cerca de 0 y pita, el cable está sano y hay continuidad. IMPORTANTE: Hacer siempre SIN tensión."}
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
