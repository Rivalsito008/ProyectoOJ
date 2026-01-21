import { inicializarObserverPadding } from './utils/ManageToastSW2.js';
import { eliminarPaddingSweetAlert } from './utils/ManageToastSW2.js';
import { mostrarExito } from './utils/ManageToastSW2.js';
import { mostrarExitoToast } from './utils/ManageToastSW2.js';
import { mostrarError } from './utils/ManageToastSW2.js';
// ============================================
// CONFIGURACIÓN Y CONSTANTES
// ============================================

// ======================================
// PROTECCIÓN DE RUTA - SOLO ADMINISTRADORES
// ======================================
(async function () {
    console.log('Verificando permisos de administrador...');
    const hasPermission = await auth.requireRole('admin', 'inicio.php');
    if (!hasPermission) {
        console.error('Acceso denegado: No tienes permisos de administrador');
        return;
    }
    console.log('✓ Acceso autorizado: Usuario Administrador');
})();

const api = axios;

// Aplicar tema y preferencias
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

// ============================================
// VARIABLES GLOBALES
// ============================================

const steps = document.querySelectorAll('.step');
const progressBar = document.getElementById('progressBar');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let currentStep = 0;
const totalSteps = steps.length;

let catalogos = {};
let preguntas = [];
let preguntasAPI = [];
let geografiaData = {};
let tribunalesData = [];
let usuarioActual = null;

const preguntasPorPagina = 8;
let paginaActual = 0;

// ============================================
// ALMACENAMIENTO TEMPORAL DE DATOS - NUEVO
// ============================================

let datosTemporales = {
    relacionHechos: '', // Se captura en Paso 3, se envía en Paso 4
    denunciante: null,
    victimas: [],
    agresores: [],
    respuestas: []
};

// ============================================
// CÓDIGOS TELEFÓNICOS
// ============================================

const codigosTelefonicos = [
    { codigo: '+1', pais: 'Estados Unidos/Canadá' },
    { codigo: '+52', pais: 'México' },
    { codigo: '+503', pais: 'El Salvador' },
    { codigo: '+502', pais: 'Guatemala' },
    { codigo: '+504', pais: 'Honduras' },
    { codigo: '+505', pais: 'Nicaragua' },
    { codigo: '+506', pais: 'Costa Rica' },
    { codigo: '+507', pais: 'Panamá' },
    { codigo: '+51', pais: 'Perú' },
    { codigo: '+54', pais: 'Argentina' },
    { codigo: '+55', pais: 'Brasil' },
    { codigo: '+56', pais: 'Chile' },
    { codigo: '+57', pais: 'Colombia' },
    { codigo: '+58', pais: 'Venezuela' },
    { codigo: '+591', pais: 'Bolivia' },
    { codigo: '+593', pais: 'Ecuador' },
    { codigo: '+595', pais: 'Paraguay' },
    { codigo: '+598', pais: 'Uruguay' },
    { codigo: '+34', pais: 'España' },
    { codigo: '+44', pais: 'Reino Unido' },
    { codigo: '+33', pais: 'Francia' },
    { codigo: '+39', pais: 'Italia' },
    { codigo: '+49', pais: 'Alemania' }
];

// ============================================
// FUNCIONES HELPER PARA CONVERSIÓN ENUM - NUEVO
// ============================================

function convertirAEnum(valor) {
    if (!valor) return 'NO';

    const valorLower = valor.toLowerCase();
    if (valorLower === 'si' || valorLower === 'sí') return 'SI';
    if (valorLower === 'no') return 'NO';
    if (valorLower === 'no_sabe' || valorLower === 'no sabe') return 'NO SABE';

    return 'NO'; // Default
}

function convertirAEnumNoSeSabe(valor) {
    if (!valor) return 'NO';

    const valorLower = valor.toLowerCase();
    if (valorLower === 'si' || valorLower === 'sí') return 'SI';
    if (valorLower === 'no') return 'NO';
    if (valorLower === 'no se sabe' || valorLower === 'no_se_sabe') return 'NO SE SABE';

    return 'NO'; // Default
}

function obtenerTextoRelacionHechos() {
    // Intentar obtener de CKEditor primero
    if (window.editor && typeof window.editor.getData === 'function') {
        try {
            const data = window.editor.getData();
            if (data) {
                console.log('Texto obtenido de CKEditor');
                return data;
            }
        } catch (error) {
            console.warn('Error al obtener datos de CKEditor:', error);
        }
    }

    // Fallback a textarea
    const textarea = document.getElementById('relacionHechos');
    if (textarea && textarea.value) {
        console.log('Texto obtenido de textarea');
        return textarea.value;
    }

    console.warn('No se pudo obtener texto de relación de hechos');
    return '';
}

// ============================================
// FUNCIONES DE CARGA DE DATOS
// ============================================

async function cargarPreguntas() {
    try {
        console.log('Cargando preguntas...');
        const response = await api.get('/preguntas/con-relaciones');

        if (response.data && response.data.data) {
            preguntas = response.data.data;
            preguntasAPI = response.data.data;
            console.log('✓ Preguntas cargadas:', preguntas.length);
            renderizarPreguntasEnFormulario();
        }
    } catch (error) {
        console.error('Error al cargar preguntas:', error);
    }
}

function renderizarPreguntasEnFormulario() {
    const container = document.getElementById('preguntasForm');
    if (!container) {
        console.warn('Contenedor preguntasForm no encontrado');
        return;
    }

    container.innerHTML = '';

    const inicio = paginaActual * preguntasPorPagina;
    const fin = Math.min(inicio + preguntasPorPagina, preguntas.length);
    const preguntasPagina = preguntas.slice(inicio, fin);

    if (preguntasPagina.length === 0) {
        container.innerHTML = '<p class="text-gray-600 italic">No hay preguntas para mostrar.</p>';
        return;
    }

    const contenedorPrincipal = document.createElement('div');
    contenedorPrincipal.className = 'rounded-lg p-4 bg-gray-50';

    const preguntasPorAmbito = {};
    preguntasPagina.forEach(pregunta => {
        const nombreAmbito = pregunta.ambito?.ambito || 'Sin ámbito';
        if (!preguntasPorAmbito[nombreAmbito]) {
            preguntasPorAmbito[nombreAmbito] = [];
        }
        preguntasPorAmbito[nombreAmbito].push(pregunta);
    });

    Object.keys(preguntasPorAmbito).forEach(nombreAmbito => {
        const ambitoDiv = document.createElement('div');
        ambitoDiv.className = 'mb-4 rounded-lg p-4 bg-white shadow-sm hover:shadow-md hover:bg-blue-50 transition-all duration-200';

        const titulo = document.createElement('h3');
        titulo.className = 'text-base font-semibold mb-3 text-gray-800 pb-2 border-b border-gray-100';
        titulo.textContent = nombreAmbito;
        ambitoDiv.appendChild(titulo);

        const preguntasDiv = document.createElement('div');
        preguntasDiv.className = 'space-y-3';

        preguntasPorAmbito[nombreAmbito].forEach((pregunta, indexRelativo) => {
            const preguntaDiv = document.createElement('div');
            preguntaDiv.className = 'p-3 rounded-md hover:bg-gray-50 transition-colors duration-150';

            const numeroPregunta = inicio + preguntasPagina.indexOf(pregunta) + 1;

            preguntaDiv.innerHTML = `
                <p class="text-gray-700 mb-2 font-medium text-sm">${numeroPregunta}. ${pregunta.pregunta}</p>
                <div class="flex items-center space-x-6">
                    <label class="flex items-center space-x-2 cursor-pointer">
                        <div class="relative">
                            <input type="radio" name="pregunta_${pregunta.id_pregunta}" value="Si" class="sr-only">
                            <div class="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center radio-visual">
                                <div class="w-2 h-2 rounded-full bg-transparent"></div>
                            </div>
                        </div>
                        <span class="text-gray-600 text-sm">Sí</span>
                    </label>
                    <label class="flex items-center space-x-2 cursor-pointer">
                        <div class="relative">
                            <input type="radio" name="pregunta_${pregunta.id_pregunta}" value="No" class="sr-only">
                            <div class="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center radio-visual">
                                <div class="w-2 h-2 rounded-full bg-transparent"></div>
                            </div>
                        </div>
                        <span class="text-gray-600 text-sm">No</span>
                    </label>
                </div>
            `;

            const radioSi = preguntaDiv.querySelector('input[value="Si"]');
            const radioNo = preguntaDiv.querySelector('input[value="No"]');
            const visualSi = preguntaDiv.querySelectorAll('.radio-visual')[0];
            const visualNo = preguntaDiv.querySelectorAll('.radio-visual')[1];

            function actualizarVisual() {
                visualSi.style.borderColor = '#9ca3af';
                visualSi.querySelector('div').style.backgroundColor = 'transparent';
                visualNo.style.borderColor = '#9ca3af';
                visualNo.querySelector('div').style.backgroundColor = 'transparent';

                if (radioSi.checked) {
                    visualSi.style.borderColor = '#2563eb';
                    visualSi.querySelector('div').style.backgroundColor = '#2563eb';
                } else if (radioNo.checked) {
                    visualNo.style.borderColor = '#2563eb';
                    visualNo.querySelector('div').style.backgroundColor = '#2563eb';
                }
            }

            radioSi.addEventListener('change', actualizarVisual);
            radioNo.addEventListener('change', actualizarVisual);

            preguntaDiv.querySelectorAll('label').forEach(label => {
                label.addEventListener('click', function (e) {
                    if (e.target.tagName !== 'INPUT') {
                        const radio = this.querySelector('input');
                        if (radio) {
                            radio.checked = true;
                            radio.dispatchEvent(new Event('change'));
                        }
                    }
                });
            });

            actualizarVisual();
            preguntasDiv.appendChild(preguntaDiv);
        });

        ambitoDiv.appendChild(preguntasDiv);
        contenedorPrincipal.appendChild(ambitoDiv);
    });

    container.appendChild(contenedorPrincipal);
    agregarControlesPaginacion(container, inicio, fin);

    console.log('✓ Preguntas renderizadas (página', paginaActual + 1, ')');

    // Restaurar respuestas después de renderizar
    setTimeout(() => {
        restaurarRespuestas();
    }, 100);
}

function agregarControlesPaginacion(container, inicio, fin) {
    const totalPaginas = Math.ceil(preguntas.length / preguntasPorPagina);

    const paginacionDiv = document.createElement('div');
    paginacionDiv.className = 'mt-6 pt-4 border-t border-gray-200';

    const controlesDiv = document.createElement('div');
    controlesDiv.className = 'flex items-center justify-between';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'text-xs text-gray-500';
    infoDiv.innerHTML = `
        <span class="font-medium text-gray-600">Pág. ${paginaActual + 1}/${totalPaginas}</span>
        <span class="mx-2">•</span>
        <span>Preguntas ${inicio + 1}-${fin} de ${preguntas.length}</span>
    `;

    const navegacionDiv = document.createElement('div');
    navegacionDiv.className = 'flex items-center space-x-2';

    navegacionDiv.innerHTML = `
        <button id="paginaAnterior" 
                class="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 flex items-center">
            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Anterior
        </button>
        
        <button id="paginaSiguiente" 
                class="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 flex items-center">
            Siguiente
            <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </button>
    `;

    controlesDiv.appendChild(infoDiv);
    controlesDiv.appendChild(navegacionDiv);
    paginacionDiv.appendChild(controlesDiv);
    container.appendChild(paginacionDiv);

    const btnAnterior = document.getElementById('paginaAnterior');
    const btnSiguiente = document.getElementById('paginaSiguiente');

    if (btnAnterior && btnSiguiente) {
        btnAnterior.disabled = paginaActual === 0;
        btnSiguiente.disabled = paginaActual >= totalPaginas - 1;

        btnAnterior.addEventListener('click', () => {
            if (paginaActual > 0) {
                guardarRespuestasActuales();
                paginaActual--;
                renderizarPreguntasEnFormulario();
            }
        });

        btnSiguiente.addEventListener('click', () => {
            if (paginaActual < totalPaginas - 1) {
                guardarRespuestasActuales();
                paginaActual++;
                renderizarPreguntasEnFormulario();
            }
        });
    }

    restaurarRespuestas();
}

function restablecerPaginacionPreguntas() {
    paginaActual = 0;
    renderizarPreguntasEnFormulario();
}

async function cargarCatalogos() {
    try {
        mostrarLoading('Cargando catálogos...');

        const response = await api.get('/catalogos/todos');

        if (response.data.success) {
            catalogos = response.data.data;
            console.log('✓ Catálogos cargados:', Object.keys(catalogos));

            console.log('Verificando catálogos:');
            console.log('- Profesiones:', catalogos.profesiones?.length || 0);
            console.log('- Ocupaciones:', catalogos.ocupaciones?.length || 0);
            console.log('- Tipos contacto:', catalogos.tipos_contacto?.length || 0);

            await cargarGeografia();
            poblarTodosLosSelects();
            poblarEntornosViolencia();
            poblarTiposViolencia();

            ocultarLoading();
        }
    } catch (error) {
        console.error('Error al cargar catálogos:', error);
        mostrarError('Error al cargar los catálogos.');
        ocultarLoading();
    }
}

function poblarEntornosViolencia() {
    const container = document.getElementById('entornoViolenciaContainer');
    if (!container) {
        console.warn('Contenedor entornoViolenciaContainer no encontrado');
        return;
    }

    if (!catalogos.entornos_violencia) {
        console.warn('No hay datos de entornos_violencia');
        return;
    }

    container.innerHTML = '';

    catalogos.entornos_violencia.forEach(entorno => {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'flex items-center';

        const label = document.createElement('label');
        label.className = 'flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'entornoViolencia';
        checkbox.value = entorno.id;
        checkbox.className = 'text-blue-600 cursor-pointer';

        const span = document.createElement('span');
        span.textContent = entorno.nombre;
        span.className = 'text-sm text-gray-700';

        label.appendChild(checkbox);
        label.appendChild(span);
        itemContainer.appendChild(label);
        container.appendChild(itemContainer);

        if (entorno.nombre && entorno.nombre.toUpperCase().includes('OTRO')) {
            // Crear un contenedor separado para el input que ocupe todo el ancho
            const inputContainer = document.createElement('div');
            inputContainer.className = 'col-span-2 md:col-span-3 lg:col-span-4'; // Ocupa todas las columnas
            inputContainer.style.display = 'none';

            const inputOtro = document.createElement('input');
            inputOtro.type = 'text';
            inputOtro.id = 'entornoOtraTexto';
            inputOtro.placeholder = 'Especifique el otro entorno de violencia';
            inputOtro.className = 'border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all';

            inputContainer.appendChild(inputOtro);

            checkbox.addEventListener('change', function () {
                inputContainer.style.display = this.checked ? 'block' : 'none';
                if (this.checked) {
                    inputOtro.focus();
                }
            });

            container.appendChild(inputContainer);
        }
    });

    console.log('✓ Entornos de violencia poblados desde BD');
}

function poblarTiposViolencia() {
    const container = document.getElementById('tipoViolenciaContainer');
    if (!container) {
        console.warn('Contenedor tipoViolenciaContainer no encontrado');
        return;
    }

    if (!catalogos.tipos_violencia) {
        console.warn('No hay datos de tipos_violencia');
        return;
    }

    container.innerHTML = '';

    catalogos.tipos_violencia.forEach(tipo => {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'flex items-center';

        const label = document.createElement('label');
        label.className = 'flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'tipoViolencia';
        checkbox.value = tipo.id;
        checkbox.className = 'text-blue-600 cursor-pointer';

        const span = document.createElement('span');
        span.textContent = tipo.nombre;
        span.className = 'text-sm text-gray-700';

        label.appendChild(checkbox);
        label.appendChild(span);
        itemContainer.appendChild(label);
        container.appendChild(itemContainer);

        if (tipo.nombre && tipo.nombre.toUpperCase().includes('OTRA')) {
            // Crear un contenedor separado para el input que ocupe todo el ancho
            const inputContainer = document.createElement('div');
            inputContainer.className = 'col-span-2 md:col-span-3 lg:col-span-4'; // Ocupa todas las columnas
            inputContainer.style.display = 'none';

            const inputOtro = document.createElement('input');
            inputOtro.type = 'text';
            inputOtro.id = 'tipoOtraTexto';
            inputOtro.placeholder = 'Especifique el otro tipo de violencia';
            inputOtro.className = 'border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all';

            inputContainer.appendChild(inputOtro);

            checkbox.addEventListener('change', function () {
                inputContainer.style.display = this.checked ? 'block' : 'none';
                if (this.checked) {
                    inputOtro.focus();
                }
            });

            container.appendChild(inputContainer);
        }
    });

    console.log('✓ Tipos de violencia poblados desde BD');
}

async function cargarGeografia() {
    try {
        console.log('Cargando departamentos...');
        const response = await api.get('/departamentos');

        if (response.data) {
            geografiaData.departamentos = response.data.data || response.data;
            console.log('✓ Departamentos cargados:', geografiaData.departamentos.length);
            poblarDepartamentos();
        }
    } catch (error) {
        console.error('Error al cargar geografía:', error);
    }
}

async function cargarUsuarioActual() {
    usuarioActual = {
        id_usuario: 1,
        nombres: 'Admin',
        apellidos: 'Sistema'
    };
}

async function cargarTribunales() {
    try {
        const response = await api.get('/tribunales');

        if (response.data) {
            const todosTribunales = response.data.data || response.data;
            tribunalesData = todosTribunales.filter(t => t.estado === 'Activo');
            console.log('✓ Tribunales cargados:', tribunalesData.length);
        }
    } catch (error) {
        console.error('Error al cargar tribunales:', error);
    }
}

// ============================================
// POBLACIÓN DE SELECTS
// ============================================

function poblarTodosLosSelects() {
    console.log('Poblando selects...');

    ['denunciante', 'victima', 'agresor'].forEach(prefix => {
        poblarSelect(`${prefix}TipoDocumento`, catalogos.tipos_documento, 'id', 'nombre');
        poblarSelect(`${prefix}NivelEducativo`, catalogos.niveles_educativos, 'id', 'nombre');
        poblarSelect(`${prefix}EstadoFamiliar`, catalogos.estados_familiares, 'id', 'nombre');
        poblarSelect(`${prefix}Nacionalidad`, catalogos.nacionalidades, 'id', 'nombre');
        poblarSelect(`${prefix}Sexo`, catalogos.sexos, 'id', 'nombre');
        poblarSelect(`${prefix}Profesion`, catalogos.profesiones, 'id', 'nombre');
        poblarSelect(`${prefix}Ocupacion`, catalogos.ocupaciones, 'id', 'nombre');
    });

    poblarSelect('victimaTipoIngresos', catalogos.tipos_ingreso, 'id', 'nombre');
    poblarSelect('victimaDependenciaEconomica', catalogos.dependencias_economicas, 'id', 'nombre');
    poblarSelect('victimaRelacionDependencia', catalogos.tipos_relacion, 'id', 'nombre');
    poblarSelect('victimaTipoLesion', catalogos.tipos_lesion, 'id', 'nombre');
    poblarSelect('victimaNivelLesion', catalogos.niveles_lesion, 'id', 'nombre');
    poblarSelect('victimaRangoIngresos', catalogos.rangos_ingresos, 'id', 'nombre');
    poblarSelect('victimaFrecuenciaIngreso', catalogos.frecuencias_ingreso, 'id', 'nombre');

    poblarSelect('agresorTipoArmas', catalogos.tipos_arma, 'id', 'nombre');
    poblarSelect('agresorTipoFormacion', catalogos.tipos_formacion, 'id', 'nombre');
    poblarSelect('agresorFrecuenciaAlcohol', catalogos.frecuencias_consumo, 'id', 'nombre');
    poblarSelect('agresorFrecuenciaDrogas', catalogos.frecuencias_consumo, 'id', 'nombre');

    poblarSelect('lugarHecho', catalogos.lugares_hecho, 'id', 'nombre');
    poblarSelect('frecuenciaAgresiones', catalogos.frecuencias_agresion, 'id', 'nombre');

    console.log('✓ Selects poblados');
}

function poblarSelect(selectId, data, valueField, textField) {
    const select = document.getElementById(selectId);
    if (!select) {
        console.warn(`Select ${selectId} no encontrado en DOM`);
        return;
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
        console.warn(`No hay datos para poblar ${selectId}`);
        select.innerHTML = `<option value="">No hay datos disponibles</option>`;
        return;
    }

    const defaultOption = select.querySelector('option[value=""]');
    select.innerHTML = '';

    if (defaultOption) {
        select.appendChild(defaultOption);
    } else {
        const optionDefault = document.createElement('option');
        optionDefault.value = "";
        optionDefault.textContent = "Seleccione...";
        select.appendChild(optionDefault);
    }

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item[valueField];
        option.textContent = item[textField];
        select.appendChild(option);
    });

    console.log(`✓ Select ${selectId} poblado con ${data.length} opciones`);
}

// ============================================
// FUNCIONES DE GEOGRAFÍA Y TELÉFONOS
// ============================================

function poblarDepartamentos() {
    if (!geografiaData.departamentos) return;

    const departamentoSelects = [
        'denuncianteDeptoNac', 'denuncianteDeptoRes', 'denuncianteDeptoTrabajo',
        'victimaDeptoNac', 'victimaDeptoRes', 'victimaDeptoTrabajo',
        'agresorDeptoNac', 'agresorDeptoRes', 'agresorDeptoTrabajo',
        'deptoHecho'
    ];

    departamentoSelects.forEach(selectId => {
        poblarSelect(selectId, geografiaData.departamentos, 'id_departamento', 'departamento');
    });

    configurarCascadaGeografica();
}

function configurarCascadaGeografica() {
    const configuraciones = [
        { depto: 'denuncianteDeptoNac', muni: 'denuncianteMuniNac', dist: 'denuncianteDistNac' },
        { depto: 'denuncianteDeptoRes', muni: 'denuncianteMuniRes', dist: 'denuncianteDistRes' },
        { depto: 'denuncianteDeptoTrabajo', muni: 'denuncianteMunicipioTrabajo', dist: 'denuncianteDistritoTrabajo' },
        { depto: 'victimaDeptoNac', muni: 'victimaMuniNac', dist: 'victimaDistNac' },
        { depto: 'victimaDeptoRes', muni: 'victimaMuniRes', dist: 'victimaDistRes' },
        { depto: 'victimaDeptoTrabajo', muni: 'victimaMunicipioTrabajo', dist: 'victimaDistritoTrabajo' },
        { depto: 'agresorDeptoNac', muni: 'agresorMuniNac', dist: 'agresorDistNac' },
        { depto: 'agresorDeptoRes', muni: 'agresorMuniRes', dist: 'agresorDistRes' },
        { depto: 'agresorDeptoTrabajo', muni: 'agresorMunicipioTrabajo', dist: 'agresorDistritoTrabajo' },
        { depto: 'deptoHecho', muni: 'municipioHecho', dist: 'distritoHecho' }
    ];

    configuraciones.forEach(config => {
        const deptoSelect = document.getElementById(config.depto);
        const muniSelect = document.getElementById(config.muni);
        const distSelect = document.getElementById(config.dist);

        if (!deptoSelect || !muniSelect || !distSelect) return;

        deptoSelect.addEventListener('change', async function () {
            const idDepartamento = this.value;

            if (!idDepartamento) {
                muniSelect.innerHTML = '<option value="">Seleccione municipio</option>';
                distSelect.innerHTML = '<option value="">Seleccione distrito</option>';
                return;
            }

            try {
                const response = await api.get(`/municipios/departamento/${idDepartamento}`);
                if (response.data) {
                    const municipios = response.data.data || response.data;
                    poblarSelect(config.muni, municipios, 'id_municipio', 'municipio');
                    console.log(`✓ Municipios cargados para ${idDepartamento}: ${municipios.length}`);
                }
            } catch (error) {
                console.error('Error al cargar municipios:', error);
            }
        });

        muniSelect.addEventListener('change', async function () {
            const idMunicipio = this.value;

            if (!idMunicipio) {
                distSelect.innerHTML = '<option value="">Seleccione distrito</option>';
                return;
            }

            try {
                const response = await api.get(`/distritos/municipio/${idMunicipio}`);
                if (response.data) {
                    const distritos = response.data.data || response.data;
                    poblarSelect(config.dist, distritos, 'id_distrito', 'distrito');
                    console.log(`✓ Distritos cargados para ${idMunicipio}: ${distritos.length}`);
                }
            } catch (error) {
                console.error('Error al cargar distritos:', error);
            }
        });
    });
}

// ============================================
// CALCULADORES DE EDAD
// ============================================

function inicializarCalculadoresEdad() {
    setupCalculadorEdad('denunciante');
    setupCalculadorEdad('victima');
    setupCalculadorEdad('agresor');
}

function setupCalculadorEdad(prefijo) {
    const fechaInput = document.getElementById(`${prefijo}FechaNacimiento`);
    const edadInput = document.getElementById(`${prefijo}Edad`);
    const btnCalcular = document.getElementById(`${prefijo}CalcularEdad`);

    if (!fechaInput || !edadInput) return;

    fechaInput.addEventListener('change', function () {
        calcularEdad(this.value, edadInput);
    });

    if (btnCalcular) {
        btnCalcular.addEventListener('click', function () {
            if (fechaInput.value) {
                calcularEdad(fechaInput.value, edadInput);
            }
        });
    }
}

function calcularEdad(fechaNacimiento, edadInput) {
    if (!fechaNacimiento) return;

    const fecha = new Date(fechaNacimiento);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
        edad--;
    }

    edadInput.value = edad;
}

// ============================================
// TELÉFONOS DINÁMICOS
// ============================================

function inicializarTelefonos() {
    setupTelefonosDinamicos('denunciante');
    setupTelefonosDinamicos('victima');
    setupTelefonosDinamicos('agresor');

    setTimeout(() => {
        poblarPrimerTelefono('denunciante');
        poblarPrimerTelefono('victima');
        poblarPrimerTelefono('agresor');
    }, 500);
}

function poblarPrimerTelefono(prefijo) {
    const lista = document.getElementById(`${prefijo}TelefonosLista`);
    if (!lista) {
        console.warn(`Lista de teléfonos de ${prefijo} no encontrada`);
        return;
    }

    const primerPhoneCodeSelect = lista.querySelector('.phone-code-select');
    const selectTipoContacto = lista.querySelector('.contact-type-select');

    if (!selectTipoContacto) {
        console.warn(`Select de tipo de contacto de ${prefijo} no encontrado`);
        return;
    }

    if (primerPhoneCodeSelect) {
        poblarCodigosTelefonicos(primerPhoneCodeSelect);
    }

    selectTipoContacto.innerHTML = '<option value="">Seleccione tipo</option>';

    if (catalogos.tipos_contacto && catalogos.tipos_contacto.length > 0) {
        catalogos.tipos_contacto.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.id;
            option.textContent = tipo.nombre;
            selectTipoContacto.appendChild(option);
        });
        console.log(`✓ Primer teléfono de ${prefijo} poblado con ${catalogos.tipos_contacto.length} tipos`);
    } else {
        console.warn(`No hay tipos_contacto en catálogos para ${prefijo}`);
        const opcionesDefault = [
            { value: 1, text: 'Celular Personal' },
            { value: 2, text: 'Celular Trabajo' },
            { value: 3, text: 'Casa' },
            { value: 4, text: 'Oficina' }
        ];

        opcionesDefault.forEach(opcion => {
            const option = document.createElement('option');
            option.value = opcion.value;
            option.textContent = opcion.text;
            selectTipoContacto.appendChild(option);
        });
    }
}

function setupTelefonosDinamicos(prefijo) {
    const btnAgregar = document.getElementById(`${prefijo}AgregarTelefono`);
    const lista = document.getElementById(`${prefijo}TelefonosLista`);

    if (!btnAgregar || !lista) return;

    btnAgregar.addEventListener('click', function () {
        agregarTelefono(prefijo, lista);
    });
}

function agregarTelefono(prefijo, lista) {
    const nuevoTelefono = document.createElement('div');
    nuevoTelefono.className = 'flex gap-2 items-center mb-2';
    nuevoTelefono.innerHTML = `
        <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 phone-code-select">
            <option value="">Código</option>
        </select>
        <input type="tel" placeholder="Número de teléfono"
            class="border border-gray-300 rounded-lg p-3 flex-grow focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
        <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 contact-type-select">
            <option value="">Seleccione tipo</option>
        </select>
        <button type="button" class="text-red-500 hover:text-red-700 font-bold px-3 py-2 eliminar-telefono">✕</button>
    `;

    const phoneCodeSelect = nuevoTelefono.querySelector('.phone-code-select');
    if (phoneCodeSelect) {
        poblarCodigosTelefonicos(phoneCodeSelect);
    }

    const selectTipo = nuevoTelefono.querySelector('.contact-type-select');
    if (catalogos.tipos_contacto && catalogos.tipos_contacto.length > 0) {
        catalogos.tipos_contacto.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.id;
            option.textContent = tipo.nombre;
            selectTipo.appendChild(option);
        });
    } else {
        const opcionesDefault = [
            { value: 1, text: 'Celular Personal' },
            { value: 2, text: 'Celular Trabajo' },
            { value: 3, text: 'Casa' },
            { value: 4, text: 'Oficina' }
        ];

        opcionesDefault.forEach(opcion => {
            const option = document.createElement('option');
            option.value = opcion.value;
            option.textContent = opcion.text;
            selectTipo.appendChild(option);
        });
    }

    const btnEliminar = nuevoTelefono.querySelector('.eliminar-telefono');
    btnEliminar.addEventListener('click', function () {
        if (lista.children.length > 1) {
            nuevoTelefono.remove();
        } else {
            alert('Debe mantener al menos un teléfono');
        }
    });

    lista.appendChild(nuevoTelefono);
}

function poblarCodigosTelefonicos(selectElement) {
    if (!selectElement) return;

    selectElement.innerHTML = '<option value="">Código</option>';

    codigosTelefonicos.forEach(item => {
        const option = document.createElement('option');
        option.value = item.codigo;
        option.textContent = `${item.codigo} (${item.pais})`;
        selectElement.appendChild(option);
    });
}

// ============================================
// HIJOS DE LA VÍCTIMA
// ============================================

function inicializarHijos() {
    const selectCantidad = document.getElementById('victimaCantidadHijos');
    const container = document.getElementById('victimaDatosHijosContainer');
    const lista = document.getElementById('victimaListaHijos');

    if (!selectCantidad || !container || !lista) return;

    selectCantidad.addEventListener('change', function () {
        const cantidad = parseInt(this.value) || 0;
        lista.innerHTML = '';

        if (cantidad > 0) {
            container.classList.remove('hidden');

            for (let i = 1; i <= cantidad; i++) {
                const formularioHijo = crearFormularioHijo(i);
                lista.appendChild(formularioHijo);
            }
        } else {
            container.classList.add('hidden');
        }
    });
}

function crearFormularioHijo(numero) {
    const div = document.createElement('div');
    div.className = 'border border-gray-200 rounded-lg p-4 mb-3 bg-white';
    div.innerHTML = `
        <h5 class="font-medium mb-3">Hijo/a ${numero}</h5>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input type="text" id="hijo${numero}Nombre" placeholder="Nombre completo" 
                   class="border border-gray-300 rounded-lg p-2">
            <select id="hijo${numero}Sexo" class="border border-gray-300 rounded-lg p-2">
                <option value="">Sexo</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
            </select>
            <input type="number" id="hijo${numero}Edad" placeholder="Edad" min="0" 
                   class="border border-gray-300 rounded-lg p-2">
        </div>
    `;
    return div;
}

// ============================================
// CAMPOS CONDICIONALES
// ============================================

function setupConditionalFields() {
    console.log('Configurando campos condicionales...');

    ['denunciante', 'victima', 'agresor'].forEach(prefijo => {
        const selectEstado = document.getElementById(`${prefijo}EstadoFamiliar`);
        const containerConyuge = document.getElementById(`${prefijo}NombreConyugeContainer`);

        if (selectEstado && containerConyuge) {
            selectEstado.addEventListener('change', function () {
                const valor = this.value.toUpperCase();
                if (valor === 'CASADO/A' || valor === 'UNIÓN LIBRE') {
                    containerConyuge.style.display = 'block';
                } else {
                    containerConyuge.style.display = 'none';
                }
            });
        }
    });

    setupCheckboxesTrabajo('denunciante');
    setupCheckboxesTrabajo('victima');
    setupCheckboxesTrabajo('agresor');

    setupCamposIngresoVictima();
    setupCamposLesionesVictima();
    setupCamposHospitalizacionesVictima();
    setupCamposAtencionesMedicasVictima();

    setupCamposConsumoAgresor('Alcohol');
    setupCamposConsumoAgresor('Drogas');
    setupCamposArmasAgresor();
    setupCamposFormacionAgresor();
    setupCamposDiscapacidadAgresor();

    setupGeneradorTexto();

    console.log('✓ Campos condicionales configurados');
}

function setupCheckboxesTrabajo(prefijo) {
    const checkNoTrabajo = document.getElementById(`${prefijo}NoTrabajo`);
    const checkTrabajoEnCasa = document.getElementById(`${prefijo}TrabajoEnCasa`);
    const inputLugarTrabajo = document.getElementById(`${prefijo}LugarTrabajo`);
    const containerDireccion = document.getElementById(`${prefijo}DireccionTrabajoContainer`);

    if (!checkNoTrabajo || !checkTrabajoEnCasa) return;

    checkNoTrabajo.addEventListener('change', function () {
        if (this.checked) {
            checkTrabajoEnCasa.checked = false;
            if (inputLugarTrabajo) inputLugarTrabajo.disabled = true;
            if (containerDireccion) containerDireccion.style.display = 'none';
        } else {
            if (inputLugarTrabajo) inputLugarTrabajo.disabled = false;
            if (containerDireccion && !checkTrabajoEnCasa.checked) {
                containerDireccion.style.display = 'block';
            }
        }
    });

    checkTrabajoEnCasa.addEventListener('change', function () {
        if (this.checked) {
            checkNoTrabajo.checked = false;
            if (inputLugarTrabajo) inputLugarTrabajo.disabled = false;
            if (containerDireccion) containerDireccion.style.display = 'none';
        } else {
            if (containerDireccion && !checkNoTrabajo.checked) {
                containerDireccion.style.display = 'block';
            }
        }
    });
}

function setupCamposIngresoVictima() {
    const radiosSi = document.querySelectorAll('input[name="victimaGeneraIngreso"]');
    const containerSi = document.getElementById('victimaSiIngresoContainer');
    const containerNo = document.getElementById('victimaNoIngresoContainer');

    if (!radiosSi.length) return;

    radiosSi.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'si') {
                if (containerSi) containerSi.classList.remove('hidden');
                if (containerNo) containerNo.classList.add('hidden');
            } else {
                if (containerSi) containerSi.classList.add('hidden');
                if (containerNo) containerNo.classList.remove('hidden');
            }
        });
    });
}

function setupCamposLesionesVictima() {
    const radiosLesiones = document.querySelectorAll('input[name="victimaLesiones"]');
    const containerLesiones = document.getElementById('victimaLesionesContainer');
    const alertaGrave = document.getElementById('victimaAlertaLesionGrave');
    const selectNivel = document.getElementById('victimaNivelLesion');

    if (!radiosLesiones.length) return;

    radiosLesiones.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'si') {
                if (containerLesiones) containerLesiones.classList.remove('hidden');
            } else {
                if (containerLesiones) containerLesiones.classList.add('hidden');
            }
        });
    });

    if (selectNivel && alertaGrave) {
        selectNivel.addEventListener('change', function () {
            if (this.value.toUpperCase() === 'GRAVE') {
                alertaGrave.classList.remove('hidden');
            } else {
                alertaGrave.classList.add('hidden');
            }
        });
    }
}

function setupCamposHospitalizacionesVictima() {
    const radios = document.querySelectorAll('input[name="victimaHospitalizaciones"]');
    const container = document.getElementById('victimaHospitalizacionesContainer');

    if (!radios.length) return;

    radios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'si') {
                if (container) container.classList.remove('hidden');
            } else {
                if (container) container.classList.add('hidden');
            }
        });
    });
}

function setupCamposAtencionesMedicasVictima() {
    const radios = document.querySelectorAll('input[name="victimaAtencionesMedicas"]');
    const container = document.getElementById('victimaAtencionesContainer');

    if (!radios.length) return;

    radios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'si') {
                if (container) container.classList.remove('hidden');
            } else {
                if (container) container.classList.add('hidden');
            }
        });
    });
}

function setupCamposConsumoAgresor(tipo) {
    const select = document.getElementById(`agresorConsumo${tipo}`);
    const container = document.getElementById(`agresorFrecuencia${tipo}Container`);

    if (!select || !container) return;

    select.addEventListener('change', function () {
        if (this.value === 'si') {
            container.classList.remove('hidden');
        } else {
            container.classList.add('hidden');
        }
    });
}

function setupCamposArmasAgresor() {
    const select = document.getElementById('agresorPoseeArmas');
    const container = document.getElementById('agresorTipoArmasContainer');

    if (!select || !container) return;

    select.addEventListener('change', function () {
        if (this.value === 'si') {
            container.classList.remove('hidden');
        } else {
            container.classList.add('hidden');
        }
    });
}

function setupCamposFormacionAgresor() {
    const select = document.getElementById('agresorFormacionEspecial');
    const container = document.getElementById('agresorTipoFormacionContainer');

    if (!select || !container) return;

    select.addEventListener('change', function () {
        if (this.value === 'si') {
            container.classList.remove('hidden');
        } else {
            container.classList.add('hidden');
        }
    });
}

function setupCamposDiscapacidadAgresor() {
    const select = document.getElementById('agresorPoseeDiscapacidad');
    const container = document.getElementById('agresorTipoDiscapacidadContainer');

    if (!select || !container) return;

    select.addEventListener('change', function () {
        if (this.value === 'si') {
            container.classList.remove('hidden');
        } else {
            container.classList.add('hidden');
        }
    });
}

// ============================================
// GENERADOR DE TEXTO AUTOMÁTICO
// ============================================

function setupGeneradorTexto() {
    const btnGenerar = document.getElementById('generarTextoBtn');
    if (!btnGenerar) {
        console.warn('Botón generarTextoBtn no encontrado');
        return;
    }

    btnGenerar.addEventListener('click', function (e) {
        e.preventDefault();
        generarTextoAutomatico();
    });

    console.log('✓ Generador de texto configurado');
}

function generarTextoAutomatico() {
    console.log('Generando texto automático...');

    const nombreDenunciante = document.getElementById('denuncianteNombre')?.value.trim();
    const documento = document.getElementById('denuncianteNumDocumento')?.value.trim();
    const esVictima = document.querySelector('input[name="denuncianteEsVictima"]:checked')?.value;

    if (!nombreDenunciante || nombreDenunciante === '') {
        mostrarError('Por favor, ingrese el nombre del denunciante primero');
        return;
    }

    if (!documento || documento === '') {
        mostrarError('Por favor, ingrese el documento del denunciante primero');
        return;
    }

    if (!esVictima) {
        mostrarError('Por favor, seleccione si el denunciante es la víctima en el Paso 1');
        return;
    }

    let textoGenerado = '';

    if (esVictima === 'true') {
        textoGenerado = `La señora/or ${nombreDenunciante}, en su calidad de víctima en este caso y de generales antes expresada en este documento, habiendo sido informado sobre los derechos y obligaciones que le asisten, de forma libre expresa que...\n\n`;
    } else {
        textoGenerado = `La señora/or ${nombreDenunciante}, en su calidad de denunciante y de generales antes expresada en este documento, habiendo sido informado sobre los derechos y obligaciones que le asisten, de forma libre expresa que...\n\n`;
    }

    console.log('Texto generado:', textoGenerado);

    if (window.editor && typeof window.editor.setData === 'function') {
        try {
            window.editor.setData(textoGenerado);
            console.log('✓ Texto insertado en CKEditor');
        } catch (error) {
            console.error('Error con CKEditor:', error);
        }
    }

    const textarea = document.getElementById('relacionHechos');
    if (textarea) {
        textarea.value = textoGenerado;
        console.log('✓ Texto insertado en textarea');
    }

    const preview = document.getElementById('previewRelacion');
    if (preview) {
        preview.innerHTML = `<div class="whitespace-pre-line text-gray-800">${textoGenerado}</div>`;
        console.log('✓ Previsualización actualizada');
    }

    mostrarExitoToast('Texto generado automáticamente');

    return textoGenerado;
}

// ============================================
// COPIAR DENUNCIANTE → VÍCTIMA
// ============================================

function copiarDatosDenuncianteAVictima() {
    console.log('Copiando datos del denunciante a la víctima...');

    document.getElementById('victimaNombre').value = document.getElementById('denuncianteNombre')?.value || '';
    document.getElementById('victimaConocidoPor').value = document.getElementById('denuncianteConocidoPor')?.value || '';
    document.getElementById('victimaFechaNacimiento').value = document.getElementById('denuncianteFechaNacimiento')?.value || '';

    const fechaNac = document.getElementById('denuncianteFechaNacimiento')?.value;
    if (fechaNac) {
        const edadInput = document.getElementById('victimaEdad');
        calcularEdad(fechaNac, edadInput);
    }

    const nacionalidadDen = document.getElementById('denuncianteNacionalidad')?.value;
    if (nacionalidadDen) {
        document.getElementById('victimaNacionalidad').value = nacionalidadDen;
    }

    const nivelEducDen = document.getElementById('denuncianteNivelEducativo')?.value;
    if (nivelEducDen) {
        document.getElementById('victimaNivelEducativo').value = nivelEducDen;
    }

    const estadoFamDen = document.getElementById('denuncianteEstadoFamiliar')?.value;
    if (estadoFamDen) {
        document.getElementById('victimaEstadoFamiliar').value = estadoFamDen;

        if (estadoFamDen === 'CASADO/A' || estadoFamDen === 'UNIÓN LIBRE') {
            document.getElementById('victimaNombreConyuge').value = document.getElementById('denuncianteNombreConyuge')?.value || '';
            const container = document.getElementById('victimaNombreConyugeContainer');
            if (container) container.style.display = 'block';
        }
    }

    const sexoDen = document.getElementById('denuncianteSexo')?.value;
    if (sexoDen) {
        document.getElementById('victimaSexo').value = sexoDen;
    }

    document.getElementById('victimaMadre').value = document.getElementById('denuncianteMadre')?.value || '';
    document.getElementById('victimaPadre').value = document.getElementById('denunciantePadre')?.value || '';

    const tipoDocDen = document.getElementById('denuncianteTipoDocumento')?.value;
    if (tipoDocDen) {
        document.getElementById('victimaTipoDocumento').value = tipoDocDen;
    }

    document.getElementById('victimaNumDocumento').value = document.getElementById('denuncianteNumDocumento')?.value || '';

    const profesionDen = document.getElementById('denuncianteProfesion')?.value;
    if (profesionDen && document.getElementById('victimaProfesion')) {
        document.getElementById('victimaProfesion').value = profesionDen;
    }

    const ocupacionDen = document.getElementById('denuncianteOcupacion')?.value;
    if (ocupacionDen && document.getElementById('victimaOcupacion')) {
        document.getElementById('victimaOcupacion').value = ocupacionDen;
    }

    document.getElementById('victimaLugarTrabajo').value = document.getElementById('denuncianteLugarTrabajo')?.value || '';

    const noTrabajoDen = document.getElementById('denuncianteNoTrabajo')?.checked;
    const trabajoCasaDen = document.getElementById('denuncianteTrabajoEnCasa')?.checked;

    if (document.getElementById('victimaNoTrabajo')) {
        document.getElementById('victimaNoTrabajo').checked = noTrabajoDen;
    }
    if (document.getElementById('victimaTrabajoEnCasa')) {
        document.getElementById('victimaTrabajoEnCasa').checked = trabajoCasaDen;
    }

    document.getElementById('victimaComplementoTrabajo').value = document.getElementById('denuncianteComplementoTrabajo')?.value || '';
    document.getElementById('victimaReferenciaTrabajo').value = document.getElementById('denuncianteReferenciaTrabajo')?.value || '';

    copiarCascadaGeograficaCompleta();

    document.getElementById('victimaComplementoDir').value = document.getElementById('denuncianteComplementoDir')?.value || '';
    document.getElementById('victimaPuntoReferencia').value = document.getElementById('denunciantePuntoReferencia')?.value || '';

    copiarTelefonos('denunciante', 'victima');

    console.log('✓ Datos copiados');
    mostrarExitoToast('Datos del denunciante copiados automáticamente');
}

async function copiarCascadaGeograficaCompleta() {
    await copiarCascadaGeografica('denunciante', 'victima', 'Nac', 'Nac', 'Nac');
    await copiarCascadaGeografica('denunciante', 'victima', 'Res', 'Res', 'Res');
    await copiarCascadaGeografica('denunciante', 'victima', 'Trabajo', 'Trabajo', 'Trabajo');
}

async function copiarCascadaGeografica(prefixOrigen, prefixDestino, sufijoDepto, sufijoMuni, sufijoDist) {
    const deptoOrigen = document.getElementById(`${prefixOrigen}Depto${sufijoDepto}`);
    const deptoDestino = document.getElementById(`${prefixDestino}Depto${sufijoDepto}`);

    if (!deptoOrigen || !deptoDestino || !deptoOrigen.value) return;

    deptoDestino.value = deptoOrigen.value;
    deptoDestino.dispatchEvent(new Event('change'));

    await new Promise(resolve => setTimeout(resolve, 800));

    const muniOrigen = document.getElementById(`${prefixOrigen}Muni${sufijoMuni}`) ||
        document.getElementById(`${prefixOrigen}Municipio${sufijoMuni}`);
    const muniDestino = document.getElementById(`${prefixDestino}Muni${sufijoMuni}`) ||
        document.getElementById(`${prefixDestino}Municipio${sufijoMuni}`);

    if (muniOrigen && muniDestino && muniOrigen.value) {
        muniDestino.value = muniOrigen.value;
        muniDestino.dispatchEvent(new Event('change'));

        await new Promise(resolve => setTimeout(resolve, 800));

        const distOrigen = document.getElementById(`${prefixOrigen}Dist${sufijoDist}`) ||
            document.getElementById(`${prefixOrigen}Distrito${sufijoDist}`);
        const distDestino = document.getElementById(`${prefixDestino}Dist${sufijoDist}`) ||
            document.getElementById(`${prefixDestino}Distrito${sufijoDist}`);

        if (distOrigen && distDestino && distOrigen.value) {
            distDestino.value = distOrigen.value;
        }
    }
}

function copiarTelefonos(prefixOrigen, prefixDestino) {
    const telefonosOrigen = document.querySelectorAll(`#${prefixOrigen}TelefonosLista .flex`);
    const listaDestino = document.getElementById(`${prefixDestino}TelefonosLista`);

    if (!listaDestino || telefonosOrigen.length === 0) return;

    listaDestino.innerHTML = '';

    telefonosOrigen.forEach(itemOrigen => {
        const telefono = itemOrigen.querySelector('input[type="tel"]')?.value;

        if (telefono) {
            const nuevoItem = itemOrigen.cloneNode(true);
            listaDestino.appendChild(nuevoItem);
        }
    });
}

// ============================================
// RECOPILACIÓN DE DATOS - ACTUALIZADO
// ============================================

function recopilarDatosDenunciante() {
    const contactos = [];
    const telefonosLista = document.querySelectorAll('#denuncianteTelefonosLista .flex');

    telefonosLista.forEach(item => {
        const codigoSelect = item.querySelector('.phone-code-select');
        const telefono = item.querySelector('input[type="tel"]')?.value;
        const tipoSelect = item.querySelector('.contact-type-select');

        if (telefono) {
            contactos.push({
                codigo_pais: codigoSelect?.value || '+503',
                telefono_contacto: telefono,
                id_tipo_contacto: parseInt(tipoSelect?.value) || 1
            });
        }
    });

    return {
        nombre_completo: document.getElementById('denuncianteNombre')?.value,
        conocido_por: document.getElementById('denuncianteConocidoPor')?.value || null,
        fecha_nacimiento: document.getElementById('denuncianteFechaNacimiento')?.value,
        edad: parseInt(document.getElementById('denuncianteEdad')?.value) || 0,
        nacionalidad: document.getElementById('denuncianteNacionalidad')?.value || 'Salvadoreña',
        nivel_educativo: document.getElementById('denuncianteNivelEducativo')?.value || 'NINGUNO',
        sexo: document.getElementById('denuncianteSexo')?.value === 'Masculino' ? 'M' : 'F',
        madre: document.getElementById('denuncianteMadre')?.value || null,
        padre: document.getElementById('denunciantePadre')?.value || null,
        tipo_documento: document.getElementById('denuncianteTipoDocumento')?.value || 'DUI',
        tipo_documento_opc_otro: null,
        documento: document.getElementById('denuncianteNumDocumento')?.value,
        ubicacion: parseInt(document.getElementById('denuncianteDistRes')?.value) || null,
        lugar_nacimiento: parseInt(document.getElementById('denuncianteDistNac')?.value) || null,
        direccion_trabajo: parseInt(document.getElementById('denuncianteDistritoTrabajo')?.value) || null,
        complemento_direccion: document.getElementById('denuncianteComplementoDir')?.value,
        punto_referencia: document.getElementById('denunciantePuntoReferencia')?.value || null,
        profesion: document.getElementById('denuncianteProfesion')?.value,
        ocupacion: document.getElementById('denuncianteOcupacion')?.value,
        lugar_trabajo: document.getElementById('denuncianteLugarTrabajo')?.value || null,
        trabaja: !document.getElementById('denuncianteNoTrabajo')?.checked,
        trabajo_en_casa: document.getElementById('denuncianteTrabajoEnCasa')?.checked || false,
        complemento_dir_trabajo: document.getElementById('denuncianteComplementoTrabajo')?.value || null,
        punto_ref_trabajo: document.getElementById('denuncianteReferenciaTrabajo')?.value || null,
        estado_familiar: document.getElementById('denuncianteEstadoFamiliar')?.value || 'SOLTERO/A',
        nombre_acompanante: document.getElementById('denuncianteNombreConyuge')?.value || null,
        contactos: contactos,

        es_victima: document.querySelector('input[name="denuncianteEsVictima"]:checked')?.value === "true",
    };
}

function recopilarDatosVictima() {
    const contactos = [];
    const telefonosLista = document.querySelectorAll('#victimaTelefonosLista .flex');

    telefonosLista.forEach(item => {
        const codigoSelect = item.querySelector('.phone-code-select');
        const telefono = item.querySelector('input[type="tel"]')?.value;
        const tipoSelect = item.querySelector('.contact-type-select');

        if (telefono) {
            contactos.push({
                codigo_pais: codigoSelect?.value || '+503', // ACTUALIZADO
                telefono_contacto: telefono,
                id_tipo_contacto: parseInt(tipoSelect?.value) || 1
            });
        }
    });

    const hijos = [];
    const cantidadHijos = parseInt(document.getElementById('victimaCantidadHijos')?.value) || 0;

    for (let i = 1; i <= cantidadHijos; i++) {
        const nombreHijo = document.getElementById(`hijo${i}Nombre`)?.value;
        if (nombreHijo) {
            hijos.push({
                nombre_completo: nombreHijo,
                sexo: document.getElementById(`hijo${i}Sexo`)?.value || 'M',
                edad: parseInt(document.getElementById(`hijo${i}Edad`)?.value) || 0
            });
        }
    }

    return {
        persona: {
            nombre_completo: document.getElementById('victimaNombre')?.value,
            conocido_por: document.getElementById('victimaConocidoPor')?.value || null,
            fecha_nacimiento: document.getElementById('victimaFechaNacimiento')?.value,
            edad: parseInt(document.getElementById('victimaEdad')?.value) || 0,
            nacionalidad: document.getElementById('victimaNacionalidad')?.value || 'Salvadoreña',
            nivel_educativo: document.getElementById('victimaNivelEducativo')?.value || 'NINGUNO',
            sexo: document.getElementById('victimaSexo')?.value === 'Masculino' ? 'M' : 'F',
            madre: document.getElementById('victimaMadre')?.value || null,
            padre: document.getElementById('victimaPadre')?.value || null,
            tipo_documento: document.getElementById('victimaTipoDocumento')?.value || 'DUI',
            tipo_documento_opc_otro: null,
            documento: document.getElementById('victimaNumDocumento')?.value,
            ubicacion: parseInt(document.getElementById('victimaDistRes')?.value) || null,
            lugar_nacimiento: parseInt(document.getElementById('victimaDistNac')?.value) || null,
            direccion_trabajo: parseInt(document.getElementById('victimaDistritoTrabajo')?.value) || null,
            complemento_direccion: document.getElementById('victimaComplementoDir')?.value,
            punto_referencia: document.getElementById('victimaPuntoReferencia')?.value || null,
            profesion: document.getElementById('victimaProfesion')?.value || 'N/A',
            ocupacion: document.getElementById('victimaOcupacion')?.value || 'Desempleado/a',
            lugar_trabajo: document.getElementById('victimaLugarTrabajo')?.value || null,
            trabaja: !document.getElementById('victimaNoTrabajo')?.checked,
            trabajo_en_casa: document.getElementById('victimaTrabajoEnCasa')?.checked || false,
            complemento_dir_trabajo: document.getElementById('victimaComplementoTrabajo')?.value || null,
            punto_ref_trabajo: document.getElementById('victimaReferenciaTrabajo')?.value || null,
            estado_familiar: document.getElementById('victimaEstadoFamiliar')?.value || 'SOLTERO/A',
            nombre_acompanante: document.getElementById('victimaNombreConyuge')?.value || null,
            contactos: contactos
        },
        cantidad_hijos: cantidadHijos,
        genera_ingreso_personal: document.querySelector('input[name="victimaGeneraIngreso"]:checked')?.value === 'si',
        dependencia_economica: document.getElementById('victimaDependenciaEconomica')?.value || 'DE SI MISMO/A',
        presencia_visible_lesiones: document.querySelector('input[name="victimaLesiones"]:checked')?.value === 'si',
        hospitalizaciones_previas: document.querySelector('input[name="victimaHospitalizaciones"]:checked')?.value === 'si',
        atencion_medica_previa: document.querySelector('input[name="victimaAtencionesMedicas"]:checked')?.value === 'si',
        hijos: hijos
    };
}

function recopilarDatosAgresor() {
    const contactos = [];
    const telefonosLista = document.querySelectorAll('#agresorTelefonosLista .flex');

    telefonosLista.forEach(item => {
        const codigoSelect = item.querySelector('.phone-code-select');
        const telefono = item.querySelector('input[type="tel"]')?.value;
        const tipoSelect = item.querySelector('.contact-type-select');

        if (telefono) {
            contactos.push({
                codigo_pais: codigoSelect?.value || '+503', // ACTUALIZADO
                telefono_contacto: telefono,
                id_tipo_contacto: parseInt(tipoSelect?.value) || 1
            });
        }
    });

    const armas = [];
    const armaSelect = document.getElementById('agresorTipoArmas');
    if (armaSelect && document.getElementById('agresorPoseeArmas')?.value === 'si') {
        Array.from(armaSelect.selectedOptions).forEach(option => {
            armas.push({ id_tipo_arma: parseInt(option.value) });
        });
    }

    const formaciones = [];
    const formacionSelect = document.getElementById('agresorTipoFormacion');
    if (formacionSelect && document.getElementById('agresorFormacionEspecial')?.value === 'si') {
        Array.from(formacionSelect.selectedOptions).forEach(option => {
            formaciones.push({ id_tipo_formacion_especial: parseInt(option.value) });
        });
    }

    const discapacidades = [];
    if (document.getElementById('agresorPoseeDiscapacidad')?.value === 'si') {
        document.querySelectorAll('input[name="agresorDiscapacidadTipo"]:checked').forEach(check => {
            discapacidades.push({ id_discapacidad: parseInt(check.value) });
        });
    }

    return {
        persona: {
            nombre_completo: document.getElementById('agresorNombre')?.value,
            conocido_por: document.getElementById('agresorConocidoPor')?.value || null,
            fecha_nacimiento: document.getElementById('agresorFechaNacimiento')?.value,
            edad: parseInt(document.getElementById('agresorEdad')?.value) || 0,
            nacionalidad: document.getElementById('agresorNacionalidad')?.value || 'Salvadoreña',
            nivel_educativo: document.getElementById('agresorNivelEducativo')?.value || 'NINGUNO',
            sexo: document.getElementById('agresorSexo')?.value === 'Masculino' ? 'M' : 'F',
            madre: document.getElementById('agresorMadre')?.value || null,
            padre: document.getElementById('agresorPadre')?.value || null,
            tipo_documento: document.getElementById('agresorTipoDocumento')?.value || 'DUI',
            tipo_documento_opc_otro: null,
            documento: document.getElementById('agresorNumDocumento')?.value,
            ubicacion: parseInt(document.getElementById('agresorDistRes')?.value) || null,
            lugar_nacimiento: parseInt(document.getElementById('agresorDistNac')?.value) || null,
            direccion_trabajo: parseInt(document.getElementById('agresorDistritoTrabajo')?.value) || null,
            complemento_direccion: document.getElementById('agresorComplementoDir')?.value,
            punto_referencia: document.getElementById('agresorPuntoReferencia')?.value || null,
            profesion: document.getElementById('agresorProfesion')?.value || 'N/A',
            ocupacion: document.getElementById('agresorOcupacion')?.value || 'Desempleado/a',
            lugar_trabajo: document.getElementById('agresorLugarTrabajo')?.value || null,
            trabaja: !document.getElementById('agresorNoTrabajo')?.checked,
            trabajo_en_casa: document.getElementById('agresorTrabajoEnCasa')?.checked || false,
            complemento_dir_trabajo: document.getElementById('agresorComplementoTrabajo')?.value || null,
            punto_ref_trabajo: document.getElementById('agresorReferenciaTrabajo')?.value || null,
            estado_familiar: document.getElementById('agresorEstadoFamiliar')?.value || 'SOLTERO/A',
            nombre_acompanante: document.getElementById('agresorNombreConyuge')?.value || null,
            contactos: contactos
        },

        consume_alcohol: convertirAEnum(document.getElementById('agresorConsumoAlcohol')?.value),
        frecuencia_consumo_alcohol: document.getElementById('agresorFrecuenciaAlcohol')?.value || null,
        consume_drogas: convertirAEnum(document.getElementById('agresorConsumoDrogas')?.value),
        frecuencia_consumo_drogas: document.getElementById('agresorFrecuenciaDrogas')?.value || null,
        posee_armas: convertirAEnum(document.getElementById('agresorPoseeArmas')?.value),
        formacion_especial: convertirAEnum(document.getElementById('agresorFormacionEspecial')?.value),
        posee_discapacidad: convertirAEnum(document.getElementById('agresorPoseeDiscapacidad')?.value),
        discapacidad_desc_adicional: document.getElementById('agresorDescripcionDiscapacidad')?.value || null,
        armas: armas,
        formaciones: formaciones,
        discapacidades: discapacidades
    };
}

function recopilarDatosHechos() {
    const entornos = [];
    document.querySelectorAll('input[name="entornoViolencia"]:checked').forEach(check => {
        entornos.push(parseInt(check.value));
    });

    const tiposViolencia = [];
    document.querySelectorAll('input[name="tipoViolencia"]:checked').forEach(check => {
        const tipoViolenciaObj = {
            id_tipo_violencia: parseInt(check.value)
        };

        // Si existe un campo de descripción adicional (como "otra violencia")
        const descripcionInput = document.getElementById('tipoOtraTexto');
        if (descripcionInput && descripcionInput.value &&
            check.parentElement.textContent.toUpperCase().includes('OTRA')) {
            tipoViolenciaObj.descripcion = descripcionInput.value;
        } else {
            tipoViolenciaObj.descripcion = null;
        }

        tiposViolencia.push(tipoViolenciaObj);
    });

    return {
        inicio_hechos: document.getElementById('inicioHechos')?.value || null,
        ultima_accion_fecha: document.getElementById('ultimaAccionFecha')?.value,
        hora_hecho: document.getElementById('horaHecho')?.value || document.getElementById('horaHechoTexto')?.value || null,
        relacion_hecho: datosTemporales.relacionHechos || '',
        lugar_hecho: document.getElementById('lugarHecho')?.value || 'OTRO',
        id_distrito: parseInt(document.getElementById('distritoHecho')?.value) || null,
        frecuencia_agresiones: document.getElementById('frecuenciaAgresiones')?.value || 'OTRA',
        agresor_alcoholizado: convertirAEnumNoSeSabe(document.getElementById('agresorAlcoholizado')?.value),
        agresor_drogado: convertirAEnumNoSeSabe(document.getElementById('agresorDrogado')?.value),
        denuncia_anterior_vif: convertirAEnumNoSeSabe(document.getElementById('denunciaAnteriorVIF')?.value),
        detenciones_anteriores_vif: convertirAEnumNoSeSabe(document.getElementById('detencionesAnterioresVIF')?.value),
        entornos: entornos,
        tipos_violencia: tiposViolencia,
        victimas_involucradas: [{ index: 0 }], // Primera víctima
        agresores_involucrados: [{ index: 0 }] // Primer agresor
    };
}

function recopilarRespuestas() {
    guardarRespuestasActuales();

    return datosTemporales.respuestas;
}

// ============================================
// NAVEGACIÓN - ACTUALIZADO CON GUARDADO TEMPORAL
// ============================================

function showStep(step) {
    steps.forEach((s, index) => {
        if (index === step) {
            s.classList.remove('hidden');
        } else {
            s.classList.add('hidden');
        }
    });

    const progress = ((step + 1) / totalSteps) * 100;
    progressBar.style.width = `${progress}%`;

    if (step === 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }

    if (step === totalSteps - 1) {
        nextBtn.textContent = 'Enviar';
    } else {
        nextBtn.textContent = 'Siguiente';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep() {
    // GUARDAR DATOS TEMPORALES SEGÚN EL PASO
    if (currentStep === 0) {
        datosTemporales.denunciante = recopilarDatosDenunciante();
        console.log('Denunciante guardado temporalmente');
    }

    if (currentStep === 1) {
        const victimaActual = recopilarDatosVictima();
        datosTemporales.victimas = [victimaActual];
        console.log('Víctima guardada temporalmente');
    }

    if (currentStep === 2) {
        // PASO 3: Relación de Hechos - GUARDAR EL TEXTO
        const relacionHechos = obtenerTextoRelacionHechos();
        datosTemporales.relacionHechos = relacionHechos;
        console.log('Relación de hechos guardada temporalmente:', relacionHechos.substring(0, 50) + '...');
    }

    if (currentStep === 4) {
        const agresorActual = recopilarDatosAgresor();
        datosTemporales.agresores = [agresorActual];
        console.log('Agresor guardado temporalmente');
    }

    if (currentStep === 5) {
        guardarRespuestasActuales();
    }

    if (currentStep < totalSteps - 1) {
        currentStep++;
        showStep(currentStep);

        // Copiar datos si es necesario
        if (currentStep === 1) {
            const esVictima = document.querySelector('input[name="denuncianteEsVictima"]:checked')?.value;
            if (esVictima === 'true') {
                copiarDatosDenuncianteAVictima();
            }
        }

        // Restablecer paginación de preguntas
        if (currentStep === 5) {
            restablecerPaginacionPreguntas();
        }
    } else {
        enviarFormulario();
    }
}

function prevStep() {
    if (currentStep === 5) {
        guardarRespuestasActuales();
    }

    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}

// ============================================
// GUARDAR Y RESTAURAR RESPUESTAS DEL CUESTIONARIO - NUEVO
// ============================================

function guardarRespuestasActuales() {
    console.log('Guardando respuestas del cuestionario...');

    const inicio = paginaActual * preguntasPorPagina;
    const fin = Math.min(inicio + preguntasPorPagina, preguntas.length);
    const preguntasPaginaActual = preguntas.slice(inicio, fin);

    preguntasPaginaActual.forEach(pregunta => {
        const radioChecked = document.querySelector(`input[name="pregunta_${pregunta.id_pregunta}"]:checked`);
        if (radioChecked) {
            // Buscamos si ya existe una respuesta para esta pregunta
            const indiceExistente = datosTemporales.respuestas.findIndex(
                r => r.id_pregunta === pregunta.id_pregunta
            );

            const nuevaRespuesta = {
                id_pregunta: pregunta.id_pregunta,
                respuesta: radioChecked.value
            }

            if (indiceExistente !== -1) {
                // Actualizamos la respuesta existente
                datosTemporales.respuestas[indiceExistente] = nuevaRespuesta;
            } else {
                // Agregamos la nueva respuesta
                datosTemporales.respuestas.push(nuevaRespuesta);
            }
        }
    });

    return datosTemporales.respuestas;
}

function restaurarRespuestas() {
    if (!datosTemporales.respuestas || datosTemporales.respuestas.length === 0) {
        console.log('No hay respuestas guardadas para restaurar');
        return;
    }

    console.log('Restaurando respuestas del cuestionario...');
    let respuestasRestauradas = 0;

    datosTemporales.respuestas.forEach(respuesta => {
        const radio = document.querySelector(
            `input[name="pregunta_${respuesta.id_pregunta}"][value="${respuesta.respuesta}"]`
        );

        if (radio) {
            radio.checked = true;
            // Disparar el evento change para actualizar la visual
            radio.dispatchEvent(new Event('change'));
            respuestasRestauradas++;
        }
    });

    console.log(`✓ ${respuestasRestauradas} respuestas restauradas`);
}

async function enviarFormulario() {
    try {
        mostrarLoading('Enviando formulario...');

        const denunciante = datosTemporales.denunciante || recopilarDatosDenunciante();

        const victimas = datosTemporales.victimas.length > 0 ? datosTemporales.victimas : [recopilarDatosVictima()];
        const agresores = datosTemporales.agresores.length > 0 ? datosTemporales.agresores : [recopilarDatosAgresor()];
        const hechos = recopilarDatosHechos();
        const respuestas = recopilarRespuestas();

        const payload = {
            denunciante,
            victimas,
            agresores,
            hechos: [hechos],
            respuestas
        };

        console.log('Enviando payload:', payload);

        const response = await api.post('/casos', payload);

        console.log('Respuesta del servidor:', response.data);

        if (response.data.success) {
            mostrarExito('Caso creado exitosamente');

            // Limpiar datos temporales
            datosTemporales = {
                relacionHechos: '',
                denunciante: null,
                victimas: [],
                agresores: [],
                respuestas: []
            };

            // IMPORTANTE: El backend devuelve los datos en response.data.data.caso
            const casoCreado = response.data.data.caso;
            const evaluacionData = response.data.data.evaluacion;

            console.log('Caso creado:', casoCreado);
            console.log('Evaluación:', evaluacionData);

            // Actualizar resumen con los datos correctos
            actualizarResumen(casoCreado, evaluacionData);

            // Mostrar el paso del comprobante (último paso)
            currentStep = totalSteps - 1;
            showStep(currentStep);
        }

        ocultarLoading();
    } catch (error) {
        console.error('Error al enviar formulario:', error);
        console.error('Detalles del error:', error.response?.data);
        mostrarError(error.response?.data?.message || 'Error al crear el caso');
        ocultarLoading();
    }
}

function actualizarResumen(caso, evaluacion) {
    console.log('Actualizando resumen con:', { caso, evaluacion });

    // Extraer datos del denunciante
    const nombreDenunciante = caso.denunciante?.persona?.nombre_completo ||
        caso.denunciante?.nombre_completo ||
        'No especificado';

    console.log('Nombre del denunciante:', nombreDenunciante);

    // Extraer datos de la víctima (primera víctima del array)
    let nombreVictima = 'No especificado';
    if (caso.victimas && caso.victimas.length > 0) {
        const primeraVictima = caso.victimas[0];
        nombreVictima = primeraVictima.persona?.nombre_completo ||
            primeraVictima.nombre_completo ||
            'No especificado';
    }

    // Extraer datos del agresor (primer agresor del array)
    let nombreAgresor = 'No especificado';
    if (caso.agresores && caso.agresores.length > 0) {
        const primerAgresor = caso.agresores[0];
        nombreAgresor = primerAgresor.persona?.nombre_completo ||
            primerAgresor.nombre_completo ||
            'No especificado';
    }

    // Contar respuestas
    let cantidadRespuestas = 0;
    if (evaluacion && evaluacion.respuestas) {
        cantidadRespuestas = evaluacion.respuestas.length;
    } else if (caso.evaluacion && caso.evaluacion.respuestas) {
        cantidadRespuestas = caso.evaluacion.respuestas.length;
    }

    // Referencia del caso
    const referenciaCaso = caso.ref_caso || caso.referencia || 'Sin referencia';

    // Fecha actual formateada
    const fechaActual = new Date().toLocaleDateString('es-SV', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Nivel de riesgo
    const nivelRiesgo = evaluacion?.nivel_riesgo ||
        caso.evaluacion?.nivel_riesgo ||
        'No evaluado';

    const puntajeRiesgo = evaluacion?.puntaje ||
        caso.evaluacion?.puntaje_total?.match(/\d+/)?.[0] ||
        0;

    console.log('Datos extraídos:', {
        nombreDenunciante,
        nombreVictima,
        nombreAgresor,
        cantidadRespuestas,
        referenciaCaso,
        nivelRiesgo,
        puntajeRiesgo
    });

    // Actualizar elementos del resumen (paso antes del comprobante)
    const elementosResumen = {
        'resumenDenunciante': nombreDenunciante,
        'resumenVictima': nombreVictima,
        'resumenAgresor': nombreAgresor,
        'resumenPreguntas': cantidadRespuestas.toString(),
        'resumenFecha': fechaActual,
        'resumenCaso': referenciaCaso,
        'resumenNivelRiesgo': nivelRiesgo,
        'resumenPuntaje': puntajeRiesgo
    };

    Object.entries(elementosResumen).forEach(([id, valor]) => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.textContent = valor;
            console.log(`✓ Actualizado ${id}: ${valor}`);
        } else {
            console.warn(`Elemento ${id} no encontrado en el DOM`);
        }
    });

    // Actualizar elementos del comprobante (para imprimir)
    const elementosComprobante = {
        'printCaso': referenciaCaso,
        'printFecha': fechaActual,
        'printDenunciante': nombreDenunciante,
        'printVictima': nombreVictima,
        'printAgresor': nombreAgresor,
        'printPreguntas': `${cantidadRespuestas} preguntas respondidas`,
        'printNivelRiesgo': nivelRiesgo,
        'printPuntaje': `${puntajeRiesgo} puntos`
    };

    Object.entries(elementosComprobante).forEach(([id, valor]) => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.textContent = valor;
            console.log(`✓ Actualizado ${id}: ${valor}`);
        } else {
            console.warn(`Elemento ${id} no encontrado en el DOM`);
        }
    });

    console.log('Resumen y comprobante actualizados correctamente');
}

// ============================================
// FUNCIONES DE UI
// ============================================

function mostrarLoading(mensaje = 'Cargando...') {
    console.log('', mensaje);
}

function ocultarLoading() {
    console.log('✓ Loading ocultado');
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', async function () {
    console.log('Inicializando formulario...');

    inicializarObserverPadding();

    await cargarCatalogos();
    await cargarPreguntas();
    await cargarUsuarioActual();
    await cargarTribunales();

    inicializarCalculadoresEdad();
    inicializarTelefonos();
    inicializarHijos();
    setupConditionalFields();

    nextBtn.addEventListener('click', nextStep);
    prevBtn.addEventListener('click', prevStep);

    const imprimirBtn = document.getElementById('imprimirBtn');
    if (imprimirBtn) {
        imprimirBtn.addEventListener('click', function () {
            window.print();
        });
    }

    showStep(currentStep);

    console.log('✓ Formulario inicializado correctamente');
});

