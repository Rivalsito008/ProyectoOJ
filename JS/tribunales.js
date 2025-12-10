// Configuración de Axios
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

// Aplicar tema y preferencias al cargar
(function () {
    const t = localStorage.getItem('theme-preference') || 'auto';
    let f = t;
    if (t === 'auto') {
        f = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', f);

    const fontSize = localStorage.getItem('font-size') || '16';
    document.documentElement.style.setProperty('--font-size', fontSize + 'px');

    const contrast = localStorage.getItem('contrast') || '1';
    document.documentElement.style.setProperty('--contrast', contrast);
})();

// Variables globales para almacenar datos
let tiposTribunal = [];
let numeracionesTribunal = [];
let departamentosData = [];

// Variables globales para modo edición
let modoEdicion = false;
let tribunalEnEdicion = null;

// Variable para controlar si ya se mostró el error
let errorMostrado = false;

// ============================================
// INICIALIZACIÓN EN DOMContentLoaded
// ============================================
document.addEventListener('DOMContentLoaded', async function () {
    // Mostrar SweetAlert de carga
    const loadingSwal = Swal.fire({
        title: 'Cargando tribunales...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        await cargarSelectsConDatosReales();
        await cargarTodasLasTablas();
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
                html: '<p class="text-lg">No se pudieron cargar los tribunales. Revisa la conexión con el servidor.</p>',
                confirmButtonColor: '#EF4444',
                confirmButtonText: 'Entendido',
                allowOutsideClick: false
            });
        }
        
        return; // Salir para no continuar con la inicialización
    }

    // Botón para CREAR nuevo tribunal
    const openBtn = document.getElementById('openFormBtn');
    if (openBtn) {
        openBtn.replaceWith(openBtn.cloneNode(true));
        const newOpenBtn = document.getElementById('openFormBtn');
        newOpenBtn.addEventListener('click', () => {
            abrirModalCrear();
        });
    }
    
    // Botón para GUARDAR/ACTUALIZAR
    const btnGuardar = document.querySelector('.btn-save-tribu');
    if (btnGuardar) {
        btnGuardar.replaceWith(btnGuardar.cloneNode(true));
        const newBtnGuardar = document.querySelector('.btn-save-tribu');
        newBtnGuardar.addEventListener('click', async function(e) {
            e.preventDefault();
            
            if (this.disabled) return;
            
            await guardarOActualizarTribunal();
        });
    }
});

// ============================================
// FUNCIONES PARA CARGAR TABLAS
// ============================================
function cargarTodasLasTablas() {
    return cargarTablaPorEstado('todo');
}

async function cargarTablaPorEstado(estado) {
    const tbodyId = `tabla${estado.charAt(0).toUpperCase() + estado.slice(1)}`;
    const tbody = document.getElementById(tbodyId);

    if (!tbody) {
        console.error(`No se encontró el tbody con id: ${tbodyId}`);
        return;
    }

    tbody.innerHTML = "<tr><td colspan='9' class='px-6 py-8 text-center'>Cargando...</td></tr>";

    try {
        const response = await api.get('/tribunales');
        
        let tribunales = [];
        if (response.data && response.data.data) {
            tribunales = response.data.data;
        } else if (Array.isArray(response.data)) {
            tribunales = response.data;
        } else {
            throw new Error('Formato de respuesta no válido');
        }

        // Filtrar según estado
        let tribunalesFiltrados = [];
        if (estado === 'todo') {
            tribunalesFiltrados = tribunales;
        } else {
            tribunalesFiltrados = tribunales.filter(t => {
                const estadoTribunal = t.estado || 'Activo';
                return estadoTribunal.toLowerCase() === estado.toLowerCase();
            });
        }

        tbody.innerHTML = "";

        if (tribunalesFiltrados.length === 0) {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td colspan="9" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-lg">
                    No hay tribunales ${estado !== 'todo' ? 'con estado ' + estado : 'registrados'}
                </td>
            `;
            tbody.appendChild(tr);
            return;
        }

        // Renderizar tribunales
        tribunalesFiltrados.forEach(t => {
            const tr = document.createElement("tr");
            tr.className = "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors";
            
            // Funciones helper
            const getTipo = () => {
                if (t.tipo_tribunal) {
                    return t.tipo_tribunal.tipo || t.tipo_tribunal.tipo_tribunal || 'N/A';
                }
                return 'N/A';
            };

            const getNumeracion = () => {
                if (t.numeracion_tribunal) {
                    return t.numeracion_tribunal.numeracion_tribunal || 'Sin numeración';
                }
                return 'Sin numeración';
            };

            const getMateria = () => {
                if (t.tipo_tribunal && t.tipo_tribunal.materia) {
                    return t.tipo_tribunal.materia.materia || 'N/A';
                }
                return 'N/A';
            };

            const getDepartamento = () => {
                if (t.distrito && t.distrito.municipio && t.distrito.municipio.departamento) {
                    return t.distrito.municipio.departamento.departamento || 'N/A';
                }
                return 'N/A';
            };

            const getMunicipio = () => {
                if (t.distrito && t.distrito.municipio) {
                    return t.distrito.municipio.municipio || 'N/A';
                }
                return 'N/A';
            };

            const getDistrito = () => {
                if (t.distrito) {
                    return t.distrito.distrito || 'N/A';
                }
                return 'N/A';
            };

            const estadoTribunal = t.estado || 'Activo';
            const estadoNormalizado = estadoTribunal.trim().toLowerCase();
            const esActivo = estadoNormalizado === 'activo';
            
            const textoBoton = esActivo ? 'Desactivar' : 'Activar';
            const colorBoton = esActivo ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600';

            tr.innerHTML = `
                <td class="px-6 py-4 font-medium">${t.tribunal || 'Sin nombre'}</td>
                <td class="px-6 py-4 text-center">${getTipo()}</td>
                <td class="px-6 py-4">${getNumeracion()}</td>
                <td class="px-6 py-4">${getMateria()}</td>
                <td class="px-6 py-4">${getDepartamento()}</td>
                <td class="px-6 py-4">${getMunicipio()}</td>
                <td class="px-6 py-4">${getDistrito()}</td>
                <td class="px-6 py-4">${t.direccion || 'No especificada'}</td>
                <td class="px-6 py-4">
                    <div class="flex space-x-2 justify-center">
                        <button class="action-btn-view px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                            Editar
                        </button>
                        <button class="action-btn-toggle-estado px-3 py-1 rounded transition text-white ${colorBoton}"
                                data-id="${t.id_tribunal}"
                                data-estado="${estadoTribunal}"
                                data-nombre="${t.tribunal}">
                            ${textoBoton}
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });

        agregarEventListenersABotones();

    } catch (error) {
        console.error('Error al cargar tribunales:', error);
        
        // Mostrar mensaje de error simple en la tabla
        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="px-6 py-8 text-center">
                    <div class="flex flex-col items-center justify-center space-y-3">
                        <svg class="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p class="text-red-500 text-xl font-bold">Error al cargar tribunales</p>
                        <p class="text-gray-500 text-sm">Verifica la conexión con el servidor</p>
                    </div>
                </td>
            </tr>
        `;
        
        // Propagar el error para que sea capturado en DOMContentLoaded
        throw error;
    }
}

// ============================================
// FUNCIONES PARA MODAL
// ============================================
function inicializarModal() {
    const closeBtn = document.getElementById('closeFormBtn');
    const modal = document.getElementById('userFormModal');

    if (closeBtn && modal) {
        const closeModal = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            modoEdicion = false;
            tribunalEnEdicion = null;
            limpiarFormulario();
        };

        closeBtn.addEventListener('click', closeModal);

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
    tribunalEnEdicion = null;
    limpiarFormulario();
    
    const modalTitle = document.querySelector('.modal-header h2');
    if (modalTitle) {
        modalTitle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-500" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Crear Nuevo Tribunal
        `;
    }
    document.querySelector('.btn-save-tribu').textContent = 'Guardar Tribunal';
    
    const modal = document.getElementById('userFormModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

async function abrirModalEditar(idTribunal) {
    // Mostrar SweetAlert de carga inmediatamente
    const loadingSwal = Swal.fire({
        title: 'Cargando datos...',
        html: 'Por favor espera mientras se cargan los datos del tribunal',
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
        tribunalEnEdicion = idTribunal;
        
        const modal = document.getElementById('userFormModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        const modalTitle = document.querySelector('.modal-header h2');
        if (modalTitle) {
            modalTitle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-500" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar Tribunal
            `;
        }
        document.querySelector('.btn-save-tribu').textContent = 'Actualizar Tribunal';
        
        const response = await api.get(`/tribunales/${idTribunal}`);
        const tribunal = response.data.data || response.data;
        
        // Llenar formulario con los datos del tribunal
        await llenarFormularioEdicion(tribunal);
        
        // Cerrar el SweetAlert de carga
        Swal.close();
        
    } catch (error) {
        // Cerrar el loading si hubo error
        Swal.close();
        
        await Swal.fire({
            icon: 'error',
            title: 'Error al cargar',
            text: 'No se pudieron cargar los datos del tribunal',
            confirmButtonColor: '#3B82F6'
        });
        
        cerrarModal();
    }
}

function cerrarModal() {
    const modal = document.getElementById('userFormModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    
    modoEdicion = false;
    tribunalEnEdicion = null;
    limpiarFormulario();
}

async function llenarFormularioEdicion(tribunal) {
    try {
        // Limpiar formulario primero
        limpiarFormulario();
        
        // Llenar campos básicos
        document.getElementById('nombreTribunal').value = tribunal.tribunal || '';
        document.getElementById('direccion').value = tribunal.direccion || '';
        document.getElementById('estado').value = tribunal.estado || 'Activo';
        
        // Llenar tipo tribunal
        if (tribunal.tipo_tribunal) {
            const tipoId = tribunal.tipo_tribunal.id_tipo_tribunal || tribunal.tipo_tribunal.id;
            document.getElementById('tipoTribunal').value = tipoId;
            
            // Disparar evento para cargar materia
            const tipoEvent = new Event('change');
            document.getElementById('tipoTribunal').dispatchEvent(tipoEvent);
        }
        
        // Llenar numeración
        if (tribunal.numeracion_tribunal) {
            document.getElementById('numeracion').value = tribunal.numeracion_tribunal.id_numeracion_tribunal || tribunal.numeracion_tribunal.id;
        }
        
        // Llenar ubicación (Departamento → Municipio → Distrito)
        if (tribunal.distrito && tribunal.distrito.municipio && tribunal.distrito.municipio.departamento) {
            const departamentoId = tribunal.distrito.municipio.departamento.id_departamento || tribunal.distrito.municipio.departamento.id;
            const municipioId = tribunal.distrito.municipio.id_municipio || tribunal.distrito.municipio.id;
            const distritoId = tribunal.distrito.id_distrito || tribunal.distrito.id;
            
            // Paso 1: Establecer departamento
            document.getElementById('departamento').value = departamentoId;
            
            // Paso 2: Cargar municipios del departamento con indicador de progreso
            await cargarMunicipiosPorDepartamento(departamentoId);
            
            // Esperar a que se carguen los municipios
            await new Promise((resolve) => {
                const checkMunicipios = () => {
                    const municipioSelect = document.getElementById('municipio');
                    // Verificar que hay opciones cargadas
                    if (municipioSelect.options.length > 1 && municipioSelect.options[1].value !== '') {
                        // Buscar y seleccionar el municipio correcto
                        for (let option of municipioSelect.options) {
                            if (option.value == municipioId) {
                                municipioSelect.value = municipioId;
                                break;
                            }
                        }
                        
                        // Disparar evento change en municipio para cargar distritos
                        const municipioEvent = new Event('change');
                        municipioSelect.dispatchEvent(municipioEvent);
                        resolve();
                    } else {
                        setTimeout(checkMunicipios, 100);
                    }
                };
                checkMunicipios();
            });
            
            // Paso 3: Cargar distritos del municipio
            await cargarDistritosPorMunicipio(municipioId);
            
            // Esperar a que se carguen los distritos
            await new Promise((resolve) => {
                const checkDistritos = () => {
                    const distritoSelect = document.getElementById('distrito');
                    if (distritoSelect.options.length > 1 && distritoSelect.options[1].value !== '') {
                        // Buscar y seleccionar el distrito correcto
                        for (let option of distritoSelect.options) {
                            if (option.value == distritoId) {
                                distritoSelect.value = distritoId;
                                break;
                            }
                        }
                        resolve();
                    } else {
                        setTimeout(checkDistritos, 100);
                    }
                };
                checkDistritos();
            });
        }
        
        console.log('Formulario cargado exitosamente');
        
    } catch (error) {
        console.error('Error en llenarFormularioEdicion:', error);
        throw error;
    }
}

function limpiarFormulario() {
    document.getElementById('nombreTribunal').value = '';
    document.getElementById('tipoTribunal').value = '';
    document.getElementById('numeracion').value = '';
    document.getElementById('departamento').value = '';
    document.getElementById('municipio').value = '';
    document.getElementById('municipio').innerHTML = '<option value="">Seleccione un departamento primero...</option>';
    document.getElementById('distrito').value = '';
    document.getElementById('distrito').innerHTML = '<option value="">Seleccione un municipio primero...</option>';
    document.getElementById('direccion').value = '';
    document.getElementById('estado').value = 'Activo';
    
    const materiaSelect = document.getElementById('materia');
    if (materiaSelect) {
        materiaSelect.innerHTML = '<option value="">Seleccione tipo primero...</option>';
    }
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

            tabs.forEach(t => {
                t.classList.remove('active');
                const indicator = t.querySelector('.tab-indicator');
                if (indicator) {
                    indicator.style.transform = 'scale(1)';
                }
            });

            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');

            const activeIndicator = tab.querySelector('.tab-indicator');
            if (activeIndicator) {
                activeIndicator.style.transform = 'scale(1.1)';
            }

            const targetContent = document.getElementById(tabName);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            if (tabName === 'Todo') {
                cargarTablaPorEstado('todo');
            } else if (tabName === 'activo') {
                cargarTablaPorEstado('activo');
            } else if (tabName === 'inactivo') {
                cargarTablaPorEstado('inactivo');
            }
        });
    });
}

// ============================================
// EVENT LISTENERS PARA BOTONES
// ============================================
function agregarEventListenersABotones() {
    const botonesEditar = document.querySelectorAll('.action-btn-view');
    botonesEditar.forEach(boton => {
        boton.addEventListener('click', function (e) {
            e.preventDefault();
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            const idTribunal = this.closest('tr').querySelector('.action-btn-toggle-estado').getAttribute('data-id');
            
            abrirModalEditar(idTribunal);
        });
    });

    const botonesToggleEstado = document.querySelectorAll('.action-btn-toggle-estado');
    botonesToggleEstado.forEach(boton => {
        boton.addEventListener('click', async function (e) {
            e.preventDefault();
            const idTribunal = this.getAttribute('data-id');
            const estadoActual = this.getAttribute('data-estado');
            const nombreTribunal = this.getAttribute('data-nombre');
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            const esActivo = estadoActual === 'Activo';
            
            const result = await Swal.fire({
                title: esActivo ? '¿Desactivar tribunal?' : '¿Activar tribunal?',
                html: `¿Estás seguro de que quieres <strong>${esActivo ? 'DESACTIVAR' : 'ACTIVAR'}</strong> el tribunal<br><strong>"${nombreTribunal}"</strong>?`,
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
                    
                    const resultado = await toggleEstadoTribunal(idTribunal);
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
                        text: resultado.message || `El tribunal ahora está ${nuevoEstado}`,
                        timer: 2000,
                        showConfirmButton: false
                    });
                    
                    const tabActivo = document.querySelector('.browser-tab.active');
                    if (tabActivo) {
                        const tabName = tabActivo.getAttribute('data-tab');
                        if (tabName !== 'Todo') {
                            await cargarTablaPorEstado(tabName.toLowerCase());
                        }
                    }
                    
                } catch (error) {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.response?.data?.message || 'No se pudo cambiar el estado del tribunal',
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
async function guardarOActualizarTribunal() {
    const botonGuardar = document.querySelector('.btn-save-tribu');
    
    if (botonGuardar.disabled) {
        return;
    }
    
    const tribunalData = {
        tribunal: document.getElementById('nombreTribunal').value.trim(),
        direccion: document.getElementById('direccion').value.trim(),
        id_tipo_tribunal: document.getElementById('tipoTribunal').value,
        id_numeracion_tribunal: document.getElementById('numeracion').value || null,
        id_distrito: document.getElementById('distrito').value,
        estado: document.getElementById('estado').value
    };

    if (!tribunalData.tribunal || !tribunalData.direccion || 
        !tribunalData.id_tipo_tribunal || !tribunalData.id_distrito) {
        await Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor complete todos los campos requeridos (*)',
            confirmButtonColor: '#3B82F6'
        });
        return;
    }

    try {
        const textoOriginal = botonGuardar.textContent;
        botonGuardar.textContent = modoEdicion ? 'Actualizando...' : 'Guardando...';
        botonGuardar.disabled = true;

        let resultado;
        
        if (modoEdicion && tribunalEnEdicion) {
            resultado = await actualizarTribunal(tribunalEnEdicion, tribunalData);
            await Swal.fire({
                icon: 'success',
                title: '¡Actualizado!',
                text: 'Tribunal actualizado exitosamente',
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            resultado = await guardarTribunal(tribunalData);
            await Swal.fire({
                icon: 'success',
                title: '¡Creado!',
                text: 'Tribunal creado exitosamente',
                timer: 2000,
                showConfirmButton: false
            });
        }
        
        cerrarModal();
        
        const tabActivo = document.querySelector('.browser-tab.active');
        if (tabActivo) {
            const tabName = tabActivo.getAttribute('data-tab');
            await cargarTablaPorEstado(tabName === 'Todo' ? 'todo' : tabName.toLowerCase());
        } else {
            await cargarTablaPorEstado('todo');
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
        botonGuardar.textContent = modoEdicion ? 'Actualizar Tribunal' : 'Guardar Tribunal';
        botonGuardar.disabled = false;
    }
}

async function guardarTribunal(tribunalData) {
    try {
        const response = await api.post('/tribunales', tribunalData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function actualizarTribunal(idTribunal, tribunalData) {
    try {
        const response = await api.put(`/tribunales/${idTribunal}`, tribunalData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function toggleEstadoTribunal(idTribunal) {
    try {
        // Obtener el tribunal para saber el estado actual
        const responseGet = await api.get(`/tribunales/${idTribunal}`);
        const tribunal = responseGet.data.data || responseGet.data;
        
        const estadoActual = tribunal.estado || 'Activo';
        const nuevoEstado = estadoActual === 'Activo' ? 'Inactivo' : 'Activo';
        
        // Enviar solo el campo estado
        const response = await api.put(`/tribunales/${idTribunal}`, {
            estado: nuevoEstado
        });
        
        return response.data;
    } catch (error) {
        throw error;
    }
}

// ============================================
// FUNCIONES PARA CARGAR SELECTS
// ============================================
async function cargarSelectsConDatosReales() {
    try {
        const responseTipos = await api.get('/tipos-tribunal');
        tiposTribunal = responseTipos.data.data || responseTipos.data;
        
        const tipoSelect = document.getElementById('tipoTribunal');
        tipoSelect.innerHTML = '<option value="">Seleccione un tipo...</option>';
        tiposTribunal.forEach(tipo => {
            tipoSelect.innerHTML += `<option value="${tipo.id_tipo_tribunal}">${tipo.tipo_tribunal}</option>`;
        });

        const responseNumeraciones = await api.get('/numeraciones-tribunal');
        numeracionesTribunal = responseNumeraciones.data.data || responseNumeraciones.data;
        
        const numeracionSelect = document.getElementById('numeracion');
        numeracionSelect.innerHTML = '<option value="">Seleccione numeración...</option>';
        numeracionSelect.innerHTML += '<option value="">Sin numeración</option>';
        numeracionesTribunal.forEach(numeracion => {
            numeracionSelect.innerHTML += `<option value="${numeracion.id_numeracion_tribunal}">${numeracion.numeracion_tribunal}</option>`;
        });

        const responseDepartamentos = await api.get('/departamentos');
        departamentosData = responseDepartamentos.data.data || responseDepartamentos.data;
        
        const departamentoSelect = document.getElementById('departamento');
        departamentoSelect.innerHTML = '<option value="">Seleccione un departamento...</option>';
        departamentosData.forEach(depto => {
            departamentoSelect.innerHTML += `<option value="${depto.id_departamento}">${depto.departamento}</option>`;
        });

        configurarSelectsDependientes();

    } catch (error) {
        console.error('Error al cargar datos para selects:', error);
        throw error;
    }
}

function configurarSelectsDependientes() {
    const departamentoSelect = document.getElementById('departamento');
    const municipioSelect = document.getElementById('municipio');
    const distritoSelect = document.getElementById('distrito');

    if (departamentoSelect) {
        departamentoSelect.addEventListener('change', async function() {
            const idDepartamento = this.value;
            
            municipioSelect.innerHTML = '<option value="">Cargando...</option>';
            municipioSelect.disabled = true;
            distritoSelect.innerHTML = '<option value="">Seleccione municipio primero...</option>';
            distritoSelect.disabled = true;
            
            if (idDepartamento) {
                await cargarMunicipiosPorDepartamento(idDepartamento);
            } else {
                municipioSelect.innerHTML = '<option value="">Seleccione un departamento...</option>';
                municipioSelect.disabled = false;
            }
        });
    }

    if (municipioSelect) {
        municipioSelect.addEventListener('change', async function() {
            const idMunicipio = this.value;
            
            distritoSelect.innerHTML = '<option value="">Cargando...</option>';
            distritoSelect.disabled = true;
            
            if (idMunicipio) {
                await cargarDistritosPorMunicipio(idMunicipio);
            } else {
                distritoSelect.innerHTML = '<option value="">Seleccione un municipio...</option>';
                distritoSelect.disabled = false;
            }
        });
    }
}

async function cargarMunicipiosPorDepartamento(idDepartamento) {
    const municipioSelect = document.getElementById('municipio');
    
    if (!idDepartamento) {
        municipioSelect.innerHTML = '<option value="">Seleccione un departamento primero...</option>';
        municipioSelect.disabled = true;
        return;
    }
    
    try {
        municipioSelect.innerHTML = '<option value="">Cargando municipios...</option>';
        municipioSelect.disabled = true;
        
        const response = await api.get(`/municipios/departamento/${idDepartamento}`);
        let municipios = [];
        
        if (response.data && response.data.data) {
            municipios = response.data.data;
        } else if (Array.isArray(response.data)) {
            municipios = response.data;
        }
        
        municipioSelect.innerHTML = '<option value="">Seleccione municipio...</option>';
        
        if (municipios && municipios.length > 0) {
            municipios.forEach(municipio => {
                const option = document.createElement('option');
                option.value = municipio.id_municipio || municipio.id;
                option.textContent = municipio.municipio;
                municipioSelect.appendChild(option);
            });
        } else {
            municipioSelect.innerHTML = '<option value="">No hay municipios disponibles</option>';
        }
        
        municipioSelect.disabled = false;
        
    } catch (error) {
        console.error('Error cargando municipios:', error);
        municipioSelect.innerHTML = '<option value="">Error al cargar municipios</option>';
        municipioSelect.disabled = false;
    }
}

async function cargarDistritosPorMunicipio(idMunicipio) {
    const distritoSelect = document.getElementById('distrito');
    
    if (!idMunicipio) {
        distritoSelect.innerHTML = '<option value="">Seleccione un municipio primero...</option>';
        distritoSelect.disabled = true;
        return;
    }
    
    try {
        distritoSelect.innerHTML = '<option value="">Cargando distritos...</option>';
        distritoSelect.disabled = true;
        
        const response = await api.get(`/distritos/municipio/${idMunicipio}`);
        let distritos = [];
        
        if (response.data && response.data.data) {
            distritos = response.data.data;
        } else if (Array.isArray(response.data)) {
            distritos = response.data;
        }
        
        distritoSelect.innerHTML = '<option value="">Seleccione distrito...</option>';
        
        if (distritos && distritos.length > 0) {
            distritos.forEach(distrito => {
                const option = document.createElement('option');
                option.value = distrito.id_distrito || distrito.id;
                option.textContent = distrito.distrito;
                distritoSelect.appendChild(option);
            });
        } else {
            distritoSelect.innerHTML = '<option value="">No hay distritos disponibles</option>';
        }
        
        distritoSelect.disabled = false;
        
    } catch (error) {
        console.error('Error cargando distritos:', error);
        distritoSelect.innerHTML = '<option value="">Error al cargar distritos</option>';
        distritoSelect.disabled = false;
    }
}

// Detectar cambios en preferencia de sistema (para modo auto)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const temaActual = localStorage.getItem('theme-preference') || 'auto';
    if (temaActual === 'auto') {
        const nuevoTema = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', nuevoTema);
    }
});