// Configuración de Axios
const API_BASE_URL = 'http://localhost:8000/api'; // Ajusta según tu URL

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


// Cargar tablas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async function () {
    // Cargar datos iniciales
    await cargarSelectsConDatosReales();
    await cargarTodasLasTablas();
    inicializarModal();
    inicializarTabs();
    
    // Limpiar formulario al abrir modal
    const openBtn = document.getElementById('openFormBtn');
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            limpiarFormulario();
        });
    }
});

function cargarTodasLasTablas() {
    cargarTablaPorEstado('todo');
    // Si necesitas las otras pestañas, descomenta estas líneas:
    // cargarTablaPorEstado('activo');
    // cargarTablaPorEstado('inactivo');
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
        console.log('Haciendo petición a:', API_BASE_URL + '/tribunales');
        
        const response = await api.get('/tribunales');
        
        console.log('Respuesta completa:', response);
        console.log('Status:', response.status);
        console.log('Data:', response.data);
        
        // Intentar obtener los datos de diferentes estructuras posibles
        let tribunales = [];
        if (response.data.data) {
            tribunales = response.data.data;
        } else if (Array.isArray(response.data)) {
            tribunales = response.data;
        } else {
            console.error('Estructura de datos no reconocida:', response.data);
            throw new Error('Formato de respuesta no válido');
        }

        console.log('Tribunales obtenidos:', tribunales);
        console.log('Cantidad:', tribunales.length);

        // Filtrar según estado
        let tribunalesFiltrados = [];
        if (estado === 'todo') {
            tribunalesFiltrados = tribunales;
        } else {
            tribunalesFiltrados = tribunales.filter(t => 
                t.estado && t.estado.toLowerCase() === estado.toLowerCase()
            );
        }

        console.log('Tribunales filtrados:', tribunalesFiltrados);

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
            console.log('Renderizando tribunal:', t);
            
            const tr = document.createElement("tr");
            tr.className = "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors";
            
            // Funciones helper con validación mejorada
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
                        <button class="action-btn-delete px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                            Eliminar
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });

        agregarEventListenersABotones();

    } catch (error) {
        console.error('Error detallado:', {
            message: error.message,
            response: error.response,
            status: error.response?.status,
            data: error.response?.data
        });
        
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

        // Cerrar modal al hacer clic fuera
        window.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Cerrar modal con ESC
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

            // Remover active de todos los tabs
            tabs.forEach(t => {
                t.classList.remove('active');
                // Resetear transformaciones en los indicadores
                const indicator = t.querySelector('.tab-indicator');
                if (indicator) {
                    indicator.style.transform = 'scale(1)';
                }
            });

            // Remover active de todos los contenidos
            contents.forEach(c => c.classList.remove('active'));

            // Agregar active al tab clickeado
            tab.classList.add('active');

            // Aplicar transformación solo al indicador activo
            const activeIndicator = tab.querySelector('.tab-indicator');
            if (activeIndicator) {
                activeIndicator.style.transform = 'scale(1.1)';
            }

            // Agregar active al contenido correspondiente
            const targetContent = document.getElementById(tabName);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Recargar la tabla correspondiente
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

// ESTRUCTURA CORREGIDA: DEPARTAMENTO -> MUNICIPIO -> DISTRITO
const estructuraTerritorial = {
    "Ahuachapán": {
        "Ahuachapán Norte": ["Atiquizaya", "El Refugio", "San Lorenzo", "Turín"],
        "Ahuachapán Centro": ["Ahuachapán", "Apaneca", "Concepción de Ataco", "Tacuba"],
        "Ahuachapán Sur": ["Guaymango", "Jujutla", "San Francisco Menendez", "San Pedro Puxtla"]
    },
    "San Salvador": {
        "San Salvador Norte": ["Aguilares", "El Paisnal", "Guazapa"],
        "San Salvador Oeste": ["Apopa", "Nejapa"],
        "San Salvador Este": ["Ilopango", "San Martín", "Soyapango", "Tonacatepeque"],
        "San Salvador Centro": ["Ayutuxtepeque", "Mejicanos", "San Salvador", "Cuscatancingo", "Ciudad Delgado"],
        "San Salvador Sur": ["Panchimalco", "Rosario de Mora", "San Marcos", "Santo Tomás", "Santiago Texacuangos"]
    },
    "La Libertad": {
        "La Libertad Norte": ["Quezaltepeque", "San Matías", "San Pablo Tacachico"],
        "La Libertad Centro": ["San Juan Opico", "Ciudad Arce"],
        "La Libertad Oeste": ["Colón", "Jayaque", "Sacacoyo", "Tepecoyo", "Talnique"],
        "La Libertad Este": ["Antiguo Cuscatlán", "Huizucar", "Nuevo Cuscatlán", "San José Villanueva", "Zaragoza"],
        "La Libertad Costa": ["Chiltiupán", "Jicalapa", "La Libertad", "Tamanique", "Teotepeque"],
        "La Libertad Sur": ["Comasagua", "Santa Tecla"]
    },
    "Chalatenango": {
        "Chalatenango Norte": ["La Palma", "Citalá", "San Ignacio"],
        "Chalatenango Centro": ["Nueva Concepción", "Tejutla", "La Reina", "Agua Caliente", "Dulce Nombre de María", "El Paraíso", "San Francisco Morazán", "San Rafael", "Santa Rita", "San Fernando"],
        "Chalatenango Sur": ["Chalatenango", "Arcatao", "Azacualpa", "Comalapa", "Concepción Quezaltepeque", "El Carrizal", "La Laguna", "Las Vueltas", "Nombre de Jesús", "Nueva Trinidad", "Ojos de Agua", "Potonico", "San Antonio de La Cruz", "San Antonio Los Ranchos", "San Francisco Lempa", "San Isidro Labrador", "San José Cancasque", "San Miguel de Mercedes", "San José Las Flores", "San Luis del Carmen"]
    },
    "Cuscatlán": {
        "Cuscatlán Norte": ["Suchitoto", "San José Guayabal", "Oratorio de Concepción", "San Bartolomé Perulapán", "San Pedro Perulapán"],
        "Cuscatlán Sur": ["Cojutepeque", "San Rafael Cedros", "Candelaria", "Monte San Juan", "El Carmen", "San Cristóbal", "Santa Cruz Michapa", "San Ramón", "El Rosario", "Santa Cruz Analquito", "Tenancingo"]
    },
    "Cabañas": {
        "Cabañas Este": ["Sensuntepeque", "Victoria", "Dolores", "Guacotecti", "San Isidro"],
        "Cabañas Oeste": ["Ilobasco", "Tejutepeque", "Jutiapa", "Cinquera"]
    },
    "La Paz": {
        "La Paz Oeste": ["Cuyultitán", "Olocuilta", "San Juan Talpa", "San Luis Talpa", "San Pedro Masahuat", "Tapalhuaca", "San Francisco Chinameca"],
        "La Paz Centro": ["El Rosario", "Jerusalén", "Mercedes La Ceiba", "Paraíso de Osorio", "San Antonio Masahuat", "San Emigdio", "San Juan Tepezontes", "San Luis La Herradura", "San Miguel Tepezontes", "San Pedro Nonualco", "Santa María Ostuma", "Santiago Nonualco"],
        "La Paz Este": ["San Juan Nonualco", "San Rafael Obrajuelo", "Zacatecoluca"]
    },
    "La Unión": {
        "La Unión Norte": ["Anamorós", "Bolivar", "Concepción de Oriente", "El Sauce", "Lislique", "Nueva Esparta", "Pasaquina", "Polorós", "San José La Fuente", "Santa Rosa de Lima"],
        "La Unión Sur": ["Conchagua", "El Carmen", "Intipucá", "La Unión", "Meanguera del Golfo", "San Alejo", "Yayantique", "Yucuaiquín"]
    },
    "Usulután": {
        "Usulután Norte": ["Santiago de María", "Alegría", "Berlín", "Mercedes Umaña", "Jucuapa", "El Triunfo", "Estanzuelas", "San Buenaventura", "Nueva Granada"],
        "Usulután Este": ["Usulután", "Jucuarán", "San Dionisio", "Concepción Batres", "Santa María", "Ozatlán", "Tecapán", "Santa Elena", "California", "Ereguayquín"],
        "Usulután Oeste": ["Jiquilisco", "Puerto El Triunfo", "San Agustín", "San Francisco Javier"]
    },
    "Sonsonate": {
        "Sonsonate Norte": ["Juayúa", "Nahuizalco", "Salcoatitán", "Santa Catarina Masahuat"],
        "Sonsonate Centro": ["Sonsonate", "Sonzacate", "Nahulingo", "San Antonio del Monte", "Santo Domingo de Guzmán"],
        "Sonsonate Este": ["Izalco", "Armenia", "Caluco", "San Julián", "Cuisnahuat", "Santa Isabel Ishuatán"],
        "Sonsonate Oeste": ["Acajutla"]
    },
    "Santa Ana": {
        "Santa Ana Norte": ["Masahuat", "Metapán", "Santa Rosa Guachipilín", "Texistepeque"],
        "Santa Ana Centro": ["Santa Ana"],
        "Santa Ana Este": ["Coatepeque", "El Congo"],
        "Santa Ana Oeste": ["Candelaria de la Frontera", "Chalchuapa", "El Porvenir", "San Antonio Pajonal", "San Sebastián Salitrillo", "Santiago de La Frontera"]
    },
    "San Vicente": {
        "San Vicente Norte": ["Apastepeque", "Santa Clara", "San Ildefonso", "San Esteban Catarina", "San Sebastián", "San Lorenzo", "Santo Domingo"],
        "San Vicente Sur": ["San Vicente", "Guadalupe", "Verapaz", "Tepetitán", "Tecoluca", "San Cayetano Istepeque"]
    },
    "San Miguel": {
        "San Miguel Norte": ["Ciudad Barrios", "Sesori", "Nuevo Edén de San Juan", "San Gerardo", "San Luis de La Reina", "Carolina", "San Antonio del Mosco", "Chapeltique"],
        "San Miguel Centro": ["San Miguel", "Comacarán", "Uluazapa", "Moncagua", "Quelepa", "Chirilagua"],
        "San Miguel Oeste": ["Chinameca", "Nueva Guadalupe", "Lolotique", "San Jorge", "San Rafael Oriente", "El Tránsito"]
    },
    "Morazán": {
        "Morazán Norte": ["Arambala", "Cacaopera", "Corinto", "El Rosario", "Joateca", "Jocoaitique", "Meanguera", "Perquín", "San Fernando", "San Isidro", "Torola"],
        "Morazán Sur": ["Chilanga", "Delicias de Concepción", "El Divisadero", "Gualococti", "Guatajiagua", "Jocoro", "Lolotiquillo", "Osicala", "San Carlos", "San Francisco Gotera", "San Simón", "Sensembra", "Sociedad", "Yamabal", "Yoloaiquín"]
    }
};

// FUNCIÓN PARA INICIALIZAR SELECTS DINÁMICOS
function inicializarSelects() {
    /* ---------------------------------------------------------
       1. MUNICIPIOS según departamento
    --------------------------------------------------------- */
    const departamentoSelect = document.getElementById("departamento");
    if (departamentoSelect) {
        departamentoSelect.addEventListener("change", function () {
            const depto = this.value;
            const municipioSelect = document.getElementById("municipio");
            const distritoSelect = document.getElementById("distrito");

            // Limpiar selects
            municipioSelect.innerHTML = "<option value=''>Seleccione municipio...</option>";
            distritoSelect.innerHTML = "<option value=''>Seleccione un municipio primero...</option>";

            if (estructuraTerritorial[depto]) {
                // Llenar municipios
                Object.keys(estructuraTerritorial[depto]).forEach(municipio => {
                    municipioSelect.innerHTML += `<option value="${municipio}">${municipio}</option>`;
                });
            }
        });
    }

    /* ---------------------------------------------------------
       2. DISTRITOS según municipio
    --------------------------------------------------------- */
    const municipioSelect = document.getElementById("municipio");
    if (municipioSelect) {
        municipioSelect.addEventListener("change", function () {
            const depto = document.getElementById("departamento").value;
            const municipio = this.value;
            const distritoSelect = document.getElementById("distrito");

            distritoSelect.innerHTML = "<option value=''>Seleccione distrito...</option>";

            if (estructuraTerritorial[depto] && estructuraTerritorial[depto][municipio]) {
                estructuraTerritorial[depto][municipio].forEach(distrito => {
                    distritoSelect.innerHTML += `<option value="${distrito}">${distrito}</option>`;
                });
            }
        });
    }

    /* ---------------------------------------------------------
       3. Materias según tipo de tribunal
    --------------------------------------------------------- */
    const materiasPorTipo = {
        "Sala de lo Constitucional": ["Constitucional"],
        "Sala de lo Civil": ["Civil"],
        "Sala de lo Penal": ["Penal"],
        "Sala de lo Contencioso Administrativo": ["Contencioso Administrativo"],

        "Cámara Civil": ["Civil"],
        "Cámara Penal": ["Penal"],
        "Cámara de Familia": ["Familia"],
        "Cámara de lo Laboral": ["Laboral"],
        "Cámara de lo Contencioso Administrativo": ["Contencioso Administrativo"],
        "Cámara de lo Medio Ambiente": ["Medio Ambiente"],
        "Cámara Especializada para una Vida Libre de Violencia y Discriminación para las Mujeres": ["Violencia contra la Mujer"],
        "Cámara Especializada de Extinción de Dominio": ["Extinción de Dominio"],
        "Cámara Especializada de Menores": ["Menores"],

        "Juzgado Especializado de Instrucción": ["Penal (Instrucción)"],
        "Tribunal Especializado de Sentencia": ["Penal (Sentencia)"],
        "Juzgado Especializado para una Vida Libre de Violencia y Discriminación para las Mujeres": ["Violencia contra la Mujer"],
        "Tribunal Especializado para una Vida Libre de Violencia y Discriminación para las Mujeres": ["Violencia contra la Mujer"],
        "Juzgado Especializado de Extinción de Dominio": ["Extinción de Dominio"],
        "Tribunal Especializado de Extinción de Dominio": ["Extinción de Dominio"],
        "Juzgado Especializado de Menores": ["Menores"],

        "Juzgado de lo Civil": ["Civil"],
        "Juzgado de lo Mercantil": ["Mercantil"],
        "Juzgado de Familia": ["Familia"],
        "Juzgado de lo Laboral": ["Laboral"],
        "Juzgado de Instrucción": ["Penal"],
        "Juzgado de Sentencia": ["Penal"],
        "Juzgado de Medio Ambiente": ["Medio Ambiente"],
        "Juzgado de Ejecución de la Pena": ["Ejecución de Penal"],
        "Juzgado de Vigilancia Penitenciaria": ["Vigilancia Penitenciaria"],
        "Juzgado de Menores": ["Menores"],

        "Juzgado de Paz": ["Multipropósito"]
    };

    const tipoTribunalSelect = document.getElementById("tipoTribunal");
    if (tipoTribunalSelect) {
        tipoTribunalSelect.addEventListener("change", function () {
            const tipo = this.value;
            const materiaSelect = document.getElementById("materia");

            materiaSelect.innerHTML = "";

            if (materiasPorTipo[tipo]) {
                materiasPorTipo[tipo].forEach(mat => {
                    materiaSelect.innerHTML += `<option>${mat}</option>`;
                });
            } else {
                materiaSelect.innerHTML = `<option>No definido</option>`;
            }
        });
    }
}

function agregarEventListenersABotones() {
    // Botones Editar
    const botonesEditar = document.querySelectorAll('.action-btn-view');
    botonesEditar.forEach(boton => {
        boton.addEventListener('click', function (e) {
            e.preventDefault();
            // Animación de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            console.log('Editar tribunal');
        });
    });

    // Botones Eliminar
    const botonesEliminar = document.querySelectorAll('.action-btn-delete');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', function (e) {
            e.preventDefault();
            // Animación de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            console.log('Eliminar tribunal');
            if (confirm('¿Estás seguro de que quieres eliminar este tribunal?')) {
                // Lógica de eliminación
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

// Función para guardar tribunal
async function guardarTribunal(tribunalData) {
    try {
        const response = await api.post('/tribunales', tribunalData);
        return response.data;
    } catch (error) {
        console.error('Error al guardar tribunal:', error);
        throw error;
    }
}

// Event listener para el botón guardar
document.querySelector('.btn-save-tribu').addEventListener('click', async function () {
    const tribunalData = {
        tribunal: document.querySelector('input[type="text"]').value,
        direccion: document.getElementById('direccion').value,
        id_tipo_tribunal: obtenerIdTipoTribunal(document.getElementById('tipoTribunal').value),
        id_numeracion_tribunal: obtenerIdNumeracion(document.getElementById('numeracion').value),
        id_distrito: obtenerIdDistrito(document.getElementById('distrito').value),
        estado: document.getElementById('estado').value
    };

    // Validar que todos los campos requeridos estén llenos
    if (!tribunalData.tribunal || !tribunalData.direccion || !tribunalData.id_tipo_tribunal ||
        !tribunalData.id_distrito) {
        alert('Por favor complete todos los campos requeridos');
        return;
    }

    try {
        await guardarTribunal(tribunalData);
        alert('Tribunal creado exitosamente');
        // Cerrar modal y recargar tabla
        document.getElementById('userFormModal').classList.add('hidden');
        cargarTablaPorEstado('todo');

        // Limpiar formulario
        document.querySelector('input[type="text"]').value = '';
        document.getElementById('direccion').value = '';

    } catch (error) {
        console.error('Error completo:', error);
        alert('Error al crear tribunal: ' + (error.response?.data?.message || error.message));
    }
});

// Variables globales para almacenar datos
let tiposTribunal = [];
let numeracionesTribunal = [];
let distritosData = [];

// Función mejorada para cargar datos de selects
async function cargarDatosSelects() {
    try {
        // Cargar tipos de tribunal
        const responseTipos = await api.get('/tipos-tribunal');
        tiposTribunal = responseTipos.data.data || responseTipos.data;

        // Cargar numeraciones
        const responseNumeraciones = await api.get('/numeraciones-tribunal');
        numeracionesTribunal = responseNumeraciones.data.data || responseNumeraciones.data;

        // Cargar distritos con relaciones
        const responseDistritos = await api.get('/distritos?with=municipio.departamento');
        distritosData = responseDistritos.data.data || responseDistritos.data;

        console.log('Datos cargados:', { tiposTribunal, numeracionesTribunal, distritosData });
    } catch (error) {
        console.error('Error al cargar datos de selects:', error);
    }
}

// Función para obtener ID de tipo tribunal
function obtenerIdTipoTribunal(nombreTipo) {
    const tipo = tiposTribunal.find(t => t.tipo_tribunal === nombreTipo);
    return tipo ? tipo.id_tipo_tribunal : null;
}

// Función para obtener ID de numeración
function obtenerIdNumeracion(nombreNumeracion) {
    if (!nombreNumeracion || nombreNumeracion === "Sin numeración") return null;
    const numeracion = numeracionesTribunal.find(n => n.numeracion_tribunal === nombreNumeracion);
    return numeracion ? numeracion.id_numeracion_tribunal : null;
}

// Función para obtener ID de distrito
function obtenerIdDistrito(nombreDistrito) {
    const distrito = distritosData.find(d => d.distrito === nombreDistrito);
    return distrito ? distrito.id_distrito : null;
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

// Función para guardar tribunal
async function guardarTribunal(tribunalData) {
    try {
        console.log('Enviando datos:', tribunalData);
        const response = await api.post('/tribunales', tribunalData);
        return response.data;
    } catch (error) {
        console.error('Error al guardar tribunal:', error);
        if (error.response) {
            console.error('Respuesta del error:', error.response.data);
        }
        throw error;
    }
}

// Función para cargar los selects con datos reales del backend
async function cargarSelectsConDatosReales() {
    try {
        // Cargar tipos de tribunal
        const responseTipos = await api.get('/tipos-tribunal');
        const tiposTribunal = responseTipos.data.data || responseTipos.data;
        
        const tipoSelect = document.getElementById('tipoTribunal');
        tipoSelect.innerHTML = '<option value="">Seleccione un tipo...</option>';
        tiposTribunal.forEach(tipo => {
            tipoSelect.innerHTML += `<option value="${tipo.id_tipo_tribunal}">${tipo.tipo_tribunal}</option>`;
        });

        // Cargar numeraciones
        const responseNumeraciones = await api.get('/numeraciones-tribunal');
        const numeraciones = responseNumeraciones.data.data || responseNumeraciones.data;
        
        const numeracionSelect = document.getElementById('numeracion');
        numeracionSelect.innerHTML = '<option value="">Seleccione numeración...</option>';
        numeraciones.forEach(numeracion => {
            numeracionSelect.innerHTML += `<option value="${numeracion.id_numeracion_tribunal}">${numeracion.numeracion_tribunal}</option>`;
        });

        // Cargar departamentos
        const responseDepartamentos = await api.get('/departamentos');
        const departamentos = responseDepartamentos.data.data || responseDepartamentos.data;
        
        const departamentoSelect = document.getElementById('departamento');
        departamentoSelect.innerHTML = '<option value="">Seleccione un departamento...</option>';
        departamentos.forEach(depto => {
            departamentoSelect.innerHTML += `<option value="${depto.id_departamento}">${depto.departamento}</option>`;
        });

        console.log('Selects cargados correctamente');

    } catch (error) {
        console.error('Error al cargar datos para selects:', error);
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

// Event listener para el botón guardar
document.addEventListener('DOMContentLoaded', function() {
    const btnGuardar = document.querySelector('.btn-save-tribu');
    
    if (btnGuardar) {
        btnGuardar.addEventListener('click', async function() {
            // Recoger datos del formulario
            const tribunalData = {
                tribunal: document.getElementById('nombreTribunal').value,
                direccion: document.getElementById('direccion').value,
                id_tipo_tribunal: document.getElementById('tipoTribunal').value,
                id_numeracion_tribunal: document.getElementById('numeracion').value,
                id_distrito: document.getElementById('distrito').value,
                estado: document.getElementById('estado').value
            };

            // Validar campos requeridos
            if (!tribunalData.tribunal || !tribunalData.direccion || 
                !tribunalData.id_tipo_tribunal || !tribunalData.id_numeracion_tribunal || 
                !tribunalData.id_distrito) {
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

    // Event listeners para selects dinámicos
    const departamentoSelect = document.getElementById('departamento');
    if (departamentoSelect) {
        departamentoSelect.addEventListener('change', function() {
            const idDepartamento = this.value;
            if (idDepartamento) {
                cargarMunicipiosPorDepartamento(idDepartamento);
            } else {
                document.getElementById('municipio').innerHTML = '<option value="">Seleccione un departamento primero...</option>';
                document.getElementById('distrito').innerHTML = '<option value="">Seleccione un municipio primero...</option>';
            }
        });
    }

    const municipioSelect = document.getElementById('municipio');
    if (municipioSelect) {
        municipioSelect.addEventListener('change', function() {
            const idMunicipio = this.value;
            if (idMunicipio) {
                cargarDistritosPorMunicipio(idMunicipio);
            } else {
                document.getElementById('distrito').innerHTML = '<option value="">Seleccione un municipio primero...</option>';
            }
        });
    }
});

