
<!-- HEADER.PHP -->

<?php

$page_title = $page_title ?? 'Dashboard';
$user_name = $user_name ?? 'Cargando...'; // Se actualizará con JS
$user_role = $user_role ?? 'Cargando...';  // Se actualizará con JS
$user_avatar = $user_avatar ?? 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
?>

<!-- Header Component -->
<header class="header-bg border-b border-gray-200 sticky top-0 z-30">
    <div class="px-4 py-4 flex items-center justify-between">
        <!-- Título alineado a la izquierda -->
        <h1 class="titledashboard text-2xl font-bold"><?php echo htmlspecialchars($page_title); ?></h1>

        <div class="flex items-center gap-4">
            <div class="relative hidden md:block">
                <!-- Aquí puedes agregar búsqueda u otros elementos -->
            </div>
        </div>

        <!-- Botón de perfil -->
        <div class="header flex items-center gap-4">
            <div class="relative">
                <!-- Botón del perfil -->
                <button id="profileButton" class="flex items-center gap-2 rounded-xl px-3 py-2 transition-colors">
                    <img id="headerAvatar" src="<?php echo htmlspecialchars($user_avatar); ?>" alt="Perfil"
                        class="w-8 h-8 rounded-full">
                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path class="flecha" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>

                <!-- Dropdown del perfil -->
                <div id="profileDropdown"
                    class="dropdown hidden absolute right-0 mt-3 w-80 rounded-2xl shadow-xl border overflow-hidden z-50 transition-all duration-300">

                    <!-- Encabezado -->
                    <div class="dropdown-header p-4 backdrop-blur-xl">
                        <div class="flex items-center space-x-4">
                            <img id="dropdownAvatar" src="<?php echo htmlspecialchars($user_avatar); ?>" alt="Usuario"
                                class="w-12 h-12 rounded-full border shadow-sm dropdown-avatar">
                            <div>
                                <p id="dropdownUsername" class="text-base font-semibold dropdown-username">
                                    Cargando...
                                </p>
                                <p id="dropdownEmail" class="text-xs text-gray-500 mt-1">
                                    <!-- Se llenará con JS -->
                                </p>
                                <p id="dropdownRole" class="text-sm dropdown-role">
                                    Cargando...
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Opciones -->
                    <div class="dropdown-body transition-colors duration-300">
                        <button id="logoutButton" onclick="handleLogout()"
                            class="dropdown-logout flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all duration-200 w-full text-left hover:bg-red-50">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 11-4 0v-1m0-8V7a2 2 0 114 0v1">
                                </path>
                            </svg>
                            <span id="logoutText">Cerrar sesión</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- Loading overlay para logout -->
<div id="logoutLoading"
    style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 9999; align-items: center; justify-content: center; flex-direction: column;">
    <div
        style="border: 4px solid rgba(255,255,255,0.3); border-top: 4px solid white; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite;">
    </div>
    <p style="color: white; margin-top: 16px;">Cerrando sesión...</p>
</div>

<style>
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    #logoutLoading.active {
        display: flex !important;
    }

    .dropdown-logout:hover svg {
        color: #dc2626;
    }
</style>

<!-- Header Script -->
<script>
    (function () {
        const profileButton = document.getElementById('profileButton');
        const profileDropdown = document.getElementById('profileDropdown');

        // Toggle dropdown
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

        // ======================================
        // CARGAR DATOS DEL USUARIO
        // ======================================
        async function loadUserData() {
            try {
                // Obtener datos del usuario desde auth.js
                const userData = await auth.getUserData(true);

                if (userData) {
                    // Actualizar nombre
                    const fullName = `${userData.nombres} ${userData.apellidos}`;
                    document.getElementById('dropdownUsername').textContent = fullName;

                    // Actualizar rol (primer rol o "Sin rol")
                    const role = userData.roles && userData.roles.length > 0
                        ? userData.roles[0]
                        : 'Usuario';
                    document.getElementById('dropdownRole').textContent = role;

                    // Mostramos el email del usuario
                    document.getElementById('dropdownEmail').textContent = userData.email_institucional;

                    // Opcional: actualizar avatar si viene del backend
                    // if (userData.avatar_url) {
                    //     document.getElementById('headerAvatar').src = userData.avatar_url;
                    //     document.getElementById('dropdownAvatar').src = userData.avatar_url;
                    // }
                }
            } catch (error) {
                console.error('Error al cargar datos del usuario:', error);
                // Si falla, mantener los valores por defecto del PHP
            }
        }

        // Cargar datos del usuario cuando el DOM esté listo
        if (window.auth) {
            loadUserData();
        } else {
            // Si auth.js aún no está cargado, esperar un momento
            setTimeout(loadUserData, 100);
        }
    })();

    // ======================================
    // FUNCIÓN DE LOGOUT
    // ======================================
    async function handleLogout() {
        const logoutButton = document.getElementById('logoutButton');
        const logoutText = document.getElementById('logoutText');
        const logoutLoading = document.getElementById('logoutLoading');

        // Deshabilitar botón
        logoutButton.disabled = true;
        logoutText.textContent = 'Cerrando...';

        // Mostrar loading overlay
        logoutLoading.classList.add('active');

        try {
            // Llamar a la función de logout del servicio auth
            await auth.logout();
            // auth.logout() ya redirige a index.php automáticamente
        } catch (error) {
            console.error('Error durante el logout:', error);

            // Incluso si falla, forzar redirección al login
            logoutLoading.classList.remove('active');
            window.location.href = 'index.php';
        }
    }
</script>