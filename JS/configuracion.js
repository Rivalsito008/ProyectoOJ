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

