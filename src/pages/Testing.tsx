import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Card";
import { ShieldAlert, Zap, SearchCheck, ClipboardCheck, Wrench, CheckCircle2, XCircle, AlertTriangle, FileCheck2, Activity } from "lucide-react";
import { motion } from "motion/react";

const preServiceSteps = [
  { id: 1, text: "Comprobar que los circuitos de la instalación estén desconectados (automáticos abiertos).", critical: true },
  { id: 2, text: "Verificar que no haya tensión en el cuadro con un comprobador o voltímetro antes de manipular.", critical: true },
  { id: 3, text: "Revisar que los conductores están correctamente identificados por colores (Fase: marrón/negro/gris, Neutro: azul, PE: verde-amarillo).", critical: false },
  { id: 4, text: "Comprobar visualmente que los conductores no presentan daños mecánicos, aplastamientos ni cortes en el aislamiento.", critical: false },
  { id: 5, text: "Verificar que las cajas de registro están correctamente cerradas y sin daños.", critical: false },
  { id: 6, text: "Confirmar que todos los terminales y bornes están apretados y sin hilos sueltos.", critical: true },
  { id: 7, text: "Revisar que la continuidad del conductor de protección (PE) llega a todas las masas metálicas (enchufes, equipos).", critical: true },
];

const testsData = [
  {
    name: "Continuidad del PE",
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    instrument: "Multímetro (modo Ω o continuidad)",
    method: "Medir entre la barra de tierra del cuadro y la clavija de PE de cada toma de corriente.",
    limit: "≤ 1 Ω (idealmente < 0.5 Ω)",
    norm: "ITC-BT-19",
    color: "border-emerald-800 bg-emerald-950/10",
    badge: "text-emerald-400",
    why: "¿Por qué se hace? Para asegurar que si hay una avería, la corriente de fuga tenga un camino seguro de baja resistencia hacia tierra y no a través de una persona.",
    consequence: "Peligro de electrocución al tocar carcasas metálicas de electrodomésticos.",
  },
  {
    name: "Resistencia de Aislamiento",
    icon: <ShieldAlert className="w-5 h-5 text-yellow-400" />,
    instrument: "Megóhmetro (Megger) — 500 V CC para BT",
    method: "Con todos los receptores desconectados, medir entre conductores activos y tierra. La instalación debe estar SIN tensión.",
    limit: "≥ 0.5 MΩ (500 000 Ω) por circuito",
    norm: "ITC-BT-19 / IEC 60364",
    color: "border-yellow-800 bg-yellow-950/10",
    badge: "text-yellow-400",
    why: "¿Por qué se hace? Para verificar que los cables no tengan 'fugas' de corriente a través de su plástico protector deteriorado.",
    consequence: "Incendios por cortocircuitos invisibles o disparos inesperados del diferencial.",
  },
  {
    name: "Polaridad",
    icon: <Zap className="w-5 h-5 text-cyan-400" />,
    instrument: "Comprobador de polaridad / Multímetro CA",
    method: "Verificar que los interruptores unipolares interrumpen SOLO el conductor de fase. Nunca el neutro ni PE.",
    limit: "Interruptor → Fase (L). Sin tensión en neutro al abrir.",
    norm: "ITC-BT-24",
    color: "border-cyan-800 bg-cyan-950/10",
    badge: "text-cyan-400",
    why: "¿Por qué se hace? Para que al apagar un interruptor, la lámpara o equipo se quede realmente sin tensión (seguridad en mantenimiento).",
    consequence: "Si se corta el neutro, el equipo parece apagado pero sigue teniendo 230V internos, riesgo de descarga al cambiar una bombilla.",
  },
  {
    name: "Resistencia de Tierra",
    icon: <SearchCheck className="w-5 h-5 text-purple-400" />,
    instrument: "Telurómetro (picas auxiliares a 20 m)",
    method: "Método de las tres puntas. Se hinca pica de corriente y pica de tensión separadas. Se aplica corriente alterna.",
    limit: "≤ 37 Ω (para diferencial de 30 mA: Ra × Id ≤ 50 V)",
    norm: "ITC-BT-18 / UNE 20460",
    color: "border-purple-800 bg-purple-950/10",
    badge: "text-purple-400",
    why: "¿Por qué se hace? Para garantizar que el terreno es capaz de absorber las corrientes de defecto rápidamente.",
    consequence: "Si la tierra es mala (>37Ω), el diferencial podría no disparar a tiempo, manteniendo la tensión peligrosa en las masas.",
  },
  {
    name: "Caída de Tensión",
    icon: <Activity className="w-5 h-5 text-orange-400" />,
    instrument: "Voltímetro / Analizador de red (con carga nominal conectada)",
    method: "Medir tensión en el origen de la línea (cuadro) y en el punto más lejano del circuito con carga máxima.",
    limit: "≤ 3% en circuitos de uso general; ≤ 5% para alumbrado exterior (REBT)",
    norm: "ITC-BT-15 / ITC-BT-19",
    color: "border-orange-800 bg-orange-950/10",
    badge: "text-orange-400",
  },
  {
    name: "Ensayo Dieléctrico",
    icon: <ShieldAlert className="w-5 h-5 text-red-400" />,
    instrument: "Generador de alta tensión (hipot tester)",
    method: "Se aplica 2U+1000V (mín. 1500 V CA) durante 1 minuto entre conductores activos y entre cada uno y tierra. Solo en instalaciones nuevas o componentes.",
    limit: "Sin perforación del dieléctrico. Sin corriente de fuga superior al umbral.",
    norm: "UNE-EN 60439 / IEC 60664",
    color: "border-red-800 bg-red-950/10",
    badge: "text-red-400",
  },
  {
    name: "Prueba de Diferenciales",
    icon: <Zap className="w-5 h-5 text-yellow-500" />,
    instrument: "Comprobador de diferenciales (RCD Tester)",
    method: "Medir tiempo de disparo (ms) y corriente de disparo (mA) inyectando una corriente de defecto controlada.",
    limit: "Para 30mA: Disparo < 200ms a IΔn; NO disparar a IΔn/2.",
    norm: "ITC-BT-24",
    color: "border-yellow-700 bg-yellow-950/10",
    badge: "text-yellow-500",
  },
];

const instruments = [
  { name: "Megóhmetro (Megger)", use: "Mide resistencia de aislamiento. Aplica 500 V CC o 1000 V CC en líneas. Indispensable antes de poner tensión.", icon: "🔋" },
  { name: "Telurómetro", use: "Mide la resistencia de la toma de tierra. Usa el método de las tres puntas con picas auxiliares.", icon: "🌍" },
  { name: "Pinza Amperimétrica", use: "Mide corriente sin cortar el circuito. Ideal para verificar corriente de desequilibrio o de fuga.", icon: "🔌" },
  { name: "Comprobador de circuitos", use: "Verifica polaridad, presencia de tierra, fase y neutro en enchufes en segundos.", icon: "🔍" },
  { name: "Analizador de redes", use: "Mide potencia, armónicos, factor de potencia y calidad del suministro. Para instalaciones industriales.", icon: "📊" },
  { name: "Cámara termográfica", use: "Detecta puntos calientes en conexiones mal apretadas o sobrecargadas. Sin necesidad de parar la instalación.", icon: "🌡️" },
];

export default function Testing() {
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());
  const [expandedTest, setExpandedTest] = useState<string | null>(null);

  const toggleStep = (id: number) => {
    setCheckedSteps(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const allChecked = checkedSteps.size === preServiceSteps.length;
  const criticalChecked = preServiceSteps.filter(s => s.critical).every(s => checkedSteps.has(s.id));

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-10">
      <div>
        <nav className="text-xs text-cyan-500 font-mono mb-1 uppercase tracking-widest">Módulo 05 &gt; Verificación y Puesta en Servicio</nav>
        <h1 className="text-3xl font-bold tracking-tight text-white">8. Pruebas y Puesta en Servicio</h1>
        <p className="mt-2 text-slate-400">Operaciones previas, ensayos reglamentarios, instrumentos de medida y certificación (CIE).</p>
      </div>

      {/* Pre-service checklist */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 text-cyan-400" /> Operaciones Previas a la Puesta en Tensión
        </h2>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-5 pb-5 space-y-3">
            <p className="text-sm text-slate-400 mb-4">Marca cada verificación antes de dar tensión a la instalación. Los ítems en <span className="text-red-400 font-semibold">rojo</span> son críticos de seguridad.</p>
            {preServiceSteps.map((step) => (
              <motion.button
                key={step.id}
                onClick={() => toggleStep(step.id)}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                  checkedSteps.has(step.id)
                    ? "bg-emerald-950/20 border-emerald-700/50 text-emerald-100"
                    : step.critical
                    ? "bg-red-950/10 border-red-800/40 text-slate-300 hover:bg-red-950/20"
                    : "bg-slate-800/30 border-slate-700 text-slate-300 hover:bg-slate-800/60"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {checkedSteps.has(step.id)
                    ? <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    : <div className={`w-5 h-5 rounded-full border-2 ${step.critical ? "border-red-500" : "border-slate-500"}`} />
                  }
                </div>
                <div className="flex-1 text-sm">
                  <span className={step.critical && !checkedSteps.has(step.id) ? "text-red-300" : ""}>{step.text}</span>
                </div>
                {step.critical && !checkedSteps.has(step.id) && (
                  <span className="shrink-0 text-[9px] font-bold text-red-400 uppercase tracking-widest border border-red-800/50 px-1.5 py-0.5 rounded">CRÍTICO</span>
                )}
              </motion.button>
            ))}

            <div className={`mt-4 p-4 rounded-xl border transition-all ${allChecked ? "bg-emerald-950/30 border-emerald-700/50" : criticalChecked ? "bg-yellow-950/20 border-yellow-700/40" : "bg-slate-900 border-slate-800"}`}>
              <div className="flex items-center gap-3">
                {allChecked
                  ? <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  : criticalChecked
                  ? <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  : <XCircle className="w-6 h-6 text-red-400" />
                }
                <div>
                  <div className="font-bold text-white text-sm">
                    {allChecked ? "¡Lista completa! Listo para dar tensión." : criticalChecked ? "Ítems críticos OK — faltan verificaciones menores." : "Faltan ítems críticos de seguridad."}
                  </div>
                  <div className="text-xs text-slate-400">{checkedSteps.size} / {preServiceSteps.length} verificaciones completadas</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Ensayos expandibles */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-yellow-400" /> Ensayos Reglamentarios (ITC-BT-19)
        </h2>
        <div className="space-y-3">
          {testsData.map((test) => (
            <Card
              key={test.name}
              className={`${test.color} border cursor-pointer transition-all`}
              onClick={() => setExpandedTest(expandedTest === test.name ? null : test.name)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {test.icon}
                    <div>
                      <div className={`font-bold text-sm ${test.badge}`}>{test.name}</div>
                      <div className="text-xs text-slate-400">{test.instrument}</div>
                    </div>
                  </div>
                  <div className={`text-xs font-mono font-bold ${test.badge} border rounded px-2 py-0.5 border-current opacity-70`}>{test.norm}</div>
                </div>

                {expandedTest === test.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-slate-700/50 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 overflow-hidden"
                  >
                    <div className="space-y-4">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Procedimiento</div>
                        <p className="leading-relaxed">{test.method}</p>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-500 mb-1">¿Para qué sirve esto?</div>
                        <p className="italic text-slate-400">{(test as any).why}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-700/40">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Valor Límite Reglamentario</div>
                        <p className={`font-mono font-bold text-lg ${test.badge}`}>{test.limit}</p>
                      </div>
                      <div className="p-3 bg-red-950/10 rounded-lg border border-red-900/20">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-1">Si falla (Peligro)</div>
                        <p className="text-red-200/70">{(test as any).consequence}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xs text-slate-500 italic">Haz clic en cada ensayo para ver el procedimiento detallado y el valor límite reglamentario.</p>
      </section>

      {/* Multimeter Usage Guide - Based on pages 92-96 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" /> Guía Visual: Uso del Multímetro (Polímetro)
        </h2>
        <Card className="bg-slate-900 border-slate-800 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-6 border-r border-slate-800 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-cyan-500 text-slate-900 flex items-center justify-center text-[10px]">V~</span>
                    Medida de Tensión (C.A.)
                  </h4>
                  <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                    <li>Seleccionar escala superior al valor previsto (ej. 750V para medir 230V).</li>
                    <li>Punta <strong className="text-red-400">Roja</strong> en V/Ω y punta <strong className="text-slate-200">Negra</strong> en COM.</li>
                    <li>Conectar en <strong className="text-white">PARALELO</strong> a los bornes.</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-emerald-500 text-slate-900 flex items-center justify-center text-[10px]">Ω</span>
                    Medida de Continuidad / Resistencia
                  </h4>
                  <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                    <li><strong className="text-red-500 uppercase font-black">IMPORTANTE:</strong> Realizar siempre <strong className="text-white">SIN TENSIÓN</strong>.</li>
                    <li>Si el cable está bien, la lectura debe ser cercana a <strong className="text-white">0 Ω</strong> (suena el pitido).</li>
                    <li>Si la pantalla marca "1" o "OL", el circuito está abierto (roto).</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-orange-500 text-slate-900 flex items-center justify-center text-[10px]">A</span>
                    Medida de Intensidad
                  </h4>
                  <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                    <li>Conectar en <strong className="text-white">SERIE</strong> intercalando el multímetro en el circuito.</li>
                    <li>Para consumos altos (&gt;200mA), cambiar la punta roja al conector de <strong className="text-white">10A / 20A</strong>.</li>
                  </ul>
                </div>
              </div>
              <div className="bg-slate-950 p-6 flex flex-col items-center justify-center relative min-h-[300px]">
                {/* Visual Representation of a Multimeter */}
                <div className="w-32 h-56 bg-yellow-500 rounded-2xl p-1 shadow-2xl relative">
                  <div className="w-full h-full bg-slate-900 rounded-xl border-4 border-yellow-600 p-2 flex flex-col">
                    <div className="h-14 bg-emerald-900/30 border border-emerald-500/50 rounded flex items-center justify-center mb-4">
                      <span className="text-emerald-400 font-mono text-xl animate-pulse">230.4</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center gap-4">
                      <div className="w-16 h-16 rounded-full border-4 border-slate-700 bg-slate-800 flex items-center justify-center relative">
                        <div className="w-1 h-8 bg-slate-400 rounded-full transform -rotate-45"></div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-700"></div>
                        <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-700"></div>
                        <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-700"></div>
                      </div>
                    </div>
                  </div>
                  {/* Probes simulation */}
                  <div className="absolute -bottom-8 -left-4 w-1 h-20 bg-slate-400">
                    <div className="w-2 h-2 rounded-full bg-black absolute top-0 -left-0.5"></div>
                  </div>
                  <div className="absolute -bottom-8 -right-4 w-1 h-20 bg-red-500">
                    <div className="w-2 h-2 rounded-full bg-red-600 absolute top-0 -left-0.5"></div>
                  </div>
                </div>
                <div className="mt-8 text-[10px] text-slate-500 font-mono text-center uppercase tracking-widest">Procedimiento según Págs 92-96</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Errores comunes */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" /> Errores Comunes de Diagnóstico
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-slate-900/50 border-orange-900/30">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-bold text-white mb-1">Medir aislamiento con equipos conectados</div>
                  <p className="text-slate-400 text-xs">Si dejas un televisor o PC conectado al medir aislamiento, el Megger (500V) puede destruir la electrónica interna. ¡Desconecta TODO!</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-orange-900/30">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-bold text-white mb-1">No puentear Fase y Neutro en el Megger</div>
                  <p className="text-slate-400 text-xs">Para medir aislamiento respecto a tierra de forma segura, se recomienda unir Fase y Neutro y medir contra el cable de Tierra para no dañar receptores olvidados.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-orange-900/30">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-bold text-white mb-1">Picas de tierra demasiado cerca</div>
                  <p className="text-slate-400 text-xs">Si las picas auxiliar y de tensión están a menos de 20m, las 'áreas de influencia' se solapan y la medida será falsa (menor de la real).</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-orange-900/30">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-bold text-white mb-1">Confundir Neutro con Tierra</div>
                  <p className="text-slate-400 text-xs">Ambos pueden marcar 0V contra fase o continuidad aparente, pero el Neutro es un conductor activo y la Tierra solo de protección. Verificarlos por color y origen.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Instruments */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-purple-400" /> Instrumentos de Verificación
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {instruments.map((inst) => (
            <Card key={inst.name} className="bg-slate-900/50 border-slate-700 hover:border-purple-500/40 transition-colors">
              <CardContent className="pt-4 pb-4 px-5 flex gap-3 items-start">
                <div className="text-2xl shrink-0">{inst.icon}</div>
                <div>
                  <div className="font-bold text-slate-200 text-sm mb-1">{inst.name}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{inst.use}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CIE — Certificado */}
      <section>
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-emerald-400" /> El Certificado de Instalación Eléctrica (CIE)
        </h2>
        <Card className="bg-gradient-to-r from-slate-900 to-slate-950 border-cyan-900/50 shadow-[0_0_20px_rgba(6,182,212,0.08)]">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-xl font-bold text-white">¿Qué contiene el CIE (Boletín)?</h3>
                <p className="text-sm text-slate-300">Es el documento que acredita que la instalación cumple íntegramente el REBT. Es imprescindible para el alta de suministro con la distribuidora.</p>
                <div className="space-y-2">
                  {[
                    ["Datos del titular y emplazamiento exacto", "cyan"],
                    ["Uso del local (vivienda, industria, comercio)", "cyan"],
                    ["Potencia instalada total y tensión de suministro", "cyan"],
                    ["Características de la Línea General de Alimentación (LGA) y Derivación Individual (DI)", "purple"],
                    ["Protecciones: IGA, ICP, Diferencial (sensibilidad mA), PIAs", "purple"],
                    ["Resultado de los ensayos de aislamiento y tierra (valores medidos)", "emerald"],
                    ["N.º de registro de Industria de la empresa instaladora", "emerald"],
                    ["Firma y sello del Instalador Autorizado", "yellow"],
                  ].map(([item, color]) => (
                    <div key={item as string} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        color === "cyan" ? "bg-cyan-400" :
                        color === "purple" ? "bg-purple-400" :
                        color === "emerald" ? "bg-emerald-400" : "bg-yellow-400"
                      }`} />
                      {item as string}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-500 mb-3">5 Copias Oficiales</div>
                  <div className="space-y-2">
                    {[
                      { label: "Comunidad Autónoma", color: "bg-slate-700 text-slate-300" },
                      { label: "Instalador", color: "bg-slate-700 text-slate-300" },
                      { label: "Distribuidora eléctrica", color: "bg-slate-700 text-slate-300" },
                      { label: "Titular (×2)", color: "bg-cyan-900/60 text-cyan-200 font-bold border border-cyan-700/40" },
                    ].map(c => (
                      <div key={c.label} className={`px-3 py-2 rounded text-xs ${c.color}`}>{c.label}</div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Datos clave</div>
                  <div className="flex justify-between text-xs"><span className="text-slate-400">Validez general:</span><span className="text-white font-bold">20 años</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-400">Renovación ITE:</span><span className="text-white font-bold">cada 20 años</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-400">Firmado por:</span><span className="text-white font-bold">Instalador Autorizado</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-400">Trámite en:</span><span className="text-white font-bold">Industria / CCAA</span></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Flujo del protocolo */}
      <section>
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 mb-4">Flujo del Protocolo de Puesta en Servicio</h2>
        <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center md:items-stretch justify-center">
          {[
            { step: "1", label: "Verificación visual", sub: "Revisión física completa sin tensión", color: "bg-slate-800 border-slate-700" },
            { step: "2", label: "Ensayo de aislamiento", sub: "Megger a 500V CC en todos los circuitos", color: "bg-yellow-950/30 border-yellow-800/50" },
            { step: "3", label: "Continuidad PE", sub: "Multímetro: barra tierra → masas", color: "bg-cyan-950/30 border-cyan-800/50" },
            { step: "4", label: "Resistencia tierra", sub: "Telurómetro → ≤ 37 Ω", color: "bg-purple-950/30 border-purple-800/50" },
            { step: "5", label: "Dar tensión", sub: "Cierre secuencial: IGA → Dif → PIAs", color: "bg-emerald-950/30 border-emerald-800/50" },
            { step: "6", label: "Pruebas funcionales", sub: "Verificar cada circuito en carga", color: "bg-blue-950/30 border-blue-800/50" },
            { step: "7", label: "Emisión del CIE", sub: "Registrar valores y firmar el boletín", color: "bg-orange-950/30 border-orange-800/50" },
          ].map((item, idx, arr) => (
            <div key={idx} className="flex flex-col md:flex-row items-center w-full md:w-auto">
              <div className={`border rounded-xl p-3 text-center w-full md:w-32 ${item.color} shadow-lg shadow-black/20`}>
                <div className="text-2xl font-black text-white opacity-20 mb-1">{item.step}</div>
                <div className="text-xs font-bold text-slate-200 leading-tight mb-1">{item.label}</div>
                <div className="text-[10px] text-slate-400 leading-tight">{item.sub}</div>
              </div>
              {idx < arr.length - 1 && (
                <div className="flex flex-col md:flex-row items-center justify-center py-2 md:py-0 md:px-2">
                  <div className="h-4 md:h-0.5 w-0.5 md:w-4 bg-slate-700 relative">
                    <div className="absolute bottom-0 md:bottom-auto md:right-0 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 md:top-1/2 md:-translate-y-1/2 border-[4px] border-transparent border-t-slate-500 md:border-t-transparent md:border-l-slate-500" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
