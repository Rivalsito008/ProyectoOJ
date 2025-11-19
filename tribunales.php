<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGEN - Sistema de Gestión Notarial</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="Style/tribunales.css">
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
                <a href="tribunales.php" class="nav-item active flex items-center px-3 py-3 rounded-lg justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path
                            d="M3 21h18M4 21v-9M8 21v-9M12 21v-9M16 21v-9M20 21v-9 M2 12h20 M12 3L3 9h18L12 3z"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Tribunales</span>
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
                <h1 class="titledashboard text-2xl font-bold">Tribunales</h1>
                <div class="flex items-center gap-4">
                    <div class="relative hidden md:block">
                    </div>
                </div>
                <div class="header flex items-center gap-4">
                    <!--Botón de perfil -->
                    <div class="relative">
                        <!-- Botón del perfil -->
                        <button id="profileButton"
                            class="flex items-center gap-2 rounded-xl px-3 py-2 transition-colors">
                            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Perfil"
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
                                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Usuario"
                                        class="w-12 h-12 rounded-full border shadow-sm dropdown-avatar">
                                    <div>
                                        <p class="text-base font-semibold dropdown-username">Nombre del Usuario</p>
                                        <p class="text-sm dropdown-role">Administrador</p>
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
        </header>

        <main class="p-6">
            <div class="tabs-container">
                <div class="tabs-wrapper">
                    <div class="browser-tab active" data-tab="Todo">
                        <div class="tab-indicator bg-blue-500"></div>
                        <span class="tab-label">Todos</span>
                    </div>
                    <div class="browser-tab" data-tab="activo">
                        <div class="tab-indicator bg-green-500"></div>
                        <span class="tab-label">Estado activo</span>
                    </div>
                    <div class="browser-tab" data-tab="inactivo">
                        <div class="tab-indicator bg-red-500"></div>
                        <span class="tab-label">Estado Inactivo</span>
                    </div>
                </div>

                <div class="tab-content-wrapper">
                    <div class="tab-content active" id="Todo">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left">
                                <thead class="text-xs uppercase">
                                    <tr>
                                        <th class="px-6 py-3">ID</th>
                                        <th class="px-6 py-3">Nombre</th>
                                        <th class="px-6 py-3">Tipo</th>
                                        <th class="px-6 py-3">Numeración</th>
                                        <th class="px-6 py-3">Materia</th>
                                        <th class="px-6 py-3">Departamento</th>
                                        <th class="px-6 py-3">Municipios</th>
                                        <th class="px-6 py-3">Dirección </th>
                                        <th class="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="tab-content" id="activo">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left">
                                <thead class="text-xs uppercase">
                                    <tr>
                                        <th class="px-6 py-3">ID</th>
                                        <th class="px-6 py-3">Nombre</th>
                                        <th class="px-6 py-3">Tipo</th>
                                        <th class="px-6 py-3">Numeración</th>
                                        <th class="px-6 py-3">Materia</th>
                                        <th class="px-6 py-3">Departamento</th>
                                        <th class="px-6 py-3">Municipios</th>
                                        <th class="px-6 py-3">Dirección </th>
                                        <th class="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="tab-content" id="inactivo">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left">
                                <thead class="text-xs uppercase">
                                    <tr>
                                        <th class="px-6 py-3">ID</th>
                                        <th class="px-6 py-3">Nombre</th>
                                        <th class="px-6 py-3">Tipo</th>
                                        <th class="px-6 py-3">Numeración</th>
                                        <th class="px-6 py-3">Materia</th>
                                        <th class="px-6 py-3">Departamento</th>
                                        <th class="px-6 py-3">Municipios</th>
                                        <th class="px-6 py-3">Dirección </th>
                                        <th class="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Botón Flotante -->
            <div class="fixed bottom-8 right-8 z-50">
                <button id="openFormBtn" class="group relative w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 ease-out flex items-center justify-center overflow-hidden hover:w-52">
                    <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
                    <span class="absolute text-3xl font-bold transition-all duration-300 transform group-hover:-translate-x-4 group-hover:opacity-0">+</span>
                    <span class="absolute opacity-0 text-sm tracking-wide font-semibold transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 group-hover:opacity-100">Agregar Tribunal</span>
                </button>
            </div>

            <!-- Modal -->
            <div id="userFormModal" class="fixed inset-0 z-50 bg-black bg-opacity-50 hidden items-center justify-center p-4">
                <div class="modal-content rounded-2xl shadow-2xl max-w-2xl w-full overflow-y-auto max-h-[90vh]">
                    <div class="modal-header flex justify-between items-center p-5 rounded-t-2xl">
                        <h2 class="text-lg font-semibold flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
                            Nuevo Tribunal
                        </h2>
                        <button id="closeFormBtn" class="text-gray-500 hover:text-red-500 transition">✕</button>
                    </div>

                    <section class="p-6 space-y-6">
                        <div class="space-y-4">
                            <div>
                                <label class="text-sm font-semibold">Nombre</label>
                                <input type="text" class="w-full mt-1 border rounded-lg p-2">
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 font-semibold">Tipo de Tribunal</label>
                                <select id="tipoTribunal" class="w-full p-3 border rounded-lg">

                                    <!-- SALAS -->
                                    <optgroup label="Salas de la Corte Suprema">
                                        <option>Sala de lo Constitucional</option>
                                        <option>Sala de lo Civil</option>
                                        <option>Sala de lo Penal</option>
                                        <option>Sala de lo Contencioso Administrativo</option>
                                    </optgroup>

                                    <!-- CÁMARAS -->
                                    <optgroup label="Cámaras">
                                        <option>Cámara Civil</option>
                                        <option>Cámara Penal</option>
                                        <option>Cámara de Familia</option>
                                        <option>Cámara de lo Laboral</option>
                                        <option>Cámara de lo Contencioso Administrativo</option>
                                        <option>Cámara de lo Medio Ambiente</option>
                                        <option>Cámara Especializada para una Vida Libre de Violencia y Discriminación para las Mujeres</option>
                                        <option>Cámara Especializada de Extinción de Dominio</option>
                                        <option>Cámara Especializada de Menores</option>
                                    </optgroup>

                                    <!-- ESPECIALIZADOS -->
                                    <optgroup label="Tribunales Especializados">
                                        <option>Juzgado Especializado de Instrucción</option>
                                        <option>Tribunal Especializado de Sentencia</option>
                                        <option>Juzgado Especializado para una Vida Libre de Violencia y Discriminación para las Mujeres</option>
                                        <option>Tribunal Especializado para una Vida Libre de Violencia y Discriminación para las Mujeres</option>
                                        <option>Juzgado Especializado de Extinción de Dominio</option>
                                        <option>Tribunal Especializado de Extinción de Dominio</option>
                                        <option>Juzgado Especializado de Menores</option>
                                    </optgroup>

                                    <!-- JUZGADOS -->
                                    <optgroup label="Juzgados">
                                        <option>Juzgado de lo Civil</option>
                                        <option>Juzgado de lo Mercantil</option>
                                        <option>Juzgado de Familia</option>
                                        <option>Juzgado de lo Laboral</option>
                                        <option>Juzgado de Instrucción</option>
                                        <option>Juzgado de Sentencia</option>
                                        <option>Juzgado de Medio Ambiente</option>
                                        <option>Juzgado de Ejecución de la Pena</option>
                                        <option>Juzgado de Vigilancia Penitenciaria</option>
                                        <option>Juzgado de Menores</option>
                                    </optgroup>

                                    <!-- PAZ -->
                                    <optgroup label="Juzgados de Paz">
                                        <option>Juzgado de Paz</option>
                                    </optgroup>

                                </select>
                            </div>
                            <!-- Numeración -->
                            <label class="block text-gray-700 font-semibold">Numeración</label>
                            <select class="w-full border rounded p-2 mb-4" id="numeracion">
                                <option value="" selected>Sin numeración</option>
                                <option value="Primero">Primero</option>
                                <option value="Segundo">Segundo</option>
                                <option value="Tercero">Tercero</option>
                                <option value="Cuarto">Cuarto</option>
                                <option value="Quinto">Quinto</option>
                                <option value="Sexto">Sexto</option>
                                <option value="Séptimo">Séptimo</option>
                                <option value="Octavo">Octavo</option>
                                <option value="Noveno">Noveno</option>
                                <option value="Décimo">Décimo</option>
                                <option value="Único">Único</option>
                            </select>
                            <!-- Materia (automática) -->
                            <div class="mb-4">
                                <label class="block text-gray-700 font-semibold">Materia</label>
                                <select id="materia" class="w-full p-3 border rounded-lg">
                                    <option value="">Seleccione un tipo primero...</option>
                                </select>
                            </div>
                            <!-- Departamento -->
                            <div class="mb-4">
                                <label class="block text-gray-700 font-semibold">Departamento</label>
                                <select id="departamento" class="w-full p-3 border rounded-lg">
                                    <option value="">Seleccione un departamento...</option>
                                    <option>San Salvador</option>
                                    <option>La Libertad</option>
                                    <option>Santa Ana</option>
                                    <option>San Miguel</option>
                                    <option>Sonsonate</option>
                                    <option>Usulután</option>
                                    <option>La Unión</option>
                                    <option>Morazán</option>
                                    <option>Chalatenango</option>
                                    <option>Cabañas</option>
                                    <option>Cuscatlán</option>
                                    <option>La Paz</option>
                                    <option>San Vicente</option>
                                    <option>Ahuachapán</option>
                                </select>
                            </div>
                            <!-- Municipios dinámicos -->
                            <div class="mb-4">
                                <label class="block text-gray-700 font-semibold">Municipio</label>
                                <select id="municipio" class="w-full p-3 border rounded-lg">
                                    <option value="">Seleccione un departamento primero...</option>
                                </select>
                            </div>
                            <!-- Dirección -->
                            <div class="mb-6">
                                <label class="block text-gray-700 font-semibold">Dirección Completa</label>
                                <textarea id="direccion" class="w-full p-3 border rounded-lg" rows="3" placeholder="Ej: Centro Judicial Integrado de Santa Tecla..."></textarea>
                            </div>
                    </section>

                    <div class="px-6 py-4 bg-white flex justify-end">
                        <button class="btn-save-user px-5 py-2 rounded-lg font-medium">Guardar Usuario</button>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <script src="JS/tribunales.js"></script>

</body>

</html>