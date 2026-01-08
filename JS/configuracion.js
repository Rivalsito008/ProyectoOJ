import ModalManager from './utils/ModalManager.js';
import { mostrarError } from './utils/ManageToastSW2.js';

// ======================================
// PROTECCIÓN DE RUTA - SOLO ADMINISTRADORES
// ======================================
(async function () {
    console.log('Verificando permisos de administrador...');
    const rolesPermitidos = ['admin', 'juez', 'colaborador', 'notario']
    const hasPermission = await auth.requireRole(rolesPermitidos, 'inicio.php');
    if (!hasPermission) {
        console.error('Acceso denegado: No tienes permisos de administrador');
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
    btnAbrirPerfil: document.getElementById('btnVerPerfil')
};

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

async function verPerfil(idUsuario) {
    const usuario = datosPerfil;
    if (!usuario) return;

    if (!datosPerfil) {
        await fetchProfileData();
    }

    if (!datosPerfil) {
        await mostrarError('No se encontraron los datos del perfil.');
    }

    const content = document.getElementById('profileContent');
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
        </div>
        <div class="space-y-6 border-t pt-4 flex justify-end">
            <button class="w-30 px-4 py-3 rounded-lg text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 shadow-sm" title="Editar perfil">
                <!-- 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" stroke-width="1.5" stroke="currentColor" class="w-8 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
                -->
                Editar
            </button>
        </div>
    `;
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
function closeProfileModal() {
    ModalManager.cerrar(elementos.profileModal);
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchProfileData();
})

elementos.btnAbrirPerfil.addEventListener('click', async function () {
    await verPerfil();
})

window.closeProfileModal = closeProfileModal;