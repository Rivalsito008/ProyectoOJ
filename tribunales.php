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
    <!-- Sidebar Component -->
    <?php include 'components/sidebar.php'; ?>
    <!-- Main Content -->
    <div class="content">
        <!-- Header Component -->
        <?php
        $page_title = "Tribunales"; // Título personalizado
        include 'components/header.php';
        ?>
        <main class="p-6">
            <div class="tabs-container">
                <div class="tabs-wrapper">
                    <div class="browser-tab active" data-tab="Todo">
                        <div class="tab-indicator bg-blue-500"></div>
                        <span class="tab-label">Todos</span>
                    </div>
                </div>

                <div class="tab-content-wrapper">
                    <div class="tab-content active" id="Todo">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left">
                                <thead class="text-xs uppercase">
                                    <tr>
                                        <th class="px-6 py-3">Nombre</th>
                                        <th class="px-6 py-3 text-center">Tipo</th>
                                        <th class="px-6 py-3">Numeración</th>
                                        <th class="px-6 py-3">Materia</th>
                                        <th class="px-6 py-3">Departamento</th>
                                        <th class="px-6 py-3">Municipio</th>
                                        <th class="px-6 py-3">Distrito</th>
                                        <th class="px-6 py-3">Dirección</th>
                                        <th class="px-6 py-3 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaTodo">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Botón Flotante -->
            <div class="fixed bottom-8 right-8 z-50">
                <button id="openFormBtn"
                    class="group relative w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 ease-out flex items-center justify-center overflow-hidden hover:w-52">
                    <div
                        class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500">
                    </div>
                    <span
                        class="absolute text-3xl font-bold transition-all duration-300 transform group-hover:-translate-x-4 group-hover:opacity-0">+</span>
                    <span
                        class="absolute opacity-0 text-sm tracking-wide font-semibold transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 group-hover:opacity-100">Agregar
                        Tribunal</span>
                </button>
            </div>

            <!-- Modal -->
            <div id="userFormModal"
                class="fixed inset-0 z-50 bg-black bg-opacity-50 hidden items-center justify-center p-4">
                <div class="modal-content rounded-2xl shadow-2xl max-w-2xl w-full overflow-y-auto max-h-[90vh]">
                    <div class="modal-header flex justify-between items-center p-5 rounded-t-2xl">
                        <h2 class="text-lg font-semibold flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-500" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor"></svg>
                            Nuevo Tribunal
                        </h2>
                        <button id="closeFormBtn" class="text-gray-500 hover:text-red-500 transition">✕</button>
                    </div>

                    <!-- En el modal del formulario -->
                    <section class="p-6 space-y-6">
                        <div class="space-y-4">
                            <!-- Nombre -->
                            <div>
                                <label class="text-sm font-semibold">Nombre del Tribunal *</label>
                                <input type="text" id="nombreTribunal" name="tribunal"
                                    class="w-full mt-1 border rounded-lg p-2" required>
                            </div>

                            <!-- Tipo de Tribunal -->
                            <div class="mb-4">
                                <label class="block text-gray-700 font-semibold">Tipo de Tribunal *</label>
                                <select id="tipoTribunal" name="id_tipo_tribunal" class="w-full p-3 border rounded-lg"
                                    required>
                                    <option value="">Seleccione un tipo...</option>
                                    <!-- Las opciones se cargarán dinámicamente -->
                                </select>
                            </div>

                            <!-- Numeración -->
                            <div class="mb-4">
                                <label class="block text-gray-700 font-semibold">Numeración *</label>
                                <select id="numeracion" name="id_numeracion_tribunal" class="w-full border rounded p-3"
                                    required>
                                    <option value="">Seleccione numeración...</option>
                                    <!-- Las opciones se cargarán dinámicamente -->
                                </select>
                            </div>

                            <!-- Departamento -->
                            <div class="mb-4">
                                <label class="block text-gray-700 font-semibold">Departamento *</label>
                                <select id="departamento" class="w-full p-3 border rounded-lg" required>
                                    <option value="">Seleccione un departamento...</option>
                                    <!-- Las opciones se cargarán dinámicamente -->
                                </select>
                            </div>

                            <!-- Municipio -->
                            <div class="mb-4">
                                <label class="block text-gray-700 font-semibold">Municipio *</label>
                                <select id="municipio" class="w-full p-3 border rounded-lg" required>
                                    <option value="">Seleccione un departamento primero...</option>
                                </select>
                            </div>

                            <!-- Distrito -->
                            <div class="mb-4">
                                <label class="block text-gray-700 font-semibold">Distrito *</label>
                                <select id="distrito" name="id_distrito" class="w-full p-3 border rounded-lg" required>
                                    <option value="">Seleccione un municipio primero...</option>
                                </select>
                            </div>

                            <!-- Dirección -->
                            <div class="mb-6">
                                <label class="block text-gray-700 font-semibold">Dirección Completa *</label>
                                <textarea id="direccion" name="direccion" class="w-full p-3 border rounded-lg" rows="3"
                                    placeholder="Ej: Centro Judicial Integrado de Santa Tecla..." required></textarea>
                            </div>

                            <!-- Estado -->
                            <div class="mb-6">
                                <label class="block text-gray-700 font-semibold">Estado *</label>
                                <select id="estado" name="estado" class="w-full p-3 border rounded-lg" required>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <div class="px-6 py-4 bg-white flex justify-end">
                        <button class="btn-save-tribu px-5 py-2 rounded-lg font-medium">Guardar Tribunal</button>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="JS/tribunales.js"></script>
</body>

</html>