// USUARIOS.JS - Gestión de Usuarios (Solo Administradores)
// ======================================
// VERSION OPTIMIZADA CON SISTEMA DE MODALS MEJORADO Y CARGA DINÁMICA DE ROLES
// ======================================
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
// ======================================
// ELEMENTOS DEL DOM
// ======================================
const elementos = {
    // Botones principales
    openFormBtn: document.getElementById('openFormBtn'),
    // Modal Agregar
    addModal: document.getElementById('userFormModal'),
    closeAddBtn: document.getElementById('closeFormBtn'),
    saveAddBtn: document.getElementById('saveAddBtn'),
    addForm: document.getElementById('addUserForm'),
    // Modal Editar
    editModal: document.getElementById('editUserModal'),
    closeEditBtn: document.getElementById('closeEditBtn'),
    cancelEditBtn: document.getElementById('cancelEditBtn'),
    saveEditBtn: document.getElementById('saveEditBtn'),
    editForm: document.getElementById('editUserForm'),
    // Modal Detalles
    detailsModal: document.getElementById('viewDetailsModal'),
    // Tabs
    tabs: document.querySelectorAll('.browser-tab'),
    // Tablas
    tablaTodo: document.getElementById('tablaTodo'),
    tablaActivo: document.getElementById('tablaActivo'),
    tablaInactivo: document.getElementById('tablaInactivo')
};
// ======================================
// ESTADO DE LA APLICACIÓN
// ======================================
let usuarios = [];
let rolesDisponibles = []; // NUEVO: Almacena los roles disponibles
let currentTab = 'Todo';
let usuarioEnEdicion = null; // Usuario que se está editando
// ======================================
// CLASE MODAL MANAGER - Gestión centralizada de modals
// ======================================
class ModalManager {
    /**
     * Abre un modal específico
     * @param {HTMLElement} modal - Elemento del modal a abrir
     */
    static abrir(modal) {
        if (!modal) {
            console.error('Modal no encontrado');
            return;
        }
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        // Agregar listener para cerrar al hacer clic fuera
        setTimeout(() => {
            modal.addEventListener('click', this.clickFueraHandler);
        }, 100);
    }
    /**
     * Cierra un modal específico
     * @param {HTMLElement} modal - Elemento del modal a cerrar
     */
    static cerrar(modal) {
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
        modal.removeEventListener('click', this.clickFueraHandler);
    }
    /**
     * Handler para cerrar modal al hacer clic fuera
     */
    static clickFueraHandler(e) {
        if (e.target === e.currentTarget) {
            ModalManager.cerrar(e.currentTarget);
        }
    }
    /**
     * Limpia un formulario
     * @param {HTMLFormElement} form - Formulario a limpiar
     */
    static limpiarFormulario(form) {
        if (form) {
            form.reset();
            // Limpiar también campos hidden
            const hiddenInputs = form.querySelectorAll('input[type="hidden"]');
            hiddenInputs.forEach(input => input.value = '');
        }
    }
}
// ======================================
// FUNCIONES DE ROLES - CARGA DINÁMICA
// ======================================
/**
 * Carga los roles disponibles desde el backend
 */
async function cargarRoles() {
    try {
        rolesDisponibles = await auth.getRoles();
        console.log(`✓ ${rolesDisponibles.length} roles cargados:`, rolesDisponibles);
        return rolesDisponibles;
    } catch (error) {
        console.error('Error al cargar roles:', error);
        mostrarError('No se pudieron cargar los roles disponibles');
        return [];
    }
}
/**
 * Puebla un select con los roles disponibles
 * @param {HTMLSelectElement} selectElement - Elemento select a poblar
 * @param {string} selectedRol - Rol a seleccionar (opcional)
 */
function poblarSelectRoles(selectElement, selectedRol = null) {
    if (!selectElement) {
        console.error('Select element no encontrado');
        return;
    }
    // Limpiar opciones existentes
    selectElement.innerHTML = '';
    // Agregar opción por defecto
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione un rol';
    selectElement.appendChild(defaultOption);
    // Agregar roles disponibles
    rolesDisponibles.forEach(rol => {
        const option = document.createElement('option');
        option.value = rol.rol; // El nombre del rol (ej: "Administrador")
        option.textContent = rol.rol;
        // Seleccionar si coincide con el rol especificado
        if (selectedRol && rol.rol.toLowerCase() === selectedRol.toLowerCase()) {
            option.selected = true;
        }
        selectElement.appendChild(option);
    });
    console.log(`✓ Select poblado con ${rolesDisponibles.length} roles`);
}
// ======================================
// EVENT LISTENERS - MODAL AGREGAR
// ======================================
if (elementos.openFormBtn) {
    elementos.openFormBtn.addEventListener('click', async () => {
        ModalManager.limpiarFormulario(elementos.addForm);
        // Poblar select de roles
        const selectRol = document.getElementById('add_rol');
        poblarSelectRoles(selectRol);
        ModalManager.abrir(elementos.addModal);
    });
}
if (elementos.closeAddBtn) {
    elementos.closeAddBtn.addEventListener('click', () => {
        ModalManager.cerrar(elementos.addModal);
        ModalManager.limpiarFormulario(elementos.addForm);
    });
}
if (elementos.saveAddBtn) {
    elementos.saveAddBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await guardarNuevoUsuario();
    });
}
// ======================================
// EVENT LISTENERS - MODAL EDITAR
// ======================================
if (elementos.closeEditBtn) {
    elementos.closeEditBtn.addEventListener('click', () => {
        cerrarModalEditar();
    });
}
if (elementos.cancelEditBtn) {
    elementos.cancelEditBtn.addEventListener('click', () => {
        cerrarModalEditar();
    });
}
if (elementos.saveEditBtn) {
    elementos.saveEditBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await guardarEdicionUsuario();
    });
}
// ======================================
// EVENT LISTENERS - TABS
// ======================================
elementos.tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        switchTab(tabName);
    });
});
function switchTab(tabName) {
    currentTab = tabName;
    elementos.tabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        if (content.id === tabName) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    renderTabla(tabName);
}
// ======================================
// FUNCIONES DE API - CRUD COMPLETO
// ======================================
/**
 * Obtiene todos los usuarios desde el backend
 */
async function fetchUsuarios() {
    try {
        mostrarCargando(true);
        const response = await axios.get('/usuarios');
        if (response.data.success) {
            usuarios = response.data.data;
            console.log(`✓ ${usuarios.length} usuarios cargados`);
            renderTabla(currentTab);
        } else {
            mostrarError('No se pudieron cargar los usuarios');
        }
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        if (error.response?.status === 403) {
            mostrarError('No tienes permisos para ver los usuarios');
        } else {
            mostrarError('Error al cargar la lista de usuarios');
        }
    } finally {
        mostrarCargando(false);
    }
}
/**
 * Guarda un nuevo usuario
 */
async function guardarNuevoUsuario() {
    try {
        // Validar formulario
        if (!elementos.addForm.checkValidity()) {
            elementos.addForm.reportValidity();
            return;
        }
        // Validar que se haya seleccionado un rol
        const rol = document.getElementById('add_rol').value;
        if (!rol) {
            mostrarError('Por favor selecciona un rol');
            return;
        }
        mostrarCargando(true);
        // Obtener datos del formulario
        const formData = new FormData(elementos.addForm);
        const datos = Object.fromEntries(formData.entries());
        console.log('Creando usuario:', datos);
        const response = await axios.post('/usuarios', datos);
        if (response.data.success) {
            mostrarExito('Usuario creado exitosamente');
            ModalManager.cerrar(elementos.addModal);
            ModalManager.limpiarFormulario(elementos.addForm);
            await fetchUsuarios();
        }
    } catch (error) {
        console.error('Error al crear usuario:', error);
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            const firstError = Object.values(errors)[0][0];
            mostrarError(firstError);
        } else if (error.response?.status === 403) {
            mostrarError('No tienes permisos para crear usuarios');
        } else {
            mostrarError('Error al crear el usuario');
        }
    } finally {
        mostrarCargando(false);
    }
}
/**
 * Abre el modal de edición y carga los datos del usuario
 * @param {number} idUsuario - ID del usuario a editar
 */
async function abrirModalEditar(idUsuario) {
    const usuario = usuarios.find(u => u.id_usuario === idUsuario);
    if (!usuario) {
        mostrarError('Usuario no encontrado');
        return;
    }
    usuarioEnEdicion = usuario;
    // Rellenar formulario con datos del usuario
    document.getElementById('edit_id_usuario').value = usuario.id_usuario;
    document.getElementById('edit_nombres').value = usuario.nombres || '';
    document.getElementById('edit_apellidos').value = usuario.apellidos || '';
    document.getElementById('edit_email').value = usuario.email_institucional || '';
    document.getElementById('edit_telefono').value = usuario.telefono || '';
    // Obtener rol principal del usuario
    const rolPrincipal = usuario.usuario_roles
        ?.find(ur => ur.estado === 'Activo')
        ?.rol?.rol || '';
    // Poblar select de roles y seleccionar el rol actual
    const selectRol = document.getElementById('edit_rol');
    poblarSelectRoles(selectRol, rolPrincipal);
    // Limpiar campo de contraseña
    document.getElementById('edit_password').value = '';
    // Abrir modal
    ModalManager.abrir(elementos.editModal);
    console.log('Modal de edición abierto para usuario:', usuario.nombres, 'con rol:', rolPrincipal);
}
/**
 * Cierra el modal de edición y limpia el formulario
 */
function cerrarModalEditar() {
    ModalManager.cerrar(elementos.editModal);
    ModalManager.limpiarFormulario(elementos.editForm);
    usuarioEnEdicion = null;
}
/**
 * Guarda los cambios del usuario editado
 */
async function guardarEdicionUsuario() {
    try {
        // Validar formulario
        if (!elementos.editForm.checkValidity()) {
            elementos.editForm.reportValidity();
            return;
        }
        const idUsuario = document.getElementById('edit_id_usuario').value;
        if (!idUsuario) {
            mostrarError('Error: ID de usuario no válido');
            return;
        }
        // Validar que se haya seleccionado un rol
        const rol = document.getElementById('edit_rol').value;
        if (!rol) {
            mostrarError('Por favor selecciona un rol');
            return;
        }
        mostrarCargando(true);
        // Obtener datos del formulario
        const formData = new FormData(elementos.editForm);
        const datos = Object.fromEntries(formData.entries());
        // Si la contraseña está vacía, eliminarla del objeto
        if (!datos.password || datos.password.trim() === '') {
            delete datos.password;
        }
        console.log('Actualizando usuario:', idUsuario, datos);
        const response = await axios.put(`/usuarios/${idUsuario}`, datos);
        if (response.data.success) {
            mostrarExito('Usuario actualizado exitosamente');
            cerrarModalEditar();
            await fetchUsuarios();
        }
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            const firstError = Object.values(errors)[0][0];
            mostrarError(firstError);
        } else if (error.response?.status === 403) {
            mostrarError('No tienes permisos para editar usuarios');
        } else if (error.response?.status === 404) {
            mostrarError('Usuario no encontrado');
        } else {
            mostrarError('Error al actualizar el usuario');
        }
    } finally {
        mostrarCargando(false);
    }
}
/**
 * Actualiza el estado de un usuario (ACTUALIZADO CON PATCH)
 * @param {number} idUsuario - ID del usuario
 * @param {string} estadoActual - Estado actual del usuario
 */
async function toggleEstado(idUsuario, estadoActual) {
    const nuevoEstado = estadoActual === 'Activo' ? 'Inactivo' : 'Activo';
    const accion = nuevoEstado === 'Activo' ? 'activar' : 'desactivar';
    if (!confirm(`¿Estás seguro de ${accion} este usuario?`)) {
        return;
    }
    try {
        mostrarCargando(true);
        // ACTUALIZADO: Usar PATCH en lugar de POST
        const response = await axios.patch(`/usuarios/${idUsuario}/estado`, {
            estado: nuevoEstado
        });
        if (response.data.success) {
            mostrarExito(`Usuario ${nuevoEstado === 'Activo' ? 'activado' : 'desactivado'} exitosamente`);
            await fetchUsuarios();
        }
    } catch (error) {
        console.error('Error al cambiar estado:', error);
        if (error.response?.status === 403) {
            mostrarError('No tienes permisos para cambiar el estado de usuarios');
        } else {
            mostrarError('Error al cambiar el estado del usuario');
        }
    } finally {
        mostrarCargando(false);
    }
}
// ======================================
// FUNCIONES DE RENDERIZADO
// ======================================
/**
 * Renderiza la tabla según el filtro activo
 * @param {string} tabName - Nombre de la pestaña activa
 */
function renderTabla(tabName) {
    let usuariosFiltrados = [];
    let tabla = null;
    switch (tabName) {
        case 'Todo':
            usuariosFiltrados = usuarios;
            tabla = elementos.tablaTodo;
            break;
        case 'activo':
            usuariosFiltrados = usuarios.filter(u => u.estado === 'Activo');
            tabla = elementos.tablaActivo;
            break;
        case 'inactivo':
            usuariosFiltrados = usuarios.filter(u => u.estado === 'Inactivo');
            tabla = elementos.tablaInactivo;
            break;
    }
    if (!tabla) return;
    tabla.innerHTML = '';
    if (usuariosFiltrados.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-lg">
                    No hay usuarios ${tabName === 'Todo' ? 'para mostrar' : `en estado ${tabName}`}
                </td>
            </tr>
        `;
        return;
    }
    usuariosFiltrados.forEach(usuario => {
        const row = crearFilaUsuario(usuario);
        tabla.appendChild(row);
    });
}
/**
 * Crea una fila de la tabla para un usuario
 * @param {Object} usuario - Datos del usuario
 * @returns {HTMLTableRowElement} Fila de la tabla
 */
function crearFilaUsuario(usuario) {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300';
    const rolPrincipal = usuario.usuario_roles
        ?.find(ur => ur.estado === 'Activo')
        ?.rol?.rol || 'Sin rol';
    // Clases CSS según ESTADO
    const estadoClasses = {
        'activo': 'bg-green-500 text-white',
        'inactivo': 'bg-red-600 text-white'
    };
    const estadoClass = estadoClasses[usuario.estado.toLowerCase()] || 'bg-gray-500 text-white';
    // Clases CSS según ROL
    const rolClasses = {
        'administrador': 'bg-red-500 text-white',
        'notario': 'bg-blue-500 text-white',
        'juez': 'bg-purple-500 text-white',
        'colaborador': 'bg-yellow-500 text-white'
    };
    const rolClass = rolClasses[rolPrincipal.toLowerCase()] || 'bg-gray-500 text-white';
    // Botón toggle estado
    const esActivo = usuario.estado.toLowerCase() === 'activo';
    const botonTexto = esActivo ? 'Desactivar' : 'Activar';
    const botonColor = esActivo ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600';
    tr.innerHTML = `
        <td class="px-6 py-4 text-gray-900 dark:text-white font-medium">${escapeHtml(usuario.nombres)}</td>
        <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${escapeHtml(usuario.apellidos)}</td>
        <td class="px-6 py-4 whitespace-nowrap text-center text-gray-900 dark:text-white">${escapeHtml(usuario.email_institucional)}</td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex items-center justify-center w-24 px-3 py-1 rounded-full text-xs font-semibold ${rolClass}">
                ${escapeHtml(rolPrincipal)}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex items-center justify-center w-20 px-3 py-1 rounded-full text-xs font-semibold ${estadoClass}">
                ${usuario.estado}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex space-x-2 justify-center">
                <button onclick="verDetalles(${usuario.id_usuario})" 
                        class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Ver detalles">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                </button>
                <button onclick="abrirModalEditar(${usuario.id_usuario})" 
                        class="w-20 px-3 py-1 rounded-lg text-xs font-medium bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 shadow-sm">
                    Editar
                </button>
                <button onclick="toggleEstado(${usuario.id_usuario}, '${usuario.estado}')" 
                        class="w-24 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm text-white ${botonColor}">
                    ${botonTexto}
                </button>
            </div>
        </td>
    `;
    return tr;
}
// ======================================
// FUNCIONES GLOBALES - Modal Detalles
// ======================================
/**
 * Muestra los detalles de un usuario
 * @param {number} idUsuario - ID del usuario
 */
function verDetalles(idUsuario) {
    const usuario = usuarios.find(u => u.id_usuario === idUsuario);
    if (!usuario) return;
    const content = document.getElementById('detailsContent');
    const rolPrincipal = usuario.usuario_roles?.find(ur => ur.estado === 'Activo')?.rol?.rol || 'Sin rol';
    content.innerHTML = `
        <div class="text-center mb-4">
            <div class="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold mb-2">
                ${usuario.nombres.charAt(0)}${usuario.apellidos.charAt(0)}
            </div>
            <h3 class="text-xl font-bold text-gray-800">${escapeHtml(usuario.nombres)} ${escapeHtml(usuario.apellidos)}</h3>
            <span class="text-sm text-gray-500">${escapeHtml(rolPrincipal)}</span>
        </div>
        <div class="space-y-3 border-t pt-4">
            <p><strong class="text-gray-600">Email:</strong> ${escapeHtml(usuario.email_institucional)}</p>
            <p><strong class="text-gray-600">Teléfono:</strong> ${escapeHtml(usuario.telefono || 'No especificado')}</p>
            <p><strong class="text-gray-600">Estado:</strong> 
                <span class="px-2 py-1 rounded text-xs ${usuario.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                    ${usuario.estado}
                </span>
            </p>
            <p><strong class="text-gray-600">Creado:</strong> ${usuario.created_at ? new Date(usuario.created_at).toLocaleDateString() : 'N/A'}</p>
        </div>
    `;
    ModalManager.abrir(elementos.detailsModal);
}
/**
 * Cierra el modal de detalles
 */
function closeDetailsModal() {
    ModalManager.cerrar(elementos.detailsModal);
}
// ======================================
// FUNCIONES DE UTILIDAD
// ======================================
/**
 * Escapa HTML para prevenir XSS
 * @param {string} text - Texto a escapar
 * @returns {string} Texto escapado
 */
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.toString().replace(/[&<>"']/g, m => map[m]);
}
/**
 * Muestra/oculta indicador de carga
 * @param {boolean} mostrar - Si debe mostrar el indicador
 */
function mostrarCargando(mostrar) {
    document.body.style.cursor = mostrar ? 'wait' : 'default';
    // Deshabilitar botones durante la carga
    const botones = document.querySelectorAll('button');
    botones.forEach(btn => {
        btn.disabled = mostrar;
        if (mostrar) {
            btn.style.opacity = '0.6';
        } else {
            btn.style.opacity = '1';
        }
    });
}
/**
 * Muestra mensaje de éxito
 * @param {string} mensaje - Mensaje a mostrar
 */
function mostrarExito(mensaje) {
    console.log('✓ ' + mensaje);
    alert('✓ ' + mensaje);
    // TODO: Implementar notificaciones con Toastify o SweetAlert2
}
/**
 * Muestra mensaje de error
 * @param {string} mensaje - Mensaje a mostrar
 */
function mostrarError(mensaje) {
    console.error('✕ ' + mensaje);
    alert('✕ ' + mensaje);
    // TODO: Implementar notificaciones con Toastify o SweetAlert2
}
// ======================================
// INICIALIZACIÓN
// ======================================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Inicializando módulo de usuarios...');
    try {
        // Verificar permisos de administrador
        const isAdmin = await auth.isAdmin();
        if (!isAdmin) {
            console.error('No eres administrador');
            mostrarError('No tienes permisos para acceder a esta página');
            setTimeout(() => {
                window.location.href = 'inicio.php';
            }, 2000);
            return;
        }
        // NUEVO: Cargar roles disponibles
        await cargarRoles();
        // Cargar usuarios al inicio
        await fetchUsuarios();
        console.log('✓ Módulo de usuarios cargado correctamente');
        console.log('✓ Sistema de modals optimizado inicializado');
        console.log('✓ Carga dinámica de roles habilitada');
    } catch (error) {
        console.error('Error al inicializar módulo de usuarios:', error);
        mostrarError('Error al inicializar la página');
    }
});
// Hacer funciones disponibles globalmente para onclick en HTML
window.verDetalles = verDetalles;
window.closeDetailsModal = closeDetailsModal;
window.abrirModalEditar = abrirModalEditar;
window.toggleEstado = toggleEstado;