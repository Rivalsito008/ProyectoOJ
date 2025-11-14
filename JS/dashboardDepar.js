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

// Sidebar hover effect
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

// Dropdown de perfil
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

// Tab functionality
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

// Detectar cambios en preferencia de sistema (para modo auto)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const temaActual = localStorage.getItem('theme-preference') || 'auto';
    if (temaActual === 'auto') {
        const nuevoTema = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', nuevoTema);
    }
});


// Variables globales
let departamentoSeleccionado = null;

// Función para inicializar el mapa interactivo
function inicializarMapa() {
    const paths = document.querySelectorAll('#interactive-map path');

    paths.forEach(path => {
        // Agregar evento click a cada departamento
        path.addEventListener('click', function () {
            const nombreDepto = this.getAttribute('name');
            seleccionarDepartamento(nombreDepto, this);
        });

        // Agregar eventos hover
        path.addEventListener('mouseenter', function () {
            if (!this.classList.contains('selected')) {
                this.classList.add('highlighted');
            }
        });

        path.addEventListener('mouseleave', function () {
            this.classList.remove('highlighted');
        });
    });
}

// Función para seleccionar/deseleccionar un departamento - CORREGIDA
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

// Inicializar el mapa cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    inicializarMapa();
});

document.addEventListener('DOMContentLoaded', () => {

    // --- GRÁFICO 1: Distribución de Víctimas por Rango de Edad (Vertical) ---
    const ageCtx = document.getElementById('ageDistributionChart').getContext('2d');
    const ageData = {
        labels: ['<18-25', '26-35', '36-45', '46-55', '56+'],
        datasets: [{
            label: 'Número de Víctimas',
            data: [110, 55, 50, 25, 10],
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
            borderRadius: 6,
            barThickness: 40
        }]
    };

    new Chart(ageCtx, {
        type: 'bar',
        data: ageData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' Víctimas';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Número de Víctimas',
                        font: { size: 14 }
                    }
                },
                x: {
                    grid: { display: false },
                    title: {
                        display: true,
                        text: 'Rangos de Edad',
                        font: { size: 14 }
                    }
                }
            }
        }
    });

    // --- GRÁFICO 2: Prevalencia de Tipos de Violencia (HORIZONTAL) ---
    const violenceCtx = document.getElementById('violencePrevalenceChart').getContext('2d');
    const violenceData = {
        labels: ['Patrimonial', 'Sexual', 'Económica', 'Física', 'Psicológica'],
        datasets: [{
            label: 'Número de Casos',
            data: [30, 50, 80, 120, 150],
            backgroundColor: 'rgba(124, 58, 237, 0.8)',
            borderColor: 'rgba(124, 58, 237, 1)',
            borderWidth: 1,
            borderRadius: 6,
            barThickness: 30
        }]
    };

    new Chart(violenceCtx, {
        type: 'bar',
        data: violenceData,
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ': ' + context.parsed.x + ' Casos';
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Número de Casos',
                        font: { size: 14 }
                    }
                },
                y: {
                    grid: { display: false },
                    title: {
                        display: true,
                        text: 'Tipo de Violencia',
                        font: { size: 14 }
                    }
                }
            }
        }
    });
});