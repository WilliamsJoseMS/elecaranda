import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Card";
import { PackageOpen, Map, ClipboardList, Cable } from "lucide-react";
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
