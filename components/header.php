<?php

$page_title = $page_title ?? 'Dashboard';
$user_name = $user_name ?? 'Nombre del Usuario';
$user_role = $user_role ?? 'Administrador';
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
                <button id="profileButton"
                    class="flex items-center gap-2 rounded-xl px-3 py-2 transition-colors">
                    <img src="<?php echo htmlspecialchars($user_avatar); ?>" alt="Perfil"
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
                            <img src="<?php echo htmlspecialchars($user_avatar); ?>" alt="Usuario"
                                class="w-12 h-12 rounded-full border shadow-sm dropdown-avatar">
                            <div>
                                <p class="text-base font-semibold dropdown-username">
                                    <?php echo htmlspecialchars($user_name); ?>
                                </p>
                                <p class="text-sm dropdown-role">
                                    <?php echo htmlspecialchars($user_role); ?>
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Opciones -->
                    <div class="dropdown-body transition-colors duration-300">
                        <a href="index.php"
                            class="dropdown-logout flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all duration-200">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 11-4 0v-1m0-8V7a2 2 0 114 0v1">
                                </path>
                            </svg>
                            Cerrar sesión
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- Header Script -->
<script>
(function() {
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
})();
</script>