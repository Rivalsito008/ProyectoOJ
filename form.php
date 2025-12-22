<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SIGEN - Sistema de Gestión Notarial</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="Style/form.css">

  <!-- Axios -->
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script src="services/auth.js"></script>
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
      <div class="w-full h-2 mb-8 rounded-full no-print" id="progressContainer">
        <div id="progressBar" class="h-2 rounded-full transition-all duration-300" style="width: 16.66%;"></div>
      </div>

      <!-- Pasos del Formulario -->
      <form id="multiStepForm"
        class="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200 no-print">
        <!-- Paso 1: Datos del Denunciante -->
        <div class="step">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">Datos del Denunciante</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Fila 1 -->
            <input type="text" placeholder="Nombre" id="denuncianteNombre"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
            <input type="text" placeholder="Apellido" id="denuncianteApellido"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>

            <!-- Fila 2 -->
            <input type="number" placeholder="Edad"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
            <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
              <option value="">Sexo</option>
              <option>Mujer</option>
              <option>Hombre</option>
            </select>

            <!-- Fila 3 -->
            <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
              <option value="">Estado familiar</option>
              <option>Soltero/a</option>
              <option>Casado/a</option>
              <option>Divorciado/a</option>
              <option>Viudo/a</option>
              <option>Unión Libre</option>
            </select>

            <!-- Fila 4 - Documento de identidad -->
            <div class="md:col-span-2">
              <label class="block text-gray-700 text-sm font-medium mb-2">
                Quien se identifica por medio de su documento de identidad número:
              </label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required>
                  <option value="">Tipo de Documento</option>
                  <option>DUI</option>
                  <option>Pasaporte</option>
                  <option>Licencia de Conducir</option>
                  <option>CIP</option>
                  <option>NIT</option>
                </select>
                <input type="text" placeholder="Número de documento"
                  class="border border-gray-300 rounded-lg p-3 md:col-span-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required>
              </div>
            </div>

            <!-- Fila 5 -->
            <div class="md:col-span-2">
              <label class="block text-gray-700 text-sm font-medium mb-2">
                Extendido en:
              </label>
              <input type="text" placeholder="Lugar de extensión del documento (ej: San Salvador)"
                class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required>
            </div>

            <!-- Fila 6 -->
            <input type="date"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
            <input type="text" placeholder="Profesión u oficio"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>

            <!-- Fila 7 -->
            <input type="tel" placeholder="No. Teléfono"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
            <input type="text" placeholder="Domicilio"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>

            <!-- Fila 8 -->
            <input type="text" placeholder="Lugar de trabajo"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
            <input type="text" placeholder="Hija de los señores"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>

            <!-- Fila 9 - Nivel educativo -->
            <div class="md:col-span-2">
              <label class="block text-gray-700 text-sm font-medium mb-2">Nivel educativo:</label>
              <select
                class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required>
                <option value="">Seleccione nivel educativo</option>
                <option>Ninguno</option>
                <option>Parvulario incompleta</option>
                <option>Parvularia completa</option>
                <option>Primaria incompleta</option>
                <option>Primaria completa</option>
                <option>Secundaria incompleta</option>
                <option>Secundaria completa</option>
                <option>Técnico incompleta</option>
                <option>Técnico completa</option>
                <option>Universitario incompleta</option>
                <option>Universitario completa</option>
                <option>Otros</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Paso 2: Datos de la Víctima -->
        <div class="step hidden">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">Datos de la Víctima</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Fila 1 -->
            <input type="text" placeholder="Nombre" id="victimaNombre"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
            <input type="text" placeholder="Apellido" id="victimaApellido"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>

            <!-- Fila 2 -->
            <input type="number" placeholder="Edad"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
            <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
              <option value="">Sexo</option>
              <option>Mujer</option>
              <option>Hombre</option>
            </select>

            <!-- Fila 3 -->
            <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
              <option value="">Estado Familiar</option>
              <option>Soltero/a</option>
              <option>Casado/a</option>
              <option>Divorciado/a</option>
              <option>Viudo/a</option>
              <option>Unión Libre</option>
            </select>

            <!-- Fila 4 - Documento de Identificación -->
            <div class="md:col-span-2">
              <label class="block text-gray-700 text-sm font-medium mb-2">Documento de Identificación:</label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required>
                  <option value="">Tipo de Documento</option>
                  <option>DUI</option>
                  <option>Pasaporte</option>
                  <option>Licencia de Conducir</option>
                  <option>CIP</option>
                  <option>NIT</option>
                </select>
                <input type="text" placeholder="Número de documento"
                  class="border border-gray-300 rounded-lg p-3 md:col-span-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required>
              </div>
            </div>

            <!-- Fila 5 -->
            <input type="date"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
            <input type="text" placeholder="Profesión u Oficio"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>

            <!-- Fila 6 -->
            <input type="tel" placeholder="No. Telefono"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
            <input type="text" placeholder="Domicilio"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>

            <!-- Fila 7 -->
            <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
              <option value="">Zona</option>
              <option>Urbana</option>
              <option>Urbano-marginal</option>
              <option>Rural</option>
            </select>
            <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
              <option value="">Embarazo</option>
              <option>Si</option>
              <option>No</option>
              <option>No sabe</option>
              <option>N/A</option>
            </select>

            <!-- Fila 8 - Enfermedad -->
            <div class="border border-gray-300 rounded-lg p-3 bg-gray-50">
              <label class="block text-gray-700 text-sm font-medium mb-2">¿Adolece de alguna enfermedad?</label>
              <div class="flex space-x-4">
                <label class="flex items-center space-x-2">
                  <input type="radio" name="enfermedad" value="si" class="text-blue-600">
                  <span>Si</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="radio" name="enfermedad" value="no" class="text-blue-600">
                  <span>No</span>
                </label>
              </div>
              <input type="text" placeholder="Diagnóstico"
                class="border border-gray-300 rounded-lg p-2 mt-2 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                id="diagnosticoInput" style="display: none;">
            </div>

            <!-- Fila 9 - Discapacidad -->
            <div class="border border-gray-300 rounded-lg p-3 bg-gray-50">
              <label class="block text-gray-700 text-sm font-medium mb-2">¿Adolece de alguna discapacidad?</label>
              <select
                class="border border-gray-300 rounded-lg p-2 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                id="discapacidadSelect">
                <option value="">Seleccione</option>
                <option>Física</option>
                <option>Mental</option>
                <option>Ninguna</option>
              </select>
              <input type="text" placeholder="Descripción"
                class="border border-gray-300 rounded-lg p-2 mt-2 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                id="discapacidadDesc" style="display: none;">
            </div>

            <!-- Fila 10 -->
            <div class="md:col-span-2">
              <label class="block text-gray-700 text-sm font-medium mb-2">Descripción Física:</label>
              <textarea placeholder="Describa las características físicas de la víctima..."
                class="border border-gray-300 rounded-lg p-3 w-full h-20 resize-vertical focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
            </div>

            <!-- Fila 11 -->
            <div class="md:col-span-2">
              <label class="block text-gray-700 text-sm font-medium mb-2">Nivel educativo:</label>
              <select
                class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required>
                <option value="">Seleccione nivel educativo</option>
                <option>Ninguno</option>
                <option>Parvulario incompleta</option>
                <option>Parvularia completa</option>
                <option>Primaria incompleta</option>
                <option>Primaria completa</option>
                <option>Secundaria incompleta</option>
                <option>Secundaria completa</option>
                <option>Técnico incompleta</option>
                <option>Técnico completa</option>
                <option>Universitario incompleta</option>
                <option>Universitario completa</option>
                <option>Otros</option>
              </select>
            </div>

            <!-- Fila 12 -->
            <input type="number" placeholder="N° de hijos"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              min="0">
            <select
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option value="">Tipo de arma que posee</option>
              <option>Arma de fuego</option>
              <option>Arma blanca</option>
              <option>Ninguna</option>
              <option>N/A</option>
            </select>

            <!-- Fila 13 - Tipo de trabajo -->
            <div class="md:col-span-2 border border-gray-300 rounded-lg p-4 bg-gray-50">
              <label class="block text-gray-700 text-sm font-medium mb-3">Tipo de trabajo:</label>

              <!-- Producción -->
              <div class="mb-4 p-3 border border-gray-300 rounded-lg bg-white">
                <label class="block text-gray-700 font-medium mb-2">1- Producción</label>
                <input type="tel" placeholder="No. Telefono"
                  class="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <textarea placeholder="Tareas que desempeña..."
                  class="border border-gray-300 rounded-lg p-2 w-full h-16 resize-vertical focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
              </div>

              <!-- Reproducción -->
              <div class="p-3 border border-gray-300 rounded-lg bg-white">
                <label class="block text-gray-700 font-medium mb-2">2- Reproducción</label>
                <input type="tel" placeholder="No. Telefónico"
                  class="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <textarea placeholder="Tareas que desempeña..."
                  class="border border-gray-300 rounded-lg p-2 w-full h-16 resize-vertical focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
              </div>
            </div>

            <!-- Fila 14 -->
            <input type="text" placeholder="Lugar de permanencia"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
            <input type="tel" placeholder="No. telefono"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
          </div>
        </div>

        <!-- Paso 3: Datos del Agresor -->
        <div class="step hidden">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">Datos del Agresor</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Fila 1 -->
            <input type="text" placeholder="Nombre" id="agresorNombre"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
            <input type="text" placeholder="Apellido" id="agresorApellido"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
            <!-- Fila 2 -->
            <input type="number" placeholder="Edad"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
            <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
              <option value="">Sexo</option>
              <option>Mujer</option>
              <option>Hombre</option>
            </select>

            <!-- Fila 3 -->
            <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
              <option value="">Estado Familiar</option>
              <option>Soltero/a</option>
              <option>Casado/a</option>
              <option>Divorciado/a</option>
              <option>Viudo/a</option>
              <option>Unión Libre</option>
            </select>

            <!-- Fila 4 -->
            <input type="text" placeholder="Profesión u Oficio"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
            <input type="tel" placeholder="Teléfono"
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>

            <!-- Fila 5 -->
            <input type="text" placeholder="Domicilio"
              class="border border-gray-300 rounded-lg p-3 md:col-span-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>

            <!-- Fila 6 -->
            <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
              <option value="">Zona</option>
              <option>Urbana</option>
              <option>Urbano-marginal</option>
              <option>Rural</option>
            </select>
            <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
              <option value="">¿Adolece de alguna discapacidad?</option>
              <option>Física</option>
              <option>Mental</option>
              <option>Ninguna</option>
              <option>Otra</option>
            </select>

            <!-- Fila 7 -->
            <div class="md:col-span-2">
              <label class="block text-gray-700 text-sm font-medium mb-2">Descripción física:</label>
              <textarea placeholder="Describa las características físicas del agresor..."
                class="border border-gray-300 rounded-lg p-3 w-full h-20 resize-vertical focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
            </div>

            <!-- Fila 8 -->
            <div class="md:col-span-2">
              <label class="block text-gray-700 text-sm font-medium mb-2">Señales particulares:</label>
              <textarea placeholder="Describa señales particulares como tatuajes, cicatrices, etc..."
                class="border border-gray-300 rounded-lg p-3 w-full h-16 resize-vertical focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
            </div>

            <!-- Fila 9 -->
            <div class="md:col-span-2">
              <label class="block text-gray-700 text-sm font-medium mb-2">Nivel educativo:</label>
              <select
                class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required>
                <option value="">Seleccione nivel educativo</option>
                <option>Ninguno</option>
                <option>Parvulario incompleta</option>
                <option>Parvularia completa</option>
                <option>Primaria incompleta</option>
                <option>Primaria completa</option>
                <option>Secundaria incompleta</option>
                <option>Secundaria completa</option>
                <option>Técnico incompleta</option>
                <option>Técnico completa</option>
                <option>Universitario incompleta</option>
                <option>Universitario completa</option>
                <option>Otros</option>
              </select>
            </div>

            <!-- Fila 10 - Formación militar -->
            <div class="border border-gray-300 rounded-lg p-3 bg-gray-50">
              <label class="block text-gray-700 text-sm font-medium mb-2">¿Posee formación militar?</label>
              <div class="flex space-x-4">
                <label class="flex items-center space-x-2">
                  <input type="radio" name="formacionMilitar" value="si" class="text-blue-600">
                  <span>Si</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="radio" name="formacionMilitar" value="no" class="text-blue-600">
                  <span>No</span>
                </label>
              </div>
              <select
                class="border border-gray-300 rounded-lg p-2 mt-2 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                id="tipoFormacionSelect" style="display: none;">
                <option value="">¿Qué tipo de formación posee?</option>
                <option>Policial</option>
                <option>Militar</option>
                <option>Guardia de seguridad</option>
              </select>
            </div>

            <select
              class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option value="">Tipo de arma que posee</option>
              <option>Arma de fuego</option>
              <option>Arma blanca</option>
              <option>Ninguna</option>
              <option>N/A</option>
            </select>

            <!-- Fila 11 - Tipo de trabajo -->
            <div class="md:col-span-2 border border-gray-300 rounded-lg p-4 bg-gray-50">
              <label class="block text-gray-700 text-sm font-medium mb-3">Tipo de trabajo:</label>

              <!-- Producción -->
              <div class="mb-4 p-3 border border-gray-300 rounded-lg bg-white">
                <label class="block text-gray-700 font-medium mb-2">1- Producción</label>
                <input type="text" placeholder="Lugar de trabajo"
                  class="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <input type="tel" placeholder="No. Telefono"
                  class="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <textarea placeholder="Tareas que desempeña..."
                  class="border border-gray-300 rounded-lg p-2 w-full h-16 resize-vertical focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
              </div>

              <!-- Reproducción -->
              <div class="p-3 border border-gray-300 rounded-lg bg-white">
                <label class="block text-gray-700 font-medium mb-2">2- Reproducción</label>
                <div class="flex items-center mb-2">
                  <label class="flex items-center space-x-2 mr-4">
                    <input type="radio" name="desempleado" value="si" class="text-blue-600">
                    <span>Actualmente desempleado</span>
                  </label>
                </div>
                <input type="text" placeholder="Lugar de permanencia"
                  class="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <input type="tel" placeholder="No. telefónico"
                  class="border border-gray-300 rounded-lg p-2 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>
            </div>

            <!-- Fila 12 -->
            <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required>
              <option value="">Vínculo que une a la víctima con el agresor(a)</option>
              <option>Pareja/Esposo/a</option>
              <option>Ex-pareja</option>
              <option>Padre/Madre</option>
              <option>Hijo/Hija</option>
              <option>Hermano/Hermana</option>
              <option>Familiar</option>
              <option>Vecino</option>
              <option>Compañero de trabajo</option>
              <option>Desconocido</option>
              <option>Otro</option>
            </select>

            <div class="grid grid-cols-2 gap-2">
              <div class="border border-gray-300 rounded-lg p-3 bg-gray-50">
                <label class="block text-gray-700 text-sm font-medium mb-1 text-center">¿Cohabita?</label>
                <div class="flex justify-center space-x-2">
                  <label class="flex items-center space-x-1">
                    <input type="radio" name="cohabita" value="si" class="text-blue-600">
                    <span class="text-sm">Si</span>
                  </label>
                  <label class="flex items-center space-x-1">
                    <input type="radio" name="cohabita" value="no" class="text-blue-600">
                    <span class="text-sm">No</span>
                  </label>
                </div>
              </div>

              <div class="border border-gray-300 rounded-lg p-3 bg-gray-50">
                <label class="block text-gray-700 text-sm font-medium mb-1 text-center">¿Viven en el mismo
                  barrio?</label>
                <div class="flex justify-center space-x-2">
                  <label class="flex items-center space-x-1">
                    <input type="radio" name="mismoBarrio" value="si" class="text-blue-600">
                    <span class="text-sm">Si</span>
                  </label>
                  <label class="flex items-center space-x-1">
                    <input type="radio" name="mismoBarrio" value="no" class="text-blue-600">
                    <span class="text-sm">No</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Fila 13 - Ocurrencia del hecho -->
            <div class="md:col-span-2 border border-gray-300 rounded-lg p-4 bg-gray-50">
              <h3 class="font-semibold text-gray-800 mb-3">Ocurrencia del hecho</h3>

              <select
                class="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required>
                <option value="">Condiciones del agresor</option>
                <option>Estable-sobrio(a)</option>
                <option>Trastorno psiquiatrico</option>
                <option>Datos desconocido</option>
                <option>Alcoholizado(a)</option>
                <option>Drogado</option>
                <option>Otros</option>
              </select>

              <div class="border border-gray-300 rounded-lg p-3 bg-white mb-3">
                <label class="block text-gray-700 text-sm font-medium mb-2">
                  ¿Se ha realizado con anterioridad alguna detención por parte de la P.N.C en caso de violencia
                  intrafamiliar?
                </label>
                <div class="flex space-x-4 mb-2">
                  <label class="flex items-center space-x-2">
                    <input type="radio" name="detencionPNC" value="si" class="text-blue-600">
                    <span>Si</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="radio" name="detencionPNC" value="no" class="text-blue-600">
                    <span>No</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="radio" name="detencionPNC" value="no-sabe" class="text-blue-600">
                    <span>No sabe</span>
                  </label>
                </div>
                <input type="number" placeholder="¿Cuántas veces?"
                  class="border border-gray-300 rounded-lg p-2 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  id="vecesDetencion" style="display: none;" min="0">
              </div>

              <select
                class="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required>
                <option value="">Frecuencia de la agresión</option>
                <option>Diaria</option>
                <option>Semanal</option>
                <option>Quincenal</option>
                <option>Mensual</option>
                <option>Trimestral</option>
                <option>Semestral</option>
                <option>Anual</option>
                <option>Eventual</option>
              </select>

              <div class="border border-gray-300 rounded-lg p-3 bg-white mb-3">
                <label class="block text-gray-700 text-sm font-medium mb-2">Detalle de la fecha de la agresión:</label>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <select
                    class="border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Día</option>
                    <option>L</option>
                    <option>M</option>
                    <option>M</option>
                    <option>J</option>
                    <option>V</option>
                    <option>S</option>
                    <option>D</option>
                  </select>
                  <input type="date"
                    class="border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <input type="time"
                    class="border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>
                <input type="text" placeholder="Mes"
                  class="border border-gray-300 rounded-lg p-2 w-full mt-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <input type="text" placeholder="Lugar"
                  class="border border-gray-300 rounded-lg p-2 w-full mt-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>

              <select
                class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required>
                <option value="">Circunstancia del hecho</option>
                <option>Primario</option>
                <option>Reincidente</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Paso 4: Formas de Violencia Intrafamiliar -->
        <div class="step hidden">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">Formas de Violencia Intrafamiliar</h2>

          <!-- Selección de tipo de violencia -->
          <div class="mb-8 p-6 border border-gray-300 rounded-lg bg-white">
            <h3 class="text-lg font-semibold mb-4 text-gray-800">Seleccione el tipo(s) de violencia:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button type="button"
                class="violencia-btn p-4 border-2 border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
                data-tipo="fisica">
                <span class="block font-semibold text-gray-800">A. Física</span>
                <span class="block text-sm text-gray-600 mt-1">Golpes, lesiones, quemaduras, etc.</span>
              </button>
              <button type="button"
                class="violencia-btn p-4 border-2 border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
                data-tipo="psicologica">
                <span class="block font-semibold text-gray-800">B. Psicológica</span>
                <span class="block text-sm text-gray-600 mt-1">Gritos, humillación, amenazas, etc.</span>
              </button>
              <button type="button"
                class="violencia-btn p-4 border-2 border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
                data-tipo="sexual">
                <span class="block font-semibold text-gray-800">C. Sexual</span>
                <span class="block text-sm text-gray-600 mt-1">Acoso, violación, tocamientos, etc.</span>
              </button>
              <button type="button"
                class="violencia-btn p-4 border-2 border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
                data-tipo="patrimonial">
                <span class="block font-semibold text-gray-800">D. Patrimonial</span>
                <span class="block text-sm text-gray-600 mt-1">Económica, bienes, alimentación, etc.</span>
              </button>
            </div>
          </div>

          <!-- Contenedor para mostrar las opciones seleccionadas -->
          <div id="opciones-violencia-container" class="space-y-4">
            <!-- Las opciones se mostrarán aquí dinámicamente -->
          </div>

          <!-- Información Adicional (siempre visible) -->
          <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Víctima reside en casa de -->
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">Víctima reside en casa de:</label>
              <select
                class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">Seleccione</option>
                <option>Agresor</option>
                <option>Familiar del agresor</option>
                <option>Víctima</option>
                <option>Alquilada</option>
                <option>Agresor-víctima</option>
                <option>Otros</option>
              </select>
            </div>

            <!-- Escala del maltrato -->
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">Escala del maltrato:</label>
              <select
                class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">Seleccione</option>
                <option>1. Ninguno</option>
                <option>2. Leve</option>
                <option>3. Grave</option>
                <option>4. Severo</option>
              </select>
            </div>

            <!-- Gravedad del episodio de violencia -->
            <div class="md:col-span-2 border border-gray-300 rounded-lg p-4 bg-gray-50">
              <h3 class="font-semibold text-gray-800 mb-3">Gravedad del episodio de violencia</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-2">1. Signos de lesión física:</label>
                  <div class="flex space-x-4">
                    <label class="flex items-center space-x-2">
                      <input type="radio" name="signos_lesion" value="si" class="text-blue-600">
                      <span>Si</span>
                    </label>
                    <label class="flex items-center space-x-2">
                      <input type="radio" name="signos_lesion" value="no" class="text-blue-600">
                      <span>No</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-2">2. Hubo intervención médica:</label>
                  <div class="flex space-x-4">
                    <label class="flex items-center space-x-2">
                      <input type="radio" name="intervencion_medica" value="si" class="text-blue-600">
                      <span>Si</span>
                    </label>
                    <label class="flex items-center space-x-2">
                      <input type="radio" name="intervencion_medica" value="no" class="text-blue-600">
                      <span>No</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-2">3. Hospitalización por agresión previa o
                    armas en casa:</label>
                  <div class="flex space-x-4">
                    <label class="flex items-center space-x-2">
                      <input type="radio" name="hospitalizacion" value="si" class="text-blue-600">
                      <span>Si</span>
                    </label>
                    <label class="flex items-center space-x-2">
                      <input type="radio" name="hospitalizacion" value="no" class="text-blue-600">
                      <span>No</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-2">4. Otros, especifique:</label>
                  <input type="text"
                    class="border border-gray-300 rounded-lg p-2 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>
              </div>
            </div>

            <!-- Frente a quien se manifestó la violencia -->
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">Frente a quien se manifestó la
                violencia:</label>
              <div class="space-y-2">
                <label class="flex items-center space-x-2">
                  <input type="checkbox" name="manifestacion_violencia" value="hijos" class="text-blue-600">
                  <span>1. Hijos</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" name="manifestacion_violencia" value="madre" class="text-blue-600">
                  <span>2. Madre</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" name="manifestacion_violencia" value="padre" class="text-blue-600">
                  <span>3. Padre</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" name="manifestacion_violencia" value="otro" class="text-blue-600">
                  <span>4. Otro</span>
                  <input type="text" placeholder="Especifique: empleada"
                    class="border border-gray-300 rounded-lg p-2 ml-2 flex-1">
                </label>
              </div>
            </div>

            <!-- Testigos -->
            <div class="md:col-span-2">
              <label class="block text-gray-700 text-sm font-medium mb-2">Testigos (que puedan dar fe de los
                hechos):</label>
              <textarea placeholder="Describa los testigos de los hechos..."
                class="border border-gray-300 rounded-lg p-3 w-full h-20 resize-vertical focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
            </div>

            <!-- Solicitudes -->
            <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">¿Solicita albergue?</label>
                <div class="flex space-x-4">
                  <label class="flex items-center space-x-2">
                    <input type="radio" name="solicita_albergue" value="si" class="text-blue-600">
                    <span>Si</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="radio" name="solicita_albergue" value="no" class="text-blue-600">
                    <span>No</span>
                  </label>
                </div>
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">¿Solicita medidas de protección?</label>
                <div class="flex space-x-4">
                  <label class="flex items-center space-x-2">
                    <input type="radio" name="solicita_medidas" value="si" class="text-blue-600">
                    <span>Si</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="radio" name="solicita_medidas" value="no" class="text-blue-600">
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Medidas de protección anteriores -->
            <div class="md:col-span-2 border border-gray-300 rounded-lg p-4 bg-gray-50">
              <h3 class="font-semibold text-gray-800 mb-3">Medidas de protección anteriores</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-2">¿Ha solicitado personalmente medidas de
                    protección con anterioridad?</label>
                  <div class="flex space-x-4 mb-2">
                    <label class="flex items-center space-x-2">
                      <input type="radio" name="medidas_anteriores" value="si" class="text-blue-600">
                      <span>Si</span>
                    </label>
                    <label class="flex items-center space-x-2">
                      <input type="radio" name="medidas_anteriores" value="no" class="text-blue-600">
                      <span>No</span>
                    </label>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Cuántas veces: una vez en este juzgado aproximadamente tres años"
                      class="border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <input type="text" placeholder="En qué juzgado?"
                      class="border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  </div>
                </div>
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-2">Si las medidas fueron solicitadas por otra
                    persona, institución u organismo social, señale cual(es):</label>
                  <input type="text"
                    class="border border-gray-300 rounded-lg p-2 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-2">¿Ha recibido alguna orientación sobre la
                    violencia intrafamiliar?</label>
                  <div class="flex space-x-4">
                    <label class="flex items-center space-x-2">
                      <input type="radio" name="orientacion_vif" value="si" class="text-blue-600">
                      <span>Si</span>
                    </label>
                    <label class="flex items-center space-x-2">
                      <input type="radio" name="orientacion_vif" value="no" class="text-blue-600">
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Paso 5: Cuestionario -->
        <div class="step hidden">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Cuestionario</h2>
          <p class="text-gray-600 mb-6">Responda las siguientes preguntas sobre la situación de violencia.</p>
          <div id="preguntasForm" class="space-y-6"></div>
        </div>

        <!-- Paso 6: Información Adicional -->
        <div class="step hidden">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Información Adicional</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-gray-700 mb-2">Descripción detallada de los hechos:</label>
              <textarea
                placeholder="Describa con detalle los hechos de violencia, incluyendo fechas, lugares, circunstancias y cualquier información relevante..."
                class="w-full border border-gray-300 rounded-lg p-3 h-40 resize-vertical focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required></textarea>
            </div>
            <div>
              <label class="block text-gray-700 mb-2">Observaciones adicionales:</label>
              <textarea placeholder="Cualquier otra información que considere importante..."
                class="w-full border border-gray-300 rounded-lg p-3 h-24 resize-vertical focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
            </div>
          </div>
        </div>

        <!-- Paso 7: Confirmación -->
        <!-- En el paso de confirmación, actualizar el resumen y comprobante -->
        <div class="step hidden">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">Confirmación y Comprobante</h2>
          <p class="text-gray-600 mb-6">Revise todos los datos antes de enviar el formulario. Puede imprimir un
            comprobante de la denuncia.</p>

          <div class="bg-gray-50 p-6 rounded-lg text-left max-w-2xl mx-auto mb-6">
            <h3 class="font-semibold text-lg mb-4">Resumen del formulario:</h3>
            <div class="space-y-2 text-gray-700">
              <p><span class="font-medium">Denunciante:</span> <span id="resumenDenunciante">-</span></p>
              <p><span class="font-medium">Víctima:</span> <span id="resumenVictima">-</span></p>
              <p><span class="font-medium">Agresor:</span> <span id="resumenAgresor">-</span></p>
              <p><span class="font-medium">Preguntas respondidas:</span> <span id="resumenPreguntas">-</span></p>
              <p><span class="font-medium">Fecha de denuncia:</span> <span id="resumenFecha">-</span></p>
              <p><span class="font-medium">Número de caso:</span> <span id="resumenCaso">-</span></p>
            </div>
          </div>

          <!-- Comprobante para imprimir -->
          <div id="comprobante" class="print-section bg-white p-6 border border-gray-300 rounded-lg max-w-2xl mx-auto">
            <div class="text-center mb-6">
              <h2 class="text-xl font-bold text-gray-800">COMPROBANTE DE DENUNCIA</h2>
              <p class="text-gray-600">Sistema de Gestión Notarial - SIGEN</p>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p class="font-semibold">Número de Caso:</p>
                <p id="printCaso" class="border-b border-gray-300 pb-1">-</p>
              </div>
              <div>
                <p class="font-semibold">Fecha de Denuncia:</p>
                <p id="printFecha" class="border-b border-gray-300 pb-1">-</p>
              </div>
            </div>

            <div class="mb-4">
              <p class="font-semibold">Denunciante:</p>
              <p id="printDenunciante" class="border-b border-gray-300 pb-1">-</p>
            </div>

            <div class="mb-4">
              <p class="font-semibold">Víctima:</p>
              <p id="printVictima" class="border-b border-gray-300 pb-1">-</p>
            </div>

            <div class="mb-4">
              <p class="font-semibold">Agresor:</p>
              <p id="printAgresor" class="border-b border-gray-300 pb-1">-</p>
            </div>

            <div class="mb-4">
              <p class="font-semibold">Resumen del Cuestionario:</p>
              <p id="printPreguntas" class="border-b border-gray-300 pb-1">-</p>
            </div>

            <div class="mt-8 pt-4 border-t border-gray-300">
              <p class="text-sm text-gray-600 mb-2">Este documento sirve como constancia de que se ha realizado la
                denuncia correspondiente en el sistema SIGEN.</p>
              <p class="text-sm text-gray-600">Para seguimiento del caso, presente este comprobante en las instancias
                correspondientes.</p>
            </div>

            <div class="mt-6 text-center text-xs text-gray-500">
              <p>Documento generado automáticamente - SIGEN © 2025</p>
            </div>
          </div>

          <!-- Botones de acción -->
          <div class="flex flex-col sm:flex-row justify-center gap-4 mt-8 no-print">
            <button type="button" id="imprimirBtn"
              class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z">
                </path>
              </svg>
              Imprimir Comprobante
            </button>
          </div>

          <div class="text-center mt-4 no-print">
            <p class="text-sm text-gray-600">Recomendación: Imprima este comprobante y guárdelo para sus registros.</p>
          </div>
        </div>

        <!-- Navegación -->
        <div class="flex justify-between mt-6 no-print">
          <button type="button" id="prevBtn"
            class="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 hidden">Anterior</button>
          <button type="button" id="nextBtn"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Siguiente</button>
        </div>
      </form>
    </main>
  </div>

  <script src="JS/form.js"></script>

</body>

</html>