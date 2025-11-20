(function () {
    // Aplicar tema
    const t = localStorage.getItem('theme-preference') || 'auto';
    let f = t;
    if (t === 'auto') {
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

// Formulario por pasos
const steps = document.querySelectorAll(".step");
const progressBar = document.getElementById("progressBar");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
let currentStep = 0;

// Preguntas de ejemplo
const totalPreguntas = 32;
const preguntas = Array.from({
    length: totalPreguntas
}, (_, i) => ({
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

    // CORRECCIÓN: Actualizar botones de navegación correctamente
    // Mostrar botón anterior si NO estamos en la primera página de preguntas
    prevBtn.classList.toggle('hidden', paginaActual === 0 && currentStep === 1);

    // Actualizar texto del botón siguiente
    nextBtn.textContent = (fin >= preguntas.length) ? 'Finalizar' : 'Siguiente';
}

// En la función updateForm(), actualiza los botones:
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
    // CORRECCIÓN: Mostrar botón anterior si NO estamos en el paso 0
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
        // Aquí iría la lógica para enviar el formulario
        alert("Formulario enviado correctamente");
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
        // CORRECCIÓN: Resetear la página de preguntas cuando retrocedemos al paso anterior
        if (currentStep === 1) {
            paginaActual = 0;
        }
        updateForm();
    }
});

// Inicializar formulario
updateForm();