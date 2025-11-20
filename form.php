<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SIGEN - Sistema de Gestión Notarial</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="Style/form.css">
</head>

<body>
  <!-- Sidebar Component -->
  <?php include 'components/sidebar.php'; ?>

  <!-- Main Content -->
  <div id="mainContent" class="content">
        <!-- Header Component -->
        <?php 
        $page_title = "Formulario"; // Título personalizado
        include 'components/header.php'; 
        ?>
    <main class="p-6">
      <!-- Progreso -->
      <div class="w-full h-2 mb-8 rounded-full" id="progressContainer">
        <div id="progressBar" class="h-2 rounded-full transition-all duration-300" style="width: 25%;"></div>
      </div>

      <!-- Pasos del Formulario -->
      <form id="multiStepForm" class="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <!-- Paso 1: Datos de la Víctima (reemplaza el paso anterior) -->
        <div class="step">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Datos de la Víctima</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Nombre" class="border rounded-lg p-2" required>
            <input type="text" placeholder="Apellido" class="border rounded-lg p-2" required>
            <select class="border rounded-lg p-2" required>
              <option value="">Tipo de Documento</option>
              <option>DUI</option>
              <option>Pasaporte</option>
              <option>Licencia de Conducir</option>
              <option>CIP</option>
            </select>
            <input type="text" placeholder="Número de Documento" class="border rounded-lg p-2" required>
            <select class="border rounded-lg p-2" required>
              <option value="">Género</option>
              <option>Femenino</option>
              <option>Masculino</option>
              <option>Otro</option>
            </select>
            <input type="date" class="border rounded-lg p-2" required>
            <input type="text" placeholder="Dirección" class="border rounded-lg p-2" required>
            <input type="tel" placeholder="Teléfono" class="border rounded-lg p-2" required>
            <input type="email" placeholder="Correo electrónico" class="border rounded-lg p-2">
          </div>
        </div>

        <!-- Paso 2: Preguntas del Cuestionario -->
        <div class="step hidden">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Cuestionario</h2>
          <div id="preguntasForm" class="space-y-6"></div>
        </div>

        <!-- Paso 3: Confirmación -->
        <div class="step hidden text-center">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Confirmación</h2>
          <p class="text-gray-600 mb-6">Revisa tus datos antes de enviar el formulario.</p>
        </div>

        <!-- Navegación -->
        <div class="flex justify-between mt-6">
          <button type="button" id="prevBtn" class="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 hidden">Anterior</button>
          <button type="button" id="nextBtn" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Siguiente</button>
        </div>
      </form>
    </main>
  </div>

  <script src="JS/form.js"></script>
</body>

</html>