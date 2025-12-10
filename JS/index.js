const form = document.getElementById('loginForm');
const loadingScreen = document.getElementById('loading-screen');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener valores del formulario
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const remember = rememberCheckbox.checked;

    // Validación básica
    if (!username || !password) {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Mostrar pantalla de carga
    loadingScreen.classList.add('active');

    // Simular autenticación (aquí conectarías con tu backend)
    setTimeout(() => {
        // Si "recordarme" está marcado, guardar en localStorage
        if (remember) {
            localStorage.setItem('sigen-username', username);
        }

        // Redirigir al dashboard
        window.location.href = 'inicio.php';
    }, 2000); // Reducido a 2 segundos para mejor UX
});

// Cargar usuario recordado si existe
window.addEventListener('DOMContentLoaded', () => {
    const savedUsername = localStorage.getItem('sigen-username');
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberCheckbox.checked = true;
    }
});
