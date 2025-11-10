<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SIGEN - Sistema de Gestión Notarial</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .sidebar {
      transition: width 0.3s ease;
    }
    .sidebar-collapsed {
      width: 80px;
    }
    .sidebar-expanded {
      width: 256px;
    }
    .content {
      margin-left: 80px;
      transition: margin-left 0.3s ease;
    }
    .hide-on-collapse {
      display: none;
    }
    .nav-item {
        transition: all 0.2s ease;
        color: #3d444dff;
    }
    
    .nav-item:hover {
        background-color: rgba(99, 99, 99, 0.1);
    }
    
    .nav-item.active {
        background-color: #3b82f6;
        color: white;
    }
    
    .nav-item svg {
        min-width: 20px;
    }
  </style>
</head>
<body class="bg-gray-50">
  <!-- Sidebar -->
  <aside id="sidebar" class="sidebar sidebar-collapsed fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200">
    <div class="h-full px-3 py-4 overflow-y-auto">
      <div class="flex items-center justify-center mb-6 px-2 h-10">
        <div id="logo-compact" class="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">SG</div>
        <h2 id="logo-full" class="hide-on-collapse text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">SIGEN</h2>
      </div>
      <nav class="space-y-2">
        <a href="inicio.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Inicio</span>
        </a>
        <a href="#" class="nav-item active flex items-center px-3 py-3 rounded-lg justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
            </path>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                </path>
            </svg>
            <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Usuarios</span>
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
  <div id="mainContent" class="content">
        <header class="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div class="px-4 py-4 flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="relative hidden md:block">
                    </div>
                </div>
                
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                        <img src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff" alt="User" class="w-8 h-8 rounded-full">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </header>

    <main class="p-6">
      <!-- Progreso -->
      <div class="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div id="progressBar" class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: 25%;"></div>
      </div>
        <div class="mb-6">
            <h1 class="text-3xl font-bold mb-2">Formulario</h1>
        </div>
      <!-- Pasos del Formulario -->
      <form id="multiStepForm" class="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <!-- Paso 1: Datos de la Víctima (reemplaza el paso anterior) -->
        <div class="step">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Datos de la Víctima</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Nombre" class="border border-gray-300 rounded-lg p-2" required>
            <input type="text" placeholder="Apellido" class="border border-gray-300 rounded-lg p-2" required>
            <select class="border border-gray-300 rounded-lg p-2" required>
              <option value="">Tipo de Documento</option>
              <option>DUI</option>
              <option>Pasaporte</option>
              <option>Licencia de Conducir</option>
              <option>CIP</option>
            </select>
            <input type="text" placeholder="Número de Documento" class="border border-gray-300 rounded-lg p-2" required>
            <select class="border border-gray-300 rounded-lg p-2" required>
              <option value="">Género</option>
              <option>Femenino</option>
              <option>Masculino</option>
              <option>Otro</option>
            </select>
            <input type="text" placeholder="Dirección" class="border border-gray-300 rounded-lg p-2" required>
            <input type="tel" placeholder="Teléfono" class="border border-gray-300 rounded-lg p-2" required>
            <input type="email" placeholder="Correo electrónico" class="border border-gray-300 rounded-lg p-2">
          </div>
        </div>

        <!-- Paso 2: Preguntas del Cuestionario -->
        <div class="step hidden">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Cuestionario</h2>
          <div id="preguntasForm" class="space-y-6"></div>
        </div>

        <!-- Paso 4: Confirmación -->
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

  <script>
    // Sidebar
    const sidebar = document.getElementById("sidebar");
    const logoCompact = document.getElementById("logo-compact");
    const logoFull = document.getElementById("logo-full");
    const navLabels = document.querySelectorAll(".nav-label");
    const navItems = document.querySelectorAll(".nav-item");

    sidebar.addEventListener("mouseenter", () => {
      sidebar.classList.remove("sidebar-collapsed");
      sidebar.classList.add("sidebar-expanded");
      logoCompact.style.display = "none";
      logoFull.style.display = "block";
      navLabels.forEach(label => label.style.display = "inline-block");
      navItems.forEach(item => item.classList.remove("justify-center"));
    });

    sidebar.addEventListener("mouseleave", () => {
      sidebar.classList.remove("sidebar-expanded");
      sidebar.classList.add("sidebar-collapsed");
      logoCompact.style.display = "flex";
      logoFull.style.display = "none";
      navLabels.forEach(label => label.style.display = "none");
      navItems.forEach(item => item.classList.add("justify-center"));
    });

    // Formulario por pasos
    const steps = document.querySelectorAll(".step");
    const progressBar = document.getElementById("progressBar");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    let currentStep = 0;

    // Preguntas de ejemplo
    const totalPreguntas = 32;
    const preguntas = Array.from({ length: totalPreguntas }, (_, i) => ({
      texto: `Pregunta ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit?`,
    }));

    const preguntasPorPagina = 8;
    let paginaActual = 0;

    function mostrarPreguntas() {
      const preguntasForm = document.getElementById("preguntasForm");
      preguntasForm.innerHTML = '';
      
      const inicio = paginaActual * preguntasPorPagina;
      const fin = inicio + preguntasPorPagina;
      const subset = preguntas.slice(inicio, fin);

      subset.forEach((p, index) => {
        const preguntaHTML = `
          <div class="border border-gray-200 rounded-lg p-4">
            <p class="text-gray-800 font-medium mb-2">${p.texto}</p>
            <div class="flex space-x-6">
              <label class="flex items-center space-x-2">
                <input type="radio" name="pregunta${inicio + index}" value="si" class="text-blue-600" required>
                <span>Sí</span>
              </label>
              <label class="flex items-center space-x-2">
                <input type="radio" name="pregunta${inicio + index}" value="no" class="text-blue-600" required>
                <span>No</span>
              </label>
            </div>
          </div>
        `;
        preguntasForm.insertAdjacentHTML('beforeend', preguntaHTML);
      });

      // Actualizar botones de navegación
      prevBtn.classList.toggle('hidden', paginaActual === 0);
      nextBtn.textContent = (fin >= preguntas.length) ? 'Finalizar' : 'Siguiente';
    }

    function updateForm() {
      steps.forEach((step, index) => {
        step.classList.toggle("hidden", index !== currentStep);
      });
      
      progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
      
      // Si estamos en el paso de preguntas, cargarlas
      if (currentStep === 1) {
        mostrarPreguntas();
      }
      
      // Mostrar/ocultar botones según el paso
      prevBtn.classList.toggle("hidden", currentStep === 0);
      
      if (currentStep === steps.length - 1) {
        nextBtn.textContent = "Enviar";
      } else if (currentStep === 1) {
        nextBtn.textContent = (paginaActual + 1) * preguntasPorPagina >= preguntas.length ? "Finalizar" : "Siguiente";
      } else {
        nextBtn.textContent = "Siguiente";
      }
    }

    nextBtn.addEventListener("click", () => {
      // Validar formulario actual antes de avanzar
      const currentStepElement = steps[currentStep];
      const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.checkValidity()) {
          isValid = false;
          input.reportValidity();
        }
      });
      
      if (!isValid) return;
      
      // Si estamos en el paso de preguntas y hay más páginas
      if (currentStep === 1 && (paginaActual + 1) * preguntasPorPagina < preguntas.length) {
        paginaActual++;
        mostrarPreguntas();
        return;
      }
      
      // Avanzar al siguiente paso
      if (currentStep < steps.length - 1) {
        currentStep++;
        updateForm();
      } else {
      }
    });

    prevBtn.addEventListener("click", () => {
      // Si estamos en el paso de preguntas y hay páginas anteriores
      if (currentStep === 1 && paginaActual > 0) {
        paginaActual--;
        mostrarPreguntas();
        return;
      }
      
      // Retroceder al paso anterior
      if (currentStep > 0) {
        currentStep--;
        updateForm();
      }
    });

    // Inicializar formulario
    updateForm();
  </script>
</body>
</html>