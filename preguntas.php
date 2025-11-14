<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGEN - Sistema de Gestión Notarial</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="Style/preguntas.css">
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

            <!-- Botón Flotante -->
            <div class="fixed bottom-8 right-8 z-50">
                <button id="openQuestionBtn" class="group relative w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 ease-out flex items-center justify-center overflow-hidden hover:w-52">
                    <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
                    <span class="absolute text-3xl font-bold transition-all duration-300 transform group-hover:-translate-x-4 group-hover:opacity-0">+</span>
                    <span class="absolute opacity-0 text-sm tracking-wide font-semibold transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 group-hover:opacity-100">Agregar Pregunta</span>
                </button>
            </div>

            <!-- Modal de Preguntas -->
            <div id="questionFormModal" class="fixed inset-0 z-50 bg-black bg-opacity-50 hidden items-center justify-center p-4">
                <div class="modal-content rounded-2xl shadow-2xl max-w-2xl w-full overflow-y-auto max-h-[90vh]">
                    <div class="modal-header flex justify-between items-center p-5 rounded-t-2xl">
                        <h2 class="text-lg font-semibold flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Nueva Pregunta
                        </h2>
                        <button id="closeQuestionBtn" class="text-gray-500 hover:text-red-500 transition">✕</button>
                    </div>

                    <section class="p-6 space-y-6">
                        <div class="space-y-4">
                            <!-- Campo: Pregunta -->
                            <div>
                                <label class="block font-medium mb-1">Pregunta *</label>
                                <textarea class="input-field w-full" rows="3" placeholder="Escribe la pregunta aquí..."></textarea>

                            </div>

                            <!-- Campo: Ámbito -->
                            <div>
                                <label class="block font-medium mb-1">Ámbito *</label>
                                <select class="input-field w-full">
                                    <option>Seleccionar ámbito</option>
                                    <option value="legal">Legal</option>
                                    <option value="financiero">Financiero</option>
                                    <option value="operacional">Operacional</option>
                                    <option value="tecnologico">Tecnológico</option>
                                    <option value="compliance">Compliance</option>
                                    <option value="reputacional">Reputacional</option>
                                </select>
                            </div>

                            <!-- Campo: Riesgo -->
                            <label class="block font-medium mb-1">Nivel de Riesgo *</label>
                            <select class="input-field w-full">
                                <option>Seleccionar nivel de riesgo</option>
                                <option value="bajo" class="text-green-600">Bajo</option>
                                <option value="moderado" class="text-yellow-600">Moderado</option>
                                <option value="alto" class="text-orange-600">Alto</option>
                                <option value="extremo" class="text-red-600">Extremo</option>
                                <option value="activador" class="text-purple-600">Activador Automático</option>
                            </select>

                            <div class="px-6 py-4 bg-white flex justify-end">
                                <button id="btnGuardarPregunta" class="btn-primary px-5 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">Guardar Pregunta</button>
                            </div>
                        </div>

                </div>
                </section>
            </div>
    </div>

    </main>
    </div>
    <script src="JS/preguntas.js"></script>
</body>

</html>