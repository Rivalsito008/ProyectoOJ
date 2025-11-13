<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGEN - Sistema de Gestion Notarial</title>
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
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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

        /* ===== MAPA - DISEÑO COMPACTO ===== */
        .map-card {
            background-color: var(--card-bg);
            border-radius: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid var(--border-color);
            padding: 1.5rem;
            margin-top: 1.5rem;
        }

        .map-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .map-card-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text-colorcrd);
        }

        .map-card-content {
            display: grid;
            grid-template-columns: 1fr 400px;
            gap: 1.5rem;
            align-items: start;
        }

        .map-wrapper {
            position: relative;
            background-color: var(--card-bg);
            border-radius: 0.75rem;
            border: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .map-info-panel {
            background-color: var(--bg-color);
            border-radius: 0.75rem;
            padding: 1.5rem;
            border: 1px solid var(--border-color);
            height: fit-content;
        }

        .map-info-title {
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--text-colorcrd);
        }

        .map-info-content {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .map-info-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            border-bottom: 1px solid var(--border-color);
        }

        .map-info-item:last-child {
            border-bottom: none;
        }

        .map-info-label {
            font-size: 0.875rem;
            color: #6b7280;
        }

        .map-info-value {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--item-active);
        }

        /* Controles del mapa */
        .map-control-btn:hover {
            background-color: var(--hover-item);
            transform: scale(1.1);
        }

        .map-reset-btn:hover {
            background-color: var(--hover-item);
            transform: scale(1.1);
        }

        /* Responsive */
        @media (max-width: 1024px) {
            .map-card-content {
                grid-template-columns: 1fr;
            }

            .map-info-panel {
                order: 2;
            }
        }

        @media (max-width: 768px) {
            .map-wrapper {
                height: 400px;
            }
        }

        /* ESTILO DEL MAPA */
        .container {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .container svg {
            height: 100%;
            width: 100%;
            max-height: none;
            /* Eliminar límites máximos */
            max-width: none;
            object-fit: contain;
            /* Mantener proporciones */
        }

        /* Asegurar que los paths del mapa tengan el estilo correcto */
        .container path {
            fill: #60a5fa;
            stroke: black;
            stroke-width: 2px;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        /* Hover para los paths individuales */
        .container path:hover {
            fill: #0077ffff;
            stroke-width: 2.5;
        }
    </style>
</head>

<body class="bg-gray-50">
    <?php
    // Datos  para el dashboard
    $stats = [
        ['title' => 'Casos Activos de Alto/Extremo', 'value' => '15', 'change' => '--'],
        ['title' => 'Víctimas Totales Registradas', 'value' => '300', 'change' => '--'],
        ['title' => 'Casos con Alerta Activadora (Hoy)', 'value' => '3', 'change' => '--'],
        ['title' => 'Tiempo Promedio de Resolución', 'value' => '65 días', 'change' => '--'],
    ];
    ?>

    <aside id="sidebar" class="sidebar sidebar-collapsed fixed top-0 left-0 z-40 h-screen">
        <div class="h-full px-3 py-4 overflow-y-auto">
            <div class="flex items-center justify-center mb-6 px-2 h-10">
                <div id="logo-compact"
                    class="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    SG</div>
                <h2 id="logo-full"
                    class="hide-on-collapse text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent ml-3">
                    SIGEN</h2>
            </div>

            <nav class="space-y-2">
                <a href="inicio.php" class="nav-item active flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                        </path>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Inicio</span>
                </a>
                <a href="form.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                        </path>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Formulario</span>
                </a>
                <a href="respuestas.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                        </path>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Resultados</span>
                </a>
                <a href="preguntas.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                        </path>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Preguntas</span>
                </a>
                <a href="usuarios.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                        </path>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Usuarios</span>
                </a>
                <a href="configuracion.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                        </path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Configuración</span>
                </a>
            </nav>
        </div>
    </aside>

    <div class="content">
        <header class="header-bg border-b border-gray-200 sticky top-0 z-30">
            <div class="px-4 py-4 flex items-center justify-between">
                <h1 class="titledashboard text-2xl font-bold">Dashboard</h1>
                <div class="flex items-center gap-4">
                    <div class="relative hidden md:block">
                    </div>
                </div>
                <div class="header flex items-center gap-4">
                    <div class="relative">
                        <button id="profileButton"
                            class="flex items-center gap-2 rounded-xl px-3 py-2 transition-colors">
                            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Perfil"
                                class="w-8 h-8 rounded-full">
                            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path class="flecha" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        <div id="profileDropdown"
                            class="dropdown hidden absolute right-0 mt-3 w-80 rounded-2xl shadow-xl border border-gray-200 dark:border-transparent overflow-hidden z-50 transition-all duration-300">

                            <div class="p-4 bg-[var(--dropdown-color)] dark:bg-[#2b2343] backdrop-blur-xl">
                                <div class="flex items-center space-x-4">
                                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Usuario"
                                        class="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm">
                                    <div>
                                        <p class="text-base font-semibold text-gray-900 dark:text-gray-100">Nombre del
                                            Usuario</p>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Administrador</p>
                                    </div>
                                </div>
                            </div>

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
            </div>
        </header>

        <main class="p-6">
            <div class="mb-6">
                <h1 class="text-3xl font-bold mb-2">Dashboard</h1>
                <p class="text-gray-600">Bienvenido de vuelta, aquí está tu resumen</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <?php foreach ($stats as $stat): ?>
                    <div
                        class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <p class="text-sm text-gray-600 mb-1"><?php echo $stat['title']; ?></p>
                        <p class="text-3xl font-bold mb-2"><?php echo $stat['value']; ?></p>
                        <p class="text-sm text-green-500 font-medium"><?php echo $stat['change']; ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Gráfico 1: Distribución por Edad (Vertical) -->
            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h2 class="text-xl font-semibold mb-4 text-gray-800">
                    Distribución de Víctimas por Rango de Edad
                </h2>
                <div class="h-80">
                    <canvas id="ageDistributionChart"></canvas>
                </div>
            </div>

            <!-- Gráfico 2: Prevalencia de Violencia (HORIZONTAL) -->
            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h2 class="text-xl font-semibold mb-4 text-gray-800">
                    Prevalencia de Tipos de Violencia
                </h2>
                <div class="h-80">
                    <canvas id="violencePrevalenceChart"></canvas>
                </div>
            </div>
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

        // Detectar cambios en preferencia de sistema (para modo auto)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            const temaActual = localStorage.getItem('theme-preference') || 'auto';
            if (temaActual === 'auto') {
                const nuevoTema = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', nuevoTema);
            }
        });

        // Lógica del Dropdown de Perfil
        const profileButton = document.getElementById('profileButton');
        const profileDropdown = document.getElementById('profileDropdown');

        // Función para alternar la visibilidad del dropdown
        const toggleDropdown = () => {
            profileDropdown.classList.toggle('hidden');
        };

        profileButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita que el clic se propague al documento
            toggleDropdown();
        });

        // Cierra el dropdown si se hace clic fuera de él
        document.addEventListener('click', (event) => {
            // Comprueba si el dropdown está visible y si el clic no fue dentro del botón o del dropdown
            if (!profileDropdown.classList.contains('hidden') && !profileButton.contains(event.target) && !profileDropdown.contains(event.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    </script>

        <script>
        document.addEventListener('DOMContentLoaded', () => {

            // --- GRÁFICO 1: Distribución de Víctimas por Rango de Edad (Vertical) ---
            const ageCtx = document.getElementById('ageDistributionChart').getContext('2d');
            const ageData = {
                labels: ['<18-25', '26-35', '36-45', '46-55', '56+'],
                datasets: [{
                    label: 'Número de Víctimas',
                    data: [110, 55, 50, 25, 10],
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1,
                    borderRadius: 6,
                    barThickness: 40
                }]
            };

            new Chart(ageCtx, {
                type: 'bar',
                data: ageData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.parsed.y + ' Víctimas';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Número de Víctimas',
                                font: { size: 14 }
                            }
                        },
                        x: {
                            grid: { display: false },
                            title: {
                                display: true,
                                text: 'Rangos de Edad',
                                font: { size: 14 }
                            }
                        }
                    }
                }
            });

            // --- GRÁFICO 2: Prevalencia de Tipos de Violencia (HORIZONTAL) ---
            const violenceCtx = document.getElementById('violencePrevalenceChart').getContext('2d');
            const violenceData = {
                labels: ['Patrimonial', 'Sexual', 'Económica', 'Física', 'Psicológica'],
                datasets: [{
                    label: 'Número de Casos',
                    data: [30, 50, 80, 120, 150],
                    backgroundColor: 'rgba(124, 58, 237, 0.8)',
                    borderColor: 'rgba(124, 58, 237, 1)',
                    borderWidth: 1,
                    borderRadius: 6,
                    barThickness: 30
                }]
            };

            new Chart(violenceCtx, {
                type: 'bar',
                data: violenceData,
                options: {
                    indexAxis: 'y', // ← ESTA ES LA LÍNEA CLAVE PARA BARRAS HORIZONTALES
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.parsed.x + ' Casos';
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Número de Casos',
                                font: { size: 14 }
                            }
                        },
                        y: {
                            grid: { display: false },
                            title: {
                                display: true,
                                text: 'Tipo de Violencia',
                                font: { size: 14 }
                            }
                        }
                    }
                }
            });
        });
    </script>
</body>

</html>