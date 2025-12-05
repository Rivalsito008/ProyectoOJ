// -------------------------------
// CONFIGURACIÓN DE AXIOS - VERSIÓN MEJORADA
// -------------------------------
const API_BASE_URL = 'http://localhost:8000/api';

// Crear instancia de Axios con configuración específica
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Interceptor para requests
api.interceptors.request.use(
    config => {
        // Agregar token de autenticación si existe
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Agregar timestamp para evitar cache en GET
        if (config.method === 'get') {
            config.params = {
                ...config.params,
                _t: Date.now()
            };
        }
        
        console.log(`[${config.method?.toUpperCase()}] ${config.url}`);
        return config;
    },
    error => {
        console.error('Error en request:', error);
        return Promise.reject(error);
    }
);

// Interceptor para responses
api.interceptors.response.use(
    response => {
        console.log(`[${response.status}] ${response.config.url}`);
        return response;
    },
    error => {
        const { response } = error;
        
        if (!response) {
            console.error('Error de red/conexion');
            mostrarError('No hay conexión con el servidor. Verifica tu internet.');
            return Promise.reject(error);
        }
        
        const { status, data } = response;
        
        // Manejo específico de errores HTTP
        switch (status) {
            case 401:
                console.error('No autorizado - Token expirado o invalido');
                mostrarError('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                break;
                
            case 403:
                console.error('Acceso prohibido');
                mostrarError('No tienes permisos para realizar esta acción.');
                break;
                
            case 404:
                console.error('Recurso no encontrado');
                mostrarError('El recurso solicitado no existe.');
                break;
                
            case 422:
                console.error('Error de validacion:', data.errors);
                const errores = Object.values(data.errors || {}).flat().join('\n');
                mostrarError('Errores de validación:\n' + errores);
                break;
                
            case 500:
                console.error('Error interno del servidor');
                mostrarError('Error interno del servidor. Por favor, intenta más tarde.');
                break;
                
            default:
                console.error(`Error ${status}:`, data);
                mostrarError(data?.message || `Error ${status}: ${data?.error || 'Error desconocido'}`);
        }
        
        return Promise.reject(error);
    }
);

// -------------------------------
// VARIABLES GLOBALES
// -------------------------------
let preguntas = [];
let nivelesRiesgoMap = {}; // Cache de niveles de riesgo cargados desde API
let ambitosMap = {}; // Cache de ámbitos cargados desde API

// -------------------------------
// FUNCIONES DE UTILIDAD
// -------------------------------
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function mostrarExito(mensaje) {
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: mensaje,
        timer: 2000,
        showConfirmButton: false
    });
}

function mostrarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
        confirmButtonColor: '#3B82F6'
    });
}

function mostrarCargando(mensaje = 'Cargando...') {
    Swal.fire({
        title: mensaje,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

function cerrarCargando() {
    Swal.close();
}

// -------------------------------
// FUNCIONES PARA CARGAR DATOS DESDE API
// -------------------------------
async function cargarDatosIniciales() {
    try {
        console.log('Cargando datos iniciales...');
        
        // Cargar niveles de riesgo y ámbitos desde API si existen endpoints
        // Por ahora usamos valores estáticos que coinciden con tu BD
        await cargarNivelesRiesgo();
        await cargarAmbitos();
        
        // Cargar preguntas
        await cargarPreguntasDesdeAPI();
        
        console.log('Datos iniciales cargados correctamente');
    } catch (error) {
        console.error('Error al cargar datos iniciales:', error);
        mostrarError('No se pudieron cargar los datos iniciales. Recarga la página.');
    }
}

async function cargarNivelesRiesgo() {
    try {
        // Mapeo según tu base de datos
        // Estos IDs deben coincidir con los de tu tabla nivel_riesgo
        nivelesRiesgoMap = {
            'bajo': { id: 1, nombre: 'Bajo', valor_puntaje: 1 },
            'moderado': { id: 2, nombre: 'Moderado', valor_puntaje: 2 },
            'alto': { id: 3, nombre: 'Alto', valor_puntaje: 3 },
            'extremo': { id: 4, nombre: 'Extremo', valor_puntaje: 4 },
            'activadora': { id: 5, nombre: 'Activadora', valor_puntaje: 100 }
        };
        
        console.log('Niveles de riesgo cargados:', nivelesRiesgoMap);
    } catch (error) {
        console.error('Error al cargar niveles de riesgo:', error);
        throw error;
    }
}

async function cargarAmbitos() {
    try {
        // Mapeo según tu base de datos (ACTUALIZADO)
        // Estos IDs deben coincidir con los de tu tabla ambito
        ambitosMap = {
            'Conducta del Agresor': 1,
            'Contexto de la Violencia': 2,
            'Percepción de Víctima': 3,
            'Vulnerabilidad de Víctima': 4,
            'Riesgos de la Víctima': 5
        };
        
        console.log('Ambitos cargados:', ambitosMap);
    } catch (error) {
        console.error('Error al cargar ambitos:', error);
        throw error;
    }
}

async function cargarPreguntasDesdeAPI() {
    try {
        console.log('Cargando preguntas desde API...');
        mostrarCargando('Cargando preguntas...');
        
        const response = await api.get('/preguntas');
        preguntas = response.data.data || response.data;
        
        console.log(`${preguntas.length} preguntas cargadas`);
        console.log('Muestra de pregunta:', preguntas[0]);
        
        // Actualizar todas las tablas
        cargarTodasLasTablas();
        
        cerrarCargando();
        return preguntas;
    } catch (error) {
        console.error('Error al cargar preguntas:', error);
        cerrarCargando();
        // Limpiar array de preguntas para que las tablas muestren el error
        preguntas = [];
        
        // Actualizar todas las tablas para mostrar el mensaje de error
        cargarTodasLasTablas();
        
        return [];
    }
}

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
        console.error(`No se encontro el tbody con id: ${tbodyId}`);
        return;
    }

    tbody.innerHTML = "";

    // Si no hay preguntas cargadas, mostrar mensaje de error de conexión
    if (!preguntas || preguntas.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td colspan="6" class="px-6 py-8 text-center text-red-500">
                No se pudo conectar con el servidor. Verifica que el backend esté corriendo en http://localhost:8000
            </td>
        `;
        tbody.appendChild(tr);
        return;
    }

    // Filtrar preguntas según el nivel
    let preguntasFiltradas = [];

    if (nivel === 'todo') {
        preguntasFiltradas = preguntas;
    } else {
        // Normalizar nombre del nivel para comparar
        preguntasFiltradas = preguntas.filter(p => {
            const nivelPregunta = (p.nivel_riesgo || '').toLowerCase().trim();
            const nivelBuscado = nivel.toLowerCase().trim();
            return nivelPregunta === nivelBuscado;
        });
    }

    if (preguntasFiltradas.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td colspan="6" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-lg">
                ${nivel === 'todo' ? 'No hay preguntas' : `No hay preguntas de nivel ${nivel}`}
            </td>
        `;
        tbody.appendChild(tr);
        return;
    }

    preguntasFiltradas.forEach(p => {
        const tr = document.createElement("tr");
        // Clase mejorada para los bordes en ambos modos
        tr.className = "border-b border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300";

        // Determinar clases CSS según el nivel de riesgo
        let riesgoClass = "";
        let riesgoText = p.nivel_riesgo || 'Sin nivel';

        switch ((p.nivel_riesgo || '').toLowerCase()) {
            case 'bajo':
                riesgoClass = "bg-green-500";
                break;
            case 'moderado':
                riesgoClass = "bg-yellow-500";
                break;
            case 'alto':
                riesgoClass = "bg-orange-500";
                break;
            case 'extremo':
                riesgoClass = "bg-red-600";
                break;
            case 'activadora':
                riesgoClass = "bg-[#8B0000]";
                riesgoText = "Activador";
                break;
            default:
                riesgoClass = "bg-gray-500";
        }

        // Determinar estado actual y clase para badge de estado
        const estadoActual = (p.estado || 'Inactivo').toLowerCase();
        const estadoBadgeClass = estadoActual === 'activo' ? 'bg-green-600' : 'bg-red-600';
        
        // Formatear puntaje
        const puntajeFormateado = p.puntaje !== null && p.puntaje !== undefined ? `${p.puntaje} pts` : '0 pts';

        tr.innerHTML = `
            <td class="px-6 py-4 text-gray-900 dark:text-white font-medium">${escapeHtml(p.pregunta || '')}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center text-gray-900 dark:text-white">${escapeHtml(p.ambito || 'N/A')}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center justify-center w-20 px-3 py-1 rounded-full text-xs font-semibold relative overflow-hidden state-badge-shimmer ${riesgoClass}">
                    ${riesgoText}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                ${puntajeFormateado}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="state-badge-shimmer inline-flex items-center justify-center w-20 px-3 py-1 rounded-full text-xs font-semibold relative overflow-hidden ${estadoBadgeClass} border-0 shadow-sm">
                    ${p.estado || 'Inactivo'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-2">
                    <button class="action-btn-view"
                            data-id="${p.id}">
                        Editar
                    </button>
                    <button class="action-btn-toggle-estado"
                            data-id="${p.id}"
                            data-estado="${p.estado || 'Inactivo'}">
                        ${estadoActual === 'activo' ? 'Desactivar' : 'Activar'}
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(tr);
    });

    // Agregar event listeners a los nuevos botones
    agregarEventListenersABotones();
}

// -------------------------------
// FUNCIONES CRUD CON AXIOS
// -------------------------------
async function crearPregunta(datosPregunta) {
    try {
        mostrarCargando('Creando pregunta...');
        
        // Obtener IDs correctos según el mapeo
        const idAmbito = obtenerIdAmbito(datosPregunta.ambito);
        const idNivelRiesgo = obtenerIdNivelRiesgo(datosPregunta.nivel_riesgo);
        
        console.log('Mapeando:', {
            ambito: datosPregunta.ambito,
            id_ambito: idAmbito,
            nivel_riesgo: datosPregunta.nivel_riesgo,
            id_nivel_riesgo: idNivelRiesgo
        });
        
        // Formato exacto que espera el backend
        const datosBackend = {
            pregunta: datosPregunta.pregunta,
            id_ambito: idAmbito,
            id_nivel_riesgo: idNivelRiesgo,
            estado: datosPregunta.estado || 'Activo',
        };

        console.log('Enviando al backend:', datosBackend);
        
        const response = await api.post('/preguntas', datosBackend);
        
        cerrarCargando();
        mostrarExito('Pregunta creada exitosamente');
        
        // Recargar datos
        await cargarPreguntasDesdeAPI();
        
        return response.data;
    } catch (error) {
        cerrarCargando();
        console.error('Error al crear pregunta:', error);
        console.error('Detalles:', error.response?.data);
        throw error;
    }
}

async function actualizarPregunta(id, datosActualizados) {
    try {
        mostrarCargando('Actualizando pregunta...');
        
        // Preparar datos en formato backend
        const datosBackend = {};
        
        if (datosActualizados.pregunta) {
            datosBackend.pregunta = datosActualizados.pregunta;
        }
        
        if (datosActualizados.ambito) {
            datosBackend.id_ambito = obtenerIdAmbito(datosActualizados.ambito);
        }
        
        if (datosActualizados.nivel_riesgo) {
            datosBackend.id_nivel_riesgo = obtenerIdNivelRiesgo(datosActualizados.nivel_riesgo);
        }
        
        if (datosActualizados.estado) {
            datosBackend.estado = datosActualizados.estado;
        }
        
        console.log('Actualizando pregunta ID', id, 'con:', datosBackend);
        
        const response = await api.put(`/preguntas/${id}`, datosBackend);
        
        cerrarCargando();
        mostrarExito('Pregunta actualizada exitosamente');
        
        // Recargar datos
        await cargarPreguntasDesdeAPI();
        
        return response.data;
    } catch (error) {
        cerrarCargando();
        console.error('Error al actualizar pregunta:', error);
        console.error('Detalles:', error.response?.data);
        throw error;
    }
}

async function actualizarEstadoPregunta(id, nuevoEstado) {
    try {
        mostrarCargando('Actualizando estado...');
        
        // Usar el endpoint PUT genérico con solo el estado
        const response = await api.put(`/preguntas/${id}`, {
            estado: nuevoEstado
        });
        
        // Actualizar localmente
        const index = preguntas.findIndex(p => p.id == id);
        if (index !== -1) {
            preguntas[index].estado = nuevoEstado;
        }
        
        cerrarCargando();
        mostrarExito(`Pregunta ${nuevoEstado.toLowerCase()} exitosamente`);
        
        // Recargar tabla actual
        const tabActivo = document.querySelector('.browser-tab.active');
        if (tabActivo) {
            const tabName = tabActivo.getAttribute('data-tab');
            cargarTablaPorNivel(tabName === 'todo' ? 'todo' : tabName);
        }
        
        return response.data;
    } catch (error) {
        cerrarCargando();
        console.error('Error al actualizar estado:', error);
        throw error;
    }
}

async function obtenerPreguntaPorId(id) {
    try {
        const response = await api.get(`/preguntas/${id}`);
        const pregunta = response.data.data || response.data;
        console.log('Pregunta obtenida:', pregunta);
        return pregunta;
    } catch (error) {
        console.error('Error al obtener pregunta:', error);
        throw error;
    }
}

// -------------------------------
// FUNCIONES AUXILIARES
// -------------------------------
function obtenerIdNivelRiesgo(nombreNivel) {
    const nivelNormalizado = nombreNivel.toLowerCase().trim();
    const nivel = nivelesRiesgoMap[nivelNormalizado];
    
    if (!nivel) {
        console.warn(`Nivel de riesgo no encontrado: "${nombreNivel}". Usando Bajo por defecto.`);
        return 1; // Default: Bajo
    }
    
    return nivel.id;
}

function obtenerNombreNivelRiesgo(idNivel) {
    const nivel = Object.values(nivelesRiesgoMap).find(n => n.id === idNivel);
    return nivel ? nivel.nombre.toLowerCase() : 'bajo';
}

function obtenerIdAmbito(nombreAmbito) {
    const id = ambitosMap[nombreAmbito];
    
    if (!id) {
        console.warn(`Ambito no encontrado: "${nombreAmbito}". Usando primer ambito por defecto.`);
        return 1; // Default: Conducta del agresor
    }
    
    return id;
}

function obtenerNombreAmbito(idAmbito) {
    const nombre = Object.keys(ambitosMap).find(key => ambitosMap[key] === idAmbito);
    return nombre || 'Conducta del agresor';
}

// -------------------------------
// MANEJO DE FORMULARIOS Y MODALES
// -------------------------------
async function cargarPreguntasDesdeAPI() {
    try {
        console.log('Cargando preguntas desde API...');
        mostrarCargando('Cargando preguntas...');
        
        const response = await api.get('/preguntas');
        preguntas = response.data.data || response.data;
        
        console.log(`${preguntas.length} preguntas cargadas`);
        console.log('Muestra de pregunta:', preguntas[0]);
        
        // Cerrar el loading ANTES de actualizar las tablas
        cerrarCargando();
        
        // Actualizar todas las tablas
        cargarTodasLasTablas();
        
        return preguntas;
    } catch (error) {
        console.error('Error al cargar preguntas:', error);
        
        // Cerrar el loading ANTES de mostrar el error
        cerrarCargando();
        
        // Esperar un momento para que se cierre completamente el loading
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Mostrar error
        mostrarError('No se pudieron cargar las preguntas. Revisa la conexión con el servidor.');
        
        // Limpiar array de preguntas para que las tablas muestren el error
        preguntas = [];
        
        // Actualizar todas las tablas para mostrar el mensaje de error
        cargarTodasLasTablas();
        
        return [];
    }
}

function mostrarModalEdicion(pregunta) {
    const modal = document.getElementById('questionFormModal');
    if (!modal) {
        console.error('Modal no encontrado');
        return;
    }
    
    console.log('Datos de la pregunta a editar:', pregunta);
    
    // Cambiar título
    const titulo = modal.querySelector('h2');
    if (titulo) titulo.textContent = 'Editar Pregunta';
    
    // Llenar campo de pregunta
    const inputPregunta = document.getElementById('pregunta');
    if (inputPregunta) {
        inputPregunta.value = pregunta.pregunta || '';
        console.log('Campo pregunta llenado:', pregunta.pregunta);
    }
    
    // Seleccionar ámbito - CORREGIDO
    const selectAmbito = document.getElementById('ambito');
    if (selectAmbito && pregunta.ambito) {
        console.log('Buscando ambito:', pregunta.ambito);
        console.log('Opciones disponibles:', Array.from(selectAmbito.options).map(o => ({value: o.value, text: o.text})));
        
        // Buscar comparando en minúsculas (case insensitive)
        let encontrado = false;
        const ambitoBuscado = pregunta.ambito.trim().toLowerCase();
        
        for (let i = 0; i < selectAmbito.options.length; i++) {
            const option = selectAmbito.options[i];
            const optionText = option.text.trim().toLowerCase();
            const optionValue = option.value.trim().toLowerCase();
            
            if (optionText === ambitoBuscado || optionValue === ambitoBuscado) {
                selectAmbito.selectedIndex = i;
                encontrado = true;
                console.log('Ambito encontrado y seleccionado:', option.text, 'en index:', i);
                break;
            }
        }
        
        if (!encontrado) {
            console.warn('No se encontro el ambito:', pregunta.ambito);
            console.warn('Buscado (lowercase):', ambitoBuscado);
        }
    }
    
    // Seleccionar nivel de riesgo por nombre
    const selectRiesgo = document.getElementById('riesgo');
    if (selectRiesgo && pregunta.nivel_riesgo) {
        const nivelNormalizado = pregunta.nivel_riesgo.toLowerCase().trim();
        let encontrado = false;
        for (let option of selectRiesgo.options) {
            if (option.value.toLowerCase() === nivelNormalizado) {
                selectRiesgo.value = option.value;
                encontrado = true;
                console.log('Nivel de riesgo seleccionado:', option.value);
                break;
            }
        }
        if (!encontrado) {
            console.warn('No se encontro el nivel de riesgo:', pregunta.nivel_riesgo);
        }
    }
    
    // Estado
    const selectEstado = document.getElementById('estado');
    if (selectEstado) {
        selectEstado.value = pregunta.estado || 'Activo';
        console.log('Estado seleccionado:', pregunta.estado);
    }
    
    // Guardar ID para la actualización
    const btnGuardar = document.getElementById('btnGuardarPregunta');
    if (btnGuardar) {
        btnGuardar.setAttribute('data-id-edicion', pregunta.id);
        btnGuardar.textContent = 'Actualizar Pregunta';
        console.log('ID de pregunta guardado para edicion:', pregunta.id);
    }
    
    // Mostrar modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    console.log('Modal de edicion mostrado');
}

async function guardarPregunta(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const pregunta = document.getElementById('pregunta').value.trim();
    const ambito = document.getElementById('ambito').value;
    const riesgo = document.getElementById('riesgo').value;
    const estado = document.getElementById('estado').value;
    
    // Validaciones
    if (!pregunta) {
        mostrarError('Por favor, escribe la pregunta');
        return;
    }
    
    if (!ambito) {
        mostrarError('Por favor, selecciona un ámbito');
        return;
    }
    
    if (!riesgo) {
        mostrarError('Por favor, selecciona un nivel de riesgo');
        return;
    }
    
    const datosPregunta = {
        pregunta,
        ambito,
        nivel_riesgo: riesgo,
        estado
    };
    
    // Verificar si es edición o creación
    const btnGuardar = document.getElementById('btnGuardarPregunta');
    const idEdicion = btnGuardar.getAttribute('data-id-edicion');
    
    try {
        if (idEdicion) {
            // Es una edición (PUT)
            await actualizarPregunta(idEdicion, datosPregunta);
            
            // Limpiar atributo de edición
            btnGuardar.removeAttribute('data-id-edicion');
            btnGuardar.textContent = 'Guardar Pregunta';
        } else {
            // Es una creación (POST)
            await crearPregunta(datosPregunta);
        }
        
        // Cerrar modal y limpiar formulario
        closeQuestionModal();
        limpiarFormulario();
        
    } catch (error) {
        console.error('Error al guardar pregunta:', error);
        // El error ya se maneja en las funciones individuales
    }
}

// -------------------------------
// MANEJO DE EVENT LISTENERS
// -------------------------------
function agregarEventListenersABotones() {
    // Botones Editar
    const botonesEditar = document.querySelectorAll('.action-btn-view');
    botonesEditar.forEach(boton => {
        boton.addEventListener('click', async function (e) {
            e.preventDefault();
            
            // Animación al hacer clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            const idPregunta = this.getAttribute('data-id');
            await cargarPreguntaParaEditar(idPregunta);
        });
    });

    // Botones Toggle Estado
    const botonesToggleEstado = document.querySelectorAll('.action-btn-toggle-estado');
    botonesToggleEstado.forEach(boton => {
        boton.addEventListener('click', async function (e) {
            e.preventDefault();
            
            // Animación al hacer clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            const idPregunta = this.getAttribute('data-id');
            const estadoActual = this.getAttribute('data-estado');
            const nuevoEstado = estadoActual.toLowerCase() === 'activo' ? 'Inactivo' : 'Activo';
            
            // Confirmación con SweetAlert2
            const esActivo = estadoActual.toLowerCase() === 'activo';
            
            const result = await Swal.fire({
                title: esActivo ? '¿Desactivar pregunta?' : '¿Activar pregunta?',
                text: esActivo 
                    ? '¿Estás seguro de que quieres desactivar esta pregunta?'
                    : '¿Estás seguro de que quieres activar esta pregunta?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: esActivo ? '#EF4444' : '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: esActivo ? 'Sí, desactivar' : 'Sí, activar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            });
            
            if (result.isConfirmed) {
                await actualizarEstadoPregunta(idPregunta, nuevoEstado);
            }
        });
    });
}

function inicializarEventListeners() {
    console.log("Inicializando event listeners...");

    // Modal de Preguntas
    const openQuestionBtn = document.getElementById('openQuestionBtn');
    const questionFormModal = document.getElementById('questionFormModal');
    const closeQuestionBtn = document.getElementById('closeQuestionBtn');
    const cancelQuestionBtn = document.getElementById('cancelQuestionBtn');
    const questionForm = document.getElementById('questionForm');

    // Abrir modal para crear nueva pregunta
    if (openQuestionBtn) {
        openQuestionBtn.addEventListener('click', () => {
            questionFormModal.classList.remove('hidden');
            questionFormModal.classList.add('flex');
            
            // Restaurar título y botón
            const titulo = questionFormModal.querySelector('h2');
            if (titulo) titulo.textContent = 'Nueva Pregunta';
            
            const btnGuardar = document.getElementById('btnGuardarPregunta');
            btnGuardar.removeAttribute('data-id-edicion');
            btnGuardar.textContent = 'Guardar Pregunta';
            
            limpiarFormulario();
        });
    }

    // Cerrar modal
    if (closeQuestionBtn) {
        closeQuestionBtn.addEventListener('click', closeQuestionModal);
    }

    if (cancelQuestionBtn) {
        cancelQuestionBtn.addEventListener('click', closeQuestionModal);
    }

    // Cerrar modal al hacer clic fuera
    questionFormModal?.addEventListener('click', (e) => {
        if (e.target === questionFormModal) {
            closeQuestionModal();
        }
    });

    // Manejar envío del formulario
    if (questionForm) {
        questionForm.addEventListener('submit', guardarPregunta);
    }

    // Tab functionality
    const browserTabs = document.querySelectorAll('.browser-tab');
    if (browserTabs.length > 0) {
        browserTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');
                
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
                
                // Recargar la tabla específica
                cargarTablaPorNivel(tabName);
            });
        });
    }
}

function closeQuestionModal() {
    const questionFormModal = document.getElementById('questionFormModal');
    if (questionFormModal) {
        questionFormModal.classList.remove('flex');
        questionFormModal.classList.add('hidden');
        limpiarFormulario();
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
    if (estado) estado.value = 'Activo';
}

// -------------------------------
// INICIALIZACIÓN DE LA APLICACIÓN
// -------------------------------
document.addEventListener("DOMContentLoaded", async function () {
    console.log("DOM cargado, inicializando aplicacion...");
    
    // Inicializar event listeners
    inicializarEventListeners();
    
    // Cargar datos iniciales
    await cargarDatosIniciales();
    
    console.log("Aplicacion inicializada correctamente");
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const questionFormModal = document.getElementById('questionFormModal');
        if (questionFormModal && questionFormModal.classList.contains('flex')) {
            closeQuestionModal();
        }
    }
});