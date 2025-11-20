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

// DATOS QUEMADOS DE TRIBUNALES
const tribunales = [
    { 
        id: 1, 
        nombre: "Sala de lo Constitucional", 
        tipo: "Sala de la Corte Suprema", 
        numeracion: "Único", 
        materia: "Constitucional", 
        departamento: "San Salvador", 
        municipio: "San Salvador", 
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
        municipio: "San Salvador", 
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
        municipio: "Santa Tecla", 
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
        municipio: "San Salvador", 
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
        municipio: "Santa Ana", 
        direccion: "Palacio de Justicia de Santa Ana", 
        estado: "Activo" 
    },
    { 
        id: 6, 
        nombre: "Cámara de lo Laboral", 
        tipo: "Cámara", 
        numeracion: "Único", 
        materia: "Laboral", 
        departamento: "San Miguel", 
        municipio: "San Miguel", 
        direccion: "Palacio de Justicia de San Miguel", 
        estado: "Inactivo" 
    },
    { 
        id: 7, 
        nombre: "Juzgado Especializado para Mujeres", 
        tipo: "Juzgado Especializado", 
        numeracion: "Primero", 
        materia: "Violencia contra la Mujer", 
        departamento: "La Libertad", 
        municipio: "Santa Tecla", 
        direccion: "Centro Judicial Integrado de Santa Tecla", 
        estado: "Activo" 
    },
    { 
        id: 8, 
        nombre: "Sala de lo Penal", 
        tipo: "Sala de la Corte Suprema", 
        numeracion: "Único", 
        materia: "Penal", 
        departamento: "San Salvador", 
        municipio: "San Salvador", 
        direccion: "Centro Judicial Isidro Menéndez", 
        estado: "Activo" 
    }
];

// Cargar tablas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
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
            <td colspan="8" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-lg">
                No hay tribunales con estado ${estado}
            </td>
        `;
        tbody.appendChild(tr);
        return;
    }

    tribunalesFiltrados.forEach(t => {
        const tr = document.createElement("tr");
        tr.className = "border-b border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300";
        tr.innerHTML = `
            <td class="px-6 py-4 text-gray-900 dark:text-white font-medium">${t.nombre}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${t.tipo}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${t.numeracion}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${t.materia}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${t.departamento}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${t.municipio}</td>
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

// FUNCIÓN PARA INICIALIZAR SELECTS DINÁMICOS
function inicializarSelects() {
    /* ---------------------------------------------------------
       1. Municipios según departamento
    --------------------------------------------------------- */
    const municipiosPorDepto = {
        "San Salvador": ["Aguilares", "El Paisnal", "Guazapa", "Soyapango", "Ilopango", "San Martin", "Tonacatepeque", "San Marcos", "Panchimalco", "Santiago Texacuangos", "Santo Tomás", "Rosario de Mora", "Apopa", "Nejapa", "San Salvador", "Mejicanos", "Ayutuxtepeque", "Cuscatancingo", "Ciudad Delgado"],
        "La Libertad": ["Antiguo Cuscatlán", "Chiltiupán", "Ciudad Arce", "Colón", "Comasagua", "Huizúcar", "Jayaque", "Jicalapa", "La Libertad", "Nuevo Cuscatlan", "Quezaltepeque", "Sacacoyo", "San Juan Opico", "San José Villanueva", "San Matías", "San Pablo Tacachico", "Santa Tecla", "Talnique", "Tamanique", "Teotepeque", "Tepecoyo", "Zaragoza"],
        "Santa Ana": ["Masahuat", "Metapán", "Santa Rosa Guachipilín", "Texistepeque", "Santa Ana", "Coatepeque", "El Congo", "Candelaria de la Frontera", "Chalchuapa", "El Porvenir", "San Antonio Pajonal", "San Sebastián Salitrillo", "Santiago de la Frontera"],
        "San Miguel": ["San Miguel", "Comacarán", "Uluazapa", "Moncagua", "Quelepa", "Chirilagua", "Ciudad Barrios", "Sesori", "Nuevo Edén de San Juan", "San Gerardo", "San Luis de La Reina", "Carolina", "San Antonio del Mosco", "Chalpeltique", "Lolotique", "Nueva Guadalupe", "Chinameca", "San Jorge", "San Rafael Oriente", "El Tránsito"],
        "Sonsonate": ["Juayúa", "Nahuizalco", "Salcoatitán", "Santa Catarina Masahuat", "Sonsonate", "Sonzacate", "Nahuilingo", "San Antonio del Monte", "Santo Domingo de Guzmán", "Izalco", "Armenia", "Caluco", "San Julián", "Cuisnahuat", "Santa Isabel Ishuatán", "Acajutla"],
        "Usulután": ["Santiago de María", "Alegría", "Berlín", "Mercedes Umaña", "Jucuapa", "El Triunfo", "Estanzuelas", "San Buenaventura", "Nueva Granada", "Jiquilisco", "Puerto El Triunfo", "San Agustín", "San Francisco Javier", "Usulután", "Jucuarán", "San Dionisio", "Concepción Batres", "Santa María", "Ozatlán", "Santa Elena", "California", "Ereguayquín"],
        "La Unión": ["Anamorós", "Bolívar", "Concepción de Oriente", "El Sauce", "Lislique", "Nueva Esparta", "Pasaquina", "Poloros", "San José La Fuente", "Santa Rosa de Lima", "La Union", "Conchagua", "El Carmen", "Intipucá", "Meanguera del Golfo", "San Alejo", "Yayantique", "Yucuaquín"],
        "Morazán": ["Corinto", "Arambala", "El Jocoatique", "El Rosario", "Joateca", "Meanguera", "Perquín", "San Fernando", "San Isidro", "Torola", "San Francisco Gotera", "Cacaopera", "Chilanga", "Delicias de Concepción", "Gualococti", "Loloquiquilco", "Osicala", "Sensembra", "Sociedad", "Yamabal"],
        "Chalatenango": ["Chalatenango", "Citalá", "La Palma", "San Ignacio", "Potonico", "San Rafael", "Arcatao", "Azacualpa", "Las Vueltas", "Nueva Concepción", "Tejutla", "El Paraíso", "San Antonio de la Cruz", "San Isidro Labradro", "San Jose Cancasque", "San Miguel de Mercedes", "San Francisco Lempa", "Dulce Nombre de María", "San Antonio Los Ranchos", "San Emigdio", "San Luis del Carmen", "San Marcos de la Sierra", "Santa Rita", "Nombre de Jesús", "Ojos de Agua", "La Laguna"],
        "Cabañas": ["Sensuntepeque", "Guacotecti", "San Isidro", "Victoria", "Dolores", "San Ildefonso", "Villa Hidalgo", "Ilobasco", "Cinquera"],
        "Cuscatlán": ["Cojutepeque", "San Pedro Pelulapán", "San Rafael Cedro", "Candelaria", "Monte San Juan", "El Carmen", "Santa Cruz Michapa", "Tenancingo", "Suchitoto", "San Bartolomé Perulapía", "San Jose Guayabal", "Oratorio de Concepción", "San Cristobal", "Santa Cruz Analquito", "San Ramon", "El Rosario", "Concepción"],
        "La Paz": ["Zacatecoluca", "San Juan Nonualco", "Santiango Nonualco", "San Luis Talpa", "San Pedro Nonualco", "Cuyultitán", "Santa María Ostuma", "San Miguel Tepezontes", "San Pedro Masahuat", "El Rosario", "San Emigdio", "San Francisco Chinameca", "Paraíso de Osorio", "Jerusalén", "La Montañita", "San Ramón", "Santa Marta", "San Felipe", "Guadalupe"],
        "San Vicente": ["San Vicente", "Apastepeque", "Santa Clara", "San Esteban Catarina", "San Ildefonso", "San Sebastián", "Santo Domingo", "Tecoluca", "Guadalupe"],
        "Ahuachapán": ["Atiquizaya", "El Refugio", "San Lorenzo", "Turín", "Chalchuapa", "Ahuachapán", "Apaneca", "Concepción de Ataco", "Tacuba", "Guaymango", "San Pedro Puxtla"]
    };

    const departamentoSelect = document.getElementById("departamento");
    if (departamentoSelect) {
        departamentoSelect.addEventListener("change", function () {
            const depto = this.value;
            const municipioSelect = document.getElementById("municipio");

            municipioSelect.innerHTML = "<option value=''>Seleccione municipio...</option>";

            if (municipiosPorDepto[depto]) {
                municipiosPorDepto[depto].forEach(m => {
                    municipioSelect.innerHTML += `<option>${m}</option>`;
                });
            }
        });
    }

    /* ---------------------------------------------------------
       2. Materias según tipo de tribunal
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
        boton.addEventListener('click', function(e) {
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
        boton.addEventListener('click', function(e) {
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