<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGEN - Sistema de Gestion Notarial</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        .sidebar {
            transition: width 0.3s ease;
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
        .hide-on-collapse {
            display: none;
        }
        .show-on-expand {
            display: inline-block;
        }
        .nav-item svg {
            min-width: 20px;
        }
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            justify-content: center;
            align-items: center;
        }
        .modal.active {
            display: flex;
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Modal de Confirmación -->
    <div id="confirmModal" class="modal active">
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
            <div class="text-center">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
                    <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Confirmación</h3>
                <p class="text-gray-600 mb-6">¿Seguro de realizar el formulario?</p>
                <div class="flex gap-3 justify-center">
                    <button onclick="cancelarFormulario()" class="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                        No
                    </button>
                    <button onclick="confirmarFormulario()" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Sí
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Formulario de Información del Imputado -->
    <div id="formularioImputado" class="modal">
        <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 class="text-2xl font-bold mb-6 text-gray-800">Información del Imputado</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Número de Teléfono</label>
                    <input type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tipo Documento de Identidad</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Seleccione...</option>
                        <option value="dui">DUI</option>
                        <option value="pasaporte">Pasaporte</option>
                        <option value="carnet">NIT</option>
                        <option value="carnet">CIP</option>
                        <option value="carnet">Licencia de Confucir</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Documento de Identidad</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Seleccione...</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
            </div>

            <div class="flex justify-end gap-3">
                <button onclick="cerrarFormulario()" class="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                    Cancelar
                </button>
                <button onclick="guardarFormulario()" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Siguiente
                </button>
            </div>
        </div>
    </div>

    <!-- Sidebar -->
    <aside id="sidebar" class="sidebar sidebar-collapsed fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200">
        <div class="h-full px-3 py-4 overflow-y-auto">
            <div class="flex items-center justify-center mb-6 px-2 h-10">
                <div id="logo-compact" class="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">SG</div>
                <h2 id="logo-full" class="hide-on-collapse text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">SIGEN</h2>
            </div>
            
            <nav class="space-y-2">
                <a href="inicio.php" class="nav-item flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Inicio</span>
                </a>
                <a href="form.php" class="nav-item flex items-center px-3 py-3 rounded-lg bg-blue-500 text-white justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Formulario</span>
                </a>
                <a href="respuestas.php" class="nav-item flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Resultados</span>
                </a>
                <a href="preguntas.php" class="nav-item flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Preguntas</span>
                </a>
                <a href="usuarios.php" class="nav-item flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Usuarios</span>
                </a>                
                <a href="configuracion.php" class="nav-item flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 justify-center">
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
    <div id="mainContent" class="content" style="display: none;">
        <!-- Header -->
        <header class="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div class="px-4 py-4 flex items-center justify-between">
                <div class="flex items-center gap-4">
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
<<<<<<< HEAD
        <main>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <p class="text-sm text-gray-600 mb-1">Pregunta 1</p>
                    <p class="text-3xl font-bold mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis harum dolor ut aliquam quas voluptatem nam enim et debitis, nulla necessitatibus iusto maxime officia saepe ex? Excepturi soluta error tempore!</p>
                    <p class="text-sm text-green-500 font-medium">Si</p>
                    <p class="text-sm text-red-500 font-medium">No</p>
                </div>
            </div>              
        </main>
=======

        <main>
        </main>
    </div>
>>>>>>> c696b26f51e897fa03d5bff6169df3e58031e7a1
    </div>

    <script>
        // Funciones para los modales
        function confirmarFormulario() {
            document.getElementById('confirmModal').classList.remove('active');
            document.getElementById('formularioImputado').classList.add('active');
        }

        function cancelarFormulario() {
            // No hace nada, mantiene el modal activo (usuario debe elegir Sí)
            header('inicio.php');
        }

        function cerrarFormulario() {
            // Vuelve al modal de confirmación
            document.getElementById('formularioImputado').classList.remove('active');
            document.getElementById('confirmModal').classList.add('active');
        }

        function guardarFormulario() {
            alert('Formulario guardado exitosamente');
            document.getElementById('formularioImputado').classList.remove('active');
            document.getElementById('mainContent').style.display = 'block';
        }

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
    </script>
</body>
</html>