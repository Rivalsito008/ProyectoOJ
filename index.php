<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login | SIGEN</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      background-color: #1e1b4b;

      --escudo: url('img/escudo.png');
      --tam-escudo: 60px;
      --espaciado: 220px;

      background-image: 
        radial-gradient(transparent 70%, transparent 70%), 
        var(--escudo);
      background-repeat: repeat;
      background-position: center;
      background-size: var(--espaciado) var(--espaciado), var(--tam-escudo) var(--tam-escudo);
      background-attachment: fixed;
      background-blend-mode: normal;
    }

    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        rgba(30, 27, 75, 0.85) 0%,
        rgba(55, 48, 163, 0.65) 100%
      );
      z-index: -1;
    }

    .login-container {
      transition: all 0.3s ease;
    }

    .login-container:hover {
      box-shadow: 0 0 30px rgba(99, 102, 241, 0.4);
      transform: translateY(-2px);
    }

    /* Spinner animación */
    .loader {
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Pantalla de carga */
    #loading-screen {
      position: fixed;
      inset: 0;
      background: rgba(30, 27, 75, 0.95);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
      z-index: 50;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    #loading-screen.active {
      opacity: 1;
      pointer-events: auto;
    }
  </style>
</head>

<body class="flex items-center justify-center min-h-screen">

  <!-- Pantalla de carga -->
  <div id="loading-screen">
    <div class="loader mb-4"></div>
    <p>Cargando SIGEN...</p>
  </div>

  <!-- Contenedor del Login -->
  <div class="login-container bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-[90%] max-w-md border border-white/20">
    
    <!-- Encabezado -->
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold text-white">Bienvenido a <span class="text-indigo-300">SIGEN</span></h1>
      <p class="text-gray-300 text-sm mt-2">Inicia sesión para continuar</p>
    </div>

    <!-- Formulario -->
    <form id="loginForm" class="space-y-5">
      <div>
        <label class="block text-gray-300 text-sm mb-1">Nombre de usuario</label>
        <input type="text" placeholder="usuario1234" required
          class="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300">
      </div>

      <div>
        <label class="block text-gray-300 text-sm mb-1">Contraseña</label>
        <input type="password" placeholder="••••••••" required
          class="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300">
      </div>

      <div class="flex justify-between items-center text-sm text-gray-300">
        <label class="flex items-center space-x-2">
          <input type="checkbox" class="accent-indigo-400">
          <span>Recordarme</span>
        </label>
      </div>

      <button type="submit" 
        class="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:opacity-90 transition duration-300 transform hover:scale-[1.02]">
        Iniciar Sesión
      </button>
    </form>

    <div class="mt-6 flex items-center justify-center">
      <div class="border-t border-gray-500 w-1/4"></div>
      <div class="border-t border-gray-500 w-1/4"></div>
    </div>
  </div>

  <script>
    const form = document.getElementById('loginForm');
    const loadingScreen = document.getElementById('loading-screen');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      loadingScreen.classList.add('active');
      setTimeout(() => {
        window.location.href = 'inicio.php';
      }, 5000);
    });
  </script>

</body>
</html>
