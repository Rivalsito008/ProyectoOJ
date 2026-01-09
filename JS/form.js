// JS/form.js - Formulario DEFINITIVO - TODAS las funcionalidades
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
// FUNCIONES DE CARGA DE DATOS
// ============================================

async function cargarPreguntas() {
    try {
        console.log('Cargando preguntas...');
        const response = await api.get('/preguntas/con-relaciones');

        if (response.data && response.data.data) {
            preguntas = response.data.data;
            preguntasAPI = response.data.data;
            console.log('✅ Preguntas cargadas:', preguntas.length);
            renderizarPreguntasEnFormulario();
        }
    } catch (error) {
        console.error('❌ Error al cargar preguntas:', error);
    }
}

function renderizarPreguntasEnFormulario() {
    const container = document.getElementById('preguntasForm');
    if (!container) {
        console.warn('⚠️ Contenedor preguntasForm no encontrado');
        return;
    }

    container.innerHTML = '';

    // Calcular índices para paginación
    const inicio = paginaActual * preguntasPorPagina;
    const fin = Math.min(inicio + preguntasPorPagina, preguntas.length);
    const preguntasPagina = preguntas.slice(inicio, fin);

    if (preguntasPagina.length === 0) {
        container.innerHTML = '<p class="text-gray-600 italic">No hay preguntas para mostrar.</p>';
        return;
    }

    // Contenedor principal SIN borde negro - solo fondo suave
    const contenedorPrincipal = document.createElement('div');
    contenedorPrincipal.className = 'rounded-lg p-4 bg-gray-50';

    // Agrupar por ámbito
    const preguntasPorAmbito = {};
    preguntasPagina.forEach(pregunta => {
        const nombreAmbito = pregunta.ambito?.ambito || 'Sin ámbito';
        if (!preguntasPorAmbito[nombreAmbito]) {
            preguntasPorAmbito[nombreAmbito] = [];
        }
        preguntasPorAmbito[nombreAmbito].push(pregunta);
    });

    // Renderizar cada ámbito
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

            // Calcular número real de pregunta
            const numeroPregunta = inicio + preguntasPagina.indexOf(pregunta) + 1;

            preguntaDiv.innerHTML = `
                <p class="text-gray-700 mb-2 font-medium text-sm">${numeroPregunta}. ${pregunta.pregunta}</p>
                <div class="flex items-center space-x-6">
                    <label class="flex items-center space-x-2 cursor-pointer">
                        <div class="relative">
                            <input type="radio" name="pregunta_${pregunta.id_pregunta}" value="Si" 
                                   class="sr-only">
                            <div class="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center radio-visual">
                                <div class="w-2 h-2 rounded-full bg-transparent"></div>
                            </div>
                        </div>
                        <span class="text-gray-600 text-sm">Sí</span>
                    </label>
                    <label class="flex items-center space-x-2 cursor-pointer">
                        <div class="relative">
                            <input type="radio" name="pregunta_${pregunta.id_pregunta}" value="No" 
                                   class="sr-only">
                            <div class="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center radio-visual">
                                <div class="w-2 h-2 rounded-full bg-transparent"></div>
                            </div>
                        </div>
                        <span class="text-gray-600 text-sm">No</span>
                    </label>
                </div>
            `;

            // Configurar selección visual
            const radioSi = preguntaDiv.querySelector('input[value="Si"]');
            const radioNo = preguntaDiv.querySelector('input[value="No"]');
            const visualSi = preguntaDiv.querySelectorAll('.radio-visual')[0];
            const visualNo = preguntaDiv.querySelectorAll('.radio-visual')[1];

            function actualizarVisual() {
                // Resetear ambos
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

            // Event listeners
            radioSi.addEventListener('change', actualizarVisual);
            radioNo.addEventListener('change', actualizarVisual);

            // Event listeners para clicks en el label
            preguntaDiv.querySelectorAll('label').forEach(label => {
                label.addEventListener('click', function (e) {
                    // Solo si no se hizo click directamente en el input
                    if (e.target.tagName !== 'INPUT') {
                        const radio = this.querySelector('input');
                        if (radio) {
                            radio.checked = true;
                            radio.dispatchEvent(new Event('change'));
                        }
                    }
                });
            });

            // Inicializar sin selección
            actualizarVisual();

            preguntasDiv.appendChild(preguntaDiv);
        });

        ambitoDiv.appendChild(preguntasDiv);
        contenedorPrincipal.appendChild(ambitoDiv);
    });

    container.appendChild(contenedorPrincipal);

    // Agregar controles de paginación compactos
    agregarControlesPaginacion(container, inicio, fin);

    console.log('✅ Preguntas renderizadas (página', paginaActual + 1, ')');
}

function agregarControlesPaginacion(container, inicio, fin) {
    const totalPaginas = Math.ceil(preguntas.length / preguntasPorPagina);

    // Contenedor de paginación COMPACTO
    const paginacionDiv = document.createElement('div');
    paginacionDiv.className = 'mt-6 pt-4 border-t border-gray-200';

    // Controles de navegación compactos
    const controlesDiv = document.createElement('div');
    controlesDiv.className = 'flex items-center justify-between';

    // Información de página compacta - MUCHO MÁS PEQUEÑA
    const infoDiv = document.createElement('div');
    infoDiv.className = 'text-xs text-gray-500';
    infoDiv.innerHTML = `
        <span class="font-medium text-gray-600">Pág. ${paginaActual + 1}/${totalPaginas}</span>
        <span class="mx-2">•</span>
        <span>Preguntas ${inicio + 1}-${fin} de ${preguntas.length}</span>
    `;

    // Botones de navegación compactos
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

    // Event listeners para controles de paginación
    const btnAnterior = document.getElementById('paginaAnterior');
    const btnSiguiente = document.getElementById('paginaSiguiente');

    if (btnAnterior && btnSiguiente) {
        btnAnterior.disabled = paginaActual === 0;
        btnSiguiente.disabled = paginaActual >= totalPaginas - 1;

        btnAnterior.addEventListener('click', () => {
            if (paginaActual > 0) {
                paginaActual--;
                renderizarPreguntasEnFormulario();
            }
        });

        btnSiguiente.addEventListener('click', () => {
            if (paginaActual < totalPaginas - 1) {
                paginaActual++;
                renderizarPreguntasEnFormulario();
            }
        });
    }
}

// ============================================
// MODIFICACIÓN: FUNCIÓN PARA RESTABLECER PAGINACIÓN
// ============================================

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
            console.log('✅ Catálogos cargados:', Object.keys(catalogos));

            // Verificar que se cargaron profesiones y ocupaciones
            console.log('🔍 Verificando catálogos:');
            console.log('- Profesiones:', catalogos.profesiones?.length || 0);
            console.log('- Ocupaciones:', catalogos.ocupaciones?.length || 0);
            console.log('- Tipos contacto:', catalogos.tipos_contacto?.length || 0);

            await cargarGeografia();
            poblarTodosLosSelects();
            poblarEntornosViolencia();

            ocultarLoading();
        }
    } catch (error) {
        console.error('❌ Error al cargar catálogos:', error);
        mostrarError('Error al cargar los catálogos.');
        ocultarLoading();
    }
}

function poblarEntornosViolencia() {
    const container = document.getElementById('entornoViolenciaContainer');
    if (!container) {
        console.warn('⚠️ Contenedor entornoViolenciaContainer no encontrado');
        return;
    }

    if (!catalogos.entornos_violencia) {
        console.warn('⚠️ No hay datos de entornos_violencia');
        return;
    }

    container.innerHTML = '';

    catalogos.entornos_violencia.forEach(entorno => {
        const label = document.createElement('label');
        label.className = 'flex items-center space-x-2 mb-2';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'entornoViolencia';
        checkbox.value = entorno.id_entorno_violencia;
        checkbox.className = 'text-blue-600';

        const span = document.createElement('span');
        span.textContent = entorno.entorno_violencia;

        label.appendChild(checkbox);
        label.appendChild(span);
        container.appendChild(label);

        // Si es "OTRO", agregar input para especificar
        if (entorno.entorno_violencia.toUpperCase().includes('OTRO')) {
            const inputOtro = document.createElement('input');
            inputOtro.type = 'text';
            inputOtro.id = 'entornoOtraTexto';
            inputOtro.placeholder = 'Especifique';
            inputOtro.className = 'border border-gray-300 rounded-lg p-2 ml-6 mt-1 w-full focus:border-blue-500';
            inputOtro.style.display = 'none';

            checkbox.addEventListener('change', function () {
                inputOtro.style.display = this.checked ? 'block' : 'none';
            });

            container.appendChild(inputOtro);
        }
    });

    console.log('✅ Entornos de violencia poblados desde BD');
}

async function cargarGeografia() {
    try {
        console.log('Cargando departamentos...');
        const response = await api.get('/departamentos');

        if (response.data) {
            geografiaData.departamentos = response.data.data || response.data;
            console.log('✅ Departamentos cargados:', geografiaData.departamentos.length);
            poblarDepartamentos();
        }
    } catch (error) {
        console.error('❌ Error al cargar geografía:', error);
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
            console.log('✅ Tribunales cargados:', tribunalesData.length);
        }
    } catch (error) {
        console.error('❌ Error al cargar tribunales:', error);
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

        // Catálogos de ENUMs
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

    poblarSelect('agresorTipoArmas', catalogos.tipos_arma, 'id_tipo_arma', 'tipo_arma');
    poblarSelect('agresorTipoFormacion', catalogos.tipos_formacion, 'id_tipo_formacion_especial', 'tipo_formacion_especial');
    poblarSelect('agresorFrecuenciaAlcohol', catalogos.frecuencias_consumo, 'id', 'nombre');
    poblarSelect('agresorFrecuenciaDrogas', catalogos.frecuencias_consumo, 'id', 'nombre');

    poblarSelect('lugarHecho', catalogos.lugares_hecho, 'id', 'nombre');
    poblarSelect('frecuenciaAgresiones', catalogos.frecuencias_agresion, 'id', 'nombre');

    console.log('✅ Selects poblados');
}

function poblarSelect(selectId, data, valueField, textField) {
    const select = document.getElementById(selectId);
    if (!select) {
        console.warn(`⚠️ Select ${selectId} no encontrado en DOM`);
        return;
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
        console.warn(`⚠️ No hay datos para poblar ${selectId}`);
        select.innerHTML = `<option value="">No hay datos disponibles</option>`;
        return;
    }

    const defaultOption = select.querySelector('option[value=""]');
    select.innerHTML = '';

    if (defaultOption) {
        select.appendChild(defaultOption);
    } else {
        // Agregar opción por defecto si no existe
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

    console.log(`✅ Select ${selectId} poblado con ${data.length} opciones`);
}

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
                    console.log(`✅ Municipios cargados para ${idDepartamento}: ${municipios.length}`);
                }
            } catch (error) {
                console.error('❌ Error al cargar municipios:', error);
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
                    console.log(`✅ Distritos cargados para ${idMunicipio}: ${distritos.length}`);
                }
            } catch (error) {
                console.error('❌ Error al cargar distritos:', error);
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

    // Poblar el primer teléfono que ya está en el HTML
    setTimeout(() => {
        poblarPrimerTelefono('denunciante');
        poblarPrimerTelefono('victima');
        poblarPrimerTelefono('agresor');
    }, 500);
}

function poblarPrimerTelefono(prefijo) {
    const lista = document.getElementById(`${prefijo}TelefonosLista`);
    if (!lista) {
        console.warn(`⚠️ Lista de teléfonos de ${prefijo} no encontrada`);
        return;
    }

    const primerSelect = lista.querySelector('select');
    if (!primerSelect) {
        console.warn(`⚠️ Select de teléfono de ${prefijo} no encontrado`);
        return;
    }

    // Limpiar opciones existentes
    primerSelect.innerHTML = '<option value="">Seleccione tipo</option>';

    // Poblar desde catálogos
    if (catalogos.tipos_contacto && catalogos.tipos_contacto.length > 0) {
        catalogos.tipos_contacto.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.id_tipo_contacto;
            option.textContent = tipo.tipo_contacto;
            primerSelect.appendChild(option);
        });
        console.log(`✅ Primer teléfono de ${prefijo} poblado con ${catalogos.tipos_contacto.length} tipos`);
    } else {
        console.warn(`⚠️ No hay tipos_contacto en catálogos para ${prefijo}`);
        // Opciones por defecto
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
            primerSelect.appendChild(option);
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
        <input type="tel" placeholder="Número de teléfono"
            class="border border-gray-300 rounded-lg p-3 flex-grow focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
        <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            <option value="">Seleccione tipo</option>
        </select>
        <button type="button" class="text-red-500 hover:text-red-700 font-bold px-3 py-2 eliminar-telefono">✕</button>
    `;

    // Poblar select de tipos de contacto
    const selectTipo = nuevoTelefono.querySelector('select');
    if (catalogos.tipos_contacto && catalogos.tipos_contacto.length > 0) {
        catalogos.tipos_contacto.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.id_tipo_contacto;
            option.textContent = tipo.tipo_contacto;
            selectTipo.appendChild(option);
        });
    } else {
        // Opciones por defecto
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

    // Evento para eliminar
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
            <input type="number" id="hijo${numero}Edad" placeholder="Edad" min="0" 
                   class="border border-gray-300 rounded-lg p-2">
            <input type="text" id="hijo${numero}Escolaridad" placeholder="Escolaridad" 
                   class="border border-gray-300 rounded-lg p-2">
            <input type="text" id="hijo${numero}NombrePadre" placeholder="Nombre del padre" 
                   class="border border-gray-300 rounded-lg p-2">
            <input type="text" id="hijo${numero}NombreMadre" placeholder="Nombre de la madre" 
                   class="border border-gray-300 rounded-lg p-2">
        </div>
    `;
    return div;
}

// ============================================
// CAMPOS CONDICIONALES
// ============================================

function setupConditionalFields() {
    console.log('⚙️ Configurando campos condicionales...');

    // Estado familiar
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

    // Checkboxes de trabajo
    setupCheckboxesTrabajo('denunciante');
    setupCheckboxesTrabajo('victima');
    setupCheckboxesTrabajo('agresor');

    // Víctima
    setupCamposIngresoVictima();
    setupCamposLesionesVictima();
    setupCamposHospitalizacionesVictima();
    setupCamposAtencionesMedicasVictima();

    // Agresor
    setupCamposConsumoAgresor('Alcohol');
    setupCamposConsumoAgresor('Drogas');
    setupCamposArmasAgresor();
    setupCamposFormacionAgresor();
    setupCamposDiscapacidadAgresor();

    // Generador de texto
    setupGeneradorTexto();

    console.log('✅ Campos condicionales configurados');
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
            // Al deseleccionar, volver a mostrar
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
            // Al deseleccionar, volver a mostrar si "No trabajo" no está marcado
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
// GENERADOR DE TEXTO AUTOMÁTICO - CORREGIDO
// ============================================

function setupGeneradorTexto() {
    const btnGenerar = document.getElementById('generarTextoBtn');
    if (!btnGenerar) {
        console.warn('⚠️ Botón generarTextoBtn no encontrado');
        return;
    }

    btnGenerar.addEventListener('click', function (e) {
        e.preventDefault();
        generarTextoAutomatico();
    });

    console.log('✅ Generador de texto configurado');
}

function generarTextoAutomatico() {
    console.log('🔤 Generando texto automático...');

    const nombreDenunciante = document.getElementById('denuncianteNombre')?.value.trim();
    const documento = document.getElementById('denuncianteNumDocumento')?.value.trim();
    const esVictima = document.querySelector('input[name="denuncianteEsVictima"]:checked')?.value;

    // Validar datos mínimos
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

    if (esVictima === 'si') {
        // Cuando la denuncia es interpuesta directamente por la víctima
        textoGenerado = `La señora/or ${nombreDenunciante}, en su calidad de víctima en este caso y de generales antes expresada en este documento, habiendo sido informado sobre los derechos y obligaciones que le asisten, de forma libre expresa que...\n\n`;
    } else {
        // Cuando la denuncia es interpuesta por denunciante
        textoGenerado = `La señora/or ${nombreDenunciante}, en su calidad de denunciante y de generales antes expresada en este documento, habiendo sido informado sobre los derechos y obligaciones que le asisten, de forma libre expresa que...\n\n`;
    }

    console.log('Texto generado:', textoGenerado);

    // 1. Intentar con CKEditor primero
    if (window.editor && typeof window.editor.setData === 'function') {
        try {
            window.editor.setData(textoGenerado);
            console.log('✅ Texto insertado en CKEditor');
        } catch (error) {
            console.error('❌ Error con CKEditor:', error);
        }
    }

    // 2. Intentar con textarea
    const textarea = document.getElementById('relacionHechos');
    if (textarea) {
        textarea.value = textoGenerado;
        console.log('✅ Texto insertado en textarea');
    }

    // 3. Actualizar previsualización
    const preview = document.getElementById('previewRelacion');
    if (preview) {
        preview.innerHTML = `<div class="whitespace-pre-line text-gray-800">${textoGenerado}</div>`;
        console.log('✅ Previsualización actualizada');
    }

    mostrarExito('Texto generado automáticamente');

    return textoGenerado;
}

// ============================================
// COPIAR DENUNCIANTE → VÍCTIMA
// ============================================

function copiarDatosDenuncianteAVictima() {
    console.log('📋 Copiando datos del denunciante a la víctima...');

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

    // ⭐ CORRECCIÓN: Usar selects para profesión y ocupación
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

    // COPIAR COMPLEMENTO Y PUNTO DE REFERENCIA DEL TRABAJO
    document.getElementById('victimaComplementoTrabajo').value = document.getElementById('denuncianteComplementoTrabajo')?.value || '';
    document.getElementById('victimaReferenciaTrabajo').value = document.getElementById('denuncianteReferenciaTrabajo')?.value || '';

    copiarCascadaGeograficaCompleta();

    document.getElementById('victimaComplementoDir').value = document.getElementById('denuncianteComplementoDir')?.value || '';
    document.getElementById('victimaPuntoReferencia').value = document.getElementById('denunciantePuntoReferencia')?.value || '';

    copiarTelefonos('denunciante', 'victima');

    console.log('✅ Datos copiados');
    mostrarExito('Datos del denunciante copiados automáticamente');
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
// RECOPILACIÓN DE DATOS
// ============================================

function recopilarDatosDenunciante() {
    const contactos = [];
    const telefonosLista = document.querySelectorAll('#denuncianteTelefonosLista .flex');

    telefonosLista.forEach(item => {
        const telefono = item.querySelector('input[type="tel"]')?.value;
        const tipo = item.querySelector('select')?.value;

        if (telefono) {
            contactos.push({
                telefono_contacto: telefono,
                id_tipo_contacto: parseInt(tipo) || 1
            });
        }
    });

    return {
        nombre_completo: document.getElementById('denuncianteNombre')?.value,
        conocido_por: document.getElementById('denuncianteConocidoPor')?.value || null,
        fecha_nacimiento: document.getElementById('denuncianteFechaNacimiento')?.value,
        edad: parseInt(document.getElementById('denuncianteEdad')?.value) || 0,
        lugar_nacimiento: `${document.getElementById('denuncianteDeptoNac')?.selectedOptions[0]?.text || ''}, ${document.getElementById('denuncianteMuniNac')?.selectedOptions[0]?.text || ''}`,
        nacionalidad: document.getElementById('denuncianteNacionalidad')?.value || 'Salvadoreña',
        nivel_educativo: document.getElementById('denuncianteNivelEducativo')?.value || 'NINGUNO',
        sexo: document.getElementById('denuncianteSexo')?.value === 'Masculino' ? 'M' : 'F',
        madre: document.getElementById('denuncianteMadre')?.value || null,
        padre: document.getElementById('denunciantePadre')?.value || null,
        tipo_documento: document.getElementById('denuncianteTipoDocumento')?.value || 'DUI',
        tipo_documento_opc_otro: null,
        documento: document.getElementById('denuncianteNumDocumento')?.value,
        id_distrito: parseInt(document.getElementById('denuncianteDistRes')?.value) || null,
        complemento_direccion: document.getElementById('denuncianteComplementoDir')?.value,
        punto_referencia: document.getElementById('denunciantePuntoReferencia')?.value || null,
        profesion: document.getElementById('denuncianteProfesion')?.value || 'N/A',
        ocupacion: document.getElementById('denuncianteOcupacion')?.value || 'Desempleado/a',
        lugar_trabajo: document.getElementById('denuncianteLugarTrabajo')?.value || null,
        trabaja: !document.getElementById('denuncianteNoTrabajo')?.checked,
        trabajo_en_casa: document.getElementById('denuncianteTrabajoEnCasa')?.checked || false,
        direccion_trabajo: null,
        complemento_dir_trabajo: document.getElementById('denuncianteComplementoTrabajo')?.value || null,
        punto_ref_trabajo: document.getElementById('denuncianteReferenciaTrabajo')?.value || null,
        estado_familiar: document.getElementById('denuncianteEstadoFamiliar')?.value || 'SOLTERO/A',
        nombre_acompanante: document.getElementById('denuncianteNombreConyuge')?.value || null,
        contactos: contactos
    };
}

function recopilarDatosVictima() {
    const contactos = [];
    const telefonosLista = document.querySelectorAll('#victimaTelefonosLista .flex');

    telefonosLista.forEach(item => {
        const telefono = item.querySelector('input[type="tel"]')?.value;
        const tipo = item.querySelector('select')?.value;

        if (telefono) {
            contactos.push({
                telefono_contacto: telefono,
                id_tipo_contacto: parseInt(tipo) || 1
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
                edad: parseInt(document.getElementById(`hijo${i}Edad`)?.value) || 0,
                escolaridad: document.getElementById(`hijo${i}Escolaridad`)?.value || null,
                nombre_padre: document.getElementById(`hijo${i}NombrePadre`)?.value || null,
                nombre_madre: document.getElementById(`hijo${i}NombreMadre`)?.value || null
            });
        }
    }

    return {
        persona: {
            nombre_completo: document.getElementById('victimaNombre')?.value,
            conocido_por: document.getElementById('victimaConocidoPor')?.value || null,
            fecha_nacimiento: document.getElementById('victimaFechaNacimiento')?.value,
            edad: parseInt(document.getElementById('victimaEdad')?.value) || 0,
            lugar_nacimiento: `${document.getElementById('victimaDeptoNac')?.selectedOptions[0]?.text || ''}, ${document.getElementById('victimaMuniNac')?.selectedOptions[0]?.text || ''}`,
            nacionalidad: document.getElementById('victimaNacionalidad')?.value || 'Salvadoreña',
            nivel_educativo: document.getElementById('victimaNivelEducativo')?.value || 'NINGUNO',
            sexo: document.getElementById('victimaSexo')?.value === 'Masculino' ? 'M' : 'F',
            madre: document.getElementById('victimaMadre')?.value || null,
            padre: document.getElementById('victimaPadre')?.value || null,
            tipo_documento: document.getElementById('victimaTipoDocumento')?.value || 'DUI',
            tipo_documento_opc_otro: null,
            documento: document.getElementById('victimaNumDocumento')?.value,
            id_distrito: parseInt(document.getElementById('victimaDistRes')?.value) || null,
            complemento_direccion: document.getElementById('victimaComplementoDir')?.value,
            punto_referencia: document.getElementById('victimaPuntoReferencia')?.value || null,
            profesion: document.getElementById('victimaProfesion')?.value || 'N/A',
            ocupacion: document.getElementById('victimaOcupacion')?.value || 'Desempleado/a',
            lugar_trabajo: document.getElementById('victimaLugarTrabajo')?.value || null,
            trabaja: !document.getElementById('victimaNoTrabajo')?.checked,
            trabajo_en_casa: document.getElementById('victimaTrabajoEnCasa')?.checked || false,
            direccion_trabajo: null,
            complemento_dir_trabajo: document.getElementById('victimaComplementoTrabajo')?.value || null,
            punto_ref_trabajo: document.getElementById('victimaReferenciaTrabajo')?.value || null,
            estado_familiar: document.getElementById('victimaEstadoFamiliar')?.value || 'SOLTERO/A',
            nombre_acompanante: document.getElementById('victimaNombreConyuge')?.value || null,
            contactos: contactos
        },
        cantidad_hijos: cantidadHijos,
        genera_ingreso_personal: document.querySelector('input[name="victimaGeneraIngreso"]:checked')?.value === 'si',
        tipo_ingreso: document.getElementById('victimaTipoIngresos')?.value || null,
        tipo_ingreso_opc_otros: null,
        cantidad_aprox_ingresos_mensuales: document.getElementById('victimaRangoIngresos')?.value || null,
        dependencia_economica: document.getElementById('victimaDependenciaEconomica')?.value || 'DE SI MISMO/A',
        dependencia_economica_opc_otros: null,
        de_quien_depende_economicamente: document.getElementById('victimaDependeDe')?.value || null,
        tipo_relacion_con_de: document.getElementById('victimaRelacionDependencia')?.value || null,
        tipo_relacion_con_de_opc_otros: null,
        frecuencia_ingreso: document.getElementById('victimaFrecuenciaIngreso')?.value || null,
        presencia_visible_lesiones: document.querySelector('input[name="victimaLesiones"]:checked')?.value === 'si',
        tipo_lesion: document.getElementById('victimaTipoLesion')?.value || null,
        nivel_lesion: document.getElementById('victimaNivelLesion')?.value || null,
        hospitalizaciones_previas: document.querySelector('input[name="victimaHospitalizaciones"]:checked')?.value === 'si',
        tiempo_en_dias_de_hospitalizacion: document.getElementById('victimaDiasHospitalizacion')?.value || null,
        fecha_hospitalizacion: document.getElementById('victimaFechaHospitalizacion')?.value || null,
        detalles_fecha_hospitalizacion: null,
        atencion_medica_previa: document.querySelector('input[name="victimaAtencionesMedicas"]:checked')?.value === 'si',
        numero_atenciones: parseInt(document.getElementById('victimaNumAtenciones')?.value) || null,
        hijos: hijos
    };
}

function recopilarDatosAgresor() {
    const contactos = [];
    const telefonosLista = document.querySelectorAll('#agresorTelefonosLista .flex');

    telefonosLista.forEach(item => {
        const telefono = item.querySelector('input[type="tel"]')?.value;
        const tipo = item.querySelector('select')?.value;

        if (telefono) {
            contactos.push({
                telefono_contacto: telefono,
                id_tipo_contacto: parseInt(tipo) || 1
            });
        }
    });

    const tiposArma = [];
    const armaSelect = document.getElementById('agresorTipoArmas');
    if (armaSelect && document.getElementById('agresorPoseeArmas')?.value === 'si') {
        Array.from(armaSelect.selectedOptions).forEach(option => {
            tiposArma.push(parseInt(option.value));
        });
    }

    const tiposFormacion = [];
    const formacionSelect = document.getElementById('agresorTipoFormacion');
    if (formacionSelect && document.getElementById('agresorFormacionEspecial')?.value === 'si') {
        Array.from(formacionSelect.selectedOptions).forEach(option => {
            tiposFormacion.push(parseInt(option.value));
        });
    }

    const discapacidades = [];
    if (document.getElementById('agresorPoseeDiscapacidad')?.value === 'si') {
        document.querySelectorAll('input[name="agresorDiscapacidadTipo"]:checked').forEach(check => {
            discapacidades.push(parseInt(check.value));
        });
    }

    return {
        persona: {
            nombre_completo: document.getElementById('agresorNombre')?.value,
            conocido_por: document.getElementById('agresorConocidoPor')?.value || null,
            fecha_nacimiento: document.getElementById('agresorFechaNacimiento')?.value,
            edad: parseInt(document.getElementById('agresorEdad')?.value) || 0,
            lugar_nacimiento: `${document.getElementById('agresorDeptoNac')?.selectedOptions[0]?.text || ''}, ${document.getElementById('agresorMuniNac')?.selectedOptions[0]?.text || ''}`,
            nacionalidad: document.getElementById('agresorNacionalidad')?.value || 'Salvadoreña',
            nivel_educativo: document.getElementById('agresorNivelEducativo')?.value || 'NINGUNO',
            sexo: document.getElementById('agresorSexo')?.value === 'Masculino' ? 'M' : 'F',
            madre: document.getElementById('agresorMadre')?.value || null,
            padre: document.getElementById('agresorPadre')?.value || null,
            tipo_documento: document.getElementById('agresorTipoDocumento')?.value || 'DUI',
            tipo_documento_opc_otro: null,
            documento: document.getElementById('agresorNumDocumento')?.value,
            id_distrito: parseInt(document.getElementById('agresorDistRes')?.value) || null,
            complemento_direccion: document.getElementById('agresorComplementoDir')?.value,
            punto_referencia: document.getElementById('agresorPuntoReferencia')?.value || null,
            profesion: document.getElementById('agresorProfesion')?.value || 'N/A',
            ocupacion: document.getElementById('agresorOcupacion')?.value || 'Desempleado/a',
            lugar_trabajo: document.getElementById('agresorLugarTrabajo')?.value || null,
            trabaja: !document.getElementById('agresorNoTrabajo')?.checked,
            trabajo_en_casa: document.getElementById('agresorTrabajoEnCasa')?.checked || false,
            direccion_trabajo: null,
            complemento_dir_trabajo: document.getElementById('agresorComplementoTrabajo')?.value || null,
            punto_ref_trabajo: document.getElementById('agresorReferenciaTrabajo')?.value || null,
            estado_familiar: document.getElementById('agresorEstadoFamiliar')?.value || 'SOLTERO/A',
            nombre_acompanante: document.getElementById('agresorNombreConyuge')?.value || null,
            contactos: contactos
        },
        consume_alcohol: document.getElementById('agresorConsumoAlcohol')?.value === 'si',
        frecuencia_consumo_alcohol: document.getElementById('agresorFrecuenciaAlcohol')?.value || null,
        consume_drogas: document.getElementById('agresorConsumoDrogas')?.value === 'si',
        frecuencia_consumo_drogas: document.getElementById('agresorFrecuenciaDrogas')?.value || null,
        posee_armas: document.getElementById('agresorPoseeArmas')?.value === 'si',
        formacion_especial: document.getElementById('agresorFormacionEspecial')?.value?.toUpperCase() || 'NO SABE',
        posee_discapacidad: document.getElementById('agresorPoseeDiscapacidad')?.value?.toUpperCase() || 'NO SABE',
        tipos_arma: tiposArma,
        tipos_formacion: tiposFormacion,
        discapacidades: discapacidades
    };
}

function recopilarDatosHechos() {
    const entornosViolencia = [];
    document.querySelectorAll('input[name="entornoViolencia"]:checked').forEach(check => {
        entornosViolencia.push(parseInt(check.value));
    });

    const tiposViolencia = [];
    document.querySelectorAll('input[name="tiposViolencia"]:checked').forEach(check => {
        tiposViolencia.push({
            id_tipo_violencia: parseInt(check.value),
            descripcion: null
        });
    });

    return {
        inicio_hechos: document.getElementById('inicioHechos')?.value || new Date().toISOString().split('T')[0],
        ultima_accion_fecha: document.getElementById('ultimaAccionFecha')?.value || new Date().toISOString().split('T')[0],
        ultima_accion_desc: document.getElementById('ultimaAccionTexto')?.value || null,
        relacion_hecho: window.editor?.getData() || document.getElementById('relacionHechos')?.value || null,
        hora_hecho: document.getElementById('horaHecho')?.value || '00:00:00',
        hora_hecho_texto: document.getElementById('horaHechoTexto')?.value || null,
        lugar_hecho: document.getElementById('lugarHecho')?.value || 'CASA',
        lugar_hecho_opc_otro: document.getElementById('lugarHechoOtro')?.value || null,
        id_distrito: parseInt(document.getElementById('distritoHecho')?.value) || null,
        complemento_direccion: document.getElementById('complementoDirHecho')?.value || null,
        punto_referencia: document.getElementById('puntoReferenciaHecho')?.value || null,
        agresor_alcoholizado: document.getElementById('agresorAlcoholizado')?.value === 'Sí',
        agresor_drogado: document.getElementById('agresorDrogado')?.value === 'Sí',
        frecuencia_agresiones: document.getElementById('frecuenciaAgresiones')?.value || 'OCASIONAL',
        frecuencia_agresiones_opc_otra: document.getElementById('otraFrecuencia')?.value || null,
        denuncia_anterior_vif: document.getElementById('denunciaAnteriorVIF')?.value === 'Sí',
        detenciones_anteriores_vif: document.getElementById('detencionesAnterioresVIF')?.value === 'Sí',
        entornos_violencia: entornosViolencia.length > 0 ? entornosViolencia : [1],
        tipos_violencia: tiposViolencia.length > 0 ? tiposViolencia : [{ id_tipo_violencia: 1, descripcion: null }]
    };
}

function recopilarRespuestas() {
    const respuestas = [];

    // Recopilar de TODAS las preguntas (no solo la página actual)
    preguntasAPI.forEach(pregunta => {
        const radioSeleccionado = document.querySelector(`input[name="pregunta_${pregunta.id_pregunta}"]:checked`);

        if (radioSeleccionado) {
            respuestas.push({
                id_pregunta: pregunta.id_pregunta,
                respuesta: radioSeleccionado.value,
                comentario: null // Ya no hay comentarios
            });
        }
    });

    return respuestas;
}

function agregarEstilosPaginacion() {
    const style = document.createElement('style');
    style.textContent = `
        /* Estilos compactos para radio buttons */
        .radio-visual {
            transition: all 0.15s ease;
        }
        
        .radio-visual:hover {
            border-color: #60a5fa;
        }
        
        /* Hover suave en preguntas */
        [class*="hover:bg-gray-50"]:hover {
            background-color: #f9fafb;
        }
        
        [class*="hover:bg-blue-50"]:hover {
            background-color: #eff6ff;
        }
        
        /* Contenedores sin bordes negros */
        .border-gray-200 {
            border-color: #e5e7eb !important;
        }
        
        .border-gray-100 {
            border-color: #f3f4f6 !important;
        }
        
        .border-gray-300 {
            border-color: #d1d5db !important;
        }
        
        /* Botones compactos */
        button.text-xs {
            font-size: 0.75rem;
            line-height: 1rem;
        }
        
        /* Sombra sutil */
        .shadow-sm {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        
        .shadow-md {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// ENVÍO DEL FORMULARIO
// ============================================

async function enviarFormulario() {
    try {
        mostrarLoading('Enviando formulario...');

        const datosDenunciante = recopilarDatosDenunciante();
        const datosVictima = recopilarDatosVictima();
        const datosAgresor = recopilarDatosAgresor();
        const datosHechos = recopilarDatosHechos();
        const respuestas = recopilarRespuestas();

        const denuncianteEsVictima = document.querySelector('input[name="denuncianteEsVictima"]:checked')?.value === 'si';

        const payload = {
            caso: {
                id_usuario: usuarioActual?.id_usuario || 1,
                descripcion_general: null
            },
            denunciante: {
                ...datosDenunciante,
                es_victima: denuncianteEsVictima
            },
            victimas: [datosVictima],
            agresores: [datosAgresor],
            hechos: [datosHechos],
            evaluacion: {
                id_juez: 1,
                respuestas: respuestas,
                observaciones: null
            }
        };

        console.log('Enviando payload:', payload);

        const response = await api.post('/casos', payload);

        if (response.data.success) {
            ocultarLoading();
            mostrarExito('¡Caso registrado exitosamente!');

            const casoCreado = response.data.data;
            actualizarComprobanteConDatosAPI(casoCreado);

            currentStep = totalSteps - 1;
            updateForm();
        } else {
            throw new Error(response.data.message || 'Error al crear el caso');
        }

    } catch (error) {
        console.error('Error al enviar formulario:', error);
        ocultarLoading();

        let mensaje = 'Error al enviar el formulario. ';

        if (error.response?.data?.errors) {
            const errores = error.response.data.errors;
            mensaje += Object.keys(errores).map(key => errores[key].join(', ')).join('; ');
        } else if (error.response?.data?.message) {
            mensaje += error.response.data.message;
        } else {
            mensaje += error.message;
        }

        mostrarError(mensaje);
    }
}

function actualizarComprobanteConDatosAPI(caso) {
    document.getElementById('resumenCaso').textContent = caso.ref_caso || 'N/A';
    document.getElementById('resumenFecha').textContent = formatearFecha(caso.fecha_inicio);
    document.getElementById('resumenDenunciante').textContent = caso.denunciante?.persona?.nombre_completo || '-';
    document.getElementById('resumenVictima').textContent = caso.victimas?.[0]?.persona?.nombre_completo || '-';
    document.getElementById('resumenAgresor').textContent = caso.agresores?.[0]?.persona?.nombre_completo || '-';
    document.getElementById('resumenPreguntas').textContent = `${caso.evaluacion?.respuestas?.length || 0} preguntas respondidas`;

    document.getElementById('printCaso').textContent = caso.ref_caso || 'N/A';
    document.getElementById('printFecha').textContent = formatearFecha(caso.fecha_inicio);
    document.getElementById('printDenunciante').textContent = caso.denunciante?.persona?.nombre_completo || '-';
    document.getElementById('printVictima').textContent = caso.victimas?.[0]?.persona?.nombre_completo || '-';
    document.getElementById('printAgresor').textContent = caso.agresores?.[0]?.persona?.nombre_completo || '-';
    document.getElementById('printPreguntas').textContent = `Nivel de Riesgo: ${caso.evaluacion?.sentencia || 'Pendiente'}`;
}

// ============================================
// FUNCIONES AUXILIARES UI
// ============================================

function mostrarLoading(mensaje = 'Cargando...') {
    let overlay = document.getElementById('loadingOverlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        overlay.innerHTML = `
            <div class="bg-white rounded-lg p-6 shadow-xl">
                <div class="flex items-center space-x-3">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span class="text-gray-700" id="loadingMessage">${mensaje}</span>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    } else {
        document.getElementById('loadingMessage').textContent = mensaje;
        overlay.classList.remove('hidden');
    }
}

function ocultarLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

function mostrarExito(mensaje) {
    mostrarNotificacion(mensaje, 'success');
}

function mostrarError(mensaje) {
    mostrarNotificacion(mensaje, 'error');
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    const colores = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };

    const iconos = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    const notif = document.createElement('div');
    notif.className = `fixed top-4 right-4 ${colores[tipo]} text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-3`;
    notif.innerHTML = `
        <span class="text-2xl">${iconos[tipo]}</span>
        <span>${mensaje}</span>
    `;

    document.body.appendChild(notif);

    setTimeout(() => {
        notif.remove();
    }, 5000);
}

function formatearFecha(fecha) {
    if (!fecha) return '-';

    return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ============================================
// NAVEGACIÓN DEL FORMULARIO
// ============================================

function updateForm() {
    steps.forEach((step, index) => {
        step.classList.toggle('hidden', index !== currentStep);
    });

    progressBar.style.width = `${((currentStep + 1) / totalSteps) * 100}%`;

    if (currentStep === 5) {
        if (preguntasAPI.length === 0) {
            mostrarError('No se pudieron cargar las preguntas.');
        }
        // Renderizar preguntas con paginación
        setTimeout(() => renderizarPreguntasEnFormulario(), 100);
    } else {
        // Restablecer paginación cuando salimos del paso de preguntas
        paginaActual = 0;
    }

    setTimeout(setupConditionalFields, 100);

    prevBtn.classList.toggle('hidden', currentStep === 0);

    if (currentStep === totalSteps - 1) {
        nextBtn.textContent = 'Finalizar';
        nextBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        nextBtn.classList.add('bg-green-600', 'hover:bg-green-700');
    } else if (currentStep === 5) {
        nextBtn.textContent = 'Enviar Evaluación';
        nextBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
        nextBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
    } else {
        nextBtn.textContent = 'Siguiente';
        nextBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
        nextBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
    }
}

nextBtn.addEventListener('click', async () => {
    if (currentStep === 0) {
        const esVictima = document.querySelector('input[name="denuncianteEsVictima"]:checked')?.value;
        if (esVictima === 'si') {
            currentStep++;
            updateForm();
            setTimeout(() => copiarDatosDenuncianteAVictima(), 300);
            return;
        }
    }

    if (currentStep === 5) {
        await enviarFormulario();
        return;
    }

    if (currentStep === totalSteps - 1) {
        mostrarExito('¡Gracias por completar el formulario!');
        return;
    }

    if (currentStep < totalSteps - 1) {
        currentStep++;
        updateForm();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateForm();
    }
});

document.getElementById('imprimirBtn')?.addEventListener('click', function () {
    window.print();
});

// ============================================
// INICIALIZACIÓN CKEDITOR MEJORADA
// ============================================

function inicializarCKEditor() {
    // Verificar si CKEditor está disponible
    if (typeof ClassicEditor === 'undefined') {
        console.warn('⚠️ CKEditor no está disponible. Usando textarea simple.');

        // Hacer visible el textarea como fallback
        const textarea = document.getElementById('relacionHechos');
        if (textarea) {
            textarea.style.display = 'block';
            textarea.className = 'border border-gray-300 rounded-lg p-4 w-full h-64 focus:border-blue-500 focus:ring-1 focus:ring-blue-500';
        }

        return;
    }

    // Si CKEditor está disponible, inicializarlo
    const editorContainer = document.querySelector('#editor-container');
    if (!editorContainer) {
        console.error('❌ No se encontró el contenedor del editor (#editor-container)');
        return;
    }

    // Verificar si ya hay un editor inicializado
    if (window.editor) {
        console.log('✅ CKEditor ya está inicializado');
        return;
    }

    ClassicEditor
        .create(editorContainer, {
            toolbar: {
                items: [
                    'heading', '|',
                    'bold', 'italic', 'underline', '|',
                    'alignment', '|',
                    'numberedList', 'bulletedList', '|',
                    'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', '|',
                    'link', 'insertTable', '|',
                    'undo', 'redo'
                ]
            },
            language: 'es',
            placeholder: 'Describa detalladamente los hechos ocurridos...',
            licenseKey: '',
            removePlugins: ['Markdown']
        })
        .then(editor => {
            window.editor = editor;
            console.log('✅ CKEditor inicializado correctamente');

            // Configurar el botón para usar CKEditor
            const btnGenerar = document.getElementById('generarTextoBtn');
            if (btnGenerar) {
                btnGenerar.addEventListener('click', function (e) {
                    e.preventDefault();
                    generarTextoAutomatico();
                });
            }

            // Actualizar previsualización en tiempo real
            editor.model.document.on('change:data', () => {
                const data = editor.getData();
                const preview = document.getElementById('previewRelacion');
                if (preview) {
                    preview.innerHTML = `<div class="whitespace-pre-line">${data || '<p class="text-gray-600 italic">Texto vacío</p>'}</div>`;
                }
            });
        })
        .catch(error => {
            console.error('❌ Error al inicializar CKEditor:', error);
            console.error('Detalles del error:', error.message);

            // Fallback a textarea
            const textarea = document.getElementById('relacionHechos');
            if (textarea) {
                textarea.style.display = 'block';
                textarea.className = 'border border-gray-300 rounded-lg p-4 w-full h-64 focus:border-blue-500 focus:ring-1 focus:ring-blue-500';
            }
        });
}

// ============================================
// INICIALIZACIÓN PRINCIPAL
// ============================================

document.addEventListener('DOMContentLoaded', async function () {
    console.log('🚀 Inicializando formulario...');

    try {
        // Agregar estilos adicionales
        agregarEstilosPaginacion();

        // Cargar datos iniciales
        await Promise.all([
            cargarCatalogos(),
            cargarPreguntas(),
            cargarUsuarioActual(),
            cargarTribunales()
        ]);

        console.log('✅ Datos iniciales cargados');

        // Inicializar CKEditor
        inicializarCKEditor();

        // Configurar el resto del formulario
        updateForm();
        inicializarCalculadoresEdad();
        inicializarTelefonos();
        inicializarHijos();
        setupConditionalFields();

        // Configurar botón de generar texto
        const btnGenerar = document.getElementById('generarTextoBtn');
        if (btnGenerar) {
            btnGenerar.addEventListener('click', function (e) {
                e.preventDefault();
                console.log('Botón presionado - Generando texto...');
                generarTextoAutomatico();
            });
        }

        // Configurar el botón de imprimir
        const btnImprimir = document.getElementById('imprimirBtn');
        if (btnImprimir) {
            btnImprimir.addEventListener('click', function () {
                console.log('🖨️ Imprimiendo comprobante...');
                window.print();
            });
        }

        // Botón compacto para ir a la primera página
        const btnPrimeraPagina = document.createElement('button');
        btnPrimeraPagina.id = 'irPrimeraPagina';
        btnPrimeraPagina.className = 'mt-2 text-xs text-blue-500 hover:text-blue-700 hover:underline';
        btnPrimeraPagina.textContent = '↻ Volver al inicio';
        btnPrimeraPagina.addEventListener('click', function (e) {
            e.preventDefault();
            paginaActual = 0;
            renderizarPreguntasEnFormulario();
            mostrarExito('Volviendo a la primera página');
        });

        // Insertar botón en el DOM después de cargar
        setTimeout(() => {
            const preguntasContainer = document.getElementById('preguntasForm');
            if (preguntasContainer) {
                // Crear contenedor pequeño para el botón
                const botonContainer = document.createElement('div');
                botonContainer.className = 'text-center mt-2';
                botonContainer.appendChild(btnPrimeraPagina);
                preguntasContainer.parentNode.insertBefore(botonContainer, preguntasContainer.nextSibling);
            }
        }, 1000);

    } catch (error) {
        console.error('❌ Error en inicialización:', error);
        mostrarError('Error al inicializar el formulario.');
    }
});

console.log('✅ form.js cargado y listo');