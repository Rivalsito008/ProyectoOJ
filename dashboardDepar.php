<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGEN - Sistema de Gestión Notarial</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
    <link rel="stylesheet" href="Style/dashboardDepar.css">
</head>

<body>
    <!-- Sidebar Component -->
    <?php include 'components/sidebar.php'; ?>

    <!-- Main Content -->
    <div class="content">
        <!-- Header Component -->
        <?php
        $page_title = "Dashboard Departamental"; // Título personalizado
        include 'components/header.php';
        ?>

        <!-- Content -->
        <main class="p-6">
            <!-- Stats Cards -->
            <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <!-- Riesgo Bajo -->
                <div class="card rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-800">Caso Activos de Alto/Extremo</h2>
                        <br>
                        <p class="text-3xl font-bold text-black-500 mt-2">12</p>
                    </div>
                </div>

                <!-- Riesgo Moderado -->
                <div class="card rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-800">Victimas Totales Regristradas</h2>
                        <br>
                        <p class="text-3xl font-bold text-black-500 mt-2">96</p>
                    </div>
                </div>

                <!-- Riesgo Alto -->
                <div class="card rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-800">Casos con Alerta Activadora(Hoy)</h2>
                        <p class="text-3xl font-bold text-black-500 mt-2">54</p>
                    </div>
                </div>

                <!-- Riesgo Extremo -->
                <div class="card rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-800">Tiempo Promedo de Resolución</h2>
                        <p class="text-3xl font-bold text-black-500 mt-2">22</p>
                    </div>
                </div>
            </section>

            <!-- Charts Section -->
            <section>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Gráfico 1: Distribución por Edad (Vertical) -->
                    <div class="card rounded-xl p-6">
                        <h2 class="text-xl font-semibold mb-4 text-gray-800">
                            Distribución de Víctimas por Rango de Edad
                        </h2>
                        <div class="h-80">
                            <canvas id="ageDistributionChart"></canvas>
                        </div>
                    </div>

                    <!-- Gráfico 2: Prevalencia de Violencia (HORIZONTAL) -->
                    <div class="card rounded-xl p-6">
                        <h2 class="text-xl font-semibold mb-4 text-gray-800">
                            Prevalencia de Tipos de Violencia
                        </h2>
                        <div class="h-80">
                            <canvas id="violencePrevalenceChart"></canvas>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>

    <!-- Scripts -->
    <script src="JS/dashboardDepar.js"></script>
</body>

</html>