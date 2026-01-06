<?php
/**
 * AUTH HELPER - Funciones de Autenticación y Autorización
 * =========================================================
 * 
 * Funciones auxiliares para verificar permisos de acceso basados en roles.
 * 
 * FUNCIONES PRINCIPALES:
 * - getUserRole(): Obtiene el rol del usuario autenticado
 * - hasPageAccess(): Verifica si un rol tiene acceso a una página
 * - requirePageAccess(): Protege una página, redirige si no tiene acceso
 * - getAccessiblePages(): Obtiene lista de páginas accesibles para un rol
 */

/**
 * Obtiene el rol del usuario autenticado desde la sesión
 * 
 * @return string|null Nombre del rol en minúsculas o null si no está autenticado
 */
function getUserRole()
{
    // Asegurarse de que la sesión esté iniciada
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    // Verificar si hay un usuario en sesión
    if (!isset($_SESSION['user'])) {
        return null;
    }

    $user = $_SESSION['user'];

    // Obtener el rol del usuario
    if (isset($user['roles']) && is_array($user['roles']) && count($user['roles']) > 0) {
        return strtolower($user['roles'][0]); // Primer rol activo
    }

    if (isset($user['rol'])) {
        return strtolower($user['rol']);
    }

    if (isset($user['usuario_roles']) && is_array($user['usuario_roles'])) {
        foreach ($user['usuario_roles'] as $userRole) {
            if (isset($userRole['estado']) && $userRole['estado'] === 'Activo') {
                if (isset($userRole['rol']['rol'])) {
                    return strtolower($userRole['rol']['rol']);
                }
            }
        }
    }

    return null;
}

/**
 * Verifica si un rol tiene acceso a una página específica
 * 
 * @param string $page Nombre del archivo de la página (ej: 'usuarios.php')
 * @param string|null $role Rol a verificar (si es null, usa el rol del usuario actual)
 * @return bool True si tiene acceso, False si no
 */
function hasPageAccess($page, $role = null)
{
    // Si no se proporciona rol, obtener el del usuario actual
    if ($role === null) {
        $role = getUserRole();
    }

    // Si no hay rol, no tiene acceso
    if ($role === null) {
        return false;
    }

    // Convertir rol a minúsculas para comparación
    $role = strtolower($role);

    // Cargar configuración de permisos
    $permissionsFile = __DIR__ . '/../config/permissions.php';

    if (!file_exists($permissionsFile)) {
        error_log("Archivo de permisos no encontrado: $permissionsFile");
        return false;
    }

    $permissions = require $permissionsFile;

    // Verificar si el rol existe en la configuración
    if (!isset($permissions[$role])) {
        error_log("Rol no encontrado en configuración de permisos: $role");
        return false;
    }

    $allowedPages = $permissions[$role];

    // Si tiene wildcard (*), tiene acceso a todo
    if (in_array('*', $allowedPages)) {
        return true;
    }

    // Verificar si la página está en la lista de permitidas
    return in_array($page, $allowedPages);
}

/**
 * Protege una página requiriendo acceso autorizado
 * Redirige a inicio.php si el usuario no tiene acceso
 * 
 * @param string $page Nombre del archivo de la página a proteger
 * @param string $redirectTo Página de redirección si no tiene acceso (default: 'inicio.php')
 * @return void
 */
function requirePageAccess($page, $redirectTo = 'inicio.php')
{
    // Verificar si tiene acceso
    if (!hasPageAccess($page)) {
        // Obtener rol del usuario para logging
        $role = getUserRole();
        error_log("Acceso denegado a $page para rol: " . ($role ?? 'sin rol'));

        // Guardar mensaje de error en sesión
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        $_SESSION['access_denied'] = true;
        $_SESSION['access_denied_page'] = $page;

        // Redirigir
        header("Location: $redirectTo");
        exit();
    }
}

/**
 * Obtiene la lista de páginas accesibles para un rol
 * 
 * @param string|null $role Rol a consultar (si es null, usa el rol del usuario actual)
 * @return array Lista de páginas permitidas
 */
function getAccessiblePages($role = null)
{
    // Si no se proporciona rol, obtener el del usuario actual
    if ($role === null) {
        $role = getUserRole();
    }

    // Si no hay rol, retornar array vacío
    if ($role === null) {
        return [];
    }

    // Convertir rol a minúsculas
    $role = strtolower($role);

    // Cargar configuración de permisos
    $permissionsFile = __DIR__ . '/../config/permissions.php';

    if (!file_exists($permissionsFile)) {
        return [];
    }

    $permissions = require $permissionsFile;

    // Retornar páginas permitidas o array vacío
    return $permissions[$role] ?? [];
}

/**
 * Verifica si hay un mensaje de acceso denegado y lo muestra
 * Debe llamarse en la página de destino (ej: inicio.php)
 * 
 * @return array|null Array con información del error o null si no hay error
 */
function checkAccessDeniedMessage()
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    if (isset($_SESSION['access_denied']) && $_SESSION['access_denied'] === true) {
        $page = $_SESSION['access_denied_page'] ?? 'página desconocida';

        // Limpiar mensaje de sesión
        unset($_SESSION['access_denied']);
        unset($_SESSION['access_denied_page']);

        return [
            'denied' => true,
            'page' => $page,
            'message' => "No tienes permisos para acceder a: $page"
        ];
    }

    return null;
}
