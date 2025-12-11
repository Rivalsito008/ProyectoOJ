// JS/form.js - Código JavaScript completo para el formulario adaptado a 7 pasos

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

// Variables globales
const steps = document.querySelectorAll('.step');
const progressBar = document.getElementById('progressBar');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let currentStep = 0;
const totalSteps = steps.length; // Ahora son 7 pasos

// Preguntas del cuestionario (las mismas que antes)
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

// Función para manejar campos condicionales del nuevo formulario
function setupConditionalFields() {
    // Función genérica para manejar campos condicionales basados en selecciones
    function setupConditionalSelect(selectId, containerId) {
        const select = document.getElementById(selectId);
        const container = document.getElementById(containerId);
        
        if (select && container) {
            select.addEventListener('change', function() {
                if (this.value === 'si') {
                    container.classList.remove('hidden');
                } else {
                    container.classList.add('hidden');
                }
            });
        }
    }

    // Función genérica para manejar campos condicionales basados en radios
    function setupConditionalRadio(radioName, containerId) {
        const radios = document.querySelectorAll(`input[name="${radioName}"]`);
        const container = document.getElementById(containerId);
        
        if (radios.length > 0 && container) {
            radios.forEach(radio => {
                radio.addEventListener('change', function() {
                    if (this.value === 'si') {
                        container.classList.remove('hidden');
                    } else {
                        container.classList.add('hidden');
                    }
                });
            });
        }
    }

    // Función para manejar campos "Otro" con input
    function setupOtherInput(selectId, inputId) {
        const select = document.getElementById(selectId);
        const input = document.getElementById(inputId);
        
        if (select && input) {
            select.addEventListener('change', function() {
                if (this.value === 'other') {
                    input.style.display = 'block';
                } else {
                    input.style.display = 'none';
                    input.value = '';
                }
            });
        }
    }

    // Función para manejar checkboxes "Otro" con input
    function setupOtherCheckbox(checkboxId, inputId) {
        const checkbox = document.getElementById(checkboxId);
        const input = document.getElementById(inputId);
        
        if (checkbox && input) {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    input.style.display = 'block';
                } else {
                    input.style.display = 'none';
                    input.value = '';
                }
            });
        }
    }

    // ===== DATOS DEL DENUNCIANTE =====
    
    // Nacionalidad - otro
    setupOtherInput('denuncianteNacionalidad', 'denuncianteOtraNacionalidad');
    
    // Estado familiar - mostrar nombre cónyuge
    const denuncianteEstadoFamiliar = document.getElementById('denuncianteEstadoFamiliar');
    const denuncianteNombreConyugeContainer = document.getElementById('denuncianteNombreConyugeContainer');
    if (denuncianteEstadoFamiliar && denuncianteNombreConyugeContainer) {
        denuncianteEstadoFamiliar.addEventListener('change', function() {
            if (this.value === 'casado' || this.value === 'union_libre') {
                denuncianteNombreConyugeContainer.style.display = 'block';
            } else {
                denuncianteNombreConyugeContainer.style.display = 'none';
            }
        });
    }

    // Lógica trabajo
    const denuncianteNoTrabajo = document.getElementById('denuncianteNoTrabajo');
    const denuncianteTrabajoEnCasa = document.getElementById('denuncianteTrabajoEnCasa');
    const denuncianteDireccionTrabajoContainer = document.getElementById('denuncianteDireccionTrabajoContainer');
    
    if (denuncianteNoTrabajo && denuncianteTrabajoEnCasa && denuncianteDireccionTrabajoContainer) {
        function actualizarCamposTrabajoDenunciante() {
            if (denuncianteNoTrabajo.checked) {
                denuncianteDireccionTrabajoContainer.style.display = 'none';
            } else if (denuncianteTrabajoEnCasa.checked) {
                denuncianteDireccionTrabajoContainer.style.display = 'none';
            } else {
                denuncianteDireccionTrabajoContainer.style.display = 'block';
            }
        }
        
        denuncianteNoTrabajo.addEventListener('change', function() {
            if (this.checked) {
                denuncianteTrabajoEnCasa.checked = false;
            }
            actualizarCamposTrabajoDenunciante();
        });
        
        denuncianteTrabajoEnCasa.addEventListener('change', function() {
            if (this.checked) {
                denuncianteNoTrabajo.checked = false;
            }
            actualizarCamposTrabajoDenunciante();
        });
    }

    // Cantidad de víctimas
    const denuncianteCantidadVictimas = document.getElementById('denuncianteCantidadVictimas');
    const denuncianteMultipleVictimasContainer = document.getElementById('denuncianteMultipleVictimasContainer');
    if (denuncianteCantidadVictimas && denuncianteMultipleVictimasContainer) {
        denuncianteCantidadVictimas.addEventListener('change', function() {
            const cantidad = parseInt(this.value);
            if (cantidad > 1) {
                denuncianteMultipleVictimasContainer.classList.remove('hidden');
            } else {
                denuncianteMultipleVictimasContainer.classList.add('hidden');
            }
        });
    }

    // ===== DATOS DE LA VÍCTIMA =====
    
    // Nacionalidad - otro
    setupOtherInput('victimaNacionalidad', 'victimaOtraNacionalidad');
    
    // Estado familiar
    const victimaEstadoFamiliar = document.getElementById('victimaEstadoFamiliar');
    const victimaNombreConyugeContainer = document.getElementById('victimaNombreConyugeContainer');
    if (victimaEstadoFamiliar && victimaNombreConyugeContainer) {
        victimaEstadoFamiliar.addEventListener('change', function() {
            if (this.value === 'casado' || this.value === 'union_libre') {
                victimaNombreConyugeContainer.style.display = 'block';
            } else {
                victimaNombreConyugeContainer.style.display = 'none';
            }
        });
    }

    // Lógica trabajo víctima
    const victimaNoTrabajo = document.getElementById('victimaNoTrabajo');
    const victimaTrabajoEnCasa = document.getElementById('victimaTrabajoEnCasa');
    const victimaDireccionTrabajoContainer = document.getElementById('victimaDireccionTrabajoContainer');
    
    if (victimaNoTrabajo && victimaTrabajoEnCasa && victimaDireccionTrabajoContainer) {
        function actualizarCamposTrabajoVictima() {
            if (victimaNoTrabajo.checked) {
                victimaDireccionTrabajoContainer.style.display = 'none';
            } else if (victimaTrabajoEnCasa.checked) {
                victimaDireccionTrabajoContainer.style.display = 'none';
            } else {
                victimaDireccionTrabajoContainer.style.display = 'block';
            }
        }
        
        victimaNoTrabajo.addEventListener('change', function() {
            if (this.checked) {
                victimaTrabajoEnCasa.checked = false;
            }
            actualizarCamposTrabajoVictima();
        });
        
        victimaTrabajoEnCasa.addEventListener('change', function() {
            if (this.checked) {
                victimaNoTrabajo.checked = false;
            }
            actualizarCamposTrabajoVictima();
        });
    }

    // Datos familiares - hijos
    const victimaCantidadHijos = document.getElementById('victimaCantidadHijos');
    const victimaDatosHijosContainer = document.getElementById('victimaDatosHijosContainer');
    if (victimaCantidadHijos && victimaDatosHijosContainer) {
        victimaCantidadHijos.addEventListener('change', function() {
            const cantidad = parseInt(this.value);
            if (cantidad > 0) {
                victimaDatosHijosContainer.classList.remove('hidden');
            } else {
                victimaDatosHijosContainer.classList.add('hidden');
            }
        });
    }

    // Datos económicos
    setupConditionalRadio('victimaGeneraIngreso', 'victimaSiIngresoContainer');
    setupConditionalRadio('victimaGeneraIngreso', 'victimaNoIngresoContainer');
    setupOtherInput('victimaTipoIngresos', 'victimaOtroTipoIngreso');
    setupOtherInput('victimaDependenciaEconomica', 'victimaOtroDependencia');
    setupOtherInput('victimaRelacionDependencia', 'victimaOtroRelacion');

    // Otros datos especiales
    setupConditionalRadio('victimaLesiones', 'victimaLesionesContainer');
    setupConditionalRadio('victimaHospitalizaciones', 'victimaHospitalizacionesContainer');
    setupConditionalRadio('victimaAtencionesMedicas', 'victimaAtencionesContainer');
    
    // Alerta para lesiones graves
    const victimaNivelLesion = document.getElementById('victimaNivelLesion');
    const victimaAlertaLesionGrave = document.getElementById('victimaAlertaLesionGrave');
    if (victimaNivelLesion && victimaAlertaLesionGrave) {
        victimaNivelLesion.addEventListener('change', function() {
            if (this.value === 'Grave') {
                victimaAlertaLesionGrave.classList.remove('hidden');
            } else {
                victimaAlertaLesionGrave.classList.add('hidden');
            }
        });
    }

    // ===== DATOS SOBRE HECHOS =====
    setupOtherCheckbox('entornoOtraCheck', 'entornoOtraTexto');
    setupOtherInput('lugarHecho', 'lugarHechoOtro');
    setupOtherInput('frecuenciaAgresiones', 'otraFrecuencia');

    // ===== DATOS DEL AGRESOR =====
    
    // Nacionalidad - otro
    setupOtherInput('agresorNacionalidad', 'agresorOtraNacionalidad');
    
    // Estado familiar
    const agresorEstadoFamiliar = document.getElementById('agresorEstadoFamiliar');
    const agresorNombreConyugeContainer = document.getElementById('agresorNombreConyugeContainer');
    if (agresorEstadoFamiliar && agresorNombreConyugeContainer) {
        agresorEstadoFamiliar.addEventListener('change', function() {
            if (this.value === 'casado' || this.value === 'union_libre') {
                agresorNombreConyugeContainer.style.display = 'block';
            } else {
                agresorNombreConyugeContainer.style.display = 'none';
            }
        });
    }

    // Lógica trabajo agresor
    const agresorNoTrabajo = document.getElementById('agresorNoTrabajo');
    const agresorTrabajoEnCasa = document.getElementById('agresorTrabajoEnCasa');
    const agresorDireccionTrabajoContainer = document.getElementById('agresorDireccionTrabajoContainer');
    
    if (agresorNoTrabajo && agresorTrabajoEnCasa && agresorDireccionTrabajoContainer) {
        function actualizarCamposTrabajoAgresor() {
            if (agresorNoTrabajo.checked) {
                agresorDireccionTrabajoContainer.style.display = 'none';
            } else if (agresorTrabajoEnCasa.checked) {
                agresorDireccionTrabajoContainer.style.display = 'none';
            } else {
                agresorDireccionTrabajoContainer.style.display = 'block';
            }
        }
        
        agresorNoTrabajo.addEventListener('change', function() {
            if (this.checked) {
                agresorTrabajoEnCasa.checked = false;
            }
            actualizarCamposTrabajoAgresor();
        });
        
        agresorTrabajoEnCasa.addEventListener('change', function() {
            if (this.checked) {
                agresorNoTrabajo.checked = false;
            }
            actualizarCamposTrabajoAgresor();
        });
    }

    // Datos adicionales agresor
    setupConditionalSelect('agresorConsumoAlcohol', 'agresorFrecuenciaAlcoholContainer');
    setupConditionalSelect('agresorConsumoDrogas', 'agresorFrecuenciaDrogasContainer');
    setupConditionalSelect('agresorPoseeArmas', 'agresorTipoArmasContainer');
    setupConditionalSelect('agresorFormacionEspecial', 'agresorTipoFormacionContainer');
    setupConditionalSelect('agresorPoseeDiscapacidad', 'agresorTipoDiscapacidadContainer');
    
    setupOtherInput('agresorTipoArmas', 'agresorOtroTipoArma');
    setupOtherInput('agresorTipoFormacion', 'agresorOtroTipoFormacion');
    setupOtherCheckbox('agresorDiscapacidadOtraCheck', 'agresorDiscapacidadOtraTexto');

    // Cantidad de agresores
    const cantidadAgresores = document.getElementById('cantidadAgresores');
    const multipleAgresoresContainer = document.getElementById('multipleAgresoresContainer');
    if (cantidadAgresores && multipleAgresoresContainer) {
        cantidadAgresores.addEventListener('change', function() {
            const cantidad = parseInt(this.value);
            if (cantidad > 1) {
                multipleAgresoresContainer.classList.remove('hidden');
            } else {
                multipleAgresoresContainer.classList.add('hidden');
            }
        });
    }

    // ===== CÁLCULO DE EDADES =====
    
    // Configurar cálculo de edad para denunciante
    const denuncianteFechaNacimiento = document.getElementById('denuncianteFechaNacimiento');
    const denuncianteEdad = document.getElementById('denuncianteEdad');
    const denuncianteCalcularBtn = document.getElementById('denuncianteCalcularEdad');
    
    if (denuncianteFechaNacimiento && denuncianteEdad && denuncianteCalcularBtn) {
        function calcularEdadDenunciante() {
            if (denuncianteFechaNacimiento.value) {
                const fechaNac = new Date(denuncianteFechaNacimiento.value);
                const hoy = new Date();
                let edad = hoy.getFullYear() - fechaNac.getFullYear();
                const mes = hoy.getMonth() - fechaNac.getMonth();
                
                if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
                    edad--;
                }
                
                denuncianteEdad.value = edad;
            }
        }
        
        denuncianteFechaNacimiento.addEventListener('change', calcularEdadDenunciante);
        denuncianteCalcularBtn.addEventListener('click', calcularEdadDenunciante);
    }

    // Configurar cálculo de edad para víctima
    const victimaFechaNacimiento = document.getElementById('victimaFechaNacimiento');
    const victimaEdad = document.getElementById('victimaEdad');
    const victimaCalcularBtn = document.getElementById('victimaCalcularEdad');
    
    if (victimaFechaNacimiento && victimaEdad && victimaCalcularBtn) {
        function calcularEdadVictima() {
            if (victimaFechaNacimiento.value) {
                const fechaNac = new Date(victimaFechaNacimiento.value);
                const hoy = new Date();
                let edad = hoy.getFullYear() - fechaNac.getFullYear();
                const mes = hoy.getMonth() - fechaNac.getMonth();
                
                if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
                    edad--;
                }
                
                victimaEdad.value = edad;
            }
        }
        
        victimaFechaNacimiento.addEventListener('change', calcularEdadVictima);
        victimaCalcularBtn.addEventListener('click', calcularEdadVictima);
    }

    // Configurar cálculo de edad para agresor
    const agresorFechaNacimiento = document.getElementById('agresorFechaNacimiento');
    const agresorEdad = document.getElementById('agresorEdad');
    const agresorCalcularBtn = document.getElementById('agresorCalcularEdad');
    
    if (agresorFechaNacimiento && agresorEdad && agresorCalcularBtn) {
        function calcularEdadAgresor() {
            if (agresorFechaNacimiento.value) {
                const fechaNac = new Date(agresorFechaNacimiento.value);
                const hoy = new Date();
                let edad = hoy.getFullYear() - fechaNac.getFullYear();
                const mes = hoy.getMonth() - fechaNac.getMonth();
                
                if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
                    edad--;
                }
                
                agresorEdad.value = edad;
            }
        }
        
        agresorFechaNacimiento.addEventListener('change', calcularEdadAgresor);
        agresorCalcularBtn.addEventListener('click', calcularEdadAgresor);
    }

    // ===== SISTEMA DE TELÉFONOS =====
    
    // Función para agregar teléfonos
    function setupTelefonoSystem(agregarBtnId, listaId) {
        const agregarBtn = document.getElementById(agregarBtnId);
        const lista = document.getElementById(listaId);
        
        if (agregarBtn && lista) {
            agregarBtn.addEventListener('click', function() {
                const nuevoTelefono = document.createElement('div');
                nuevoTelefono.className = 'flex gap-2 items-center';
                nuevoTelefono.innerHTML = `
                    <input type="tel" placeholder="Número de teléfono" class="border border-gray-300 rounded-lg p-3 flex-grow focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <select class="border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                        <option value="personal">Personal</option>
                        <option value="trabajo">Trabajo</option>
                        <option value="casa">Casa</option>
                        <option value="otro">Otro</option>
                    </select>
                    <button type="button" class="text-red-500 hover:text-red-700 eliminar-telefono">✕</button>
                `;
                lista.appendChild(nuevoTelefono);
            });
        }
    }

    // Configurar sistemas de teléfonos
    setupTelefonoSystem('denuncianteAgregarTelefono', 'denuncianteTelefonosLista');
    setupTelefonoSystem('victimaAgregarTelefono', 'victimaTelefonosLista');
    setupTelefonoSystem('agresorAgregarTelefono', 'agresorTelefonosLista');

    // Event delegation para eliminar teléfonos
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('eliminar-telefono')) {
            const telefonoDiv = e.target.parentElement;
            if (telefonoDiv.parentElement.children.length > 1) {
                telefonoDiv.remove();
            }
        }
    });

    // ===== CKEDITOR PARA RELACIÓN DE HECHOS =====
    
    // Inicializar CKEditor si está disponible
    if (typeof ClassicEditor !== 'undefined') {
        ClassicEditor
            .create(document.querySelector('#editor-container'), {
                toolbar: {
                    items: [
                        'heading', '|',
                        'bold', 'italic', 'underline', '|',
                        'alignment', '|',
                        'numberedList', 'bulletedList', '|',
                        'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', '|',
                        'link', 'insertTable', '|',
                        'undo', 'redo', '|',
                        'sourceEditing'
                    ]
                },
                language: 'es',
                licenseKey: '',
            })
            .then(editor => {
                window.editor = editor;
                
                // Botón para generar texto automático
                const generarTextoBtn = document.getElementById('generarTextoBtn');
                if (generarTextoBtn) {
                    generarTextoBtn.addEventListener('click', function() {
                        const denuncianteNombre = document.getElementById('denuncianteNombre')?.value || '[Nombre del denunciante]';
                        const esVictima = document.querySelector('input[name="denuncianteEsVictima"]:checked')?.value;
                        
                        let textoBase = '';
                        
                        if (esVictima === 'si') {
                            textoBase = `La señora/or ${denuncianteNombre} en su calidad de víctima en este caso y de generales antes expresada en este documento, habiendo sido informado sobre los derechos y obligaciones que le asisten, de forma libre expresa que...<br><br>`;
                        } else {
                            textoBase = `La señora/or ${denuncianteNombre} en su calidad de denunciante y de generales antes expresada en este documento, habiendo sido informado sobre los derechos y obligaciones que le asisten, de forma libre expresa que...<br><br>`;
                        }
                        
                        editor.setData(textoBase);
                        
                        // Mostrar en previsualización
                        const previewRelacion = document.getElementById('previewRelacion');
                        if (previewRelacion) {
                            previewRelacion.innerHTML = textoBase;
                        }
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
}

function mostrarPreguntas() {
    const preguntasForm = document.getElementById('preguntasForm');
    if (!preguntasForm) return;
    
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

    // Obtener datos por ID (nuevos IDs del formulario actualizado)
    const nombreDenunciante = document.getElementById('denuncianteNombre')?.value || 'No especificado';
    const nombreVictima = document.getElementById('victimaNombre')?.value || 'No especificado';
    const nombreAgresor = document.getElementById('agresorNombre')?.value || 'No especificado';

    const preguntasRespondidas = document.querySelectorAll('input[type="radio"]:checked').length;

    // Actualizar comprobante
    const printCaso = document.getElementById('printCaso');
    const printFecha = document.getElementById('printFecha');
    const printDenunciante = document.getElementById('printDenunciante');
    const printVictima = document.getElementById('printVictima');
    const printAgresor = document.getElementById('printAgresor');
    const printPreguntas = document.getElementById('printPreguntas');

    if (printCaso) printCaso.textContent = numeroCaso;
    if (printFecha) printFecha.textContent = formatearFecha(fechaActual);
    if (printDenunciante) printDenunciante.textContent = nombreDenunciante;
    if (printVictima) printVictima.textContent = nombreVictima;
    if (printAgresor) printAgresor.textContent = nombreAgresor;
    if (printPreguntas) printPreguntas.textContent = `${preguntasRespondidas} de ${preguntas.length} preguntas respondidas`;
}

function actualizarResumen() {
    // Actualizar los datos del comprobante primero
    actualizarDatosComprobante();

    // Luego copiar los mismos datos al resumen
    const resumenDenunciante = document.getElementById('resumenDenunciante');
    const resumenVictima = document.getElementById('resumenVictima');
    const resumenAgresor = document.getElementById('resumenAgresor');
    const resumenPreguntas = document.getElementById('resumenPreguntas');
    const resumenFecha = document.getElementById('resumenFecha');
    const resumenCaso = document.getElementById('resumenCaso');

    if (resumenDenunciante) resumenDenunciante.textContent = document.getElementById('printDenunciante')?.textContent || '-';
    if (resumenVictima) resumenVictima.textContent = document.getElementById('printVictima')?.textContent || '-';
    if (resumenAgresor) resumenAgresor.textContent = document.getElementById('printAgresor')?.textContent || '-';
    if (resumenPreguntas) resumenPreguntas.textContent = document.getElementById('printPreguntas')?.textContent || '-';
    if (resumenFecha) resumenFecha.textContent = document.getElementById('printFecha')?.textContent || '-';
    if (resumenCaso) resumenCaso.textContent = document.getElementById('printCaso')?.textContent || '-';
}

// Función para imprimir comprobante
function imprimirComprobante() {
    // Actualizar los datos JUSTO ANTES de imprimir
    actualizarDatosComprobante();

    const elementoOriginal = document.getElementById('comprobante');
    if (!elementoOriginal) return;

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
    // Ocultar todos los pasos y mostrar solo el actual
    steps.forEach((step, index) => {
        step.classList.toggle('hidden', index !== currentStep);
    });

    // Actualizar barra de progreso (7 pasos totales)
    progressBar.style.width = `${((currentStep + 1) / totalSteps) * 100}%`;

    // Si estamos en el paso de preguntas, cargarlas
    if (currentStep === 5) { // Ahora es el paso 6 (índice 5) - Cuestionario
        mostrarPreguntas();
    }

    // Si estamos en el paso de confirmación, actualizar resumen
    if (currentStep === 6) { // Ahora es el paso 7 (índice 6) - Confirmación
        actualizarResumen();
    }

    // Configurar campos condicionales cada vez que cambiamos de paso
    setTimeout(setupConditionalFields, 100);

    // Mostrar/ocultar botones según el paso
    prevBtn.classList.toggle('hidden', currentStep === 0);

    // Actualizar texto del botón siguiente
    if (currentStep === totalSteps - 1) { // Último paso
        nextBtn.textContent = 'Enviar Formulario';
        nextBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        nextBtn.classList.add('bg-green-600', 'hover:bg-green-700');
    } else if (currentStep === 5) { // Paso de preguntas (índice 5)
        nextBtn.textContent = (paginaActual + 1) * preguntasPorPagina >= preguntas.length
            ? 'Siguiente'
            : 'Siguiente Preguntas';
        nextBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
        nextBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
    } else {
        nextBtn.textContent = 'Siguiente';
        nextBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
        nextBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
    }
}

nextBtn.addEventListener('click', () => {
    // Si estamos en el paso de preguntas y hay más páginas
    if (currentStep === 5 && (paginaActual + 1) * preguntasPorPagina < preguntas.length) {
        paginaActual++;
        mostrarPreguntas();
        return;
    }

    // Avanzar al siguiente paso
    if (currentStep < totalSteps - 1) {
        currentStep++;
        // Resetear paginación si salimos del paso de preguntas
        if (currentStep !== 5) {
            paginaActual = 0;
        }
        updateForm();
    } else {
        // Aquí iría la lógica para enviar el formulario
        alert('Formulario enviado correctamente. No olvide imprimir su comprobante.');
        // Podrías agregar aquí el envío real del formulario
        // document.getElementById('multiStepForm').submit();
    }
});

prevBtn.addEventListener('click', () => {
    // Si estamos en el paso de preguntas y hay páginas anteriores
    if (currentStep === 5 && paginaActual > 0) {
        paginaActual--;
        mostrarPreguntas();
        return;
    }

    // Retroceder al paso anterior
    if (currentStep > 0) {
        currentStep--;
        // Resetear la página de preguntas cuando retrocedemos al paso anterior
        if (currentStep === 5) {
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

    if (imprimirBtn) {
        imprimirBtn.addEventListener('click', imprimirComprobante);
    }
});