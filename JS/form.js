// JS/form.js - Código JavaScript completo para el formulario

(function () {
    // Aplicar tema
    const t = localStorage.getItem('theme-preference') || 'auto';
    let f = t;
    if (t === 'auto') {
        f = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
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
const steps = document.querySelectorAll('.step');
const progressBar = document.getElementById('progressBar');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let currentStep = 0;

// Preguntas del cuestionario
const preguntas = [
    { texto: 'Pregunta 1: ¿Le ha humillado, criticado, descalificado, burlado, ridiculizado?' },
    { texto: 'Pregunta 2: ¿El agresor le dice cómo vestirse, maquillarse, comportarse o qué publicar en sus redes sociales?' },
    { texto: 'Pregunta 3: ¿Tiene algún trabajo remunerado?' },
    { texto: 'Pregunta 4: ¿Le intimida en público a través de miradas, gestos, señas, etc.?' },
    { texto: 'Pregunta 5: ¿Le amenaza con quitarle o no dejarla ver a sus hijos e hijas?' },
    { texto: 'Pregunta 6: ¿El agresor le controla mediante llamadas y mensajes durante el día?' },
    { texto: 'Pregunta 7: ¿El agresor le dice que no estudie o trabaje para que cuide a los hijos y el hogar?' },
    { texto: 'Pregunta 8: ¿Ha soportado la violencia por mantener la familia unida o sus hijos?' },
    { texto: 'Pregunta 9: ¿Es celoso y posesivo con usted? (le impide salir sola o acompañada, que salude o hable con otros hombres)' },
    { texto: 'Pregunta 10: ¿El agresor se muestra amoroso y respetuoso ante la comunidad, pero en privado la maltrata, humilla, desvaloriza?' },
    { texto: 'Pregunta 11: ¿Le ha quitado o dañado sus artículos y documentos personales? (Documentos de Identificación, títulos de educación, teléfono, ropa, zapatos, accesorios, maquillaje, materiales de su trabajo, carro, otros)' },
    { texto: 'Pregunta 12: ¿Le tiene que pedir permiso para visitar familiares, ir a la iglesia, al médico, comprar algo, o compromisos laborales o sociales, etc.?' },
    { texto: 'Pregunta 13: ¿Le ha amenazado con hacerle daño a Usted, a sus hijo y otros familiares?' },
    { texto: 'Pregunta 14: ¿El agresor se niega a dar la cuota alimenticia de los hijos para perjudicarla?' },
    { texto: 'Pregunta 15: ¿El agresor paga la casa o el alquiler?' },
    { texto: 'Pregunta 16: ¿Usted hace lo que él le pide para evitar que él mismo se haga daño?' },
    { texto: 'Pregunta 17: ¿Se ha presentado a su lugar de trabajo o estudio con el fin de controlarla o amenazarla?' },
    { texto: 'Pregunta 18: ¿El agresor es violento bajo los efecto de alcohol, drogas u otras sustancias estupefaciente?' },
    { texto: 'Pregunta 19: ¿El agresor anteriormente ha realizado hechos violentos en su contra?' },
    { texto: 'Pregunta 20: ¿El agresor ha obligado a realizar o tolerar conductas sexuales en contra de su voluntad?' },
    { texto: 'Pregunta 21: ¿Le sigue, vigila, o le envía mensajes amenazantes? (por medio de terceras personas, redes sociales, texto o correo)' },
    { texto: 'Pregunta 22: ¿El agresor se ha negado a proveer alimento, vivienda, vestuario, educación y salud a sus hijos e hijas?' },
    { texto: 'Pregunta 23: ¿El agresor ha realizados publicaciones en las redes sociales para dañarle?' },
    { texto: 'Pregunta 24: ¿Considera que las agresiones pueden ser más graves en el futuro inmediato?' },
    { texto: 'Pregunta 25: ¿La ha amenazado con matarla por cualquier razón?' },
    { texto: 'Pregunta 26: ¿Le ha expresado frases como "si no sos mía jamás serás de nadie más" o similares?' },
    { texto: 'Pregunta 27: ¿Le ha golpeado frente a su hijos o frente a familiares de él?' },
    { texto: 'Pregunta 28: ¿El agresor posee o tiene acceso a armas de fuego, corvos, machetes, o cualquier otro tipo de armas?' },
    { texto: 'Pregunta 29: ¿Le ha amenazado por tener actualmente una relación de pareja distinta a él?' },
    { texto: 'Pregunta 30: ¿Ejerce control a través de personas cercanos de su entorno?' },
    { texto: 'Pregunta 31: ¿Ha tenido pensamientos suicidas debido a la violencia sufrida?' },
    { texto: 'Pregunta 32: ¿Siente miedo o angustia porque se siente constantemente observada por él?' },
    { texto: 'Pregunta 33: ¿Él ha intentado matar a Usted o a sus hijos? (vapulear, ahogar, asfixiar, apuñalar, quemar alguna vez)' },
    { texto: 'Pregunta 34: ¿Le ha causado lesiones que necesitaran hospitalización o atención médica o que le impidieron realizar sus actividades ordinarias?' },
    { texto: 'Pregunta 35: ¿Le vigila y persigue constantemente para causarle daño físico?' },
    { texto: 'Pregunta 36: ¿El agresor a incumplido medidas de protección?' },
    { texto: 'Pregunta 37: ¿Ha perdido contacto, se encuentra lejos o aislada de su familia, amistades o redes de apoyo?' },
];

const preguntasPorPagina = 8;
let paginaActual = 0;

// Función para manejar campos condicionales
function setupConditionalFields() {
    // Manejar campo de diagnóstico (Víctima)
    const enfermedadRadios = document.querySelectorAll('input[name="enfermedad"]');
    const diagnosticoInput = document.getElementById('diagnosticoInput');

    enfermedadRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'si') {
                diagnosticoInput.style.display = 'block';
                diagnosticoInput.required = true;
            } else {
                diagnosticoInput.style.display = 'none';
                diagnosticoInput.required = false;
                diagnosticoInput.value = '';
            }
        });
    });

    // Manejar campo de discapacidad (Víctima)
    const discapacidadSelect = document.getElementById('discapacidadSelect');
    const discapacidadDesc = document.getElementById('discapacidadDesc');

    if (discapacidadSelect) {
        discapacidadSelect.addEventListener('change', function () {
            if (this.value === 'Física' || this.value === 'Mental') {
                discapacidadDesc.style.display = 'block';
                discapacidadDesc.required = true;
            } else {
                discapacidadDesc.style.display = 'none';
                discapacidadDesc.required = false;
                discapacidadDesc.value = '';
            }
        });
    }

    // Manejar campo de formación militar (Agresor)
    const formacionRadios = document.querySelectorAll('input[name="formacionMilitar"]');
    const tipoFormacionSelect = document.getElementById('tipoFormacionSelect');

    formacionRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'si') {
                tipoFormacionSelect.style.display = 'block';
                tipoFormacionSelect.required = true;
            } else {
                tipoFormacionSelect.style.display = 'none';
                tipoFormacionSelect.required = false;
                tipoFormacionSelect.value = '';
            }
        });
    });

    // Manejar campo de detención PNC (Agresor)
    const detencionRadios = document.querySelectorAll('input[name="detencionPNC"]');
    const vecesDetencion = document.getElementById('vecesDetencion');

    detencionRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'si') {
                vecesDetencion.style.display = 'block';
                vecesDetencion.required = true;
            } else {
                vecesDetencion.style.display = 'none';
                vecesDetencion.required = false;
                vecesDetencion.value = '';
            }
        });
    });
}

function mostrarPreguntas() {
    const preguntasForm = document.getElementById('preguntasForm');
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
}

// Función para generar número de caso único
function generarNumeroCaso() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `CASO-${timestamp}-${random}`;
}

// Función para formatear fecha
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Función para actualizar los datos del comprobante
function actualizarDatosComprobante() {
    const numeroCaso = generarNumeroCaso();
    const fechaActual = new Date();

    // Obtener datos por ID
    const nombreDenunciante = document.getElementById('denuncianteNombre')?.value || 'No especificado';
    const apellidoDenunciante = document.getElementById('denuncianteApellido')?.value || 'No especificado';

    const nombreVictima = document.getElementById('victimaNombre')?.value || 'No especificado';
    const apellidoVictima = document.getElementById('victimaApellido')?.value || 'No especificado';

    const nombreAgresor = document.getElementById('agresorNombre')?.value || 'No especificado';
    const apellidoAgresor = document.getElementById('agresorApellido')?.value || 'No especificado';

    const preguntasRespondidas = document.querySelectorAll('input[type="radio"]:checked').length;

    // Actualizar comprobante
    document.getElementById('printCaso').textContent = numeroCaso;
    document.getElementById('printFecha').textContent = formatearFecha(fechaActual);
    document.getElementById('printDenunciante').textContent = `${nombreDenunciante} ${apellidoDenunciante}`;
    document.getElementById('printVictima').textContent = `${nombreVictima} ${apellidoVictima}`;
    document.getElementById('printAgresor').textContent = `${nombreAgresor} ${apellidoAgresor}`;
    document.getElementById('printPreguntas').textContent = `${preguntasRespondidas} de ${preguntas.length} preguntas respondidas`;
}

function actualizarResumen() {
    // Actualizar los datos del comprobante primero
    actualizarDatosComprobante();

    // Luego copiar los mismos datos al resumen
    document.getElementById('resumenDenunciante').textContent = document.getElementById('printDenunciante').textContent;
    document.getElementById('resumenVictima').textContent = document.getElementById('printVictima').textContent;
    document.getElementById('resumenAgresor').textContent = document.getElementById('printAgresor').textContent;
    document.getElementById('resumenPreguntas').textContent = document.getElementById('printPreguntas').textContent;
    document.getElementById('resumenFecha').textContent = document.getElementById('printFecha').textContent;
    document.getElementById('resumenCaso').textContent = document.getElementById('printCaso').textContent;
}

// Función para imprimir comprobante
function imprimirComprobante() {
    // Actualizar los datos JUSTO ANTES de imprimir
    actualizarDatosComprobante();

    const elementoOriginal = document.getElementById('comprobante');
    const ventanaImpresion = window.open('', '_blank');

    ventanaImpresion.document.write(`
    <html>
      <head>
        <title>Comprobante de Denuncia - SIGEN</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            font-size: 14px;
            color: #000;
          }
          .print-section { 
            border: 2px solid #000; 
            padding: 20px; 
            max-width: 800px;
            margin: 0 auto;
          }
          h2 { 
            text-align: center; 
            color: #000; 
            margin-bottom: 10px;
          }
          .border-b { 
            border-bottom: 1px solid #000; 
            padding-bottom: 5px;
            margin-bottom: 10px;
          }
          .font-semibold { 
            font-weight: bold; 
          }
          .text-center { 
            text-align: center; 
          }
          .mt-8 { 
            margin-top: 32px; 
          }
          .pt-4 { 
            padding-top: 16px; 
          }
          .border-t { 
            border-top: 1px solid #000; 
          }
          .text-sm { 
            font-size: 12px; 
          }
          .text-xs { 
            font-size: 10px; 
          }
          .grid { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 16px;
          }
          .mb-4 { 
            margin-bottom: 16px; 
          }
          .mb-6 { 
            margin-bottom: 24px; 
          }
        </style>
      </head>
      <body>
        ${elementoOriginal.innerHTML}
      </body>
    </html>
  `);

    ventanaImpresion.document.close();
    ventanaImpresion.focus();

    setTimeout(() => {
        ventanaImpresion.print();
    }, 250);
}

function updateForm() {
    steps.forEach((step, index) => {
        step.classList.toggle('hidden', index !== currentStep);
    });

    // Actualizar barra de progreso (7 pasos totales)
    progressBar.style.width = `${(currentStep + 1) / 7 * 100}%`;

    // Si estamos en el paso de violencia intrafamiliar, inicializar interactividad
    if (currentStep === 3) {
        setTimeout(setupViolenciaInteractiva, 100);
    }

    // Si estamos en el paso de preguntas, cargarlas
    if (currentStep === 4) {
        mostrarPreguntas();
    }

    // Si estamos en el paso de confirmación, actualizar resumen
    if (currentStep === 6) {
        actualizarResumen();
    }

    // Configurar campos condicionales cada vez que cambiamos de paso
    setTimeout(setupConditionalFields, 100);

    // Mostrar/ocultar botones según el paso
    prevBtn.classList.toggle('hidden', currentStep === 0);

    // Actualizar texto del botón siguiente
    if (currentStep === 6) {
        nextBtn.textContent = 'Enviar Formulario';
    } else if (currentStep === 4) {
        nextBtn.textContent = (paginaActual + 1) * preguntasPorPagina >= preguntas.length
            ? 'Siguiente'
            : 'Siguiente';
    } else {
        nextBtn.textContent = 'Siguiente';
    }
}

nextBtn.addEventListener('click', () => {
    // Si estamos en el paso de preguntas y hay más páginas
    if (currentStep === 4 && (paginaActual + 1) * preguntasPorPagina < preguntas.length) {
        paginaActual++;
        mostrarPreguntas();
        return;
    }

    // Avanzar al siguiente paso
    if (currentStep < 6) {
        currentStep++;
        // Resetear paginación si salimos del paso de preguntas
        if (currentStep !== 4) {
            paginaActual = 0;
        }
        updateForm();
    } else {
        // Aquí iría la lógica para enviar el formulario
        alert('Formulario enviado correctamente. No olvide imprimir su comprobante.');
    }
});

prevBtn.addEventListener('click', () => {
    // Si estamos en el paso de preguntas y hay páginas anteriores
    if (currentStep === 4 && paginaActual > 0) {
        paginaActual--;
        mostrarPreguntas();
        return;
    }

    // Retroceder al paso anterior
    if (currentStep > 0) {
        currentStep--;
        // Resetear la página de preguntas cuando retrocedemos al paso anterior
        if (currentStep === 4) {
            paginaActual = 0;
        }
        updateForm();
    }
});

// Inicializar formulario cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    updateForm();
    setupConditionalFields();

    // Agregar event listeners para los botones de impresión y envío
    const imprimirBtn = document.getElementById('imprimirBtn');
    const enviarBtn = document.getElementById('enviarBtn');

    if (imprimirBtn) {
        imprimirBtn.addEventListener('click', imprimirComprobante);
    }

    if (enviarBtn) {
        enviarBtn.addEventListener('click', function () {
            alert('Formulario enviado correctamente. No olvide imprimir su comprobante.');
        });
    }
});

// Funcionalidad para tipos de violencia interactivos
function setupViolenciaInteractiva() {
    const botonesViolencia = document.querySelectorAll('.violencia-btn');
    const contenedorOpciones = document.getElementById('opciones-violencia-container');
    const tiposSeleccionados = new Set();

    // Limpiar selecciones previas y resetear botones al entrar
    contenedorOpciones.innerHTML = '';
    botonesViolencia.forEach(boton => {
        boton.classList.remove('border-blue-500', 'bg-blue-50', 'border-2');
        boton.classList.add('border-gray-300');
    });

    // Definir las opciones para cada tipo de violencia
    const opcionesViolencia = {
        fisica: [
            { value: 'golpes', label: 'Golpes' },
            { value: 'lesiones', label: 'Lesiones' },
            { value: 'lesiones_arma_fuego', label: 'Lesiones con arma de fuego' },
            { value: 'lesiones_arma_blanca', label: 'Lesiones con arma blanca' },
            { value: 'lesiones_arma_contundente', label: 'Lesiones con arma contundente' },
            { value: 'mordidas', label: 'Mordidas' },
            { value: 'quemaduras', label: 'Quemaduras' },
            { value: 'bofetada', label: 'Bofetada' },
            { value: 'arañazos', label: 'Lo araño únicamente' },
            { value: 'otras_fisica', label: 'Otras', conInput: true, placeholder: 'Especifique otras formas de violencia física' }
        ],
        psicologica: [
            { value: 'gritos_insultos', label: 'Gritos o insultos' },
            { value: 'abandono_afectivo', label: 'Abandono afectivo' },
            { value: 'amenaza_abandono', label: 'Amenaza de abandono' },
            { value: 'amenaza_quitar_hijos', label: 'Amenaza de quitarle los hijos' },
            { value: 'humillacion', label: 'Humillación' },
            { value: 'culpabilizar', label: 'Culpabilizar' },
            { value: 'marginar_ignorar', label: 'Marginar o ignorar' },
            { value: 'restriccion_libertad', label: 'Restricción de la libertad' },
            { value: 'desamparo', label: 'Desamparo' },
            { value: 'otras_psicologica', label: 'Otras', conInput: true, placeholder: 'Especifique otras formas de violencia psicológica' }
        ],
        sexual: [
            { value: 'presenciar_actos', label: 'Obligada/o a presenciar actos sexuales' },
            { value: 'tocamientos_contactos', label: 'Obligada a tocamientos y contactos indeseados' },
            { value: 'contacto_presencia_hijos', label: 'Obligada/o a contacto sexual en presencia de hijos o dependientes' },
            { value: 'contacto_enferma', label: 'Obligada a contacto sexual estando enferma/o' },
            { value: 'contacto_otras_personas', label: 'Obliga a contacto sexual con otras personas' },
            { value: 'violacion', label: 'Violación' },
            { value: 'resistencia_relaciones', label: 'Resistencia a relaciones sexuales' },
            { value: 'otras_sexual', label: 'Otras agresiones sexuales', conInput: true, placeholder: 'Especifique otras agresiones sexuales' }
        ],
        patrimonial: [
            { value: 'sustraccion_valores', label: 'Sustracción de valores' },
            { value: 'destruccion_bienes', label: 'Destrucción de objetos de valor' },
            { value: 'apropiacion_bienes', label: 'Apropiación de bienes' },
            { value: 'violencia_economica', label: 'Violencia económica' },
            { value: 'abandono_alimentario', label: 'Abandono alimentario' },
            { value: 'no_atencion_medica', label: 'No lleva atención médica' },
            { value: 'abandono_negligencia', label: 'Abandono o negligencia' },
            { value: 'abandono_educativo', label: 'Abandono educativo' }
        ]
    };

    // Función para mostrar las opciones de un tipo de violencia
    function mostrarOpciones(tipo) {
        if (tiposSeleccionados.has(tipo)) return; // Ya está mostrado

        tiposSeleccionados.add(tipo);

        const opciones = opcionesViolencia[tipo];
        const titulo = tipo === 'fisica' ? 'A. Física' :
            tipo === 'psicologica' ? 'B. Psicológica' :
                tipo === 'sexual' ? 'C. Sexual' : 'D. Patrimonial';

        const opcionesHTML = `
      <div class="p-4 border border-gray-300 rounded-lg bg-white" data-tipo="${tipo}">
        <div class="flex justify-between items-center mb-3">
          <h4 class="font-semibold text-gray-800">${titulo}</h4>
          <button type="button" class="cerrar-opciones text-red-600 hover:text-red-800" data-tipo="${tipo}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${opciones.map(opcion => `
            <label class="flex items-center space-x-2">
              <input type="checkbox" name="violencia_${tipo}" value="${opcion.value}" class="text-blue-600">
              <span class="text-sm">${opcion.label}</span>
              ${opcion.conInput ? `
                <input type="text" placeholder="${opcion.placeholder}" class="border border-gray-300 rounded-lg p-1 text-sm flex-1" style="display: none;">
              ` : ''}
            </label>
          `).join('')}
        </div>
      </div>
    `;

        contenedorOpciones.insertAdjacentHTML('beforeend', opcionesHTML);

        // Agregar evento para mostrar/ocultar input cuando se selecciona "Otras"
        const inputsOtras = contenedorOpciones.querySelectorAll(`[data-tipo="${tipo}"] input[type="checkbox"]`);
        inputsOtras.forEach(input => {
            input.addEventListener('change', function () {
                if (this.value.includes('otras_') && this.checked) {
                    const inputText = this.parentNode.querySelector('input[type="text"]');
                    if (inputText) inputText.style.display = 'block';
                } else if (this.value.includes('otras_') && !this.checked) {
                    const inputText = this.parentNode.querySelector('input[type="text"]');
                    if (inputText) {
                        inputText.style.display = 'none';
                        inputText.value = '';
                    }
                }
            });
        });
    }

    // Función para ocultar opciones
    function ocultarOpciones(tipo) {
        const elemento = contenedorOpciones.querySelector(`[data-tipo="${tipo}"]`);
        if (elemento) {
            elemento.remove();
            tiposSeleccionados.delete(tipo);

            // Resetear el botón
            const boton = document.querySelector(`.violencia-btn[data-tipo="${tipo}"]`);
            if (boton) {
                boton.classList.remove('border-blue-500', 'bg-blue-50', 'border-2');
                boton.classList.add('border-gray-300');
            }
        }
    }

    // Event listeners para los botones
    botonesViolencia.forEach(boton => {
        boton.addEventListener('click', function () {
            const tipo = this.getAttribute('data-tipo');

            if (tiposSeleccionados.has(tipo)) {
                // Si ya está seleccionado, lo quitamos
                ocultarOpciones(tipo);
            } else {
                // Si no está seleccionado, lo agregamos
                mostrarOpciones(tipo);
                this.classList.remove('border-gray-300');
                this.classList.add('border-blue-500', 'bg-blue-50', 'border-2');
            }
        });
    });

    // Event listener para botones de cerrar
    contenedorOpciones.addEventListener('click', function (e) {
        if (e.target.closest('.cerrar-opciones')) {
            const tipo = e.target.closest('.cerrar-opciones').getAttribute('data-tipo');
            ocultarOpciones(tipo);
        }
    });
}