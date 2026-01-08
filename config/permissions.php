<?php
/**
 * CONFIGURACIÓN DE PERMISOS - RBAC (Role-Based Access Control)
 * ============================================================
 * 
 * Este archivo define qué roles tienen acceso a qué páginas del sistema.
 * 
 * FORMATO:
 * 'nombre_rol' => ['pagina1.php', 'pagina2.php', ...]
 * 
 * WILDCARD:
 * '*' = Acceso a todas las páginas
 * 
 * ROLES DISPONIBLES:
 * - admin: Acceso total al sistema
 * - colaborador: Acceso limitado a funciones básicas
 * - notario: Acceso a funciones notariales
 * - juez: Acceso a funciones judiciales
 * 
 * CÓMO AGREGAR UN NUEVO ROL:
 * 1. Agregar el nombre del rol (en minúsculas)
 * 2. Listar las páginas permitidas
 * 
 * CÓMO AGREGAR UNA NUEVA PÁGINA:
 * 1. Agregar el nombre del archivo a los roles que deben tener acceso
 */

return [
    // ADMINISTRADOR - Acceso total
    'admin' => ['*'],

    // COLABORADOR - Acceso básico
    'colaborador' => [
        'inicio.php',
        'dashboardDepar.php',
        'form.php',
        'respuestas2.php',
        'preguntas.php',
        'configuracion.php'
    ],

    // NOTARIO - Acceso a funciones notariales
    'notario' => [
        'inicio.php',
        'dashboardDepar.php',
        'form.php',
        'respuestas2.php',
        'tribunales.php',
        'configuracion.php'
    ],

    // JUEZ - Acceso a funciones judiciales
    'juez' => [
        'inicio.php',
        'dashboardDepar.php',
        'respuestas2.php',
        'tribunales.php',
        'configuracion.php'
    ]
];
