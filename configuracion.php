<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGEN - Sistema de Gestión Notarial</title>
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
            --back-ground-color: #3b82f6; /* Azul para el activo en modo claro */
            --item-active: #3b82f6;       /* Azul */
            --hover-item: rgba(99, 99, 99, 0.1); /* Hover gris suave modo claro */
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
            color: var(--text-colorcrd);
            font-size: var(--font-size);
            filter: contrast(var(--contrast));
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

        /* Hover */
        .nav-item:hover {
            background-color: var(--hover-item);
            color: #111827;
        }

        /* Hover oscuro */
        [data-theme="dark"] .nav-item:hover {
            background-color: var(--hover-item);
            color: #ffffff;
            box-shadow: inset 0 0 6px rgba(180, 160, 255, 0.2);
            transform: translateX(2px);
        }

        /* Ítem activo (modo claro y oscuro) */
        .nav-item.active {
            background-color: var(--item-active);
            color: #ffffff;
            box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.1);
        }

        /* Ítem activo sin hover */
        .nav-item.active:hover {
            background-color: var(--item-active);
            color: #ffffff;
            box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.1);
            transform: none;
        }

        .nav-item svg {
            min-width: 20px;
        }

        /* ===== CARDS ===== */
        .card {
            background-color: var(--card-bg);
            border: 1px solid var(--border-color-card);
            border-radius: 0.5rem;
            transition: all 0.3s ease, transform 0.2s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        /* Hover más sutil */
        .card:hover {
            transform: translateY(-2px) scale(1.01); /* Efecto más suave */
            border-color: rgb(108, 85, 150);
            box-shadow: 0 6px 12px rgba(161, 161, 161, 0.8);
            background: linear-gradient(145deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1));
        }

        /* ===== HEADER ===== */
        .header-bg {
            background-color: var(--sidebar-bg);
            border-bottom: 1px solid var(--border-color);
            color: var(--text-colorhd);
        }

        /* ===== INPUTS ===== */
        input[type="range"],
        input[type="radio"] {
            accent-color: #9333ea;
        }

        .hidden {
            display: none;
        }

        .titledashboard {
            color: var(--titledashboard);
            transition: color 0.3s ease;
        }
    </style>
</head>
<body>

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
        <header class="header-bg sticky top-0 z-30">
            <div class="px-4 py-4 flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="relative hidden md:block">
                    </div>
                </div>
                
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                        <img src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff" alt="User" class="w-8 h-8 rounded-full">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </header>

        <!-- Dashboard Content -->
        <main class="p-6">
            <div class="mb-6">
                <h1 class="titledashboard text-3xl font-bold mb-2">Configuración
                </h1>
            </div>
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
                        <button id="btnEditarPerfil" class="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
                            Editar perfil
                        </button>
                        <button id="btnCambiarClave" class="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
                            Solicitar cambio de contraseña
                        </button>
                        <button id="btnVerificacion" class="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
                            Activar verificación en dos pasos
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script>
        // Variables globales
        const sidebar = document.getElementById('sidebar');
        const logoCompact = document.getElementById('logo-compact');
        const logoFull = document.getElementById('logo-full');
        const navLabels = document.querySelectorAll('.nav-label');
        const navItems = document.querySelectorAll('.nav-item');

        // Sidebar hover effect
        sidebar.addEventListener('mouseenter', () => {
            sidebar.classList.remove('sidebar-collapsed');
            sidebar.classList.add('sidebar-expanded');
            logoCompact.classList.add('hidden');
            logoFull.classList.remove('hidden');
            navLabels.forEach(label => {
                label.classList.remove('hidden');
            });
            navItems.forEach(item => {
                item.classList.remove('justify-center');
            });
        });

        sidebar.addEventListener('mouseleave', () => {
            sidebar.classList.remove('sidebar-expanded');
            sidebar.classList.add('sidebar-collapsed');
            logoCompact.classList.remove('hidden');
            logoFull.classList.add('hidden');
            navLabels.forEach(label => {
                label.classList.add('hidden');
            });
            navItems.forEach(item => {
                item.classList.add('justify-center');
            });
        });

        // Tema
        const radios = document.querySelectorAll('input[name="theme"]');
        const aplicarTema = (modo) => {
            let temaFinal = modo;
            
            if (modo === 'auto') {
                const oscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
                temaFinal = oscuro ? 'dark' : 'light';
            }
            
            document.documentElement.setAttribute('data-theme', temaFinal);
            localStorage.setItem('theme-preference', modo);
        };

        radios.forEach(r => {
            r.addEventListener('change', e => aplicarTema(e.target.value));
        });

        // Cargar preferencia de tema guardada
        const temaGuardado = localStorage.getItem('theme-preference');
        if (temaGuardado) {
            document.querySelector(`input[name="theme"][value="${temaGuardado}"]`).checked = true;
            aplicarTema(temaGuardado);
        } else {
            aplicarTema('auto');
        }

        // Tamaño de fuente
        const fontRange = document.getElementById('fontRange');
        const fontValue = document.getElementById('fontValue');
        
        fontRange.addEventListener('input', e => {
            const size = e.target.value;
            document.documentElement.style.setProperty('--font-size', size + 'px');
            fontValue.textContent = size + 'px';
            localStorage.setItem('font-size', size);
        });

        // Cargar tamaño de fuente guardado
        const fontSizeGuardado = localStorage.getItem('font-size');
        if (fontSizeGuardado) {
            fontRange.value = fontSizeGuardado;
            document.documentElement.style.setProperty('--font-size', fontSizeGuardado + 'px');
            fontValue.textContent = fontSizeGuardado + 'px';
        }

        // Contraste
        const contrastRange = document.getElementById('contrastRange');
        const contrastValue = document.getElementById('contrastValue');
        
        contrastRange.addEventListener('input', e => {
            const contrast = e.target.value;
            document.documentElement.style.setProperty('--contrast', contrast);
            contrastValue.textContent = contrast;
            localStorage.setItem('contrast', contrast);
        });

        // Cargar contraste guardado
        const contrasteGuardado = localStorage.getItem('contrast');
        if (contrasteGuardado) {
            contrastRange.value = contrasteGuardado;
            document.documentElement.style.setProperty('--contrast', contrasteGuardado);
            contrastValue.textContent = contrasteGuardado;
        }

        // Botones de cuenta
        document.getElementById('btnEditarPerfil').onclick = () => {
        };

        document.getElementById('btnCambiarClave').onclick = () => {
        };

        document.getElementById('btnVerificacion').onclick = () => {
        };

        // Detectar cambios en preferencia de sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            const temaActual = document.querySelector('input[name="theme"]:checked').value;
            if (temaActual === 'auto') {
                aplicarTema('auto');
            }
        });
        // Al final del script existente en configuracion.php, agrega:

        // Cargar TODAS las preferencias guardadas al inicio
        window.addEventListener('DOMContentLoaded', () => {
            // Tema
            const temaGuardado = localStorage.getItem('theme-preference') || 'auto';
            document.querySelector(`input[name="theme"][value="${temaGuardado}"]`).checked = true;
            aplicarTema(temaGuardado);
            
            // Tamaño de fuente
            const fontSizeGuardado = localStorage.getItem('font-size') || '16';
            fontRange.value = fontSizeGuardado;
            document.documentElement.style.setProperty('--font-size', fontSizeGuardado + 'px');
            fontValue.textContent = fontSizeGuardado + 'px';
            
            // Contraste
            const contrasteGuardado = localStorage.getItem('contrast') || '1';
            contrastRange.value = contrasteGuardado;
            document.documentElement.style.setProperty('--contrast', contrasteGuardado);
            contrastValue.textContent = contrasteGuardado;
        });
    </script>
</body>
</html>