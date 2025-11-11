<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGEN - Sistema de Gestion Notarial</title>
    <script>
    (function(){
      // Aplicar tema
      const t = localStorage.getItem('theme-preference') || 'auto';
      let f = t;
      if(t === 'auto'){
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
        --font-size: 16px;
        --text-colorcrd: #111827;
        --text-colorhd: #111827;
        }

        [data-theme="dark"] {
        --titledashboard: #000000ff;
        --bg-color: #e4e4e4ff;
        --text-colorcrd: #000000ff;
        --text-colorsdb: #ffffffff;
        --text-colorhd: #ffffffff;
        --card-bg: #ffffffff;
        --sidebar-bg: #2a2240;
        --border-color: #3d3454;
        --hover-item: rgba(108, 85, 150, 0.35);
        --item-active: #6c55ba; /* Morado para modo oscuro */
        --border-color-card: #b4b4b4ff;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            font-size: var(--font-size);
            transition: all 0.3s ease;
            margin: 0;
            padding: 0;
        }

        /* SIDEBAR STYLES */
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
            background-color: var(--bg-color);
            min-height: 100vh;
        }
        
        .hide-on-collapse {
            display: none;
        }
        
        .nav-item {
            transition: all 0.2s ease;
            color: var(--text-colorsdb);
            text-decoration: none;
            display: flex;
            align-items: center;
        }
        
        .nav-item:hover {
            background-color: var(--hover-item);
        }
        
        .nav-item.active {
            background-color: var(--item-active);
            color: white;
        }
        
        .nav-item svg {
            min-width: 20px;
        }

        [data-theme="dark"] .nav-item:hover {
            background-color: var(--hover-item);
            box-shadow: inset 0 0 6px rgba(180, 160, 255, 0.2);
            transform: translateX(2px);
        }

        /* HEADER STYLES */
        .header-bg {
            background-color: var(--sidebar-bg);
            border-bottom: 1px solid var(--border-color);
            color: var(--text-colorhd);
        }

        .titledashboard {
            color: var(--titledashboard);
            transition: color 0.3s ease;
        }

        .hide-on-collapse { display: none; }
        .hidden { display: none; }

        /* CARD STYLES - Manteniendo los estilos originales de Tailwind */
        .card-theme {
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .modal-animate {
            animation: slideDown 0.2s ease-out;
        }

        /* DROPDOWN STYLES */
        .dropdown-custom {
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
        }

        /* Asegurar que los textos mantengan sus colores originales */
        .text-preserve {
            color: inherit;
        }
    </style>
</head>
<body>
    <?php
    // Datos de ejemplo para el dashboard
    $stats = [
        ['title' => 'Tribunales Activos', 'value' => '11', 'change' => '--'],
        ['title' => 'Victimas Totales', 'value' => '300', 'change' => '--'],
        ['title' => 'Casos Totales del Mes', 'value' => '25', 'change' => '+5.2% desde el mes pasado'],
        ['title' => 'Promedio de Puntajes Finales', 'value' => '50', 'change' => '--'],
    ];
    
    // Datos del usuario (ejemplo - normalmente vendrían de la sesión)
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
                <h2 id="logo-full" class="hide-on-collapse text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent ml-3">SIGEN</h2>
            </div>
            
            <nav class="space-y-2">
                <a href="inicio.php" class="nav-item active flex items-center px-3 py-3 rounded-lg justify-center">
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
                <a href="preguntas.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
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
            <div class="mb-6">
                <h1 class="text-3xl font-bold mb-2 text-preserve">Dashboard</h1>
                <p class="text-gray-600 text-preserve">Bienvenido de vuelta, aquí está tu resumen</p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <?php foreach ($stats as $stat): ?>
                <div class="card rounded-xl p-6 shadow">
                    <p class="text-sm text-gray-600 mb-1 text-preserve"><?php echo $stat['title']; ?></p>
                    <p class="text-3xl font-bold mb-2 text-preserve"><?php echo $stat['value']; ?></p>
                    <p class="text-sm text-green-500 font-medium text-preserve"><?php echo $stat['change']; ?></p>
                </div>
                <?php endforeach; ?>
            </div>
            
            <div class="card rounded-xl p-6 shadow">
                <h3 class="text-lg font-semibold mb-4 text-preserve">Niveles de Riesgo en Zonas Geograficas</h3>
                <div style="position: relative; height: 300px;">
                    <canvas id="pieChart"></canvas>
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

        // Pie Chart
        const pieCtx = document.getElementById('pieChart').getContext('2d');
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['Nivel Bajo', 'Nivel Moderado', 'Nivel Alto', 'Nivel Extremo'],
                datasets: [{
                    data: [400, 300, 300, 200],
                    backgroundColor: ['#2ECC40', '#FFDC00', '#ff0d00ff', '#a12222ff']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.5,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
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