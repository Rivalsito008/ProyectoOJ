<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SIGEN - Sistema de Gestión Notarial</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link rel="stylesheet" href="Style/usuarios.css">
  <!-- SweetAlert2 -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <!-- Axios -->
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script src="services/auth.js"></script>
</head>

<body>
  <?php include 'components/sidebar.php'; ?>
  <!-- Main Content -->
  <div class="content">
    <!-- Header Component -->
    <?php
    $page_title = "Usuarios"; // Título personalizado
    include 'components/header.php';
    ?>
    <main class="p-6">
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
                    <th class="px-6 py-3">Nombre</th>
                    <th class="px-6 py-3">Apellido</th>
                    <th class="px-6 py-3 text-center">Email</th>
                    <th class="px-6 py-3">Rol</th>
                    <th class="px-6 py-3">Estado</th>
                    <th class="px-6 py-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody id="tablaTodo">
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-content" id="activo">
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase">
                  <tr>
                    <th class="px-6 py-3">Nombre</th>
                    <th class="px-6 py-3">Apellido</th>
                    <th class="px-6 py-3 text-center">Email</th>
                    <th class="px-6 py-3">Rol</th>
                    <th class="px-6 py-3">Estado</th>
                    <th class="px-6 py-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody id="tablaActivo">
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-content" id="inactivo">
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase">
                  <tr>
                    <th class="px-6 py-3">Nombre</th>
                    <th class="px-6 py-3">Apellido</th>
                    <th class="px-6 py-3 text-center">Email</th>
                    <th class="px-6 py-3">Rol</th>
                    <th class="px-6 py-3">Estado</th>
                    <th class="px-6 py-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody id="tablaInactivo">
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
            Usuario</span>
        </button>
      </div>
      <!-- Modal para agregar un nuevo usuario -->
      <div id="userFormModal" class="fixed inset-0 z-50 bg-black bg-opacity-50 hidden items-center justify-center p-4">
        <div class="modal-content rounded-2xl shadow-2xl max-w-2xl w-full overflow-y-auto max-h-[90vh]">
          <div class="modal-header flex justify-between items-center p-5 rounded-t-2xl">
            <h2 class="text-lg font-semibold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24"
                stroke="currentColor"></svg>
              Nuevo Usuario
            </h2>
            <button id="closeFormBtn" class="text-gray-500 hover:text-red-500 transition">✕</button>
          </div>
          <section class="p-6 space-y-6">
            <form id="addUserForm" class="space-y-4">
              <div>
                <label class="text-sm font-semibold">Nombres</label>
                <input type="text" id="add_nombres" name="nombres" class="w-full mt-1 border rounded-lg p-2"
                  placeholder="Ej: Iván Alejandro" required>
              </div>
              <div>
                <label class="text-sm font-semibold">Apellidos</label>
                <input type="text" id="add_apellidos" name="apellidos" class="w-full mt-1 border rounded-lg p-2"
                  placeholder="Ej: Barrera Escalante" required>
              </div>
              <div>
                <label class="text-sm font-semibold">Correo electrónico</label>
                <input type="email" id="add_email" name="email_institucional" class="w-full mt-1 border rounded-lg p-2"
                  placeholder="email@example.com" required>
              </div>
              <div class="flex gap-4">
                <div class="w-1/2">
                  <label class="text-sm font-semibold">Teléfono</label>
                  <input type="text" id="add_telefono" name="telefono" class="w-full mt-1 border rounded-lg p-2"
                    placeholder="12341234">
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-1/2">
                  <label class="text-sm font-semibold">Rol <span class="text-red-500">*</span></label>
                  <select id="add_rol" name="rol" class="w-full mt-1 border rounded-lg p-2" required>
                    <option value="">Cargando roles...</option>
                  </select>
                </div>
                <div class="w-1/2">
                  <label class="text-sm font-semibold">Contraseña <span class="text-red-500">*</span></label>
                  <input type="password" id="add_password" name="password" class="w-full mt-1 border rounded-lg p-2"
                    placeholder="••••••••" required minlength="6">
                  <small class="text-gray-500 text-xs">Mínimo 6 caracteres</small>
                </div>
              </div>
            </form>
          </section>
          <div class="px-6 py-4 bg-white flex justify-end">
            <button id="saveAddBtn" class="btn-save-user px-5 py-2 rounded-lg font-medium">Guardar
              Usuario</button>
          </div>
        </div>
      </div>

      <!-- Modal Detalles -->
      <div id="viewDetailsModal"
        class="fixed inset-0 z-50 bg-black bg-opacity-50 hidden items-center justify-center p-4">
        <div class="modal-content rounded-2xl shadow-2xl max-w-md w-full bg-white overflow-hidden">
          <div class="modal-header flex justify-between items-center p-5 border-b">
            <h2 class="text-lg font-semibold flex items-center gap-2">
              Detalles del Usuario
            </h2>
            <button onclick="closeDetailsModal()" class="text-gray-500 hover:text-red-500 transition">✕</button>
          </div>
          <div class="p-6 space-y-4" id="detailsContent">
          </div>
        </div>
      </div>
      <!-- Modal para editar usuario -->
      <div id="editUserModal" class="fixed inset-0 z-50 bg-black bg-opacity-50 hidden items-center justify-center p-4">
        <div class="modal-content rounded-2xl shadow-2xl max-w-2xl w-full overflow-y-auto max-h-[90vh]">
          <div class="modal-header flex justify-between items-center p-5 rounded-t-2xl">
            <h2 class="text-lg font-semibold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar Usuario
            </h2>
            <button id="closeEditBtn" class="text-gray-500 hover:text-red-500 transition">✕</button>
          </div>
          <section class="p-6 space-y-6">
            <form id="editUserForm" class="space-y-4">
              <input type="hidden" id="edit_id_usuario" name="id_usuario">
              <div>
                <label class="text-sm font-semibold">Nombres</label>
                <input type="text" id="edit_nombres" name="nombres" class="w-full mt-1 border rounded-lg p-2"
                  placeholder="Ej: Iván Alejandro" required>
              </div>
              <div>
                <label class="text-sm font-semibold">Apellidos</label>
                <input type="text" id="edit_apellidos" name="apellidos" class="w-full mt-1 border rounded-lg p-2"
                  placeholder="Ej: Barrera Escalante" required>
              </div>
              <div>
                <label class="text-sm font-semibold">Correo electrónico</label>
                <input type="email" id="edit_email" name="email_institucional" class="w-full mt-1 border rounded-lg p-2"
                  placeholder="email@example.com" required>
              </div>
              <div class="flex gap-4">
                <div class="w-1/2">
                  <label class="text-sm font-semibold">Teléfono</label>
                  <input type="text" id="edit_telefono" name="telefono" class="w-full mt-1 border rounded-lg p-2"
                    placeholder="12341234">
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-1/2">
                  <label class="text-sm font-semibold">Rol <span class="text-red-500">*</span></label>
                  <select id="edit_rol" name="rol" class="w-full mt-1 border rounded-lg p-2" required>
                    <option value="">Cargando roles...</option>
                  </select>
                </div>
                <div class="w-1/2">
                  <label class="text-sm font-semibold">Nueva Contraseña (opcional)</label>
                  <input type="password" id="edit_password" name="password" class="w-full mt-1 border rounded-lg p-2"
                    placeholder="Dejar vacío si no se cambia" minlength="6">
                  <small class="text-gray-500 text-xs">Solo completa si deseas cambiar la contraseña
                    (mín. 6 caracteres)</small>
                </div>
              </div>
            </form>
          </section>
          <div class="px-6 py-4 bg-white flex justify-end gap-3">
            <button id="cancelEditBtn"
              class="px-5 py-2 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 transition">
              Cancelar
            </button>
            <button id="saveEditBtn" class="btn-save-user px-5 py-2 rounded-lg font-medium">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
  <script src="JS/usuarios.js"></script>
</body>

</html>