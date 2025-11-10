<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SIGEN - Sistema de Gestión Notarial</title>
  <script>
    (function(){
      // Aplicar tema
      const t = localStorage.getItem('theme-preference') || 'auto';
      let f = t;
      if(t === 'auto'){
        f = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', f);
      
      // Aplicar tamaño de fuente
      const fontSize = localStorage.getItem('font-size') || '16';
      document.documentElement.style.setProperty('--font-size', fontSize + 'px');
      
      // Aplicar contraste
      const contrast = localStorage.getItem('contrast') || '1';
      document.documentElement.style.setProperty('--contrast', contrast);
    })();
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <style>
    :root {
      --bg-color: #f9fafb;
      --text-color: #111827;
      --card-bg: #ffffff;
      --border-color: #e5e7eb;
      --sidebar-bg: #ffffff;
      --text-colorsdb: #3d444d;
      --titledashboard: #000000ff;
      --border-color-card: #d8d8d8ff;
      --contrast: 1;
      --item-active: #3b82f6;
      --hover-item: rgba(99, 99, 99, 0.1);
      --font-size: 16px;
      --text-colorcrd: #111827;
      --text-colorhd: #111827;
    }

    [data-theme="dark"] {
      --titledashboard: #000000ff;
      --bg-color: #e4e4e4ff;
      --text-colorcrd: #000000ff;
      --text-colorsdb: #ffffffff;
      --text-colorhd: #ffffffff;
      --card-bg: #ffffffff;
      --sidebar-bg: #2a2240;
      --border-color: #3d3454;
      --hover-item: rgba(108, 85, 150, 0.35);
      --item-active: #6c55ba; /* Morado para modo oscuro */
      --border-color-card: #b4b4b4ff;
    }

    body {
      background-color: var(--bg-color);
      color: var(--text-colorcrd);
      font-size: var(--font-size);
      filter: contrast(var(--contrast));
      transition: all 0.3s ease;
    }

    /* ===== SIDEBAR ===== */
    .sidebar {
      transition: width 0.3s ease;
      background-color: var(--sidebar-bg);
      color: var(--text-colorsdb);
      border-right: 1px solid var(--border-color);
    }

    .sidebar-collapsed { width: 80px; }
    .sidebar-expanded { width: 256px; }
    .content { margin-left: 80px; transition: margin-left 0.3s ease; }

    /* ===== NAV ITEMS ===== */
    .nav-item {
      transition: all 0.25s ease;
      color: var(--text-colorsdb);
      border-radius: 0.5rem;
    }

    .nav-item:hover {
      background-color: var(--hover-item);
      color: var(--text-colorsdb);
    }

    [data-theme="dark"] .nav-item:hover {
      background-color: var(--hover-item);
      color: #ffffff;
      box-shadow: inset 0 0 6px rgba(180, 160, 255, 0.2);
      transform: translateX(2px);
    }

    .nav-item.active {
      background-color: var(--item-active);
      color: #ffffff;
      box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.1);
    }

    .nav-item.active:hover {
      background-color: var(--item-active);
      color: #ffffff;
      transform: none;
    }

    .nav-item svg { min-width: 20px; }

    /* ===== HEADER ===== */
    .header-bg {
      background-color: var(--sidebar-bg);
      border-bottom: 1px solid var(--border-color);
      color: var(--text-colorhd);
    }

    .titledashboard {
      color: var(--titledashboard);
      transition: color 0.3s ease;
    }

    .hide-on-collapse { display: none; }
    .hidden { display: none; }

    /* ===== TABS ===== */
    .tabs-container {
      background: transparent;
      padding-top: 8px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .tabs-wrapper {
      display: flex;
      gap: 8px;
      padding: 0 8px;
    }

    .browser-tab {
      position: relative;
      padding: 12px 20px;
      background: transparent;
      border-radius: 8px 8px 0 0;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 50px;
      width: 50px;
      border: none;
      overflow: hidden;
    }

    .browser-tab:hover,
    .browser-tab.active {
      width: 160px;
      min-width: 160px;
      padding: 12px 20px;
    }

    .browser-tab:hover:not(.active) {
      background: var(--hover-item);
    }

    .browser-tab.active {
      background: var(--card-bg);
      box-shadow: 0 -2px 4px rgba(0,0,0,0.05);
    }

    .tab-indicator {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      flex-shrink: 0;
      transition: transform 0.3s ease;
    }

    .browser-tab:hover .tab-indicator,
    .browser-tab.active .tab-indicator {
      transform: scale(1.1);
    }

    .tab-label {
      font-weight: 500;
      color: var(--text-colorcrd);
      font-size: 14px;
      user-select: none;
      white-space: nowrap;
      opacity: 0;
      transform: translateX(-10px);
      transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    }

    .browser-tab:hover .tab-label,
    .browser-tab.active .tab-label {
      opacity: 1;
      transform: translateX(0);
    }

    .tab-content-wrapper {
      background: var(--card-bg);
      min-height: 500px;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .tab-content { display: none; }
    .tab-content.active { display: block; animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    /* ===== TABLES ===== */
    table {
      background-color: var(--card-bg);
      color: var(--text-colorcrd);
    }

    thead {
      background-color: var(--bg-color);
      color: var(--text-colorcrd);
    }

    tbody tr {
      background-color: var(--card-bg);
      border-bottom: 1px solid var(--border-color);
    }

    /* ===== MODAL ===== */
    .modal-content {
      background-color: var(--card-bg);
      color: var(--text-colorcrd);
    }

    .modal-header {
      background-color: var(--bg-color);
      border-bottom: 1px solid var(--border-color);
    }

    .modal-footer {
      background-color: var(--bg-color);
      border-top: 1px solid var(--border-color);
    }

    input, select {
      background-color: var(--card-bg);
      color: var(--text-colorcrd);
      border-color: var(--border-color);
    }

    input:focus, select:focus {
      outline: none;
      ring: 2px;
      ring-color: #10b981;
    }
  </style>
</head>

<body>
  <!-- Sidebar -->
  <aside id="sidebar" class="sidebar sidebar-collapsed fixed top-0 left-0 z-40 h-screen">
    <div class="h-full px-3 py-4 overflow-y-auto">
      <div class="flex items-center justify-center mb-6 px-2 h-10">
        <div id="logo-compact" class="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">SG</div>
        <h2 id="logo-full" class="hide-on-collapse text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent ml-3">SIGEN</h2>
      </div>
      
      <nav class="space-y-2">
        <a href="inicio.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">Inicio</span>
        </a>
        <a href="form.php" class="nav-item flex items-center px-3 py-3 rounded-lg justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
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
        <a href="usuarios.php" class="nav-item active flex items-center px-3 py-3 rounded-lg justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
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
  <div class="content">
    <header class="header-bg sticky top-0 z-30">
      <div class="px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="relative hidden md:block"></div>
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
      <h1 class="titledashboard text-3xl font-bold mb-6">Usuarios</h1>
      
      <div class="tabs-container">
        <div class="tabs-wrapper">
          <div class="browser-tab active" data-tab="Todo">
            <div class="tab-indicator bg-blue-500"></div>
            <span class="tab-label">Todos</span>
          </div>
          <div class="browser-tab" data-tab="activo">
            <div class="tab-indicator bg-green-500"></div>
            <span class="tab-label">Estado activo</span>
          </div>
          <div class="browser-tab" data-tab="inactivo">
            <div class="tab-indicator bg-red-500"></div>
            <span class="tab-label">Estado Inactivo</span>
          </div>
        </div>

        <div class="tab-content-wrapper">
          <div class="tab-content active" id="Todo">
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase">
                  <tr>
                    <th class="px-6 py-3">ID</th>
                    <th class="px-6 py-3">Nombre</th>
                    <th class="px-6 py-3">Apellido</th>
                    <th class="px-6 py-3">Email</th>
                    <th class="px-6 py-3">Rol</th>
                    <th class="px-6 py-3">Estado</th>
                    <th class="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>

          <div class="tab-content" id="activo">
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase">
                  <tr>
                    <th class="px-6 py-3">ID</th>
                    <th class="px-6 py-3">Nombre</th>
                    <th class="px-6 py-3">Apellido</th>
                    <th class="px-6 py-3">Email</th>
                    <th class="px-6 py-3">Rol</th>
                    <th class="px-6 py-3">Estado</th>
                    <th class="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="px-6 py-4" colspan="7">Usuarios activos...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="tab-content" id="inactivo">
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase">
                  <tr>
                    <th class="px-6 py-3">ID</th>
                    <th class="px-6 py-3">Nombre</th>
                    <th class="px-6 py-3">Apellido</th>
                    <th class="px-6 py-3">Email</th>
                    <th class="px-6 py-3">Rol</th>
                    <th class="px-6 py-3">Estado</th>
                    <th class="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="px-6 py-4" colspan="7">Usuarios inactivos...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón Flotante -->
      <div class="fixed bottom-8 right-8 z-50">
        <button id="openFormBtn" class="group relative w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 ease-out flex items-center justify-center overflow-hidden hover:w-52">
          <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
          <span class="absolute text-3xl font-bold transition-all duration-300 transform group-hover:-translate-x-4 group-hover:opacity-0">+</span>
          <span class="absolute opacity-0 text-sm tracking-wide font-semibold transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 group-hover:opacity-100">Agregar Usuario</span>
        </button>
      </div>

      <!-- Modal -->
      <div id="userFormModal" class="fixed inset-0 z-50 bg-black bg-opacity-50 hidden items-center justify-center p-4">
        <div class="modal-content rounded-2xl shadow-2xl max-w-2xl w-full overflow-y-auto max-h-[90vh]">
          <div class="modal-header flex justify-between items-center p-5 rounded-t-2xl">
            <h2 class="text-lg font-semibold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
              Nuevo Usuario
            </h2>
            <button id="closeFormBtn" class="text-gray-500 hover:text-red-500 transition">✕</button>
          </div>

          <section class="p-6 space-y-6">
            <div class="space-y-4">
              <div>
                <label class="text-sm font-semibold">Nombres</label>
                <input type="text" class="w-full mt-1 border rounded-lg p-2" placeholder="Ej: Iván Alejandro">
              </div>
              <div>
                <label class="text-sm font-semibold">Apellidos</label>
                <input type="text" class="w-full mt-1 border rounded-lg p-2" placeholder="Ej: Barrera Escalante">
              </div>
              <div>
                <label class="text-sm font-semibold">Correo electrónico</label>
                <input type="email" class="w-full mt-1 border rounded-lg p-2" placeholder="email@example.com">
              </div>
              <div class="flex gap-4">
                <div class="w-1/2">
                  <label class="text-sm font-semibold">Teléfono</label>
                  <input type="text" class="w-full mt-1 border rounded-lg p-2" placeholder="12341234">
                </div>
                <div class="w-1/2">
                  <label class="text-sm font-semibold">Departamento</label>
                  <select class="w-full mt-1 border rounded-lg p-2">
                    <option>La Libertad</option>
                    <option>Santa Ana</option>
                    <option>San Miguel</option>
                  </select>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-1/2">
                  <label class="text-sm font-semibold">Rol</label>
                  <select class="w-full mt-1 border rounded-lg p-2">
                    <option>Administrador</option>
                    <option>Notario</option>
                    <option>Juez</option>
                  </select>
                </div>
                <div class="w-1/2">
                  <label class="text-sm font-semibold">Contraseña</label>
                  <input type="password" class="w-full mt-1 border rounded-lg p-2" placeholder="••••••••">
                </div>
              </div>
            </div>
          </section>

          <div class="modal-footer flex justify-end gap-3 p-5 rounded-b-2xl">
            <button id="cancelBtn" class="px-4 py-2 rounded-lg border hover:bg-gray-100 transition">Cancelar</button>
            <button class="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition">Guardar Usuario</button>
          </div>
        </div>
      </div>
    </main>
  </div>

  <script>
    const sidebar = document.getElementById('sidebar');
    const logoCompact = document.getElementById('logo-compact');
    const logoFull = document.getElementById('logo-full');
    const navLabels = document.querySelectorAll('.nav-label');
    const navItems = document.querySelectorAll('.nav-item');
    const openBtn = document.getElementById('openFormBtn');
    const modal = document.getElementById('userFormModal');
    const closeBtn = document.getElementById('closeFormBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    // Modal
    openBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });

    const closeModal = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    };

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Sidebar
    sidebar.addEventListener('mouseenter', () => {
      sidebar.classList.replace('sidebar-collapsed', 'sidebar-expanded');
      logoCompact.style.display = 'none';
      logoFull.style.display = 'block';
      navLabels.forEach(l => l.style.display = 'inline-block');
      navItems.forEach(i => i.classList.remove('justify-center'));
    });

    sidebar.addEventListener('mouseleave', () => {
      sidebar.classList.replace('sidebar-expanded', 'sidebar-collapsed');
      logoCompact.style.display = 'flex';
      logoFull.style.display = 'none';
      navLabels.forEach(l => l.style.display = 'none');
      navItems.forEach(i => i.classList.add('justify-center'));
    });

    // Tabs
    const tabs = document.querySelectorAll('.browser-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
      });
    });

    // Detectar cambios en preferencia de sistema (para modo auto)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const temaActual = localStorage.getItem('theme-preference') || 'auto';
      if (temaActual === 'auto') {
        const nuevoTema = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', nuevoTema);
      }
    });
  </script>
</body>
</html>