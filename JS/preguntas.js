
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

// Modal de Preguntas - Funcionalidad completa
const openQuestionBtn = document.getElementById('openQuestionBtn');
const questionFormModal = document.getElementById('questionFormModal');
const closeQuestionBtn = document.getElementById('closeQuestionBtn');
const cancelQuestionBtn = document.getElementById('cancelQuestionBtn');
const btnGuardarPregunta = document.getElementById('btnGuardarPregunta');

// Abrir modal
openQuestionBtn.addEventListener('click', () => {
    questionFormModal.classList.remove('hidden');
    questionFormModal.classList.add('flex');
    // Limpiar formulario al abrir
    limpiarFormulario();
});

// Cerrar modal
function closeQuestionModal() {
    questionFormModal.classList.remove('flex');
    questionFormModal.classList.add('hidden');
}

closeQuestionBtn.addEventListener('click', closeQuestionModal);
cancelQuestionBtn.addEventListener('click', closeQuestionModal);

// Cerrar modal al hacer clic fuera
questionFormModal.addEventListener('click', (e) => {
    if (e.target === questionFormModal) {
        closeQuestionModal();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && questionFormModal.classList.contains('flex')) {
        closeQuestionModal();
    }
});

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById('pregunta').value = '';
    document.getElementById('ambito').selectedIndex = 0;
    document.getElementById('riesgo').selectedIndex = 0;
    document.getElementById('estado').selectedIndex = 0;
}

// Guardar pregunta
btnGuardarPregunta.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const pregunta = document.getElementById('pregunta').value.trim();
    const ambito = document.getElementById('ambito').value;
    const riesgo = document.getElementById('riesgo').value;
    const estado = document.getElementById('estado').value;

    // Validaciones básicas
    if (!pregunta) {
        alert('Por favor, escribe la pregunta');
        return;
    }

    if (!ambito) {
        alert('Por favor, selecciona un ámbito');
        return;
    }

    if (!riesgo) {
        alert('Por favor, selecciona un nivel de riesgo');
        return;
    }

    // Crear objeto con los datos
    const nuevaPregunta = {
        id: Date.now(), // ID temporal
        pregunta: pregunta,
        ambito: ambito,
        riesgo: riesgo,
        estado: estado,
        fechaCreacion: new Date().toISOString()
    };

    // Aquí puedes enviar los datos a tu backend
    console.log('Pregunta guardada:', nuevaPregunta);
    
    // Mostrar confirmación
    alert('Pregunta guardada correctamente');
    
    // Cerrar modal
    closeQuestionModal();
    
    // Aquí puedes agregar la lógica para actualizar la tabla
    // agregarPreguntaATabla(nuevaPregunta);
});

// Función opcional para agregar a la tabla (si quieres ver los resultados inmediatamente)
function agregarPreguntaATabla(pregunta) {
    // Esta función agregaría la pregunta a la tabla correspondiente
    // según el nivel de riesgo
    console.log('Agregando a tabla:', pregunta);
    
    // Ejemplo de implementación:
    const tabla = document.querySelector(`#${pregunta.riesgo} tbody`);
    if (tabla) {
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
            <td class="px-6 py-4">${pregunta.id}</td>
            <td class="px-6 py-4">${pregunta.pregunta}</td>
            <td class="px-6 py-4">${pregunta.ambito}</td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 rounded-full text-xs ${
                    pregunta.estado === 'activa' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }">
                    ${pregunta.estado}
                </span>
            </td>
            <td class="px-6 py-4">
                <button class="text-blue-500 hover:text-blue-700 mr-2">Editar</button>
                <button class="text-red-500 hover:text-red-700">Eliminar</button>
            </td>
        `;
        tabla.appendChild(nuevaFila);
    }
}
