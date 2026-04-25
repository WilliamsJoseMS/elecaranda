import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Card";
import { FileText, Calculator, HardHat, FileCheck2, FileSignature, Receipt, FileSpreadsheet } from "lucide-react";

export default function Documentation() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-10">
      <div>
        <nav className="text-xs text-cyan-500 font-mono mb-1 uppercase tracking-widest">Módulo 01 &gt; Documentación Técnica</nav>
        <h1 className="text-3xl font-bold tracking-tight text-white">4. Documentación y Normativa</h1>
        <p className="mt-2 text-slate-400">Todo sobre Proyectos, Memoria Técnica de Diseño (MTD), Presupuestos, Formularios y Normativa.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/30 border-slate-700">
          <CardHeader className="border-b border-slate-700 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg border border-slate-600 shadow-inner">
                <FileText className="w-5 h-5 text-cyan-400" />
              </div>
              <CardTitle className="text-lg text-white">Proyecto vs. MTD</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-400 space-y-4">
            <p>
              Según el <strong className="text-cyan-300">Reglamento Electrotécnico de Baja Tensión (REBT)</strong>, la documentación técnica varía según la potencia y el tipo de uso.
            </p>
            
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/50">
              <table className="w-full text-[10px] text-left">
                <thead className="bg-slate-900 text-slate-400 uppercase font-mono">
                  <tr>
                    <th className="px-3 py-2">Tipo de Instalación</th>
                    <th className="px-3 py-2 text-center">Proyecto</th>
                    <th className="px-3 py-2 text-center">MTD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr><td className="px-3 py-2">Industrias en general</td><td className="px-3 py-2 text-center text-red-400">P &gt; 20 kW</td><td className="px-3 py-2 text-center text-cyan-400">P ≤ 20 kW</td></tr>
                  <tr><td className="px-3 py-2">Locales mojados / con riesgo</td><td className="px-3 py-2 text-center text-red-400">P &gt; 10 kW</td><td className="px-3 py-2 text-center text-cyan-400">P ≤ 10 kW</td></tr>
                  <tr><td className="px-3 py-2">Bombas de extracción de agua</td><td className="px-3 py-2 text-center text-red-400">P &gt; 10 kW</td><td className="px-3 py-2 text-center text-cyan-400">P ≤ 10 kW</td></tr>
                  <tr><td className="px-3 py-2">Viviendas unifamiliares</td><td className="px-3 py-2 text-center text-red-400">P &gt; 50 kW</td><td className="px-3 py-2 text-center text-cyan-400">P ≤ 50 kW</td></tr>
                  <tr><td className="px-3 py-2">Garajes (Ventilación forzada)</td><td className="px-3 py-2 text-center text-red-400">SIEMPRE</td><td className="px-3 py-2 text-center text-slate-600">—</td></tr>
                  <tr><td className="px-3 py-2">Pública Concurrencia</td><td className="px-3 py-2 text-center text-red-400">SIEMPRE</td><td className="px-3 py-2 text-center text-slate-600">—</td></tr>
                  <tr><td className="px-3 py-2">Alumbrado exterior</td><td className="px-3 py-2 text-center text-red-400">P &gt; 5 kW</td><td className="px-3 py-2 text-center text-cyan-400">P ≤ 5 kW</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-950/20 border border-amber-800/40 p-3 rounded-lg flex gap-3">
              <HardHat className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-amber-200 uppercase mb-1">Seguridad y Salud (EBSS)</h4>
                <p className="text-[11px] text-amber-200/70">Obligatorio según el RD 1627/1997. Identifica riesgos, medidas preventivas y protocolos de protección para los operarios durante el montaje.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/30 border-slate-700">
          <CardHeader className="border-b border-slate-700 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg border border-slate-600 shadow-inner">
                <FileCheck2 className="w-5 h-5 text-purple-400" />
              </div>
              <CardTitle className="text-lg text-white">Partes de un Proyecto Técnico</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-400">
             <ul className="space-y-4">
                <li className="flex items-start gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800 shadow-inner">
                  <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">1</span>
                  <div>
                    <strong className="text-purple-300 block mb-1">Memoria Descriptiva y Cálculos:</strong> 
                    Datos del titular, previsiones de cargas, justificación térmica y de caída de tensión de los conductores.
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800 shadow-inner">
                  <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">2</span>
                  <div>
                    <strong className="text-purple-300 block mb-1">Planos:</strong> 
                    Situación, emplazamiento, plano topográfico, esquemas unifilares y detalle de cuadros eléctricos.
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800 shadow-inner">
                  <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">3</span>
                  <div>
                    <strong className="text-purple-300 block mb-1">Pliego de Condiciones:</strong> 
                    Calidad de materiales a emplear, normativas aplicables y garantías obligatorias de la instalación.
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800 shadow-inner">
                  <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">4</span>
                  <div>
                    <strong className="text-purple-300 block mb-1">Mediciones y Presupuesto:</strong> 
                    Base para licitar y cobrar. Cuantifica todo el material e incluye coste de mano de obra.
                  </div>
                </li>
             </ul>
          </CardContent>
        </Card>
      </div>

      {/* Forms & Documentation Deep Dive */}
      <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-2 mt-12 mb-6">Formularios y Certificados Clave</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CIE Example */}
        <Card className="bg-slate-900/50 border-slate-700 overflow-hidden">
          <div className="h-40 bg-slate-300 relative overflow-hidden flex items-center justify-center border-b border-slate-700">
            {/* Visual simulation of a certificate */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
            <div className="w-[80%] h-[90%] bg-white rounded shadow-xl flex flex-col p-4">
              <div className="h-6 w-1/2 bg-blue-900/20 mb-4 rounded"></div>
              <div className="h-2 w-full bg-slate-200 mb-1 rounded"></div>
              <div className="h-2 w-3/4 bg-slate-200 mb-4 rounded"></div>
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="space-y-1">
                  <div className="h-2 w-full bg-slate-100 rounded"></div>
                  <div className="h-2 w-full bg-slate-100 rounded"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-2 w-full bg-slate-100 rounded"></div>
                  <div className="h-2 w-full bg-slate-100 rounded"></div>
                </div>
              </div>
              <div className="h-8 w-8 rounded-full border-2 border-red-500/50 self-end mt-2 animate-pulse"></div>
            </div>
          </div>
          <CardContent className="pt-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <Receipt className="w-5 h-5 text-emerald-400" />
              Certificado de Instalación (CIE) / Boletín
            </h3>
            <p className="text-sm text-slate-400 mb-4">Es el documento final que atestigua que la instalación cumple con el REBT. Es imprescindible para dar de alta el suministro con la compañía eléctrica.</p>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">¿Qué debes rellenar en el CIE?</h4>
              <ul className="text-xs text-slate-400 list-disc pl-4 space-y-1">
                <li>Datos del titular y emplazamiento exacto.</li>
                <li>Características generales (uso, potencia instalada, tensión).</li>
                <li>Características de la Línea General de Alimentación y Derivación.</li>
                <li>Datos de las protecciones: diferencial (sensibilidad), ICP e IGA.</li>
                <li>Empresa instaladora y número de registro de Industria.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* MTD Example */}
        <Card className="bg-slate-900/50 border-slate-700 overflow-hidden">
          <div className="h-40 bg-slate-800 relative overflow-hidden flex flex-col items-center justify-center border-b border-slate-700 p-4">
            <div className="w-full flex gap-2 h-full">
              {/* Form columns simulation */}
              <div className="bg-slate-900 rounded p-2 flex-1 border border-slate-700/50 flex flex-col gap-2">
                 <div className="h-3 w-1/3 bg-cyan-900/50 rounded"></div>
                 <div className="h-6 w-full bg-slate-800 rounded border border-slate-700"></div>
                 <div className="h-6 w-full bg-slate-800 rounded border border-slate-700"></div>
                 <div className="h-6 w-full bg-slate-800 rounded border border-slate-700"></div>
              </div>
              <div className="bg-slate-900 rounded p-2 flex-1 border border-slate-700/50 flex flex-col gap-2">
                 <div className="h-5 w-full bg-emerald-900/30 rounded border border-emerald-900/50 mt-auto flex items-center justify-center">
                    <div className="h-1 w-1/2 bg-emerald-500/50 rounded"></div>
                 </div>
              </div>
            </div>
          </div>
          <CardContent className="pt-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
              Memoria Técnica de Diseño (MTD)
            </h3>
            <p className="text-sm text-slate-400 mb-4">La MTD es como un "mini-proyecto" estandarizado (formulario impreso o telemático) adoptado por cada Comunidad Autónoma.</p>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Apartados críticos de llenado</h4>
              <ul className="text-xs text-slate-400 list-disc pl-4 space-y-1">
                <li><strong className="text-slate-200">Croquis de trazado:</strong> No exige AutoCAD, pero debe mostrar por dónde van los tubos y registros.</li>
                <li><strong className="text-slate-200">Esquema unifilar:</strong> Representación gráfica de los magnetotérmicos y cableado.</li>
                <li><strong className="text-slate-200">Cálculos:</strong> Justificación de la sección de cables (ej. L: 15m, I: 16A → S: 2.5mm²).</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Presupuestos y Cobros */}
      <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-2 mt-12 mb-6">Elaboración de Presupuestos</h2>
      <Card className="bg-slate-800/30 border-slate-700">
        <CardHeader className="border-b border-slate-700 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg border border-slate-600 shadow-inner">
              <Calculator className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <CardTitle className="text-lg text-white">Estructura del Presupuesto (Ejemplo Real)</CardTitle>
              <p className="text-xs text-slate-400 mt-1">Cómo desgloar y cobrar correctamente una instalación.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto rounded-xl border border-slate-700 mb-6 bg-slate-950/50">
            <table className="w-full text-sm text-left text-slate-300">
              <thead className="text-xs text-slate-400 uppercase bg-slate-900 border-b border-slate-700 font-mono">
                <tr>
                  <th className="px-4 py-3">Código</th>
                  <th className="px-4 py-3 w-1/2">Descripción (Unidad de Obra)</th>
                  <th className="px-4 py-3 text-right">Uds</th>
                  <th className="px-4 py-3 text-right">Precio Ud.</th>
                  <th className="px-4 py-3 text-right text-white">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                {/* Partida 1 */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 text-cyan-500 font-bold">E01.100</td>
                  <td className="px-4 py-3">
                    <strong className="text-white">Ud Cuadro Eléctrico Vivienda Básica.</strong><br/>
                    <span className="text-slate-500">Suministro e instalación de CGMP empotrado 24 mod. Incluye IGA 25A, Dif 40A/30mA, 5x PIAs (10A, 16A, 16A, 20A, 25A), peines y cableado interior. P/p de pio y mano de obra.</span>
                  </td>
                  <td className="px-4 py-3 text-right">1.00</td>
                  <td className="px-4 py-3 text-right">245.00 €</td>
                  <td className="px-4 py-3 text-right text-emerald-400 font-bold">245.00 €</td>
                </tr>
                {/* Partida 2 */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 text-cyan-500 font-bold">E02.010</td>
                  <td className="px-4 py-3">
                    <strong className="text-white">Ml Línea Iluminación 1.5mm2.</strong><br/>
                    <span className="text-slate-500">Metro lineal de conductor H07Z1-K 3x1.5mm2 bajo tubo corrugado M/L diámetro 16mm empotrado en falso techo o roza.</span>
                  </td>
                  <td className="px-4 py-3 text-right">120.0</td>
                  <td className="px-4 py-3 text-right">6.50 €</td>
                  <td className="px-4 py-3 text-right text-emerald-400 font-bold">780.00 €</td>
                </tr>
                 {/* Partida 3 */}
                 <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 text-cyan-500 font-bold">E03.050</td>
                  <td className="px-4 py-3">
                    <strong className="text-white">Ud Mecanismo Enchufe Schuko 16A.</strong><br/>
                    <span className="text-slate-500">Suministro y montaje de base de enchufe con TT lateral tipo Schuko, color blanco serie estándar Simon 270 o similar, caja univ.</span>
                  </td>
                  <td className="px-4 py-3 text-right">18.00</td>
                  <td className="px-4 py-3 text-right">12.00 €</td>
                  <td className="px-4 py-3 text-right text-emerald-400 font-bold">216.00 €</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               <h4 className="font-bold text-white flex items-center gap-2">¿Cómo se calcula el "Precio Ud."?</h4>
               <p className="text-sm text-slate-400">El precio unitario no es solo lo que cuesta el enchufe en la tienda. Incluye el concepto de <strong>"Suministro e Instalación"</strong>. Ejemplo para 1 Enchufe (E03.050):</p>
               <ul className="text-xs font-mono bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2 text-slate-300">
                 <li className="flex justify-between border-b border-slate-800 pb-1">
                   <span>· Material (Mecanismo + Caja)</span>
                   <span>5.50 €</span>
                 </li>
                 <li className="flex justify-between border-b border-slate-800 pb-1">
                   <span>· Mano de Obra (0.2 h × 25€/h)</span>
                   <span>5.00 €</span>
                 </li>
                 <li className="flex justify-between border-b border-slate-800 pb-1 text-slate-500">
                   <span>· Medios y material auxiliar (Tornillos, etc) (5%)</span>
                   <span>0.25 €</span>
                 </li>
                 <li className="flex justify-between border-b border-slate-800 pb-1 text-slate-500">
                   <span>· Costes Indirectos (Gasolina, gestiones) (12%)</span>
                   <span>1.25 €</span>
                 </li>
                 <li className="flex justify-between text-cyan-400 font-bold pt-1">
                   <span>PRECIO EJECUCIÓN MATERIAL UNITARIO</span>
                   <span>12.00 €</span>
                 </li>
               </ul>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-inner flex flex-col justify-end">
              <div className="space-y-3 font-mono text-sm max-w-[300px] ml-auto w-full">
                <div className="flex justify-between text-slate-300">
                  <span>Suma Partidas:</span>
                  <span>1.241,00 €</span>
                </div>
                <div className="flex justify-between text-slate-400 text-xs">
                  <span>Gastos Generales (13%):</span>
                  <span>161,33 €</span>
                </div>
                <div className="flex justify-between text-slate-400 text-xs border-b border-slate-700 pb-3">
                  <span>Beneficio Industrial (6%):</span>
                  <span>74,46 €</span>
                </div>
                <div className="flex justify-between text-white font-bold text-base">
                  <span>Base Imponible:</span>
                  <span>1.476,79 €</span>
                </div>
                <div className="flex justify-between text-cyan-400 border-b border-slate-700 pb-3">
                  <span>IVA (21%):</span>
                  <span>310,13 €</span>
                </div>
                <div className="flex justify-between text-green-400 font-bold text-xl pt-2">
                  <span>TOTAL:</span>
                  <span>1.786,92 €</span>
                </div>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      <CalculatorTool />

      {/* Normativa */}
      <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-2 mt-12 mb-6">Normativa Fundamental</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 transition-colors">
            <CardHeader className="p-4">
              <h3 className="text-cyan-400 font-bold mb-1">REBT (RD 842/2002)</h3>
              <p className="text-xs text-slate-400">Reglamento Electrotécnico para Baja Tensión. El "Evangelio" del instalador en España.</p>
            </CardHeader>
          </Card>
          <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 transition-colors">
            <CardHeader className="p-4">
              <h3 className="text-cyan-400 font-bold mb-1">CTE</h3>
              <p className="text-xs text-slate-400">Código Técnico de la Edificación. Establece las exigencias básicas de calidad y seguridad para los edificios y sus instalaciones.</p>
            </CardHeader>
          </Card>
          <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 transition-colors">
            <CardHeader className="p-4">
              <h3 className="text-cyan-400 font-bold mb-1">ITC-BT (Instrucciones Técnicas)</h3>
              <p className="text-xs text-slate-400">Anexas al REBT (hay 52). La ITC-BT-19 define instalaciones interiores, la ITC-BT-25 viviendas...</p>
            </CardHeader>
          </Card>
          <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 transition-colors">
            <CardHeader className="p-4">
              <h3 className="text-cyan-400 font-bold mb-1">Normativas UNE/CENELEC</h3>
              <p className="text-xs text-slate-400">Normas Españolas y Europeas. Detallan reglas específicas, ej: UNE-EN-60617 para Simbología.</p>
            </CardHeader>
          </Card>
      </div>

    </div>
  );
}

function CalculatorTool() {
  const [material, setMaterial] = useState<number>(5.50);
  const [hours, setHours] = useState<number>(0.2);
  const [priceHour, setPriceHour] = useState<number>(25);
  const [indirect, setIndirect] = useState<number>(12);
  const [overhead, setOverhead] = useState<number>(13);
  const [profit, setProfit] = useState<number>(6);

  const laborCost = hours * priceHour;
  const auxiliary = (material + laborCost) * 0.05;
  const itemTotal = material + laborCost + auxiliary;
  const indirectCost = itemTotal * (indirect / 100);
  const finalUnitPrice = itemTotal + indirectCost;

  const overheadCost = finalUnitPrice * (overhead / 100);
  const profitCost = finalUnitPrice * (profit / 100);
  const contractPrice = finalUnitPrice + overheadCost + profitCost;
  const vat = contractPrice * 0.21;
  const totalWithVat = contractPrice + vat;

  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-emerald-900/50 overflow-hidden mt-12 shadow-2xl">
      <CardHeader className="bg-emerald-900/20 border-b border-emerald-900/40">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/40">
            <Calculator className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <CardTitle className="text-lg text-white">Calculadora de Precios Descompuestos</CardTitle>
            <p className="text-xs text-emerald-400/70">Herramienta didáctica para el cálculo de presupuestos (Págs 41-43 del manual).</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">Costes Directos (Unitarios)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Costo Material (€)</label>
                <input type="number" value={material} onChange={e => setMaterial(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm focus:border-emerald-500 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Mano de Obra (Horas)</label>
                <input type="number" step="0.1" value={hours} onChange={e => setHours(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm focus:border-emerald-500 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Precio Hora (€/h)</label>
                <input type="number" value={priceHour} onChange={e => setPriceHour(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm focus:border-emerald-500 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Gastos Indirectos (%)</label>
                <input type="number" value={indirect} onChange={e => setIndirect(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm focus:border-emerald-500 outline-none" />
              </div>
            </div>

            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2 mt-6">Coeficientes de Empresa</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Gastos Generales (%)</label>
                <input type="number" value={overhead} onChange={e => setOverhead(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm focus:border-emerald-500 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Beneficio Indust. (%)</label>
                <input type="number" value={profit} onChange={e => setProfit(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm focus:border-emerald-500 outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-emerald-900/30 rounded-2xl p-6 flex flex-col shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[60px] rounded-full"></div>
             
             <div className="space-y-3 font-mono">
               <div className="flex justify-between text-xs text-slate-500">
                 <span>Material + Mano de Obra:</span>
                 <span className="text-slate-300">{(material + laborCost).toFixed(2)} €</span>
               </div>
               <div className="flex justify-between text-xs text-slate-500 border-b border-slate-900 pb-2">
                 <span>Mat. Auxiliar (5%):</span>
                 <span className="text-slate-300">{auxiliary.toFixed(2)} €</span>
               </div>
               <div className="flex justify-between text-sm text-cyan-400 font-bold pt-1">
                 <span>PRECIO UNITARIO (Base):</span>
                 <span>{finalUnitPrice.toFixed(2)} €</span>
               </div>
               
               <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
                 <div className="flex justify-between text-[11px] text-slate-400">
                   <span>G. Generales ({overhead}%):</span>
                   <span>{overheadCost.toFixed(2)} €</span>
                 </div>
                 <div className="flex justify-between text-[11px] text-slate-400 border-b border-slate-900 pb-2">
                   <span>B. Industrial ({profit}%):</span>
                   <span>{profitCost.toFixed(2)} €</span>
                 </div>
                 <div className="flex justify-between text-base text-white font-bold">
                   <span>PRECIO DE CONTRATA:</span>
                   <span>{contractPrice.toFixed(2)} €</span>
                 </div>
                 <div className="flex justify-between text-xs text-emerald-500">
                   <span>IVA (21%):</span>
                   <span>{vat.toFixed(2)} €</span>
                 </div>
                 <div className="flex justify-between text-xl text-emerald-400 font-black border-t border-emerald-900/50 pt-3 mt-2">
                   <span>PRECIO FINAL:</span>
                   <span>{totalWithVat.toFixed(2)} €</span>
                 </div>
               </div>
             </div>
             
             <div className="mt-auto pt-6 flex items-center gap-2 text-[10px] text-slate-500 italic text-center">
               <Receipt className="w-3 h-3" />
               Cálculo basado en la estructura normativa de contratos públicos y privados del manual ELEE0310.
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
