import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";

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
    question: "Una vivienda unifamiliar con una potencia prevista de 40 kW requerirá para su legalización:",
    options: ["Memoria Técnica de Diseño (MTD)", "Proyecto Técnico firmado por técnico competente", "Únicamente el Certificado de Instalación", "No requiere documentación especial"],
    answer: 1,
    explanation: "Según la ITC-BT-04, las viviendas unifamiliares con potencia superior a 10 kW requieren la elaboración de un Proyecto Técnico."
  },
  {
    question: "¿Qué requisito es obligatorio para que una empresa pueda actuar como instaladora autorizada?",
    options: ["Tener la capacitación para emitir certificados de cualquier instalación ajena", "Tener suscrito un seguro de responsabilidad civil", "Ser fabricante de cuadros eléctricos", "Tener más de 50 empleados"],
    answer: 1,
    explanation: "Las empresas instaladoras deben contar con un seguro de responsabilidad civil que cubra los posibles daños a terceros."
  },
  {
    question: "¿En qué documento se debe cumplimentar oficialmente la Memoria Técnica de Diseño (MTD)?",
    options: ["En hojas en blanco con el sello de la empresa", "En el impreso del Ministerio de Industria", "En los impresos oficiales determinados por la Comunidad Autónoma", "En el pliego de condiciones del proyecto"],
    answer: 2,
    explanation: "La MTD se realiza sobre modelos normalizados proporcionados por el órgano competente de cada Comunidad Autónoma."
  },
  {
    question: "¿Qué documentación técnica mínima debe contener obligatoriamente un esquema unifilar?",
    options: ["El Proyecto Técnico", "La Memoria Técnica de Diseño (MTD)", "Tanto el Proyecto como la MTD deben incluirlo", "Solo el pliego de condiciones"],
    answer: 2,
    explanation: "El esquema unifilar es una pieza fundamental tanto en el Proyecto Técnico como en la MTD."
  },
  {
    question: "¿Cómo se mide generalmente el poder aislante de un conductor según los manuales técnicos?",
    options: ["Amperios / Ohmios", "Ohmios / Voltio", "Voltios / Amperios", "Vatios / metro"],
    answer: 1,
    explanation: "Tradicionalmente, en algunos contextos didácticos se expresa la calidad del aislamiento en Ohmios por Voltio de tensión de servicio."
  },
  {
    question: "En una instalación de baja tensión, ¿cuál es la función reglamentaria del cable de color azul?",
    options: ["Fase", "Protección (Tierra)", "Neutro", "Retorno de pulsador"],
    answer: 2,
    explanation: "El color azul claro está reservado exclusivamente para el conductor de neutro."
  },
  {
    question: "¿En qué unidades se expresa normativamente la sección de los conductores eléctricos?",
    options: ["Metros", "Milímetros", "Milímetros cuadrados (mm²)", "Pulgadas"],
    answer: 2,
    explanation: "La sección transversal del cobre se mide siempre en milímetros cuadrados."
  },
  {
    question: "¿Es reglamentario el uso de tubo rígido de PVC en instalaciones domésticas?",
    options: ["No, solo se permite acero roscado", "No, el PVC es solo para evacuación de agua", "Sí, es muy empleado tanto en superficie como empotrado", "Solo en instalaciones subterráneas"],
    answer: 2,
    explanation: "El tubo de PVC es el material estándar por su aislamiento, durabilidad y facilidad de montaje."
  },
  {
    question: "Un cable 'unipolar' se define como aquel que:",
    options: ["Tiene varios conductores aislados entre sí", "Es tipo manguera con cubierta", "Está formado por un solo conductor rígido o flexible", "Solo transmite corriente continua"],
    answer: 2,
    explanation: "Los cables unipolares constan de un único conductor con su correspondiente aislamiento."
  },
  {
    question: "¿Qué indica la designación 'Z1' en el aislamiento de un cable?",
    options: ["Policloruro de vinilo (PVC)", "Elastómero termoestable", "Poliolefina termoplástica libre de halógenos", "Polietileno reticulado"],
    answer: 2,
    explanation: "Z1 identifica materiales con baja emisión de humos y gases corrosivos, fundamentales en locales de pública concurrencia."
  },
  {
    question: "¿Qué diferencia principal hay entre el aislamiento de PVC y el de EPR?",
    options: ["El PVC es termoplástico y el EPR es termoestable", "El PVC solo se usa en aluminio", "El EPR es termoplástico", "No hay diferencia técnica"],
    answer: 0,
    explanation: "Los materiales termoestables (EPR/XLPE) aguantan mayores temperaturas de servicio (90°C) que los termoplásticos (PVC, 70°C)."
  },
  {
    question: "¿Cuál de estas secciones es una sección normalizada según el REBT?",
    options: ["3 mm²", "4 mm²", "5 mm²", "20 mm²"],
    answer: 1,
    explanation: "Las secciones estándar en España saltan de 2.5 a 4, luego 6, 10, 16, etc."
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
  },
  {
    question: "Una vivienda unifamiliar con una potencia prevista de 40 kW requerirá para su legalización:",
    options: ["Memoria Técnica de Diseño (MTD)", "Proyecto Técnico firmado por técnico competente", "Únicamente el Certificado de Instalación", "No requiere documentación especial"],
    answer: 1,
    explanation: "Según la ITC-BT-04, las viviendas unifamiliares con potencia superior a 10 kW requieren la elaboración de un Proyecto Técnico."
  },
  {
    question: "¿Qué requisito es obligatorio para que una empresa pueda actuar como instaladora autorizada?",
    options: ["Tener la capacitación para emitir certificados de cualquier instalación ajena", "Tener suscrito un seguro de responsabilidad civil", "Ser fabricante de cuadros eléctricos", "Tener más de 50 empleados"],
    answer: 1,
    explanation: "Las empresas instaladoras deben contar con un seguro de responsabilidad civil que cubra los posibles daños a terceros."
  },
  {
    question: "¿En qué documento se debe cumplimentar oficialmente la Memoria Técnica de Diseño (MTD)?",
    options: ["En hojas en blanco con el sello de la empresa", "En el impreso del Ministerio de Industria", "En los impresos oficiales determinados por la Comunidad Autónoma", "En el pliego de condiciones del proyecto"],
    answer: 2,
    explanation: "La MTD se realiza sobre modelos normalizados proporcionados por el órgano competente de cada Comunidad Autónoma."
  },
  {
    question: "¿Cómo se mide generalmente el poder aislante de un conductor según los manuales técnicos de Aranda?",
    options: ["Amperios / Ohmios", "Ohmios / Voltio", "Voltios / Amperios", "Vatios / metro"],
    answer: 1,
    explanation: "Tradicionalmente, en algunos contextos didácticos se expresa la calidad del aislamiento en Ohmios por Voltio de tensión de servicio."
  },
  {
    question: "¿En qué unidades se expresa normativamente la sección de los conductores eléctricos?",
    options: ["Metros", "Milímetros", "Milímetros cuadrados (mm²)", "Pulgadas"],
    answer: 2,
    explanation: "La sección transversal del cobre se mide siempre en milímetros cuadrados (mm²)."
  },
  {
    question: "¿Es reglamentario el uso de tubo rígido de PVC en instalaciones domésticas?",
    options: ["No, solo se permite acero roscado", "No, el PVC es solo para evacuación de agua", "Sí, es muy empleado tanto en superficie como empotrado", "Solo en instalaciones subterráneas"],
    answer: 2,
    explanation: "El tubo de PVC es el material estándar por su aislamiento, durabilidad y facilidad de montaje."
  },
  {
    question: "Un cable 'unipolar' se define como aquel que:",
    options: ["Tiene varios conductores aislados entre sí", "Es tipo manguera con cubierta", "Está formado por un solo conductor rígido o flexible", "Solo transmite corriente continua"],
    answer: 2,
    explanation: "Los cables unipolares constan de un único conductor con su correspondiente aislamiento."
  },
  {
    question: "¿Qué indica la designación 'Z1' en el aislamiento de un cable?",
    options: ["Policloruro de vinilo (PVC)", "Elastómero termoestable", "Poliolefina termoplástica libre de halógenos", "Polietileno reticulado"],
    answer: 2,
    explanation: "Z1 identifica materiales con baja emisión de humos y gases corrosivos (LSZH), fundamentales en locales de pública concurrencia."
  },
  {
    question: "¿Qué diferencia principal hay entre el aislamiento de PVC y el de EPR?",
    options: ["El PVC es termoplástico y el EPR es termoestable", "El PVC solo se usa en aluminio", "El EPR es termoplástico", "No hay diferencia técnica"],
    answer: 0,
    explanation: "Los materiales termoestables (EPR/XLPE) aguantan mayores temperaturas de servicio (90°C) que los termoplásticos (PVC, 70°C)."
  },
  {
    question: "¿Para qué se utiliza principalmente el calibre o pie de rey en el montaje eléctrico?",
    options: ["Para medir la escala de un plano", "Para obtener una apreciación de décimas de milímetro o menos en piezas pequeñas", "Para calibrar los punteros láser", "Para medir la profundidad de las rozas"],
    answer: 1,
    explanation: "El pie de rey es fundamental para medir diámetros de cables, tornillos y pequeñas piezas con alta precisión."
  },
  {
    question: "¿Con qué herramienta se debe replantear la correcta nivelación de las canalizaciones en superficie?",
    options: ["Con un escalímetro", "Con un nivel de burbuja", "Con un flexómetro", "Con un teodolito"],
    answer: 1,
    explanation: "El nivel de burbuja garantiza que tubos y canaletas queden perfectamente horizontales o verticales."
  },
  {
    question: "¿Qué instrumento se utiliza para medir ángulos con gran precisión en el replanteo de grandes obras?",
    options: ["El pie de rey", "El escalímetro digital", "El teodolito", "El goniómetro simple"],
    answer: 2,
    explanation: "El teodolito permite medir ángulos verticales y horizontales con precisión de segundos."
  },
  {
    question: "¿Cuál de las siguientes es una herramienta administrativa fundamental para planear la ejecución de la obra?",
    options: ["Un pelacables automático", "Un cronograma de obra (Gantt)", "Una hoja de pedido", "Un albarán de entrega"],
    answer: 1,
    explanation: "El cronograma permite visualizar la secuencia de tareas y los plazos de ejecución del proyecto."
  },
  {
    question: "Los materiales como yeso, ladrillos o señalización de seguridad se denominan:",
    options: ["Materiales compuestos", "Costes indirectos", "Materiales auxiliares", "Stock de seguridad"],
    answer: 2,
    explanation: "Los materiales auxiliares son necesarios para completar la instalación pero no forman parte de los circuitos eléctricos."
  },
  {
    question: "En el control de recepción de material, ¿qué se debe realizar sobre los productos según exija la reglamentación?",
    options: ["Un marcado para identificarlos", "Ensayos de comprobación", "Solo una inspección visual", "Ninguna es correcta"],
    answer: 1,
    explanation: "Para garantizar la calidad, se deben realizar ensayos de comprobación sobre los materiales que así lo exija la normativa."
  },
  {
    question: "En la planificación de una obra, si tras una actualización del cronograma detectamos una 'holgura negativa' en la ruta crítica, esto indica que:",
    options: ["El proyecto va adelantado", "El proyecto terminará exactamente en fecha", "El proyecto lleva un retraso respecto a la fecha de finalización impuesta", "Hay un error en el cálculo del coste"],
    answer: 2,
    explanation: "La holgura negativa surge cuando la fecha de finalización calculada es posterior a la fecha límite exigida para el proyecto."
  },
  {
    question: "¿Qué sistema de gestión informática es el estándar para asegurar la trazabilidad y control de stock en un almacén profesional?",
    options: ["ERP genérico", "SGA (Sistema de Gestión de Almacén)", "Hoja de cálculo simple", "Base de datos de proveedores"],
    answer: 1,
    explanation: "El SGA permite el control preciso de ubicaciones, entradas, salidas y trazabilidad mediante códigos de barras o RFID."
  },
  {
    question: "Según la ITC-BT-25, ¿cuál es el calibre del interruptor automático (PIA) y la sección de cable para el circuito C3 (Cocina/Horno)?",
    options: ["16A y 2.5 mm²", "20A y 4 mm²", "25A y 6 mm²", "40A y 10 mm²"],
    answer: 2,
    explanation: "El circuito C3 es de los más potentes en una vivienda, requiriendo 25A de protección y 6 mm² de sección."
  }
];

export default function Quiz() {
  const [questions, setQuestions] = useState<typeof allQuestions>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Sistema de temporizador
  useEffect(() => {
    if (timeLeft > 0 && currentQuestion < questions.length && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && currentQuestion < questions.length) {
      setIsTimeUp(true);
    }
  }, [timeLeft, currentQuestion, questions.length]);

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
    setTimeLeft(300);
    setIsTimeUp(false);
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

  if (currentQuestion >= questions.length || isTimeUp) {
    return (
      <div className="max-w-2xl mx-auto mt-20 animate-in fade-in duration-500">
        <Card className="text-center p-8 bg-slate-900 border-none shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden backdrop-blur-md">
          {/* Decorative glow */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-900/30 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-800/50 rounded-full blur-[80px] pointer-events-none" />
          
          <CardHeader className="relative z-10">
            {isTimeUp && (
              <div className="flex justify-center mb-4">
                <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full flex items-center gap-2 border border-red-500/30 text-sm font-bold animate-bounce">
                  <AlertCircle className="w-4 h-4" /> ¡TIEMPO AGOTADO!
                </div>
              </div>
            )}
            <CardTitle className="text-4xl mb-4 text-white font-bold tracking-tight">
              {isTimeUp ? "Evaluación Interrumpida" : "¡Evaluación Completada!"}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-6xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-sm">
              {score} <span className="text-4xl text-slate-500">/ {questions.length}</span>
            </div>
            <p className="text-xl text-slate-300 mb-8 font-medium">
              {isTimeUp ? "No te preocupes, puedes volver a intentarlo para mejorar tu tiempo." :
               score === questions.length ? "¡Excelente! Eres un experto." : 
               score >= questions.length * 0.7 ? "¡Buen trabajo! Has entendido los conceptos clave." : 
               "Te recomendamos repasar los módulos de teoría e intentarlo de nuevo."}
            </p>
            <Button onClick={generateQuiz} size="lg" className="px-8 font-bold text-base shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              Realizar nueva evaluación (Reiniciar tiempo)
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="text-xs text-cyan-500 font-mono mb-1 uppercase tracking-widest">Autoevaluación Dinámica</nav>
          <h1 className="text-3xl font-bold tracking-tight text-white">Prueba de Conocimientos</h1>
          <p className="mt-2 text-slate-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full" />
            Pregunta {currentQuestion + 1} <span className="text-slate-600">de {questions.length}</span>
          </p>
        </div>
        
        <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl border backdrop-blur-md transition-all ${timeLeft < 60 ? "bg-red-500/10 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : "bg-slate-800/50 border-slate-700 text-slate-300"}`}>
          <Clock className={`w-5 h-5 ${timeLeft < 60 ? "animate-pulse" : ""}`} />
          <div className="font-mono text-xl font-black tracking-tighter">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>
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
