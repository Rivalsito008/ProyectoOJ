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

// DATOS QUEMADOS DE TRIBUNALES (CORREGIDOS)
const tribunales = [
    {
        id: 1,
        nombre: "Sala de lo Constitucional",
        tipo: "Sala de la Corte Suprema",
        numeracion: "Único",
        materia: "Constitucional",
        departamento: "San Salvador",
        municipio: "San Salvador Centro",
        distrito: "San Salvador",
        direccion: "Centro Judicial Isidro Menéndez",
        estado: "Activo"
    },
    {
        id: 2,
        nombre: "Cámara Segunda de lo Civil",
        tipo: "Cámara",
        numeracion: "Segundo",
        materia: "Civil",
        departamento: "San Salvador",
        municipio: "San Salvador Centro",
        distrito: "San Salvador",
        direccion: "Centro Judicial Isidro Menéndez",
        estado: "Activo"
    },
    {
        id: 3,
        nombre: "Juzgado Tercero de Familia",
        tipo: "Juzgado",
        numeracion: "Tercero",
        materia: "Familia",
        departamento: "La Libertad",
        municipio: "La Libertad Sur",
        distrito: "Santa Tecla",
        direccion: "Centro Judicial Integrado de Santa Tecla",
        estado: "Inactivo"
    },
    {
        id: 4,
        nombre: "Tribunal Especializado de Sentencia",
        tipo: "Tribunal Especializado",
        numeracion: "Primero",
        materia: "Penal (Sentencia)",
        departamento: "San Salvador",
        municipio: "San Salvador Centro",
        distrito: "San Salvador",
        direccion: "Centro Judicial Isidro Menéndez",
        estado: "Activo"
    },
    {
        id: 5,
        nombre: "Juzgado de Paz",
        tipo: "Juzgado de Paz",
        numeracion: "Sin numeración",
        materia: "Multipropósito",
        departamento: "Santa Ana",
        municipio: "Santa Ana Centro",
        distrito: "Santa Ana",
        direccion: "Palacio de Justicia de Santa Ana",
        estado: "Activo"
    }
];

// Cargar tablas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    cargarTodasLasTablas();
    inicializarModal();
    inicializarTabs();
    inicializarSelects();
});

function cargarTodasLasTablas() {
    cargarTablaPorEstado('todo');
    cargarTablaPorEstado('activo');
    cargarTablaPorEstado('inactivo');
}

function cargarTablaPorEstado(estado) {
    const tbodyId = `tabla${estado.charAt(0).toUpperCase() + estado.slice(1)}`;
    const tbody = document.getElementById(tbodyId);

    if (!tbody) {
        console.error(`No se encontró el tbody con id: ${tbodyId}`);
        return;
    }

    tbody.innerHTML = "";

    // Filtrar tribunales según el estado
    let tribunalesFiltrados = [];

    if (estado === 'todo') {
        tribunalesFiltrados = tribunales;
    } else {
        tribunalesFiltrados = tribunales.filter(t =>
            t.estado.toLowerCase() === estado.toLowerCase()
        );
    }

    if (tribunalesFiltrados.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td colspan="9" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-lg">
                No hay tribunales con estado ${estado}
            </td>
        `;
        tbody.appendChild(tr);
        return;
    }

    tribunalesFiltrados.forEach(t => {
        const tr = document.createElement("tr");
        tr.className = "border-b border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300";
        tr.innerHTML = `
            <td class="px-6 py-4 text-gray-900 dark:text-white font-medium">${t.nombre}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center text-gray-900 dark:text-white">${t.tipo}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${t.numeracion}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${t.materia}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${t.departamento}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${t.municipio}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${t.distrito}</td>
            <td class="px-6 py-4 text-gray-900 dark:text-white">${t.direccion}</td>
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