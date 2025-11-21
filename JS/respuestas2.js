// ===== CONFIGURACIÓN INICIAL =====
(function () {
    // Aplicar tema
    const t = localStorage.getItem('theme-preference') || 'auto';
    let f = t === 'auto' 
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : t;
    document.documentElement.setAttribute('data-theme', f);

    // Aplicar tamaño de fuente
    const fontSize = localStorage.getItem('font-size') || '16';
    document.documentElement.style.setProperty('--font-size', fontSize + 'px');
})();

// ===== CONSTANTES =====
const puntosPorNivel = {
    bajo: 1,
    moderado: 2, 
    alto: 3,
    extremo: 4,
    activador: 0
};

const coloresBarra = {
    Bajo: "bg-green-500",
    Moderado: "bg-yellow-500",
    Alto: "bg-orange-500",
    Extremo: "bg-red-600"
};

const tbodyMap = {
    Todo: "tablaTodo",
    bajo: "tablaBajo",
    moderado: "tablaModerado",
    alto: "tablaAlto",
    extremo: "tablaExtremo"
};

// ===== VARIABLES GLOBALES =====
let victimasFiltradas = [];
let filtroActual = "Todo";
let terminoBusqueda = "";

// ===== DATOS DE VÍCTIMAS =====
const victimas = [
    { 
        nombre: "Juan Pérez", 
        estado: "Activo", 
        fecha: "2025-11-15",
        respuestas: generarRespuestas("bajo")
    },
    { 
        nombre: "María López", 
        estado: "Inactivo", 
        fecha: "2025-10-20",
        respuestas: generarRespuestas("moderado")
    },
    { 
        nombre: "Carlos Martínez", 
        estado: "Activo", 
        fecha: "2025-09-12",
        respuestas: generarRespuestas("alto")
    },
    { 
        nombre: "Ana González", 
        estado: "Activo", 
        fecha: "2025-11-01",
        respuestas: generarRespuestas("extremo")
    },
    { 
        nombre: "Luis Hernández", 
        estado: "Inactivo", 
        fecha: "2025-11-10",
        respuestas: generarRespuestas("bajo")
    },
    { 
        nombre: "Sofía Ramírez", 
        estado: "Activo", 
        fecha: "2025-08-30",
        respuestas: generarRespuestas("moderado")
    },
    { 
        nombre: "Miguel Torres", 
        estado: "Activo", 
        fecha: "2025-10-05",
        respuestas: generarRespuestas("alto")
    },
    { 
        nombre: "Lucía Fernández", 
        estado: "Inactivo", 
        fecha: "2025-09-18",
        respuestas: generarRespuestas("extremo")
    },
    { 
        nombre: "Diego Rojas", 
        estado: "Activo", 
        fecha: "2025-11-12",
        respuestas: generarRespuestas("bajo")
    },
    { 
        nombre: "Paula Vargas", 
        estado: "Inactivo", 
        fecha: "2025-10-28",
        respuestas: generarRespuestas("moderado")
    }
];

// ===== FUNCIONES AUXILIARES =====

// Generar respuestas según nivel de riesgo
function generarRespuestas(nivel) {
    const preguntas = [
        { texto: "¿Ha sufrido violencia física?", nivel: "bajo" },
        { texto: "¿Ha recibido amenazas verbales?", nivel: "bajo" },
        { texto: "¿Tiene miedo por su seguridad?", nivel: "bajo" },
        { texto: "¿Ha sido acosada/o?", nivel: "bajo" },
        { texto: "¿Recibe insultos frecuentes?", nivel: "bajo" },
        { texto: "¿Le han destruido propiedades?", nivel: "bajo" },
        { texto: "¿Le vigilan sus movimientos?", nivel: "bajo" },
        { texto: "¿Recibe mensajes acosadores?", nivel: "bajo" },
        { texto: "¿Ha cambiado su rutina por miedo?", nivel: "bajo" },
        { texto: "¿Siente que su privacidad es invadida?", nivel: "bajo" },
        { texto: "¿Le controlan sus amistades?", nivel: "bajo" },
        { texto: "¿Le critican constantemente?", nivel: "bajo" },
        { texto: "¿Le hacen sentir inferior?", nivel: "bajo" },
        { texto: "¿Le humillan en público?", nivel: "bajo" },
        { texto: "¿Le ignoran o le hacen el vacío?", nivel: "bajo" },
        { texto: "¿Le culpan de todo lo que sale mal?", nivel: "bajo" },
        { texto: "¿Existe violencia psicológica constante?", nivel: "moderado" },
        { texto: "¿Hay control económico?", nivel: "moderado" },
        { texto: "¿Existe aislamiento social?", nivel: "moderado" },
        { texto: "¿Le han impedido trabajar?", nivel: "moderado" },
        { texto: "¿Le han quitado sus documentos?", nivel: "moderado" },
        { texto: "¿Ha tenido lesiones visibles?", nivel: "moderado" },
        { texto: "¿Ha necesitado atención médica?", nivel: "moderado" },
        { texto: "¿No tiene acceso a sus cuentas?", nivel: "moderado" },
        { texto: "¿Ha sufrido violencia sexual?", nivel: "alto" },
        { texto: "¿Ha habido intentos de suicidio?", nivel: "alto" },
        { texto: "¿Sufre de depresión severa?", nivel: "alto" },
        { texto: "¿Ha perdido el empleo por violencia?", nivel: "alto" },
        { texto: "¿Le han prohibido estudiar?", nivel: "alto" },
        { texto: "¿Hay hijos que han presenciado violencia?", nivel: "alto" },
        { texto: "¿Existe riesgo para los hijos?", nivel: "alto" },
        { texto: "¿Ha tenido que abandonar su hogar?", nivel: "alto" },
        { texto: "¿Existe riesgo de femicidio?", nivel: "extremo" },
        { texto: "¿Hay armas en el hogar?", nivel: "extremo" },
        { texto: "¿El agresor consume drogas?", nivel: "extremo" },
        { texto: "¿Ha habido violencia durante el embarazo?", nivel: "extremo" },
        { texto: "¿Ha habido estrangulamiento o asfixia?", nivel: "extremo" },
        { texto: "¿Existe amenaza con arma de fuego?", nivel: "activador" }
    ];
    
    const mapaNivel = {
        bajo: [0, 1, 2],
        moderado: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16, 17, 18, 21, 22, 26, 29],
        alto: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31],
        extremo: Array.from({length: 38}, (_, i) => i)
    };
    
    return preguntas.map((p, i) => ({
        pregunta: `Pregunta ${i + 1}: ${p.texto}`,
        respuesta: mapaNivel[nivel]?.includes(i) ? "Sí" : "No",
        nivel: p.nivel
    }));
}

// Calcular riesgo
function calcularRiesgo(respuestas) {
    let puntos = 0;
    let respuestasSi = 0;
    let activadorExtremo = false;
    
    respuestas.forEach(r => {
        if (r.respuesta === 'Sí') {
            respuestasSi++;
            if (r.nivel === "activador") {
                activadorExtremo = true;
            } else {
                puntos += puntosPorNivel[r.nivel] || 1;
            }
        }
    });
    
    let nivelRiesgo = activadorExtremo ? "Extremo" 
        : puntos >= 61 ? "Extremo"
        : puntos >= 41 ? "Alto"
        : puntos >= 21 ? "Moderado"
        : "Bajo";
    
    return { respuestasSi, puntos, nivelRiesgo, activadorExtremo };
}

// ===== RENDERIZADO =====

function crearFilaVictima(v) {
    const calculoRiesgo = calcularRiesgo(v.respuestas);
    const colorBarra = coloresBarra[calculoRiesgo.nivelRiesgo] || "bg-gray-500";
    const porcentajeVisual = Math.min(100, (calculoRiesgo.puntos / 100) * 100);
    const estadoClase = v.estado === 'Activo' ? 'bg-green-600' : 'bg-red-600';
    
    return `
        <tr class="border-b hover:bg-gray-50 dark:border-gray-50 dark:hover:bg-gray-340">
            <td class="px-6 py-4">${v.nombre}</td>
            <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                    <div class="flex-1 max-w-40">
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-xs font-medium text-gray-700 dark:text-gray-300">${calculoRiesgo.respuestasSi}/38 Sí</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400">${calculoRiesgo.nivelRiesgo}</span>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div class="risk-bar-table ${colorBarra} h-3 rounded-full" style="width: ${porcentajeVisual}%"></div>
                        </div>
                        <div class="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">${calculoRiesgo.puntos} puntos</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4">
                <span class="state-badge-shimmer inline-flex items-center justify-center w-20 px-3 py-1 rounded-full text-xs font-semibold ${estadoClase} text-white">
                    ${v.estado}
                </span>
            </td>
            <td class="px-6 py-4 text-sm">${v.fecha}</td>
            <td class="px-6 py-4">
                <div class="flex justify-center gap-2">
                    <button onclick='abrirModal(${JSON.stringify(v).replace(/'/g, "\\'")})'class="action-btn-view w-20 px-3 py-1 rounded-lg text-sm font-medium">
                        Ver
                    </button>
                    <button class="action-btn-delete w-20 px-3 py-1 rounded-lg text-sm font-medium">
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>
    `;
}

function renderTablaFiltrada() {
    const tbodyId = tbodyMap[filtroActual] || "tablaTodo";
    const tbody = document.getElementById(tbodyId);
    
    if (!tbody) return;
    
    if (victimasFiltradas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-lg">
                    ${terminoBusqueda ? 
                        `No se encontraron víctimas con el nombre "${terminoBusqueda}"` : 
                        'No hay víctimas en esta categoría'
                    }
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = victimasFiltradas.map(crearFilaVictima).join('');
}

// ===== FILTROS Y BÚSQUEDA =====

function aplicarFiltros() {
    victimasFiltradas = victimas.filter(v => 
        v.nombre.toLowerCase().includes(terminoBusqueda)
    );

    if (filtroActual !== "Todo") {
        victimasFiltradas = victimasFiltradas.filter(v => {
            const calculoRiesgo = calcularRiesgo(v.respuestas);
            return calculoRiesgo.nivelRiesgo.toLowerCase() === filtroActual.toLowerCase();
        });
    }

    renderTablaFiltrada();
}

function inicializarBusqueda() {
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');

    if (!searchInput) return;

    searchInput.addEventListener('input', e => {
        terminoBusqueda = e.target.value.toLowerCase().trim();
        
        if (clearSearch) {
            clearSearch.classList.toggle('hidden', !terminoBusqueda);
        }
        
        aplicarFiltros();
    });

    if (clearSearch) {
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            terminoBusqueda = '';
            clearSearch.classList.add('hidden');
            aplicarFiltros();
        });
    }
}

// ===== MODALES =====

function abrirModal(victima) {
    const modal = document.getElementById('modalRespuestas');
    const modalContent = document.getElementById('modalContent');
    const calculoRiesgo = calcularRiesgo(victima.respuestas);
    const colorRiesgo = coloresBarra[calculoRiesgo.nivelRiesgo] || "bg-gray-500";
    
    const contenidoRespuestas = victima.respuestas.map((r, i) => {
        const coloresNivel = {
            bajo: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            moderado: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", 
            alto: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
            extremo: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
            activador: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-2 border-purple-300"
        };
        
        const colorNivel = coloresNivel[r.nivel] || "bg-gray-100";
        const colorRespuesta = r.respuesta === 'Sí' ? 'respuesta-si' : 'respuesta-no';
        const textoNivel = r.nivel === "activador" ? "ACTIVADOR" : r.nivel.toUpperCase();
        const puntosTexto = r.nivel === "activador" 
            ? (r.respuesta === 'Sí' ? '(Nivel Extremo)' : '(Sin efecto)')
            : (r.respuesta === 'Sí' ? `(+${puntosPorNivel[r.nivel] || 1} pts)` : '(0 pts)');
        
        return `
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div class="flex justify-between items-start gap-4">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="inline-block px-2 py-1 rounded text-xs font-medium ${colorNivel}">
                                ${textoNivel}
                            </span>
                            <span class="text-xs text-gray-500 dark:text-gray-400">
                                ${puntosTexto}
                            </span>
                        </div>
                        <span class="text-sm text-gray-700 dark:text-gray-300">${r.pregunta}</span>
                    </div>
                    <span class="${colorRespuesta} ml-4 min-w-12 text-center text-sm font-medium">${r.respuesta}</span>
                </div>
            </div>
        `;
    }).join('');
    
    modalContent.innerHTML = `
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
                            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Estado:</span>
                            <span class="px-2 py-1 rounded text-sm ${victima.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">${victima.estado}</span>
                        </div>
                    </div>
                </div>
                <button onclick="cerrarModal()" class="text-gray-500 hover:text-gray-700 p-1 rounded">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="sentencia-container rounded-lg p-4 mb-4">
                <div class="flex items-center gap-2 mb-3">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <h4 class="text-lg font-semibold sentencia-title">Sentencia del Juez</h4>
                </div>
                <textarea 
                    id="sentenciaJuez" 
                    placeholder="Escriba aquí la sentencia o medidas de protección correspondientes..."
                    class="sentencia-textarea w-full h-20 p-3 text-sm rounded-lg resize-none"
                ></textarea>
                <div class="flex justify-end gap-2 mt-3">
                    <button onclick="guardarSentencia('${victima.nombre}')" class="sentencia-btn-guardar px-4 py-2 text-white text-sm font-medium rounded-lg">
                        Guardar Sentencia
                    </button>
                    <button onclick="limpiarSentencia()" class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-lg">
                        Limpiar
                    </button>
                </div>
            </div>
        </div>
        
        <div class="space-y-3 max-h-96 overflow-y-auto">
            ${contenidoRespuestas}
        </div>
    `;
    
    modal.classList.remove('hidden');
    cargarSentenciaGuardada(victima.nombre);
}

function cerrarModal() {
    document.getElementById('modalRespuestas').classList.add('hidden');
}

function abrirRiskModal() {
    const modal = document.getElementById('riskLevelsModal');
    modal.classList.remove('hidden');
}

function cerrarRiskModal() {
    document.getElementById('riskLevelsModal').classList.add('hidden');
}

// ===== SENTENCIAS =====

function guardarSentencia(nombreVictima) {
    const sentencia = document.getElementById('sentenciaJuez').value;
    if (sentencia.trim()) {
        localStorage.setItem(`sentencia_${nombreVictima}`, sentencia);
        alert('Sentencia guardada correctamente');
    } else {
        alert('Por favor, escriba una sentencia antes de guardar');
    }
}

function cargarSentenciaGuardada(nombreVictima) {
    const sentenciaGuardada = localStorage.getItem(`sentencia_${nombreVictima}`);
    if (sentenciaGuardada) {
        document.getElementById('sentenciaJuez').value = sentenciaGuardada;
    }
}

function limpiarSentencia() {
    document.getElementById('sentenciaJuez').value = '';
}

// ===== EVENT LISTENERS =====

// Tabs
document.querySelectorAll(".browser-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".browser-tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

        tab.classList.add("active");
        const target = tab.getAttribute("data-tab");
        document.getElementById(target).classList.add("active");

        filtroActual = target;
        aplicarFiltros();
    });
});

// Modales
document.addEventListener('click', e => {
    const modalRespuestas = document.getElementById('modalRespuestas');
    const modalRisk = document.getElementById('riskLevelsModal');
    
    if (e.target === modalRespuestas) cerrarModal();
    if (e.target === modalRisk) cerrarRiskModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        cerrarRiskModal();
        cerrarModal();
    }
});

// Tema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const temaActual = localStorage.getItem('theme-preference') || 'auto';
    if (temaActual === 'auto') {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    const floatingBtn = document.getElementById('floatingRiskBtn');
    if (floatingBtn) {
        floatingBtn.addEventListener('click', abrirRiskModal);
    }

    inicializarBusqueda();
    victimasFiltradas = [...victimas];
    aplicarFiltros();
});