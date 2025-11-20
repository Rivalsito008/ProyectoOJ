// ===== INICIALIZACIÓN DE TEMA Y CONFIGURACIÓN =====
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

// ===== DETECTAR CAMBIOS EN PREFERENCIA DE SISTEMA =====
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const temaActual = localStorage.getItem('theme-preference') || 'auto';
    if (temaActual === 'auto') {
        const nuevoTema = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', nuevoTema);
    }
});

// ===== FUNCIONALIDAD DE TABS (SI SE NECESITA) =====
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
        const selectedContent = document.getElementById(tabName);
        if (selectedContent) {
            selectedContent.classList.add('active');
        }
    });
});

// ===== MAPA INTERACTIVO =====
let departamentoSeleccionado = null;

// Datos de departamentos (puedes mover esto a un archivo separado o cargar desde API)
const departamentosData = {
    'Ahuachapán': {
        casos: 45,
        riesgo: 'Moderado',
        actualizacion: '20/11/2024'
    },
    'Santa Ana': {
        casos: 78,
        riesgo: 'Alto',
        actualizacion: '20/11/2024'
    },
    'Sonsonate': {
        casos: 34,
        riesgo: 'Bajo',
        actualizacion: '20/11/2024'
    },
    'La Libertad': {
        casos: 92,
        riesgo: 'Extremo',
        actualizacion: '20/11/2024'
    },
    'San Salvador': {
        casos: 156,
        riesgo: 'Extremo',
        actualizacion: '20/11/2024'
    },
    'Chalatenango': {
        casos: 23,
        riesgo: 'Bajo',
        actualizacion: '20/11/2024'
    },
    'Cuscatlán': {
        casos: 41,
        riesgo: 'Moderado',
        actualizacion: '20/11/2024'
    },
    'La Paz': {
        casos: 67,
        riesgo: 'Alto',
        actualizacion: '20/11/2024'
    },
    'Cabañas': {
        casos: 19,
        riesgo: 'Bajo',
        actualizacion: '20/11/2024'
    },
    'San Vicente': {
        casos: 38,
        riesgo: 'Moderado',
        actualizacion: '20/11/2024'
    },
    'Usulután': {
        casos: 54,
        riesgo: 'Alto',
        actualizacion: '20/11/2024'
    },
    'San Miguel': {
        casos: 89,
        riesgo: 'Alto',
        actualizacion: '20/11/2024'
    },
    'Morazán': {
        casos: 27,
        riesgo: 'Bajo',
        actualizacion: '20/11/2024'
    },
    'La Unión': {
        casos: 31,
        riesgo: 'Moderado',
        actualizacion: '20/11/2024'
    }
};

/**
 * Inicializar el mapa interactivo
 */
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

/**
 * Seleccionar/deseleccionar un departamento
 */
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

/**
 * Actualizar la información del departamento en el panel
 */
function actualizarInformacionDepartamento(nombre) {
    const deptData = departamentosData[nombre];

    if (deptData) {
        // Actualizar el nombre del departamento
        const deptNameElement = document.querySelector('.map-info-item:first-child');
        if (deptNameElement) {
            deptNameElement.innerHTML = `<span class="map-info-label">Departamento:</span>
                                <span class="map-info-value dept-name">${nombre}</span>`;
        }

        // Actualizar los demás datos
        const casesElement = document.getElementById('dept-cases');
        if (casesElement) {
            casesElement.textContent = deptData.casos;
        }

        const riesgoElement = document.getElementById('dept-risk');
        if (riesgoElement) {
            riesgoElement.textContent = deptData.riesgo;

            // Aplicar clase de color según el nivel de riesgo
            riesgoElement.className = 'map-info-value';
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
        }

        const updateElement = document.getElementById('dept-update');
        if (updateElement) {
            updateElement.textContent = deptData.actualizacion;
        }
    }
}

/**
 * Resetear la selección del mapa
 */
function resetearSeleccion() {
    const paths = document.querySelectorAll('#interactive-map path');
    paths.forEach(path => {
        path.classList.remove('selected', 'riesgo-bajo', 'riesgo-moderado', 'riesgo-alto', 'riesgo-extremo');
    });
    departamentoSeleccionado = null;
}

// ===== GRÁFICOS CON CHART.JS =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar mapa si existe
    const mapElement = document.querySelector('#interactive-map');
    if (mapElement) {
        inicializarMapa();
    }

    // --- GRÁFICO 1: Distribución de Víctimas por Rango de Edad (Vertical) ---
    const ageCanvas = document.getElementById('ageDistributionChart');
    if (ageCanvas) {
        const ageCtx = ageCanvas.getContext('2d');
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
    }

    // --- GRÁFICO 2: Prevalencia de Tipos de Violencia (HORIZONTAL) ---
    const violenceCanvas = document.getElementById('violencePrevalenceChart');
    if (violenceCanvas) {
        const violenceCtx = violenceCanvas.getContext('2d');
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
    }
});