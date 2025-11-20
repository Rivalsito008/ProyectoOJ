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

// CORREGIDO: Cambiar "preguntas" por "usuarios" y agregar propiedades faltantes
const usuarios = [
    { id: 1, nombre: "Iván Alejandro", apellido: "Barrera Escalante", email: "ivanbarrera@email.com", rol: "Administrador", estado: "Activo" },
    { id: 2, nombre: "Carlos Manuel", apellido: "Gonzales Pineda", email: "carlosgonzales@email.com", rol: "Notario", estado: "Inactivo" },
    { id: 3, nombre: "Mario Alberto", apellido: "Mejia Cruz", email: "marioalberto@email.com", rol: "Administrador", estado: "Activo" },
    { id: 4, nombre: "Yahir Alejandro", apellido: "Palma Gutierres", email: "yahirpalma@email.com", rol: "Juez", estado: "Inactivo" },
    { id: 5, nombre: "Hector Jose", apellido: "Moreno Argueta", email: "hectorjose@email.com", rol: "Notario", estado: "Activo" },
    { id: 6, nombre: "Esteban Miguel", apellido: "Landaverde Argueta", email: "estebanmiguel@email.com", rol: "Administrador", estado: "Activo" },
    { id: 7, nombre: "Rodrigo Andres", apellido: "Barrera Escalante", email: "rodrigoandres@email.com", rol: "Administrador", estado: "Inactivo" },
    { id: 8, nombre: "Juan Pablo", apellido: "Barrera Escalante", email: "jpbarrera@email.com", rol: "Juez", estado: "Activo" },
];

// CORREGIDO: Llamar a la función cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    cargarTodasLasTablas();
    inicializarModal();
    inicializarTabs();
});

function cargarTodasLasTablas() {
    cargarTablaPorNivel('todo');
    cargarTablaPorNivel('activo');
    cargarTablaPorNivel('inactivo');
}

function cargarTablaPorNivel(nivel) {
    const tbodyId = `tabla${nivel.charAt(0).toUpperCase() + nivel.slice(1)}`;
    const tbody = document.getElementById(tbodyId);

    if (!tbody) {
        console.error(`No se encontró el tbody con id: ${tbodyId}`);
        return;
    }

    tbody.innerHTML = "";

    // Filtrar usuarios según el nivel
    let usuariosFiltradas = [];

    if (nivel === 'todo') {
        usuariosFiltradas = usuarios;
    } else {
        usuariosFiltradas = usuarios.filter(p =>
            p.nivel.toLowerCase() === nivel.toLowerCase()
        );
    }

    if (usuariosFiltradas.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td colspan="6" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-lg">
                No hay usuarios de estado ${nivel}
            </td>
        `;
        tbody.appendChild(tr);
        return;
    }

    // En la función cargarTablaPorNivel, dentro del forEach:
    usuariosFiltradas.forEach(p => {
        const tr = document.createElement("tr");
        tr.className = "border-b border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300";

        // Determinar clases CSS según el ESTADO
        let estadoClass = "";
        let estadoText = p.estado;

        switch (p.estado.toLowerCase()) {
            case 'activo':
                estadoClass = "bg-green-500 text-white";
                break;
            case 'inactivo':
                estadoClass = "bg-red-600 text-white";
                break;
            default:
                estadoClass = "bg-gray-500 text-white";
        }

        // Determinar clases CSS según el ROL - NUEVO
        let rolClass = "";
        let rolText = p.rol;

        switch (p.rol.toLowerCase()) {
            case 'administrador':
                rolClass = "bg-red-500 text-white";
                break;
            case 'notario':
                rolClass = "bg-blue-500 text-white";
                break;
            case 'juez':
                rolClass = "bg-purple-500 text-white";
                break;
            default:
                rolClass = "bg-gray-500 text-white";
        }

        tr.innerHTML = `
        <td class="px-6 py-4 text-gray-900 dark:text-white font-medium">${p.nombre}</td>
        <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${p.apellido}</td>
        <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${p.email}</td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex items-center justify-center w-24 px-3 py-1 rounded-full text-xs font-semibold relative overflow-hidden state-badge-shimmer ${rolClass}">
                ${rolText}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex items-center justify-center w-20 px-3 py-1 rounded-full text-xs font-semibold relative overflow-hidden state-badge-shimmer ${estadoClass}">
                ${estadoText}
            </span>
        </td>
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

// CORREGIDO: Función para inicializar el modal
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

// CORREGIDO: Función para inicializar tabs
function inicializarTabs() {
    const tabs = document.querySelectorAll('.browser-tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');

            // Remover active de todos los tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Remover active de todos los contenidos
            contents.forEach(c => c.classList.remove('active'));

            // Agregar active al tab clickeado
            tab.classList.add('active');

            // Agregar active al contenido correspondiente
            const targetContent = document.getElementById(tabName);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Recargar la tabla correspondiente
            if (tabName === 'Todo') {
                cargarTablaPorNivel('todo');
            } else if (tabName === 'activo') {
                cargarTablaPorNivel('activo');
            } else if (tabName === 'inactivo') {
                cargarTablaPorNivel('inactivo');
            }
        });
    });
}

// -------------------------------
// FUNCIÓN PARA AGREGAR EVENT LISTENERS A BOTONES
// -------------------------------
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

            // Aquí iría la lógica para editar
            console.log('Editar usuario');
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

            // Aquí iría la lógica para eliminar
            console.log('Eliminar usuario');
            if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
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