// AUTH.JS - Servicio de Autenticación
// ======================================

const API_URL = 'http://localhost:8000/api';

// Cache en memoria
let userDataCache = null;
let isAuthenticatedCache = false;

// =============================
// CONFIGURACIÓN DE AXIOS
// =============================
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true; // IMPORTANTE: permite enviar cookies

// =============================
// FUNCIONES DE AUTENTICACIÓN
// =============================

/**
 * Login - Autentica al usuario
 * @param {string} email - Email institucional
 * @param {string} password - Contraseña
 * @param {boolean} remember - Recordar email
 * @returns {Promise<Object>} Resultado del login
 */
async function login(email, password, remember = false) {
    try {
        const response = await axios.post('/auth/login', {
            email_institucional: email,
            contrasena: password
        });

        if (response.data.success) {
            // Guardar datos en cache
            userDataCache = response.data.data.usuario || response.data.data;
            isAuthenticatedCache = true;

            // Opción "Recordarme" - solo guarda el email
            if (remember) {
                localStorage.setItem('sigen-email', email);
            } else {
                localStorage.removeItem('sigen-email');
            }

            return {
                success: true,
                user: userDataCache
            };
        }

        return {
            success: false,
            message: response.data.message || 'Error al iniciar sesión'
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Logout - Cierra la sesión del usuario
 */
async function logout() {
    try {
        await axios.post('/auth/logout');
    } catch (error) {
        console.error('Error al cerrar sesión en el servidor:', error);
    } finally {
        // Limpiar cache
        userDataCache = null;
        isAuthenticatedCache = false;

        // NO limpiar el email si está guardado (para "Recordarme")
        // localStorage.removeItem('sigen-email'); // COMENTADO

        // Redirigir al login
        window.location.href = 'index.php';
    }
}

/**
 * Obtiene los datos del usuario desde el servidor
 * @param {boolean} useCache - Usar cache si existe
 * @returns {Promise<Object|null>} Datos del usuario
 */
async function getUserData(useCache = false) {
    // Si hay cache y se permite usarlo, retornar
    if (useCache && userDataCache) {
        return userDataCache;
    }

    try {
        const response = await axios.get('/auth/me');

        if (response.data.success) {
            userDataCache = response.data.data;
            isAuthenticatedCache = true;
            return userDataCache;
        }

        return null;
    } catch (error) {
        if (error.response?.status === 401) {
            userDataCache = null;
            isAuthenticatedCache = false;
        }
        throw error;
    }
}

/**
 * Verifica si el usuario está autenticado
 * @returns {Promise<boolean>}
 */
async function isAuthenticated() {
    try {
        await getUserData();
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Protege páginas que requieren autenticación
 * Redirige al login si no está autenticado
 */
async function requireAuth() {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            console.warn('No autenticado, redirigiendo al login...');
            window.location.href = 'index.php';
        }
    } catch (error) {
        console.error('Error al verificar autenticación:', error);
        window.location.href = 'index.php';
    }
}

// =============================
// FUNCIONES DE UTILIDAD
// =============================

/**
 * Obtiene el email del usuario autenticado
 */
async function getUserEmail() {
    try {
        const user = await getUserData(true);
        return user?.email_institucional || null;
    } catch (error) {
        return null;
    }
}

/**
 * Obtiene el nombre completo del usuario
 */
async function getUserFullName() {
    try {
        const user = await getUserData(true);
        if (user) {
            return `${user.nombres || ''} ${user.apellidos || ''}`.trim();
        }
        return null;
    } catch (error) {
        return null;
    }
}

/**
 * Obtiene los roles del usuario
 */
async function getUserRoles() {
    try {
        const user = await getUserData(true);
        return user?.roles || [];
    } catch (error) {
        return [];
    }
}

/**
 * Verifica si el usuario tiene un rol específico
 */
async function hasRole(role) {
    const roles = await getUserRoles();
    return roles.includes(role);
}

/**
 * Verifica si el usuario es administrador
 */
async function isAdmin() {
    return await hasRole('admin');
}

/**
 * Obtiene el email guardado (función "Recordarme")
 */
function getSavedEmail() {
    return localStorage.getItem('sigen-email') || '';
}

// =============================
// INTERCEPTOR DE AXIOS
// =============================

// Maneja respuestas 401 (No autenticado)
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            console.warn('Sesión expirada. Redirigiendo al login...');
            userDataCache = null;
            isAuthenticatedCache = false;

            // Solo redirigir si no estamos ya en el login
            const isLoginPage = window.location.pathname.includes('index.php') ||
                window.location.pathname.endsWith('/') ||
                window.location.pathname === '/';

            if (!isLoginPage) {
                window.location.href = 'index.php';
            }
        }
        return Promise.reject(error);
    }
);

// =============================
// INICIALIZACIÓN
// =============================

window.addEventListener('DOMContentLoaded', async function () {
    const isLoginPage = window.location.pathname.includes('index.php') ||
        window.location.pathname.endsWith('/') ||
        window.location.pathname === '/';

    if (isLoginPage) {
        // Si estamos en login, verificar si ya hay sesión activa
        try {
            const authenticated = await isAuthenticated();
            if (authenticated) {
                console.log('Sesión activa detectada, redirigiendo...');
                window.location.href = 'inicio.php';
            }
        } catch (error) {
            // No hay sesión, el usuario puede hacer login
        }
        return;
    }

    // Para todas las demás páginas, requerir autenticación
    await requireAuth();
});

// ======================================
// EXPORTAR FUNCIONES
// ======================================
window.auth = {
    // Autenticación
    login,
    logout,
    isAuthenticated,
    requireAuth,

    // Usuario
    getUserData,
    getUserFullName,
    getUserEmail,
    getUserRoles,

    // Roles
    hasRole,
    isAdmin,

    // Utilidades
    getSavedEmail
};