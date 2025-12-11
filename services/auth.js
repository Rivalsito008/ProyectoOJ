
const API_URL = 'http://localhost:8000/api';


// Datos de cache en memoria
let userDataCache = null;
let isAuthenticatedCache = false;

// =============================
// CONFIGURACION DE AXIOS
// =============================
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true; // nos permite enviar cookies


// =============================
// FUNCIONES DE AUTH
// =============================


// Obtenemos los datos del usuario desde el servidor - auth/me
async function getUserData(useCache = false) {

    // si se encuentra cache existente se permite usar y retonar esos datos
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

        // retornamos por defecto null, en caso de no encontrarse datos
        return null;
    } catch (error) {
        if (error.response?.status === 401) {
            userDataCache = null;
            isAuthenticatedCache = false;
        }

        throw error;
    }
}

// Verificamos que el usuario esta autenticado
async function isAuthenticated() {
    try {
        await getUserData();
        return true;
    } catch (error) {
        return false;
    }
}

// Login
async function login(email, pwd, remember = false) {
    try {
        const response = await axios.post('/auth/login', {
            email_institucional: email,
            contrasena: pwd
        });

        if (response.data.success) {
            // guardamos los datos en la cache de memoria
            userDataCache = response.data.data.usuario;
            isAuthenticated = true;

            // opcion recordarme
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
            success: true,
            message: response.data.message
        };
    } catch (error) {
        throw error;
    }
}

// logout
async function logout() {
    try {
        await axios.post('/auth/logout');
    } catch (error) {
        console.error('Error al cerrar la sesion del usuario desde el servidor', error);
    } finally {
        userDataCache = null;
        isAuthenticated = false;

        localStorage.removeItem('sigen-email');

        window.location.href = 'index.php';
    }
}


// Funcion para proteger las paginas con auth
async function requireAuth() {
    try {
        const authenticated = await isAuthenticated;
        if (!authenticated) {
            console.error('No has iniciado sesion, redirigiendo al login');
            window.location.href = 'index.php';
        }
    } catch (error) {
        console.error('Error al verificar autenticación', error);
        window.location.href = 'index.php';
    }
}



// FUNCIONES DE UTILIDAD


// obtenemos el roles del usuario
async function getUserRoles() {
    try {
        const user = await getUserData(true);
        return user?.roles || [];
    } catch (error) {
        return [];
    }
}

// verificamos que el usuario tiene un rol en especifico
async function hasRole(rol) {
    const roles = await getUserRoles();
    return roles.includes(rol);
}


// verificamos que el usuario tenga rol de administrador
async function isAdmin() {
    return await hasRole('admin');
}



// =============================
// INTERCEPTOR DE AXIOS
// =============================

// para 401 (no autenticado)
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            console.warn('Sesión expirada. Rediriendo al login.... ');
            userDataCache = null;
            isAuthenticated = false;
            window.location.href = 'index.php';
        }

        return Promise.reject(error);
    }
);


// =============================
// INICIALIZACIÓN
// =============================

window.addEventListener('DOMContentLoaded', async function () {
    const isLoginPage = window.location.pathname.includes('index.php') || window.location.pathname.endsWith('/');

    if (isLoginPage) {
        // verificamos que existe sesion
        try {
            const authenticated = await isAuthenticated();
            if (authenticated) {
                console.log('sesion activa');
                window.location.href = 'inicio.php';
            }
        } catch (error) {

        }

        return;
    }

    // para el resto de paginas requerimos de autenticación
    await requireAuth();
});


// ======================================
// EXPORTAR FUNCIONES
// ======================================
window.auth = {
    getUserData,
    isAuthenticated,
    login,
    logout,
    requireAuth,
    // getUserFullName,
    getUserRoles,
    hasRole,
    isAdmin
};