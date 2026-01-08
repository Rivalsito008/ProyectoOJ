// ======================================
// OBSERVER PARA ELIMINAR PADDING DE SWEETALERT2
// ======================================
/**
 * Observer que monitorea cambios en el body y elimina el padding que SweetAlert2 agrega
 */
export function inicializarObserverPadding() {
    // Observer para detectar cambios en los atributos del body
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const paddingRight = window.getComputedStyle(document.body).paddingRight;
                // Si SweetAlert2 agregó padding (generalmente 15px o 30px), eliminarlo
                if (paddingRight && (paddingRight === '15px' || paddingRight === '30px')) {
                    document.body.style.paddingRight = '0px';
                    document.documentElement.style.paddingRight = '0px';
                }
            }
        });
    });

    // Observar cambios en el body
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['style', 'class']
    });

    // También observar el html
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['style', 'class']
    });

    // Verificar periódicamente y eliminar padding
    setInterval(() => {
        const bodyPadding = window.getComputedStyle(document.body).paddingRight;
        const htmlPadding = window.getComputedStyle(document.documentElement).paddingRight;

        if (bodyPadding && (bodyPadding === '15px' || bodyPadding === '30px')) {
            document.body.style.paddingRight = '0px';
        }
        if (htmlPadding && (htmlPadding === '15px' || htmlPadding === '30px')) {
            document.documentElement.style.paddingRight = '0px';
        }
    }, 100);
}

/**
 * Elimina el padding-right que SweetAlert2 agrega al body y html
 */
export function eliminarPaddingSweetAlert() {
    // Usar setTimeout para asegurar que se ejecute después de que SweetAlert2 termine
    setTimeout(() => {
        document.body.style.paddingRight = '';
        document.documentElement.style.paddingRight = '';
        // También eliminar clases que SweetAlert2 pueda agregar
        document.body.classList.remove('swal2-shown', 'swal2-height-auto');
        document.documentElement.classList.remove('swal2-shown', 'swal2-height-auto');
    }, 100);
}

/**
 * Muestra notificación de éxito usando TOAST (no bloquea la interfaz)
 * @param {string} mensaje - Mensaje a mostrar
 */
export function mostrarExitoToast(mensaje) {
    console.log('✓ ' + mensaje);

    // Prevenir que SweetAlert2 agregue padding al body
    const originalPaddingRight = document.body.style.paddingRight;

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);

            // Forzar que no se agregue padding al body inmediatamente
            setTimeout(() => {
                document.body.style.paddingRight = '0px';
                document.documentElement.style.paddingRight = '0px';
            }, 0);
        },
        didClose: () => {
            // Eliminar padding cuando se cierre el toast
            eliminarPaddingSweetAlert();
        }
    });

    Toast.fire({
        icon: 'success',
        title: mensaje,
        background: '#10b981',
        color: '#ffffff',
        iconColor: '#ffffff'
    }).then(() => {
        // Asegurar que el padding se elimine después de que el toast se cierre
        eliminarPaddingSweetAlert();
    });
}

/**
 * Muestra mensaje de éxito (para casos que requieren confirmación explícita)
 * @param {string} mensaje - Mensaje a mostrar
 */
export function mostrarExito(mensaje) {
    console.log('✓ ' + mensaje);
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: mensaje,
        confirmButtonColor: '#10b981',
        timer: 3000,
        timerProgressBar: true,
        didClose: () => {
            eliminarPaddingSweetAlert();
        }
    }).then(() => {
        eliminarPaddingSweetAlert();
    });
}

/**
 * Muestra mensaje de error
 * @param {string} mensaje - Mensaje a mostrar
 */
export function mostrarError(mensaje) {
    console.error('✕ ' + mensaje);
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
        confirmButtonColor: '#ef4444',
        didClose: () => {
            eliminarPaddingSweetAlert();
        }
    }).then(() => {
        eliminarPaddingSweetAlert();
    });
}