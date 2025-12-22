<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGEN - Sistema de Gestión Notarial</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="Style/configuracion.css">

    <!-- Axios -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="services/auth.js"></script>
</head>

<body>
    <?php
    $usuario = [
        'nombre' => 'Admin User',
        'rol' => 'Administrador',
        'email' => 'admin@sigen.com'
    ];
    ?>
    <!-- Sidebar Component -->
    <?php include 'components/sidebar.php'; ?>

    <!-- Main Content -->
    <div class="content">
        <!-- Header Component -->
        <?php
        $page_title = "Configuración"; // Título personalizado
        include 'components/header.php';
        ?>

        <!-- Dashboard Content -->
        <main class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Modo de tema -->
                <div class="card rounded-xl p-6 shadow">
                    <h2 class="text-xl font-semibold mb-4">Modo de tema</h2>
                    <label class="flex items-center gap-2 mb-2 cursor-pointer">
                        <input type="radio" name="theme" value="light" class="cursor-pointer">
                        <span>Claro</span>
                    </label>
                    <label class="flex items-center gap-2 mb-2 cursor-pointer">
                        <input type="radio" name="theme" value="dark" class="cursor-pointer">
                        <span>Oscuro</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="theme" value="auto" class="cursor-pointer" checked>
                        <span>Automático</span>
                    </label>
                </div>

                <!-- Tamaño de fuente -->
                <div class="card rounded-xl p-6 shadow">
                    <h2 class="text-xl font-semibold mb-4">Tamaño de fuente</h2>
                    <input id="fontRange" type="range" min="14" max="22" value="16" class="w-full cursor-pointer">
                    <p class="mt-2 text-sm">Tamaño actual: <span id="fontValue" class="font-semibold">16px</span></p>
                </div>

                <!-- Contraste -->
                <div class="card rounded-xl p-6 shadow md:col-span-2">
                    <h2 class="text-xl font-semibold mb-4">Contraste</h2>
                    <input id="contrastRange" type="range" min="0.8" max="1.6" step="0.1" value="1" class="w-full cursor-pointer">
                    <p class="mt-2 text-sm">Nivel de contraste: <span id="contrastValue" class="font-semibold">1.0</span></p>
                </div>

                <!-- Cuenta -->
                <div class="card rounded-xl p-6 shadow md:col-span-2">
                    <h2 class="text-xl font-semibold mb-4">Cuenta</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button id="btnEditarPerfil" class="btn-config py-3 rounded-lg transition">
                            Editar perfil
                        </button>
                        <button id="btnCambiarClave" class="btn-config py-3 rounded-lg transition">
                            Solicitar cambio de contraseña
                        </button>
                        <button id="btnVerificacion" class="btn-config py-3 rounded-lg transition">
                            Activar verificación en dos pasos
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <script src="JS/configuracion.js"></script>
</body>

</html>