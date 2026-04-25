import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Card";
import { PackageOpen, Map, ClipboardList, Cable, Box, TrendingDown, Truck, Search, QrCode, ShoppingCart, CheckSquare } from "lucide-react";
import { motion } from "motion/react";

export default function Provisioning() {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div>
        <nav className="text-xs text-cyan-500 font-mono mb-1 uppercase tracking-widest">Módulo 02 &gt; Gestión de Materiales</nav>
        <h1 className="text-3xl font-bold tracking-tight text-white">5. Aprovisionamiento y Almacén</h1>
        <p className="mt-2 text-slate-400">Organización, layout, manejo de materiales gráficos, y control de inventarios de obra.</p>
      </div>

      {/* Galería de Materiales Reales */}
      <section>
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
          <Cable className="w-5 h-5 text-cyan-400" />
          Materiales más Comunes en Almacén
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="group overflow-hidden rounded-xl border border-slate-700 bg-slate-900 relative">
            <div className="h-40 overflow-hidden">
               {/* Didactic image of cables provided by the user */}
               <img 
                 src="/cables.jpg" 
                 alt="Zonas de cables H07Z1-K" 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 bg-slate-800" 
               />
            </div>
            <div className="p-3">
              <h4 className="font-bold text-white text-sm">Conductores de Cobre</h4>
              <p className="text-xs text-slate-400 mt-1">Bobinas y rollos H07Z1-K. Alta rotación.</p>
            </div>
          </div>
          <div className="group overflow-hidden rounded-xl border border-slate-700 bg-slate-900 relative">
            <div className="h-40 overflow-hidden">
               {/* Verified working image of an electrical panel */}
               {/* Didactic image provided by the user */}
               <img 
                 src="/cuadro.jpg" 
                 alt="Cuadro eléctrico didáctico" 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 bg-slate-800" 
               />
            </div>
            <div className="p-3">
              <h4 className="font-bold text-white text-sm">Aparamenta y Cuadros</h4>
              <p className="text-xs text-slate-400 mt-1">Magnetotérmicos, diferenciales. Media rotación.</p>
            </div>
          </div>
          <div className="group overflow-hidden rounded-xl border border-slate-700 bg-slate-900 relative">
            <div className="h-40 overflow-hidden">
               {/* Real image of tools / multimeter - Using a known working image */}
               {/* Didactic image of Fluke instruments provided by the user */}
               <img 
                 src="/instrumentos.jpg" 
                 alt="Multímetros y pinzas Fluke" 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 bg-slate-800" 
               />
            </div>
            <div className="p-3">
              <h4 className="font-bold text-white text-sm">Instrumentos de Medida</h4>
              <p className="text-xs text-slate-400 mt-1">Multímetros, pinzas. Material delicado.</p>
            </div>
          </div>
          <div className="group overflow-hidden rounded-xl border border-slate-700 bg-slate-900 relative">
            <div className="h-40 overflow-hidden">
               {/* Real image of general construction/electrical work */}
               <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop" alt="Planos y proyecto" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 bg-slate-800" referrerPolicy="no-referrer" crossOrigin="anonymous" />
            </div>
            <div className="p-3">
              <h4 className="font-bold text-white text-sm">Proyecto Técnico</h4>
              <p className="text-xs text-slate-400 mt-1">Planos, MTD y especificaciones de obra.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Layout Section */}
        <section className="space-y-4 lg:col-span-2">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">Layout de Almacén (Zonificación)</h2>
          <Card className="bg-slate-900 border-slate-800 overflow-hidden">
            <div className="flex flex-col md:flex-row min-h-[500px] md:h-[400px]">
              <div className="w-full md:w-2/3 bg-slate-950 p-4 sm:p-6 relative group border-b md:border-b-0 md:border-r border-slate-800 h-[300px] md:h-full">
                 {/* Visual Warehouse map */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] mix-blend-overlay"></div>
                 
                 <div className="w-full h-full border-2 border-slate-700 relative rounded-lg bg-slate-900/50">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-2 bg-slate-700 rounded-b-md text-[8px] sm:text-[10px] text-center text-slate-500 font-bold">PUERTA</div>
                    
                    {/* Zones */}
                    <motion.div 
                      onHoverStart={() => setActiveZone("recepcion")}
                      onHoverEnd={() => setActiveZone(null)}
                      onClick={() => setActiveZone(activeZone === "recepcion" ? null : "recepcion")}
                      className={`absolute top-2 left-2 right-2 h-12 sm:h-16 border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors text-[10px] sm:text-xs text-center px-2 ${activeZone === "recepcion" ? "border-cyan-500 bg-cyan-500/10 text-cyan-300" : "border-slate-600 bg-slate-800 text-slate-400"}`}
                    >
                      Zona de Recepción y Control
                    </motion.div>

                    <div className="absolute top-16 sm:top-24 left-2 sm:left-4 bottom-16 sm:bottom-24 w-1/3 flex flex-col gap-2">
                      <motion.div 
                        onHoverStart={() => setActiveZone("alta-rotacion")}
                        onHoverEnd={() => setActiveZone(null)}
                        onClick={() => setActiveZone(activeZone === "alta-rotacion" ? null : "alta-rotacion")}
                        className={`flex-1 border-2 flex items-center justify-center cursor-pointer text-center text-[9px] sm:text-xs font-bold transition-colors px-1 ${activeZone === "alta-rotacion" ? "border-green-500 bg-green-500/10 text-green-400" : "border-slate-600 bg-slate-800 text-slate-400"}`}
                      >
                        ALTA ROTACIÓN (Cables, Mecanismos)
                      </motion.div>
                    </div>

                    <div className="absolute top-16 sm:top-24 right-2 sm:right-4 bottom-16 sm:bottom-24 w-[60%] flex flex-col gap-2">
                      <motion.div 
                        onHoverStart={() => setActiveZone("baja-rotacion")}
                        onHoverEnd={() => setActiveZone(null)}
                        onClick={() => setActiveZone(activeZone === "baja-rotacion" ? null : "baja-rotacion")}
                        className={`flex-1 border-2 flex items-center justify-center cursor-pointer text-center text-[9px] sm:text-xs transition-colors px-1 ${activeZone === "baja-rotacion" ? "border-orange-500 bg-orange-500/10 text-orange-400" : "border-slate-600 bg-slate-800 text-slate-400"}`}
                      >
                        BAJA ROTACIÓN (Cuadros, Equipos Específicos)
                      </motion.div>
                    </div>

                    <motion.div 
                      onHoverStart={() => setActiveZone("expedicion")}
                      onHoverEnd={() => setActiveZone(null)}
                      onClick={() => setActiveZone(activeZone === "expedicion" ? null : "expedicion")}
                      className={`absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 h-12 sm:h-16 border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors text-[10px] sm:text-xs text-center px-2 ${activeZone === "expedicion" ? "border-purple-500 bg-purple-500/10 text-purple-300" : "border-slate-600 bg-slate-800 text-slate-400"}`}
                    >
                      Zona de Expedición (Salida a Obra)
                    </motion.div>
                 </div>
              </div>
              <div className="w-full md:w-1/3 border-l border-slate-800 bg-slate-800/20 p-4 sm:p-6 flex flex-col min-h-[150px]">
                <h3 className="font-bold text-white mb-2 flex items-center gap-2"><Map className="w-4 h-4 text-cyan-400" /> Información Zona</h3>
                <div className="flex-1 overflow-y-auto">
                  {activeZone === "recepcion" && <p className="text-sm text-slate-300">Aquí se realiza el control de calidad, verificación de remitos y descarga de materiales provenientes del proveedor.</p>}
                  {activeZone === "alta-rotacion" && <p className="text-sm text-slate-300">Deben estar lo más accesibles posible. Incluye elementos como cableado común, tubos de PVC corrugado y mecanismos de iluminación básicos.</p>}
                  {activeZone === "baja-rotacion" && <p className="text-sm text-slate-300">Elementos voluminosos o que se necesitan en etapas finales. Requieren menos accesos por lo que pueden estar más alejados de las puertas.</p>}
                  {activeZone === "expedicion" && <p className="text-sm text-slate-300">Zona donde se preparan los kits o "picking" antes de trasladar el material hacia los puntos exactos de la obra a ejecutar.</p>}
                  {!activeZone && <p className="text-sm text-slate-500 italic">Pulsa o pasa el ratón sobre las zonas del mapa para ver los detalles.</p>}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Dashboard de Stock en Tiempo Real (Simulación) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-orange-400" /> Control de Stock y Alertas (Simulador)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { item: "Cable H07Z1-K 2.5mm² (Azul)", stock: 150, unit: "m", min: 200, status: "critical" },
            { item: "PIA 1P+N 16A (Curva C)", stock: 42, unit: "uds", min: 10, status: "ok" },
            { item: "Tubo Corrugado 20mm", stock: 15, unit: "m", min: 50, status: "critical" },
            { item: "Cajas Registro 100x100", stock: 8, unit: "uds", min: 20, status: "warning" },
          ].map((item, idx) => (
            <Card key={idx} className="bg-slate-900 border-slate-800 overflow-hidden relative">
              <div className={`absolute top-0 left-0 w-1 h-full ${item.status === 'critical' ? 'bg-red-500' : item.status === 'warning' ? 'bg-yellow-500' : 'bg-emerald-500'}`} />
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.status === 'critical' ? 'Reponer YA' : item.status === 'warning' ? 'Stock Bajo' : 'Suficiente'}</div>
                  {item.status !== 'ok' && <TrendingDown className={`w-3 h-3 ${item.status === 'critical' ? 'text-red-400' : 'text-yellow-400'}`} />}
                </div>
                <div className="font-bold text-white text-sm mb-1">{item.item}</div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-black ${item.status === 'critical' ? 'text-red-400' : 'text-slate-200'}`}>{item.stock}</span>
                  <span className="text-xs text-slate-500">{item.unit}</span>
                </div>
                <div className="mt-3 w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className={`h-full ${item.status === 'critical' ? 'bg-red-500' : item.status === 'warning' ? 'bg-yellow-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, (item.stock / (item.min * 1.5)) * 100)}%` }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Ciclo de Aprovisionamiento */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          <Truck className="w-5 h-5 text-cyan-400" /> Flujo de Gestión de Pedidos
        </h2>
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {[
              { icon: <Search className="w-5 h-5" />, label: "Necesidad", desc: "Detección faltas" },
              { icon: <ShoppingCart className="w-5 h-5" />, label: "Pedido", desc: "Orden de compra" },
              { icon: <Truck className="w-5 h-5" />, label: "Logística", desc: "Transporte/Envío" },
              { icon: <QrCode className="w-5 h-5" />, label: "Recepción", desc: "Control Albarán" },
              { icon: <Box className="w-5 h-5" />, label: "Almacén", desc: "Ubicación SGA" },
            ].map((step, idx, arr) => (
              <div key={idx} className="flex flex-col md:flex-row items-center gap-4 flex-1">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 mb-2 group-hover:border-cyan-500 transition-all">
                    {step.icon}
                  </div>
                  <div className="text-xs font-bold text-white">{step.label}</div>
                  <div className="text-[10px] text-slate-500">{step.desc}</div>
                </div>
                {idx < arr.length - 1 && (
                  <div className="hidden md:block h-px flex-1 bg-slate-800 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 border-[4px] border-transparent border-l-slate-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* picking exercise */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-emerald-400" /> Ejercicio: Picking para Circuito C1 (Iluminación)
        </h2>
        <Card className="bg-slate-950 border-slate-800 border-dashed">
          <CardContent className="p-6">
            <p className="text-sm text-slate-400 mb-6">Selecciona el material necesario para montar un circuito de iluminación completo según ITC-BT-25.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Cable 1.5mm²", correct: true },
                { name: "Cable 6mm²", correct: false },
                { name: "PIA 10A", correct: true },
                { name: "PIA 25A", correct: false },
                { name: "Tubo 16mm", correct: true },
                { name: "Portalámparas", correct: true },
                { name: "Base 25A", correct: false },
                { name: "Diferencial 40A", correct: true },
              ].map((m, i) => (
                <button 
                  key={i}
                  className="p-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-slate-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-all text-left flex justify-between items-center group"
                >
                  {m.name}
                  <div className="w-4 h-4 rounded border border-slate-700 group-hover:border-cyan-500/50" />
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold py-2 px-6 rounded-lg transition-all shadow-lg shadow-cyan-500/10">Validar Pedido</button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Teoría General */}
        <Card className="bg-slate-800/30 border-slate-700">
          <CardHeader className="border-b border-slate-700 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg border border-slate-600">
                <PackageOpen className="w-5 h-5 text-cyan-400" />
              </div>
              <CardTitle className="text-lg text-white">Tipos de Almacenamiento</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-400 space-y-4">
            <div className="w-full h-40 rounded-lg overflow-hidden border border-slate-700 relative bg-slate-800">
               <div className="absolute inset-0 bg-slate-900/20 mix-blend-overlay z-10 pointer-events-none"></div>
               <img 
                 src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop" 
                 alt="Almacén logístico" 
                 className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" 
                 referrerPolicy="no-referrer" 
                 crossOrigin="anonymous" 
               />
            </div>
            <ul className="space-y-4">
              <li>
                <strong className="text-slate-200 block mb-1">Almacén de Obra Cerrado</strong>
                Se requiere para material eléctrico, herramientas y equipamiento sensible, ya que protege contra la intemperie y robos. Siempre debe haber un responsable.
              </li>
              <li>
                <strong className="text-slate-200 block mb-1">Almacenamiento Tradicional</strong>
                Uso de estanterías y racks. Permite un control físico riguroso del inventario estandar.
              </li>
              <li>
                <strong className="text-slate-200 block mb-1">Almacenamiento Automatizado</strong>
                Uso de tecnología, código de barras y sistemas SGA (Software de Gestión de Almacenes) para clasificación y registro automático.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/30 border-slate-700">
          <CardHeader className="border-b border-slate-700 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg border border-slate-600">
                <ClipboardList className="w-5 h-5 text-emerald-400" />
              </div>
              <CardTitle className="text-lg text-white">Ciclos de Compra e Inventario</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-400 space-y-3">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-slate-200">Hoja de entrega:</strong> Registra momento, forma y cantidad en que se distribuyen materiales a los empleados, evitando descuadres presupuestarios.</li>
              <li><strong className="text-slate-200">Stock de Seguridad:</strong> Mantener niveles óptimos para evitar roturas de stock (falta de material que paraliza la obra).</li>
              <li><strong className="text-slate-200">Ciclo de compras:</strong> 
                <ol className="list-decimal pl-5 mt-1 space-y-1 text-xs">
                  <li>Identificar necesidades de obra.</li>
                  <li>Seleccionar proveedor.</li>
                  <li>Negociar contrato o pedida.</li>
                  <li>Recepción y evaluación de calidad.</li>
                </ol>
              </li>
              <li><strong className="text-slate-200">Software SGA:</strong> Vital en la automatización del inventariado, alertas de reposición y control estricto de entradas y salidas.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
