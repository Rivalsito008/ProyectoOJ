<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGEN - Sistema de Gestión Notarial</title>
    <script>
        (function() {
            // Aplicar tema
            const t = localStorage.getItem('theme-preference') || 'auto';
            let f = t;
            if (t === 'auto') {
                f = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            document.documentElement.setAttribute('data-theme', f);

            // Aplicar tamaño de fuente
            const fontSize = localStorage.getItem('font-size') || '16';
            document.documentElement.style.setProperty('--font-size', fontSize + 'px');

            // Aplicar contraste
            const contrast = localStorage.getItem('contrast') || '1';
            document.documentElement.style.setProperty('--contrast', contrast);
        })();
    </script>
    <script src="https://cdn.tailwindcss.com"></script>

    <style>
        :root {
            --bg-color: #f9fafb;
            --text-color: #111827;
            --card-bg: #ffffff;
            --border-color: #e5e7eb;
            --sidebar-bg: #ffffff;
            --text-colorsdb: #3d444d;
            --titledashboard: #000000ff;
            --border-color-card: #d8d8d8ff;
            --contrast: 1;
            --item-active: #3b82f6;
            --hover-item: rgba(99, 99, 99, 0.1);
            --hover-hd: rgba(99, 99, 99, 0.1);
            --font-size: 16px;
            --text-colorcrd: #111827;
            --text-colorhd: #111827;
            --text-colorhd: #111827;
            --dropdown-color: #ffffff;
        }

        [data-theme="dark"] {
            --titledashboard: #ffffffff;
            --bg-color: #e4e4e4ff;
            --text-colorcrd: #000000ff;
            --text-colorsdb: #ffffffff;
            --text-colorhd: #ffffffff;
            --card-bg: #ffffffff;
            --sidebar-bg: #2a2240;
            --border-color: #3d3454;
            --hover-hd: rgba(108, 85, 150, 0.35);
            --flecha-color: #ffffffff;
            --hover-item: rgba(108, 85, 150, 0.35);
            --item-active: #6c55ba;
            --border-color-card: #b4b4b4ff;
            --dropdown-color: #ffffffff;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-colorcrd);
            font-size: var(--font-size);
            transition: all 0.3s ease;
        }

        /* ===== SIDEBAR ===== */
        .sidebar {
            transition: width 0.3s ease;
            background-color: var(--sidebar-bg);
            color: var(--text-colorsdb);
            border-right: 1px solid var(--border-color);
        }

        .sidebar-collapsed {
            width: 80px;
        }

        .sidebar-expanded {
            width: 256px;
        }

        .content {
            margin-left: 80px;
            transition: margin-left 0.3s ease;
        }

        /* ===== NAV ITEMS ===== */
        .nav-item {
            transition: all 0.25s ease;
            color: var(--text-colorsdb);
            border-radius: 0.5rem;
        }

        .nav-item:hover {
            background-color: var(--hover-item);
            color: var(--text-colorsdb);
        }

        [data-theme="dark"] .nav-item:hover {
            background-color: var(--hover-item);
            color: #ffffff;
            box-shadow: inset 0 0 6px rgba(180, 160, 255, 0.2);
            transform: translateX(2px);
        }

        .nav-item.active {
            background-color: var(--item-active);
            color: #ffffff;
            box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.1);
        }

        .nav-item.active:hover {
            background-color: var(--item-active);
            color: #ffffff;
            transform: none;
        }

        .flecha {
            stroke: var(--flecha-color);
            transition: stroke 0.3s ease;
        }

        .nav-item svg {
            min-width: 20px;
        }

        /* ===== DROPDOWN ===== */
        .dropdown {
            background-color: var(--dropdown-color);
            border-radius: 0.75rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .dropdown:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            border-color: rgba(108, 85, 150, 0.3);
            /* leve cambio al pasar el mouse */
        }

        /* ===== HEADER ===== */
        .header-bg {
            background-color: var(--sidebar-bg);
            border-bottom: 1px solid var(--border-color);
            color: var(--text-colorhd);
        }

        .header:hover {
            background-color: var(--hover-hd);
            border-radius: 0.75rem;
            color: #ffffff;
            box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.1);
            transform: none;
        }

        .titledashboard {
            color: var(--titledashboard);
            transition: color 0.3s ease;
        }

        .hide-on-collapse {
            display: none;
        }

        .hidden {
            display: none;
        }

        /* ===== TABS ===== */
        .tabs-container {
            background: transparent;
            padding-top: 8px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .tabs-wrapper {
            display: flex;
            gap: 8px;
            padding: 0 8px;
        }

        .browser-tab {
            position: relative;
            padding: 12px 20px;
            background: transparent;
            border-radius: 8px 8px 0 0;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 50px;
            width: 50px;
            border: none;
            overflow: hidden;
        }

        .browser-tab:hover,
        .browser-tab.active {
            width: 160px;
            min-width: 160px;
            padding: 12px 20px;
        }

        .browser-tab:hover:not(.active) {
            background: var(--hover-item);
        }

        .browser-tab.active {
            background: var(--card-bg);
            box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
        }

        .tab-indicator {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            flex-shrink: 0;
            transition: transform 0.3s ease;
        }

        .browser-tab:hover .tab-indicator,
        .browser-tab.active .tab-indicator {
            transform: scale(1.1);
        }

        .tab-label {
            font-weight: 500;
            color: var(--text-colorcrd);
            font-size: 14px;
            user-select: none;
            white-space: nowrap;
            opacity: 0;
            transform: translateX(-10px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .browser-tab:hover .tab-label,
        .browser-tab.active .tab-label {
            opacity: 1;
            transform: translateX(0);
        }

        .tab-content-wrapper {
            background: var(--card-bg);
            min-height: 500px;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        /* ===== TABLES ===== */
        table {
            background-color: var(--card-bg);
            color: var(--text-colorcrd);
        }

        thead {
            background-color: var(--bg-color);
            color: var(--text-colorcrd);
        }

        tbody tr {
            background-color: var(--card-bg);
            border-bottom: 1px solid var(--border-color);
        }

        /* ===== MODAL ===== */
        .modal-content {
            background-color: var(--card-bg);
            color: var(--text-colorcrd);
        }

        .modal-header {
            background-color: var(--bg-color);
            border-bottom: 1px solid var(--border-color);
        }

        .modal-footer {
            background-color: var(--bg-color);
            border-top: 1px solid var(--border-color);
        }

        input,
        select {
            background-color: var(--card-bg);
            color: var(--text-colorcrd);
            border-color: var(--border-color);
        }

        .modal-animate {
            animation: slideDown 0.2s ease-out;
        }

        #profileButton:hover {
            background-color: var(--hover-hd);
        }
    </style>
</head>

<body>
    <!-- Sidebar -->
    <aside id="sidebar" class="sidebar sidebar-collapsed fixed top-0 left-0 z-40 h-screen">
        <div class="h-full px-3 py-4 overflow-y-auto">
            <div class="flex items-center justify-center mb-6 px-2 h-10">
                <div id="logo-compact" class="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">SG</div>
                <h2 id="logo-full" class="hide-on-collapse text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent ml-3">SIGEN</h2>
            </div>

            <nav class="space-y-2">
                <a href="inicio.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Inicio</span>
                </a>
                <a href="form.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Formulario</span>
                </a>
                <a href="respuestas.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Resultados</span>
                </a>
                <a href="preguntas.php" class="nav-item active flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Preguntas</span>
                </a>
                <a href="usuarios.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Usuarios</span>
                </a>
                <a href="configuracion.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Configuración</span>
                </a>
            </nav>
        </div>
    </aside>

    <!-- Main Content -->
    <div class="content">
        <!--HEADER-->
        <header class="header-bg border-b border-gray-200 sticky top-0 z-30">
            <div class="px-4 py-4 flex items-center justify-between">
                <!-- Título alineado a la izquierda -->
                <h1 class="titledashboard text-2xl font-bold">Preguntas</h1>
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

        <!-- Content -->
        <main class="p-6">
            <!-- Pestañas estilo navegador -->
            <div class="tabs-container">
                <div class="tabs-wrapper">
                    <!-- Pestaña Todo -->
                    <div class="browser-tab active" data-tab="todo">
                        <div class="tab-indicator bg-blue-500"></div>
                        <span class="tab-label">Todo</span>
                    </div>

                    <!-- Pestaña Bajo -->
                    <div class="browser-tab" data-tab="bajo">
                        <div class="tab-indicator bg-green-500"></div>
                        <span class="tab-label">Bajo</span>
                    </div>

                    <!-- Pestaña Moderado -->
                    <div class="browser-tab" data-tab="moderado">
                        <div class="tab-indicator bg-yellow-400"></div>
                        <span class="tab-label">Moderado</span>
                    </div>

                    <!-- Pestaña Alto -->
                    <div class="browser-tab" data-tab="alto">
                        <div class="tab-indicator bg-red-500"></div>
                        <span class="tab-label">Alto</span>
                    </div>

                    <!-- Pestaña Extremo -->
                    <div class="browser-tab" data-tab="extremo">
                        <div class="tab-indicator bg-red-700"></div>
                        <span class="tab-label">Extremo</span>
                    </div>

                    <!-- Activador Automático -->
                    <div class="browser-tab" data-tab="activador">
                        <div class="tab-indicator bg-red-900"></div>
                        <span class="tab-label">Activador</span>
                    </div>
                </div>

                <!-- Contenido de las pestañas -->
                <div class="tab-content-wrapper">
                    <!-- Tab: Todo -->
                    <div class="tab-content active" id="todo">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left">
                                <thead class="text-xs uppercase">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">ID</th>
                                        <th scope="col" class="px-6 py-3">Pregunta</th>
                                        <th scope="col" class="px-6 py-3">Ámbito</th>
                                        <th scope="col" class="px-6 py-3">Estado</th>
                                        <th scope="col" class="px-6 py-3">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Tab: Bajo -->
                    <div class="tab-content" id="bajo">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left">
                                <thead class="text-xs uppercase">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">ID</th>
                                        <th scope="col" class="px-6 py-3">Pregunta</th>
                                        <th scope="col" class="px-6 py-3">Ámbito</th>
                                        <th scope="col" class="px-6 py-3">Estado</th>
                                        <th scope="col" class="px-6 py-3">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="px-6 py-4" colspan="5">Preguntas de nivel bajo</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Tab: Moderado -->
                    <div class="tab-content" id="moderado">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left">
                                <thead class="text-xs uppercase">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">ID</th>
                                        <th scope="col" class="px-6 py-3">Pregunta</th>
                                        <th scope="col" class="px-6 py-3">Ámbito</th>
                                        <th scope="col" class="px-6 py-3">Estado</th>
                                        <th scope="col" class="px-6 py-3">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="px-6 py-4" colspan="5">Preguntas de nivel moderado</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Tab: Alto -->
                    <div class="tab-content" id="alto">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left">
                                <thead class="text-xs uppercase">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">ID</th>
                                        <th scope="col" class="px-6 py-3">Pregunta</th>
                                        <th scope="col" class="px-6 py-3">Ámbito</th>
                                        <th scope="col" class="px-6 py-3">Estado</th>
                                        <th scope="col" class="px-6 py-3">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="px-6 py-4" colspan="5">Preguntas de nivel alto</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Tab: Extremo -->
                    <div class="tab-content" id="extremo">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left">
                                <thead class="text-xs uppercase">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">ID</th>
                                        <th scope="col" class="px-6 py-3">Pregunta</th>
                                        <th scope="col" class="px-6 py-3">Ámbito</th>
                                        <th scope="col" class="px-6 py-3">Estado</th>
                                        <th scope="col" class="px-6 py-3">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="px-6 py-4" colspan="5">Preguntas de nivel extremo</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Tab: Activador -->
                    <div class="tab-content" id="activador">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left">
                                <thead class="text-xs uppercase">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">ID</th>
                                        <th scope="col" class="px-6 py-3">Pregunta</th>
                                        <th scope="col" class="px-6 py-3">Ámbito</th>
                                        <th scope="col" class="px-6 py-3">Estado</th>
                                        <th scope="col" class="px-6 py-3">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="px-6 py-4" colspan="5">Preguntas con activador automático</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Botón flotante -->
            <div class="fixed bottom-8 right-8 z-50">
                <button class="floating-btn group w-12 h-12 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center overflow-hidden hover:w-48 hover:rounded-full">
                    <span class="text-2xl font-semibold absolute group-hover:opacity-0 transition-opacity duration-150">+</span>
                    <span class="text-sm font-medium absolute opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-100 whitespace-nowrap px-4">Agregar pregunta</span>
                </button>
            </div>
        </main>
    </div>

    <script>
        // Sidebar hover effect
        const sidebar = document.getElementById('sidebar');
        const logoCompact = document.getElementById('logo-compact');
        const logoFull = document.getElementById('logo-full');
        const navLabels = document.querySelectorAll('.nav-label');
        const navItems = document.querySelectorAll('.nav-item');

        sidebar.addEventListener('mouseenter', () => {
            sidebar.classList.remove('sidebar-collapsed');
            sidebar.classList.add('sidebar-expanded');
            logoCompact.style.display = 'none';
            logoFull.style.display = 'block';
            navLabels.forEach(label => {
                label.style.display = 'inline-block';
            });
            navItems.forEach(item => {
                item.classList.remove('justify-center');
            });
        });

        sidebar.addEventListener('mouseleave', () => {
            sidebar.classList.remove('sidebar-expanded');
            sidebar.classList.add('sidebar-collapsed');
            logoCompact.style.display = 'flex';
            logoFull.style.display = 'none';
            navLabels.forEach(label => {
                label.style.display = 'none';
            });
            navItems.forEach(item => {
                item.classList.add('justify-center');
            });
        });
        // Dropdown de perfil
        const profileButton = document.getElementById('profileButton');
        const profileDropdown = document.getElementById('profileDropdown');

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

        function cerrarDropdown() {
            profileDropdown.classList.add('hidden');
        }

        // Función para cerrar sesión
        function cerrarSesion() {
            if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
                window.location.href = 'logout.php';
            }
        }

        // Cerrar dropdown con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                cerrarDropdown();
            }
        });
        // Tab functionality
        const browserTabs = document.querySelectorAll('.browser-tab');
        const tabContents = document.querySelectorAll('.tab-content');

        browserTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');

                // Remove active class from all tabs
                browserTabs.forEach(t => t.classList.remove('active'));

                // Add active class to clicked tab
                tab.classList.add('active');

                // Remove active class from all contents
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });

                // Add active class to selected content
                document.getElementById(tabName).classList.add('active');
            });
        });

        // Detectar cambios en preferencia de sistema (para modo auto)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            const temaActual = localStorage.getItem('theme-preference') || 'auto';
            if (temaActual === 'auto') {
                const nuevoTema = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', nuevoTema);
            }
        });
    </script>
</body>

</html>