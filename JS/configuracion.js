import ModalManager from './utils/ModalManager.js';
import { inicializarObserverPadding } from './utils/ManageToastSW2.js';
import { eliminarPaddingSweetAlert } from './utils/ManageToastSW2.js';
import { mostrarExitoToast } from './utils/ManageToastSW2.js';
import { mostrarError } from './utils/ManageToastSW2.js';

// ======================================
// PROTECCIÓN DE RUTA - SOLO ADMINISTRADORES
// ======================================
(async function () {
    console.log('Verificando permisos de administrador...');
    const rolesPermitidos = ['admin', 'juez', 'colaborador', 'notario']
    const hasPermission = await auth.requireRole(rolesPermitidos, 'inicio.php');
    if (!hasPermission) {
        console.error('Acceso denegado: No tienes permisos');
        return;
    }
    console.log('✓ Acceso autorizado: Usuario Administrador');
})();

// Tema
const radios = document.querySelectorAll('input[name="theme"]');
const aplicarTema = (modo) => {
    let temaFinal = modo;

    if (modo === 'auto') {
        const oscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
        temaFinal = oscuro ? 'dark' : 'light';
    }

    document.documentElement.setAttribute('data-theme', temaFinal);
    localStorage.setItem('theme-preference', modo);
};

radios.forEach(r => {
    r.addEventListener('change', e => aplicarTema(e.target.value));
});

// Cargar preferencia de tema guardada
const temaGuardado = localStorage.getItem('theme-preference');
if (temaGuardado) {
    document.querySelector(`input[name="theme"][value="${temaGuardado}"]`).checked = true;
    aplicarTema(temaGuardado);
} else {
    aplicarTema('auto');
}

// Tamaño de fuente
const fontRange = document.getElementById('fontRange');
const fontValue = document.getElementById('fontValue');

fontRange.addEventListener('input', e => {
    const size = e.target.value;
    document.documentElement.style.setProperty('--font-size', size + 'px');
    fontValue.textContent = size + 'px';
    localStorage.setItem('font-size', size);
});

// Cargar tamaño de fuente guardado
const fontSizeGuardado = localStorage.getItem('font-size');
if (fontSizeGuardado) {
    fontRange.value = fontSizeGuardado;
    document.documentElement.style.setProperty('--font-size', fontSizeGuardado + 'px');
    fontValue.textContent = fontSizeGuardado + 'px';
}

// Contraste
const contrastRange = document.getElementById('contrastRange');
const contrastValue = document.getElementById('contrastValue');

contrastRange.addEventListener('input', e => {
    const contrast = e.target.value;
    document.documentElement.style.setProperty('--contrast', contrast);
    contrastValue.textContent = contrast;
    localStorage.setItem('contrast', contrast);
});

// Cargar contraste guardado
const contrasteGuardado = localStorage.getItem('contrast');
if (contrasteGuardado) {
    contrastRange.value = contrasteGuardado;
    document.documentElement.style.setProperty('--contrast', contrasteGuardado);
    contrastValue.textContent = contrasteGuardado;
}

// Detectar cambios en preferencia de sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const temaActual = document.querySelector('input[name="theme"]:checked').value;
    if (temaActual === 'auto') {
        aplicarTema('auto');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    // Tema
    const temaGuardado = localStorage.getItem('theme-preference') || 'auto';
    document.querySelector(`input[name="theme"][value="${temaGuardado}"]`).checked = true;
    aplicarTema(temaGuardado);

    // Tamaño de fuente
    const fontSizeGuardado = localStorage.getItem('font-size') || '16';
    fontRange.value = fontSizeGuardado;
    document.documentElement.style.setProperty('--font-size', fontSizeGuardado + 'px');
    fontValue.textContent = fontSizeGuardado + 'px';

    // Contraste
    const contrasteGuardado = localStorage.getItem('contrast') || '1';
    contrastRange.value = contrasteGuardado;
    document.documentElement.style.setProperty('--contrast', contrasteGuardado);
    contrastValue.textContent = contrasteGuardado;
});


const elementos = {
    profileModal: document.getElementById('viewProfileModal'),
    btnAbrirPerfil: document.getElementById('btnVerPerfil'),
};

// ======================================
// VARIABLE PARA CONTROLAR EL MODO DE EDICIÓN
// ======================================
let modoEdicion = false;

// ======================================
// VARIABLES PARA DETECTAR CAMBIOS
// ======================================
let datosOriginales = null;

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

// ======================================
// FUNCIÓN PARA VERIFICAR SI HAY CAMBIOS SIN GUARDAR
// ======================================
function hayCambiosSinGuardar() {
    if (!modoEdicion || !datosOriginales) return false;

    const nombres = document.getElementById('editNombres')?.value.trim();
    const apellidos = document.getElementById('editApellidos')?.value.trim();
    const telefono = document.getElementById('editTelefono')?.value.trim();

    return nombres !== datosOriginales.nombres ||
        apellidos !== datosOriginales.apellidos ||
        (telefono || '') !== (datosOriginales.telefono || '');
}

// ======================================
// FUNCIÓN PARA RENDERIZAR EL MODAL EN MODO VISTA
// ======================================
function renderModoVista(usuario) {
    function capitalizeText(text) {
        let firstLetter = text.charAt(0).toUpperCase();
        let restLetters = text.slice(1);
        return `${firstLetter}${restLetters}`;
    }

    const rolPrincipal = usuario.roles.length > 0 ? capitalizeText(usuario.roles[0]) : 'Sin rol';

    return `
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
        </div>
        <div class="border-t pt-4 flex justify-end gap-2">
            <button onclick="activarModoEdicion()" class="px-4 py-2 rounded-lg text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 shadow-sm">
                Editar Perfil
            </button>
        </div>
    `;
}

// ======================================
// FUNCIÓN PARA RENDERIZAR EL MODAL EN MODO EDICIÓN
// ======================================
function renderModoEdicion(usuario) {
    function capitalizeText(text) {
        let firstLetter = text.charAt(0).toUpperCase();
        let restLetters = text.slice(1);
        return `${firstLetter}${restLetters}`;
    }

    const rolPrincipal = usuario.roles.length > 0 ? capitalizeText(usuario.roles[0]) : 'Sin rol';

    return `
        <div class="text-center mb-4">
            <div class="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold mb-2">
                ${usuario.nombres.charAt(0)}${usuario.apellidos.charAt(0)}
            </div>
            <h3 class="text-xl font-bold text-gray-800">Editar Perfil</h3>
            <span class="text-sm text-gray-500">${escapeHtml(rolPrincipal)}</span>
        </div>
        <form id="formEditarPerfil" class="space-y-4 border-t pt-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
                <input 
                    type="text" 
                    id="editNombres" 
                    value="${escapeHtml(usuario.nombres)}"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                >
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                <input 
                    type="text" 
                    id="editApellidos" 
                    value="${escapeHtml(usuario.apellidos)}"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                >
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input 
                    type="tel" 
                    id="editTelefono" 
                    value="${escapeHtml(usuario.telefono || '')}"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ingrese su teléfono"
                >
            </div>
            <div class="bg-gray-50 p-3 rounded-lg">
                <p class="text-sm text-gray-600"><strong>Email:</strong> ${escapeHtml(usuario.email_institucional)}</p>
                <p class="text-sm text-gray-500 mt-1">El email y rol no pueden ser modificados</p>
            </div>
        </form>
        <div class="border-t pt-4 flex justify-end gap-2">
            <button onclick="cancelarEdicion()" class="px-4 py-2 rounded-lg text-sm font-medium bg-gray-300 hover:bg-gray-400 text-gray-700 transition-all duration-200 shadow-sm">
                Cancelar
            </button>
            <button id="btnGuardarCambios" onclick="guardarCambios()" disabled class="px-4 py-2 rounded-lg text-sm font-medium bg-green-500 hover:bg-green-600 text-white transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                Guardar Cambios
            </button>
        </div>
    `;
}

// ======================================
// FUNCIÓN PARA VERIFICAR CAMBIOS Y ACTUALIZAR BOTÓN
// ======================================
function verificarCambiosYActualizarBoton() {
    const btnGuardar = document.getElementById('btnGuardarCambios');
    if (!btnGuardar) return;
    
    const hayCambios = hayCambiosSinGuardar();
    btnGuardar.disabled = !hayCambios;
}

// ======================================
// FUNCIÓN PARA ACTIVAR MODO EDICIÓN
// ======================================
function activarModoEdicion() {
    modoEdicion = true;

    // Guardar copia de los datos originales
    datosOriginales = {
        nombres: datosPerfil.nombres,
        apellidos: datosPerfil.apellidos,
        telefono: datosPerfil.telefono
    };

    const content = document.getElementById('profileContent');

    // Activar scroll solo en modo edición
    content.classList.add(
        'overflow-y-auto',
        'max-h-[80vh]',
        'pr-2'
    );

    content.innerHTML = renderModoEdicion(datosPerfil);

    // Configurar el modal para que no se cierre al hacer clic fuera
    configurarProteccionModal();

    // Agregar listeners para detectar cambios en tiempo real
    setTimeout(() => {
        const inputNombres = document.getElementById('editNombres');
        const inputApellidos = document.getElementById('editApellidos');
        const inputTelefono = document.getElementById('editTelefono');

        if (inputNombres) inputNombres.addEventListener('input', verificarCambiosYActualizarBoton);
        if (inputApellidos) inputApellidos.addEventListener('input', verificarCambiosYActualizarBoton);
        if (inputTelefono) inputTelefono.addEventListener('input', verificarCambiosYActualizarBoton);
    }, 0);
}

// ======================================
// FUNCIÓN PARA CANCELAR EDICIÓN Y VOLVER A MODO VISTA
// ======================================
async function cancelarEdicion() {
    // Si hay cambios, pedir confirmación
    if (hayCambiosSinGuardar()) {
        const confirmacion = await Swal.fire({
            title: '¿Descartar cambios?',
            text: 'Hay cambios sin guardar que se perderán',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, descartar',
            cancelButtonText: 'No, continuar editando'
        });

        if (!confirmacion.isConfirmed) {
            return; // El usuario decidió no descartar, mantener modo edición
        }
    }

    // Proceder a cancelar
    modoEdicion = false;
    datosOriginales = null;

    const content = document.getElementById('profileContent');

    // Remover scroll del modo edición
    content.classList.remove(
        'overflow-y-auto',
        'max-h-[80vh]',
        'pr-2'
    );

    content.innerHTML = renderModoVista(datosPerfil);

    // Restaurar comportamiento normal del modal
    restaurarComportamientoModal();
}

// ======================================
// FUNCIÓN PARA GUARDAR LOS CAMBIOS
// ======================================
async function guardarCambios() {
    const nombres = document.getElementById('editNombres').value.trim();
    const apellidos = document.getElementById('editApellidos').value.trim();
    const telefono = document.getElementById('editTelefono').value.trim();

    // Validaciones básicas
    if (!nombres || !apellidos) {
        await mostrarError('Los campos Nombres y Apellidos son obligatorios');
        return;
    }

    try {
        // Aquí realizas la petición para actualizar los datos
        const response = await axios.put('/auth/update-profile', {
            nombres: nombres,
            apellidos: apellidos,
            telefono: telefono || null
        });

        if (response.data.success) {
            // Actualizar los datos locales
            datosPerfil.nombres = nombres;
            datosPerfil.apellidos = apellidos;
            datosPerfil.telefono = telefono;

            mostrarExitoToast('Datos actualizados con éxito.');

            // Limpiar datos originales
            datosOriginales = null;

            // Volver al modo vista
            modoEdicion = false;
            const content = document.getElementById('profileContent');

            // Remover scroll del modo edición
            content.classList.remove(
                'overflow-y-auto',
                'max-h-[80vh]',
                'pr-2'
            );

            content.innerHTML = renderModoVista(datosPerfil);

            // Restaurar comportamiento normal del modal
            restaurarComportamientoModal();
        } else {
            await mostrarError('No se pudo actualizar el perfil');
        }
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        await mostrarError('Error al actualizar el perfil. Intente nuevamente.');
    }
}

// ======================================
// FUNCIÓN PARA CONFIGURAR PROTECCIÓN DEL MODAL EN MODO EDICIÓN
// ======================================
function configurarProteccionModal() {
    const modal = elementos.profileModal;
    if (!modal) return;

    // Remover listener anterior si existe
    if (modal._clickOutsideHandler) {
        modal.removeEventListener('click', modal._clickOutsideHandler);
    }

    // Crear nuevo listener que bloquea el cierre en modo edición
    modal._clickOutsideHandler = async function (e) {
        // Si el clic fue directamente en el modal (no en su contenido)
        if (e.target === modal && modoEdicion) {
            e.preventDefault();
            e.stopPropagation();

            // Si hay cambios, mostrar confirmación
            if (hayCambiosSinGuardar()) {
                // Guardar los valores actuales antes de mostrar el SweetAlert
                const valoresActuales = {
                    nombres: document.getElementById('editNombres')?.value.trim(),
                    apellidos: document.getElementById('editApellidos')?.value.trim(),
                    telefono: document.getElementById('editTelefono')?.value.trim()
                };

                const confirmacion = await Swal.fire({
                    title: '¿Cerrar sin guardar?',
                    text: 'Hay cambios sin guardar que se perderán',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, cerrar',
                    cancelButtonText: 'No, continuar editando'
                });

                if (confirmacion.isConfirmed) {
                    // Usuario confirmó cerrar
                    modoEdicion = false;
                    datosOriginales = null;
                    closeProfileModal();
                } else {
                    // Usuario canceló - verificar si el modal se cerró y reabrirlo
                    const modalEstaAbierto = modal.classList.contains('flex') ||
                        modal.style.display === 'flex' ||
                        !modal.classList.contains('hidden');

                    if (!modalEstaAbierto) {
                        // El modal se cerró, reabrirlo en modo edición
                        ModalManager.abrir(modal);

                        // Esperar un momento para que el DOM se actualice
                        setTimeout(() => {
                            // Restaurar los valores que el usuario había ingresado
                            if (document.getElementById('editNombres')) {
                                document.getElementById('editNombres').value = valoresActuales.nombres;
                            }
                            if (document.getElementById('editApellidos')) {
                                document.getElementById('editApellidos').value = valoresActuales.apellidos;
                            }
                            if (document.getElementById('editTelefono')) {
                                document.getElementById('editTelefono').value = valoresActuales.telefono;
                            }

                            // Verificar estado del botón después de restaurar
                            verificarCambiosYActualizarBoton();
                        }, 0);
                    }
                }
            } else {
                // No hay cambios, cerrar normalmente
                modoEdicion = false;
                datosOriginales = null;
                closeProfileModal();
            }
        }
    };

    modal.addEventListener('click', modal._clickOutsideHandler);
}

// ======================================
// FUNCIÓN PARA RESTAURAR COMPORTAMIENTO NORMAL DEL MODAL
// ======================================
function restaurarComportamientoModal() {
    const modal = elementos.profileModal;
    if (!modal || !modal._clickOutsideHandler) return;

    // Remover el listener de protección
    modal.removeEventListener('click', modal._clickOutsideHandler);
    modal._clickOutsideHandler = null;
}

async function verPerfil(idUsuario) {
    const usuario = datosPerfil;
    if (!usuario) return;

    if (!datosPerfil) {
        await fetchProfileData();
    }

    if (!datosPerfil) {
        await mostrarError('No se encontraron los datos del perfil.');
        return;
    }

    // Siempre iniciar en modo vista
    modoEdicion = false;
    datosOriginales = null;

    const content = document.getElementById('profileContent');
    content.innerHTML = renderModoVista(usuario);

    ModalManager.abrir(elementos.profileModal);
}

let datosPerfil = null;

async function fetchProfileData() {
    try {
        const response = await axios.get('/auth/me');

        if (response.data.success) {
            console.log('Se encontraron los datos de perfil');
            datosPerfil = response.data.data;
            console.log(datosPerfil);

            return datosPerfil;
        } else {
            mostrarError('No se pudieron cargar los datos');
        }
    } catch (error) {
        console.error('Error al cargar los datos del perfil:', error);
    }
}

/**
 * Cierra el modal de detalles
 */
async function closeProfileModal() {
    // Si está en modo edición y hay cambios, pedir confirmación
    if (modoEdicion && hayCambiosSinGuardar()) {
        const confirmacion = await Swal.fire({
            title: '¿Cerrar sin guardar?',
            text: 'Hay cambios sin guardar que se perderán',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar',
            cancelButtonText: 'No, continuar editando'
        });

        if (!confirmacion.isConfirmed) {
            return; // No cerrar el modal
        }
    }

    // Resetear al modo vista al cerrar
    modoEdicion = false;
    datosOriginales = null;
    restaurarComportamientoModal();
    ModalManager.cerrar(elementos.profileModal);
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchProfileData();
})

elementos.btnAbrirPerfil.addEventListener('click', async function () {
    await verPerfil();
})

// Exponer funciones globalmente para que puedan ser llamadas desde los botones
window.closeProfileModal = closeProfileModal;
window.activarModoEdicion = activarModoEdicion;
window.cancelarEdicion = cancelarEdicion;
window.guardarCambios = guardarCambios;