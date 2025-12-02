
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
// FUNCIONALIDAD DE TABS
// ===================================================================
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
        
        // Agregar tooltips después de cambiar pestaña
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
    { id: 26, texto: "¿Le ha expresado frases como “si no sos mía jamás serás de nadie más” o similares?", nivel: "extremo" },
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

// ===================================================================
// FUNCIONES DE RENDERIZADO DE TABLAS
// ===================================================================
function renderTabla(filtro = "Todo") {
    const tabs = filtro === "Todo"
        ? ["Todo", "bajo", "moderado", "alto", "extremo"]
        : [filtro.toLowerCase()];

    tabs.forEach(tab => {
        const tbodyId = {
            "Todo": "tablaTodo",
            "bajo": "tablaBajo",
            "moderado": "tablaModerado",
            "alto": "tablaAlto",
            "extremo": "tablaExtremo"
        }[tab === "Todo" ? "Todo" : tab];

        const tbody = document.getElementById(tbodyId);
        if (!tbody) return;
        
        tbody.innerHTML = "";

        victimas
            .filter(v => {
                if (filtro === "Todo") return true;
                const calculoRiesgo = calcularRiesgo(v.respuestas);
                return calculoRiesgo.nivelRiesgo.toLowerCase() === tab;
            })
            .forEach(v => {
                const tr = document.createElement("tr");
                tr.classList.add("border-b", "hover:bg-gray-50", "dark:border-gray-50", "dark:hover:bg-gray-340");

                const calculoRiesgo = calcularRiesgo(v.respuestas);
                
                const colorBarra = {
                    "Bajo": "bg-green-500",
                    "Moderado": "bg-yellow-500",
                    "Alto": "bg-orange-500",
                    "Extremo": "bg-red-600"
                }[calculoRiesgo.nivelRiesgo] || "bg-gray-500";

                const porcentajeVisual = Math.min(100, (calculoRiesgo.puntos / 100) * 100);

                tr.innerHTML = `
                    <td class="px-6 py-4">${v.nombre}</td>
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                            <div class="flex-1 max-w-40">
                                <div class="flex justify-between items-center mb-1">
                                    <span class="text-xs font-medium text-gray-700 dark:text-gray-300">${calculoRiesgo.respuestasSi}/37 Sí</span>
                                    <span class="text-xs text-gray-500 dark:text-gray-400">${calculoRiesgo.nivelRiesgo}</span>
                                </div>
                                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                    <div class="risk-bar-table ${colorBarra} h-3 rounded-full transition-all duration-1000" style="width: ${porcentajeVisual}%"></div>
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">${calculoRiesgo.puntos} puntos</div>
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
                            <button class="action-btn-delete w-20 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                                Eliminar
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });
    });
    
    setTimeout(agregarTooltipsTablasFiltradas, 100);
}

// ===================================================================
// ACTUALIZAR EL RENDER DE LA TABLA PARA EL BOTÓN ACCIONES
// ===================================================================
// En la función renderTablaFiltrada(), actualizar el botón "Acciones":
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
                    <button class="action-btn-delete w-20 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                        Eliminar
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

    searchInput.addEventListener('input', function(e) {
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
        clearSearch.addEventListener('click', function() {
            searchInput.value = '';
            terminoBusqueda = '';
            clearSearch.classList.add('hidden');
            aplicarFiltros();
        });
    }

    searchInput.addEventListener('keypress', function(e) {
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
// Modificar la función de tooltips para mostrar la razón del nivel
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
        bar.addEventListener('mouseenter', function() {
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

        bar.addEventListener('mouseleave', function() {
            tooltip.classList.remove('opacity-100');
            tooltip.classList.add('opacity-0');
        });

        bar.addEventListener('mousemove', function() {
            if (tooltip.classList.contains('opacity-100')) {
                const rect = this.getBoundingClientRect();
                tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            }
        });
    });
}

// ===================================================================
// EVENT LISTENERS Y INICIALIZACIÓN
// ===================================================================
document.addEventListener('DOMContentLoaded', function() {
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
});

// Cerrar modales al hacer clic fuera o con ESC
document.addEventListener('click', (e) => {
    const modalRespuestas = document.getElementById('modalRespuestas');
    const modalRisk = document.getElementById('riskLevelsModal');
    const modalProcedimientos = document.getElementById('modalProcedimientos');
    const modalAcciones = document.getElementById('modalAcciones');
    
    if (e.target === modalRespuestas) {
        cerrarModal();
    }
    if (e.target === modalRisk) {
        cerrarRiskModal();
    }
    if (e.target === modalProcedimientos) {
        cerrarModalProcedimientos();
    }
    if (e.target === modalAcciones) {
        cerrarModalAcciones();
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        cerrarRiskModal();
        cerrarModal();
        cerrarModalProcedimientos();
        cerrarModalAcciones();
    }
});

// ===================================================================
// FUNCIONES DE MODAL DE PROCEDIMIENTOS
// ===================================================================
function abrirModalProcedimientos(victima) {
    const modal = document.getElementById('modalProcedimientos');
    const modalContent = document.getElementById('modalProcedimientosContent');
    
    const calculoRiesgo = calcularRiesgo(victima.respuestas);
    
    const colorRiesgo = {
        "Bajo": "bg-green-500",
        "Moderado": "bg-yellow-500",
        "Alto": "bg-orange-500",
        "Extremo": "bg-red-600"
    }[calculoRiesgo.nivelRiesgo] || "bg-gray-500";
    
    // Contar respuestas por nivel
    const respuestasPorNivel = {
        bajo: 0,
        moderado: 0,
        alto: 0,
        extremo: 0,
        activador: 0
    };
    
    victima.respuestas.forEach(r => {
        if (r.respuesta === 'Sí') {
            respuestasPorNivel[r.nivel]++;
        }
    });
    
    // Generar explicación detallada
    let explicacion = '';
    let procedimiento = '';
    
    if (calculoRiesgo.nivelRiesgo === "Bajo") {
        explicacion = `Este caso se clasifica como <strong>Riesgo Bajo</strong> porque se han identificado ${calculoRiesgo.respuestasSi} respuestas afirmativas que suman un total de <strong>${calculoRiesgo.puntos} puntos</strong>, manteniéndose dentro del rango de 0-20 puntos. Las respuestas positivas se concentran principalmente en indicadores de nivel bajo, lo que sugiere situaciones de violencia controlables con intervención preventiva básica.`;
        
        procedimiento = `
            <div class="space-y-3">
                <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                    <h5 class="font-semibold text-green-800 dark:text-green-300 mb-2">1. Seguimiento Regular</h5>
                    <p class="text-sm text-green-700 dark:text-green-400">Establecer comunicación periódica (cada 15-30 días) para monitorear cambios en la situación.</p>
                </div>
                
                <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                    <h5 class="font-semibold text-green-800 dark:text-green-300 mb-2">2. Orientación Preventiva</h5>
                    <p class="text-sm text-green-700 dark:text-green-400">Informar sobre derechos, recursos disponibles y señales de escalamiento de violencia.</p>
                </div>
                
                <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                    <h5 class="font-semibold text-green-800 dark:text-green-300 mb-2">3. Plan de Seguridad Básico</h5>
                    <p class="text-sm text-green-700 dark:text-green-400">Desarrollar estrategias simples de protección y establecer red de apoyo familiar/comunitaria.</p>
                </div>
            </div>
        `;
    } 
    else if (calculoRiesgo.nivelRiesgo === "Moderado") {
        explicacion = `Este caso alcanza el nivel de <strong>Riesgo Moderado</strong> con ${calculoRiesgo.respuestasSi} respuestas afirmativas que acumulan <strong>${calculoRiesgo.puntos} puntos</strong> (rango 21-40). Se observan patrones de violencia en niveles bajo y moderado, con ${respuestasPorNivel.bajo} indicadores básicos y ${respuestasPorNivel.moderado} indicadores moderados. Esta combinación requiere seguimiento activo y medidas preventivas reforzadas.`;
        
        procedimiento = `
            <div class="space-y-3">
                <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                    <h5 class="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">1. Evaluación Semanal</h5>
                    <p class="text-sm text-yellow-700 dark:text-yellow-400">Contacto semanal para evaluar evolución del caso y detectar señales de escalamiento temprano.</p>
                </div>
                
                <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                    <h5 class="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">2. Medidas de Protección Básicas</h5>
                    <p class="text-sm text-yellow-700 dark:text-yellow-400">Implementar medidas como prohibición de acercamiento, cese de actos violentos y asistencia a programas de rehabilitación.</p>
                </div>
                
                <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                    <h5 class="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">3. Apoyo Psicosocial</h5>
                    <p class="text-sm text-yellow-700 dark:text-yellow-400">Referir a servicios de apoyo psicológico y vincular con red institucional de protección.</p>
                </div>
                
                <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                    <h5 class="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">4. Documentación Exhaustiva</h5>
                    <p class="text-sm text-yellow-700 dark:text-yellow-400">Registrar detalladamente todos los incidentes y seguimientos para evidencia legal futura.</p>
                </div>
            </div>
        `;
    }
    else if (calculoRiesgo.nivelRiesgo === "Alto") {
        explicacion = `Este caso presenta <strong>Riesgo Alto</strong> con ${calculoRiesgo.respuestasSi} respuestas afirmativas que suman <strong>${calculoRiesgo.puntos} puntos</strong> (rango 41-60). Se identifican ${respuestasPorNivel.bajo + respuestasPorNivel.moderado} indicadores en niveles básicos y ${respuestasPorNivel.alto} indicadores de alto riesgo, evidenciando violencia escalada con potencial de daño grave. Se requiere intervención urgente y medidas de protección activas.`;
        
        procedimiento = `
            <div class="space-y-3">
                <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                    <h5 class="font-semibold text-orange-800 dark:text-orange-300 mb-2">1. Intervención Inmediata</h5>
                    <p class="text-sm text-orange-700 dark:text-orange-400">Activar protocolo de respuesta rápida con contacto inmediato (24-48 horas) y evaluación presencial.</p>
                </div>
                
                <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                    <h5 class="font-semibold text-orange-800 dark:text-orange-300 mb-2">2. Medidas de Protección Reforzadas</h5>
                    <p class="text-sm text-orange-700 dark:text-orange-400">Implementar exclusión del hogar, prohibición de acercamiento estricta, decomiso de armas y orden de alejamiento con monitoreo.</p>
                </div>
                
                <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                    <h5 class="font-semibold text-orange-800 dark:text-orange-300 mb-2">3. Plan de Seguridad Urgente</h5>
                    <p class="text-sm text-orange-700 dark:text-orange-400">Desarrollar ruta de escape, establecer código de emergencia, identificar lugares seguros y activar red de protección 24/7.</p>
                </div>
                
                <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                    <h5 class="font-semibold text-orange-800 dark:text-orange-300 mb-2">4. Coordinación Interinstitucional</h5>
                    <p class="text-sm text-orange-700 dark:text-orange-400">Articular con PNC, fiscalía, servicios de salud y casas de acogida para respuesta integral.</p>
                </div>
                
                <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                    <h5 class="font-semibold text-orange-800 dark:text-orange-300 mb-2">5. Seguimiento Intensivo</h5>
                    <p class="text-sm text-orange-700 dark:text-orange-400">Contacto cada 2-3 días para verificar cumplimiento de medidas y estado de la víctima.</p>
                </div>
            </div>
        `;
    }
    else if (calculoRiesgo.nivelRiesgo === "Extremo") {
        if (calculoRiesgo.activadorExtremo) {
            explicacion = `Este caso está clasificado como <strong>Riesgo Extremo ACTIVADO</strong> debido a que se respondió afirmativamente a ${respuestasPorNivel.activador} pregunta(s) activadora(s) crítica(s), independientemente de la puntuación total de ${calculoRiesgo.puntos} puntos. Las preguntas activadoras indican situaciones de <strong>peligro inminente de muerte</strong> que requieren intervención inmediata e integral del sistema de protección.`;
        } else {
            explicacion = `Este caso alcanza el nivel más crítico de <strong>Riesgo Extremo</strong> con ${calculoRiesgo.respuestasSi} respuestas afirmativas que acumulan <strong>${calculoRiesgo.puntos} puntos</strong> (61+ puntos). Se observan ${respuestasPorNivel.extremo} indicadores extremos combinados con múltiples factores de riesgo en todos los niveles. Existe <strong>peligro inminente para la vida</strong> de la víctima y requiere respuesta de emergencia del sistema de protección.`;
        }
        
        procedimiento = `
            <div class="space-y-3">
                <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-600">
                    <h5 class="font-semibold text-red-800 dark:text-red-300 mb-2">⚠️ 1. ALERTA MÁXIMA - Respuesta Inmediata</h5>
                    <p class="text-sm text-red-700 dark:text-red-400">Activar código rojo con respuesta en menos de 4 horas. Contactar inmediatamente a autoridades policiales y fiscalía.</p>
                </div>
                
                <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-600">
                    <h5 class="font-semibold text-red-800 dark:text-red-300 mb-2">2. Resguardo de Emergencia</h5>
                    <p class="text-sm text-red-700 dark:text-red-400">Trasladar inmediatamente a casa de acogida o lugar seguro. Coordinar protección policial durante traslado y primeras 72 horas.</p>
                </div>
                
                <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-600">
                    <h5 class="font-semibold text-red-800 dark:text-red-300 mb-2">3. Medidas de Protección Máximas</h5>
                    <p class="text-sm text-red-700 dark:text-red-400">Implementar todas las medidas disponibles: exclusión del hogar, prohibición de acercamiento a 200m, decomiso inmediato de armas, brazalete electrónico al agresor, vigilancia policial periódica.</p>
                </div>
                
                <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-600">
                    <h5 class="font-semibold text-red-800 dark:text-red-300 mb-2">4. Plan de Protección Integral</h5>
                    <p class="text-sm text-red-700 dark:text-red-400">Código de emergencia con PNC, botón de pánico si está disponible, contactos de emergencia activos, ruta de escape definida, lugares seguros identificados.</p>
                </div>
                
                <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-600">
                    <h5 class="font-semibold text-red-800 dark:text-red-300 mb-2">5. Monitoreo Continuo 24/7</h5>
                    <p class="text-sm text-red-700 dark:text-red-400">Contacto diario obligatorio. Verificación del cumplimiento de medidas por PNC. Evaluación psicológica y médica urgente.</p>
                </div>
                
                <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-600">
                    <h5 class="font-semibold text-red-800 dark:text-red-300 mb-2">6. Coordinación de Alto Nivel</h5>
                    <p class="text-sm text-red-700 dark:text-red-400">Mesa de trabajo interinstitucional urgente con PNC, Fiscalía, Juzgado, ISDEMU, servicios de salud y red de casas de acogida.</p>
                </div>
                
                <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-600">
                    <h5 class="font-semibold text-red-800 dark:text-red-300 mb-2">7. Documentación Legal Completa</h5>
                    <p class="text-sm text-red-700 dark:text-red-400">Registro fotográfico de lesiones, certificación médica forense, recolección de evidencias, testimonios de testigos.</p>
                </div>
            </div>
        `;
    }
    
    const contenido = `
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex justify-between items-start border-b border-gray-200 dark:border-gray-600 pb-4">
                <div class="flex-1">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Procedimientos de Intervención
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Caso: ${victima.nombre}</p>
                </div>
                <button onclick="cerrarModalProcedimientos()" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <!-- Nivel de Riesgo Badge -->
            <div class="flex items-center justify-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Nivel de Riesgo:</span>
                <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-lg font-bold ${colorRiesgo}">
                    ${calculoRiesgo.nivelRiesgo}
                    <span class="text-sm opacity-90">(${calculoRiesgo.puntos} pts / ${calculoRiesgo.respuestasSi} respuestas Sí)</span>
                </span>
            </div>
            
            <!-- Explicación del Nivel -->
            <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Análisis de la Clasificación
                </h4>
                <p class="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">${explicacion}</p>
            </div>
            
            <!-- Desglose de Respuestas -->
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center border border-green-200 dark:border-green-800">
                    <div class="text-2xl font-bold text-green-700 dark:text-green-300">${respuestasPorNivel.bajo}</div>
                    <div class="text-xs text-green-600 dark:text-green-400">Nivel Bajo</div>
                </div>
                <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center border border-yellow-200 dark:border-yellow-800">
                    <div class="text-2xl font-bold text-yellow-700 dark:text-yellow-300">${respuestasPorNivel.moderado}</div>
                    <div class="text-xs text-yellow-600 dark:text-yellow-400">Moderado</div>
                </div>
                <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center border border-orange-200 dark:border-orange-800">
                    <div class="text-2xl font-bold text-orange-700 dark:text-orange-300">${respuestasPorNivel.alto}</div>
                    <div class="text-xs text-orange-600 dark:text-orange-400">Alto</div>
                </div>
                <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-center border border-red-200 dark:border-red-800">
                    <div class="text-2xl font-bold text-red-700 dark:text-red-300">${respuestasPorNivel.extremo}</div>
                    <div class="text-xs text-red-600 dark:text-red-400">Extremo</div>
                </div>
                <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center border border-purple-200 dark:border-purple-800">
                    <div class="text-2xl font-bold text-purple-700 dark:text-purple-300">${respuestasPorNivel.activador}</div>
                    <div class="text-xs text-purple-600 dark:text-purple-400">Activador</div>
                </div>
            </div>
            
            <!-- Procedimientos -->
            <div>
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                    Procedimientos de Intervención Recomendados
                </h4>
                ${procedimiento}
            </div>
            
            <!-- Footer con botón de cerrar -->
            <div class="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-600">
                <button onclick="cerrarModalProcedimientos()" class="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors">
                    Cerrar
                </button>
            </div>
        </div>
    `;
    
    modalContent.innerHTML = contenido;
    modal.classList.remove('hidden');
}

function cerrarModalProcedimientos() {
    const modal = document.getElementById('modalProcedimientos');
    modal.classList.add('hidden');
}

// ===================================================================
// FUNCIONES DE MODAL DE ACCIONES (ACTUALIZADO)
// ===================================================================
function abrirModalAcciones(victima) {
    const modal = document.getElementById('modalAcciones');
    const modalContent = document.getElementById('modalAccionesContent');
    
    const calculoRiesgo = calcularRiesgo(victima.respuestas);
    
    // Definir los mensajes según el nivel de riesgo
    let mensajeRiesgo = "";
    let colorClase = "";
    let icono = "";
    
    switch(calculoRiesgo.nivelRiesgo) {
        case "Bajo":
            mensajeRiesgo = "Riesgo mínimo, situación controlada que requiere seguimiento básico";
            colorClase = "bg-green-100 border-green-400 text-green-800 dark:bg-green-900 dark:text-green-300";
            icono = "";
            break;
        case "Moderado":
            mensajeRiesgo = "Riesgo medio: requiere seguimiento regular y medidas preventivas";
            colorClase = "bg-yellow-100 border-yellow-400 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            icono = "";
            break;
        case "Alto":
            mensajeRiesgo = "Riesgo elevado: necesita medidas urgentes y protección activa";
            colorClase = "bg-orange-100 border-orange-400 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
            icono = "";
            break;
        case "Extremo":
            mensajeRiesgo = "Riesgo crítico: intervención inmediata requerida";
            colorClase = "bg-red-100 border-red-400 text-red-800 dark:bg-red-900 dark:text-red-300";
            icono = "";
            break;
        default:
            mensajeRiesgo = "Nivel de riesgo no determinado";
            colorClase = "bg-gray-100 border-gray-400 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
            icono = "";
    }
    
    const contenido = `
        <div class="space-y-4">
            <!-- Header -->
            <div class="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-3">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    ${icono} Acciones - ${victima.nombre}
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
                    <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm font-bold ${
                        calculoRiesgo.nivelRiesgo === "Bajo" ? "bg-green-500" :
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
                    <span class="text-lg mt-0.5">${icono}</span>
                    <div>
                        <h4 class="font-semibold mb-1">Evaluación del Riesgo</h4>
                        <p class="text-sm leading-relaxed">${mensajeRiesgo}</p>
                    </div>
                </div>
            </div>
            
            <!-- Botones de Acción - VERSIÓN DEFINITIVA -->
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

function cerrarModalAcciones() {
    const modal = document.getElementById('modalAcciones');
    modal.classList.add('hidden');
}