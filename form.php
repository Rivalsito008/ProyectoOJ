<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SIGEN - Sistema de Gestión Notarial</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="Style/form.css">
  <!-- CKEditor para editor de texto enriquecido -->
  <script src="https://cdn.ckeditor.com/ckeditor5/41.1.0/ckeditor.js"></script>
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
        <div id="progressBar" class="h-2 rounded-full transition-all duration-300" style="width: 12.5%;"></div>
      </div>

      <!-- Pasos del Formulario -->
      <form id="multiStepForm" class="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200 no-print">
        <!-- Paso 1: Datos del Denunciante -->
        <div class="step">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">Datos del Denunciante</h2>
          
          <!-- Sección: Datos Generales -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Datos Generales</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Nombre completo -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Nombre completo</label>
                <input type="text" placeholder="Ingrese nombre completo" id="denuncianteNombre" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required>
              </div>

              <!-- Conocido/a por -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Conocido/a por</label>
                <input type="text" placeholder="Apodo o nombre por el que es conocido" id="denuncianteConocidoPor" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>

              <!-- Fecha de Nacimiento y Edad -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Fecha de Nacimiento</label>
                <input type="date" id="denuncianteFechaNacimiento" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required>
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Edad</label>
                <div class="flex gap-2">
                  <input type="number" id="denuncianteEdad" placeholder="Se calculará automáticamente" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500" readonly>
                  <button type="button" id="denuncianteCalcularEdad" class="px-4 bg-gray-200 rounded-lg hover:bg-gray-300">Calcular</button>
                </div>
              </div>

              <!-- Lugar de nacimiento -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Lugar de nacimiento</label>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select id="denuncianteDeptoNac" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Departamento</option>
                    <option>Ahuachapán</option>
                    <option>Cabañas</option>
                    <option>Chalatenango</option>
                    <option>Cuscatlán</option>
                    <option>La Libertad</option>
                    <option>La Paz</option>
                    <option>La Unión</option>
                    <option>Morazán</option>
                    <option>San Miguel</option>
                    <option>San Salvador</option>
                    <option>San Vicente</option>
                    <option>Santa Ana</option>
                    <option>Sonsonate</option>
                    <option>Usulután</option>
                  </select>
                  <select id="denuncianteMuniNac" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Municipio</option>
                  </select>
                  <select id="denuncianteDistNac" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Distrito</option>
                  </select>
                </div>
              </div>

              <!-- Nacionalidad -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Nacionalidad</label>
                <select id="denuncianteNacionalidad" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="SV">Salvadoreña</option>
                  <option value="GT">Guatemalteca</option>
                  <option value="HN">Hondureña</option>
                  <option value="NI">Nicaragüense</option>
                  <option value="CR">Costarricense</option>
                  <option value="PA">Panameña</option>
                  <option value="MX">Mexicana</option>
                  <option value="US">Estadounidense</option>
                  <option value="other">Otra</option>
                </select>
                <input type="text" placeholder="Especifique otra nacionalidad" id="denuncianteOtraNacionalidad" class="border border-gray-300 rounded-lg p-3 w-full mt-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" style="display: none;">
              </div>

              <!-- Nivel educativo -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Nivel educativo</label>
                <select id="denuncianteNivelEducativo" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option>1 a 3 grado</option>
                  <option>4 a 6 grado</option>
                  <option>7 a 9 grado</option>
                  <option>Bachillerato</option>
                  <option>Técnico</option>
                  <option>Universitario</option>
                  <option>Ninguno</option>
                </select>
              </div>

              <!-- Estado Familiar -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Estado Familiar</label>
                <select id="denuncianteEstadoFamiliar" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option value="soltero">Soltero/a</option>
                  <option value="casado">Casado/a</option>
                  <option value="separado">Separado/a</option>
                  <option value="union_libre">Unión Libre</option>
                </select>
              </div>
              
              <!-- Nombre del Esposo/Compañero -->
              <div id="denuncianteNombreConyugeContainer" style="display: none;">
                <label class="block text-gray-700 text-sm font-medium mb-2">Nombre del Esposo/Compañero de vida</label>
                <input type="text" placeholder="Nombre completo" id="denuncianteNombreConyuge" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>

              <!-- Sexo -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Sexo</label>
                <select id="denuncianteSexo" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option>Masculino</option>
                  <option>Femenino</option>
                </select>
              </div>

              <!-- Madre -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Madre</label>
                <input type="text" placeholder="Nombre completo de la madre" id="denuncianteMadre" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>

              <!-- Padre -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Padre</label>
                <input type="text" placeholder="Nombre completo del padre" id="denunciantePadre" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>
            </div>
          </div>

          <!-- Sección: Datos de identificación y ubicación -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Datos de identificación y ubicación</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Tipo de documento -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Tipo de documento identificado</label>
                <select id="denuncianteTipoDocumento" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option>DUI</option>
                  <option>Pasaporte</option>
                  <option>Partida de nacimiento</option>
                  <option>Otro</option>
                </select>
              </div>

              <!-- Número de documento -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Número de documento</label>
                <input type="text" placeholder="Número de identificación" id="denuncianteNumDocumento" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>

              <!-- Dirección -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Dirección</label>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select id="denuncianteDeptoRes" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Departamento</option>
                    <option>Ahuachapán</option>
                    <option>Cabañas</option>
                    <option>Chalatenango</option>
                    <option>Cuscatlán</option>
                    <option>La Libertad</option>
                    <option>La Paz</option>
                    <option>La Unión</option>
                    <option>Morazán</option>
                    <option>San Miguel</option>
                    <option>San Salvador</option>
                    <option>San Vicente</option>
                    <option>Santa Ana</option>
                    <option>Sonsonate</option>
                    <option>Usulután</option>
                  </select>
                  <select id="denuncianteMuniRes" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Municipio</option>
                  </select>
                  <select id="denuncianteDistRes" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Distrito</option>
                  </select>
                </div>
              </div>

              <!-- Complemento Dirección -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Complemento Dirección</label>
                <input type="text" placeholder="Ej: Caserío El Cauca, Polígono 2 Casa 15" id="denuncianteComplementoDir" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>

              <!-- Punto de referencia -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Punto de referencia</label>
                <input type="text" placeholder="Ej: Frente al parque central, a 2 cuadras de la iglesia" id="denunciantePuntoReferencia" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>
            </div>
          </div>

          <!-- Sección: Datos laborales, ocupaciones y profesionales -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Datos laborales, ocupaciones y profesionales</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Profesión -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Profesión</label>
                <select id="denuncianteProfesion" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione profesión</option>
                  <option>Abogado</option>
                  <option>Médico</option>
                  <option>Ingeniero</option>
                  <option>Docente</option>
                  <option>Contador</option>
                  <option>Enfermero</option>
                  <option>Arquitecto</option>
                  <option>Ninguna</option>
                </select>
              </div>

              <!-- Ocupación -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Ocupación</label>
                <select id="denuncianteOcupacion" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione ocupación</option>
                  <option>Empleado</option>
                  <option>Oficios domésticos</option>
                  <option>Desempleado</option>
                  <option>Estudiante</option>
                  <option>Jubilado</option>
                  <option>Independiente</option>
                </select>
              </div>

              <!-- Lugar de trabajo con checkboxes -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Lugar de trabajo</label>
                <input type="text" placeholder="Nombre del lugar de trabajo" id="denuncianteLugarTrabajo" class="border border-gray-300 rounded-lg p-3 w-full mb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                
                <div class="flex gap-4 mb-4">
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" id="denuncianteNoTrabajo" class="text-blue-600">
                    <span>No trabajo</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" id="denuncianteTrabajoEnCasa" class="text-blue-600">
                    <span>Trabajo en casa</span>
                  </label>
                </div>
              </div>

              <!-- Dirección de trabajo -->
              <div id="denuncianteDireccionTrabajoContainer">
                <label class="block text-gray-700 text-sm font-medium mb-2">Dirección de trabajo</label>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <select id="denuncianteDeptoTrabajo" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Departamento</option>
                    <option>Ahuachapán</option>
                    <option>Cabañas</option>
                    <option>Chalatenango</option>
                    <option>Cuscatlán</option>
                    <option>La Libertad</option>
                    <option>La Paz</option>
                    <option>La Unión</option>
                    <option>Morazán</option>
                    <option>San Miguel</option>
                    <option>San Salvador</option>
                    <option>San Vicente</option>
                    <option>Santa Ana</option>
                    <option>Sonsonate</option>
                    <option>Usulután</option>
                  </select>
                  <select id="denuncianteMunicipioTrabajo" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Municipio</option>
                  </select>
                  <select id="denuncianteDistritoTrabajo" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Distrito</option>
                  </select>
                </div>

                <!-- Complemento dirección trabajo -->
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-medium mb-2">Complemento dirección</label>
                  <input type="text" placeholder="Ej: Caserío La Cuaca, Polígono 2, Casa 15" id="denuncianteComplementoTrabajo" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>

                <!-- Punto de referencia trabajo -->
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-2">Punto de referencia</label>
                  <input type="text" placeholder="Puntos de referencia del lugar de trabajo" id="denuncianteReferenciaTrabajo" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>
              </div>
            </div>
          </div>

          <!-- Sección: Datos de contacto -->
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Datos de contacto</h3>
            <div class="grid grid-cols-1 gap-4">
              <!-- Teléfonos de contacto -->
              <div id="denuncianteTelefonosContainer">
                <label class="block text-gray-700 text-sm font-medium mb-2">Teléfonos de contacto</label>
                <div class="space-y-2 mb-2" id="denuncianteTelefonosLista">
                  <!-- Primer teléfono -->
                  <div class="flex gap-2 items-center">
                    <input type="tel" placeholder="Número de teléfono" class="border border-gray-300 rounded-lg p-3 flex-grow focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                      <option value="personal">Personal</option>
                      <option value="trabajo">Trabajo</option>
                      <option value="casa">Casa</option>
                      <option value="otro">Otro</option>
                    </select>
                    <button type="button" class="text-red-500 hover:text-red-700 eliminar-telefono">✕</button>
                  </div>
                </div>
                <button type="button" id="denuncianteAgregarTelefono" class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                  <span>+</span> Agregar otro teléfono
                </button>
              </div>

              <!-- ¿Es la víctima del hecho? -->
              <div class="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <label class="block text-gray-700 text-sm font-medium mb-2">¿Es la víctima del hecho?</label>
                <div class="flex space-x-4 mb-3">
                  <label class="flex items-center space-x-2">
                    <input type="radio" name="denuncianteEsVictima" value="si" class="text-blue-600">
                    <span>Sí</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="radio" name="denuncianteEsVictima" value="no" class="text-blue-600">
                    <span>No</span>
                  </label>
                </div>
                <p class="text-sm text-gray-600">
                  <strong>Nota:</strong> Si selecciona "Sí", estos datos se cargarán automáticamente en la sección "Datos de la Víctima"
                </p>
              </div>

              <!-- ¿Cantidad de víctimas en el caso? -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">¿Cantidad de víctimas en el caso?</label>
                <select id="denuncianteCantidadVictimas" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="1">1 víctima</option>
                  <option value="2">2 víctimas</option>
                  <option value="3">3 víctimas</option>
                  <option value="4">4 víctimas</option>
                  <option value="5">5 víctimas</option>
                  <option value="mas">Más de 5 víctimas</option>
                </select>
              </div>

              <!-- Contenedor para múltiples víctimas -->
              <div id="denuncianteMultipleVictimasContainer" class="hidden">
                <p class="text-sm text-gray-600 mb-3">
                  Complete los datos para cada víctima adicional:
                </p>
                <div id="denuncianteListaVictimas">
                  <!-- Los formularios para víctimas adicionales se agregarán aquí -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Paso 2: Datos de la Víctima -->
        <div class="step hidden">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">Datos de la Víctima</h2>
          
          <!-- Sección: Datos Generales -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Datos Generales</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Nombre completo -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Nombre completo</label>
                <input type="text" placeholder="Ingrese nombre completo" id="victimaNombre" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required>
              </div>

              <!-- Conocido/a por -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Conocido/a por</label>
                <input type="text" placeholder="Apodo o nombre por el que es conocido" id="victimaConocidoPor" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>

              <!-- Fecha de Nacimiento y Edad -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Fecha de Nacimiento</label>
                <input type="date" id="victimaFechaNacimiento" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required>
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Edad</label>
                <div class="flex gap-2">
                  <input type="number" id="victimaEdad" placeholder="Se calculará automáticamente" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500" readonly>
                  <button type="button" id="victimaCalcularEdad" class="px-4 bg-gray-200 rounded-lg hover:bg-gray-300">Calcular</button>
                </div>
              </div>

              <!-- Lugar de nacimiento -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Lugar de nacimiento</label>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select id="victimaDeptoNac" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Departamento</option>
                    <option>Ahuachapán</option>
                    <option>Cabañas</option>
                    <option>Chalatenango</option>
                    <option>Cuscatlán</option>
                    <option>La Libertad</option>
                    <option>La Paz</option>
                    <option>La Unión</option>
                    <option>Morazán</option>
                    <option>San Miguel</option>
                    <option>San Salvador</option>
                    <option>San Vicente</option>
                    <option>Santa Ana</option>
                    <option>Sonsonate</option>
                    <option>Usulután</option>
                  </select>
                  <select id="victimaMuniNac" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Municipio</option>
                  </select>
                  <select id="victimaDistNac" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Distrito</option>
                  </select>
                </div>
              </div>

              <!-- Nacionalidad -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Nacionalidad</label>
                <select id="victimaNacionalidad" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="SV">Salvadoreña</option>
                  <option value="GT">Guatemalteca</option>
                  <option value="HN">Hondureña</option>
                  <option value="NI">Nicaragüense</option>
                  <option value="CR">Costarricense</option>
                  <option value="PA">Panameña</option>
                  <option value="MX">Mexicana</option>
                  <option value="US">Estadounidense</option>
                  <option value="other">Otra</option>
                </select>
                <input type="text" placeholder="Especifique otra nacionalidad" id="victimaOtraNacionalidad" class="border border-gray-300 rounded-lg p-3 w-full mt-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" style="display: none;">
              </div>

              <!-- Nivel educativo -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Nivel educativo</label>
                <select id="victimaNivelEducativo" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option>1 a 3 grado</option>
                  <option>4 a 6 grado</option>
                  <option>7 a 9 grado</option>
                  <option>Bachillerato</option>
                  <option>Técnico</option>
                  <option>Universitario</option>
                  <option>Ninguno</option>
                </select>
              </div>

              <!-- Estado Familiar -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Estado Familiar</label>
                <select id="victimaEstadoFamiliar" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option value="soltero">Soltero/a</option>
                  <option value="casado">Casado/a</option>
                  <option value="separado">Separado/a</option>
                  <option value="union_libre">Unión Libre</option>
                </select>
              </div>
              
              <!-- Nombre del Esposo/Compañero -->
              <div id="victimaNombreConyugeContainer" style="display: none;">
                <label class="block text-gray-700 text-sm font-medium mb-2">Nombre del Esposo/Compañero de vida</label>
                <input type="text" placeholder="Nombre completo" id="victimaNombreConyuge" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>

              <!-- Sexo -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Sexo</label>
                <select id="victimaSexo" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option>Masculino</option>
                  <option>Femenino</option>
                </select>
              </div>

              <!-- Madre -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Madre</label>
                <input type="text" placeholder="Nombre completo de la madre" id="victimaMadre" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>

              <!-- Padre -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Padre</label>
                <input type="text" placeholder="Nombre completo del padre" id="victimaPadre" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>
            </div>
          </div>

          <!-- Sección: Datos de identificación y ubicación -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Datos de identificación y ubicación</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Tipo de documento -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Tipo de documento identificado</label>
                <select id="victimaTipoDocumento" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option>DUI</option>
                  <option>Pasaporte</option>
                  <option>Partida de nacimiento</option>
                  <option>Otro</option>
                </select>
              </div>

              <!-- Número de documento -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Número de documento</label>
                <input type="text" placeholder="Número de identificación" id="victimaNumDocumento" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>

              <!-- Dirección -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Dirección</label>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select id="victimaDeptoRes" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Departamento</option>
                    <option>Ahuachapán</option>
                    <option>Cabañas</option>
                    <option>Chalatenango</option>
                    <option>Cuscatlán</option>
                    <option>La Libertad</option>
                    <option>La Paz</option>
                    <option>La Unión</option>
                    <option>Morazán</option>
                    <option>San Miguel</option>
                    <option>San Salvador</option>
                    <option>San Vicente</option>
                    <option>Santa Ana</option>
                    <option>Sonsonate</option>
                    <option>Usulután</option>
                  </select>
                  <select id="victimaMuniRes" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Municipio</option>
                  </select>
                  <select id="victimaDistRes" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Distrito</option>
                  </select>
                </div>
              </div>

              <!-- Complemento Dirección -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Complemento Dirección</label>
                <input type="text" placeholder="Ej: Caserío El Cauca, Polígono 2 Casa 15" id="victimaComplementoDir" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>

              <!-- Punto de referencia -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Punto de referencia</label>
                <input type="text" placeholder="Ej: Frente al parque central, a 2 cuadras de la iglesia" id="victimaPuntoReferencia" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>
            </div>
          </div>

          <!-- Sección: Datos laborales, ocupaciones y profesionales -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Datos laborales, ocupaciones y profesionales</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Profesión -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Profesión</label>
                <select id="victimaProfesion" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione profesión</option>
                  <option>Abogado</option>
                  <option>Médico</option>
                  <option>Ingeniero</option>
                  <option>Docente</option>
                  <option>Contador</option>
                  <option>Enfermero</option>
                  <option>Arquitecto</option>
                  <option>Ninguna</option>
                </select>
              </div>

              <!-- Ocupación -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Ocupación</label>
                <select id="victimaOcupacion" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione ocupación</option>
                  <option>Empleado</option>
                  <option>Oficios domésticos</option>
                  <option>Desempleado</option>
                  <option>Estudiante</option>
                  <option>Jubilado</option>
                  <option>Independiente</option>
                </select>
              </div>

              <!-- Lugar de trabajo con checkboxes -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Lugar de trabajo</label>
                <input type="text" placeholder="Nombre del lugar de trabajo" id="victimaLugarTrabajo" class="border border-gray-300 rounded-lg p-3 w-full mb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                
                <div class="flex gap-4 mb-4">
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" id="victimaNoTrabajo" class="text-blue-600">
                    <span>No trabajo</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" id="victimaTrabajoEnCasa" class="text-blue-600">
                    <span>Trabajo en casa</span>
                  </label>
                </div>
              </div>

              <!-- Dirección de trabajo -->
              <div id="victimaDireccionTrabajoContainer">
                <label class="block text-gray-700 text-sm font-medium mb-2">Dirección de trabajo</label>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <select id="victimaDeptoTrabajo" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Departamento</option>
                    <option>Ahuachapán</option>
                    <option>Cabañas</option>
                    <option>Chalatenango</option>
                    <option>Cuscatlán</option>
                    <option>La Libertad</option>
                    <option>La Paz</option>
                    <option>La Unión</option>
                    <option>Morazán</option>
                    <option>San Miguel</option>
                    <option>San Salvador</option>
                    <option>San Vicente</option>
                    <option>Santa Ana</option>
                    <option>Sonsonate</option>
                    <option>Usulután</option>
                  </select>
                  <select id="victimaMunicipioTrabajo" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Municipio</option>
                  </select>
                  <select id="victimaDistritoTrabajo" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Distrito</option>
                  </select>
                </div>

                <!-- Complemento dirección trabajo -->
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-medium mb-2">Complemento dirección</label>
                  <input type="text" placeholder="Ej: Caserío La Cuaca, Polígono 2, Casa 15" id="victimaComplementoTrabajo" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>

                <!-- Punto de referencia trabajo -->
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-2">Punto de referencia</label>
                  <input type="text" placeholder="Puntos de referencia del lugar de trabajo" id="victimaReferenciaTrabajo" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>
              </div>
            </div>
          </div>

          <!-- Sección: Datos familiares -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Datos familiares</h3>
            <div class="grid grid-cols-1 gap-4">
              <!-- Cantidad de hijos -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Cantidad de hijos</label>
                <select id="victimaCantidadHijos" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="0">0 hijos</option>
                  <option value="1">1 hijo</option>
                  <option value="2">2 hijos</option>
                  <option value="3">3 hijos</option>
                  <option value="4">4 hijos</option>
                  <option value="5">5 hijos</option>
                  <option value="6">6 o más hijos</option>
                </select>
              </div>

              <!-- Contenedor para datos de hijos -->
              <div id="victimaDatosHijosContainer" class="hidden">
                <div class="border border-gray-300 rounded-lg p-4 bg-gray-50">
                  <h4 class="font-medium mb-3">Datos de los hijos</h4>
                  <div id="victimaListaHijos">
                    <!-- Se agregarán dinámicamente los formularios para hijos -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sección: Datos económicos -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Datos económicos</h3>
            <div class="grid grid-cols-1 gap-4">
              <!-- ¿De quién depende económicamente? -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">¿De quién depende económicamente?</label>
                <select id="victimaDependenciaEconomica" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option value="esposo">Esposo</option>
                  <option value="compañero">Compañero de vida</option>
                  <option value="si_misma">De sí misma</option>
                  <option value="padre">Padre</option>
                  <option value="madre">Madre</option>
                  <option value="ambos_padres">Ambos padres</option>
                  <option value="abuelos">Abuelos</option>
                  <option value="other">Otro</option>
                </select>
                <input type="text" placeholder="Especifique" id="victimaOtroDependencia" class="border border-gray-300 rounded-lg p-3 w-full mt-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" style="display: none;">
              </div>

              <!-- Genera algún tipo de ingreso personalmente -->
              <div class="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <label class="block text-gray-700 text-sm font-medium mb-2">¿Genera algún tipo de ingreso personalmente?</label>
                <div class="flex space-x-4 mb-3">
                  <label class="flex items-center space-x-2">
                    <input type="radio" name="victimaGeneraIngreso" value="si" class="text-blue-600">
                    <span>Sí</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="radio" name="victimaGeneraIngreso" value="no" class="text-blue-600">
                    <span>No</span>
                  </label>
                </div>

                <!-- Contenedor para SI genera ingresos -->
                <div id="victimaSiIngresoContainer" class="hidden">
                  <div class="mb-3">
                    <label class="block text-gray-700 text-sm font-medium mb-2">Tipo de ingresos</label>
                    <select id="victimaTipoIngresos" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                      <option value="">Seleccione</option>
                      <option>Negocio propio</option>
                      <option>Emprendimiento</option>
                      <option>Ventas</option>
                      <option>Remesas</option>
                      <option value="other">Otros</option>
                    </select>
                    <input type="text" placeholder="Especifique" id="victimaOtroTipoIngreso" class="border border-gray-300 rounded-lg p-3 w-full mt-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" style="display: none;">
                  </div>
                  <div>
                    <label class="block text-gray-700 text-sm font-medium mb-2">Cantidad aproximada de ingresos mensuales</label>
                    <select id="victimaRangoIngresos" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                      <option value="">Seleccione rango</option>
                      <option>$100 a $300</option>
                      <option>$301 a $600</option>
                      <option>$601 a $900</option>
                      <option>$901 a $1,200</option>
                      <option>$1,201 a $1,500</option>
                      <option>Más de $1,500</option>
                    </select>
                  </div>
                </div>

                <!-- Contenedor para NO genera ingresos -->
                <div id="victimaNoIngresoContainer" class="hidden">
                  <div class="mb-3">
                    <label class="block text-gray-700 text-sm font-medium mb-2">¿De quién depende económicamente?</label>
                    <input type="text" placeholder="Nombre de la persona" id="victimaDependeDe" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  </div>
                  <div class="mb-3">
                    <label class="block text-gray-700 text-sm font-medium mb-2">¿Qué tipo de relación tiene con esa persona?</label>
                    <select id="victimaRelacionDependencia" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                      <option value="">Seleccione</option>
                      <option>Esposo</option>
                      <option>Compañero de vida</option>
                      <option>Novio</option>
                      <option>Amigo</option>
                      <option>Familiar</option>
                      <option value="other">Otro</option>
                    </select>
                    <input type="text" placeholder="Especifique" id="victimaOtroRelacion" class="border border-gray-300 rounded-lg p-3 w-full mt-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" style="display: none;">
                  </div>
                  <div>
                    <label class="block text-gray-700 text-sm font-medium mb-2">Frecuencia con que recibe este ingreso</label>
                    <select id="victimaFrecuenciaIngreso" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                      <option value="">Seleccione</option>
                      <option>Semanal</option>
                      <option>Quincenal</option>
                      <option>Mensual</option>
                      <option>Bimestral</option>
                      <option>Trimestral</option>
                      <option>Ocasional</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sección: Datos de contacto -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Datos de contacto</h3>
            <div class="grid grid-cols-1 gap-4">
              <!-- Teléfonos de contacto -->
              <div id="victimaTelefonosContainer">
                <label class="block text-gray-700 text-sm font-medium mb-2">Teléfonos de contacto</label>
                <div class="space-y-2 mb-2" id="victimaTelefonosLista">
                  <!-- Primer teléfono -->
                  <div class="flex gap-2 items-center">
                    <input type="tel" placeholder="Número de teléfono" class="border border-gray-300 rounded-lg p-3 flex-grow focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                      <option value="personal">Personal</option>
                      <option value="trabajo">Trabajo</option>
                      <option value="casa">Casa</option>
                      <option value="otro">Otro</option>
                    </select>
                    <button type="button" class="text-red-500 hover:text-red-700 eliminar-telefono">✕</button>
                  </div>
                </div>
                <button type="button" id="victimaAgregarTelefono" class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                  <span>+</span> Agregar otro teléfono
                </button>
              </div>
            </div>
          </div>

          <!-- Sección: Otros datos especiales -->
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Otros datos especiales</h3>
            <div class="grid grid-cols-1 gap-4">
              <!-- Presencia visible de lesiones -->
              <div class="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <label class="block text-gray-700 text-sm font-medium mb-2">Presencia visible de lesiones en víctima</label>
                <div class="flex space-x-4 mb-3">
                  <label class="flex items-center space-x-2">
                    <input type="radio" name="victimaLesiones" value="si" class="text-blue-600">
                    <span>Sí</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="radio" name="victimaLesiones" value="no" class="text-blue-600">
                    <span>No</span>
                  </label>
                </div>

                <!-- Campos para lesiones SI -->
                <div id="victimaLesionesContainer" class="hidden">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label class="block text-gray-700 text-sm font-medium mb-2">Tipo de lesión</label>
                      <select id="victimaTipoLesion" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                        <option value="">Seleccione</option>
                        <option>Herida</option>
                        <option>Golpe</option>
                        <option>Raspo</option>
                        <option>Hematoma</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-gray-700 text-sm font-medium mb-2">Nivel de lesión</label>
                      <select id="victimaNivelLesion" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                        <option value="">Seleccione</option>
                        <option>Leve</option>
                        <option>Intermedia</option>
                        <option>Grave</option>
                      </select>
                    </div>
                  </div>
                  <!-- Alerta para lesiones graves -->
                  <div id="victimaAlertaLesionGrave" class="hidden p-3 bg-red-100 border border-red-300 rounded-lg text-red-700">
                    <strong>ALERTA:</strong> En caso de lesión grave debe emitirse:<br>
                    a) Un oficio dirigido a medicina legal para la realización de peritaje<br>
                    b) Un oficio a FGR para derivar por delito de lesiones
                  </div>
                </div>
              </div>

              <!-- Hospitalizaciones previas -->
              <div class="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <label class="block text-gray-700 text-sm font-medium mb-2">Hospitalizaciones previas por agresiones recibidas del agresor</label>
                <div class="flex space-x-4 mb-3">
                  <label class="flex items-center space-x-2">
                    <input type="radio" name="victimaHospitalizaciones" value="si" class="text-blue-600">
                    <span>Sí</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="radio" name="victimaHospitalizaciones" value="no" class="text-blue-600">
                    <span>No</span>
                  </label>
                </div>

                <!-- Campos para hospitalizaciones SI -->
                <div id="victimaHospitalizacionesContainer" class="hidden">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-gray-700 text-sm font-medium mb-2">Tiempo en días de hospitalización</label>
                      <input type="text" placeholder="Número de días" id="victimaDiasHospitalizacion" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    </div>
                    <div>
                      <label class="block text-gray-700 text-sm font-medium mb-2">Fecha de hospitalización</label>
                      <input type="date" id="victimaFechaHospitalizacion" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    </div>
                  </div>
                </div>
              </div>

              <!-- Atenciones médicas previas -->
              <div class="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <label class="block text-gray-700 text-sm font-medium mb-2">Atenciones médicas previas por agresiones recibidas del agresor</label>
                <div class="flex space-x-4 mb-3">
                  <label class="flex items-center space-x-2">
                    <input type="radio" name="victimaAtencionesMedicas" value="si" class="text-blue-600">
                    <span>Sí</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="radio" name="victimaAtencionesMedicas" value="no" class="text-blue-600">
                    <span>No</span>
                  </label>
                </div>

                <!-- Campos para atenciones médicas SI -->
                <div id="victimaAtencionesContainer" class="hidden">
                  <div>
                    <label class="block text-gray-700 text-sm font-medium mb-2">Número de atenciones</label>
                    <input type="number" min="1" placeholder="Cantidad de atenciones" id="victimaNumAtenciones" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Paso 3: Relación de Hechos -->
        <div class="step hidden">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">Relación de Hechos</h2>
          
          <!-- Información sobre quién denuncia -->
          <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p class="text-sm text-blue-800">
              <strong>Nota:</strong> El sistema generará automáticamente el encabezado según si quien denuncia es la víctima o un tercero.
            </p>
          </div>

          <!-- Editor de texto enriquecido -->
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-medium mb-2">Narración de los hechos:</label>
            <div id="editor-container" class="border border-gray-300 rounded-lg overflow-hidden">
              <!-- CKEditor se inicializará aquí -->
              <textarea id="relacionHechos" name="relacionHechos" style="display:none;"></textarea>
            </div>
            <p class="text-sm text-gray-500 mt-2">
              Puede formatear el texto utilizando las herramientas de la barra superior.
            </p>
          </div>

          <!-- Previsualización del texto generado -->
          <div class="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <h3 class="font-semibold mb-3">Previsualización del texto generado:</h3>
            <div id="previewRelacion" class="p-4 bg-white border border-gray-200 rounded-lg min-h-[200px]">
              <!-- Aquí se mostrará el texto generado automáticamente -->
              <p class="text-gray-600">El texto se generará automáticamente cuando complete los datos del denunciante.</p>
            </div>
            <button type="button" id="generarTextoBtn" class="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
              Generar texto automático
            </button>
          </div>

          <!-- Instrucciones -->
          <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 class="font-semibold text-yellow-800 mb-2">Instrucciones:</h4>
            <ul class="text-sm text-yellow-700 list-disc pl-5 space-y-1">
              <li>Describa detalladamente los hechos ocurridos</li>
              <li>Incluya fechas, lugares, personas involucradas y circunstancias</li>
              <li>Mencione cualquier evidencia o testigo de los hechos</li>
              <li>Utilice el botón "Generar texto automático" para crear un encabezado basado en los datos del denunciante</li>
            </ul>
          </div>
        </div>

        <!-- Paso 4: Datos sobre Hechos -->
        <div class="step hidden">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">Datos sobre Hechos</h2>
          
          <!-- Entorno en que se da la violencia -->
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-medium mb-2">Entorno en que se da la violencia (puede seleccionar varias opciones)</label>
            <div class="space-y-2">
              <label class="flex items-center space-x-2">
                <input type="checkbox" name="entornoViolencia" value="personal" class="text-blue-600">
                <span>Personal</span>
              </label>
              <label class="flex items-center space-x-2">
                <input type="checkbox" name="entornoViolencia" value="redes" class="text-blue-600">
                <span>Redes Sociales</span>
              </label>
              <label class="flex items-center space-x-2">
                <input type="checkbox" name="entornoViolencia" value="mensajeria" class="text-blue-600">
                <span>Mensajería Texto</span>
              </label>
              <label class="flex items-center space-x-2">
                <input type="checkbox" name="entornoViolencia" value="otra" class="text-blue-600" id="entornoOtraCheck">
                <span>Otra:</span>
                <input type="text" placeholder="Especifique" id="entornoOtraTexto" class="border border-gray-300 rounded-lg p-2 flex-grow focus:border-blue-500 focus:ring-1 focus:ring-blue-500" style="display: none;">
              </label>
            </div>
          </div>

          <!-- Cuando inician los hechos -->
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-medium mb-2">¿Cuándo inician los hechos de violencia?</label>
            <input type="text" placeholder="Ej: Hace 3 meses, desde hace 2 años, etc." id="inicioHechos" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
          </div>

          <!-- Última acción violenta -->
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-medium mb-2">¿Cuándo fue la última acción violenta?</label>
            <div class="flex gap-2">
              <input type="date" id="ultimaAccionFecha" class="border border-gray-300 rounded-lg p-3 flex-grow focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <input type="text" placeholder="O describa (ej: ayer, la semana pasada)" id="ultimaAccionTexto" class="border border-gray-300 rounded-lg p-3 flex-grow focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            </div>
          </div>

          <!-- Hora del hecho -->
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-medium mb-2">Hora del hecho</label>
            <div class="flex gap-2">
              <input type="time" id="horaHecho" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <input type="text" placeholder="O describa (ej: en la tarde, por la noche)" id="horaHechoTexto" class="border border-gray-300 rounded-lg p-3 flex-grow focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            </div>
          </div>

          <!-- Lugar del hecho -->
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-medium mb-2">Lugar del hecho</label>
            <select id="lugarHecho" class="border border-gray-300 rounded-lg p-3 w-full mb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option value="">Seleccione</option>
              <option>Casa</option>
              <option>Trabajo</option>
              <option>Vía pública</option>
              <option>Vehículo</option>
              <option value="other">Otro</option>
            </select>
            <input type="text" placeholder="Especifique otro lugar" id="lugarHechoOtro" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500" style="display: none;">
          </div>

          <!-- Lugar exacto o dirección del hecho -->
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-medium mb-2">Lugar exacto o dirección del hecho</label>
            <input type="text" placeholder="Descripción detallada del lugar" id="lugarExactoHecho" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
          </div>

          <!-- Dirección del lugar del hecho -->
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-medium mb-2">Dirección del lugar del hecho</label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <select id="deptoHecho" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">Departamento</option>
                <option>Ahuachapán</option>
                <option>Cabañas</option>
                <option>Chalatenango</option>
                <option>Cuscatlán</option>
                <option>La Libertad</option>
                <option>La Paz</option>
                <option>La Unión</option>
                <option>Morazán</option>
                <option>San Miguel</option>
                <option>San Salvador</option>
                <option>San Vicente</option>
                <option>Santa Ana</option>
                <option>Sonsonate</option>
                <option>Usulután</option>
              </select>
              <select id="municipioHecho" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">Municipio</option>
              </select>
              <select id="distritoHecho" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">Distrito</option>
              </select>
            </div>

            <!-- Complemento dirección -->
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2">Complemento dirección</label>
              <input type="text" placeholder="Ej: Caserío El Cauca, Polígono 2 Casa 15" id="complementoDirHecho" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            </div>

            <!-- Punto de referencia -->
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">Punto de referencia</label>
              <input type="text" placeholder="Puntos de referencia del lugar" id="puntoReferenciaHecho" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            </div>
          </div>

          <!-- Sección: Condiciones especiales de los hechos violentos -->
          <div class="border border-gray-300 rounded-lg p-6 bg-gray-50">
            <h3 class="font-semibold text-gray-800 mb-4">Condiciones especiales de los hechos violentos</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Agresor alcoholizado -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">¿Agresor alcoholizado?</label>
                <select id="agresorAlcoholizado" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option>Sí</option>
                  <option>No</option>
                  <option>No se sabe</option>
                </select>
              </div>

              <!-- Agresor drogado -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">¿Agresor drogado?</label>
                <select id="agresorDrogado" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option>Sí</option>
                  <option>No</option>
                  <option>No se sabe</option>
                </select>
              </div>

              <!-- Frecuencia de las agresiones -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Frecuencia de las agresiones</label>
                <select id="frecuenciaAgresiones" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option>Diaria</option>
                  <option>Semanal</option>
                  <option>Quincenal</option>
                  <option>Mensual</option>
                  <option>Semestral</option>
                  <option>Anual</option>
                  <option value="other">Otra</option>
                </select>
                <input type="text" placeholder="Especifique otra frecuencia" id="otraFrecuencia" class="border border-gray-300 rounded-lg p-3 w-full mt-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" style="display: none;">
              </div>

              <!-- Denuncia anterior por VIF -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">¿Denuncia anterior por violencia intrafamiliar contra el mismo agresor?</label>
                <select id="denunciaAnteriorVIF" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option>Sí</option>
                  <option>No</option>
                  <option>No se sabe</option>
                </select>
              </div>

              <!-- Detenciones anteriores por VIF -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">¿Detenciones anteriores por violencia intrafamiliar?</label>
                <select id="detencionesAnterioresVIF" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option>Sí</option>
                  <option>No</option>
                  <option>No se sabe</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Paso 5: Datos sobre el Agresor -->
        <div class="step hidden">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">Datos sobre el Agresor</h2>
          
          <!-- Cantidad de agresores -->
          <div class="mb-8 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <label class="block text-gray-700 text-sm font-medium mb-2">¿Cantidad de agresores en el caso?</label>
            <select id="cantidadAgresores" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option value="1">1 agresor</option>
              <option value="2">2 agresores</option>
              <option value="3">3 agresores</option>
              <option value="4">4 agresores</option>
              <option value="5">5 agresores</option>
              <option value="mas">Más de 5 agresores</option>
            </select>
            <p class="text-sm text-gray-600 mt-2">
              <strong>Nota:</strong> En caso de ser más de 1 agresor, se desplegarán formularios adicionales para cada uno.
            </p>
          </div>

          <!-- Contenedor para múltiples agresores -->
          <div id="multipleAgresoresContainer" class="hidden">
            <div class="border border-gray-300 rounded-lg p-4 mb-6 bg-blue-50">
              <h3 class="font-semibold text-blue-800 mb-2">Complete los datos para cada agresor adicional:</h3>
              <div id="agresoresLista">
                <!-- Los formularios para agresores adicionales se agregarán aquí -->
              </div>
            </div>
          </div>

          <!-- Datos Generales -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Datos Generales</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Nombre completo -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Nombre completo</label>
                <input type="text" placeholder="Ingrese nombre completo" id="agresorNombre" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required>
              </div>

              <!-- Conocido/a por -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Conocido/a por</label>
                <input type="text" placeholder="Apodo o nombre por el que es conocido" id="agresorConocidoPor" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>

              <!-- Fecha de Nacimiento y Edad -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Fecha de Nacimiento</label>
                <input type="date" id="agresorFechaNacimiento" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required>
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Edad</label>
                <div class="flex gap-2">
                  <input type="number" id="agresorEdad" placeholder="Se calculará automáticamente" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500" readonly>
                  <button type="button" id="agresorCalcularEdad" class="px-4 bg-gray-200 rounded-lg hover:bg-gray-300">Calcular</button>
                </div>
              </div>

              <!-- Lugar de nacimiento -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Lugar de nacimiento</label>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select id="agresorDeptoNac" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Departamento</option>
                    <option>Ahuachapán</option>
                    <option>Cabañas</option>
                    <option>Chalatenango</option>
                    <option>Cuscatlán</option>
                    <option>La Libertad</option>
                    <option>La Paz</option>
                    <option>La Unión</option>
                    <option>Morazán</option>
                    <option>San Miguel</option>
                    <option>San Salvador</option>
                    <option>San Vicente</option>
                    <option>Santa Ana</option>
                    <option>Sonsonate</option>
                    <option>Usulután</option>
                  </select>
                  <select id="agresorMuniNac" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Municipio</option>
                  </select>
                  <select id="agresorDistNac" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Distrito</option>
                  </select>
                </div>
              </div>

              <!-- Nacionalidad -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Nacionalidad</label>
                <select id="agresorNacionalidad" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="SV">Salvadoreña</option>
                  <option value="GT">Guatemalteca</option>
                  <option value="HN">Hondureña</option>
                  <option value="NI">Nicaragüense</option>
                  <option value="CR">Costarricense</option>
                  <option value="PA">Panameña</option>
                  <option value="MX">Mexicana</option>
                  <option value="US">Estadounidense</option>
                  <option value="other">Otra</option>
                </select>
                <input type="text" placeholder="Especifique otra nacionalidad" id="agresorOtraNacionalidad" class="border border-gray-300 rounded-lg p-3 w-full mt-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" style="display: none;">
              </div>

              <!-- Nivel educativo -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Nivel educativo</label>
                <select id="agresorNivelEducativo" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option>1 a 3 grado</option>
                  <option>4 a 6 grado</option>
                  <option>7 a 9 grado</option>
                  <option>Bachillerato</option>
                  <option>Técnico</option>
                  <option>Universitario</option>
                  <option>Ninguno</option>
                </select>
              </div>

              <!-- Estado Familiar -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Estado Familiar</label>
                <select id="agresorEstadoFamiliar" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option value="soltero">Soltero/a</option>
                  <option value="casado">Casado/a</option>
                  <option value="separado">Separado/a</option>
                  <option value="union_libre">Unión Libre</option>
                </select>
              </div>
              
              <!-- Nombre del Esposo/Compañero -->
              <div id="agresorNombreConyugeContainer" style="display: none;">
                <label class="block text-gray-700 text-sm font-medium mb-2">Nombre del Esposo/Compañero de vida</label>
                <input type="text" placeholder="Nombre completo" id="agresorNombreConyuge" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>

              <!-- Sexo -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Sexo</label>
                <select id="agresorSexo" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option>Masculino</option>
                  <option>Femenino</option>
                </select>
              </div>

              <!-- Madre -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Madre</label>
                <input type="text" placeholder="Nombre completo de la madre" id="agresorMadre" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>

              <!-- Padre -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Padre</label>
                <input type="text" placeholder="Nombre completo del padre" id="agresorPadre" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>
            </div>
          </div>

          <!-- Datos de identificación y ubicación -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Datos de identificación y ubicación</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Tipo de documento -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Tipo de documento identificado</label>
                <select id="agresorTipoDocumento" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option>DUI</option>
                  <option>Pasaporte</option>
                  <option>Partida de nacimiento</option>
                  <option>Otro</option>
                </select>
              </div>

              <!-- Número de documento -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Número de documento</label>
                <input type="text" placeholder="Número de identificación" id="agresorNumDocumento" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>

              <!-- Dirección -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Dirección</label>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select id="agresorDeptoRes" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Departamento</option>
                    <option>Ahuachapán</option>
                    <option>Cabañas</option>
                    <option>Chalatenango</option>
                    <option>Cuscatlán</option>
                    <option>La Libertad</option>
                    <option>La Paz</option>
                    <option>La Unión</option>
                    <option>Morazán</option>
                    <option>San Miguel</option>
                    <option>San Salvador</option>
                    <option>San Vicente</option>
                    <option>Santa Ana</option>
                    <option>Sonsonate</option>
                    <option>Usulután</option>
                  </select>
                  <select id="agresorMuniRes" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Municipio</option>
                  </select>
                  <select id="agresorDistRes" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Distrito</option>
                  </select>
                </div>
              </div>

              <!-- Complemento Dirección -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Complemento Dirección</label>
                <input type="text" placeholder="Ej: Caserío El Cauca, Polígono 2 Casa 15" id="agresorComplementoDir" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>

              <!-- Punto de referencia -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Punto de referencia</label>
                <input type="text" placeholder="Ej: Frente al parque central, a 2 cuadras de la iglesia" id="agresorPuntoReferencia" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              </div>
            </div>
          </div>

          <!-- Datos laborales, ocupaciones y profesionales -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Datos laborales, ocupaciones y profesionales</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Profesión -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Profesión</label>
                <select id="agresorProfesion" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione profesión</option>
                  <option>Abogado</option>
                  <option>Médico</option>
                  <option>Ingeniero</option>
                  <option>Docente</option>
                  <option>Contador</option>
                  <option>Enfermero</option>
                  <option>Arquitecto</option>
                  <option>Policía</option>
                  <option>Militar</option>
                  <option>Guardia de seguridad</option>
                  <option>Ninguna</option>
                </select>
              </div>

              <!-- Ocupación -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Ocupación</label>
                <select id="agresorOcupacion" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione ocupación</option>
                  <option>Empleado</option>
                  <option>Oficios domésticos</option>
                  <option>Desempleado</option>
                  <option>Estudiante</option>
                  <option>Jubilado</option>
                  <option>Independiente</option>
                  <option>Trabajador informal</option>
                </select>
              </div>

              <!-- Lugar de trabajo con checkboxes -->
              <div class="md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-2">Lugar de trabajo</label>
                <input type="text" placeholder="Nombre del lugar de trabajo" id="agresorLugarTrabajo" class="border border-gray-300 rounded-lg p-3 w-full mb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                
                <div class="flex gap-4 mb-4">
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" id="agresorNoTrabajo" class="text-blue-600">
                    <span>No trabajo</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" id="agresorTrabajoEnCasa" class="text-blue-600">
                    <span>Trabajo en casa</span>
                  </label>
                </div>
              </div>

              <!-- Dirección de trabajo -->
              <div id="agresorDireccionTrabajoContainer">
                <label class="block text-gray-700 text-sm font-medium mb-2">Dirección de trabajo</label>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <select id="agresorDeptoTrabajo" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Departamento</option>
                    <option>Ahuachapán</option>
                    <option>Cabañas</option>
                    <option>Chalatenango</option>
                    <option>Cuscatlán</option>
                    <option>La Libertad</option>
                    <option>La Paz</option>
                    <option>La Unión</option>
                    <option>Morazán</option>
                    <option>San Miguel</option>
                    <option>San Salvador</option>
                    <option>San Vicente</option>
                    <option>Santa Ana</option>
                    <option>Sonsonate</option>
                    <option>Usulután</option>
                  </select>
                  <select id="agresorMunicipioTrabajo" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Municipio</option>
                  </select>
                  <select id="agresorDistritoTrabajo" class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Distrito</option>
                  </select>
                </div>

                <!-- Complemento dirección trabajo -->
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-medium mb-2">Complemento dirección</label>
                  <input type="text" placeholder="Ej: Caserío La Cuaca, Polígono 2, Casa 15" id="agresorComplementoTrabajo" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>

                <!-- Punto de referencia trabajo -->
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-2">Punto de referencia</label>
                  <input type="text" placeholder="Puntos de referencia del lugar de trabajo" id="agresorReferenciaTrabajo" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>
              </div>
            </div>
          </div>

          <!-- Datos adicionales -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Datos adicionales</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Consumo de alcohol -->
              <div class="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <label class="block text-gray-700 text-sm font-medium mb-2">Consumo de alcohol</label>
                <select id="agresorConsumoAlcohol" class="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                  <option value="no_sabe">No sabe</option>
                </select>
                <!-- Frecuencia alcohol -->
                <div id="agresorFrecuenciaAlcoholContainer" class="hidden">
                  <label class="block text-gray-700 text-sm font-medium mb-2">Frecuencia</label>
                  <select id="agresorFrecuenciaAlcohol" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Seleccione</option>
                    <option>Diario</option>
                    <option>Semanal</option>
                    <option>Cada fin de semana</option>
                    <option>Cada 15 días</option>
                    <option>Ocasionalmente</option>
                  </select>
                </div>
              </div>

              <!-- Consumo de drogas -->
              <div class="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <label class="block text-gray-700 text-sm font-medium mb-2">Consumo de drogas</label>
                <select id="agresorConsumoDrogas" class="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                  <option value="no_sabe">No sabe</option>
                </select>
                <!-- Frecuencia drogas -->
                <div id="agresorFrecuenciaDrogasContainer" class="hidden">
                  <label class="block text-gray-700 text-sm font-medium mb-2">Frecuencia</label>
                  <select id="agresorFrecuenciaDrogas" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Seleccione</option>
                    <option>Diario</option>
                    <option>Semanal</option>
                    <option>Cada fin de semana</option>
                    <option>Cada 15 días</option>
                    <option>Ocasionalmente</option>
                  </select>
                </div>
              </div>

              <!-- Posee armas -->
              <div class="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <label class="block text-gray-700 text-sm font-medium mb-2">¿Posee armas?</label>
                <select id="agresorPoseeArmas" class="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                  <option value="no_sabe">No sabe</option>
                </select>
                <!-- Tipo de armas -->
                <div id="agresorTipoArmasContainer" class="hidden">
                  <label class="block text-gray-700 text-sm font-medium mb-2">Tipo de armas que posee</label>
                  <select id="agresorTipoArmas" class="border border-gray-300 rounded-lg p-3 w-full mb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Seleccione</option>
                    <option>Pistola</option>
                    <option>Corvo</option>
                    <option>Machete</option>
                    <option>Fusil</option>
                    <option>Escopeta</option>
                    <option value="other">Otro</option>
                  </select>
                  <input type="text" placeholder="Especifique otro tipo de arma" id="agresorOtroTipoArma" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500" style="display: none;">
                </div>
              </div>

              <!-- Posee formación especial -->
              <div class="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <label class="block text-gray-700 text-sm font-medium mb-2">¿Posee formación especial o especializada?</label>
                <select id="agresorFormacionEspecial" class="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                  <option value="no_sabe">No sabe</option>
                </select>
                <!-- Tipo formación -->
                <div id="agresorTipoFormacionContainer" class="hidden">
                  <label class="block text-gray-700 text-sm font-medium mb-2">¿De qué tipo?</label>
                  <select id="agresorTipoFormacion" class="border border-gray-300 rounded-lg p-3 w-full mb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Seleccione</option>
                    <option>Militar</option>
                    <option>Policial</option>
                    <option>Artes marciales</option>
                    <option>Médica</option>
                    <option>De salud</option>
                    <option>Esotérica</option>
                    <option>Armaría</option>
                    <option value="other">Otra</option>
                  </select>
                  <input type="text" placeholder="Especifique otra formación" id="agresorOtroTipoFormacion" class="border border-gray-300 rounded-lg p-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500" style="display: none;">
                </div>
              </div>

              <!-- Posee discapacidad -->
              <div class="md:col-span-2 border border-gray-300 rounded-lg p-4 bg-gray-50">
                <label class="block text-gray-700 text-sm font-medium mb-2">¿Posee alguna discapacidad?</label>
                <select id="agresorPoseeDiscapacidad" class="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Seleccione</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                  <option value="no_sabe">No sabe</option>
                </select>
                <!-- Tipo discapacidad -->
                <div id="agresorTipoDiscapacidadContainer" class="hidden">
                  <label class="block text-gray-700 text-sm font-medium mb-2">Tipo de discapacidad (puede seleccionar varias)</label>
                  <div class="space-y-2 mb-3">
                    <label class="flex items-center space-x-2">
                      <input type="checkbox" name="agresorDiscapacidadTipo" value="mental" class="text-blue-600">
                      <span>Mental</span>
                    </label>
                    <label class="flex items-center space-x-2">
                      <input type="checkbox" name="agresorDiscapacidadTipo" value="fisica" class="text-blue-600">
                      <span>Física</span>
                    </label>
                    <label class="flex items-center space-x-2">
                      <input type="checkbox" name="agresorDiscapacidadTipo" value="other" class="text-blue-600" id="agresorDiscapacidadOtraCheck">
                      <span>Otro:</span>
                      <input type="text" placeholder="Especifique" id="agresorDiscapacidadOtraTexto" class="border border-gray-300 rounded-lg p-2 flex-grow focus:border-blue-500 focus:ring-1 focus:ring-blue-500" style="display: none;">
                    </label>
                  </div>
                  <!-- Descripción adicional -->
                  <div>
                    <label class="block text-gray-700 text-sm font-medium mb-2">Descripción adicional (opcional)</label>
                    <textarea placeholder="Describa la discapacidad si es necesario..." id="agresorDescripcionDiscapacidad" class="border border-gray-300 rounded-lg p-3 w-full h-20 resize-vertical focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Datos de contacto -->
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Datos de contacto</h3>
            <div class="grid grid-cols-1 gap-4">
              <!-- Teléfonos de contacto -->
              <div id="agresorTelefonosContainer">
                <label class="block text-gray-700 text-sm font-medium mb-2">Teléfonos de contacto</label>
                <div class="space-y-2 mb-2" id="agresorTelefonosLista">
                  <!-- Primer teléfono -->
                  <div class="flex gap-2 items-center">
                    <input type="tel" placeholder="Número de teléfono" class="border border-gray-300 rounded-lg p-3 flex-grow focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                      <option value="personal">Personal</option>
                      <option value="trabajo">Trabajo</option>
                      <option value="casa">Casa</option>
                      <option value="otro">Otro</option>
                    </select>
                    <button type="button" class="text-red-500 hover:text-red-700 eliminar-telefono">✕</button>
                  </div>
                </div>
                <button type="button" id="agresorAgregarTelefono" class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                  <span>+</span> Agregar otro teléfono
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- NOTA: EL PASO 6 DE "FORMAS DE VIOLENCIA" HA SIDO ELIMINADO -->

        <!-- Paso 6: Cuestionario -->
        <div class="step hidden">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Cuestionario</h2>
          <p class="text-gray-600 mb-6">Responda las siguientes preguntas sobre la situación de violencia.</p>
          <div id="preguntasForm" class="space-y-6"></div>
        </div>

        <!-- Paso 7: Confirmación -->
        <div class="step hidden">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">Confirmación y Comprobante</h2>
          <p class="text-gray-600 mb-6">Revise todos los datos antes de enviar el formulario. Puede imprimir un comprobante de la denuncia.</p>

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
              <p class="text-sm text-gray-600 mb-2">Este documento sirve como constancia de que se ha realizado la denuncia correspondiente en el sistema SIGEN.</p>
              <p class="text-sm text-gray-600">Para seguimiento del caso, presente este comprobante en las instancias correspondientes.</p>
            </div>

            <div class="mt-6 text-center text-xs text-gray-500">
              <p>Documento generado automáticamente - SIGEN © 2025</p>
            </div>
          </div>

          <!-- Botones de acción -->
          <div class="flex flex-col sm:flex-row justify-center gap-4 mt-8 no-print">
            <button type="button" id="imprimirBtn" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
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
          <button type="button" id="prevBtn" class="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 hidden">Anterior</button>
          <button type="button" id="nextBtn" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Siguiente</button>
        </div>
      </form>
    </main>
  </div>

  <!-- Scripts externos -->
  <script src="JS/form.js"></script>

</body>

</html>