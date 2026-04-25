import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { CheckCircle2, XCircle } from "lucide-react";

// Banco de preguntas expandido (se seleccionarán 10 aleatorias para cada intento)
const allQuestions = [
  {
    question: "En instalaciones individuales de viviendas, ¿de qué material deben ser los conductores según el REBT?",
    options: ["Aluminio", "Cobre", "Plata", "Fibra Óptica"],
    answer: 1, // Cobre
    explanation: "El REBT especifica que los conductores en viviendas deben ser exclusivamente de cobre."
  },
  {
    question: "¿Qué nos indica el color Azul en un cable de Corriente Alterna?",
    options: ["Fase", "Toma de tierra", "Neutro", "Retorno de interruptor"],
    answer: 2, // Neutro
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
    explanation: "El modelo PDM (Activity-on-Node) es muy útil para identificar visualmente la ruta crítica y las dependencias (Fin a Inicio, etc)."
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
    explanation: "Por la fórmula I = V / R, la intensidad es directamente proporcional al voltaje. Si V se duplica, I también se duplica."
  },
  {
    question: "¿Qué tipo de esquema eléctrico representa los componentes con líneas horizontales, evitando cruces y facilitando la comprensión del funcionamiento?",
    options: [
      "Esquema Unifilar",
      "Esquema Multifilar",
      "Esquema Funcional o de principio",
      "Esquema Topográfico"
    ],
    answer: 2,
    explanation: "El esquema funcional dibuja los elementos de control y potencia entre la fase y el neutro evitando cruces, ideal para entender la lógica del circuito."
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
    explanation: "La denominación Z1 indica que el aislamiento es un compuesto termoplástico a base de poliolefina, libre de halógenos y con baja emisión de humos."
  },
  {
    question: "En un presuspuesto eléctrico, la partida conocida como 'Mano de Obra' suele medirse en...",
    options: [
      "Metros lineales",
      "Kilovatios-hora (kWh)",
      "Horas (h)",
      "Unidades (ud)"
    ],
    answer: 2,
    explanation: "La mano de obra de los oficiales y peones se presupuesta en función de las horas estimadas de trabajo."
  },
  {
    question: "El color reglamentario para el conductor de Protección (Toma de Tierra) es:",
    options: [
      "Negro",
      "Verde-Amarillo",
      "Gris",
      "Rojo"
    ],
    answer: 1,
    explanation: "El verde-amarillo a franjas es universalmente y normativamente el color reservado para la toma de tierra."
  },
  {
    question: "¿Cómo se debe conectar un Amperímetro para medir la corriente de una lámpara?",
    options: [
      "En paralelo con la lámpara",
      "En serie con la lámpara",
      "Descargado y sin tensión",
      "Conectando las pinzas roja y negra al mismo borne"
    ],
    answer: 1,
    explanation: "El amperímetro debe 'atravesarse' en el circuito para que toda la corriente pase por él, por lo que se conecta en serie."
  },
  {
    question: "El interruptor diferencial...",
    options: [
      "Protege la instalación contra cortocircuitos",
      "Protege contra sobrecargas",
      "Protege a las personas contra contactos indirectos (fugas a tierra)",
      "Mejora el factor de potencia"
    ],
    answer: 2,
    explanation: "El diferencial salta si detecta una fuga de corriente hacia la tierra, protegiendo así a las personas de electrocuciones."
  },
  {
    question: "¿Qué es el 'Albarán' en la gestión de provisiones eléctricas?",
    options: [
      "Un documento técnico de diseño",
      "El comprobante o nota de entrega de material por parte del proveedor",
      "Una herramienta para pelar cables",
      "El contrato final con el cliente"
    ],
    answer: 1,
    explanation: "El albarán justifica que se han entregado los materiales solicitados y debe ser revisado frente a las hojas de pedido."
  },
  {
    question: "¿Qué se busca en el ensayo de caída de tensión?",
    options: [
      "Que el voltaje se mantenga constante sin importar la carga",
      "Que la diferencia de potencial entre el inicio y el fin de la línea no supere un porcentaje máximo normativo",
      "Que el diferencial no salte",
      "Que la intensidad en el punto lejano sea cero"
    ],
    answer: 1,
    explanation: "El REBT limita la caída de tensión (ej. 3% en viviendas) para garantizar que los equipos funcionen correctamente."
  },
  {
    question: "El pelacables automático es una herramienta...",
    options: [
      "Que permite soldar cables de cobre",
      "Que secciona la funda de forma precisa ajustándose a la sección del hilo sin dañar el alma",
      "Que inyecta tensión para buscar averías",
      "Que mide el aislamiento dieléctrico"
    ],
    answer: 1,
    explanation: "Esta herramienta optimiza tiempos asegurando calidad en el descarnado transversal y longitudinal sin marcar el cobre."
  },
  {
    question: "En un esquema topográfico o de planta...",
    options: [
      "Se dibuja cada cable por separado con sus cruces",
      "Se posiciona la aparamenta sobre el plano arquitectónico en 2D",
      "Se listan los códigos de barras de los elementos",
      "Solo muestra la altura sobre el nivel del mar"
    ],
    answer: 1,
    explanation: "El esquema topográfico superpone el recorrido eléctrico sobre el plano de la instalación (casa, nave, etc)."
  },
  {
    question: "En mediciones de red con tensión en Cuadros Eléctricos, el instrumento más seguro e ideal para intensidad es...",
    options: [
      "El medidor de aislamiento",
      "Un amperímetro en serie",
      "Un polímetro en modo Ohmios",
      "Una Pinza Amperimétrica"
    ],
    answer: 3,
    explanation: "La pinza amperimétrica mide el campo magnético del cable abrazado sin necesidad de interrumpir el circuito ni hacer contacto eléctrico."
  },
  {
    question: "Si el presupuesto indica 'Suministro e instalación de 1 ud de PIA 16A', significa que el coste incluye:",
    options: [
      "Solo el material (1 Interruptor Automático Magnetotérmico de 16A)",
      "La mano de obra de montar cualquier tipo de cuadro",
      "Tanto el coste del pequeño material magnétotermico como el coste en euros/hora de su colocación y conexionado",
      "Partidas alzadas estimativas sin precio cerrado"
    ],
    answer: 2,
    explanation: "Unidades de obra completas con 'suministro e instalación' engloban material, medios auxiliares y mano de obra requerida."
  },
  {
    question: "El presupuesto que se obtiene sumando al de ejecución material los Gastos Generales (16-20%) y el Beneficio Industrial (6%) se llama:",
    options: [
      "Presupuesto de ejecución material",
      "Presupuesto simplificado",
      "Presupuesto general de ejecución de contrata",
      "Estado de mediciones"
    ],
    answer: 2,
    explanation: "El presupuesto de contrata es el total facturable e incluye el beneficio de la empresa y sus gastos generales y financieros."
  },
  {
    question: "¿Qué es el pliego de condiciones en un proyecto?",
    options: [
      "Un listado de las tareas del diagrama de Gantt",
      "Un documento contractual que establece especificaciones, requisitos técnicos y legales",
      "Un boceto a mano alzada de la instalación",
      "La factura proforma que se entrega al cliente"
    ],
    answer: 1,
    explanation: "El pliego de condiciones es de carácter preceptivo y contractual en los procesos de licitación y adjudicación."
  },
  {
    question: "En la elaboración del presupuesto, los precios de los componentes más sencillos (como material o mano de obra) que unidos forman una unidad de obra se denominan:",
    options: [
      "Precios descompuestos",
      "Precios auxiliares",
      "Precios simples o unitarios",
      "Partidas alzadas"
    ],
    answer: 2,
    explanation: "Estos precios unidos entre sí configuran conceptos mayores (partidas o unidades de obra) identificando coste por hora o por material base."
  },
  {
    question: "¿Qué normativa establece las exigencias que deben cumplir los edificios para satisfacer los requisitos básicos de seguridad y habitabilidad?",
    options: [
      "Reglamento Electrotécnico para Baja Tensión (REBT)",
      "Código Técnico de la Edificación (CTE)",
      "Ley 21/2013",
      "Reglamento sobre normas CPR"
    ],
    answer: 1,
    explanation: "El Código Técnico de la Edificación (CTE) es el marco que rige las condiciones constructivas, habitabilidad, e interrelación con sus instalaciones."
  },
  {
    question: "En el método CPM, si una tarea tiene una holgura (H) igual a cero, significa que:",
    options: [
      "La tarea es insignificante",
      "La tarea pertenece a la ruta crítica y no admite retrasos",
      "La tarea se puede realizar en cualquier momento",
      "La tarea no tiene coste"
    ],
    answer: 1,
    explanation: "La holgura cero indica que cualquier retraso en esa tarea retrasará la fecha final del proyecto; por tanto, es una tarea crítica."
  },
  {
    question: "¿Cuál es el valor mínimo reglamentario de la resistencia de aislamiento para una instalación de BT (500V)?",
    options: ["0.25 MΩ", "0.5 MΩ", "1 MΩ", "10 MΩ"],
    answer: 1,
    explanation: "Según la ITC-BT-19, para tensiones nominales de 500V, la resistencia de aislamiento mínima debe ser de 0.5 MΩ."
  },
  {
    question: "Para medir la resistencia de tierra mediante el método de las tres puntas, se suelen hincar las picas auxiliares a una distancia de:",
    options: ["2 y 5 metros", "5 y 10 metros", "10 y 20 metros", "50 y 100 metros"],
    answer: 2,
    explanation: "El manual y la normativa técnica suelen recomendar distancias de aproximadamente 20 metros para evitar solapamientos de las áreas de resistencia de las picas."
  },
  {
    question: "¿Qué indica la técnica PERT sobre la duración de una tarea?",
    options: [
      "Es el promedio simple de los tiempos",
      "Es una duración fija inamovible",
      "Es una duración estimada probabilística basada en tres escenarios (O, M, P)",
      "Solo tiene en cuenta el coste de los materiales"
    ],
    answer: 2,
    explanation: "PERT utiliza la fórmula Te = (O + 4M + P) / 6 para dar un peso mayor al escenario más probable."
  },
  {
    question: "En la prueba de un diferencial de 30mA, ¿en qué tiempo máximo debe disparar a su corriente nominal (IΔn)?",
    options: ["< 20 ms", "< 200 ms", "< 500 ms", "< 1 segundo"],
    answer: 1,
    explanation: "La normativa exige que un diferencial de alta sensibilidad (30mA) dispare en menos de 200ms para garantizar la seguridad de las personas."
  }
];

export default function Quiz() {
  const [questions, setQuestions] = useState<typeof allQuestions>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // Escoger 10 preguntas aleatorias al iniciar
  useEffect(() => {
    generateQuiz();
  }, []);

  const generateQuiz = () => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
  };

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedOption(null);
    setCurrentQuestion(currentQuestion + 1);
  };

  if (questions.length === 0) return null;

  if (currentQuestion >= questions.length) {
    return (
      <div className="max-w-2xl mx-auto mt-20 animate-in fade-in duration-500">
        <Card className="text-center p-8 bg-slate-900 border-none shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden backdrop-blur-md">
          {/* Decorative glow */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-900/30 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-800/50 rounded-full blur-[80px] pointer-events-none" />
          
          <CardHeader className="relative z-10">
            <CardTitle className="text-4xl mb-4 text-white font-bold tracking-tight">¡Evaluación Completada!</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-6xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-sm">
              {score} <span className="text-4xl text-slate-500">/ {questions.length}</span>
            </div>
            <p className="text-xl text-slate-300 mb-8 font-medium">
              {score === questions.length ? "¡Excelente! Eres un experto." : 
               score >= questions.length * 0.7 ? "¡Buen trabajo! Has entendido los conceptos clave." : 
               "Te recomendamos repasar los módulos de teoría e intentarlo de nuevo."}
            </p>
            <Button onClick={generateQuiz} size="lg" className="px-8 font-bold text-base shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              Realizar nueva evaluación (Preguntas diferentes)
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <nav className="text-xs text-cyan-500 font-mono mb-1 uppercase tracking-widest">Autoevaluación Dinámica</nav>
        <h1 className="text-3xl font-bold tracking-tight text-white">Prueba de Conocimientos</h1>
        <p className="mt-2 text-slate-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full" />
          Pregunta {currentQuestion + 1} <span className="text-slate-600">de {questions.length}</span>
        </p>
      </div>

      <div className="w-full bg-slate-900 border border-slate-800 p-1 flex h-3 rounded-full overflow-hidden shadow-inner">
        <div 
          className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
          style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
        />
      </div>

      <Card className="bg-slate-900/80 backdrop-blur-md border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 to-transparent" />
        <CardHeader>
          <CardTitle className="leading-snug text-white text-2xl pt-2">{q.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          {q.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = showResult && idx === q.answer;
            const isWrong = showResult && isSelected && idx !== q.answer;
            
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showResult}
                className={`w-full p-5 rounded-2xl text-left border flex items-center justify-between transition-all font-medium shadow-sm backdrop-blur-sm
                  ${isSelected && !showResult ? "border-cyan-500 bg-cyan-950/30 text-cyan-100 ring-1 ring-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]" : ""}
                  ${isCorrect ? "border-green-500 bg-green-950/40 text-green-100 ring-2 ring-green-500 ring-offset-2 ring-offset-slate-900 shadow-[0_0_15px_rgba(34,197,94,0.2)]" : ""}
                  ${isWrong ? "border-red-900 bg-red-950/30 text-red-200" : ""}
                  ${!isSelected && !showResult ? "border-slate-800 bg-slate-800/30 text-slate-300 hover:border-slate-600 hover:bg-slate-800/60" : ""}
                  ${showResult && !isCorrect && !isWrong ? "opacity-30 border-slate-800" : ""}
                `}
              >
                <span>{opt}</span>
                {isCorrect && <CheckCircle2 className="text-green-500 w-6 h-6 shrink-0" />}
                {isWrong && <XCircle className="text-red-500 w-6 h-6 shrink-0" />}
              </button>
            );
          })}
        </CardContent>
        <CardFooter className="flex flex-col items-stretch space-y-4 pt-6 pb-6 bg-slate-950 border-t border-slate-800 mt-6 relative z-10">
          {showResult && (
            <div className={`p-4 rounded-xl flex items-start space-x-3 text-sm border shadow-inner
              ${selectedOption === q.answer ? "bg-green-950/30 text-green-200 border-green-900/50" : "bg-red-950/20 text-red-200 border-red-900/30"}
            `}>
              <div className="font-bold flex-1">
                <span className={`block uppercase tracking-widest text-[10px] mb-1 ${selectedOption === q.answer ? "text-green-500" : "text-red-500"}`}>
                  {selectedOption === q.answer ? "Acierto" : "Fallo"}
                </span>
                {q.explanation}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            {!showResult ? (
              <Button onClick={handleCheck} disabled={selectedOption === null} size="lg" className="font-bold tracking-wide">
                Comprobar
              </Button>
            ) : (
              <Button onClick={handleNext} size="lg" className="px-8 font-bold tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                {currentQuestion === questions.length - 1 ? "Ver Resultados" : "Siguiente"}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
