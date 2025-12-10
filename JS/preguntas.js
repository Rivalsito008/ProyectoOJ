// ============================================
// CONFIGURACIÓN DE AXIOS
// ============================================
const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Manejo global de errores
api.interceptors.response.use(
    response => response,
    error => {
        console.error('Error de API:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// ============================================
// VARIABLES GLOBALES
// ============================================
let preguntas = [];
let nivelesRiesgoMap = {};
let ambitosMap = {};

// Variables para modo edición
let modoEdicion = false;
let preguntaEnEdicion = null;

// Variable para controlar si ya se mostró el error
let errorMostrado = false;

// ============================================
// INICIALIZACIÓN EN DOMContentLoaded
// ============================================
document.addEventListener('DOMContentLoaded', async function () {
    // Mostrar SweetAlert de carga
    const loadingSwal = Swal.fire({
        title: 'Cargando preguntas...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        await cargarDatosIniciales();
        inicializarModal();
        inicializarTabs();
        
        // Cerrar el SweetAlert cuando todo haya cargado
        Swal.close();
        errorMostrado = false;
        
    } catch (error) {
        console.error('Error crítico en inicialización:', error);
        
        // Cerrar el loading
        if (Swal.isVisible()) {
            Swal.close();
        }
        
        // Mostrar error solo si no se ha mostrado antes
        if (!errorMostrado) {
            errorMostrado = true;
            
            // Usar un delay para asegurar que el loading se cierre
            await new Promise(resolve => setTimeout(resolve, 200));
            
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                html: '<p class="text-lg">No se pudieron cargar las preguntas. Revisa la conexión con el servidor.</p>',
                confirmButtonColor: '#EF4444',
                confirmButtonText: 'Entendido',
                allowOutsideClick: false
            });
        }
        
        return;
    }

    // Botón para CREAR nueva pregunta
    const openBtn = document.getElementById('openQuestionBtn');
    if (openBtn) {
        openBtn.replaceWith(openBtn.cloneNode(true));
        const newOpenBtn = document.getElementById('openQuestionBtn');
        newOpenBtn.addEventListener('click', () => {
            abrirModalCrear();
        });
    }
    
    // Botón para GUARDAR/ACTUALIZAR
    const btnGuardar = document.getElementById('btnGuardarPregunta');
    if (btnGuardar) {
        btnGuardar.replaceWith(btnGuardar.cloneNode(true));
        const newBtnGuardar = document.getElementById('btnGuardarPregunta');
        newBtnGuardar.addEventListener('click', async function(e) {
            e.preventDefault();
            
            if (this.disabled) return;
            
            await guardarOActualizarPregunta();
        });
    }
});

// ============================================
// FUNCIONES PARA CARGAR DATOS INICIALES
// ============================================
async function cargarDatosIniciales() {
    try {
        // Cargar catálogos
        await cargarNivelesRiesgo();
        await cargarAmbitos();
        
        // Cargar preguntas
        await cargarPreguntasDesdeAPI();
        
    } catch (error) {
        console.error('Error al cargar datos iniciales:', error);
        throw error;
    }
}

async function cargarNivelesRiesgo() {
    try {
        nivelesRiesgoMap = {
            'bajo': { id: 1, nombre: 'Bajo', valor_puntaje: 1 },
            'moderado': { id: 2, nombre: 'Moderado', valor_puntaje: 2 },
            'alto': { id: 3, nombre: 'Alto', valor_puntaje: 3 },
            'extremo': { id: 4, nombre: 'Extremo', valor_puntaje: 4 },
            'activadora': { id: 5, nombre: 'Activadora', valor_puntaje: 100 }
        };
    } catch (error) {
        throw error;
    }
}

async function cargarAmbitos() {
    try {
        ambitosMap = {
            'Conducta del Agresor': 1,
            'Contexto de la Violencia': 2,
            'Percepción de Víctima': 3,
            'Vulnerabilidad de Víctima': 4,
            'Riesgos de la Víctima': 5
        };
    } catch (error) {
        throw error;
    }
}

async function cargarPreguntasDesdeAPI() {
    try {
        const response = await api.get('/preguntas');
        preguntas = response.data.data || response.data;
        
        // Actualizar todas las tablas
        cargarTodasLasTablas();
        
        return preguntas;
    } catch (error) {
        console.error('Error al cargar preguntas:', error);
        throw error;
    }
}

// ============================================
// FUNCIONES PARA CARGAR TABLAS
// ============================================
function cargarTodasLasTablas() {
    cargarTablaPorNivel('todo');
}

function cargarTablaPorNivel(nivel) {
    const tbodyId = `tabla${nivel.charAt(0).toUpperCase() + nivel.slice(1)}`;
    const tbody = document.getElementById(tbodyId);

    if (!tbody) {
        console.error(`No se encontró el tbody con id: ${tbodyId}`);
        return;
    }

    tbody.innerHTML = "<tr><td colspan='6' class='px-6 py-8 text-center'>Cargando...</td></tr>";

    try {
        // Filtrar preguntas según el nivel
        let preguntasFiltradas = [];

        if (nivel === 'todo') {
            preguntasFiltradas = preguntas;
        } else {
            preguntasFiltradas = preguntas.filter(p => {
                const nivelPregunta = (p.nivel_riesgo || '').toLowerCase().trim();
                const nivelBuscado = nivel.toLowerCase().trim();
                return nivelPregunta === nivelBuscado;
            });
        }

        tbody.innerHTML = "";

        if (preguntasFiltradas.length === 0) {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td colspan="6" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-lg">
                    No hay preguntas ${nivel !== 'todo' ? 'de nivel ' + nivel : 'registradas'}
                </td>
            `;
            tbody.appendChild(tr);
            return;
        }

        // Renderizar preguntas
        preguntasFiltradas.forEach(p => {
            const tr = document.createElement("tr");
            tr.className = "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors";

            // Determinar clase de riesgo
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
                    riesgoText = "Activadora";
                    break;
                default:
                    riesgoClass = "bg-gray-500";
            }

            const estadoActual = (p.estado || 'Inactivo').toLowerCase();
            const estadoNormalizado = estadoActual.trim().toLowerCase();
            const esActivo = estadoNormalizado === 'activo';
            
            const textoBoton = esActivo ? 'Desactivar' : 'Activar';
            const colorBoton = esActivo ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600';

            const puntajeFormateado = p.puntaje !== null && p.puntaje !== undefined ? `${p.puntaje} pts` : '0 pts';

tr.innerHTML = `
                <td class="px-6 py-4 font-medium">${escapeHtml(p.pregunta || '')}</td>
                <td class="px-6 py-4 text-center">${escapeHtml(p.ambito || 'N/A')}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                    <span class="state-badge-shimmer inline-flex items-center justify-center w-20 px-3 py-1 rounded-full text-xs font-semibold relative overflow-hidden ${riesgoClass} text-white border-0 shadow-sm">
                        ${riesgoText}
                    </span>
                </td>
                <td class="px-6 py-4 text-center font-semibold">
                    ${puntajeFormateado}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                    <span class="state-badge-shimmer inline-flex items-center justify-center w-20 px-3 py-1 rounded-full text-xs font-semibold relative overflow-hidden ${colorBoton.split(' ')[0]} text-white border-0 shadow-sm">
                        ${p.estado || 'Inactivo'}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <div class="flex space-x-2 justify-center">
                        <button class="action-btn-view w-20 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm relative overflow-hidden"
                                data-id="${p.id}">
                            Editar
                        </button>
                        <button class="action-btn-toggle-estado w-24 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm relative overflow-hidden ${colorBoton} text-white"
                                data-id="${p.id}"
                                data-estado="${p.estado || 'Inactivo'}"
                                data-pregunta="${escapeHtml(p.pregunta || '')}">
                            ${textoBoton}
                        </button>
                    </div>
                </td>
            `;

            tbody.appendChild(tr);
        });

        agregarEventListenersABotones();

    } catch (error) {
        console.error('Error al cargar preguntas:', error);
        
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-8 text-center">
                    <div class="flex flex-col items-center justify-center space-y-3">
                        <svg class="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p class="text-red-500 text-xl font-bold">Error al cargar preguntas</p>
                        <p class="text-gray-500 text-sm">Verifica la conexión con el servidor</p>
                    </div>
                </td>
            </tr>
        `;
        
        throw error;
    }
}

// ============================================
// FUNCIONES PARA MODAL
// ============================================
function inicializarModal() {
    const closeBtn = document.getElementById('closeQuestionBtn');
    const cancelBtn = document.getElementById('cancelQuestionBtn');
    const modal = document.getElementById('questionFormModal');

    if (closeBtn && modal) {
        const closeModal = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            modoEdicion = false;
            preguntaEnEdicion = null;
            limpiarFormulario();
        };

        closeBtn.addEventListener('click', closeModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

        window.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('flex')) {
                closeModal();
            }
        });
    }
}

function abrirModalCrear() {
    modoEdicion = false;
    preguntaEnEdicion = null;
    limpiarFormulario();
    
    const modalTitle = document.querySelector('#questionFormModal h2');
    if (modalTitle) {
        modalTitle.textContent = 'Nueva Pregunta';
    }
    
    const btnGuardar = document.getElementById('btnGuardarPregunta');
    if (btnGuardar) {
        btnGuardar.textContent = 'Guardar Pregunta';
    }
    
    const modal = document.getElementById('questionFormModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

async function abrirModalEditar(idPregunta) {
    // Mostrar SweetAlert de carga inmediatamente (IDÉNTICO al de tribunales)
    const loadingSwal = Swal.fire({
        title: 'Cargando datos...',
        html: 'Por favor espera mientras se cargan los datos de la pregunta',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    
    try {
        modoEdicion = true;
        preguntaEnEdicion = idPregunta;
        
        const modal = document.getElementById('questionFormModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        const modalTitle = document.querySelector('#questionFormModal h2');
        if (modalTitle) {
            modalTitle.textContent = 'Editar Pregunta';
        }
        
        const btnGuardar = document.getElementById('btnGuardarPregunta');
        if (btnGuardar) {
            btnGuardar.textContent = 'Actualizar Pregunta';
        }
        
        const response = await api.get(`/preguntas/${idPregunta}`);
        const pregunta = response.data.data || response.data;
        
        // Llenar formulario con los datos de la pregunta
        await llenarFormularioEdicion(pregunta);
        
        // Cerrar el SweetAlert de carga
        Swal.close();
        
    } catch (error) {
        // Cerrar el loading si hubo error
        Swal.close();
        
        await Swal.fire({
            icon: 'error',
            title: 'Error al cargar',
            text: 'No se pudieron cargar los datos de la pregunta',
            confirmButtonColor: '#3B82F6'
        });
        
        cerrarModal();
    }
}

function cerrarModal() {
    const modal = document.getElementById('questionFormModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    
    modoEdicion = false;
    preguntaEnEdicion = null;
    limpiarFormulario();
}

async function llenarFormularioEdicion(pregunta) {
    // Campo pregunta
    const inputPregunta = document.getElementById('pregunta');
    if (inputPregunta) {
        inputPregunta.value = pregunta.pregunta || '';
    }
    
    // Select ámbito
    const selectAmbito = document.getElementById('ambito');
    if (selectAmbito && pregunta.ambito) {
        const ambitoBuscado = pregunta.ambito.trim();
        let ambitoEncontrado = false;
        
        for (let i = 0; i < selectAmbito.options.length; i++) {
            if (selectAmbito.options[i].text.trim() === ambitoBuscado) {
                selectAmbito.selectedIndex = i;
                ambitoEncontrado = true;
                break;
            }
        }
        
        // Si no se encuentra exacto, buscar con coincidencia parcial
        if (!ambitoEncontrado) {
            for (let i = 0; i < selectAmbito.options.length; i++) {
                const optionText = selectAmbito.options[i].text.trim().toLowerCase();
                const ambitoLower = ambitoBuscado.toLowerCase();
                if (optionText.includes(ambitoLower) || ambitoLower.includes(optionText)) {
                    selectAmbito.selectedIndex = i;
                    break;
                }
            }
        }
    }
    
    // Select nivel de riesgo
    const selectRiesgo = document.getElementById('riesgo');
    if (selectRiesgo && pregunta.nivel_riesgo) {
        const nivelNormalizado = pregunta.nivel_riesgo.toLowerCase().trim();
        for (let option of selectRiesgo.options) {
            if (option.value.toLowerCase() === nivelNormalizado) {
                selectRiesgo.value = option.value;
                break;
            }
        }
    }
    
    // Select estado
    const selectEstado = document.getElementById('estado');
    if (selectEstado) {
        selectEstado.value = pregunta.estado || 'Activo';
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

// ============================================
// FUNCIONES PARA TABS
// ============================================
function inicializarTabs() {
    const tabs = document.querySelectorAll('.browser-tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');

            const targetContent = document.getElementById(tabName);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Mapear nombres de tabs a niveles
            const nivelMap = {
                'todo': 'todo',
                'bajo': 'bajo',
                'moderado': 'moderado',
                'alto': 'alto',
                'extremo': 'extremo',
                'activadora': 'activadora'
            };

            const nivel = nivelMap[tabName] || 'todo';
            cargarTablaPorNivel(nivel);
        });
    });
}

// ============================================
// EVENT LISTENERS PARA BOTONES
// ============================================
function agregarEventListenersABotones() {
    // Botones Editar
    const botonesEditar = document.querySelectorAll('.action-btn-view');
    botonesEditar.forEach(boton => {
        boton.addEventListener('click', function (e) {
            e.preventDefault();
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            const idPregunta = this.getAttribute('data-id');
            abrirModalEditar(idPregunta);
        });
    });

    // Botones Toggle Estado
    const botonesToggleEstado = document.querySelectorAll('.action-btn-toggle-estado');
    botonesToggleEstado.forEach(boton => {
        boton.addEventListener('click', async function (e) {
            e.preventDefault();
            
            const idPregunta = this.getAttribute('data-id');
            const estadoActual = this.getAttribute('data-estado');
            const textoPregunta = this.getAttribute('data-pregunta');
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            const esActivo = estadoActual === 'Activo';
            
            const result = await Swal.fire({
                title: esActivo ? '¿Desactivar pregunta?' : '¿Activar pregunta?',
                html: `¿Estás seguro de que quieres <strong>${esActivo ? 'DESACTIVAR' : 'ACTIVAR'}</strong> la pregunta<br><strong>"${textoPregunta}"</strong>?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: esActivo ? '#EF4444' : '#3cd455ff',
                cancelButtonColor: '#6B7280',
                confirmButtonText: esActivo ? 'Sí, desactivar' : 'Sí, activar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            });
            
            if (result.isConfirmed) {
                try {
                    this.textContent = 'Cambiando...';
                    this.disabled = true;
                    
                    const resultado = await toggleEstadoPregunta(idPregunta);
                    const nuevoEstado = resultado.data?.estado || (estadoActual === 'Activo' ? 'Inactivo' : 'Activo');
                    
                    this.setAttribute('data-estado', nuevoEstado);
                    
                    if (nuevoEstado === 'Inactivo') {
                        this.classList.remove('bg-red-500', 'hover:bg-red-600');
                        this.classList.add('bg-green-500', 'hover:bg-green-600');
                        this.textContent = 'Activar';
                    } else {
                        this.classList.remove('bg-green-500', 'hover:bg-green-600');
                        this.classList.add('bg-red-500', 'hover:bg-red-600');
                        this.textContent = 'Desactivar';
                    }
                    
                    this.disabled = false;
                    
                    await Swal.fire({
                        icon: 'success',
                        title: '¡Estado actualizado!',
                        text: resultado.message || `La pregunta ahora está ${nuevoEstado}`,
                        timer: 2000,
                        showConfirmButton: false
                    });
                    
                    const tabActivo = document.querySelector('.browser-tab.active');
                    if (tabActivo) {
                        const tabName = tabActivo.getAttribute('data-tab');
                        if (tabName !== 'todo') {
                            await cargarTablaPorNivel(tabName);
                        }
                    }
                    
                } catch (error) {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.response?.data?.message || 'No se pudo cambiar el estado de la pregunta',
                        confirmButtonColor: '#3B82F6'
                    });
                    
                    this.disabled = false;
                    this.textContent = estadoActual === 'Activo' ? 'Desactivar' : 'Activar';
                }
            }
        });
    });
}

// ============================================
// FUNCIONES PARA GUARDAR/ACTUALIZAR
// ============================================
async function guardarOActualizarPregunta() {
    const botonGuardar = document.getElementById('btnGuardarPregunta');
    
    if (botonGuardar.disabled) {
        return;
    }
    
    // Obtener valores
    const preguntaTexto = document.getElementById('pregunta').value.trim();
    const ambitoSelect = document.getElementById('ambito');
    const ambito = ambitoSelect.options[ambitoSelect.selectedIndex]?.text || '';
    const riesgo = document.getElementById('riesgo').value;
    const estado = document.getElementById('estado').value;

    // Validaciones
    if (!preguntaTexto || !ambito || !riesgo) {
        await Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor complete todos los campos requeridos',
            confirmButtonColor: '#3B82F6'
        });
        return;
    }

    const preguntaData = {
        pregunta: preguntaTexto,
        ambito: ambito,
        nivel_riesgo: riesgo,
        estado: estado
    };

    try {
        const textoOriginal = botonGuardar.textContent;
        botonGuardar.textContent = modoEdicion ? 'Actualizando...' : 'Guardando...';
        botonGuardar.disabled = true;

        let resultado;
        
        if (modoEdicion && preguntaEnEdicion) {
            resultado = await actualizarPregunta(preguntaEnEdicion, preguntaData);
            await Swal.fire({
                icon: 'success',
                title: '¡Actualizado!',
                text: 'Pregunta actualizada exitosamente',
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            resultado = await crearPregunta(preguntaData);
            await Swal.fire({
                icon: 'success',
                title: '¡Creado!',
                text: 'Pregunta creada exitosamente',
                timer: 2000,
                showConfirmButton: false
            });
        }
        
        cerrarModal();
        
        const tabActivo = document.querySelector('.browser-tab.active');
        if (tabActivo) {
            const tabName = tabActivo.getAttribute('data-tab');
            await cargarTablaPorNivel(tabName === 'todo' ? 'todo' : tabName);
        } else {
            await cargarTablaPorNivel('todo');
        }
        
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error desconocido';
        await Swal.fire({
            icon: 'error',
            title: 'Error al guardar',
            text: errorMessage,
            confirmButtonColor: '#3B82F6'
        });
    } finally {
        botonGuardar.textContent = modoEdicion ? 'Actualizar Pregunta' : 'Guardar Pregunta';
        botonGuardar.disabled = false;
    }
}

async function crearPregunta(datosPregunta) {
    try {
        const idAmbito = obtenerIdAmbito(datosPregunta.ambito);
        const idNivelRiesgo = obtenerIdNivelRiesgo(datosPregunta.nivel_riesgo);
        
        const datosBackend = {
            pregunta: datosPregunta.pregunta,
            id_ambito: idAmbito,
            id_nivel_riesgo: idNivelRiesgo,
            estado: datosPregunta.estado || 'Activo',
        };
        
        const response = await api.post('/preguntas', datosBackend);
        
        // Recargar datos
        await cargarPreguntasDesdeAPI();
        
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function actualizarPregunta(id, datosActualizados) {
    try {
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
        
        const response = await api.put(`/preguntas/${id}`, datosBackend);
        
        // Recargar datos
        await cargarPreguntasDesdeAPI();
        
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function toggleEstadoPregunta(idPregunta) {
    try {
        // Encontrar pregunta actual
        const pregunta = preguntas.find(p => p.id == idPregunta);
        const estadoActual = pregunta?.estado || 'Inactivo';
        const nuevoEstado = estadoActual === 'Activo' ? 'Inactivo' : 'Activo';
        
        const response = await api.put(`/preguntas/${idPregunta}`, {
            estado: nuevoEstado
        });
        
        // Actualizar localmente
        const index = preguntas.findIndex(p => p.id == idPregunta);
        if (index !== -1) {
            preguntas[index].estado = nuevoEstado;
        }
        
        return response.data;
    } catch (error) {
        throw error;
    }
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================
function obtenerIdNivelRiesgo(nombreNivel) {
    const nivelNormalizado = nombreNivel.toLowerCase().trim();
    const nivel = nivelesRiesgoMap[nivelNormalizado];
    
    if (!nivel) {
        console.warn(`Nivel de riesgo no encontrado: "${nombreNivel}". Usando Bajo por defecto.`);
        return 1;
    }
    
    return nivel.id;
}

function obtenerIdAmbito(nombreAmbito) {
    const id = ambitosMap[nombreAmbito];
    
    if (!id) {
        console.warn(`Ámbito no encontrado: "${nombreAmbito}". Usando primer ámbito por defecto.`);
        return 1;
    }
    
    return id;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}