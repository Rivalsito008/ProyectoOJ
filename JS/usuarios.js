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
    { id: 1, nombre: "Iván Alejandro", apellido: "Barrera Escalante", email: "ivanbarrera@email.com", rol: "Administrador", estado: "Activo", nivel: "activo" },
    { id: 2, nombre: "Carlos Manuel", apellido: "Gonzales Pineda", email: "carlosgonzales@email.com", rol: "Notario", estado: "Inactivo", nivel: "inactivo" },
    { id: 3, nombre: "Mario Alberto", apellido: "Mejia Cruz", email: "marioalberto@email.com", rol: "Administrador", estado: "Activo", nivel: "activo" },
    { id: 4, nombre: "Yahir Alejandro", apellido: "Palma Gutierres", email: "yahirpalma@email.com", rol: "Juez", estado: "Inactivo", nivel: "inactivo" },
    { id: 5, nombre: "Hector Jose", apellido: "Moreno Argueta", email: "hectorjose@email.com", rol: "Notario", estado: "Activo", nivel: "activo" },
    { id: 6, nombre: "Esteban Miguel", apellido: "Landaverde Argueta", email: "estebanmiguel@email.com", rol: "Administrador", estado: "Activo", nivel: "activo" },
    { id: 7, nombre: "Rodrigo Andres", apellido: "Barrera Escalante", email: "rodrigoandres@email.com", rol: "Administrador", estado: "Inactivo", nivel: "inactivo" },
    { id: 8, nombre: "Juan Pablo", apellido: "Barrera Escalante", email: "jpbarrera@email.com", rol: "Juez", estado: "Activo", nivel: "activo" },
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

        // Determinar texto y color para el botón de activar/desactivar
        const botonTexto = p.estado.toLowerCase() === 'activo' ? 'Desactivar' : 'Activar';
        const botonColor = p.estado.toLowerCase() === 'activo' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600';

        tr.innerHTML = `
    <td class="px-6 py-4 text-gray-900 dark:text-white font-medium">${p.nombre}</td>
    <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${p.apellido}</td>
    <td class="px-6 py-4 whitespace-nowrap text-center text-gray-900 dark:text-white">${p.email}</td>
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
    <td class="px-6 py-4 whitespace-nowrap acciones-center">
        <div class="flex space-x-2 justify-center">
            <button class="action-btn-view w-20 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                Editar
            </button>
            <button class="action-btn-toggle-estado w-20 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm relative overflow-hidden text-white ${botonColor}"
                    data-id="${p.id}"
                    data-estado="${p.estado}">
                ${botonTexto}
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

    // Botones Toggle Estado (Activar/Desactivar)
    const botonesToggleEstado = document.querySelectorAll('.action-btn-toggle-estado');
    botonesToggleEstado.forEach(boton => {
        boton.addEventListener('click', function (e) {
            e.preventDefault();
            const idUsuario = this.getAttribute('data-id');
            const estadoActual = this.getAttribute('data-estado');
            const nuevoEstado = estadoActual.toLowerCase() === 'activo' ? 'Inactivo' : 'Activo';
            
            // Animación de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            const confirmMessage = estadoActual.toLowerCase() === 'activo' 
                ? '¿Estás seguro de que quieres desactivar este usuario?'
                : '¿Estás seguro de que quieres activar este usuario?';
            
            if (confirm(confirmMessage)) {
                // Encontrar el usuario en el array
                const usuarioIndex = usuarios.findIndex(u => u.id == idUsuario);
                if (usuarioIndex !== -1) {
                    // Actualizar estado en el array
                    usuarios[usuarioIndex].estado = nuevoEstado;
                    usuarios[usuarioIndex].nivel = nuevoEstado.toLowerCase();
                    
                    // Actualizar el botón visualmente
                    this.setAttribute('data-estado', nuevoEstado);
                    
                    if (nuevoEstado === 'Inactivo') {
                        this.classList.remove('bg-red-500', 'hover:bg-red-600');
                        this.classList.add('bg-green-500', 'hover:bg-green-600');
                        this.textContent = 'Activar';
                    } else {
                        this.classList.remove('bg-green-500', 'hover:bg-green-600');
                        this.classList.add('bg-red-500', 'hover:bg-red-600');
                        this.textContent = 'Desactivar';
                    }
                    
                    // También actualizar el badge de estado
                    const fila = this.closest('tr');
                    const estadoBadge = fila.querySelector('.state-badge-shimmer:last-of-type');
                    
                    if (estadoBadge) {
                        estadoBadge.textContent = nuevoEstado;
                        if (nuevoEstado === 'Inactivo') {
                            estadoBadge.classList.remove('bg-green-500');
                            estadoBadge.classList.add('bg-red-600');
                        } else {
                            estadoBadge.classList.remove('bg-red-600');
                            estadoBadge.classList.add('bg-green-500');
                        }
                    }
                    
                    // Recargar la tabla para reflejar cambios
                    const tabActivo = document.querySelector('.browser-tab.active');
                    if (tabActivo) {
                        const tabName = tabActivo.getAttribute('data-tab');
                        if (tabName === 'Todo') {
                            cargarTablaPorNivel('todo');
                        } else if (tabName === 'activo') {
                            cargarTablaPorNivel('activo');
                        } else if (tabName === 'inactivo') {
                            cargarTablaPorNivel('inactivo');
                        }
                    }
                    
                    console.log(`Usuario ${idUsuario} cambiado a estado: ${nuevoEstado}`);
                }
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

// Función para limpiar formulario (si existe)
function limpiarFormulario() {
    // Si tienes un formulario para crear usuarios
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const emailInput = document.getElementById('email');
    const rolSelect = document.getElementById('rol');
    const estadoSelect = document.getElementById('estado');
    
    if (nombreInput) nombreInput.value = '';
    if (apellidoInput) apellidoInput.value = '';
    if (emailInput) emailInput.value = '';
    if (rolSelect) rolSelect.value = '';
    if (estadoSelect) estadoSelect.value = 'Activo';
}