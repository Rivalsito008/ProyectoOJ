// LOGIN.JS - Lógica del formulario de login


// ======================================
// ELEMENTOS DEL DOM
// ======================================
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

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    successMessage.classList.remove('show');

    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.classList.add('show');
    errorMessage.classList.remove('show');
}

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

// ======================================
// VALIDACIÓN
// ======================================

function validateForm(email, password) {
    if (!email || !password) {
        showError('Por favor, completa todos los campos');
        return false;
    }

    if (!email.includes('@') || !email.includes('@csj.gob.sv')) {
        showError('Por favor, ingresa un correo electrónico válido');
        return false;
    }

    if (password.length < 4) {
        showError('La contraseña debe tener al menos 4 caracteres');
        return false;
    }

    return true;
}

// ======================================
// MANEJO DEL FORMULARIO
// ======================================

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Obtener valores
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const remember = rememberCheckbox.checked;

    // Validar
    if (!validateForm(email, password)) {
        return;
    }

    // Mostrar loading
    showLoading(true);

    try {
        // Usar el servicio de autenticación
        const result = await auth.login(email, password, remember);

        if (result.success) {
            // Login exitoso
            showSuccess('¡Inicio de sesión exitoso! Redirigiendo...');

            // Redirigir después de 1 segundo
            setTimeout(() => {
                window.location.href = 'inicio.php';
            }, 1000);
        } else {
            // Error en la respuesta
            showLoading(false);
            showError(result.message || 'Error al iniciar sesión');
        }

    } catch (error) {
        showLoading(false);

        // Manejar diferentes tipos de errores
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;

            switch (status) {
                case 401:
                    showError('Credenciales incorrectas. Verifica tu correo y contraseña.');
                    break;
                case 422:
                    // Errores de validación
                    if (data.errors) {
                        const firstError = Object.values(data.errors)[0][0];
                        showError(firstError);
                    } else {
                        showError(data.message || 'Datos inválidos');
                    }
                    break;
                case 429:
                    showError('Demasiados intentos. Intenta nuevamente más tarde.');
                    break;
                case 500:
                    showError('Error en el servidor. Intenta nuevamente más tarde.');
                    break;
                default:
                    showError(data.message || 'Error al iniciar sesión. Intenta nuevamente.');
            }
        } else if (error.request) {
            // Error de red
            showError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
        } else {
            // Error desconocido
            showError('Ocurrió un error inesperado. Intenta nuevamente.');
        }

        console.error('Error de login:', error);
    }
});

// ======================================
// CARGAR EMAIL RECORDADO
// ======================================

window.addEventListener('DOMContentLoaded', () => {
    // Cargar email guardado
    const savedEmail = auth.getSavedEmail();
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }
});

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
// PREVENIR DOBLE SUBMIT
// ======================================

let isSubmitting = false;
form.addEventListener('submit', (e) => {
    if (isSubmitting) {
        e.preventDefault();
        return false;
    }
    isSubmitting = true;
    setTimeout(() => { isSubmitting = false; }, 3000);
});