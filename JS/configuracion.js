// Variables globales
const sidebar = document.getElementById('sidebar');
const logoCompact = document.getElementById('logo-compact');
const logoFull = document.getElementById('logo-full');
const navLabels = document.querySelectorAll('.nav-label');
const navItems = document.querySelectorAll('.nav-item');

// Sidebar hover effect
sidebar.addEventListener('mouseenter', () => {
    sidebar.classList.remove('sidebar-collapsed');
    sidebar.classList.add('sidebar-expanded');
    logoCompact.classList.add('hidden');
    logoFull.classList.remove('hidden');
    navLabels.forEach(label => {
        label.classList.remove('hidden');
    });
    navItems.forEach(item => {
        item.classList.remove('justify-center');
    });
});

sidebar.addEventListener('mouseleave', () => {
    sidebar.classList.remove('sidebar-expanded');
    sidebar.classList.add('sidebar-collapsed');
    logoCompact.classList.remove('hidden');
    logoFull.classList.add('hidden');
    navLabels.forEach(label => {
        label.classList.add('hidden');
    });
    navItems.forEach(item => {
        item.classList.add('justify-center');
    });
});

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

// ========================================
// DROPDOWN DE PERFIL
// ========================================
// JavaScript para el dropdown (asegúrate de que esta lógica esté en tu archivo JS)
document.addEventListener('DOMContentLoaded', function() {
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

    // Cerrar dropdown con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            profileDropdown.classList.add('hidden');
        }
    });
})();

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

// Botones de cuenta
document.getElementById('btnEditarPerfil').onclick = () => { };

document.getElementById('btnCambiarClave').onclick = () => { };

document.getElementById('btnVerificacion').onclick = () => { };

// Detectar cambios en preferencia de sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const temaActual = document.querySelector('input[name="theme"]:checked').value;
    if (temaActual === 'auto') {
        aplicarTema('auto');
    }
});
// Al final del script existente en configuracion.php, agrega:

// Cargar TODAS las preferencias guardadas al inicio
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

