import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { CheckCircle2, XCircle, Clock, AlertCircle, HelpCircle, Users, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Tipos
interface Question {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

// Banco de preguntas expandido (se seleccionarán 15 aleatorias para cada intento)
const allQuestions: Question[] = [
  {
    question: "En instalaciones individuales de viviendas, ¿de qué material deben ser los conductores según el REBT?",
    options: ["Aluminio", "Cobre", "Plata", "Fibra Óptica"],
    answer: 1,
    explanation: "El REBT especifica que los conductores en viviendas deben ser exclusivamente de cobre."
  },
  {
    question: "¿Qué nos indica el color Azul en un cable de Corriente Alterna?",
    options: ["Fase", "Toma de tierra", "Neutro", "Retorno de interruptor"],
    answer: 2,
    explanation: "El color azul claro está reservado normativamente para representar el cable del Neutro."
  },
  {
    question: "La Memoria Técnica de Diseño (MTD) es requerida cuando...",
    options: [
      "Siempre, en todos los casos sin excepción",
      "La instalación tiene una potencia menor que la que exige la realización de un Proyecto Técnico",
      "Supera los 50 kW en viviendas",
      "Se trata de locales de pública concurrencia"
    ],
    answer: 1,
    explanation: "La MTD se utiliza en instalaciones que no sobrepasan los límites definidos en la ITC-BT-04 para exigir la elaboración un Proyecto Técnico."
  },
  {
    question: "El diagrama de precedencias (PDM) en la planificación, a diferencia de Gantt...",
    options: [
      "Maneja el coste económico de los peones",
      "No puede usarse en la electrificación de edificios",
      "Muestra claramente las dependencias empleando nodos para las tareas",
      "Sólo puede representar tareas en horas, no en días"
    ],
    answer: 2,
    explanation: "El modelo PDM (Activity-on-Node) es muy útil para identificar visualmente la ruta crítica y las dependencias."
  },
  {
    question: "Para medir la resistencia de un componente, ¿cómo debe estar el circuito?",
    options: [
      "Encendido y con el componente conectado",
      "Apagado, pero conectado al resto de elementos",
      "Siempre sin tensión y preferiblemente con un lado del componente desconectado",
      "Midiendo voltaje simultáneamente"
    ],
    answer: 2,
    explanation: "La prueba de resistencia NUNCA debe hacerse con tensión; de lo contrario dañarás el multímetro."
  },
  {
    question: "¿Qué prueba reglamentaria se hace con la red desconectada para comprobar los aislantes de los cables?",
    options: [
      "Ensayo de Polaridad",
      "Ensayo de Continuidad",
      "Ensayo Dieléctrico / Aislamiento",
      "Sección de cortocircuito"
    ],
    answer: 2,
    explanation: "El ensayo mide que los conductores ofrezcan el aislamiento correcto frente a Tierra y entre conductores."
  },
  {
    question: "¿Qué documento expide el Instalador que certifica que todo cumple el REBT y permite contratar la luz?",
    options: [
      "El Presupuesto",
      "El CIE (Certificado de Instalación Eléctrica)",
      "Diagrama de Gantt",
      "La Hoja de Entrega de material"
    ],
    answer: 1,
    explanation: "El Certificado de Instalación (o Boletín) es el documento final fundamental que se entrega al titular y a Industria."
  },
  {
    question: "Según la Ley de Ohm, si en un circuito mantenemos la resistencia constante y duplicamos el voltaje, la intensidad...",
    options: [
      "Se reduce a la mitad",
      "Se mantiene igual",
      "Se duplica",
      "Se cuadruplica"
    ],
    answer: 2,
    explanation: "Por la fórmula I = V / R, la intensidad es directamente proporcional al voltaje."
  },
  {
    question: "¿Qué tipo de esquema eléctrico representa los componentes con líneas horizontales, evitando cruces y facilitando la comprensión?",
    options: [
      "Esquema Unifilar",
      "Esquema Multifilar",
      "Esquema Funcional o de principio",
      "Esquema Topográfico"
    ],
    answer: 2,
    explanation: "El esquema funcional dibuja los elementos entre fase y neutro evitando cruces, ideal para entender la lógica."
  },
  {
    question: "Un cable H07Z1-K es especialmente requerido en...",
    options: [
      "Instalaciones subterráneas estancas",
      "Antenas de televisión",
      "Locales de pública concurrencia por ser libre de halógenos",
      "Líneas aéreas de alta tensión"
    ],
    answer: 2,
    explanation: "Z1 indica que el aislamiento es libre de halógenos y con baja emisión de humos."
  },
  {
    question: "¿Cuál es la corriente total de un circuito con cuatro resistencias iguales en paralelo por las que circula 0,5 A en cada rama?",
    options: ["0.5 A", "1 A", "2 A", "2 W"],
    answer: 2,
    explanation: "En paralelo, la corriente total es la suma de las corrientes de cada rama: 0.5 * 4 = 2 A."
  },
  {
    question: "¿Qué ventajas tiene la corriente alterna frente a la continua?",
    options: [
      "Es mucho más fácil de transportar a largas distancias",
      "Necesita cables más gruesos",
      "No presenta riesgos de cortocircuitos",
      "Es la única que puede almacenarse en baterías"
    ],
    answer: 0,
    explanation: "La CA permite el uso de transformadores para elevar la tensión y reducir pérdidas en el transporte."
  },
  {
    question: "¿Cuál es la frecuencia de la red eléctrica doméstica en España?",
    options: ["230 Hz", "50 Hz", "60 Hz", "100 Hz"],
    answer: 1,
    explanation: "En la mayor parte de Europa, incluyendo España, la frecuencia estándar es de 50 Hz."
  },
  {
    question: "¿Cómo se llama la función que representa la tensión generada en un alternador?",
    options: ["Función Lineal", "Función Senoidal", "Función Exponencial", "Función Tangencial"],
    answer: 1,
    explanation: "La tensión generada por un alternador sigue una onda senoidal pura."
  },
  {
    question: "¿Qué representa un círculo con una cruz (X) en un plano eléctrico?",
    options: ["Un motor", "Una regleta", "Un punto de luz", "Un timbre"],
    answer: 2,
    explanation: "Es el símbolo estándar para una lámpara o punto de luz general."
  },
  {
    question: "¿Cómo se representa un pulsador en un esquema unifilar?",
    options: [
      "Círculo con otro pequeño concéntrico",
      "Una línea quebrada",
      "Un cuadrado con una X",
      "Dos líneas paralelas"
    ],
    answer: 0,
    explanation: "El pulsador se identifica por un círculo con un punto central o círculo concéntrico."
  },
  {
    question: "¿Para qué sirve el calibre o pie de rey?",
    options: [
      "Medir distancias kilométricas",
      "Medir con precisión de décimas de milímetro",
      "Comprobar el nivel de una caja",
      "Medir la intensidad de corriente"
    ],
    answer: 1,
    explanation: "El pie de rey permite mediciones externas, internas y de profundidad con gran precisión."
  },
  {
    question: "¿Con qué herramienta comprobamos la correcta horizontalidad de una canalización?",
    options: ["Flexómetro", "Nivel de burbuja", "Escalímetro", "Plomada"],
    answer: 1,
    explanation: "El nivel de burbuja es esencial para que las instalaciones queden estéticamente rectas."
  },
  {
    question: "Un instrumento para medir ángulos con alta precisión en obra es:",
    options: ["Transportador", "Teodolito", "Escalímetro", "Goniómetro"],
    answer: 1,
    explanation: "El teodolito es un instrumento óptico-mecánico para medir ángulos verticales y horizontales."
  },
  {
    question: "Los materiales como el yeso o ladrillo en una obra eléctrica se consideran:",
    options: ["Materiales base", "Materiales auxiliares", "Materiales críticos", "Materiales eléctricos"],
    answer: 1,
    explanation: "Son materiales necesarios para el montaje pero no forman parte de la red eléctrica en sí."
  },
  {
    question: "¿Qué indica la ITC-BT-25 sobre el circuito C3?",
    options: [
      "Es para alumbrado",
      "Es para lavadora y lavavajillas",
      "Es para cocina y horno (25A)",
      "Es para el baño"
    ],
    answer: 2,
    explanation: "El circuito C3 está destinado específicamente a la cocina eléctrica y al horno."
  },
  {
    question: "¿Qué valor de tensión de ensayo se usa para medir aislamiento en una vivienda?",
    options: ["100 Vcc", "250 Vcc", "500 Vcc", "1000 Vcc"],
    answer: 2,
    explanation: "Para instalaciones de tensión nominal hasta 500V, el ensayo se hace a 500 Vcc."
  },
  {
    question: "La resistencia de aislamiento mínima en una vivienda debe ser:",
    options: ["0.1 MΩ", "0.25 MΩ", "0.5 MΩ", "1 MΩ"],
    answer: 2,
    explanation: "El REBT exige al menos 0.5 Megaohmios para garantizar la seguridad."
  },
  {
    question: "¿Cómo se conecta un voltímetro en un circuito?",
    options: ["En serie", "En paralelo", "En cascada", "Indistintamente"],
    answer: 1,
    explanation: "El voltímetro debe medir la diferencia de potencial entre dos puntos, por lo que se conecta en paralelo."
  },
  {
    question: "¿Qué mide un telurómetro?",
    options: ["La tensión de fase", "La resistencia de aislamiento", "La resistencia de la toma de tierra", "La intensidad de fuga"],
    answer: 2,
    explanation: "El telurómetro es el instrumento específico para medir la resistencia de tierra."
  }
];

// Valores de los niveles (Ladder) - De mayor a menor para visualización
const levels = [
  "€ 1.000.000", "€ 500.000", "€ 250.000", "€ 125.000", "€ 64.000",
  "€ 32.000", "€ 16.000", "€ 8.000", "€ 4.000", "€ 2.000",
  "€ 1.000", "€ 500", "€ 300", "€ 200", "€ 100"
];

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isGameOver, setIsGameOver] = useState(false);
  const [lifelines, setLifelines] = useState({ fiftyFifty: true, skip: true });
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);

  // Barajar opciones y actualizar el índice de la respuesta correcta
  const shuffleQuestion = (q: Question): Question => {
    const optionsWithOriginalIdx = q.options.map((opt, i) => ({ opt, i }));
    const shuffled = [...optionsWithOriginalIdx].sort(() => Math.random() - 0.5);
    const newAnswerIdx = shuffled.findIndex(item => item.i === q.answer);
    return {
      ...q,
      options: shuffled.map(item => item.opt),
      answer: newAnswerIdx
    };
  };

  const generateQuiz = useCallback(() => {
    const picked = [...allQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 15)
      .map(q => shuffleQuestion(q));
    
    setQuestions(picked);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setTimeLeft(300);
    setIsGameOver(false);
    setLifelines({ fiftyFifty: true, skip: true });
    setHiddenOptions([]);
  }, []);

  useEffect(() => {
    generateQuiz();
  }, [generateQuiz]);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver, questions.length]);

  const handleSelect = (idx: number) => {
    if (isAnswered || hiddenOptions.includes(idx)) return;
    setSelectedOpt(idx);
  };

  const handleConfirm = () => {
    if (selectedOpt === null || isAnswered) return;
    setIsAnswered(true);
    
    if (selectedOpt === questions[currentIdx].answer) {
      setScore(score + 1);
    } else {
      // En el millonario real, fallar termina el juego
      setTimeout(() => setIsGameOver(true), 2000);
    }
  };

  const handleNext = () => {
    if (currentIdx === questions.length - 1) {
      setIsGameOver(true);
    } else {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
      setHiddenOptions([]);
    }
  };

  const useFiftyFifty = () => {
    if (!lifelines.fiftyFifty || isAnswered) return;
    const q = questions[currentIdx];
    const wrongIndices = q.options
      .map((_, i) => i)
      .filter(i => i !== q.answer);
    const toHide = wrongIndices.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenOptions(toHide);
    setLifelines(prev => ({ ...prev, fiftyFifty: false }));
  };

  const useSkip = () => {
    if (!lifelines.skip || isAnswered) return;
    setLifelines(prev => ({ ...prev, skip: false }));
    handleNext();
  };

  if (questions.length === 0) return null;

  if (isGameOver) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-8 text-center animate-in zoom-in duration-500">
        <div className="bg-millionaire-navy/80 backdrop-blur-xl border-2 border-millionaire-gold p-12 rounded-3xl shadow-[0_0_50px_rgba(255,204,0,0.2)]">
          <h2 className="text-5xl font-black text-millionaire-gold mb-6 uppercase tracking-tighter italic">Fin del Juego</h2>
          <div className="text-8xl font-black text-white mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            {score > 0 ? levels[15 - score] : "€ 0"}
          </div>
          <p className="text-xl text-slate-300 mb-12 max-w-md mx-auto">
            {score === 15 ? "¡INCREÍBLE! Eres un maestro de la electricidad." : 
             score >= 10 ? "¡Excelente nivel técnico! Casi llegas a la cima." :
             "Buen intento. Sigue repasando el REBT para mejorar tu premio."}
          </p>
          <Button onClick={generateQuiz} size="lg" className="bg-millionaire-gold text-black hover:bg-yellow-400 font-black px-12 py-8 text-xl rounded-full shadow-lg">
            JUGAR DE NUEVO
          </Button>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="max-w-6xl mx-auto pt-6 pb-20 px-4 flex flex-col lg:flex-row gap-8">
      {/* Main Game Area */}
      <div className="flex-1 flex flex-col">
        {/* Header / Lifelines */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex gap-4">
            <button 
              onClick={useFiftyFifty}
              disabled={!lifelines.fiftyFifty || isAnswered}
              className={`w-16 h-12 rounded-full border-2 flex items-center justify-center font-bold transition-all ${lifelines.fiftyFifty ? "border-millionaire-cyan text-millionaire-cyan hover:bg-millionaire-cyan/20" : "border-slate-700 text-slate-700 grayscale"}`}
            >
              50:50
            </button>
            <button 
              onClick={useSkip}
              disabled={!lifelines.skip || isAnswered}
              className={`w-16 h-12 rounded-full border-2 flex items-center justify-center font-bold transition-all ${lifelines.skip ? "border-millionaire-cyan text-millionaire-cyan hover:bg-millionaire-cyan/20" : "border-slate-700 text-slate-700 grayscale"}`}
            >
              <Zap className="w-5 h-5" />
            </button>
          </div>

          <div className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 bg-black/40 backdrop-blur-md ${timeLeft < 60 ? "border-red-500 text-red-500 animate-pulse" : "border-millionaire-gold text-millionaire-gold"}`}>
            <Clock className="w-6 h-6" />
            <span className="font-mono text-2xl font-black">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Question Display */}
        <div className="relative mb-12">
          <div className="hexagon-border mx-auto max-w-4xl">
            <div className="hexagon-button bg-millionaire-blue/80 backdrop-blur-xl p-10 text-center min-h-[160px] flex items-center justify-center border-y-2 border-millionaire-cyan/30">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight text-white">{q.question}</h2>
            </div>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 max-w-5xl mx-auto w-full">
          {q.options.map((opt, idx) => {
            const isSelected = selectedOpt === idx;
            const isCorrect = isAnswered && idx === q.answer;
            const isWrong = isAnswered && isSelected && idx !== q.answer;
            const isHidden = hiddenOptions.includes(idx);

            return (
              <div key={idx} className={`relative transition-opacity duration-500 ${isHidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <div className={`hexagon-border ${isSelected && !isAnswered ? "bg-millionaire-gold" : isCorrect ? "bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]" : isWrong ? "bg-red-500" : "bg-millionaire-cyan/30"}`}>
                  <button
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className={`hexagon-button w-full p-5 text-left flex items-center gap-4 group ${
                      isSelected && !isAnswered ? "bg-orange-500 text-white" :
                      isCorrect ? "bg-green-600 text-white" :
                      isWrong ? "bg-red-600 text-white" :
                      "bg-millionaire-blue/90 hover:bg-millionaire-blue text-slate-200"
                    }`}
                  >
                    <span className="text-millionaire-gold font-black italic">{String.fromCharCode(65 + idx)}:</span>
                    <span className="font-bold text-lg">{opt}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-12 flex justify-center">
          <AnimatePresence mode="wait">
            {!isAnswered ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Button 
                  onClick={handleConfirm} 
                  disabled={selectedOpt === null}
                  className="bg-millionaire-gold text-black hover:bg-yellow-400 font-black px-12 py-6 text-xl rounded-full shadow-[0_0_20px_rgba(255,204,0,0.3)]"
                >
                  ¡ÚLTIMA PALABRA!
                </Button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-6">
                <div className={`p-4 rounded-2xl max-w-2xl text-center border-2 ${selectedOpt === q.answer ? "bg-green-950/40 border-green-500 text-green-200" : "bg-red-950/40 border-red-500 text-red-200"}`}>
                  <p className="font-bold mb-2 uppercase tracking-widest text-xs">Explicación Técnica</p>
                  <p>{q.explanation}</p>
                </div>
                { (selectedOpt === q.answer) && (
                  <Button onClick={handleNext} className="bg-millionaire-cyan text-black hover:bg-cyan-400 font-black px-12 py-6 text-xl rounded-full">
                    CONTINUAR
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Level Ladder (Sidebar) */}
      <div className="w-full lg:w-72 bg-millionaire-blue/40 backdrop-blur-xl border-l border-millionaire-cyan/20 p-6 flex flex-col justify-center gap-1 rounded-3xl lg:rounded-none">
        <div className="text-center mb-6">
          <div className="text-millionaire-gold font-black italic text-2xl tracking-tighter mb-1">ELEC-ARANDA</div>
          <div className="text-[10px] text-millionaire-cyan font-bold tracking-[0.2em] uppercase">Millonario Eléctrico</div>
        </div>
        {levels.map((val, idx) => {
          const levelNum = 15 - idx;
          const isCurrent = levelNum === currentIdx + 1;
          const isReached = levelNum <= score;
          const isSafety = levelNum === 5 || levelNum === 10 || levelNum === 15;

          return (
            <div 
              key={levelNum}
              className={`millionaire-ladder-item rounded-lg ${isCurrent ? "active" : ""} ${isReached ? "reached" : ""} ${isSafety ? "text-white" : "text-millionaire-gold/60"}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-4 text-[10px] opacity-50">{levelNum}</span>
                <div className={`w-2 h-2 rounded-full ${isCurrent ? "bg-white" : isReached ? "bg-orange-500" : "bg-millionaire-blue"}`} />
              </div>
              <span className={isSafety ? "font-black" : "font-bold"}>{val}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
