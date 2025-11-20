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


// Modal
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



// Tabs - CORREGIDO
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