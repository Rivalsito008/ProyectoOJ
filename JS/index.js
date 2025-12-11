// ======================================
// LÓGICA DE UI DEL LOGIN
// ======================================

// Elementos del DOM
const form = document.getElementById('loginForm');
const loadingScreen = document.getElementById('loading-screen');
const loadingText = document.getElementById('loading-text');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');
const submitBtn = document.getElementById('submit-btn');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

// ======================================
// FUNCIONES DE UI
// ======================================

/**
 * Mostrar mensaje de error
 * @param {string} message - Mensaje a mostrar
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    successMessage.classList.remove('show');

    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

/**
 * Mostrar mensaje de éxito
 * @param {string} message - Mensaje a mostrar
 */
function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.classList.add('show');
    errorMessage.classList.remove('show');
}

/**
 * Mostrar/ocultar pantalla de carga
 * @param {boolean} show - Si se debe mostrar
 * @param {string} text - Texto a mostrar
 */
function showLoading(show = true, text = 'Iniciando sesión...') {
    if (show) {
        loadingText.textContent = text;
        loadingScreen.classList.add('active');
        submitBtn.disabled = true;
    } else {
        loadingScreen.classList.remove('active');
        submitBtn.disabled = false;
    }
}

/**
 * Validar formato de email
 * @param {string} email - Email a validar
 * @returns {boolean}
 */
function isValidEmail(email) {
    return email.includes('@') && email.endsWith('@csj.gob.sv');
}

/**
 * Manejar errores de la API
 * @param {Error} error - Error de axios
 */
function handleLoginError(error) {
    if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        switch (status) {
            case 401:
                showError('Credenciales incorrectas. Verifica tu correo y contraseña.');
                break;
            case 422:
                // Errores de validación
                const errors = data.errors;
                const firstError = Object.values(errors)[0][0];
                showError(firstError);
                break;
            case 500:
                showError('Error en el servidor. Intenta nuevamente más tarde.');
                break;
            default:
                showError(data.message || 'Error al iniciar sesión. Intenta nuevamente.');
        }
    } else if (error.request) {
        showError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
    } else {
        showError('Ocurrió un error inesperado. Intenta nuevamente.');
    }

    console.error('Error de login:', error);
}

// ======================================
// MANEJO DEL FORMULARIO
// ======================================

/**
 * Manejar envío del formulario de login
 */
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Obtener valores
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const remember = rememberCheckbox.checked;

    // Validación básica
    if (!email || !password) {
        showError('Por favor, completa todos los campos');
        return;
    }

    if (!isValidEmail(email)) {
        showError('Por favor, ingresa un correo electrónico válido (@csj.gob.sv)');
        return;
    }

    // Mostrar loading
    showLoading(true);

    try {
        // Llamar a la función de login del servicio auth
        const result = await auth.login(email, password, remember);

        if (result.success) {
            // Mostrar mensaje de éxito
            showSuccess('¡Inicio de sesión exitoso! Redirigiendo...');

            // Redirigir después de 1 segundo
            setTimeout(() => {
                window.location.href = 'inicio.php';
            }, 1000);
        } else {
            showLoading(false);
            showError(result.message);
        }
    } catch (error) {
        showLoading(false);
        handleLoginError(error);
    }
});

// ======================================
// CARGAR EMAIL GUARDADO
// ======================================

/**
 * Cargar email guardado al iniciar
 */
function loadSavedEmail() {
    const savedEmail = auth.getSavedEmail();

    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }
}

// ======================================
// LIMPIAR MENSAJES AL ESCRIBIR
// ======================================

emailInput.addEventListener('input', () => {
    errorMessage.classList.remove('show');
});

passwordInput.addEventListener('input', () => {
    errorMessage.classList.remove('show');
});

// ======================================
// INICIALIZACIÓN
// ======================================

window.addEventListener('DOMContentLoaded', () => {
    // Cargar email guardado si existe
    loadSavedEmail();

    // El auth.js ya maneja la verificación de sesión automáticamente
    // Si hay sesión activa, redirigirá a inicio.php
});