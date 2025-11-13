// ========================================
// APLICAR CONFIGURACIONES INICIALES
// ========================================
(function() {
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

// ========================================
// SIDEBAR HOVER EFFECT
// ========================================
const sidebar = document.getElementById('sidebar');
const logoCompact = document.getElementById('logo-compact');
const logoFull = document.getElementById('logo-full');
const navLabels = document.querySelectorAll('.nav-label');
const navItems = document.querySelectorAll('.nav-item');

sidebar.addEventListener('mouseenter', () => {
    sidebar.classList.remove('sidebar-collapsed');
    sidebar.classList.add('sidebar-expanded');
    logoCompact.style.display = 'none';
    logoFull.style.display = 'block';
    navLabels.forEach(label => {
        label.style.display = 'inline-block';
    });
    navItems.forEach(item => {
        item.classList.remove('justify-center');
    });
});

sidebar.addEventListener('mouseleave', () => {
    sidebar.classList.remove('sidebar-expanded');
    sidebar.classList.add('sidebar-collapsed');
    logoCompact.style.display = 'flex';
    logoFull.style.display = 'none';
    navLabels.forEach(label => {
        label.style.display = 'none';
    });
    navItems.forEach(item => {
        item.classList.add('justify-center');
    });
});

// ========================================
// DROPDOWN DE PERFIL
// ========================================
const profileButton = document.getElementById('profileButton');
const profileDropdown = document.getElementById('profileDropdown');

profileButton.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('hidden');
});

// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!profileButton.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.add('hidden');
    }
});

function cerrarDropdown() {
    profileDropdown.classList.add('hidden');
}

// Función para cerrar sesión
function cerrarSesion() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        window.location.href = 'logout.php';
    }
}

// Cerrar dropdown con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        cerrarDropdown();
    }
});

// ========================================
// TAB FUNCTIONALITY
// ========================================
const browserTabs = document.querySelectorAll('.browser-tab');
const tabContents = document.querySelectorAll('.tab-content');

browserTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');

        // Remove active class from all tabs
        browserTabs.forEach(t => t.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Remove active class from all contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // Add active class to selected content
        document.getElementById(tabName).classList.add('active');
    });
});

// ========================================
// DETECTAR CAMBIOS EN PREFERENCIA DE SISTEMA
// ========================================
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const temaActual = localStorage.getItem('theme-preference') || 'auto';
    if (temaActual === 'auto') {
        const nuevoTema = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', nuevoTema);
    }
});

// ========================================
// DATOS DE DEPARTAMENTOS
// ========================================
const departamentosData = {
    "Ahuachapán": {
        casos: 15,
        riesgo: "Moderado",
        actualizacion: "2024-01-15",
    },
    "Santa Ana": {
        casos: 28,
        riesgo: "Alto",
        actualizacion: "2024-01-14",
    },
    "Sonsonate": {
        casos: 12,
        riesgo: "Bajo",
        actualizacion: "2024-01-16",
    },
    "Chalatenango": {
        casos: 8,
        riesgo: "Bajo",
        actualizacion: "2024-01-13",
    },
    "La Libertad": {
        casos: 35,
        riesgo: "Alto",
        actualizacion: "2024-01-15",
    },
    "San Salvador": {
        casos: 42,
        riesgo: "Extremo",
        actualizacion: "2024-01-16",
    },
    "Cuscatlán": {
        casos: 18,
        riesgo: "Moderado",
        actualizacion: "2024-01-14",
    },
    "La Paz": {
        casos: 22,
        riesgo: "Moderado",
        actualizacion: "2024-01-15",
    },
    "Cabañas": {
        casos: 6,
        riesgo: "Bajo",
        actualizacion: "2024-01-12",
    },
    "San Vicente": {
        casos: 14,
        riesgo: "Moderado",
        actualizacion: "2024-01-14",
    },
    "Usulután": {
        casos: 25,
        riesgo: "Alto",
        actualizacion: "2024-01-15",
    },
    "San Miguel": {
        casos: 31,
        riesgo: "Alto",
        actualizacion: "2024-01-16",
    },
    "Morazán": {
        casos: 9,
        riesgo: "Bajo",
        actualizacion: "2024-01-13",
    },
    "La Unión": {
        casos: 19,
        riesgo: "Moderado",
        actualizacion: "2024-01-14",
    }
};

// ========================================
// VARIABLES GLOBALES DEL MAPA
// ========================================
let departamentoSeleccionado = null;

// ========================================
// FUNCIONES DEL MAPA INTERACTIVO
// ========================================

// Función para inicializar el mapa interactivo
function inicializarMapa() {
    const paths = document.querySelectorAll('#interactive-map path');

    paths.forEach(path => {
        // Agregar evento click a cada departamento
        path.addEventListener('click', function() {
            const nombreDepto = this.getAttribute('name');
            seleccionarDepartamento(nombreDepto, this);
        });

        // Agregar eventos hover
        path.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.classList.add('highlighted');
            }
        });

        path.addEventListener('mouseleave', function() {
            this.classList.remove('highlighted');
        });
    });
}

// Función para seleccionar/deseleccionar un departamento
function seleccionarDepartamento(nombre, elemento) {
    const paths = document.querySelectorAll('#interactive-map path');

    // Si ya está seleccionado, deseleccionar
    if (departamentoSeleccionado === nombre) {
        paths.forEach(path => {
            path.classList.remove('selected', 'riesgo-bajo', 'riesgo-moderado', 'riesgo-alto', 'riesgo-extremo');
        });
        departamentoSeleccionado = null;
        return;
    }

    // Deseleccionar todos y seleccionar el nuevo
    paths.forEach(path => {
        path.classList.remove('selected', 'riesgo-bajo', 'riesgo-moderado', 'riesgo-alto', 'riesgo-extremo');
    });

    // Obtener datos del departamento para aplicar clase de riesgo
    const deptData = departamentosData[nombre];

    // Aplicar clases al elemento seleccionado
    elemento.classList.add('selected');

    // Aplicar clase de riesgo según el nivel
    if (deptData) {
        switch (deptData.riesgo.toLowerCase()) {
            case 'bajo':
                elemento.classList.add('riesgo-bajo');
                break;
            case 'moderado':
                elemento.classList.add('riesgo-moderado');
                break;
            case 'alto':
                elemento.classList.add('riesgo-alto');
                break;
            case 'extremo':
                elemento.classList.add('riesgo-extremo');
                break;
        }
    }

    departamentoSeleccionado = nombre;

    // Actualizar información del panel
    actualizarInformacionDepartamento(nombre);
}

// Función para actualizar la información del departamento
function actualizarInformacionDepartamento(nombre) {
    const deptData = departamentosData[nombre];

    if (deptData) {
        // Actualizar el nombre del departamento
        const deptNameElement = document.querySelector('.map-info-item:first-child');
        deptNameElement.innerHTML = `<span class="map-info-label">Departamento:</span>
                        <span class="map-info-value dept-name">${nombre}</span>`;

        // Actualizar los demás datos con clases de color según el riesgo
        document.getElementById('dept-cases').textContent = deptData.casos;

        const riesgoElement = document.getElementById('dept-risk');
        riesgoElement.textContent = deptData.riesgo;

        // Aplicar clase de color según el nivel de riesgo
        riesgoElement.className = 'map-info-value'; // Reset classes
        switch (deptData.riesgo.toLowerCase()) {
            case 'bajo':
                riesgoElement.classList.add('riesgo-bajo');
                break;
            case 'moderado':
                riesgoElement.classList.add('riesgo-moderado');
                break;
            case 'alto':
                riesgoElement.classList.add('riesgo-alto');
                break;
            case 'extremo':
                riesgoElement.classList.add('riesgo-extremo');
                break;
        }

        document.getElementById('dept-update').textContent = deptData.actualizacion;
    }
}

// Función para resetear la selección
function resetearSeleccion() {
    const paths = document.querySelectorAll('#interactive-map path');
    paths.forEach(path => {
        path.classList.remove('selected', 'riesgo-bajo', 'riesgo-moderado', 'riesgo-alto', 'riesgo-extremo');
    });
    departamentoSeleccionado = null;
}

// ========================================
// INICIALIZAR AL CARGAR EL DOM
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    inicializarMapa();
});