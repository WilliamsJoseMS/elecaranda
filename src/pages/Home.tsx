import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Card";
import { Link } from "react-router-dom";
import { BookOpen, Zap, Compass, PenTool, Hand, FileText, Box, CalendarDays, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 h-full flex flex-col">
      <section className="text-center space-y-4 pt-4 pb-8 flex-shrink-0">
        <nav className="text-xs text-cyan-500 font-mono mb-2 uppercase tracking-widest">Temario Completo &gt; ELEE0310</nav>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Instalaciones Eléctricas de Edificios
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-400">
          Aprende de forma interactiva la normativa, la simbología, planificación, gestión de almacén y las pruebas del REBT.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/basics" className="block h-full">
            <Card className="h-full border-slate-700 hover:border-cyan-500/50 transition-colors cursor-pointer group">
              <CardHeader className="p-4 pb-2">
                <div className="bg-slate-800/80 w-10 h-10 flex items-center justify-center rounded-lg mb-2 border border-slate-700 group-hover:border-cyan-500/50 transition-all">
                  <BookOpen className="text-cyan-500 w-5 h-5" />
                </div>
                <CardTitle className="text-base">1. Conceptos</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 p-4 pt-0 text-sm">
                Ley de Ohm, Corriente CC y CA. Circuitos.
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/conductors" className="block h-full">
            <Card className="h-full border-slate-700 hover:border-cyan-500/50 transition-colors cursor-pointer group">
              <CardHeader className="p-4 pb-2">
                <div className="bg-slate-800/80 w-10 h-10 flex items-center justify-center rounded-lg mb-2 border border-slate-700 group-hover:border-cyan-500/50 transition-all">
                  <Zap className="text-cyan-500 w-5 h-5" />
                </div>
                <CardTitle className="text-base">2. Conductores</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 p-4 pt-0 text-sm">
                Tipos de cables, colores REBT y reglas CPR.
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/symbology" className="block h-full">
            <Card className="h-full border-slate-700 hover:border-cyan-500/50 transition-colors cursor-pointer group">
              <CardHeader className="p-4 pb-2">
                <div className="bg-slate-800/80 w-10 h-10 flex items-center justify-center rounded-lg mb-2 border border-slate-700 group-hover:border-cyan-500/50 transition-all">
                  <Compass className="text-cyan-500 w-5 h-5" />
                </div>
                <CardTitle className="text-base">3. Simbología</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 p-4 pt-0 text-sm">
                Esquemas unifilares, multifilares y funcionales.
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/documentation" className="block h-full">
            <Card className="h-full border-slate-700 hover:border-cyan-500/50 transition-colors cursor-pointer group">
              <CardHeader className="p-4 pb-2">
                <div className="bg-slate-800/80 w-10 h-10 flex items-center justify-center rounded-lg mb-2 border border-slate-700 group-hover:border-cyan-500/50 transition-all">
                  <FileText className="text-cyan-500 w-5 h-5" />
                </div>
                <CardTitle className="text-base">4. Doc. y Normas</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 p-4 pt-0 text-sm">
                Memorias, Pliegos, Presupuestos y Normas UNE/REBT.
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/provisioning" className="block h-full">
            <Card className="h-full border-slate-700 hover:border-cyan-500/50 transition-colors cursor-pointer group">
              <CardHeader className="p-4 pb-2">
                <div className="bg-slate-800/80 w-10 h-10 flex items-center justify-center rounded-lg mb-2 border border-slate-700 group-hover:border-cyan-500/50 transition-all">
                  <Box className="text-cyan-500 w-5 h-5" />
                </div>
                <CardTitle className="text-base">5. Almacén</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 p-4 pt-0 text-sm">
                Organización de almacén, layouts, software SGA y stock.
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/planning" className="block h-full">
            <Card className="h-full border-slate-700 hover:border-cyan-500/50 transition-colors cursor-pointer group">
              <CardHeader className="p-4 pb-2">
                <div className="bg-slate-800/80 w-10 h-10 flex items-center justify-center rounded-lg mb-2 border border-slate-700 group-hover:border-cyan-500/50 transition-all">
                  <CalendarDays className="text-cyan-500 w-5 h-5" />
                </div>
                <CardTitle className="text-base">6. Planificación</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 p-4 pt-0 text-sm">
                Diagramas de Gantt, PERT, método PDM y rendimientos.
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/instruments" className="block h-full">
            <Card className="h-full border-slate-700 hover:border-cyan-500/50 transition-colors cursor-pointer group">
              <CardHeader className="p-4 pb-2">
                <div className="bg-slate-800/80 w-10 h-10 flex items-center justify-center rounded-lg mb-2 border border-slate-700 group-hover:border-cyan-500/50 transition-all">
                  <PenTool className="text-cyan-500 w-5 h-5" />
                </div>
                <CardTitle className="text-base">7. Instrumentos</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 p-4 pt-0 text-sm">
                Uso del multímetro y polímetro digital. Modos de uso.
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/testing" className="block h-full">
            <Card className="h-full border-slate-700 hover:border-cyan-500/50 transition-colors cursor-pointer group">
              <CardHeader className="p-4 pb-2">
                <div className="bg-slate-800/80 w-10 h-10 flex items-center justify-center rounded-lg mb-2 border border-slate-700 group-hover:border-cyan-500/50 transition-all">
                  <ShieldCheck className="text-cyan-500 w-5 h-5" />
                </div>
                <CardTitle className="text-base">8. Pruebas</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 p-4 pt-0 text-sm">
                Protocolos de seguridad, ensayos dieléctricos y certificado (CIE).
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </div>

      <section className="mt-8 bg-cyan-950/20 p-8 rounded-3xl border border-cyan-800/30 text-center flex-shrink-0">
        <Hand className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-white">Interactivo y Didáctico</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm">
          Cada módulo incorpora teoría fundamental, ejemplos gráficos y herramientas interactivas basadas en el currículo formativo ELEE0310.
        </p>
      </section>
    </div>
  );
}
