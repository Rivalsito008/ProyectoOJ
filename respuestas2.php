<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGEN - Sistema de Gestión Notarial</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="Style/respuestas2.css">
</head>

<body>
    <!-- Sidebar Component -->
    <?php include 'components/sidebar.php'; ?>

    <!-- Main Content -->
    <div class="content">
        <!-- Header Component -->
        <?php
        $page_title = "Respuestas";
        include 'components/header.php';
        ?>

        <!-- Content -->
        <main class="p-6">
            <!-- Barra de búsqueda -->
            <div class="mb-6">
                <div class="max-w-md">
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="searchInput"
                            class="block w-full pl-10 pr-3 py-2 border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Buscar víctima por nombre...">
                        <button
                            id="clearSearch"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hidden">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="tabs-container">
                <div class="tabs-wrapper">
                    <div class="browser-tab active" data-tab="Todo">
                        <div class="tab-indicator bg-blue-500"></div>
                        <span class="tab-label">Todo</span>
                    </div>

                    <div class="browser-tab" data-tab="bajo">
                        <div class="tab-indicator bg-green-500"></div>
                        <span class="tab-label">Bajo</span>
                    </div>

                    <div class="browser-tab" data-tab="moderado">
                        <div class="tab-indicator bg-yellow-400"></div>
                        <span class="tab-label">Moderado</span>
                    </div>

                    <div class="browser-tab" data-tab="alto">
                        <div class="tab-indicator bg-red-500"></div>
                        <span class="tab-label">Alto</span>
                    </div>

                    <div class="browser-tab" data-tab="extremo">
                        <div class="tab-indicator bg-red-700"></div>
                        <span class="tab-label">Extremo</span>
                    </div>
                </div>

                <div class="tab-content-wrapper">
                    <div class="tab-content active" id="Todo">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left border-collapse">
                                <thead class="text-xs uppercase border-b border-gray-200 dark:border-gray-600">
                                    <tr class="border-b border-gray-200 dark:border-gray-500">
                                        <th scope="col" class="px-6 py-3">Víctima</th>
                                        <th scope="col" class="px-6 py-3">Riesgo</th>
                                        <th scope="col" class="px-6 py-3">Estado</th>
                                        <th scope="col" class="px-6 py-3">Fecha</th>
                                        <th scope="col" class="px-6 py-3 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaTodo">
                                    <!-- Datos se cargan dinámicamente desde JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="tab-content" id="bajo">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left border-collapse">
                                <thead class="text-xs uppercase border-b border-gray-200 dark:border-gray-600">
                                    <tr class="border-b border-gray-200 dark:border-gray-500">
                                        <th scope="col" class="px-6 py-3">Víctima</th>
                                        <th scope="col" class="px-6 py-3">Riesgo</th>
                                        <th scope="col" class="px-6 py-3">Estado</th>
                                        <th scope="col" class="px-6 py-3">Fecha</th>
                                        <th scope="col" class="px-6 py-3 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaBajo">
                                    <!-- Datos se cargan dinámicamente desde JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="tab-content" id="moderado">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left border-collapse">
                                <thead class="text-xs uppercase border-b border-gray-200 dark:border-gray-600">
                                    <tr class="border-b border-gray-200 dark:border-gray-500">
                                        <th scope="col" class="px-6 py-3">Víctima</th>
                                        <th scope="col" class="px-6 py-3">Riesgo</th>
                                        <th scope="col" class="px-6 py-3">Estado</th>
                                        <th scope="col" class="px-6 py-3">Fecha</th>
                                        <th scope="col" class="px-6 py-3 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaModerado">
                                    <!-- Datos se cargan dinámicamente desde JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="tab-content" id="alto">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left border-collapse">
                                <thead class="text-xs uppercase border-b border-gray-200 dark:border-gray-600">
                                    <tr class="border-b border-gray-200 dark:border-gray-500">
                                        <th scope="col" class="px-6 py-3">Víctima</th>
                                        <th scope="col" class="px-6 py-3">Riesgo</th>
                                        <th scope="col" class="px-6 py-3">Estado</th>
                                        <th scope="col" class="px-6 py-3">Fecha</th>
                                        <th scope="col" class="px-6 py-3 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaAlto">
                                    <!-- Datos se cargan dinámicamente desde JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="tab-content" id="extremo">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left border-collapse">
                                <thead class="text-xs uppercase border-b border-gray-200 dark:border-gray-600">
                                    <tr class="border-b border-gray-200 dark:border-gray-500">
                                        <th scope="col" class="px-6 py-3">Víctima</th>
                                        <th scope="col" class="px-6 py-3">Riesgo</th>
                                        <th scope="col" class="px-6 py-3">Estado</th>
                                        <th scope="col" class="px-6 py-3">Fecha</th>
                                        <th scope="col" class="px-6 py-3 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaExtremo">
                                    <!-- Datos se cargan dinámicamente desde JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal de Acciones -->
            <div id="modalAcciones" class="fixed inset-0 z-50 hidden">
                <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onclick="cerrarModalAcciones()"></div>

                    <div class="relative inline-block w-full max-w-md px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-800 sm:my-8 sm:align-middle sm:p-6">
                        <div id="modalAccionesContent">
                            <!-- Contenido se genera dinámicamente desde JS -->
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Modal para respuestas -->
    <div id="modalRespuestas" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="modal-dialog bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden">
            <div class="p-6 overflow-y-auto max-h-[95vh]">
                <div id="modalContent">
                    <!-- Contenido se genera dinámicamente desde JS -->
                </div>
            </div>
        </div>
    </div>

    <!-- Botón flotante para niveles de riesgo -->
    <button id="floatingRiskBtn" class="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">i</span>
    </button>

    <!-- Modal de niveles de riesgo -->
    <div id="riskLevelsModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col transform transition-all duration-300 scale-95">
            <!-- Header del modal -->
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-2xl p-5 text-white flex-shrink-0">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold">Niveles de Riesgo</h3>
                    <button onclick="cerrarRiskModal()" class="text-white hover:text-gray-200 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <p class="text-blue-100 text-sm mt-1">Rangos de puntos y criterios de evaluación</p>
            </div>

            <!-- Contenido del modal -->
            <div class="p-5 space-y-4 overflow-y-auto flex-1">
                <!-- Nivel Bajo -->
                <div class="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-md transition-all duration-200">
                    <div class="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-center">
                            <span class="font-semibold text-green-700 dark:text-green-300">Bajo</span>
                            <span class="text-sm text-green-600 dark:text-green-400">0 - 20 puntos</span>
                        </div>
                        <p class="text-sm text-green-600 dark:text-green-400 mt-1">Riesgo mínimo. Situación controlada.</p>
                    </div>
                </div>

                <!-- Nivel Moderado -->
                <div class="flex items-center gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 hover:shadow-md transition-all duration-200">
                    <div class="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-center">
                            <span class="font-semibold text-yellow-700 dark:text-yellow-300">Moderado</span>
                            <span class="text-sm text-yellow-600 dark:text-yellow-400">21 - 40 puntos</span>
                        </div>
                        <p class="text-sm text-yellow-600 dark:text-yellow-400 mt-1">Riesgo medio. Requiere seguimiento.</p>
                    </div>
                </div>

                <!-- Nivel Alto -->
                <div class="flex items-center gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800 hover:shadow-md transition-all duration-200">
                    <div class="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-center">
                            <span class="font-semibold text-orange-700 dark:text-orange-300">Alto</span>
                            <span class="text-sm text-orange-600 dark:text-orange-400">41 - 60 puntos</span>
                        </div>
                        <p class="text-sm text-orange-600 dark:text-orange-400 mt-1">Riesgo elevado. Medidas urgentes.</p>
                    </div>
                </div>

                <!-- Nivel Extremo -->
                <div class="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 hover:shadow-md transition-all duration-200">
                    <div class="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-center">
                            <span class="font-semibold text-red-700 dark:text-red-300">Extremo</span>
                            <span class="text-sm text-red-600 dark:text-red-400">61 - 80 puntos o activador automático</span>
                        </div>
                        <p class="text-sm text-red-600 dark:text-red-400 mt-1">Riesgo crítico. Intervención inmediata.</p>
                    </div>
                </div>

                <!-- Información adicional -->
                <div class="criteria-container bg-gradient-to-r from-blue-50 to-blue-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-4 border border-blue-200 dark:border-purple-700">
                    <div class="flex items-center gap-2 text-blue-600 dark:text-purple-400 mb-2">
                        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span class="text-sm font-medium criteria-title">Criterios de Evaluación</span>
                    </div>
                    <p class="text-sm text-blue-600 dark:text-purple-400 criteria-text leading-relaxed">
                        Los puntos se calculan basándose en la frecuencia e intensidad de las respuestas afirmativas a las 38 preguntas del formulario de evaluación.
                    </p>
                </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 rounded-b-2xl p-4 border-t border-gray-200 dark:border-gray-600 flex-shrink-0">
                <button onclick="cerrarRiskModal()" class="risk-understand-btn w-full py-3 text-white font-medium rounded-lg">
                    Entendido
                </button>
            </div>
        </div>
    </div>

    <!-- Modal de Detalles Completos -->
    <div id="modalDetalles" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="modal-dialog bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            <div class="p-6 overflow-y-auto max-h-[90vh]">
                <!-- Header del Modal -->
                <div class="sticky top-0 bg-white dark:bg-gray-800 z-10 pb-4 border-b border-gray-200 dark:border-gray-600">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Detalles Completos del Caso
                            </h3>
                            <div class="flex flex-wrap items-center gap-3">
                                <div class="flex items-center gap-2">
                                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Víctima:</span>
                                    <span class="font-semibold text-gray-800 dark:text-white" id="detalleNombre">Cargando...</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Caso:</span>
                                    <span class="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded" id="detalleNumeroCaso">Cargando...</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Nivel:</span>
                                    <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm font-bold bg-gray-500" id="detalleNivelRiesgo">
                                        Cargando...
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button onclick="cerrarModalDetalles()" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Contenido del Modal -->
                <div class="space-y-4 mt-6">
                    <!-- Sección 1: Información Administrativa -->
                    <div class="accordion-section">
                        <button class="accordion-header flex justify-between items-center w-full p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/30 dark:hover:to-blue-700/30 transition-all" data-target="seccionAdmin">
                            <div class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                <h4 class="text-lg font-semibold text-blue-800 dark:text-blue-300">Información Administrativa</h4>
                            </div>
                            <svg class="w-5 h-5 transform transition-transform accordion-icon" data-target="seccionAdmin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div id="seccionAdmin" class="accordion-content hidden p-4 bg-white dark:bg-gray-800 rounded-b-lg border border-gray-200 dark:border-gray-700">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="space-y-2">
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Número de Caso:</span>
                                        <span class="ml-2 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded" id="adminNumeroCaso">VIF-2025-00123</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Fecha de Denuncia:</span>
                                        <span class="ml-2" id="adminFechaDenuncia">2025-11-26</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Estado del Proceso:</span>
                                        <span class="ml-2 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800" id="adminEstadoProceso">En investigación</span>
                                    </p>
                                </div>
                                <div class="space-y-2">
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Funcionario Asignado:</span>
                                        <span class="ml-2" id="adminFuncionario">Lic. Ana Rodríguez</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Unidad Asignada:</span>
                                        <span class="ml-2" id="adminUnidad">Unidad de Violencia Intrafamiliar</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sección 2: Datos del Denunciante -->
                    <div class="accordion-section">
                        <button class="accordion-header flex justify-between items-center w-full p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg hover:from-green-100 hover:to-green-200 dark:hover:from-green-800/30 dark:hover:to-green-700/30 transition-all" data-target="seccionDenunciante">
                            <div class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                <h4 class="text-lg font-semibold text-green-800 dark:text-green-300">Datos del Denunciante</h4>
                            </div>
                            <svg class="w-5 h-5 transform transition-transform accordion-icon" data-target="seccionDenunciante" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div id="seccionDenunciante" class="accordion-content hidden p-4 bg-white dark:bg-gray-800 rounded-b-lg border border-gray-200 dark:border-gray-700">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="space-y-2">
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Nombre Completo:</span>
                                        <span class="ml-2" id="denuncianteNombre">Juan Carlos Pérez Rodríguez</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Edad:</span>
                                        <span class="ml-2" id="denuncianteEdad">45 años</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Sexo:</span>
                                        <span class="ml-2" id="denuncianteSexo">Hombre</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Estado Familiar:</span>
                                        <span class="ml-2" id="denuncianteEstado">Casado/a</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Documento:</span>
                                        <span class="ml-2" id="denuncianteDocumento">DUI 12345678-9</span>
                                    </p>
                                </div>
                                <div class="space-y-2">
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Fecha de Nacimiento:</span>
                                        <span class="ml-2" id="denuncianteFechaNac">1980-05-15</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Profesión:</span>
                                        <span class="ml-2" id="denuncianteProfesion">Abogado</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Teléfono:</span>
                                        <span class="ml-2" id="denuncianteTelefono">555-1234</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Domicilio:</span>
                                        <span class="ml-2" id="denuncianteDomicilio">Colonia Escalón #123</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Nivel Educativo:</span>
                                        <span class="ml-2" id="denuncianteEducacion">Universitario completa</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sección 3: Datos de la Víctima -->
                    <div class="accordion-section">
                        <button class="accordion-header flex justify-between items-center w-full p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg hover:from-red-100 hover:to-red-200 dark:hover:from-red-800/30 dark:hover:to-red-700/30 transition-all" data-target="seccionVictima">
                            <div class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                                <h4 class="text-lg font-semibold text-red-800 dark:text-red-300">Datos de la Víctima</h4>
                            </div>
                            <svg class="w-5 h-5 transform transition-transform accordion-icon" data-target="seccionVictima" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div id="seccionVictima" class="accordion-content hidden p-4 bg-white dark:bg-gray-800 rounded-b-lg border border-gray-200 dark:border-gray-700">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-3">
                                    <h5 class="font-semibold text-gray-800 dark:text-gray-200 border-b pb-2">Información Personal</h5>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Nombre:</span>
                                        <span class="ml-2" id="victimaNombre">María Isabel López García</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Edad:</span>
                                        <span class="ml-2" id="victimaEdad">32 años</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Sexo:</span>
                                        <span class="ml-2" id="victimaSexo">Mujer</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Estado Familiar:</span>
                                        <span class="ml-2" id="victimaEstado">Casada</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Documento:</span>
                                        <span class="ml-2" id="victimaDocumento">DUI 23456789-0</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">N° de Hijos:</span>
                                        <span class="ml-2" id="victimaHijos">2</span>
                                    </p>
                                </div>

                                <div class="space-y-3">
                                    <h5 class="font-semibold text-gray-800 dark:text-gray-200 border-b pb-2">Información de Contacto</h5>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Domicilio:</span>
                                        <span class="ml-2" id="victimaDomicilio">Colonia Las Flores #45</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Zona:</span>
                                        <span class="ml-2" id="victimaZona">Urbana</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Teléfono:</span>
                                        <span class="ml-2" id="victimaTelefono">555-5678</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Profesión:</span>
                                        <span class="ml-2" id="victimaProfesion">Ama de casa</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Nivel Educativo:</span>
                                        <span class="ml-2" id="victimaEducacion">Secundaria completa</span>
                                    </p>
                                </div>

                                <div class="md:col-span-2 space-y-3">
                                    <h5 class="font-semibold text-gray-800 dark:text-gray-200 border-b pb-2">Salud y Descripción</h5>
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <p class="font-medium text-gray-700 dark:text-gray-300 mb-1">Embarazo:</p>
                                            <span class="px-2 py-1 rounded text-sm bg-gray-100 text-gray-800" id="victimaEmbarazo">No</span>
                                        </div>
                                        <div>
                                            <p class="font-medium text-gray-700 dark:text-gray-300 mb-1">Enfermedad:</p>
                                            <span class="px-2 py-1 rounded text-sm bg-gray-100 text-gray-800" id="victimaEnfermedad">No</span>
                                        </div>
                                        <div>
                                            <p class="font-medium text-gray-700 dark:text-gray-300 mb-1">Discapacidad:</p>
                                            <span class="px-2 py-1 rounded text-sm bg-gray-100 text-gray-800" id="victimaDiscapacidad">Ninguna</span>
                                        </div>
                                    </div>
                                    <p class="mt-2"><span class="font-medium text-gray-700 dark:text-gray-300">Descripción Física:</span>
                                        <span class="ml-2 text-gray-600 dark:text-gray-400" id="victimaDescripcion">Estatura media, cabello castaño, ojos marrones, tez clara</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sección 4: Datos del Agresor -->
                    <div class="accordion-section">
                        <button class="accordion-header flex justify-between items-center w-full p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800/30 dark:hover:to-purple-700/30 transition-all" data-target="seccionAgresor">
                            <div class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                </svg>
                                <h4 class="text-lg font-semibold text-purple-800 dark:text-purple-300">Datos del Agresor</h4>
                            </div>
                            <svg class="w-5 h-5 transform transition-transform accordion-icon" data-target="seccionAgresor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div id="seccionAgresor" class="accordion-content hidden p-4 bg-white dark:bg-gray-800 rounded-b-lg border border-gray-200 dark:border-gray-700">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <h5 class="font-semibold text-gray-800 dark:text-gray-200 border-b pb-2">Información Personal</h5>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Nombre Completo:</span>
                                        <span class="ml-2" id="agresorNombre">Carlos Alberto Martínez Hernández</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Edad:</span>
                                        <span class="ml-2" id="agresorEdad">35 años</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Sexo:</span>
                                        <span class="ml-2" id="agresorSexo">Hombre</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Estado Familiar:</span>
                                        <span class="ml-2" id="agresorEstado">Casado</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Profesión:</span>
                                        <span class="ml-2" id="agresorProfesion">Comerciante</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Vínculo con víctima:</span>
                                        <span class="ml-2" id="agresorVinculo">Pareja/Esposo/a</span>
                                    </p>
                                </div>
                                <div class="space-y-2">
                                    <h5 class="font-semibold text-gray-800 dark:text-gray-200 border-b pb-2">Información de Contacto</h5>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Teléfono:</span>
                                        <span class="ml-2" id="agresorTelefono">555-9012</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Domicilio:</span>
                                        <span class="ml-2" id="agresorDomicilio">Colonia Las Flores #45</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">Zona:</span>
                                        <span class="ml-2" id="agresorZona">Urbana</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">¿Cohabita con víctima?</span>
                                        <span class="ml-2" id="agresorCohabita">Sí</span>
                                    </p>
                                    <p><span class="font-medium text-gray-700 dark:text-gray-300">¿Mismo barrio?</span>
                                        <span class="ml-2" id="agresorMismoBarrio">Sí</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sección 5: Tipos de Violencia -->
                    <div class="accordion-section">
                        <button class="accordion-header flex justify-between items-center w-full p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg hover:from-orange-100 hover:to-orange-200 dark:hover:from-orange-800/30 dark:hover:to-orange-700/30 transition-all" data-target="seccionViolencia">
                            <div class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                                <h4 class="text-lg font-semibold text-orange-800 dark:text-orange-300">Tipos de Violencia</h4>
                            </div>
                            <svg class="w-5 h-5 transform transition-transform accordion-icon" data-target="seccionViolencia" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div id="seccionViolencia" class="accordion-content hidden p-4 bg-white dark:bg-gray-800 rounded-b-lg border border-gray-200 dark:border-gray-700">
                            <div class="space-y-4">
                                <div id="violenciaTiposContainer">
                                    <div class="mb-4">
                                        <p class="font-medium text-gray-700 dark:text-gray-300 mb-2">Tipos identificados:</p>
                                        <div class="flex flex-wrap gap-2">
                                            <span class="inline-block px-3 py-1 rounded-lg text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Psicológica</span>
                                            <span class="inline-block px-3 py-1 rounded-lg text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Económica</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p class="font-medium text-gray-700 dark:text-gray-300 mb-1">Frecuencia:</p>
                                        <span class="text-gray-600 dark:text-gray-400" id="violenciaFrecuencia">Semanal</span>
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-700 dark:text-gray-300 mb-1">Lugar principal:</p>
                                        <span class="text-gray-600 dark:text-gray-400" id="violenciaLugar">Domicilio</span>
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-700 dark:text-gray-300 mb-1">¿Hay testigos?</p>
                                        <span class="text-gray-600 dark:text-gray-400" id="violenciaTestigos">Vecinos cercanos</span>
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-700 dark:text-gray-300 mb-1">Denuncias previas:</p>
                                        <span class="text-gray-600 dark:text-gray-400" id="violenciaDenuncias">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sección 6: Nivel de Riesgo -->
                    <div class="accordion-section">
                        <button class="accordion-header flex justify-between items-center w-full p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg hover:from-indigo-100 hover:to-indigo-200 dark:hover:from-indigo-800/30 dark:hover:to-indigo-700/30 transition-all" data-target="seccionRiesgo">
                            <div class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                                <h4 class="text-lg font-semibold text-indigo-800 dark:text-indigo-300">Nivel de Riesgo y Cuestionario</h4>
                            </div>
                            <svg class="w-5 h-5 transform transition-transform accordion-icon" data-target="seccionRiesgo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div id="seccionRiesgo" class="accordion-content hidden p-4 bg-white dark:bg-gray-800 rounded-b-lg border border-gray-200 dark:border-gray-700">
                            <div class="space-y-4">
                                <div class="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h5 class="font-bold text-gray-800 dark:text-white text-lg" id="riesgoNivelTexto">Nivel de Riesgo: Bajo</h5>
                                            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">Puntuación obtenida en el cuestionario</p>
                                        </div>
                                        <div class="flex items-center gap-6">
                                            <div class="text-center">
                                                <div class="text-3xl font-bold text-green-600" id="riesgoPuntos">15</div>
                                                <div class="text-xs text-gray-600 dark:text-gray-400">Puntos</div>
                                            </div>
                                            <div class="text-center">
                                                <div class="text-3xl font-bold text-blue-600" id="riesgoRespuestas">8/37</div>
                                                <div class="text-xs text-gray-600 dark:text-gray-400">Respuestas Sí</div>
                                            </div>
                                            <div class="text-center">
                                                <div class="text-3xl font-bold text-purple-600" id="riesgoPorcentaje">19%</div>
                                                <div class="text-xs text-gray-600 dark:text-gray-400">Riesgo</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-4">
                                        <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                                            <span>0%</span>
                                            <span>Nivel de Riesgo</span>
                                            <span>100%</span>
                                        </div>
                                        <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                                            <div class="h-3 rounded-full transition-all duration-1000 bg-green-500" id="riesgoBarra" style="width: 19%"></div>
                                        </div>
                                        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            <span>Bajo (0-20)</span>
                                            <span>Moderado (21-40)</span>
                                            <span>Alto (41-60)</span>
                                            <span>Extremo (61+)</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Distribución de respuestas -->
                                <div id="distribucionRespuestas">
                                    <div>
                                        <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-3">Distribución de respuestas por nivel:</h5>
                                        <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
                                            <div class="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                <div class="text-2xl font-bold text-green-700 dark:text-green-300">3/8</div>
                                                <div class="text-xs text-green-600 dark:text-green-400 mt-1">Nivel Bajo</div>
                                            </div>
                                            <div class="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                                <div class="text-2xl font-bold text-yellow-700 dark:text-yellow-300">2/8</div>
                                                <div class="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Moderado</div>
                                            </div>
                                            <div class="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                                <div class="text-2xl font-bold text-orange-700 dark:text-orange-300">1/8</div>
                                                <div class="text-xs text-orange-600 dark:text-orange-400 mt-1">Alto</div>
                                            </div>
                                            <div class="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                                <div class="text-2xl font-bold text-red-700 dark:text-red-300">1/8</div>
                                                <div class="text-xs text-red-600 dark:text-red-400 mt-1">Extremo</div>
                                            </div>
                                            <div class="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                                <div class="text-2xl font-bold text-purple-700 dark:text-purple-300">0/5</div>
                                                <div class="text-xs text-purple-600 dark:text-purple-400 mt-1">Activador</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sección 7: Contexto y Observaciones -->
                    <div class="accordion-section">
                        <button class="accordion-header flex justify-between items-center w-full p-4 bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-lg hover:from-teal-100 hover:to-teal-200 dark:hover:from-teal-800/30 dark:hover:to-teal-700/30 transition-all" data-target="seccionContexto">
                            <div class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                <h4 class="text-lg font-semibold text-teal-800 dark:text-teal-300">Contexto y Observaciones</h4>
                            </div>
                            <svg class="w-5 h-5 transform transition-transform accordion-icon" data-target="seccionContexto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div id="seccionContexto" class="accordion-content hidden p-4 bg-white dark:bg-gray-800 rounded-b-lg border border-gray-200 dark:border-gray-700">
                            <div class="space-y-4">
                                <div>
                                    <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Descripción detallada de los hechos:</h5>
                                    <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed" id="contextoDescripcion">El agresor realiza constantes comentarios descalificadores y controla los gastos del hogar, impidiendo que la víctima tenga acceso a dinero para sus necesidades básicas. Presenta comportamiento celoso y episodios de agresión verbal durante discusiones.</p>
                                    </div>
                                </div>

                                <div>
                                    <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Observaciones adicionales:</h5>
                                    <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400">
                                        <p class="text-gray-700 dark:text-gray-300" id="contextoObservaciones">La víctima muestra signos de baja autoestima y dependencia emocional. Ha buscado apoyo en familiares cercanos pero muestra temor a denunciar formalmente. Se recomienda seguimiento psicológico y asesoría legal.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer con botones de acción -->
                <div class="sticky bottom-0 bg-white dark:bg-gray-800 pt-4 border-t border-gray-200 dark:border-gray-600 mt-6">
                    <div class="flex flex-wrap justify-center gap-3">
                        <button id="btnVerDetalles" class="action-btn-view flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                            Ver Respuestas
                        </button>
                        <button id="btnAcciones" class="action-btn-procedure flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                            Acciones
                        </button>
                        <button onclick="cerrarModalDetalles()" class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="JS/respuestas2.js"></script>
</body>
</html>