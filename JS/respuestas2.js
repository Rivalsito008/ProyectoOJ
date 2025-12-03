// ===================================================================
// INICIALIZACIÓN Y CONFIGURACIÓN DE TEMA
// ===================================================================
(function () {
    const t = localStorage.getItem('theme-preference') || 'auto';
    let f = t;
    if (t === 'auto') {
        f = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', f);

    const fontSize = localStorage.getItem('font-size') || '16';
    document.documentElement.style.setProperty('--font-size', fontSize + 'px');
})();

// ===================================================================
// CONSTANTES Y DATOS BASE
// ===================================================================
const fechaActual = "2025-11-26";

const preguntasBase = [
    // Nivel Bajo (1-8)
    { id: 1, texto: "1- ¿Le ha humillado, criticado, descalificado, burlado, ridiculizado?", nivel: "bajo" },
    { id: 2, texto: "2- ¿El agresor le dice cómo vestirse, maquillarse, comportarse o qué publicar en sus redes sociales?", nivel: "bajo" },
    { id: 3, texto: "3- ¿Tiene algún trabajo remunerado?", nivel: "bajo" },
    { id: 4, texto: "4- ¿Le intimida en público a través de miradas, gestos, señas, etc.?", nivel: "bajo" },
    { id: 5, texto: "5- ¿Le amenaza con quitarle o no dejarla ver a sus hijos e hijas?", nivel: "bajo" },
    { id: 6, texto: "6- ¿El agresor le controla mediante llamadas y mensajes durante el día?", nivel: "bajo" },
    { id: 7, texto: "7- ¿El agresor le dice que no estudie o trabaje para que cuide a los hijos y el hogar?", nivel: "bajo" },
    { id: 8, texto: "8- ¿Ha soportado la violencia por mantener la familia unida o sus hijos?", nivel: "bajo" },

    // Nivel Moderado (9-16)
    { id: 9, texto: "¿Es celoso y posesivo con usted? (le impide salir sola o acompañada, que salude o hable con otros hombres)", nivel: "moderado" },
    { id: 10, texto: "¿El agresor se muestra amoroso y respetuoso ante la comunidad, pero en privado la maltrata, humilla, desvaloriza?", nivel: "moderado" },
    { id: 11, texto: "¿Le ha quitado o dañado sus artículos y documentos personales? (Documentos de Identificación, títulos de educación, teléfono, ropa, zapatos, accesorios, maquillaje, materiales de su trabajo, carro, otros)", nivel: "moderado" },
    { id: 12, texto: "¿Le tiene que pedir permiso para visitar familiares, ir a la iglesia, al médico, comprar algo, o compromisos laborales o sociales, etc.?", nivel: "moderado" },
    { id: 13, texto: "¿Le ha amenazado con hacerle daño a Usted, a sus hijo y otros familiares?", nivel: "moderado" },
    { id: 14, texto: "¿El agresor se niega a dar la cuota alimenticia de los hijos para perjudicarla?", nivel: "moderado" },
    { id: 15, texto: "¿El agresor paga la casa o el alquiler?", nivel: "moderado" },
    { id: 16, texto: "¿Usted hace lo que él le pide para evitar que él mismo se haga daño?", nivel: "moderado" },

    // Nivel Alto (17-24)
    { id: 17, texto: "¿Se ha presentado a su lugar de trabajo o estudio con el fin de controlarla o amenazarla?", nivel: "alto" },
    { id: 18, texto: "¿El agresor es violento bajo los efecto de alcohol, drogas u otras sustancias estupefaciente?", nivel: "alto" },
    { id: 19, texto: "¿El agresor anteriormente ha realizado hechos violentos en su contra?", nivel: "alto" },
    { id: 20, texto: "¿El agresor ha obligado a realizar o tolerar conductas sexuales en contra de su voluntad?", nivel: "alto" },
    { id: 21, texto: "¿Le sigue, vigila, o le envía mensajes amenazantes? (por medio de terceras personas, redes sociales, texto o correo)", nivel: "alto" },
    { id: 22, texto: "¿El agresor se ha negado a proveer alimento, vivienda, vestuario, educación y salud a sus hijos e hijas?", nivel: "alto" },
    { id: 23, texto: "¿El agresor ha realizados publicaciones en las redes sociales para dañarle?", nivel: "alto" },
    { id: 24, texto: "¿Considera que las agresiones pueden ser más graves en el futuro inmediato?", nivel: "alto" },

    // Nivel Extremo (25-32)
    { id: 25, texto: "¿La ha amenazado con matarla por cualquier razón?", nivel: "extremo" },
    { id: 26, texto: "¿Le ha expresado frases como \"si no sos mía jamás serás de nadie más\" o similares?", nivel: "extremo" },
    { id: 27, texto: "¿Le ha golpeado frente a su hijos o frente a familiares de él?", nivel: "extremo" },
    { id: 28, texto: "¿El agresor posee o tiene acceso a armas de fuego, corvos, machetes, o cualquier otro tipo de armas?", nivel: "extremo" },
    { id: 29, texto: "¿Le ha amenazado por tener actualmente una relación de pareja distinta a él?", nivel: "extremo" },
    { id: 30, texto: "¿Ejerce control a través de personas cercanos de su entorno?", nivel: "extremo" },
    { id: 31, texto: "¿Ha tenido pensamientos suicidas debido a la violencia sufrida?", nivel: "extremo" },
    { id: 32, texto: "¿Siente miedo o angustia porque se siente constantemente observada por él?", nivel: "extremo" },

    // Nivel Activador (33-37)
    { id: 33, texto: "¿Él ha intentado matar a Usted o a sus hijos? (vapulear, ahogar, asfixiar, apuñalar, quemar alguna vez)", nivel: "activador" },
    { id: 34, texto: "¿Le ha causado lesiones que necesitaran hospitalización o atención médica o que le impidieron realizar sus actividades ordinarias?", nivel: "activador" },
    { id: 35, texto: "¿Le vigila y persigue constantemente para causarle daño físico?", nivel: "activador" },
    { id: 36, texto: "¿El agresor a incumplido medidas de protección?", nivel: "activador" },
    { id: 37, texto: "¿Ha perdido contacto, se encuentra lejos o aislada de su familia, amistades o redes de apoyo?", nivel: "activador" }
];

const puntosPorNivel = {
    "bajo": 1,
    "moderado": 2,
    "alto": 3,
    "extremo": 4,
    "activador": 0
};

// Variables globales para búsqueda y filtrado
let victimasFiltradas = [];
let filtroActual = "Todo";
let terminoBusqueda = "";

// ===================================================================
// FUNCIONES DE GENERACIÓN DE DATOS
// ===================================================================
function generarRespuestas(nivelRiesgo) {
    return preguntasBase.map(pregunta => {
        let respuestaSimulada = "No";
        const id = pregunta.id;

        if (nivelRiesgo === "Bajo") {
            if (id >= 1 && id <= 8 && (id % 3 === 1)) {
                respuestaSimulada = "Sí";
            }
        }
        else if (nivelRiesgo === "Moderado") {
            if ((id >= 1 && id <= 8) || (id >= 9 && id <= 16)) {
                respuestaSimulada = "Sí";
            }
        }
        else if (nivelRiesgo === "Alto") {
            if ((id >= 1 && id <= 16) || (id >= 17 && id <= 24 && (id % 2 !== 0))) {
                respuestaSimulada = "Sí";
            }
            if (id === 18 || id === 20 || id === 22) {
                respuestaSimulada = "Sí";
            }
        }
        else if (nivelRiesgo === "Extremo") {
            if ((id >= 1 && id <= 24) || (id >= 25 && id <= 32 && (id % 2 !== 0))) {
                respuestaSimulada = "Sí";
            }
            if (id === 36) {
                respuestaSimulada = "Sí";
            }
        }

        return {
            pregunta: `Pregunta ${id}: ${pregunta.texto}`,
            respuesta: respuestaSimulada,
            nivel: pregunta.nivel
        };
    });
}

const victimas = [
    {
        nombre: "Juan Pérez",
        riesgo: "Bajo",
        estado: "Activo",
        fecha: fechaActual,
        respuestas: generarRespuestas("Bajo")
    },
    {
        nombre: "María López",
        riesgo: "Moderado",
        estado: "Activo",
        fecha: fechaActual,
        respuestas: generarRespuestas("Moderado")
    },
    {
        nombre: "Carlos Martínez",
        riesgo: "Alto",
        estado: "Activo",
        fecha: fechaActual,
        respuestas: generarRespuestas("Alto")
    },
    {
        nombre: "Ana Gonzalez",
        riesgo: "Extremo",
        estado: "Activo",
        fecha: fechaActual,
        respuestas: generarRespuestas("Extremo")
    },
    {
        nombre: "Luis Hernández",
        riesgo: "Bajo",
        estado: "Activo",
        fecha: fechaActual,
        respuestas: generarRespuestas("Bajo")
    },
    {
        nombre: "Sofia Ramirez",
        riesgo: "Moderado",
        estado: "Activo",
        fecha: fechaActual,
        respuestas: generarRespuestas("Moderado")
    },
    {
        nombre: "Miguel Torres",
        riesgo: "Alto",
        estado: "Activo",
        fecha: fechaActual,
        respuestas: generarRespuestas("Alto")
    },
    {
        nombre: "Lucía Fernández",
        riesgo: "Extremo",
        estado: "Activo",
        fecha: fechaActual,
        respuestas: generarRespuestas("Extremo")
    },
    {
        nombre: "Diego Rojas",
        riesgo: "Bajo",
        estado: "Activo",
        fecha: fechaActual,
        respuestas: generarRespuestas("Bajo")
    },
    {
        nombre: "Paula Vargas",
        riesgo: "Moderado",
        estado: "Activo",
        fecha: fechaActual,
        respuestas: generarRespuestas("Moderado")
    }
];

// ===================================================================
// FUNCIONES DE CÁLCULO DE RIESGO
// ===================================================================
function calcularRiesgo(respuestas) {
    let puntos = 0;
    let respuestasSi = 0;
    let activadorExtremo = false;

    respuestas.forEach(respuesta => {
        if (respuesta.respuesta === 'Sí') {
            respuestasSi++;

            if (respuesta.nivel === "activador") {
                activadorExtremo = true;
            } else {
                puntos += puntosPorNivel[respuesta.nivel] || 1;
            }
        }
    });

    let nivelRiesgo;

    if (activadorExtremo) {
        nivelRiesgo = "Extremo";
    } else if (puntos >= 61) {
        nivelRiesgo = "Extremo";
    } else if (puntos >= 41) {
        nivelRiesgo = "Alto";
    } else if (puntos >= 21) {
        nivelRiesgo = "Moderado";
    } else {
        nivelRiesgo = "Bajo";
    }

    return {
        respuestasSi: respuestasSi,
        puntos: puntos,
        nivelRiesgo: nivelRiesgo,
        activadorExtremo: activadorExtremo,
        porcentaje: Math.min(100, (puntos / 80) * 100)
    };
}

// ===================================================================
// FUNCIONES DE MEDIDAS DE PROTECCIÓN
// ===================================================================
function obtenerMedidasProteccion(nivelRiesgo) {
    const catalogoMedidas = {
        "Bajo": [
            "- Cese inmediato de las acciones constitutivas de violencia",
            "- Prohibición de comunicación directa o indirecta con la víctima, incluso a través de redes sociales u otros medios digitales",
            "- Orden de asistencia a programas orientados a la construcción de género, nuevas masculinidades, escuelas para padres y apoyo psicológico",
            "- Abstención de intimidar mediante lenguaje no verbal, gestos o cualquier forma de comunicación que implique amenaza",
            "- Prohibición al agresor de acceder al lugar de trabajo de la víctima",
            "- Prohibición al agresor de imponer restricciones a la libertad personal, religiosa, laboral, social o cualquier otra que implique ejercicio de control sobre la víctima",
            "- Abstención de amenazar a la víctima con quitarle a sus hijos o trasladarlos a otro lugar"
        ],
        "Moderado": [
            "- Obligación de suspender todas las acciones que dieron lugar a la denuncia",
            "- Abstención de comunicarse con la víctima por cualquier medio, incluyendo redes sociales propias o de terceros",
            "- Exclusión del agresor del hogar",
            "- Prohibición de portar armas de fuego o armas blancas",
            "- Prohibición de acercarse a los hijos en estado de ebriedad",
            "- Orden de asistencia a programas educativos, preventivos y de control, estableciendo plazos para su cumplimiento",
            "- Prohibición de difundir fotografías o videos de contenido íntimo sin el consentimiento de la víctima",
            "- Prohibición de sustraer bienes muebles y materiales de la víctima",
            "- Prohibición de acceso a cuentas bancarias de la víctima",
            "- Decomiso de armas de fuego o armas blancas que representen un peligro inminente para la víctima",
            "- Acompañamiento de la Policía Nacional Civil (PNC) para retirar pertenencias personales del domicilio del agresor, garantizando la integridad física de la víctima",
            "- Prohibición de destruir, dañar o sustraer bienes muebles personales y artículos del hogar",
            "- Obligación de restituir los bienes muebles dañados, sean personales o artículos del hogar"
        ],
        "Alto": [
            "- Fijación de cuota alimenticia provisional a favor del cónyuge y/o hijos",
            "- Abstención de continuar con los hechos constitutivos de violencia",
            "- Prohibición a terceras personas de realizar actos de hostigamiento contra la víctima",
            "- Prohibición de consumo de bebidas alcohólicas, drogas, estupefacientes o sustancias psicotrópicas",
            "- Garantía del uso de la vivienda arrendada, conforme al artículo 39 de la LEIV",
            "- Orden de allanamiento de morada cuando sea necesario para resguardar la vida e integridad de las mujeres",
            "- Vigilancia permanente de la víctima y su grupo familiar, para garantizar su seguridad",
            "- Prohibición al denunciado de influir en el entorno laboral y familiar de la víctima",
            "-Prohibición al denunciado de enviar imágenes intimidantes por cualquier medio electrónico, que afecten la estabilidad emocional de la víctima",
            "-Seguimiento a las medidas de protección por parte de los cuerpos de seguridad, usando algún código de alerta máxima, para una vigilancia constante que garanticen el cumplimiento de las medidas ordenadas",
            "-Uso obligatorio de brazalete electrónico y monitoreo, para asegurar que el agresor no se acerque a la víctima ni a los lugares que frecuenta"
        ],
        "Extremo": [
            "- Prohibición de portar armas de fuego o armas cortopunzantes, así como el decomiso inmediato de cualquier arma que represente peligro para la víctima",
            "- Exclusión del agresor del hogar y otorgamiento provisional del uso de la vivienda familiar o arrendada a la víctima",
            "- Prohibición de acercarse a la víctima a menos de 200 metros, incluyendo lugares donde esta desarrolle actividades familiares, laborales, educativas o sociales",
            "- Asistencia psicológica inmediata a la víctima, incluyendo acompañamiento emocional durante el proceso judicial",
            "- Evaluación psicológica y psiquiátrica al agresor, con seguimiento profesional",
            "- Resguardo provisional de la víctima en una casa de acogida, cuando exista riesgo inminente",
            "- Implementación de vigilancia periódica de las medidas de protección, mediante: Cuerpo de seguridad estatal (visitas semanales o según riesgo)",
            "- Implementación de vigilancia periódica de las medidas de protección, mediante: Líderes comunitarios (facilitadores judiciales) para monitoreo local",
            "- Implementación de vigilancia periódica de las medidas de protección, mediante: Agentes de seguridad privada en residenciales, coordinados con administradores"
        ]
    };

    return catalogoMedidas[nivelRiesgo] || catalogoMedidas["Bajo"];
}

function guardarMedida(nombreVictima) {
    const selectElement = document.getElementById('medidasProteccion');
    const medidaSeleccionada = selectElement.value;

    if (!medidaSeleccionada) {
        alert('Por favor, seleccione una medida de protección');
        return;
    }

    const medidaTexto = selectElement.options[selectElement.selectedIndex].text;

    const datosMedida = {
        medida: medidaTexto,
        indice: medidaSeleccionada,
        fecha: new Date().toISOString().split('T')[0]
    };

    localStorage.setItem(`medida_${nombreVictima}`, JSON.stringify(datosMedida));
    alert('Medida de protección guardada correctamente');
}

function cargarMedidaGuardada(nombreVictima) {
    const medidaGuardada = localStorage.getItem(`medida_${nombreVictima}`);

    if (medidaGuardada) {
        const datos = JSON.parse(medidaGuardada);
        const selectElement = document.getElementById('medidasProteccion');
        selectElement.value = datos.indice;
    }
}

function limpiarMedida() {
    const selectElement = document.getElementById('medidasProteccion');
    selectElement.value = "";
}

// ===================================================================
// FUNCIONES DE MODAL
// ===================================================================
function abrirModal(victima) {
    const modal = document.getElementById('modalRespuestas');
    const modalContent = document.getElementById('modalContent');

    const calculoRiesgo = calcularRiesgo(victima.respuestas);

    const colorRiesgo = {
        "Bajo": "bg-green-500",
        "Moderado": "bg-yellow-500",
        "Alto": "bg-orange-500",
        "Extremo": "bg-red-600"
    }[calculoRiesgo.nivelRiesgo] || "bg-gray-500";

    const medidasProteccion = obtenerMedidasProteccion(calculoRiesgo.nivelRiesgo);

    let contenido = `
        <div class="mb-6">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Respuestas de ${victima.nombre}</h3>
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Nivel de Riesgo:</span>
                            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-medium ${colorRiesgo}">
                                ${calculoRiesgo.nivelRiesgo}
                                ${calculoRiesgo.activadorExtremo ?
            '<span class="text-xs opacity-90">(Activador)</span>' :
            `<span class="text-xs opacity-90">(${calculoRiesgo.puntos} pts)</span>`
        }
                            </span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Respuestas Sí:</span>
                            <span class="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">${calculoRiesgo.respuestasSi}/37</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Estado:</span>
                            <span class="px-2 py-1 rounded text-sm ${victima.estado === 'Activo' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}">${victima.estado}</span>
                        </div>
                    </div>
                    ${calculoRiesgo.activadorExtremo ?
            `<div class="mt-2 p-2 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg">
                            <div class="flex items-center gap-2 text-red-700 dark:text-red-300">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                                <span class="text-sm font-medium">Nivel extremo activado por respuesta afirmativa a pregunta crítica</span>
                            </div>
                        </div>`
            : ''
        }
                </div>
                <button onclick="cerrarModal()" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="sentencia-container bg-gradient-to-r from-blue-50 to-blue-100 dark:from-purple-900/30 dark:to-purple-800/30 border-l-4 border-blue-400 dark:border-purple-500 rounded-lg p-4 mb-4">
                <div class="flex items-center gap-2 mb-3">
                    <svg class="w-5 h-5 text-blue-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <h4 class="text-lg font-semibold text-blue-800 dark:text-purple-300 sentencia-title">Medidas de Protección - Nivel ${calculoRiesgo.nivelRiesgo}</h4>
                </div>
                
                <div class="mb-3">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Seleccione la medida de protección aplicable:
                    </label>
                    <select 
                        id="medidasProteccion" 
                        class="sentencia-textarea w-full p-3 text-sm rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent border-none shadow-inner"
                    >
                        <option value="">Seleccione una medida</option>
                        ${medidasProteccion.map((medida, index) =>
            `<option value="${index}">${medida}</option>`
        ).join('')}
                    </select>
                </div>
                
                <div class="flex justify-end gap-2 mt-3">
                    <button onclick="guardarMedida('${victima.nombre}')" class="sentencia-btn-guardar px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                        Guardar Medida
                    </button>
                    <button onclick="limpiarMedida()" class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors shadow-md">
                        Limpiar
                    </button>
                </div>
            </div>
        </div>
        
        <div class="space-y-3 max-h-96 overflow-y-auto">
    `;

    victima.respuestas.forEach((respuesta) => {
        const colorNivel = {
            "bajo": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            "moderado": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
            "alto": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
            "extremo": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
            "activador": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-2 border-purple-300 dark:border-purple-600"
        }[respuesta.nivel] || "bg-gray-100 text-gray-800";

        const colorRespuesta = respuesta.respuesta === 'Sí'
            ? 'text-green-600 dark:text-green-400 font-bold'
            : 'text-red-600 dark:text-red-400 font-bold';

        const textoNivel = respuesta.nivel === "activador" ? "ACTIVADOR" : respuesta.nivel.toUpperCase();

        const puntosTexto = respuesta.nivel === "activador" ?
            (respuesta.respuesta === 'Sí' ? '(Nivel Extremo)' : '(Sin efecto)') :
            (respuesta.respuesta === 'Sí' ? '(+' + (puntosPorNivel[respuesta.nivel] || 1) + ' pts)' : '(0 pts)');

        contenido += `
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${respuesta.nivel === "activador" && respuesta.respuesta === 'Sí' ? 'ring-2 ring-purple-500 dark:ring-purple-400' : ''}">
                <div class="flex justify-between items-start gap-4">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="inline-block px-2 py-1 rounded text-xs font-medium ${colorNivel}">
                                ${textoNivel}
                            </span>
                            <span class="text-xs text-gray-500 dark:text-gray-400">
                                ${puntosTexto}
                            </span>
                            ${respuesta.nivel === "activador" && respuesta.respuesta === 'Sí' ?
                '<span class="inline-block px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 animate-pulse">¡ACTIVADO!</span>' :
                ''
            }
                        </div>
                        <span class="text-sm text-gray-700 dark:text-gray-300">${respuesta.pregunta}</span>
                    </div>
                    <span class="${colorRespuesta} ml-4 min-w-12 text-center text-sm font-medium">${respuesta.respuesta}</span>
                </div>
            </div>
        `;
    });

    contenido += `</div>`;
    modalContent.innerHTML = contenido;
    modal.classList.remove('hidden');

    cargarMedidaGuardada(victima.nombre);
}

function cerrarModal() {
    const modal = document.getElementById('modalRespuestas');
    modal.classList.add('hidden');
}

function abrirRiskModal() {
    const modal = document.getElementById('riskLevelsModal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.querySelector('.transform').classList.remove('scale-95');
        modal.querySelector('.transform').classList.add('scale-100');
    }, 50);
}

function cerrarRiskModal() {
    const modal = document.getElementById('riskLevelsModal');
    modal.querySelector('.transform').classList.remove('scale-100');
    modal.querySelector('.transform').classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function cerrarModalAcciones() {
    const modal = document.getElementById('modalAcciones');
    modal.classList.add('hidden');
}

// ===================================================================
// FUNCIONALIDAD DE TABS
// ===================================================================
document.addEventListener('DOMContentLoaded', function () {
    // Inicializar tabs
    const browserTabs = document.querySelectorAll('.browser-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    browserTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');

            browserTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            tabContents.forEach(content => content.classList.remove('active'));

            const targetContent = document.getElementById(tabName);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            filtroActual = tabName;
            aplicarFiltros();

            setTimeout(agregarTooltipsTablasFiltradas, 200);
        });
    });

    // Detectar cambios en preferencia de sistema (para modo auto)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const temaActual = localStorage.getItem('theme-preference') || 'auto';
        if (temaActual === 'auto') {
            const nuevoTema = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', nuevoTema);
        }
    });

    // Inicializar botón flotante de riesgo
    const floatingBtn = document.getElementById('floatingRiskBtn');
    if (floatingBtn) {
        floatingBtn.addEventListener('click', abrirRiskModal);
    }

    // Inicializar búsqueda
    inicializarBusqueda();

    // Cargar datos iniciales
    victimasFiltradas = [...victimas];
    filtroActual = "Todo";
    aplicarFiltros();

    // Inicializar tooltips
    setTimeout(agregarTooltipsTablasFiltradas, 500);

    // Inicializar acordeones
    inicializarAcordeones();

    // Configurar botones del modal de detalles
    const btnVerDetalles = document.getElementById('btnVerDetalles');
    const btnAcciones = document.getElementById('btnAcciones');

    if (btnVerDetalles) {
        btnVerDetalles.addEventListener('click', function () {
            const modal = document.getElementById('modalDetalles');
            const nombre = document.getElementById('detalleNombre').textContent;

            // Buscar la víctima en los datos
            const victima = victimas.find(v => v.nombre === nombre);
            if (victima) {
                abrirModal(victima);
                cerrarModalDetalles();
            }
        });
    }

    if (btnAcciones) {
        btnAcciones.addEventListener('click', function () {
            const modal = document.getElementById('modalDetalles');
            const nombre = document.getElementById('detalleNombre').textContent;

            // Buscar la víctima en los datos
            const victima = victimas.find(v => v.nombre === nombre);
            if (victima) {
                abrirModalAcciones(victima);
                cerrarModalDetalles();
            }
        });
    }
});

// ===================================================================
// FUNCIONES DE RENDERIZADO DE TABLAS
// ===================================================================
function renderTablaFiltrada() {
    const tbodyMap = {
        "Todo": "tablaTodo",
        "bajo": "tablaBajo",
        "moderado": "tablaModerado",
        "alto": "tablaAlto",
        "extremo": "tablaExtremo"
    };

    const tbodyId = tbodyMap[filtroActual] || "tablaTodo";
    const tbody = document.getElementById(tbodyId);

    if (!tbody) {
        console.error(`No se encontró el tbody con ID: ${tbodyId}`);
        return;
    }

    tbody.innerHTML = "";

    if (victimasFiltradas.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td colspan="5" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-lg">
                ${terminoBusqueda ?
                `No se encontraron víctimas con el nombre "${terminoBusqueda}"` :
                'No hay víctimas en esta categoría'
            }
            </td>
        `;
        tbody.appendChild(tr);
        return;
    }

    victimasFiltradas.forEach(v => {
        const tr = document.createElement("tr");
        tr.classList.add("border-b", "hover:bg-gray-50", "dark:border-gray-50", "dark:hover:bg-gray-340");

        const calculoRiesgo = calcularRiesgo(v.respuestas);

        const colorBarra = {
            "Bajo": "bg-green-500",
            "Moderado": "bg-yellow-500",
            "Alto": "bg-orange-500",
            "Extremo": "bg-red-600"
        }[calculoRiesgo.nivelRiesgo] || "bg-gray-500";

        const porcentajeVisual = calculoRiesgo.porcentaje;

        tr.innerHTML = `
            <td class="px-6 py-4">${v.nombre}</td>
            <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                    <div class="flex-1 max-w-40">
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-xs font-medium text-gray-700 dark:text-gray-300">${calculoRiesgo.respuestasSi}/37 Sí</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400">${calculoRiesgo.nivelRiesgo}</span>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 relative">
                            <div class="risk-bar-table ${colorBarra} h-3 rounded-full transition-all duration-1000" style="width: ${porcentajeVisual}%"></div>
                        </div>
                        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>${calculoRiesgo.puntos} pts</span>
                            <span>${Math.round(porcentajeVisual)}%</span>
                        </div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4">
                <span class="state-badge-shimmer inline-flex items-center justify-center w-20 px-3 py-1 rounded-full text-xs font-semibold relative overflow-hidden ${v.estado === 'Activo' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'} border-0 shadow-sm">
                    ${v.estado}
                </span>
            </td>
            <td class="px-6 py-4 text-sm">${v.fecha}</td>
            <td class="px-6 py-4">
                <div class="flex justify-center gap-2">
                    <button onclick="abrirModal(${JSON.stringify(v).replace(/"/g, '&quot;')})" class="action-btn-view w-20 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                        Ver
                    </button>
                    <button onclick="abrirModalAcciones(${JSON.stringify(v).replace(/"/g, '&quot;')})" class="action-btn-procedure w-20 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                        Acciones
                    </button>  
                    <button onclick="abrirModalDetalles(${JSON.stringify(v).replace(/"/g, '&quot;')})" class="action-btn-details w-20 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                        Detalles
                    </button>                  
                    <button onclick="toggleEstadoVictima('${v.nombre}', '${v.estado}')" 
                            class="action-btn-toggle-estado w-24 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm relative overflow-hidden ${v.estado === 'Activo' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white">
                        ${v.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    setTimeout(agregarTooltipsTablasFiltradas, 100);
}

// ===================================================================
// FUNCIONES DE BÚSQUEDA Y FILTRADO
// ===================================================================
function inicializarBusqueda() {
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');

    if (!searchInput) {
        console.error('No se encontró el elemento searchInput');
        return;
    }

    searchInput.addEventListener('input', function (e) {
        terminoBusqueda = e.target.value.toLowerCase().trim();

        if (clearSearch) {
            if (terminoBusqueda) {
                clearSearch.classList.remove('hidden');
            } else {
                clearSearch.classList.add('hidden');
            }
        }

        aplicarFiltros();
    });

    if (clearSearch) {
        clearSearch.addEventListener('click', function () {
            searchInput.value = '';
            terminoBusqueda = '';
            clearSearch.classList.add('hidden');
            aplicarFiltros();
        });
    }

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            aplicarFiltros();
        }
    });
}

function aplicarFiltros() {
    victimasFiltradas = victimas.filter(victima =>
        victima.nombre.toLowerCase().includes(terminoBusqueda)
    );

    if (filtroActual !== "Todo") {
        victimasFiltradas = victimasFiltradas.filter(victima => {
            const calculoRiesgo = calcularRiesgo(victima.respuestas);
            return calculoRiesgo.nivelRiesgo.toLowerCase() === filtroActual.toLowerCase();
        });
    }

    renderTablaFiltrada();
}

// ===================================================================
// FUNCIONES DE TOOLTIPS
// ===================================================================
function agregarTooltipsTablasFiltradas() {
    const infoRiesgo = {
        "Bajo": "Este caso es nivel bajo porque presenta indicadores controlables de violencia (0-20 puntos), principalmente en categorías básicas, que sugieren una situación manejable con seguimiento preventivo.",
        "Moderado": "Este caso alcanza nivel moderado al acumular 21-40 puntos con patrones establecidos de violencia que combinan indicadores básicos y moderados, requiriendo seguimiento activo y medidas preventivas reforzadas.",
        "Alto": "Este caso presenta nivel alto con 41-60 puntos, evidenciando violencia escalada con indicadores graves que representan riesgo significativo de daño y requieren intervención urgente con medidas de protección activas.",
        "Extremo": "Este caso está en nivel extremo (61+ puntos o activador) indicando peligro inminente para la vida, con múltiples factores de riesgo críticos que demandan respuesta inmediata del sistema de protección integral."
    };

    let tooltip = document.getElementById('risk-tooltip');

    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'risk-tooltip';
        tooltip.className = 'fixed z-50 px-3 py-2 text-sm text-gray-900 bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg opacity-0 pointer-events-none transition-opacity duration-200 border border-gray-200 dark:border-gray-600 max-w-xs';
        document.body.appendChild(tooltip);
    }

    document.querySelectorAll('.risk-bar-table').forEach(bar => {
        bar.addEventListener('mouseenter', function () {
            const row = this.closest('tr');
            if (row) {
                const nivelElement = row.querySelector('.text-xs.text-gray-500');
                if (nivelElement) {
                    const nivel = nivelElement.textContent.trim();
                    const info = infoRiesgo[nivel] || 'Información no disponible';

                    const rect = this.getBoundingClientRect();
                    tooltip.textContent = info;
                    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
                    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
                    tooltip.classList.remove('opacity-0');
                    tooltip.classList.add('opacity-100');
                }
            }
        });

        bar.addEventListener('mouseleave', function () {
            tooltip.classList.remove('opacity-100');
            tooltip.classList.add('opacity-0');
        });

        bar.addEventListener('mousemove', function () {
            if (tooltip.classList.contains('opacity-100')) {
                const rect = this.getBoundingClientRect();
                tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            }
        });
    });
}

// ===================================================================
// FUNCIONES DE MODAL DE ACCIONES
// ===================================================================
function abrirModalAcciones(victima) {
    const modal = document.getElementById('modalAcciones');
    const modalContent = document.getElementById('modalAccionesContent');

    const calculoRiesgo = calcularRiesgo(victima.respuestas);

    // Definir los mensajes según el nivel de riesgo
    let mensajeRiesgo = "";
    let colorClase = "";

    switch (calculoRiesgo.nivelRiesgo) {
        case "Bajo":
            mensajeRiesgo = "Riesgo mínimo, situación controlada que requiere seguimiento básico";
            colorClase = "bg-green-100 border-green-400 text-green-800 dark:bg-green-900 dark:text-green-300";
            break;
        case "Moderado":
            mensajeRiesgo = "Riesgo medio: requiere seguimiento regular y medidas preventivas";
            colorClase = "bg-yellow-100 border-yellow-400 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            break;
        case "Alto":
            mensajeRiesgo = "Riesgo elevado: necesita medidas urgentes y protección activa";
            colorClase = "bg-orange-100 border-orange-400 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
            break;
        case "Extremo":
            mensajeRiesgo = "Riesgo crítico: intervención inmediata requerida";
            colorClase = "bg-red-100 border-red-400 text-red-800 dark:bg-red-900 dark:text-red-300";
            break;
        default:
            mensajeRiesgo = "Nivel de riesgo no determinado";
            colorClase = "bg-gray-100 border-gray-400 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }

    const contenido = `
        <div class="space-y-4">
            <!-- Header -->
            <div class="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-3">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    Acciones - ${victima.nombre}
                </h3>
                <button onclick="cerrarModalAcciones()" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <!-- Información del Caso -->
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex items-center gap-3">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Nivel:</span>
                    <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm font-bold ${calculoRiesgo.nivelRiesgo === "Bajo" ? "bg-green-500" :
            calculoRiesgo.nivelRiesgo === "Moderado" ? "bg-yellow-500" :
                calculoRiesgo.nivelRiesgo === "Alto" ? "bg-orange-500" : "bg-red-600"
        }">
                        ${calculoRiesgo.nivelRiesgo}
                    </span>
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                    ${calculoRiesgo.respuestasSi}/37 Sí • ${calculoRiesgo.puntos} pts
                </div>
            </div>
            
            <!-- Mensaje de Riesgo -->
            <div class="p-4 ${colorClase} rounded-lg border-l-4">
                <div class="flex items-start gap-3">
                    <div>
                        <h4 class="font-semibold mb-1">Evaluación del Riesgo</h4>
                        <p class="text-sm leading-relaxed">${mensajeRiesgo}</p>
                    </div>
                </div>
            </div>
            
            <!-- Botones de Acción -->
            <div class="flex justify-center pt-2">
                <button 
                    onclick="abrirModal(${JSON.stringify(victima).replace(/"/g, '&quot;')}); cerrarModalAcciones();" 
                    class="action-btn-view flex items-center justify-center gap-2 w-32 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm relative overflow-hidden bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white border-0"
                >
                    Ver Detalles
                </button>
            </div>
            
            <!-- Footer -->
            <div class="pt-3 border-t border-gray-200 dark:border-gray-600">
                <p class="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Estado: <span class="font-medium ${victima.estado === 'Activo' ? 'text-green-600' : 'text-red-600'}">${victima.estado}</span>
                    • Fecha: ${victima.fecha}
                </p>
            </div>
        </div>
    `;

    modalContent.innerHTML = contenido;
    modal.classList.remove('hidden');
}

// ===================================================================
// FUNCIÓN DE MODAL DE DETALLES - VERSIÓN CORREGIDA
// ===================================================================
function abrirModalDetalles(victima) {
    const modal = document.getElementById('modalDetalles');
    if (!modal) {
        console.error('Modal de detalles no encontrado');
        return;
    }

    const calculoRiesgo = calcularRiesgo(victima.respuestas);

    const colorClases = {
        "Bajo": "bg-green-500",
        "Moderado": "bg-yellow-500",
        "Alto": "bg-orange-500",
        "Extremo": "bg-red-600"
    };

    // GENERAR TODO EL CONTENIDO DEL MODAL DE UNA VEZ
    const modalDialog = modal.querySelector('.modal-dialog');

    const contenidoCompleto = `
        <!-- Header del Modal -->
        <div class="sticky top-0 bg-white dark:bg-gray-800 z-10 px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-600 flex-shrink-0">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Detalles Completos del Caso
                    </h3>
                    <div class="flex flex-wrap items-center gap-3">
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Víctima:</span>
                            <span class="font-semibold text-gray-800 dark:text-white">${victima.nombre}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Caso:</span>
                            <span class="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">VIF-2025-${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Nivel:</span>
                            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm font-bold ${colorClases[calculoRiesgo.nivelRiesgo]}">
                                ${calculoRiesgo.nivelRiesgo}
                            </span>
                        </div>
                    </div>
                </div>
                <button onclick="cerrarModalDetalles()" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded ml-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Contenido del Modal -->
        <div class="flex-1 overflow-y-auto px-6 py-4">
            <div class="space-y-4">
                <!-- Sección 1: Información Administrativa -->
                <div class="accordion-section">
                    <button class="accordion-header flex justify-between items-center w-full p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/30 dark:hover:to-blue-700/30 transition-all" data-target="seccionAdmin">
                        <div class="flex items-center gap-3">
                            <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <h4 class="text-lg font-semibold text-blue-800 dark:text-blue-300">Información Administrativa</h4>
                        </div>
                        <svg class="w-5 h-5 transform transition-transform accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div id="seccionAdmin" class="accordion-content hidden bg-white dark:bg-gray-800 rounded-b-lg border border-t-0 border-gray-200 dark:border-gray-700">
                        <table class="w-full text-sm">
                            <tbody>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300 w-1/3">Número de Caso:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">VIF-2025-${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Fecha de Denuncia:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">${victima.fecha}</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Estado del Proceso:</td>
                                    <td class="py-3 px-4"><span class="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">${victima.estado}</span></td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Funcionario Asignado:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Lic. Ana Rodríguez</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Unidad Asignada:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Unidad de Violencia Intrafamiliar</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Sección 2: Datos del Denunciante -->
                <div class="accordion-section">
                    <button class="accordion-header flex justify-between items-center w-full p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg hover:from-green-100 hover:to-green-200 dark:hover:from-green-800/30 dark:hover:to-green-700/30 transition-all" data-target="seccionDenunciante">
                        <div class="flex items-center gap-3">
                            <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <h4 class="text-lg font-semibold text-green-800 dark:text-green-300">Datos del Denunciante</h4>
                        </div>
                        <svg class="w-5 h-5 transform transition-transform accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div id="seccionDenunciante" class="accordion-content hidden bg-white dark:bg-gray-800 rounded-b-lg border border-t-0 border-gray-200 dark:border-gray-700">
                        <table class="w-full text-sm">
                            <tbody>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300 w-1/3">Nombre Completo:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">${victima.nombre}</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Edad:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">${Math.floor(Math.random() * 30 + 25)} años</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Sexo:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">${victima.nombre.split(' ')[0].endsWith('a') ? 'Mujer' : 'Hombre'}</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Estado Familiar:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Casado/a</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Documento:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">DUI ${Math.floor(Math.random() * 90000000 + 10000000)}-${Math.floor(Math.random() * 9)}</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Fecha de Nacimiento:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">1985-05-15</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Profesión:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Empleado/a</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Teléfono:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">555-${Math.floor(Math.random() * 9000 + 1000)}</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Domicilio:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Colonia Escalón #${Math.floor(Math.random() * 500 + 1)}</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Nivel Educativo:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Universitario completo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Sección 3: Datos de la Víctima -->
                <div class="accordion-section">
                    <button class="accordion-header flex justify-between items-center w-full p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg hover:from-red-100 hover:to-red-200 dark:hover:from-red-800/30 dark:hover:to-red-700/30 transition-all" data-target="seccionVictima">
                        <div class="flex items-center gap-3">
                            <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                            <h4 class="text-lg font-semibold text-red-800 dark:text-red-300">Datos de la Víctima</h4>
                        </div>
                        <svg class="w-5 h-5 transform transition-transform accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div id="seccionVictima" class="accordion-content hidden bg-white dark:bg-gray-800 rounded-b-lg border border-t-0 border-gray-200 dark:border-gray-700">
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm">
                                <tbody>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300 w-1/3">Nombre Completo:</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-400">${victima.nombre}</td>
                                    </tr>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Edad:</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-400">${Math.floor(Math.random() * 30 + 20)} años</td>
                                    </tr>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Sexo:</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-400">${victima.nombre.split(' ')[0].endsWith('a') ? 'Mujer' : 'Hombre'}</td>
                                    </tr>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Estado Familiar:</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Casada</td>
                                    </tr>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Documento:</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-400">DUI ${Math.floor(Math.random() * 90000000 + 10000000)}-${Math.floor(Math.random() * 9)}</td>
                                    </tr>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">N° de Hijos:</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-400">${Math.floor(Math.random() * 4)}</td>
                                    </tr>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Domicilio:</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Colonia Las Flores #${Math.floor(Math.random() * 200 + 1)}</td>
                                    </tr>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Zona:</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Urbana</td>
                                    </tr>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Teléfono:</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-400">555-${Math.floor(Math.random() * 9000 + 1000)}</td>
                                    </tr>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Profesión:</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Ama de casa</td>
                                    </tr>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Nivel Educativo:</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Secundaria completa</td>
                                    </tr>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Embarazo:</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-400">No</td>
                                    </tr>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Enfermedad:</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-400">No</td>
                                    </tr>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Discapacidad:</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Ninguna</td>
                                    </tr>
                                    <tr>
                                        <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Descripción Física:</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Estatura media, complexión normal</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Sección 4: Datos del Agresor -->
                <div class="accordion-section">
                    <button class="accordion-header flex justify-between items-center w-full p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800/30 dark:hover:to-purple-700/30 transition-all" data-target="seccionAgresor">
                        <div class="flex items-center gap-3">
                            <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                            <h4 class="text-lg font-semibold text-purple-800 dark:text-purple-300">Datos del Agresor</h4>
                        </div>
                        <svg class="w-5 h-5 transform transition-transform accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div id="seccionAgresor" class="accordion-content hidden bg-white dark:bg-gray-800 rounded-b-lg border border-t-0 border-gray-200 dark:border-gray-700">
                        <table class="w-full text-sm">
                            <tbody>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300 w-1/3">Nombre Completo:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Carlos Alberto Martínez Hernández</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Edad:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">${Math.floor(Math.random() * 30 + 25)} años</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Sexo:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Hombre</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Estado Familiar:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Casado</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Profesión:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Comerciante</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Vínculo con víctima:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Pareja/Esposo/a</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Teléfono:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">555-${Math.floor(Math.random() * 9000 + 1000)}</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Domicilio:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Colonia Las Flores #45</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Zona:</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Urbana</td>
                                </tr>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">¿Cohabita con víctima?</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Sí</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">¿Mismo barrio?</td>
                                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">Sí</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Sección 5: Tipos de Violencia -->
                <div class="accordion-section">
                    <button class="accordion-header flex justify-between items-center w-full p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg hover:from-orange-100 hover:to-orange-200 dark:hover:from-orange-800/30 dark:hover:to-orange-700/30 transition-all" data-target="seccionViolencia">
<div class="flex items-center gap-3">
<svg class="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
</svg>
<h4 class="text-lg font-semibold text-orange-800 dark:text-orange-300">Tipos de Violencia</h4>
</div>
<svg class="w-5 h-5 transform transition-transform accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
</svg>
</button>
<div id="seccionViolencia" class="accordion-content hidden bg-white dark:bg-gray-800 rounded-b-lg border border-t-0 border-gray-200 dark:border-gray-700">
<div class="space-y-4 p-4">
<div class="mb-4">
<p class="font-medium text-gray-700 dark:text-gray-300 mb-3 text-base">Tipos identificados:</p>
<div class="flex flex-wrap gap-2 mb-4">
<span class="inline-block px-3 py-1 rounded-lg text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Psicológica</span>
<span class="inline-block px-3 py-1 rounded-lg text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Económica</span>
</div>
</div>
<table class="w-full text-sm">
<tbody>
<tr class="border-b border-gray-200 dark:border-gray-700">
<td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300 w-1/3">Frecuencia:</td>
<td class="py-3 px-4 text-gray-600 dark:text-gray-400">Semanal</td>
</tr>
<tr class="border-b border-gray-200 dark:border-gray-700">
<td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Lugar principal:</td>
<td class="py-3 px-4 text-gray-600 dark:text-gray-400">Domicilio</td>
</tr>
<tr class="border-b border-gray-200 dark:border-gray-700">
<td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">¿Hay testigos?</td>
<td class="py-3 px-4 text-gray-600 dark:text-gray-400">Hijos menores</td>
</tr>
<tr>
<td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Denuncias previas:</td>
<td class="py-3 px-4 text-gray-600 dark:text-gray-400">0</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<!-- Sección 6: Nivel de Riesgo -->
            <div class="accordion-section">
                <button class="accordion-header flex justify-between items-center w-full p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg hover:from-indigo-100 hover:to-indigo-200 dark:hover:from-indigo-800/30 dark:hover:to-indigo-700/30 transition-all" data-target="seccionRiesgo">
                    <div class="flex items-center gap-3">
                        <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                        <h4 class="text-lg font-semibold text-indigo-800 dark:text-indigo-300">Nivel de Riesgo y Cuestionario</h4>
                    </div>
                    <svg class="w-5 h-5 transform transition-transform accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="seccionRiesgo" class="accordion-content hidden bg-white dark:bg-gray-800 rounded-b-lg border border-t-0 border-gray-200 dark:border-gray-700">
                    <div class="p-4 space-y-4">
                        <div class="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h5 class="font-bold text-gray-800 dark:text-white text-lg">Nivel de Riesgo: ${calculoRiesgo.nivelRiesgo}</h5>
                                    <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">Puntuación obtenida en el cuestionario</p>
                                </div>
                                <div class="flex items-center gap-6">
                                    <div class="text-center">
                                        <div class="text-3xl font-bold text-${colorClases[calculoRiesgo.nivelRiesgo].replace('bg-', '').split('-')[0]}-600">${calculoRiesgo.puntos}</div>
                                        <div class="text-xs text-gray-600 dark:text-gray-400">Puntos</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="text-3xl font-bold text-blue-600">${calculoRiesgo.respuestasSi}/37</div>
                                        <div class="text-xs text-gray-600 dark:text-gray-400">Respuestas Sí</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="text-3xl font-bold text-purple-600">${Math.round(calculoRiesgo.porcentaje)}%</div>
                                        <div class="text-xs text-gray-600 dark:text-gray-400">Riesgo</div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-4">
                                <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                                    <span>0%</span>
                                    <span>Nivel de Riesgo</span>
                                    <span>100%</span>
                                </div>
                                <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                                    <div class="h-3 rounded-full transition-all duration-1000 ${colorClases[calculoRiesgo.nivelRiesgo]}" style="width: ${calculoRiesgo.porcentaje}%"></div>
                                </div>
                                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    <span>Bajo (0-20)</span>
                                    <span>Moderado (21-40)</span>
                                    <span>Alto (41-60)</span>
                                    <span>Extremo (61+)</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-3">Distribución de respuestas por nivel:</h5>
                            <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
                                <div class="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <div class="text-2xl font-bold text-green-700 dark:text-green-300">3/8</div>
                                    <div class="text-xs text-green-600 dark:text-green-400 mt-1">Nivel Bajo</div>
                                </div>
                                <div class="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                    <div class="text-2xl font-bold text-yellow-700 dark:text-yellow-300">2/8</div>
                                    <div class="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Moderado</div>
                                </div>
                                <div class="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                    <div class="text-2xl font-bold text-orange-700 dark:text-orange-300">1/8</div>
                                    <div class="text-xs text-orange-600 dark:text-orange-400 mt-1">Alto</div>
                                </div>
                                <div class="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                    <div class="text-2xl font-bold text-red-700 dark:text-red-300">1/8</div>
                                    <div class="text-xs text-red-600 dark:text-red-400 mt-1">Extremo</div>
                                </div>
                                <div class="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <div class="text-2xl font-bold text-purple-700 dark:text-purple-300">0/5</div>
                                    <div class="text-xs text-purple-600 dark:text-purple-400 mt-1">Activador</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sección 7: Contexto y Observaciones -->
            <div class="accordion-section">
                <button class="accordion-header flex justify-between items-center w-full p-4 bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-lg hover:from-teal-100 hover:to-teal-200 dark:hover:from-teal-800/30 dark:hover:to-teal-700/30 transition-all" data-target="seccionContexto">
                    <div class="flex items-center gap-3">
                        <svg class="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        <h4 class="text-lg font-semibold text-teal-800 dark:text-teal-300">Contexto y Observaciones</h4>
                    </div>
                    <svg class="w-5 h-5 transform transition-transform accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="seccionContexto" class="accordion-content hidden bg-white dark:bg-gray-800 rounded-b-lg border border-t-0 border-gray-200 dark:border-gray-700">
                    <table class="w-full text-sm">
                        <tbody>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                                <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300 align-top w-1/4">Descripción de los hechos:</td>
                                <td class="py-3 px-4 text-gray-600 dark:text-gray-400">
                                    <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        El agresor realiza constantes comentarios descalificadores y controla aspectos de la vida diaria de la víctima. Se han identificado patrones de violencia ${calculoRiesgo.nivelRiesgo.toLowerCase()}.
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300 align-top">Observaciones adicionales:</td>
                                <td class="py-3 px-4 text-gray-600 dark:text-gray-400">
                                    <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400">
                                        La víctima muestra signos de afectación emocional. Se recomienda seguimiento psicológico y asesoría legal inmediata dado el nivel de riesgo ${calculoRiesgo.nivelRiesgo.toLowerCase()}.
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer con botones de acción -->
    <div class="sticky bottom-0 bg-white dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-600 flex-shrink-0">
        <div class="flex flex-wrap justify-center gap-3">
            <button id="btnVerDetalles" class="action-btn-view flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                Ver Respuestas
            </button>
            <button id="btnAcciones" class="action-btn-procedure flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                Acciones
            </button>
            <button onclick="cerrarModalDetalles()" class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors">
                Cerrar
            </button>
        </div>
    </div>
`;

    // INSERTAR TODO EL CONTENIDO DE UNA VEZ
    modalDialog.innerHTML = contenidoCompleto;

    // Mostrar el modal
    modal.classList.remove('hidden');

    // Inicializar acordeones Y botones DESPUÉS de insertar el HTML
    setTimeout(() => {
        inicializarAcordeones();

        // Configurar botones del modal de detalles
        const btnVerDetalles = document.getElementById('btnVerDetalles');
        const btnAcciones = document.getElementById('btnAcciones');

        if (btnVerDetalles) {
            btnVerDetalles.addEventListener('click', function () {
                abrirModal(victima);
                cerrarModalDetalles();
            });
        }

        if (btnAcciones) {
            btnAcciones.addEventListener('click', function () {
                abrirModalAcciones(victima);
                cerrarModalDetalles();
            });
        }
    }, 100);
}

function cerrarModalDetalles() {
    const modal = document.getElementById('modalDetalles');
    if (modal) {
        modal.classList.add('hidden');
        // Cerrar todos los acordeones
        document.querySelectorAll('.accordion-content').forEach(content => {
            content.classList.add('hidden');
        });
        document.querySelectorAll('.accordion-icon').forEach(icon => {
            icon.classList.remove('rotated');
        });
    }
}

// ===================================================================
// FUNCIONES DE ACORDEONES
// ===================================================================
function inicializarAcordeones() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        // Clonar el elemento para remover todos los event listeners
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);

        // Agregar nuevo event listener
        newHeader.addEventListener('click', function (e) {
            e.preventDefault();
            toggleAccordion(this);
        });

        // También permitir activar con Enter/Space
        newHeader.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion(this);
            }
        });
    });
}

function toggleAccordion(header) {
    const targetId = header.getAttribute('data-target');
    const content = document.getElementById(targetId);
    const icon = header.querySelector('.accordion-icon');

    if (!content) {
        console.error('No se encontró el contenido del acordeón:', targetId);
        return;
    }

    // Toggle del contenido
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        content.style.maxHeight = content.scrollHeight + 'px';
        if (icon) icon.classList.add('rotated');
    } else {
        content.style.maxHeight = '0px';
        setTimeout(() => {
            content.classList.add('hidden');
        }, 300);
        if (icon) icon.classList.remove('rotated');
    }
}

// ===================================================================
// CERRAR MODALES AL HACER CLIC FUERA O CON ESC
// ===================================================================
document.addEventListener('click', (e) => {
    const modalRespuestas = document.getElementById('modalRespuestas');
    const modalRisk = document.getElementById('riskLevelsModal');
    const modalAcciones = document.getElementById('modalAcciones');
    const modalDetalles = document.getElementById('modalDetalles');

    if (e.target === modalRespuestas) {
        cerrarModal();
    }
    if (e.target === modalRisk) {
        cerrarRiskModal();
    }
    if (e.target === modalAcciones) {
        cerrarModalAcciones();
    }
    if (e.target === modalDetalles) {
        cerrarModalDetalles();
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        cerrarRiskModal();
        cerrarModal();
        cerrarModalAcciones();
        cerrarModalDetalles();
    }
});

// ===================================================================
// FUNCIÓN PARA TOGGLE DE ESTADO DE VÍCTIMA
// ===================================================================
function toggleEstadoVictima(nombre, estadoActual) {
    const nuevoEstado = estadoActual === 'Activo' ? 'Inactivo' : 'Activo';
    const mensaje = estadoActual === 'Activo' 
        ? '¿Estás seguro de que quieres desactivar este caso?' 
        : '¿Estás seguro de que quieres activar este caso?';
    
    if (confirm(mensaje)) {
        // Encontrar y actualizar la víctima en el array
        const victima = victimas.find(v => v.nombre === nombre);
        if (victima) {
            victima.estado = nuevoEstado;
            
            // Recargar la tabla actual
            aplicarFiltros();
            
            // Mostrar notificación
            alert(`Caso ${nuevoEstado.toLowerCase()} exitosamente`);
        }
    }
}