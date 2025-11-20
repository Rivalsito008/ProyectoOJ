<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGEN - Sistema de Gestión Notarial</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="Style/respuestas.css">
</head>

<body>
    <!-- Sidebar Component -->
    <?php include 'components/sidebar.php'; ?>
    <!-- Main Content -->
    <div class="content">

        <!-- Header Component -->
        <?php
        $page_title = "Resultados 1"; // Título personalizado
        include 'components/header.php';
        ?>
        <!-- Content -->
        <main class="p-6">
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
                                        <th scope="col" class="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
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
                                        <th scope="col" class="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
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
                                        <th scope="col" class="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
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
                                        <th scope="col" class="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
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
                                        <th scope="col" class="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal para respuestas -->
            <div id="modalRespuestas"
                class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div
                    class="modal-dialog bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden">
                    <div class="p-6 overflow-y-auto max-h-[95vh]">
                        <div id="modalContent">
                            <!-- El contenido se llenará dinámicamente -->
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Botón flotante para niveles de riesgo -->
        <button id="floatingRiskBtn"
            class="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">i</span>
        </button>

        <!-- Modal de niveles de riesgo -->
        <div id="riskLevelsModal"
            class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
                class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col transform transition-all duration-300 scale-95">
                <!-- Header del modal -->
                <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-2xl p-5 text-white flex-shrink-0">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-bold">Niveles de Riesgo</h3>
                        <button onclick="cerrarRiskModal()" class="text-white hover:text-gray-200 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <p class="text-blue-100 text-sm mt-1">Rangos de puntos y criterios de evaluación</p>
                </div>

                <!-- Contenido del modal - Esta parte crecerá con scroll -->
                <div class="p-5 space-y-4 overflow-y-auto flex-1">
                    <!-- Nivel Bajo -->
                    <div
                        class="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-md transition-all duration-200">
                        <div class="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                        <div class="flex-1 min-w-0">
                            <div class="flex justify-between items-center">
                                <span class="font-semibold text-green-700 dark:text-green-300">Bajo</span>
                                <span class="text-sm text-green-600 dark:text-green-400">0 - 20 puntos</span>
                            </div>
                            <p class="text-sm text-green-600 dark:text-green-400 mt-1">Riesgo mínimo. Situación
                                controlada.</p>
                        </div>
                    </div>

                    <!-- Nivel Moderado -->
                    <div
                        class="flex items-center gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 hover:shadow-md transition-all duration-200">
                        <div class="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
                        <div class="flex-1 min-w-0">
                            <div class="flex justify-between items-center">
                                <span class="font-semibold text-yellow-700 dark:text-yellow-300">Moderado</span>
                                <span class="text-sm text-yellow-600 dark:text-yellow-400">21 - 40 puntos</span>
                            </div>
                            <p class="text-sm text-yellow-600 dark:text-yellow-400 mt-1">Riesgo medio. Requiere
                                seguimiento.</p>
                        </div>
                    </div>

                    <!-- Nivel Alto -->
                    <div
                        class="flex items-center gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800 hover:shadow-md transition-all duration-200">
                        <div class="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
                        <div class="flex-1 min-w-0">
                            <div class="flex justify-between items-center">
                                <span class="font-semibold text-orange-700 dark:text-orange-300">Alto</span>
                                <span class="text-sm text-orange-600 dark:text-orange-400">41 - 60 puntos</span>
                            </div>
                            <p class="text-sm text-orange-600 dark:text-orange-400 mt-1">Riesgo elevado. Medidas
                                urgentes.</p>
                        </div>
                    </div>

                    <!-- Nivel Extremo -->
                    <div
                        class="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 hover:shadow-md transition-all duration-200">
                        <div class="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                        <div class="flex-1 min-w-0">
                            <div class="flex justify-between items-center">
                                <span class="font-semibold text-red-700 dark:text-red-300">Extremo</span>
                                <span class="text-sm text-red-600 dark:text-red-400">61 - 80 puntos o activador
                                    automatico</span>
                            </div>
                            <p class="text-sm text-red-600 dark:text-red-400 mt-1">Riesgo crítico. Intervención
                                inmediata.</p>
                        </div>
                    </div>

                    <!-- Información adicional -->
                    <div
                        class="criteria-container bg-gradient-to-r from-blue-50 to-blue-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-4 border border-blue-200 dark:border-purple-700">
                        <div class="flex items-center gap-2 text-blue-600 dark:text-purple-400 mb-2">
                            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-sm font-medium criteria-title">Criterios de Evaluación</span>
                        </div>
                        <p class="text-sm text-blue-600 dark:text-purple-400 criteria-text leading-relaxed">
                            Los puntos se calculan basándose en la frecuencia e intensidad de las respuestas afirmativas
                            a las 38 preguntas del formulario de evaluación.
                        </p>
                    </div>
                </div>

                <div
                    class="bg-gray-50 dark:bg-gray-700 rounded-b-2xl p-4 border-t border-gray-200 dark:border-gray-600 flex-shrink-0">
                    <button onclick="cerrarRiskModal()"
                        class="risk-understand-btn w-full py-3 text-white font-medium rounded-lg">
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    </div>
    <script src="JS/respuestas.js"></script>
</body>

</html>