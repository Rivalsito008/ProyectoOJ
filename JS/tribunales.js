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

// Cargar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async function () {
    await cargarSelectsConDatosReales();
    await cargarTodasLasTablas();
    inicializarModal();
    inicializarTabs();

    // Evento para abrir modal
    const openBtn = document.getElementById('openFormBtn');
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            limpiarFormulario();
        });
    }
});

function cargarTodasLasTablas() {
    cargarTablaPorEstado('todo');
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

        console.log('Respuesta completa de API:', response.data);

        let tribunales = [];
        if (response.data && response.data.data) {
            tribunales = response.data.data;
            console.log('Datos encontrados en response.data.data:', tribunales);
        } else if (Array.isArray(response.data)) {
            tribunales = response.data;
            console.log('Datos encontrados en response.data (array):', tribunales);
        } else {
            console.error('Estructura de datos no reconocida:', response.data);
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

        console.log(`Mostrando ${tribunalesFiltrados.length} tribunales para estado: ${estado}`);

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

            // Funciones helper (mantén las que ya tienes)
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

            // ============================================
            // CORRECCIÓN PRINCIPAL: Lógica de estado
            // ============================================

            // Obtener el estado EXACTAMENTE como viene del JSON
            const estadoTribunal = t.estado || 'Activo';

            // DEBUG: Mostrar en consola para verificar
            console.log(`Tribunal "${t.tribunal}": estado = "${estadoTribunal}"`);

            // Normalizar el estado (eliminar espacios y convertir a lowercase para comparar)
            const estadoNormalizado = estadoTribunal.trim().toLowerCase();

            // Determinar si está activo
            const esActivo = estadoNormalizado === 'activo';

            // LÓGICA CORRECTA:
            // Si el tribunal está ACTIVO → mostrar botón "Desactivar" (rojo)
            // Si el tribunal está INACTIVO → mostrar botón "Activar" (verde)
            const textoBoton = esActivo ? 'Desactivar' : 'Activar';
            const colorBoton = esActivo ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600';

            // Aplicar estilo visual a filas inactivas
            if (!esActivo) {
                tr.classList.add('opacity-60');
            }

            tr.innerHTML = `
        <td class="px-6 py-4 font-medium ${!esActivo ? 'text-gray-400' : ''}">${t.tribunal || 'Sin nombre'}</td>
        <td class="px-6 py-4 text-center ${!esActivo ? 'text-gray-400' : ''}">${getTipo()}</td>
        <td class="px-6 py-4 ${!esActivo ? 'text-gray-400' : ''}">${getNumeracion()}</td>
        <td class="px-6 py-4 ${!esActivo ? 'text-gray-400' : ''}">${getMateria()}</td>
        <td class="px-6 py-4 ${!esActivo ? 'text-gray-400' : ''}">${getDepartamento()}</td>
        <td class="px-6 py-4 ${!esActivo ? 'text-gray-400' : ''}">${getMunicipio()}</td>
        <td class="px-6 py-4 ${!esActivo ? 'text-gray-400' : ''}">${getDistrito()}</td>
        <td class="px-6 py-4 ${!esActivo ? 'text-gray-400' : ''}">${t.direccion || 'No especificada'}</td>
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
        console.error('Error detallado:', error);

        let mensajeError = 'Error desconocido';
        if (error.response) {
            mensajeError = `Error ${error.response.status}: ${error.response.data.message || 'Error del servidor'}`;
        } else if (error.request) {
            mensajeError = 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo en http://localhost:8000';
        } else {
            mensajeError = error.message;
        }

        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="px-6 py-8 text-center text-red-500">
                    ${mensajeError}
                    <br>
                    <small class="text-gray-500">Revisa la consola para más detalles</small>
                </td>
            </tr>
        `;
    }
}

// FUNCIÓN PARA INICIALIZAR MODAL
function inicializarModal() {
    const openBtn = document.getElementById('openFormBtn');
    const closeBtn = document.getElementById('closeFormBtn');
    const modal = document.getElementById('userFormModal');

    if (openBtn && closeBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });

        const closeModal = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
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

// FUNCIÓN PARA INICIALIZAR TABS
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

function agregarEventListenersABotones() {
    // Botones Editar (mantén igual)
    const botonesEditar = document.querySelectorAll('.action-btn-view');
    botonesEditar.forEach(boton => {
        boton.addEventListener('click', function (e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            console.log('Editar tribunal - ID:', this.closest('tr').querySelector('.action-btn-toggle-estado').getAttribute('data-id'));
        });
    });

    // Botones Toggle Estado - CORREGIDO
    const botonesToggleEstado = document.querySelectorAll('.action-btn-toggle-estado');
    botonesToggleEstado.forEach(boton => {
        boton.addEventListener('click', async function (e) {
            e.preventDefault();
            const idTribunal = this.getAttribute('data-id');
            const estadoActual = this.getAttribute('data-estado').trim();
            const nombreTribunal = this.getAttribute('data-nombre');

            // Normalizar estado actual
            const estadoNormalizado = estadoActual.toLowerCase();
            const esActivo = estadoNormalizado === 'activo';

            console.log(`Tribunal: ${nombreTribunal}`);
            console.log(`Estado actual del botón: "${estadoActual}"`);
            console.log(`¿Es activo?: ${esActivo}`);

            // Animación de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Mensaje de confirmación correcto
            const accion = esActivo ? 'DESACTIVAR' : 'ACTIVAR';
            const confirmMessage = `¿Estás seguro de que quieres ${accion} el tribunal "${nombreTribunal}"?`;

            if (confirm(confirmMessage)) {
                try {
                    // Mostrar indicador de carga
                    const originalText = this.textContent;
                    this.textContent = 'Procesando...';
                    this.disabled = true;

                    // Llamar al API
                    const resultado = await toggleEstadoTribunal(idTribunal);

                    console.log('Respuesta de la API:', resultado);

                    // Determinar el nuevo estado (invertir el actual)
                    const nuevoEstado = esActivo ? 'Inactivo' : 'Activo';
                    const nuevoEsActivo = nuevoEstado === 'Activo';

                    console.log(`Nuevo estado: ${nuevoEstado}`);

                    // Actualizar el atributo data-estado
                    this.setAttribute('data-estado', nuevoEstado);

                    // Actualizar el botón visualmente
                    if (nuevoEsActivo) {
                        // Ahora está ACTIVO → mostrar "Desactivar" (rojo)
                        this.classList.remove('bg-green-500', 'hover:bg-green-600');
                        this.classList.add('bg-red-500', 'hover:bg-red-600');
                        this.textContent = 'Desactivar';

                        // Quitar estilos de inactivo
                        this.closest('tr').classList.remove('opacity-60');
                        this.closest('tr').querySelectorAll('td:not(:last-child)').forEach(td => {
                            td.classList.remove('text-gray-400');
                        });
                    } else {
                        // Ahora está INACTIVO → mostrar "Activar" (verde)
                        this.classList.remove('bg-red-500', 'hover:bg-red-600');
                        this.classList.add('bg-green-500', 'hover:bg-green-600');
                        this.textContent = 'Activar';

                        // Aplicar estilos de inactivo
                        this.closest('tr').classList.add('opacity-60');
                        this.closest('tr').querySelectorAll('td:not(:last-child)').forEach(td => {
                            td.classList.add('text-gray-400');
                        });
                    }

                    this.disabled = false;

                    // Mensaje de éxito
                    alert(`Estado cambiado exitosamente a: ${nuevoEstado}`);

                    // Opcional: Recargar tabla si estás en pestaña filtrada
                    const tabActivo = document.querySelector('.browser-tab.active');
                    if (tabActivo) {
                        const tabName = tabActivo.getAttribute('data-tab');
                        if (tabName !== 'Todo') {
                            setTimeout(() => {
                                cargarTablaPorEstado(tabName.toLowerCase());
                            }, 500);
                        }
                    }

                } catch (error) {
                    console.error('Error al cambiar estado:', error);
                    alert('Error al cambiar el estado: ' + (error.response?.data?.message || error.message));

                    // Restaurar botón al estado original
                    this.disabled = false;
                    this.textContent = esActivo ? 'Desactivar' : 'Activar';
                }
            }
        });
    });
}

// Función para cambiar el estado del tribunal
async function toggleEstadoTribunal(idTribunal) {
    try {
        console.log(`Enviando PATCH a: ${API_BASE_URL}/tribunales/${idTribunal}/cambiar-estado`);
        const response = await api.patch(`/tribunales/${idTribunal}/cambiar-estado`);
        return response.data;
    } catch (error) {
        console.error('Error detallado en toggleEstadoTribunal:', {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        throw error;
    }
}

// Función para cargar los selects con datos reales del backend
async function cargarSelectsConDatosReales() {
    try {
        // Cargar tipos de tribunal
        const responseTipos = await api.get('/tipos-tribunal');
        tiposTribunal = responseTipos.data.data || responseTipos.data;

        const tipoSelect = document.getElementById('tipoTribunal');
        tipoSelect.innerHTML = '<option value="">Seleccione un tipo...</option>';
        tiposTribunal.forEach(tipo => {
            tipoSelect.innerHTML += `<option value="${tipo.id_tipo_tribunal}">${tipo.tipo_tribunal}</option>`;
        });

        // Cargar numeraciones
        const responseNumeraciones = await api.get('/numeraciones-tribunal');
        numeracionesTribunal = responseNumeraciones.data.data || responseNumeraciones.data;

        const numeracionSelect = document.getElementById('numeracion');
        numeracionSelect.innerHTML = '<option value="">Seleccione numeración...</option>';
        numeracionSelect.innerHTML += '<option value="">Sin numeración</option>';
        numeracionesTribunal.forEach(numeracion => {
            numeracionSelect.innerHTML += `<option value="${numeracion.id_numeracion_tribunal}">${numeracion.numeracion_tribunal}</option>`;
        });

        // Cargar departamentos
        const responseDepartamentos = await api.get('/departamentos');
        departamentosData = responseDepartamentos.data.data || responseDepartamentos.data;

        const departamentoSelect = document.getElementById('departamento');
        departamentoSelect.innerHTML = '<option value="">Seleccione un departamento...</option>';
        departamentosData.forEach(depto => {
            departamentoSelect.innerHTML += `<option value="${depto.id_departamento}">${depto.departamento}</option>`;
        });

        // Configurar eventos para selects dependientes
        configurarSelectsDependientes();

        console.log('Selects cargados correctamente');

    } catch (error) {
        console.error('Error al cargar datos para selects:', error);
    }
}

// Función para configurar selects dependientes
function configurarSelectsDependientes() {
    const departamentoSelect = document.getElementById('departamento');
    const municipioSelect = document.getElementById('municipio');
    const distritoSelect = document.getElementById('distrito');

    if (departamentoSelect) {
        departamentoSelect.addEventListener('change', async function () {
            const idDepartamento = this.value;
            municipioSelect.innerHTML = '<option value="">Seleccione municipio...</option>';
            distritoSelect.innerHTML = '<option value="">Seleccione distrito...</option>';

            if (idDepartamento) {
                await cargarMunicipiosPorDepartamento(idDepartamento);
            }
        });
    }

    if (municipioSelect) {
        municipioSelect.addEventListener('change', async function () {
            const idMunicipio = this.value;
            distritoSelect.innerHTML = '<option value="">Seleccione distrito...</option>';

            if (idMunicipio) {
                await cargarDistritosPorMunicipio(idMunicipio);
            }
        });
    }

    // Configurar tipo tribunal para cargar materias
    const tipoTribunalSelect = document.getElementById('tipoTribunal');
    const materiaSelect = document.getElementById('materia');

    if (tipoTribunalSelect && materiaSelect) {
        tipoTribunalSelect.addEventListener('change', function () {
            const tipoId = this.value;
            const tipo = tiposTribunal.find(t => t.id_tipo_tribunal == tipoId);

            materiaSelect.innerHTML = '';
            if (tipo && tipo.materia) {
                materiaSelect.innerHTML = `<option value="${tipo.materia.id_materia}">${tipo.materia.materia}</option>`;
            } else {
                materiaSelect.innerHTML = '<option value="">No definido</option>';
            }
        });
    }
}

// Función para cargar municipios según departamento
async function cargarMunicipiosPorDepartamento(idDepartamento) {
    try {
        const response = await api.get(`/municipios?departamento_id=${idDepartamento}`);
        const municipios = response.data.data || response.data;

        const municipioSelect = document.getElementById('municipio');
        municipioSelect.innerHTML = '<option value="">Seleccione municipio...</option>';

        municipios.forEach(municipio => {
            municipioSelect.innerHTML += `<option value="${municipio.id_municipio}">${municipio.municipio}</option>`;
        });

    } catch (error) {
        console.error('Error al cargar municipios:', error);
    }
}

// Función para cargar distritos según municipio
async function cargarDistritosPorMunicipio(idMunicipio) {
    try {
        const response = await api.get(`/distritos?municipio_id=${idMunicipio}`);
        const distritos = response.data.data || response.data;

        const distritoSelect = document.getElementById('distrito');
        distritoSelect.innerHTML = '<option value="">Seleccione distrito...</option>';

        distritos.forEach(distrito => {
            distritoSelect.innerHTML += `<option value="${distrito.id_distrito}">${distrito.distrito}</option>`;
        });

    } catch (error) {
        console.error('Error al cargar distritos:', error);
    }
}

// Función para limpiar el formulario
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
}

// Event listener para el botón guardar
document.addEventListener('DOMContentLoaded', function () {
    const btnGuardar = document.querySelector('.btn-save-tribu');

    if (btnGuardar) {
        btnGuardar.addEventListener('click', async function () {
            // Recoger datos del formulario
            const tribunalData = {
                tribunal: document.getElementById('nombreTribunal').value,
                direccion: document.getElementById('direccion').value,
                id_tipo_tribunal: document.getElementById('tipoTribunal').value,
                id_numeracion_tribunal: document.getElementById('numeracion').value || null,
                id_distrito: document.getElementById('distrito').value,
                estado: document.getElementById('estado').value
            };

            // Validar campos requeridos
            if (!tribunalData.tribunal || !tribunalData.direccion ||
                !tribunalData.id_tipo_tribunal || !tribunalData.id_distrito) {
                alert('Por favor complete todos los campos requeridos (*)');
                return;
            }

            try {
                await guardarTribunal(tribunalData);
                alert('Tribunal creado exitosamente');

                // Cerrar modal
                document.getElementById('userFormModal').classList.add('hidden');

                // Limpiar formulario
                limpiarFormulario();

                // Recargar la tabla
                cargarTablaPorEstado('todo');

            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message || 'Error desconocido';
                alert('Error al crear tribunal: ' + errorMessage);
            }
        });
    }
});

// Función para guardar tribunal
async function guardarTribunal(tribunalData) {
    try {
        console.log('Enviando datos para crear tribunal:', tribunalData);
        const response = await api.post('/tribunales', tribunalData);
        console.log('Tribunal creado exitosamente:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al guardar tribunal:', error);
        if (error.response) {
            console.error('Respuesta del error:', error.response.data);
        }
        throw error;
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

// ============================================
// SISTEMA COMPLETO DE EDICIÓN DE TRIBUNALES
// ============================================

// Variable global para modo edición
let modoEdicion = false;
let tribunalEnEdicion = null;

// ============================================
// FUNCIÓN PARA ABRIR MODAL EN MODO CREAR
// ============================================
function abrirModalCrear() {
    modoEdicion = false;
    tribunalEnEdicion = null;
    limpiarFormulario();
    
    // Cambiar título y botón del modal
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
    
    // Abrir modal
    const modal = document.getElementById('userFormModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// ============================================
// FUNCIÓN PARA ABRIR MODAL EN MODO EDITAR
// ============================================
async function abrirModalEditar(idTribunal) {
    modoEdicion = true;
    tribunalEnEdicion = idTribunal;
    
    try {
        // Mostrar loading
        const modal = document.getElementById('userFormModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Cambiar título y botón del modal
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
        
        // Obtener datos del tribunal
        const response = await api.get(`/tribunales/${idTribunal}`);
        const tribunal = response.data.data || response.data;
        
        console.log('Datos del tribunal a editar:', tribunal);
        
        // Llenar el formulario
        await llenarFormularioEdicion(tribunal);
        
    } catch (error) {
        console.error('Error al cargar tribunal:', error);
        alert('Error al cargar los datos del tribunal');
        cerrarModal();
    }
}

// ============================================
// FUNCIÓN PARA LLENAR FORMULARIO CON DATOS
// ============================================
async function llenarFormularioEdicion(tribunal) {
    // Campos básicos
    document.getElementById('nombreTribunal').value = tribunal.tribunal || '';
    document.getElementById('direccion').value = tribunal.direccion || '';
    document.getElementById('estado').value = tribunal.estado || 'Activo';
    
    // Tipo de tribunal
    if (tribunal.tipo_tribunal) {
        document.getElementById('tipoTribunal').value = tribunal.tipo_tribunal.id;
        
        // Cargar materia (se carga automáticamente por el evento change)
        const event = new Event('change');
        document.getElementById('tipoTribunal').dispatchEvent(event);
    }
    
    // Numeración
    if (tribunal.numeracion_tribunal) {
        document.getElementById('numeracion').value = tribunal.numeracion_tribunal.id;
    }
    
    // Ubicación geográfica (departamento → municipio → distrito)
    if (tribunal.distrito && tribunal.distrito.municipio && tribunal.distrito.municipio.departamento) {
        const departamentoId = tribunal.distrito.municipio.departamento.id;
        const municipioId = tribunal.distrito.municipio.id;
        const distritoId = tribunal.distrito.id;
        
        // 1. Seleccionar departamento
        document.getElementById('departamento').value = departamentoId;
        
        // 2. Cargar municipios y seleccionar
        await cargarMunicipiosPorDepartamento(departamentoId);
        await new Promise(resolve => setTimeout(resolve, 100)); // Esperar a que se carguen
        document.getElementById('municipio').value = municipioId;
        
        // 3. Cargar distritos y seleccionar
        await cargarDistritosPorMunicipio(municipioId);
        await new Promise(resolve => setTimeout(resolve, 100)); // Esperar a que se carguen
        document.getElementById('distrito').value = distritoId;
    }
}

// ============================================
// FUNCIÓN PARA CERRAR MODAL
// ============================================
function cerrarModal() {
    const modal = document.getElementById('userFormModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    
    // Resetear modo
    modoEdicion = false;
    tribunalEnEdicion = null;
    limpiarFormulario();
}

// ============================================
// FUNCIÓN PARA LIMPIAR FORMULARIO
// ============================================
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
    
    // Limpiar materia
    const materiaSelect = document.getElementById('materia');
    if (materiaSelect) {
        materiaSelect.innerHTML = '<option value="">Seleccione tipo primero...</option>';
    }
}

// ============================================
// EVENT LISTENERS PARA BOTONES DE EDITAR
// ============================================
function agregarEventListenersABotones() {
    // Botones Editar
    const botonesEditar = document.querySelectorAll('.action-btn-view');
    botonesEditar.forEach(boton => {
        boton.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Animación
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Obtener ID del tribunal
            const idTribunal = this.closest('tr').querySelector('.action-btn-toggle-estado').getAttribute('data-id');
            console.log('Editando tribunal ID:', idTribunal);
            
            // Abrir modal en modo edición
            abrirModalEditar(idTribunal);
        });
    });

    // Botones Toggle Estado (mantener como estaba)
    const botonesToggleEstado = document.querySelectorAll('.action-btn-toggle-estado');
    botonesToggleEstado.forEach(boton => {
        boton.addEventListener('click', async function (e) {
            e.preventDefault();
            const idTribunal = this.getAttribute('data-id');
            const estadoActual = this.getAttribute('data-estado');
            const nombreTribunal = this.getAttribute('data-nombre');
            
            // Animación
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            const confirmMessage = estadoActual === 'Activo' 
                ? `¿Estás seguro de que quieres DESACTIVAR el tribunal "${nombreTribunal}"?`
                : `¿Estás seguro de que quieres ACTIVAR el tribunal "${nombreTribunal}"?`;
            
            if (confirm(confirmMessage)) {
                try {
                    this.textContent = 'Cambiando...';
                    this.disabled = true;
                    
                    const resultado = await toggleEstadoTribunal(idTribunal);
                    const nuevoEstado = resultado.data?.estado || (estadoActual === 'Activo' ? 'Inactivo' : 'Activo');
                    
                    this.setAttribute('data-estado', nuevoEstado);
                    
                    if (nuevoEstado === 'Inactivo') {
                        // Tribunal ahora INACTIVO → botón "Activar" (verde)
                        this.classList.remove('bg-red-500', 'hover:bg-red-600');
                        this.classList.add('bg-green-500', 'hover:bg-green-600');
                        this.textContent = 'Activar';
                        // NO aplicar estilos grises - dejar normal
                    } else {
                        // Tribunal ahora ACTIVO → botón "Desactivar" (rojo)
                        this.classList.remove('bg-green-500', 'hover:bg-green-600');
                        this.classList.add('bg-red-500', 'hover:bg-red-600');
                        this.textContent = 'Desactivar';
                        // NO aplicar estilos grises - dejar normal
                    }
                    
                    this.disabled = false;
                    alert(resultado.message || `Estado cambiado a ${nuevoEstado}`);
                    
                    const tabActivo = document.querySelector('.browser-tab.active');
                    if (tabActivo) {
                        const tabName = tabActivo.getAttribute('data-tab');
                        if (tabName !== 'Todo') {
                            await cargarTablaPorEstado(tabName.toLowerCase());
                        }
                    }
                    
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error: ' + (error.response?.data?.message || error.message));
                    this.disabled = false;
                    this.textContent = estadoActual === 'Activo' ? 'Desactivar' : 'Activar';
                }
            }
        });
    });
}

// ============================================
// FUNCIÓN PARA GUARDAR O ACTUALIZAR
// ============================================
async function guardarOActualizarTribunal() {
    // Recoger datos del formulario
    const tribunalData = {
        tribunal: document.getElementById('nombreTribunal').value,
        direccion: document.getElementById('direccion').value,
        id_tipo_tribunal: document.getElementById('tipoTribunal').value,
        id_numeracion_tribunal: document.getElementById('numeracion').value || null,
        id_distrito: document.getElementById('distrito').value,
        estado: document.getElementById('estado').value
    };

    // Validar campos requeridos
    if (!tribunalData.tribunal || !tribunalData.direccion || 
        !tribunalData.id_tipo_tribunal || !tribunalData.id_distrito) {
        alert('Por favor complete todos los campos requeridos (*)');
        return;
    }

    try {
        const botonGuardar = document.querySelector('.btn-save-tribu');
        const textoOriginal = botonGuardar.textContent;
        botonGuardar.textContent = modoEdicion ? 'Actualizando...' : 'Guardando...';
        botonGuardar.disabled = true;

        if (modoEdicion && tribunalEnEdicion) {
            // ACTUALIZAR tribunal existente
            console.log('Actualizando tribunal ID:', tribunalEnEdicion);
            await actualizarTribunal(tribunalEnEdicion, tribunalData);
            alert('Tribunal actualizado exitosamente');
        } else {
            // CREAR nuevo tribunal
            console.log('Creando nuevo tribunal');
            await guardarTribunal(tribunalData);
            alert('Tribunal creado exitosamente');
        }
        
        // Cerrar modal y limpiar
        cerrarModal();
        
        // Recargar la tabla
        const tabActivo = document.querySelector('.browser-tab.active');
        if (tabActivo) {
            const tabName = tabActivo.getAttribute('data-tab');
            await cargarTablaPorEstado(tabName === 'Todo' ? 'todo' : tabName.toLowerCase());
        } else {
            await cargarTablaPorEstado('todo');
        }
        
        botonGuardar.textContent = textoOriginal;
        botonGuardar.disabled = false;
        
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Error desconocido';
        alert('Error: ' + errorMessage);
        
        const botonGuardar = document.querySelector('.btn-save-tribu');
        botonGuardar.textContent = modoEdicion ? 'Actualizar Tribunal' : 'Guardar Tribunal';
        botonGuardar.disabled = false;
    }
}

// ============================================
// FUNCIÓN PARA CREAR TRIBUNAL
// ============================================
async function guardarTribunal(tribunalData) {
    try {
        console.log('Enviando datos para crear:', tribunalData);
        const response = await api.post('/tribunales', tribunalData);
        console.log('Tribunal creado:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al crear:', error.response?.data);
        throw error;
    }
}

// ============================================
// FUNCIÓN PARA ACTUALIZAR TRIBUNAL
// ============================================
async function actualizarTribunal(idTribunal, tribunalData) {
    try {
        console.log('Enviando datos para actualizar:', tribunalData);
        const response = await api.patch(`/tribunales/${idTribunal}`, tribunalData);
        console.log('Tribunal actualizado:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar:', error.response?.data);
        throw error;
    }
}

// ============================================
// FUNCIÓN PARA CAMBIAR ESTADO
// ============================================
async function toggleEstadoTribunal(idTribunal) {
    try {
        console.log(`Cambiando estado del tribunal ID: ${idTribunal}`);
        const response = await api.patch(`/tribunales/${idTribunal}/cambiar-estado`);
        return response.data;
    } catch (error) {
        console.error('Error al cambiar estado:', error);
        throw error;
    }
}

// ============================================
// INICIALIZACIÓN EN DOMContentLoaded
// ============================================
document.addEventListener('DOMContentLoaded', async function () {
    await cargarSelectsConDatosReales();
    await cargarTodasLasTablas();
    inicializarModal();
    inicializarTabs();
    
    // Botón para CREAR nuevo tribunal
    const openBtn = document.getElementById('openFormBtn');
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            abrirModalCrear();
        });
    }
    
    // Botón para GUARDAR/ACTUALIZAR
    const btnGuardar = document.querySelector('.btn-save-tribu');
    if (btnGuardar) {
        btnGuardar.addEventListener('click', async function(e) {
            e.preventDefault();
            await guardarOActualizarTribunal();
        });
    }
});

// ============================================
// FUNCIÓN PARA INICIALIZAR MODAL
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