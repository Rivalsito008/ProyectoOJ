(function () {
    // Aplicar tema
    const t = localStorage.getItem('theme-preference') || 'auto';
    let f = t;
    if (t === 'auto') {
        f = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', f);

    // Aplicar tamaño de fuente
    const fontSize = localStorage.getItem('font-size') || '16';
    document.documentElement.style.setProperty('--font-size', fontSize + 'px');

    // Aplicar contraste
    const contrast = localStorage.getItem('contrast') || '1';
    document.documentElement.style.setProperty('--contrast', contrast);
})();

// PREGUNTAS – Clasificadas por nivel y ámbito
// PREGUNTAS – Clasificadas por nivel y ámbito
const preguntas = [
    // ------------------ RIESGO BAJO (8) ------------------
    { id: 1, pregunta: "¿El agresor ha mostrado cambios repentinos en su comportamiento sin llegar a amenazar?", ambito: "Conducta del agresor", nivel: "Bajo", estado: "Activo", puntaje: "1 pts" },
    { id: 2, pregunta: "¿Existen discusiones frecuentes sin agresiones físicas?", ambito: "Contexto de la violencia", nivel: "Bajo", estado: "Activo", puntaje: "1 pts" },
    { id: 3, pregunta: "¿La víctima ha expresado preocupación leve por la relación?", ambito: "Percepción de la víctima", nivel: "Bajo", estado: "Activo", puntaje: "1 pts" },
    { id: 4, pregunta: "¿La víctima tiene una red de apoyo cercana disponible?", ambito: "Vulnerabilidad de la víctima", nivel: "Bajo", estado: "Activo", puntaje: "1 pts" },
    { id: 5, pregunta: "¿El agresor controla ligeramente las actividades de la víctima?", ambito: "Conducta del agresor", nivel: "Bajo", estado: "Activo", puntaje: "1 pts" },
    { id: 6, pregunta: "¿Se han presentado celos leves sin amenazas?", ambito: "Contexto de la violencia", nivel: "Bajo", estado: "Activo", puntaje: "1 pts" },
    { id: 7, pregunta: "¿La víctima identifica la relación como estable pero con tensiones?", ambito: "Percepción de la víctima", nivel: "Bajo", estado: "Activo", puntaje: "1 pts" },
    { id: 8, pregunta: "¿La víctima mantiene independencia económica?", ambito: "Vulnerabilidad de la víctima", nivel: "Bajo", estado: "Activo", puntaje: "1 pts" },

    // ------------------ RIESGO MODERADO (8) ------------------
    { id: 9, pregunta: "¿El agresor ha roto objetos durante discusiones?", ambito: "Conducta del agresor", nivel: "Moderado", estado: "Activo", puntaje: "2 pts" },
    { id: 10, pregunta: "¿Se han producido empujones o agresiones leves?", ambito: "Contexto de la violencia", nivel: "Moderado", estado: "Activo", puntaje: "2 pts" },
    { id: 11, pregunta: "¿La víctima manifiesta miedo ocasional hacia el agresor?", ambito: "Percepción de la víctima", nivel: "Moderado", estado: "Activo", puntaje: "2 pts" },
    { id: 12, pregunta: "¿La víctima depende emocionalmente del agresor?", ambito: "Vulnerabilidad de la víctima", nivel: "Moderado", estado: "Activo", puntaje: "2 pts" },
    { id: 13, pregunta: "¿El agresor controla con quién habla la víctima?", ambito: "Conducta del agresor", nivel: "Moderado", estado: "Activo", puntaje: "2 pts" },
    { id: 14, pregunta: "¿Hay antecedentes de violencia en discusiones anteriores?", ambito: "Contexto de la violencia", nivel: "Moderado", estado: "Activo", puntaje: "2 pts" },
    { id: 15, pregunta: "¿La víctima ha intentado terminar la relación sin éxito?", ambito: "Percepción de la víctima", nivel: "Moderado", estado: "Activo", puntaje: "2 pts" },
    { id: 16, pregunta: "¿La víctima tiene pocas personas de confianza cercanas?", ambito: "Vulnerabilidad de la víctima", nivel: "Moderado", estado: "Activo", puntaje: "2 pts" },

    // ------------------ RIESGO ALTO (8) ------------------
    { id: 17, pregunta: "¿El agresor ha realizado amenazas directas a la víctima?", ambito: "Conducta del agresor", nivel: "Alto", estado: "Activo", puntaje: "3 pts" },
    { id: 18, pregunta: "¿Se han producido agresiones físicas moderadas?", ambito: "Contexto de la violencia", nivel: "Alto", estado: "Activo", puntaje: "3 pts" },
    { id: 19, pregunta: "¿La víctima expresa temor constante hacia el agresor?", ambito: "Riesgo de la víctima", nivel: "Alto", estado: "Activo", puntaje: "3 pts" },
    { id: 20, pregunta: "¿La víctima depende económicamente del agresor?", ambito: "Vulnerabilidad de la víctima", nivel: "Alto", estado: "Activo", puntaje: "3 pts" },
    { id: 21, pregunta: "¿El agresor ha demostrado conductas obsesivas o acoso?", ambito: "Conducta del agresor", nivel: "Alto", estado: "Activo", puntaje: "3 pts" },
    { id: 22, pregunta: "¿Existen episodios de violencia física repetida?", ambito: "Contexto de la violencia", nivel: "Alto", estado: "Activo", puntaje: "3 pts" },
    { id: 23, pregunta: "¿La víctima ha manifestado sentirse atrapada en la relación?", ambito: "Percepción de la víctima", nivel: "Alto", estado: "Activo", puntaje: "3 pts" },
    { id: 24, pregunta: "¿La víctima ha buscado ayuda anteriormente sin éxito?", ambito: "Riesgo de la víctima", nivel: "Alto", estado: "Activo", puntaje: "3 pts" },

    // ------------------ RIESGO EXTREMO (8) ------------------
    { id: 25, pregunta: "¿El agresor tiene acceso a armas?", ambito: "Conducta del agresor", nivel: "Extremo", estado: "Activo", puntaje: "4 pts" },
    { id: 26, pregunta: "¿Ha habido intentos de estrangulamiento?", ambito: "Contexto de la violencia", nivel: "Extremo", estado: "Activo", puntaje: "4 pts" },
    { id: 27, pregunta: "¿La víctima ha expresado temor por su vida?", ambito: "Riesgo de la víctima", nivel: "Extremo", estado: "Activo", puntaje: "4 pts" },
    { id: 28, pregunta: "¿El agresor ha escalado la violencia de forma reciente?", ambito: "Contexto de la violencia", nivel: "Extremo", estado: "Activo", puntaje: "4 pts" },
    { id: 29, pregunta: "¿La víctima presenta aislamiento total de familiares y amigos?", ambito: "Vulnerabilidad de la víctima", nivel: "Extremo", estado: "Activo", puntaje: "4 pts" },
    { id: 30, pregunta: "¿Existen amenazas de muerte explícitas?", ambito: "Conducta del agresor", nivel: "Extremo", estado: "Activo", puntaje: "4 pts" },
    { id: 31, pregunta: "¿La víctima ha sido agredida en presencia de hijos o familiares?", ambito: "Contexto de la violencia", nivel: "Extremo", estado: "Activo", puntaje: "4 pts" },
    { id: 32, pregunta: "¿La víctima intentó huir y fue obligada a regresar?", ambito: "Riesgo de la víctima", nivel: "Extremo", estado: "Activo", puntaje: "4 pts" },

    // ------------------ ACTIVADORAS (4) ------------------
    { id: 33, pregunta: "¿El agresor ha mostrado patrones de conducta impredecibles antes de la violencia?", ambito: "Activadora", nivel: "Activadora", estado: "Activo", puntaje: "100 pts" },
    { id: 34, pregunta: "¿Existen antecedentes de violencia extrema no denunciada?", ambito: "Activadora", nivel: "Activadora", estado: "Activo", puntaje: "100 pts" },
    { id: 35, pregunta: "¿La víctima ha sido amenazada recientemente después de denunciar?", ambito: "Activadora", nivel: "Activadora", estado: "Activo", puntaje: "100 pts" },
    { id: 36, pregunta: "¿El agresor consume drogas o alcohol antes de los episodios violentos?", ambito: "Activadora", nivel: "Activadora", estado: "Activo", puntaje: "100 pts" },
];
// -------------------------------
// FUNCIONES PARA CARGAR TABLAS
// -------------------------------
function cargarTodasLasTablas() {
    cargarTablaPorNivel('todo');
    cargarTablaPorNivel('bajo');
    cargarTablaPorNivel('moderado');
    cargarTablaPorNivel('alto');
    cargarTablaPorNivel('extremo');
    cargarTablaPorNivel('activadora');
}

function cargarTablaPorNivel(nivel) {
    const tbodyId = `tabla${nivel.charAt(0).toUpperCase() + nivel.slice(1)}`;
    const tbody = document.getElementById(tbodyId);
    
    if (!tbody) {
        console.error(`No se encontró el tbody con id: ${tbodyId}`);
        return;
    }
    
    tbody.innerHTML = "";

    // Filtrar preguntas según el nivel
    let preguntasFiltradas = [];
    
    if (nivel === 'todo') {
        preguntasFiltradas = preguntas;
    } else {
        preguntasFiltradas = preguntas.filter(p => 
            p.nivel.toLowerCase() === nivel.toLowerCase()
        );
    }

    if (preguntasFiltradas.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td colspan="6" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-lg">
                No hay preguntas de nivel ${nivel}
            </td>
        `;
        tbody.appendChild(tr);
        return;
    }

    preguntasFiltradas.forEach(p => {
        const tr = document.createElement("tr");
        // Clase mejorada para los bordes en ambos modos
        tr.className = "border-b border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300";

        // Determinar clases CSS según el nivel de riesgo - SIN DEGRADADO
        let riesgoClass = "";
        let riesgoText = p.nivel;
        
        switch(p.nivel.toLowerCase()) {
            case 'bajo':
                riesgoClass = "bg-green-500 text-white";
                break;
            case 'moderado':
                riesgoClass = "bg-yellow-500 text-white";
                break;
            case 'alto':
                riesgoClass = "bg-orange-500 text-white";
                break;
            case 'extremo':
                riesgoClass = "bg-red-600 text-white";
                break;
            case 'activadora':
                riesgoClass = "bg-[#8B0000] text-white";
                riesgoText = "Activador";
                break;
            default:
                riesgoClass = "bg-gray-500 text-white";
        }

        tr.innerHTML = `
            <td class="px-6 py-4 text-gray-900 dark:text-white font-medium">${p.pregunta}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${p.ambito}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center justify-center w-20 px-3 py-1 rounded-full text-xs font-semibold relative overflow-hidden state-badge-shimmer ${riesgoClass}">
                    ${riesgoText}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                ${p.puntaje}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="state-badge-shimmer inline-flex items-center justify-center w-20 px-3 py-1 rounded-full text-xs font-semibold relative overflow-hidden ${
                    p.estado === 'Activo' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-600 text-white'
                } border-0 shadow-sm">
                    ${p.estado}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-2">
                    <button class="action-btn-view w-20 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                        Editar
                    </button>
                    <button class="action-btn-delete w-20 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                        Eliminar
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(tr);
    });

    // Agregar event listeners a los botones después de crear la tabla
    agregarEventListenersABotones();
}

// -------------------------------
// FUNCIÓN PARA AGREGAR EVENT LISTENERS A BOTONES
// -------------------------------
function agregarEventListenersABotones() {
    // Botones Editar
    const botonesEditar = document.querySelectorAll('.action-btn-view');
    botonesEditar.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            // Animación de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Aquí iría la lógica para editar
            console.log('Editar pregunta');
        });
    });

    // Botones Eliminar
    const botonesEliminar = document.querySelectorAll('.action-btn-delete');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            // Animación de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Aquí iría la lógica para eliminar
            console.log('Eliminar pregunta');
            if (confirm('¿Estás seguro de que quieres eliminar esta pregunta?')) {
                // Lógica de eliminación
            }
        });
    });
}

// -------------------------------
// INICIALIZAR EVENT LISTENERS
// -------------------------------
function inicializarEventListeners() {
    console.log("Inicializando event listeners...");

    // Modal de Preguntas
    const openQuestionBtn = document.getElementById('openQuestionBtn');
    const questionFormModal = document.getElementById('questionFormModal');
    const closeQuestionBtn = document.getElementById('closeQuestionBtn');
    const cancelQuestionBtn = document.getElementById('cancelQuestionBtn');
    const btnGuardarPregunta = document.getElementById('btnGuardarPregunta');

    // Verificar que los elementos existen
    if (openQuestionBtn && questionFormModal) {
        console.log("Elementos del modal encontrados");

        // Abrir modal
        openQuestionBtn.addEventListener('click', () => {
            questionFormModal.classList.remove('hidden');
            questionFormModal.classList.add('flex');
            limpiarFormulario();
        });

        // Cerrar modal
        if (closeQuestionBtn) {
            closeQuestionBtn.addEventListener('click', closeQuestionModal);
        }
        
        if (cancelQuestionBtn) {
            cancelQuestionBtn.addEventListener('click', closeQuestionModal);
        }

        // Cerrar modal al hacer clic fuera
        questionFormModal.addEventListener('click', (e) => {
            if (e.target === questionFormModal) {
                closeQuestionModal();
            }
        });
    } else {
        console.warn("Algunos elementos del modal no se encontraron");
    }

    // Botón guardar pregunta
    if (btnGuardarPregunta) {
        btnGuardarPregunta.addEventListener('click', guardarPregunta);
    }

    // Tab functionality - MODIFICADO PARA FILTRAR POR NIVEL
    const browserTabs = document.querySelectorAll('.browser-tab');
    if (browserTabs.length > 0) {
        browserTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');
                
                console.log(`Cambiando a pestaña: ${tabName}`);
                
                // Remove active class from all tabs
                browserTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Remove active class from all contents
                const tabContents = document.querySelectorAll('.tab-content');
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to selected content
                const selectedContent = document.getElementById(tabName);
                if (selectedContent) {
                    selectedContent.classList.add('active');
                }
                
                // Recargar la tabla específica si es necesario
                if (tabName !== 'todo') {
                    cargarTablaPorNivel(tabName);
                }
            });
        });
    }


    // Detectar cambios en preferencia de sistema (para modo auto)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const temaActual = localStorage.getItem('theme-preference') || 'auto';
        if (temaActual === 'auto') {
            const nuevoTema = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', nuevoTema);
        }
    });
}

// -------------------------------
// FUNCIONES DEL MODAL
// -------------------------------
function closeQuestionModal() {
    const questionFormModal = document.getElementById('questionFormModal');
    if (questionFormModal) {
        questionFormModal.classList.remove('flex');
        questionFormModal.classList.add('hidden');
    }
}

function limpiarFormulario() {
    const pregunta = document.getElementById('pregunta');
    const ambito = document.getElementById('ambito');
    const riesgo = document.getElementById('riesgo');
    const estado = document.getElementById('estado');

    if (pregunta) pregunta.value = '';
    if (ambito) ambito.selectedIndex = 0;
    if (riesgo) riesgo.selectedIndex = 0;
    if (estado) estado.selectedIndex = 0;
}

function guardarPregunta(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const preguntaInput = document.getElementById('pregunta');
    const ambitoSelect = document.getElementById('ambito');
    const riesgoSelect = document.getElementById('riesgo');
    const estadoSelect = document.getElementById('estado');

    if (!preguntaInput || !ambitoSelect || !riesgoSelect || !estadoSelect) {
        alert('Error: No se pudieron encontrar los campos del formulario');
        return;
    }

    const pregunta = preguntaInput.value.trim();
    const ambito = ambitoSelect.value;
    const riesgo = riesgoSelect.value;
    const estado = estadoSelect.value;

    // Validaciones básicas
    if (!pregunta) {
        alert('Por favor, escribe la pregunta');
        return;
    }

    if (!ambito) {
        alert('Por favor, selecciona un ámbito');
        return;
    }

    if (!riesgo) {
        alert('Por favor, selecciona un nivel de riesgo');
        return;
    }

    // Crear objeto con los datos
    const nuevaPregunta = {
        id: Date.now(), // ID temporal
        pregunta: pregunta,
        ambito: ambito,
        nivel: riesgo.charAt(0).toUpperCase() + riesgo.slice(1), // Capitalizar
        estado: estado,
        fechaCreacion: new Date().toISOString()
    };

    // Aquí puedes enviar los datos a tu backend
    console.log('Pregunta guardada:', nuevaPregunta);
    
    // Agregar a la array de preguntas
    preguntas.push(nuevaPregunta);
    
    // Actualizar todas las tablas
    cargarTodasLasTablas();
    
    // Mostrar confirmación
    alert('Pregunta guardada correctamente');
    
    // Cerrar modal
    closeQuestionModal();
}

// -------------------------------
// INICIALIZACIÓN PRINCIPAL
// -------------------------------
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM cargado, inicializando aplicación...");
    
    // Verificar elementos críticos
    console.log("Elementos de tablas:");    
    console.log("- tablaTodo:", document.getElementById('tablaTodo'));
    console.log("- tablaBajo:", document.getElementById('tablaBajo'));
    console.log("- tablaModerado:", document.getElementById('tablaModerado'));
    console.log("- tablaAlto:", document.getElementById('tablaAlto'));
    console.log("- tablaExtremo:", document.getElementById('tablaExtremo'));
    console.log("- tablaActivadora:", document.getElementById('tablaActivadora'));
    
    // Cargar todas las tablas
    cargarTodasLasTablas();
    
    // Inicializar todos los event listeners
    inicializarEventListeners();
    
    console.log("Aplicación inicializada correctamente");
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const questionFormModal = document.getElementById('questionFormModal');
        if (questionFormModal && questionFormModal.classList.contains('flex')) {
            closeQuestionModal();
        }
        
        const profileDropdown = document.getElementById('profileDropdown');
        if (profileDropdown && !profileDropdown.classList.contains('hidden')) {
            profileDropdown.classList.add('hidden');
        }
    }
});

function agregarPreguntaATabla(pregunta) {
    const tbody = document.getElementById("tablaTodo");
    if (!tbody) return;

    // Determinar clases CSS según el nivel de riesgo - SIN DEGRADADO
    let riesgoClass = "";
    let riesgoText = pregunta.nivel;
    
    switch(pregunta.nivel.toLowerCase()) {
        case 'bajo':
            riesgoClass = "bg-green-500 text-white";
            break;
        case 'moderado':
            riesgoClass = "bg-yellow-500 text-white";
            break;
        case 'alto':
            riesgoClass = "bg-orange-500 text-white";
            break;
        case 'extremo':
            riesgoClass = "bg-red-600 text-white";
            break;
        case 'activador':
            riesgoClass = "bg-[#8B0000] text-white";
            riesgoText = "Activador";
            break;
        default:
            riesgoClass = "bg-gray-500 text-white";
    }

    const tr = document.createElement("tr");
    tr.className = "border-b border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300";

    tr.innerHTML = `
        <td class="px-6 py-4 text-gray-900 dark:text-white font-medium">${pregunta.pregunta}</td>
        <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${pregunta.ambito}</td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex items-center justify-center w-20 px-3 py-1 rounded-full text-xs font-semibold relative overflow-hidden state-badge-shimmer ${riesgoClass}">
                ${riesgoText}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
            ${pregunta.puntaje} pts
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="state-badge-shimmer inline-flex items-center justify-center w-20 px-3 py-1 rounded-full text-xs font-semibold relative overflow-hidden ${
                pregunta.estado === 'Activo' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-600 text-white'
            } border-0 shadow-sm">
                ${pregunta.estado}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex space-x-2">
                <button class="action-btn-view w-20 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                    Editar
                </button>
                <button class="action-btn-delete w-20 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                    Eliminar
                </button>
            </div>
        </td>
    `;

    tbody.appendChild(tr);
    
    // Agregar event listeners a los nuevos botones
    agregarEventListenersABotones();
}