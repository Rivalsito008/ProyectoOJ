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
    <?php include 'components/sidebar.php'; ?>
    <!-- Main Content -->
    <div class="content">
        <!-- Header Component -->
        <?php
        $page_title = "Preguntas"; // Título personalizado
        include 'components/header.php';
        ?>
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
                    <div class="browser-tab" data-tab="activadora">
                        <div class="tab-indicator bg-[#8B0000]"></div>
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
                                        <th scope="col" class="px-6 py-3">Pregunta</th>
                                        <th scope="col" class="px-6 py-3 text-center">Ámbito</th>
                                        <th scope="col" class="px-6 py-3">Riesgo</th>
                                        <th scope="col" class="px-6 py-3">Puntaje</th>
                                        <th scope="col" class="px-6 py-3">Estado</th>
                                        <th scope="col" class="px-6 py-3 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaTodo">
                                    <!-- Se llena dinámicamente -->
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
                                        <th scope="col" class="px-6 py-3">Pregunta</th>
                                        <th scope="col" class="px-6 py-3 text-center">Ámbito</th>
                                        <th scope="col" class="px-6 py-3">Riesgo</th>
                                        <th scope="col" class="px-6 py-3">Puntaje</th>
                                        <th scope="col" class="px-6 py-3">Estado</th>
                                        <th scope="col" class="px-6 py-3 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaBajo">
                                    <!-- Se llena dinámicamente -->
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
                                        <th scope="col" class="px-6 py-3">Pregunta</th>
                                        <th scope="col" class="px-6 py-3 text-center">Ámbito</th>
                                        <th scope="col" class="px-6 py-3">Riesgo</th>
                                        <th scope="col" class="px-6 py-3">Puntaje</th>
                                        <th scope="col" class="px-6 py-3">Estado</th>
                                        <th scope="col" class="px-6 py-3 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaModerado">
                                    <!-- Se llena dinámicamente -->
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
                                        <th scope="col" class="px-6 py-3">Pregunta</th>
                                        <th scope="col" class="px-6 py-3 text-center">Ámbito</th>
                                        <th scope="col" class="px-6 py-3">Riesgo</th>
                                        <th scope="col" class="px-6 py-3">Puntaje</th>
                                        <th scope="col" class="px-6 py-3">Estado</th>
                                        <th scope="col" class="px-6 py-3 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaAlto">
                                    <!-- Se llena dinámicamente -->
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
                                        <th scope="col" class="px-6 py-3">Pregunta</th>
                                        <th scope="col" class="px-6 py-3 text-center">Ámbito</th>
                                        <th scope="col" class="px-6 py-3">Riesgo</th>
                                        <th scope="col" class="px-6 py-3">Puntaje</th>
                                        <th scope="col" class="px-6 py-3">Estado</th>
                                        <th scope="col" class="px-6 py-3 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaExtremo">
                                    <!-- Se llena dinámicamente -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Tab: Activador -->
                    <div class="tab-content" id="activadora">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left">
                                <thead class="text-xs uppercase">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">Pregunta</th>
                                        <th scope="col" class="px-6 py-3 text-center">Ámbito</th>
                                        <th scope="col" class="px-6 py-3">Riesgo</th>
                                        <th scope="col" class="px-6 py-3">Puntaje</th>
                                        <th scope="col" class="px-6 py-3">Estado</th>
                                        <th scope="col" class="px-6 py-3 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaActivadora">
                                    <!-- Se llena dinámicamente -->
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
                                    <option value="Conducta">Conducta del agresor</option>
                                    <option value="Contexto">Contexto de la Violencia</option>
                                    <option value="Riesgo">Riesgo de la Victima</option>
                                    <option value="Vulnerabilidad">Vulnerabilidad de Victima</option>
                                    <option value="Percepción">Percepción de Victima</option>
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

                            <!-- En tu modal de preguntas, reemplaza el botón actual por este: -->
                            <div class="px-6 py-4 bg-white flex justify-end">
                                <button
                                    id="btnGuardarPregunta"
                                    class="px-5 py-2 rounded-lg font-medium">
                                    Guardar Pregunta
                                </button>
                            </div>
                        </div>

                </div>
                </section>
            </div>
        </main>
    </div>
    <script src="JS/preguntas.js"></script>
</body>

</html>