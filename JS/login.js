// ======================================
// CONFIGURACIÓN
// ======================================
const API_URL = 'http://localhost:8000/api'; // Cambia esto a tu URL de API

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
// CONFIGURAR AXIOS
// ======================================
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

// ======================================
// FUNCIONES DE UTILIDAD
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

function saveSession(token, userData) {
    // Guardar token
    localStorage.setItem('sigen-token', token);

    // Guardar datos del usuario
    localStorage.setItem('sigen-user', JSON.stringify(userData));

    // Si "recordarme" está marcado, guardar email
    if (rememberCheckbox.checked) {
        localStorage.setItem('sigen-email', emailInput.value);
    } else {
        localStorage.removeItem('sigen-email');
    }
}

// ======================================
// MANEJAR ENVÍO DEL FORMULARIO
// ======================================

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Obtener valores
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validación básica
    if (!email || !password) {
        showError('Por favor, completa todos los campos');
        return;
    }

    if (!email.includes('@')) {
        showError('Por favor, ingresa un correo electrónico válido');
        return;
    }

    // Mostrar loading
    showLoading(true);

    try {
        // Hacer petición al API
        const response = await axios.post('/auth/login', {
            email_institucional: email,
            contrasena: password
        });

        // Verificar respuesta exitosa
        if (response.data.success) {
            const { access_token, usuario } = response.data.data;

            // Guardar sesión
            saveSession(access_token, usuario);

            // Mostrar mensaje de éxito
            showSuccess('¡Inicio de sesión exitoso! Redirigiendo...');

            // Redirigir después de 1 segundo
            setTimeout(() => {
                window.location.href = 'inicio.php';
            }, 1000);
        } else {
            showLoading(false);
            showError(response.data.message || 'Error al iniciar sesión');
        }

    } catch (error) {
        showLoading(false);

        // Manejar diferentes tipos de errores
        if (error.response) {
            // Error de respuesta del servidor
            const status = error.response.status;
            const data = error.response.data;

            if (status === 401) {
                showError('Credenciales incorrectas. Verifica tu correo y contraseña.');
            } else if (status === 422) {
                // Errores de validación
                const errors = data.errors;
                const firstError = Object.values(errors)[0][0];
                showError(firstError);
            } else if (status === 500) {
                showError('Error en el servidor. Intenta nuevamente más tarde.');
            } else {
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
    const savedEmail = localStorage.getItem('sigen-email');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }

    // Verificar si ya hay una sesión activa
    const token = localStorage.getItem('sigen-token');
    if (token) {
        showLoading(true, 'Sesión activa detectada. Redirigiendo...');
        setTimeout(() => {
            window.location.href = 'inicio.php';
        }, 500);
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