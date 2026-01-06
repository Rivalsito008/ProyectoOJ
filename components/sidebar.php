<?php
/**
 * Componente de Sidebar Reutilizable para SIGEN
 * NUEVO: Usa JavaScript para mostrar/ocultar según permisos
 */

$current_page = basename($_SERVER['PHP_SELF'], '.php');

// Definir TODOS los items del menú (sin filtrar por PHP)
$menu_items = [
    [
        'id' => 'inicio',
        'label' => 'Inicio',
        'url' => 'inicio.php',
        'page' => 'inicio.php',
        'icon' => '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>',
        'roles' => ['admin', 'colaborador', 'notario', 'juez'] // Roles permitidos
    ],
    [
        'id' => 'dashboardDepar',
        'label' => 'Dashboard',
        'url' => 'dashboardDepar.php',
        'page' => 'dashboardDepar.php',
        'icon' => '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>',
        'roles' => ['admin', 'colaborador', 'notario', 'juez']
    ],
    [
        'id' => 'form',
        'label' => 'Formulario',
        'url' => 'form.php',
        'page' => 'form.php',
        'icon' => '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>',
        'roles' => ['admin', 'colaborador', 'notario']
    ],
    [
        'id' => 'respuestas2',
        'label' => 'Resultados',
        'url' => 'respuestas2.php',
        'page' => 'respuestas2.php',
        'icon' => '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>',
        'roles' => ['admin', 'colaborador', 'notario', 'juez']
    ],
    [
        'id' => 'preguntas',
        'label' => 'Preguntas',
        'url' => 'preguntas.php',
        'page' => 'preguntas.php',
        'icon' => '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
        'roles' => ['admin', 'notario']
    ],
    [
        'id' => 'usuarios',
        'label' => 'Usuarios',
        'url' => 'usuarios.php',
        'page' => 'usuarios.php',
        'icon' => '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>',
        'roles' => ['admin']
    ],
    [
        'id' => 'tribunales',
        'label' => 'Tribunales',
        'url' => 'tribunales.php',
        'page' => 'tribunales.php',
        'icon' => '<path d="M3 21h18M4 21v-9M8 21v-9M12 21v-9M16 21v-9M20 21v-9 M2 12h20 M12 3L3 9h18L12 3z" stroke-linecap="round" stroke-linejoin="round" />',
        'roles' => ['admin', 'juez']
    ],
    [
        'id' => 'configuracion',
        'label' => 'Configuración',
        'url' => 'configuracion.php',
        'page' => 'configuracion.php',
        'icon' => '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>',
        'roles' => ['admin', 'colaborador', 'notario', 'juez']
    ]
];
?>

<!-- Sidebar Component -->
<aside id="sidebar" class="sidebar sidebar-collapsed fixed top-0 left-0 z-40 h-screen">
    <div class="h-full px-3 py-4 overflow-y-auto">
        <!-- Logo -->
        <div class="flex items-center justify-center mb-6 px-2 h-10">
            <div id="logo-compact"
                class="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                SG
            </div>
            <h2 id="logo-full"
                class="hide-on-collapse text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent ml-3">
                SIGEN
            </h2>
        </div>

        <!-- Navigation -->
        <nav class="space-y-2" id="sidebar-nav">
            <?php foreach ($menu_items as $item): ?>
                <a href="<?php echo $item['url']; ?>" data-page="<?php echo $item['page']; ?>"
                    class="nav-item hidden <?php echo ($current_page === $item['id']) ? 'active' : ''; ?> flex items-center px-3 py-3 rounded-lg justify-center"
                    id="menu-<?php echo $item['id']; ?>">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <?php echo $item['icon']; ?>
                    </svg>
                    <span class="nav-label hide-on-collapse font-medium whitespace-nowrap ml-3">
                        <?php echo $item['label']; ?>
                    </span>
                </a>
            <?php endforeach; ?>
        </nav>
    </div>
</aside>

<!-- Sidebar Scripts -->
<script>
    (function () {
        const sidebar = document.getElementById('sidebar');
        const logoCompact = document.getElementById('logo-compact');
        const logoFull = document.getElementById('logo-full');
        const navLabels = document.querySelectorAll('.nav-label');
        const navItems = document.querySelectorAll('.nav-item');

        // Expandir/contraer sidebar
        sidebar.addEventListener('mouseenter', () => {
            sidebar.classList.remove('sidebar-collapsed');
            sidebar.classList.add('sidebar-expanded');
            logoCompact.style.display = 'none';
            logoFull.style.display = 'block';
            navLabels.forEach(label => {
                label.style.display = 'inline-block';
            });
            navItems.forEach(item => {
                item.classList.remove('justify-center');
            });
        });

        sidebar.addEventListener('mouseleave', () => {
            sidebar.classList.remove('sidebar-expanded');
            sidebar.classList.add('sidebar-collapsed');
            logoCompact.style.display = 'flex';
            logoFull.style.display = 'none';
            navLabels.forEach(label => {
                label.style.display = 'none';
            });
            navItems.forEach(item => {
                item.classList.add('justify-center');
            });
        });

        // Filtrar items del menú según permisos
        async function initializeSidebarPermissions() {
            console.log('🎨 [Sidebar] Inicializando permisos del menú...');

            try {
                // Obtener todas las páginas accesibles
                const pages = await auth.getAccessiblePages();
                console.log('📋 [Sidebar] Páginas accesibles:', pages);

                // Obtener todos los items del menú
                const menuItems = document.querySelectorAll('.nav-item');
                let visibleCount = 0;

                menuItems.forEach(item => {
                    const page = item.dataset.page;
                    console.log(`🔍 [Sidebar] Verificando acceso a: ${page}`);

                    // Si tiene wildcard (*) o la página está en la lista
                    if (pages.includes('*') || pages.includes(page)) {
                        item.classList.remove('hidden');
                        visibleCount++;
                        console.log(`✅ [Sidebar] Mostrando: ${page}`);
                    } else {
                        item.classList.add('hidden');
                        console.log(`🚫 [Sidebar] Ocultando: ${page}`);
                    }
                });

                console.log(`🎨 [Sidebar] Menú inicializado. Items visibles: ${visibleCount}/${menuItems.length}`);
            } catch (error) {
                console.error('❌ [Sidebar] Error al inicializar permisos:', error);
            }
        }

        // Inicializar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeSidebarPermissions);
        } else {
            initializeSidebarPermissions();
        }
    })();
</script>