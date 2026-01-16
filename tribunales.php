<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGEN - Sistema de Gestión Notarial</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="Style/tribunales.css">

    <!-- Axios -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <!-- SweetAlert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="services/auth.js"></script>
</head>

<style>
    /* Contenedor de tabla responsivo */
    .table-container {
        overflow-x: auto;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    /* Tabla optimizada */
    .tribunales-table {
        width: 100%;
        min-width: 1200px;
        border-collapse: separate;
        border-spacing: 0;
        table-layout: fixed !important;
    }

    /* Columnas con ancho específico para optimizar espacio */
    .tribunales-table th:nth-child(1),
    .tribunales-table td:nth-child(1) {
        min-width: 150px !important;
        max-width: 150px !important;
        width: 150px !important;
        overflow: hidden !important;
    }

    .tribunales-table th:nth-child(2),
    .tribunales-table td:nth-child(2) {
        min-width: 120px !important;
        max-width: 120px !important;
        width: 120px !important;
        text-align: center;
        overflow: hidden !important;
    }

    .tribunales-table th:nth-child(3),
    .tribunales-table td:nth-child(3) {
        min-width: 120px !important;
        max-width: 120px !important;
        width: 120px !important;
        text-align: center;
        overflow: hidden !important;
    }

    .tribunales-table th:nth-child(4),
    .tribunales-table td:nth-child(4) {
        min-width: 100px !important;
        max-width: 100px !important;
        width: 100px !important;
        overflow: hidden !important;
    }

    .tribunales-table th:nth-child(5),
    .tribunales-table td:nth-child(5) {
        min-width: 110px !important;
        max-width: 110px !important;
        width: 110px !important;
        overflow: hidden !important;
    }

    .tribunales-table th:nth-child(6),
    .tribunales-table td:nth-child(6) {
        min-width: 110px !important;
        max-width: 110px !important;
        width: 110px !important;
        overflow: hidden !important;
    }

    .tribunales-table th:nth-child(7),
    .tribunales-table td:nth-child(7) {
        min-width: 120px !important;
        max-width: 120px !important;
        width: 120px !important;
        overflow: hidden !important;
    }

    .tribunales-table th:nth-child(8),
    .tribunales-table td:nth-child(8) {
        min-width: 180px !important;
        max-width: 180px !important;
        width: 180px !important;
        overflow: hidden !important;
    }

    /* COLUMNA DE ACCIONES STICKY - LA MAGIA ESTÁ AQUÍ */
    .tribunales-table th:nth-child(9) {
        min-width: 200px;
        width: 200px;
        position: sticky;
        right: 0;
        z-index: 1;
    }

    .tribunales-table td:nth-child(9) {
        min-width: 200px;
        width: 200px;
        position: sticky;
        right: 0;
        background: var(--card-bg);
        z-index: 1;
    }

    .tribunales-table th:nth-child(9) {
        z-index: 2;
    }

    /* Texto truncado con tooltip */
    .truncate-cell {
        max-width: 100%;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        cursor: help;
        position: relative;
        display: block !important;
        line-height: 1.4 !important;
        max-height: 22px !important;
    }

    /* Tooltip que aparece al hacer hover */
    .truncate-cell:hover::after {
        content: attr(data-full-text);
        position: absolute;
        left: 0;
        top: 100%;
        background: rgba(0, 0, 0, 0.95);
        color: white;
        padding: 10px 14px;
        border-radius: 8px;
        white-space: normal;
        max-width: 350px;
        min-width: 200px;
        z-index: 1000;
        font-size: 13px;
        line-height: 1.5;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        margin-top: 6px;
        pointer-events: none;
        animation: tooltipFadeIn 0.2s ease;
    }

    @keyframes tooltipFadeIn {
        from {
            opacity: 0;
            transform: translateY(-5px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    [data-theme="dark"] .truncate-cell:hover::after {
        background: rgba(42, 34, 64, 0.98);
        border: 1px solid var(--border-color);
    }

    /* Asegurar que todas las celdas tengan altura uniforme */
    .tribunales-table tbody td {
        height: 50px !important;
        max-height: 50px !important;
        vertical-align: middle;
        padding: 12px 8px !important;
        overflow: hidden;
    }

    /* Forzar altura máxima para evitar que las filas crezcan */
    .tribunales-table tbody tr {
        height: 50px !important;
        max-height: 60px !important;
    }

    /* Headers también con altura fija */
    .tribunales-table thead th {
        height: 50px !important;
        vertical-align: middle;
    }

    /* Contenedor de botones de acción */
    .action-buttons-container {
        display: flex;
        gap: 8px;
        justify-content: center;
        flex-wrap: nowrap;
    }

    /* Indicador de scroll */
    .scroll-indicator {
        text-align: center;
        padding: 8px;
        background: linear-gradient(90deg, transparent, var(--bg-color), transparent);
        color: #6b7280;
        font-size: 12px;
        display: none;
    }

    [data-theme="dark"] .scroll-indicator {
        color: #9ca3af;
    }

    @media (max-width: 1400px) {
        .scroll-indicator {
            display: block;
        }

        .tribunales-table {
            min-width: 1100px;
        }
    }
</style>

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
                        <div class="table-container">
                            <table class="tribunales-table w-full text-sm text-left">
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
                                    <!-- Los datos se cargarán dinámicamente aquí -->
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

    <script src="JS/tribunales.js"></script>
</body>

</html>