<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login | SIGEN</title>
  <link rel="stylesheet" href="src/global.css">
  <link rel="stylesheet" href="src/output.css">
  <link rel="stylesheet" href="Style/index.css">
</head>

<body class="flex items-center justify-center min-h-screen">

  <!-- Pantalla de carga -->
  <div id="loading-screen">
    <div class="loader mb-4"></div>
    <p>Cargando SIGEN...</p>
  </div>

  <!-- Contenedor del Login -->
  <div
    class="login-container bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-[90%] max-w-md border border-white/20">

    <!-- Encabezado -->
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold text-white">Bienvenido a <span class="text-indigo-300">SIGEN</span></h1>
      <p class="text-gray-300 text-sm mt-2">Inicia sesión para continuar</p>
    </div>

    <!-- Formulario -->
    <form id="loginForm" class="space-y-5">
      <div>
        <label class="block text-gray-300 text-sm mb-1">Nombre de usuario</label>
        <input type="text" id="username" placeholder="usuario1234" required
          class="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300">
      </div>

      <div>
        <label class="block text-gray-300 text-sm mb-1">Contraseña</label>
        <input type="password" id="password" placeholder="••••••••" required
          class="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300">
      </div>

      <div class="flex justify-between items-center text-sm text-gray-300">
        <label class="flex items-center space-x-2">
          <input type="checkbox" id="remember" class="accent-indigo-400">
          <span>Recordarme</span>
        </label>
      </div>

      <button type="submit"
        class="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:opacity-90 transition duration-300 transform hover:scale-[1.02]">
        Iniciar Sesión
      </button>
    </form>
  </div>

  <script src="JS/index.js"></script>
</body>

</html>