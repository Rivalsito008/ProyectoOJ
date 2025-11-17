<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGEN - Sistema de Gestión Notarial</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="Style/configuracion.css">
</head>

<body>
    <?php
    $usuario = [
        'nombre' => 'Admin User',
        'rol' => 'Administrador',
        'email' => 'admin@sigen.com'
    ];
    ?>
    <!-- Sidebar -->
    <aside id="sidebar" class="sidebar sidebar-collapsed fixed top-0 left-0 z-40 h-screen">
        <div class="h-full px-3 py-4 overflow-y-auto">
            <div class="flex items-center justify-center mb-6 px-2 h-10">
                <div id="logo-compact" class="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">SG</div>
                <h2 id="logo-full" class="hidden text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent ml-3">SIGEN</h2>
            </div>

            <nav class="space-y-2">
                <a href="inicio.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <span class="nav-label hidden font-medium whitespace-nowrap ml-3">Inicio</span>
                </a>
                <a href="form.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span class="nav-label hidden font-medium whitespace-nowrap ml-3">Formulario</span>
                </a>
                <a href="respuestas.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    <span class="nav-label hidden font-medium whitespace-nowrap ml-3">Resultados</span>
                </a>
                <a href="preguntas.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="nav-label hidden font-medium whitespace-nowrap ml-3">Preguntas</span>
                </a>
                <a href="usuarios.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    <span class="nav-label hidden font-medium whitespace-nowrap ml-3">Usuarios</span>
                </a>
                <a href="tribunales.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path
                            d="M3 21h18M4 21v-9M8 21v-9M12 21v-9M16 21v-9M20 21v-9 M2 12h20 M12 3L3 9h18L12 3z"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    <span class="nav-label hidden font-medium whitespace-nowrap ml-3">Tribunales</span>
                </a>
                <a href="configuracion.php" class="nav-item active flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span class="nav-label hidden font-medium whitespace-nowrap ml-3">Configuración</span>
                </a>
            </nav>
        </div>
    </aside>

    <!-- Main Content -->
    <div class="content">
        <!-- Header -->
        <header class="header-bg border-b border-gray-200 sticky top-0 z-30">
            <div class="px-4 py-4 flex items-center justify-between">
                <!-- Título alineado a la izquierda -->
                <h1 class="titledashboard text-2xl font-bold">Configuración</h1>
                <div class="flex items-center gap-4">
                    <div class="relative hidden md:block">
                    </div>
                </div>
                <div class="header flex items-center gap-4">
                    <!--Botón de perfil -->
                    <div class="relative">
                        <!-- Botón del perfil -->
                        <button id="profileButton" class="flex items-center gap-2 rounded-xl px-3 py-2 transition-colors">
                            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Perfil" class="w-8 h-8 rounded-full">
                            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path class="flecha" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        <!-- Dropdown del perfil -->
                        <div id="profileDropdown"
                            class="dropdown hidden absolute right-0 mt-3 w-80 rounded-2xl shadow-xl border border-gray-200 dark:border-transparent overflow-hidden z-50 transition-all duration-300">

                            <!-- Encabezado -->
                            <div class="p-4 bg-[var(--dropdown-color)] dark:bg-[#2b2343] backdrop-blur-xl">
                                <div class="flex items-center space-x-4">
                                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                        alt="Usuario"
                                        class="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm">
                                    <div>
                                        <p class="text-base font-semibold text-gray-900 dark:text-gray-100">Nombre del Usuario</p>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Administrador</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Opciones -->
                            <div class="bg-[var(--dropdown-color)] dark:bg-[#241c37] transition-colors duration-300">
                                <a href="logout.php"
                                    class="flex items-center gap-3 px-5 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-[#3c2a4b] transition-all duration-200">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 11-4 0v-1m0-8V7a2 2 0 114 0v1"></path>
                                    </svg>
                                    Cerrar sesión
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
        </header>

        <!-- Dashboard Content -->
        <main class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Modo de tema -->
                <div class="card rounded-xl p-6 shadow">
                    <h2 class="text-xl font-semibold mb-4">Modo de tema</h2>
                    <label class="flex items-center gap-2 mb-2 cursor-pointer">
                        <input type="radio" name="theme" value="light" class="cursor-pointer">
                        <span>Claro</span>
                    </label>
                    <label class="flex items-center gap-2 mb-2 cursor-pointer">
                        <input type="radio" name="theme" value="dark" class="cursor-pointer">
                        <span>Oscuro</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="theme" value="auto" class="cursor-pointer" checked>
                        <span>Automático</span>
                    </label>
                </div>

                <!-- Tamaño de fuente -->
                <div class="card rounded-xl p-6 shadow">
                    <h2 class="text-xl font-semibold mb-4">Tamaño de fuente</h2>
                    <input id="fontRange" type="range" min="14" max="22" value="16" class="w-full cursor-pointer">
                    <p class="mt-2 text-sm">Tamaño actual: <span id="fontValue" class="font-semibold">16px</span></p>
                </div>

                <!-- Contraste -->
                <div class="card rounded-xl p-6 shadow md:col-span-2">
                    <h2 class="text-xl font-semibold mb-4">Contraste</h2>
                    <input id="contrastRange" type="range" min="0.8" max="1.6" step="0.1" value="1" class="w-full cursor-pointer">
                    <p class="mt-2 text-sm">Nivel de contraste: <span id="contrastValue" class="font-semibold">1.0</span></p>
                </div>

                <!-- Cuenta -->
                <div class="card rounded-xl p-6 shadow md:col-span-2">
                    <h2 class="text-xl font-semibold mb-4">Cuenta</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button id="btnEditarPerfil" class="btn-primary py-3 rounded-lg transition">
                            Editar perfil
                        </button>
                        <button id="btnCambiarClave" class="btn-primary py-3 rounded-lg transition">
                            Solicitar cambio de contraseña
                        </button>
                        <button id="btnVerificacion" class="btn-primary py-3 rounded-lg transition">
                            Activar verificación en dos pasos
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <script src="JS/configuracion.js"></script>
</body>

</html>