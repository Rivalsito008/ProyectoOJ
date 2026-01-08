// ======================================
// CLASE MODAL MANAGER - Gestión centralizada de modals
// ======================================
export default class ModalManager {
    /**
     * Abre un modal específico
     * @param {HTMLElement} modal - Elemento del modal a abrir
     */
    static abrir(modal) {
        if (!modal) {
            console.error('Modal no encontrado');
            return;
        }
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        // Agregar listener para cerrar al hacer clic fuera
        setTimeout(() => {
            modal.addEventListener('click', this.clickFueraHandler);
        }, 100);
    }
    /**
     * Cierra un modal específico
     * @param {HTMLElement} modal - Elemento del modal a cerrar
     */
    static cerrar(modal) {
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
        modal.removeEventListener('click', this.clickFueraHandler);
    }
    /**
     * Handler para cerrar modal al hacer clic fuera
     */
    static clickFueraHandler(e) {
        if (e.target === e.currentTarget) {
            ModalManager.cerrar(e.currentTarget);
        }
    }
    /**
     * Limpia un formulario
     * @param {HTMLFormElement} form - Formulario a limpiar
     */
    static limpiarFormulario(form) {
        if (form) {
            form.reset();
            // Limpiar también campos hidden
            const hiddenInputs = form.querySelectorAll('input[type="hidden"]');
            hiddenInputs.forEach(input => input.value = '');
        }
    }
}