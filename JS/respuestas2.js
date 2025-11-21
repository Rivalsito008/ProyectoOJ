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
})();


// Tab functionality
const browserTabs = document.querySelectorAll('.browser-tab');
const tabContents = document.querySelectorAll('.tab-content');

browserTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');

        browserTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        const targetContent = document.getElementById(tabName);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});


// Detectar cambios en preferencia de sistema (para modo auto)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const temaActual = localStorage.getItem('theme-preference') || 'auto';
    if (temaActual === 'auto') {
        const nuevoTema = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', nuevoTema);
    }
});


/* Contenido de la tablas */
// JS/respuestas.js
// JS/respuestas.js

const victimas = [
    {
        nombre: "Juan Pérez",
        riesgo: "Bajo",
        estado: "Activo",
        fecha: "2025-11-15",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas verbales?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 5: ¿Recibe insultos frecuentes?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 6: ¿Le han destruido propiedades?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 7: ¿Le vigilan sus movimientos?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 8: ¿Recibe mensajes acosadores?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 9: ¿Ha cambiado su rutina por miedo?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 10: ¿Siente que su privacidad es invadida?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 11: ¿Le controlan sus amistades?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 12: ¿Le critican constantemente?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 13: ¿Le hacen sentir inferior?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 14: ¿Le humillan en público?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 15: ¿Le ignoran o le hacen el vacío?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 16: ¿Le culpan de todo lo que sale mal?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 17: ¿Existe violencia psicológica constante?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 18: ¿Hay control económico?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 19: ¿Existe aislamiento social?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 20: ¿Le han impedido trabajar?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 21: ¿Le han quitado sus documentos?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 22: ¿Ha tenido lesiones visibles?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 23: ¿Ha necesitado atención médica?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 24: ¿No tiene acceso a sus cuentas?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 25: ¿Ha sufrido violencia sexual?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 26: ¿Ha habido intentos de suicidio?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 27: ¿Sufre de depresión severa?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 28: ¿Ha perdido el empleo por violencia?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 29: ¿Le han prohibido estudiar?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 30: ¿Hay hijos que han presenciado violencia?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 31: ¿Existe riesgo para los hijos?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 32: ¿Ha tenido que abandonar su hogar?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 33: ¿Existe riesgo de femicidio?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 34: ¿Hay armas en el hogar?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 35: ¿El agresor consume drogas?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 36: ¿Ha habido violencia durante el embarazo?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 37: ¿Ha habido estrangulamiento o asfixia?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 38: ¿Existe amenaza con arma de fuego?", respuesta: "No", nivel: "activador" }
        ]
    },
    {
        nombre: "María López",
        riesgo: "Moderado",
        estado: "Inactivo",
        fecha: "2025-10-20",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas verbales?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 5: ¿Recibe insultos frecuentes?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 6: ¿Le han destruido propiedades?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 7: ¿Le vigilan sus movimientos?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 8: ¿Recibe mensajes acosadores?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 9: ¿Ha cambiado su rutina por miedo?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 10: ¿Siente que su privacidad es invadida?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 11: ¿Le controlan sus amistades?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 12: ¿Le critican constantemente?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 13: ¿Le hacen sentir inferior?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 14: ¿Le humillan en público?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 15: ¿Le ignoran o le hacen el vacío?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 16: ¿Le culpan de todo lo que sale mal?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 17: ¿Existe violencia psicológica constante?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 18: ¿Hay control económico?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 19: ¿Existe aislamiento social?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 20: ¿Le han impedido trabajar?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 21: ¿Le han quitado sus documentos?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 22: ¿Ha tenido lesiones visibles?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 23: ¿Ha necesitado atención médica?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 24: ¿No tiene acceso a sus cuentas?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 25: ¿Ha sufrido violencia sexual?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 26: ¿Ha habido intentos de suicidio?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 27: ¿Sufre de depresión severa?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 28: ¿Ha perdido el empleo por violencia?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 29: ¿Le han prohibido estudiar?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 30: ¿Hay hijos que han presenciado violencia?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 31: ¿Existe riesgo para los hijos?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 32: ¿Ha tenido que abandonar su hogar?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 33: ¿Existe riesgo de femicidio?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 34: ¿Hay armas en el hogar?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 35: ¿El agresor consume drogas?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 36: ¿Ha habido violencia durante el embarazo?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 37: ¿Ha habido estrangulamiento o asfixia?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 38: ¿Existe amenaza con arma de fuego?", respuesta: "No", nivel: "activador" }
        ]
    },
    {
        nombre: "Carlos Martínez",
        riesgo: "Alto",
        estado: "Activo",
        fecha: "2025-09-12",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas verbales?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 5: ¿Recibe insultos frecuentes?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 6: ¿Le han destruido propiedades?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 7: ¿Le vigilan sus movimientos?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 8: ¿Recibe mensajes acosadores?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 9: ¿Ha cambiado su rutina por miedo?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 10: ¿Siente que su privacidad es invadida?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 11: ¿Le controlan sus amistades?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 12: ¿Le critican constantemente?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 13: ¿Le hacen sentir inferior?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 14: ¿Le humillan en público?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 15: ¿Le ignoran o le hacen el vacío?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 16: ¿Le culpan de todo lo que sale mal?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 17: ¿Existe violencia psicológica constante?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 18: ¿Hay control económico?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 19: ¿Existe aislamiento social?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 20: ¿Le han impedido trabajar?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 21: ¿Le han quitado sus documentos?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 22: ¿Ha tenido lesiones visibles?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 23: ¿Ha necesitado atención médica?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 24: ¿No tiene acceso a sus cuentas?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 25: ¿Ha sufrido violencia sexual?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 26: ¿Ha habido intentos de suicidio?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 27: ¿Sufre de depresión severa?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 28: ¿Ha perdido el empleo por violencia?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 29: ¿Le han prohibido estudiar?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 30: ¿Hay hijos que han presenciado violencia?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 31: ¿Existe riesgo para los hijos?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 32: ¿Ha tenido que abandonar su hogar?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 33: ¿Existe riesgo de femicidio?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 34: ¿Hay armas en el hogar?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 35: ¿El agresor consume drogas?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 36: ¿Ha habido violencia durante el embarazo?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 37: ¿Ha habido estrangulamiento o asfixia?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 38: ¿Existe amenaza con arma de fuego?", respuesta: "No", nivel: "activador" }
        ]
    },
    {
        nombre: "Ana González",
        riesgo: "Extremo",
        estado: "Activo",
        fecha: "2025-11-01",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas verbales?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 5: ¿Recibe insultos frecuentes?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 6: ¿Le han destruido propiedades?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 7: ¿Le vigilan sus movimientos?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 8: ¿Recibe mensajes acosadores?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 9: ¿Ha cambiado su rutina por miedo?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 10: ¿Siente que su privacidad es invadida?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 11: ¿Le controlan sus amistades?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 12: ¿Le critican constantemente?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 13: ¿Le hacen sentir inferior?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 14: ¿Le humillan en público?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 15: ¿Le ignoran o le hacen el vacío?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 16: ¿Le culpan de todo lo que sale mal?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 17: ¿Existe violencia psicológica constante?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 18: ¿Hay control económico?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 19: ¿Existe aislamiento social?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 20: ¿Le han impedido trabajar?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 21: ¿Le han quitado sus documentos?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 22: ¿Ha tenido lesiones visibles?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 23: ¿Ha necesitado atención médica?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 24: ¿No tiene acceso a sus cuentas?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 25: ¿Ha sufrido violencia sexual?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 26: ¿Ha habido intentos de suicidio?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 27: ¿Sufre de depresión severa?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 28: ¿Ha perdido el empleo por violencia?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 29: ¿Le han prohibido estudiar?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 30: ¿Hay hijos que han presenciado violencia?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 31: ¿Existe riesgo para los hijos?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 32: ¿Ha tenido que abandonar su hogar?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 33: ¿Existe riesgo de femicidio?", respuesta: "Sí", nivel: "extremo" },
            { pregunta: "Pregunta 34: ¿Hay armas en el hogar?", respuesta: "Sí", nivel: "extremo" },
            { pregunta: "Pregunta 35: ¿El agresor consume drogas?", respuesta: "Sí", nivel: "extremo" },
            { pregunta: "Pregunta 36: ¿Ha habido violencia durante el embarazo?", respuesta: "Sí", nivel: "extremo" },
            { pregunta: "Pregunta 37: ¿Ha habido estrangulamiento o asfixia?", respuesta: "Sí", nivel: "extremo" },
            { pregunta: "Pregunta 38: ¿Existe amenaza con arma de fuego?", respuesta: "Sí", nivel: "activador" }
        ]
    },
    {
        nombre: "Luis Hernández",
        riesgo: "Bajo",
        estado: "Inactivo",
        fecha: "2025-11-10",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas verbales?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 5: ¿Recibe insultos frecuentes?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 6: ¿Le han destruido propiedades?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 7: ¿Le vigilan sus movimientos?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 8: ¿Recibe mensajes acosadores?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 9: ¿Ha cambiado su rutina por miedo?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 10: ¿Siente que su privacidad es invadida?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 11: ¿Le controlan sus amistades?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 12: ¿Le critican constantemente?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 13: ¿Le hacen sentir inferior?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 14: ¿Le humillan en público?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 15: ¿Le ignoran o le hacen el vacío?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 16: ¿Le culpan de todo lo que sale mal?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 17: ¿Existe violencia psicológica constante?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 18: ¿Hay control económico?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 19: ¿Existe aislamiento social?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 20: ¿Le han impedido trabajar?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 21: ¿Le han quitado sus documentos?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 22: ¿Ha tenido lesiones visibles?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 23: ¿Ha necesitado atención médica?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 24: ¿No tiene acceso a sus cuentas?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 25: ¿Ha sufrido violencia sexual?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 26: ¿Ha habido intentos de suicidio?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 27: ¿Sufre de depresión severa?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 28: ¿Ha perdido el empleo por violencia?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 29: ¿Le han prohibido estudiar?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 30: ¿Hay hijos que han presenciado violencia?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 31: ¿Existe riesgo para los hijos?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 32: ¿Ha tenido que abandonar su hogar?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 33: ¿Existe riesgo de femicidio?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 34: ¿Hay armas en el hogar?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 35: ¿El agresor consume drogas?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 36: ¿Ha habido violencia durante el embarazo?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 37: ¿Ha habido estrangulamiento o asfixia?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 38: ¿Existe amenaza con arma de fuego?", respuesta: "No", nivel: "activador" }
        ]
    },
    {
        nombre: "Sofía Ramírez",
        riesgo: "Moderado",
        estado: "Activo",
        fecha: "2025-08-30",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas verbales?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 5: ¿Recibe insultos frecuentes?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 6: ¿Le han destruido propiedades?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 7: ¿Le vigilan sus movimientos?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 8: ¿Recibe mensajes acosadores?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 9: ¿Ha cambiado su rutina por miedo?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 10: ¿Siente que su privacidad es invadida?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 11: ¿Le controlan sus amistades?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 12: ¿Le critican constantemente?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 13: ¿Le hacen sentir inferior?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 14: ¿Le humillan en público?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 15: ¿Le ignoran o le hacen el vacío?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 16: ¿Le culpan de todo lo que sale mal?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 17: ¿Existe violencia psicológica constante?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 18: ¿Hay control económico?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 19: ¿Existe aislamiento social?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 20: ¿Le han impedido trabajar?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 21: ¿Le han quitado sus documentos?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 22: ¿Ha tenido lesiones visibles?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 23: ¿Ha necesitado atención médica?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 24: ¿No tiene acceso a sus cuentas?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 25: ¿Ha sufrido violencia sexual?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 26: ¿Ha habido intentos de suicidio?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 27: ¿Sufre de depresión severa?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 28: ¿Ha perdido el empleo por violencia?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 29: ¿Le han prohibido estudiar?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 30: ¿Hay hijos que han presenciado violencia?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 31: ¿Existe riesgo para los hijos?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 32: ¿Ha tenido que abandonar su hogar?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 33: ¿Existe riesgo de femicidio?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 34: ¿Hay armas en el hogar?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 35: ¿El agresor consume drogas?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 36: ¿Ha habido violencia durante el embarazo?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 37: ¿Ha habido estrangulamiento o asfixia?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 38: ¿Existe amenaza con arma de fuego?", respuesta: "No", nivel: "activador" }
        ]
    },
    {
        nombre: "Miguel Torres",
        riesgo: "Alto",
        estado: "Activo",
        fecha: "2025-10-05",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas verbales?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 5: ¿Recibe insultos frecuentes?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 6: ¿Le han destruido propiedades?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 7: ¿Le vigilan sus movimientos?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 8: ¿Recibe mensajes acosadores?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 9: ¿Ha cambiado su rutina por miedo?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 10: ¿Siente que su privacidad es invadida?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 11: ¿Le controlan sus amistades?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 12: ¿Le critican constantemente?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 13: ¿Le hacen sentir inferior?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 14: ¿Le humillan en público?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 15: ¿Le ignoran o le hacen el vacío?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 16: ¿Le culpan de todo lo que sale mal?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 17: ¿Existe violencia psicológica constante?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 18: ¿Hay control económico?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 19: ¿Existe aislamiento social?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 20: ¿Le han impedido trabajar?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 21: ¿Le han quitado sus documentos?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 22: ¿Ha tenido lesiones visibles?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 23: ¿Ha necesitado atención médica?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 24: ¿No tiene acceso a sus cuentas?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 25: ¿Ha sufrido violencia sexual?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 26: ¿Ha habido intentos de suicidio?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 27: ¿Sufre de depresión severa?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 28: ¿Ha perdido el empleo por violencia?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 29: ¿Le han prohibido estudiar?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 30: ¿Hay hijos que han presenciado violencia?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 31: ¿Existe riesgo para los hijos?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 32: ¿Ha tenido que abandonar su hogar?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 33: ¿Existe riesgo de femicidio?", respuesta: "Sí", nivel: "extremo" },
            { pregunta: "Pregunta 34: ¿Hay armas en el hogar?", respuesta: "Sí", nivel: "extremo" },
            { pregunta: "Pregunta 35: ¿El agresor consume drogas?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 36: ¿Ha habido violencia durante el embarazo?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 37: ¿Ha habido estrangulamiento o asfixia?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 38: ¿Existe amenaza con arma de fuego?", respuesta: "No", nivel: "activador" }
        ]
    },
    {
        nombre: "Lucía Fernández",
        riesgo: "Extremo",
        estado: "Inactivo",
        fecha: "2025-09-18",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas verbales?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 5: ¿Recibe insultos frecuentes?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 6: ¿Le han destruido propiedades?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 7: ¿Le vigilan sus movimientos?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 8: ¿Recibe mensajes acosadores?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 9: ¿Ha cambiado su rutina por miedo?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 10: ¿Siente que su privacidad es invadida?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 11: ¿Le controlan sus amistades?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 12: ¿Le critican constantemente?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 13: ¿Le hacen sentir inferior?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 14: ¿Le humillan en público?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 15: ¿Le ignoran o le hacen el vacío?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 16: ¿Le culpan de todo lo que sale mal?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 17: ¿Existe violencia psicológica constante?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 18: ¿Hay control económico?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 19: ¿Existe aislamiento social?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 20: ¿Le han impedido trabajar?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 21: ¿Le han quitado sus documentos?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 22: ¿Ha tenido lesiones visibles?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 23: ¿Ha necesitado atención médica?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 24: ¿No tiene acceso a sus cuentas?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 25: ¿Ha sufrido violencia sexual?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 26: ¿Ha habido intentos de suicidio?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 27: ¿Sufre de depresión severa?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 28: ¿Ha perdido el empleo por violencia?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 29: ¿Le han prohibido estudiar?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 30: ¿Hay hijos que han presenciado violencia?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 31: ¿Existe riesgo para los hijos?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 32: ¿Ha tenido que abandonar su hogar?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 33: ¿Existe riesgo de femicidio?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 34: ¿Hay armas en el hogar?", respuesta: "Sí", nivel: "extremo" },
            { pregunta: "Pregunta 35: ¿El agresor consume drogas?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 36: ¿Ha habido violencia durante el embarazo?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 37: ¿Ha habido estrangulamiento o asfixia?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 38: ¿Existe amenaza con arma de fuego?", respuesta: "No", nivel: "activador" }
        ]
    },
    {
        nombre: "Diego Rojas",
        riesgo: "Bajo",
        estado: "Activo",
        fecha: "2025-11-12",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas verbales?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 5: ¿Recibe insultos frecuentes?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 6: ¿Le han destruido propiedades?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 7: ¿Le vigilan sus movimientos?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 8: ¿Recibe mensajes acosadores?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 9: ¿Ha cambiado su rutina por miedo?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 10: ¿Siente que su privacidad es invadida?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 11: ¿Le controlan sus amistades?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 12: ¿Le critican constantemente?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 13: ¿Le hacen sentir inferior?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 14: ¿Le humillan en público?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 15: ¿Le ignoran o le hacen el vacío?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 16: ¿Le culpan de todo lo que sale mal?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 17: ¿Existe violencia psicológica constante?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 18: ¿Hay control económico?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 19: ¿Existe aislamiento social?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 20: ¿Le han impedido trabajar?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 21: ¿Le han quitado sus documentos?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 22: ¿Ha tenido lesiones visibles?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 23: ¿Ha necesitado atención médica?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 24: ¿No tiene acceso a sus cuentas?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 25: ¿Ha sufrido violencia sexual?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 26: ¿Ha habido intentos de suicidio?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 27: ¿Sufre de depresión severa?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 28: ¿Ha perdido el empleo por violencia?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 29: ¿Le han prohibido estudiar?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 30: ¿Hay hijos que han presenciado violencia?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 31: ¿Existe riesgo para los hijos?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 32: ¿Ha tenido que abandonar su hogar?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 33: ¿Existe riesgo de femicidio?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 34: ¿Hay armas en el hogar?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 35: ¿El agresor consume drogas?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 36: ¿Ha habido violencia durante el embarazo?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 37: ¿Ha habido estrangulamiento o asfixia?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 38: ¿Existe amenaza con arma de fuego?", respuesta: "No", nivel: "activador" }
        ]
    },
    {
        nombre: "Paula Vargas",
        riesgo: "Moderado",
        estado: "Inactivo",
        fecha: "2025-10-28",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas verbales?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 5: ¿Recibe insultos frecuentes?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 6: ¿Le han destruido propiedades?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 7: ¿Le vigilan sus movimientos?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 8: ¿Recibe mensajes acosadores?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 9: ¿Ha cambiado su rutina por miedo?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 10: ¿Siente que su privacidad es invadida?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 11: ¿Le controlan sus amistades?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 12: ¿Le critican constantemente?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 13: ¿Le hacen sentir inferior?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 14: ¿Le humillan en público?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 15: ¿Le ignoran o le hacen el vacío?", respuesta: "No", nivel: "bajo" },
            { pregunta: "Pregunta 16: ¿Le culpan de todo lo que sale mal?", respuesta: "Sí", nivel: "bajo" },
            { pregunta: "Pregunta 17: ¿Existe violencia psicológica constante?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 18: ¿Hay control económico?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 19: ¿Existe aislamiento social?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 20: ¿Le han impedido trabajar?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 21: ¿Le han quitado sus documentos?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 22: ¿Ha tenido lesiones visibles?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 23: ¿Ha necesitado atención médica?", respuesta: "Sí", nivel: "moderado" },
            { pregunta: "Pregunta 24: ¿No tiene acceso a sus cuentas?", respuesta: "No", nivel: "moderado" },
            { pregunta: "Pregunta 25: ¿Ha sufrido violencia sexual?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 26: ¿Ha habido intentos de suicidio?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 27: ¿Sufre de depresión severa?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 28: ¿Ha perdido el empleo por violencia?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 29: ¿Le han prohibido estudiar?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 30: ¿Hay hijos que han presenciado violencia?", respuesta: "Sí", nivel: "alto" },
            { pregunta: "Pregunta 31: ¿Existe riesgo para los hijos?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 32: ¿Ha tenido que abandonar su hogar?", respuesta: "No", nivel: "alto" },
            { pregunta: "Pregunta 33: ¿Existe riesgo de femicidio?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 34: ¿Hay armas en el hogar?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 35: ¿El agresor consume drogas?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 36: ¿Ha habido violencia durante el embarazo?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 37: ¿Ha habido estrangulamiento o asfixia?", respuesta: "No", nivel: "extremo" },
            { pregunta: "Pregunta 38: ¿Existe amenaza con arma de fuego?", respuesta: "No", nivel: "activador" }
        ]
    }
];

// Función para obtener color según riesgo
function colorRiesgo(riesgo) {
    switch (riesgo.toLowerCase()) {
        case "bajo": return "bg-green-500 text-white";
        case "moderado": return "bg-yellow-400 text-white";
        case "alto": return "bg-orange-500 text-white";
        case "extremo": return "bg-red-600 text-white";
        default: return "bg-gray-400 text-white";
    }
}

// Función para calcular puntos y determinar nivel de riesgo
function calcularRiesgo(respuestas) {
    let puntos = 0;
    let respuestasSi = 0;
    let activadorExtremo = false;

    // Puntos por nivel
    const puntosPorNivel = {
        "bajo": 1,
        "moderado": 2,
        "alto": 3,
        "extremo": 4,
        "activador": 0 // No suma puntos, activa nivel extremo directamente
    };

    // Contar respuestas "Sí" y calcular puntos
    respuestas.forEach(respuesta => {
        if (respuesta.respuesta === 'Sí') {
            respuestasSi++;

            // Verificar si es pregunta activadora
            if (respuesta.nivel === "activador") {
                activadorExtremo = true;
            } else {
                puntos += puntosPorNivel[respuesta.nivel] || 1;
            }
        }
    });

    // Determinar nivel de riesgo basado en puntos O activador
    // Nuevos rangos: Bajo (0-20), Moderado (21-40), Alto (41-60), Extremo (61-80) o Activador
    let nivelRiesgo;

    if (activadorExtremo) {
        nivelRiesgo = "Extremo";
    } else if (puntos >= 61) {
        nivelRiesgo = "Extremo";
    } else if (puntos >= 41) {
        nivelRiesgo = "Alto";
    } else if (puntos >= 21) {
        nivelRiesgo = "Moderado";
    } else {
        nivelRiesgo = "Bajo";
    }

    return {
        respuestasSi: respuestasSi,
        puntos: puntos,
        nivelRiesgo: nivelRiesgo,
        activadorExtremo: activadorExtremo
    };
}

// Puntos por nivel (debe estar disponible globalmente)
const puntosPorNivel = {
    "bajo": 1,
    "moderado": 2,
    "alto": 3,
    "extremo": 4,
    "activador": 0
};

// Función para abrir el modal
function abrirModal(victima) {
    const modal = document.getElementById('modalRespuestas');
    const modalContent = document.getElementById('modalContent');

    // Calcular riesgo basado en puntos
    const calculoRiesgo = calcularRiesgo(victima.respuestas);

    // Color según el riesgo
    const colorRiesgo = {
        "Bajo": "bg-green-500",
        "Moderado": "bg-yellow-500",
        "Alto": "bg-orange-500",
        "Extremo": "bg-red-600"
    }[calculoRiesgo.nivelRiesgo] || "bg-gray-500";

    // Construir el contenido del modal
    let contenido = `
        <div class="mb-6">
            <!-- Header con información de la víctima -->
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Respuestas de ${victima.nombre}</h3>
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Nivel de Riesgo:</span>
                            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-medium ${colorRiesgo}">
                                ${calculoRiesgo.nivelRiesgo}
                                ${calculoRiesgo.activadorExtremo ?
            '<span class="text-xs opacity-90">(Activador)</span>' :
            `<span class="text-xs opacity-90">(${calculoRiesgo.puntos} pts)</span>`
        }
                            </span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Respuestas Sí:</span>
                            <span class="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">${calculoRiesgo.respuestasSi}/38</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Estado:</span>
                            <span class="px-2 py-1 rounded text-sm ${victima.estado === 'Activo' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}">${victima.estado}</span>
                        </div>
                    </div>
                    ${calculoRiesgo.activadorExtremo ?
            `<div class="mt-2 p-2 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg">
                            <div class="flex items-center gap-2 text-red-700 dark:text-red-300">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                                <span class="text-sm font-medium">Nivel extremo activado por respuesta afirmativa a pregunta crítica</span>
                            </div>
                        </div>`
            : ''
        }
                </div>
                <button onclick="cerrarModal()" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <!-- Área de sentencia del juez -->
            <div class="sentencia-container bg-gradient-to-r from-blue-50 to-blue-100 dark:from-purple-900/30 dark:to-purple-800/30 border-l-4 border-blue-400 dark:border-purple-500 rounded-lg p-4 mb-4">
                <div class="flex items-center gap-2 mb-3">
                    <svg class="w-5 h-5 text-blue-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <h4 class="text-lg font-semibold text-blue-800 dark:text-purple-300 sentencia-title">Sentencia del Juez</h4>
                </div>
                <textarea 
                    id="sentenciaJuez" 
                    placeholder="Escriba aquí la sentencia o medidas de protección correspondientes..."
                    class="sentencia-textarea w-full h-20 p-3 text-sm rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent border-none shadow-inner"
                ></textarea>
                <div class="flex justify-end gap-2 mt-3">
                    <button onclick="guardarSentencia('${victima.nombre}')" class="sentencia-btn-guardar px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                        Guardar Sentencia
                    </button>
                    <button onclick="limpiarSentencia()" class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors shadow-md">
                        Limpiar
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Lista de preguntas y respuestas -->
        <div class="space-y-3 max-h-96 overflow-y-auto">
    `;

    victima.respuestas.forEach((respuesta, index) => {
        // Colores según el nivel de la pregunta
        const colorNivel = {
            "bajo": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            "moderado": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
            "alto": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
            "extremo": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
            "activador": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-2 border-purple-300 dark:border-purple-600"
        }[respuesta.nivel] || "bg-gray-100 text-gray-800";

        const colorRespuesta = respuesta.respuesta === 'Sí'
            ? 'text-green-600 dark:text-green-400 font-bold'
            : 'text-red-600 dark:text-red-400 font-bold';

        // Texto del nivel
        const textoNivel = respuesta.nivel === "activador" ? "ACTIVADOR" : respuesta.nivel.toUpperCase();

        // Puntos o efecto
        const puntosTexto = respuesta.nivel === "activador" ?
            (respuesta.respuesta === 'Sí' ? '(Nivel Extremo)' : '(Sin efecto)') :
            (respuesta.respuesta === 'Sí' ? '(+' + (puntosPorNivel[respuesta.nivel] || 1) + ' pts)' : '(0 pts)');

        contenido += `
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${respuesta.nivel === "activador" && respuesta.respuesta === 'Sí' ? 'ring-2 ring-purple-500 dark:ring-purple-400' : ''}">
                <div class="flex justify-between items-start gap-4">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="inline-block px-2 py-1 rounded text-xs font-medium ${colorNivel}">
                                ${textoNivel}
                            </span>
                            <span class="text-xs text-gray-500 dark:text-gray-400">
                                ${puntosTexto}
                            </span>
                            ${respuesta.nivel === "activador" && respuesta.respuesta === 'Sí' ?
                '<span class="inline-block px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 animate-pulse">¡ACTIVADO!</span>' :
                ''
            }
                        </div>
                        <span class="text-sm text-gray-700 dark:text-gray-300">${respuesta.pregunta}</span>
                    </div>
                    <span class="${colorRespuesta} ml-4 min-w-12 text-center text-sm font-medium">${respuesta.respuesta}</span>
                </div>
            </div>
        `;
    });

    contenido += `</div>`;
    modalContent.innerHTML = contenido;
    modal.classList.remove('hidden');

    // Cargar sentencia guardada si existe
    cargarSentenciaGuardada(victima.nombre);
}

// Función para guardar la sentencia
function guardarSentencia(nombreVictima) {
    const sentencia = document.getElementById('sentenciaJuez').value;
    if (sentencia.trim()) {
        localStorage.setItem(`sentencia_${nombreVictima}`, sentencia);
        alert('Sentencia guardada correctamente');
    } else {
        alert('Por favor, escriba una sentencia antes de guardar');
    }
}

// Función para cargar sentencia guardada
function cargarSentenciaGuardada(nombreVictima) {
    const sentenciaGuardada = localStorage.getItem(`sentencia_${nombreVictima}`);
    if (sentenciaGuardada) {
        document.getElementById('sentenciaJuez').value = sentenciaGuardada;
    }
}

// Función para limpiar la sentencia
function limpiarSentencia() {
    document.getElementById('sentenciaJuez').value = '';
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('modalRespuestas');
    modal.classList.add('hidden');
}

// Renderizar tabla según pestaña
function renderTabla(filtro = "Todo") {
    const tabs = filtro === "Todo"
        ? ["Todo", "bajo", "moderado", "alto", "extremo"]
        : [filtro.toLowerCase()];

    tabs.forEach(tab => {
        const tbody = document.querySelector(`#${tab} tbody`);
        tbody.innerHTML = "";

        victimas
            .filter(v => {
                if (filtro === "Todo") return true;
                // Usar el nivel calculado en lugar del riesgo original
                const calculoRiesgo = calcularRiesgo(v.respuestas);
                return calculoRiesgo.nivelRiesgo.toLowerCase() === tab;
            })
            .forEach(v => {
                const tr = document.createElement("tr");
                tr.classList.add("border-b", "hover:bg-gray-50", "dark:border-gray-50", "dark:hover:bg-gray-340");

                // Calcular riesgo basado en puntos
                const calculoRiesgo = calcularRiesgo(v.respuestas);

                // Color según el riesgo
                const colorBarra = {
                    "Bajo": "bg-green-500",
                    "Moderado": "bg-yellow-500",
                    "Alto": "bg-orange-500",
                    "Extremo": "bg-red-600"
                }[calculoRiesgo.nivelRiesgo] || "bg-gray-500";

                // Calcular porcentaje para la barra visual
                const porcentajeVisual = Math.min(100, (calculoRiesgo.puntos / 100) * 100);

                tr.innerHTML = `
                    <td class="px-6 py-4">${v.nombre}</td>
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                            <div class="flex-1 max-w-40">
                                <div class="flex justify-between items-center mb-1">
                                    <span class="text-xs font-medium text-gray-700 dark:text-gray-300">${calculoRiesgo.respuestasSi}/38 Sí</span>
                                    <span class="text-xs text-gray-500 dark:text-gray-400">${calculoRiesgo.nivelRiesgo}</span>
                                </div>
                                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                    <div class="risk-bar-table ${colorBarra} h-3 rounded-full transition-all duration-1000" style="width: ${porcentajeVisual}%"></div>
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">${calculoRiesgo.puntos} puntos</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <span class="state-badge-shimmer inline-flex items-center justify-center w-20 px-3 py-1 rounded-full text-xs font-semibold relative overflow-hidden ${v.estado === 'Activo' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'} border-0 shadow-sm">
                            ${v.estado}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-sm">${v.fecha}</td>
                    <td class="px-6 py-4">
                        <div class="flex justify-center gap-2">
                            <button onclick="abrirModal(${JSON.stringify(v).replace(/"/g, '&quot;')})" class="action-btn-view w-20 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                                Ver
                            </button>
                            <button class="action-btn-delete w-20 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                                Eliminar
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });
    });
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', (e) => {
    const modal = document.getElementById('modalRespuestas');
    const modalDialog = document.querySelector('.modal-dialog');

    if (e.target === modal) {
        cerrarModal();
    }
});

// Inicializar tabla
renderTabla();

// Funcionalidad de pestañas
document.querySelectorAll(".browser-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".browser-tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

        tab.classList.add("active");
        const target = tab.getAttribute("data-tab");
        document.getElementById(target).classList.add("active");

        renderTabla(target);
    });
});

// Agrega estas funciones al archivo JS/respuestas.js

// Función para abrir el modal de niveles de riesgo
function abrirRiskModal() {
    const modal = document.getElementById('riskLevelsModal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.querySelector('.transform').classList.remove('scale-95');
        modal.querySelector('.transform').classList.add('scale-100');
    }, 50);
}

// Función para cerrar el modal de niveles de riesgo
function cerrarRiskModal() {
    const modal = document.getElementById('riskLevelsModal');
    modal.querySelector('.transform').classList.remove('scale-100');
    modal.querySelector('.transform').classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Event listener para el botón flotante
document.getElementById('floatingRiskBtn').addEventListener('click', abrirRiskModal);

// Cerrar modal al hacer clic fuera
document.getElementById('riskLevelsModal').addEventListener('click', function (e) {
    if (e.target === this) {
        cerrarRiskModal();
    }
});

// Cerrar modal con ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        cerrarRiskModal();
    }
});

// Variables globales para búsqueda
let victimasFiltradas = [];
let filtroActual = "Todo";
let terminoBusqueda = "";

// Función para calcular riesgo
function calcularRiesgo(respuestas) {
    let puntos = 0;
    let respuestasSi = 0;
    let activadorExtremo = false;

    respuestas.forEach(respuesta => {
        if (respuesta.respuesta === 'Sí') {
            respuestasSi++;

            if (respuesta.nivel === "activador") {
                activadorExtremo = true;
            } else {
                puntos += puntosPorNivel[respuesta.nivel] || 1;
            }
        }
    });

    let nivelRiesgo;

    if (activadorExtremo) {
        nivelRiesgo = "Extremo";
    } else if (puntos >= 61) {
        nivelRiesgo = "Extremo";
    } else if (puntos >= 41) {
        nivelRiesgo = "Alto";
    } else if (puntos >= 21) {
        nivelRiesgo = "Moderado";
    } else {
        nivelRiesgo = "Bajo";
    }

    return {
        respuestasSi: respuestasSi,
        puntos: puntos,
        nivelRiesgo: nivelRiesgo,
        activadorExtremo: activadorExtremo
    };
}

// Función para obtener color según riesgo
function colorRiesgo(riesgo) {
    switch (riesgo.toLowerCase()) {
        case "bajo": return "bg-green-500 text-white";
        case "moderado": return "bg-yellow-400 text-white";
        case "alto": return "bg-orange-500 text-white";
        case "extremo": return "bg-red-600 text-white";
        default: return "bg-gray-400 text-white";
    }
}

// FUNCIÓN CORREGIDA para inicializar la búsqueda
function inicializarBusqueda() {
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');

    if (!searchInput) {
        console.error('No se encontró el elemento searchInput');
        return;
    }

    // Event listener para búsqueda en tiempo real
    searchInput.addEventListener('input', function (e) {
        terminoBusqueda = e.target.value.toLowerCase().trim();

        // Mostrar/ocultar botón de limpiar
        if (clearSearch) {
            if (terminoBusqueda) {
                clearSearch.classList.remove('hidden');
            } else {
                clearSearch.classList.add('hidden');
            }
        }

        // Aplicar filtros
        aplicarFiltros();
    });

    // Event listener para limpiar búsqueda
    if (clearSearch) {
        clearSearch.addEventListener('click', function () {
            searchInput.value = '';
            terminoBusqueda = '';
            clearSearch.classList.add('hidden');
            aplicarFiltros();
        });
    }

    // Event listener para Enter
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            aplicarFiltros();
        }
    });
}

// FUNCIÓN CORREGIDA para aplicar todos los filtros
function aplicarFiltros() {
    // Primero aplicar filtro de búsqueda
    victimasFiltradas = victimas.filter(victima =>
        victima.nombre.toLowerCase().includes(terminoBusqueda)
    );

    // Luego aplicar filtro de riesgo solo si no es "Todo"
    if (filtroActual !== "Todo") {
        victimasFiltradas = victimasFiltradas.filter(victima => {
            const calculoRiesgo = calcularRiesgo(victima.respuestas);
            return calculoRiesgo.nivelRiesgo.toLowerCase() === filtroActual.toLowerCase();
        });
    }

    // Renderizar la tabla
    renderTablaFiltrada();
}

// FUNCIÓN CORREGIDA para renderizar tabla con filtros aplicados
function renderTablaFiltrada() {
    // Mapear el filtro actual al ID correcto del tbody
    const tbodyMap = {
        "Todo": "tablaTodo",
        "bajo": "tablaBajo",
        "moderado": "tablaModerado",
        "alto": "tablaAlto",
        "extremo": "tablaExtremo"
    };

    const tbodyId = tbodyMap[filtroActual] || "tablaTodo";
    const tbody = document.getElementById(tbodyId);

    if (!tbody) {
        console.error(`No se encontró el tbody con ID: ${tbodyId}`);
        return;
    }

    tbody.innerHTML = "";

    if (victimasFiltradas.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td colspan="5" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-lg">
                ${terminoBusqueda ?
                `No se encontraron víctimas con el nombre "${terminoBusqueda}"` :
                'No hay víctimas en esta categoría'
            }
            </td>
        `;
        tbody.appendChild(tr);
        return;
    }

    victimasFiltradas.forEach(v => {
        const tr = document.createElement("tr");
        tr.classList.add("border-b", "hover:bg-gray-50", "dark:border-gray-50", "dark:hover:bg-gray-340");

        const calculoRiesgo = calcularRiesgo(v.respuestas);

        const colorBarra = {
            "Bajo": "bg-green-500",
            "Moderado": "bg-yellow-500",
            "Alto": "bg-orange-500",
            "Extremo": "bg-red-600"
        }[calculoRiesgo.nivelRiesgo] || "bg-gray-500";

        const porcentajeVisual = Math.min(100, (calculoRiesgo.puntos / 100) * 100);

        tr.innerHTML = `
            <td class="px-6 py-4">${v.nombre}</td>
            <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                    <div class="flex-1 max-w-40">
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-xs font-medium text-gray-700 dark:text-gray-300">${calculoRiesgo.respuestasSi}/38 Sí</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400">${calculoRiesgo.nivelRiesgo}</span>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div class="risk-bar-table ${colorBarra} h-3 rounded-full transition-all duration-1000" style="width: ${porcentajeVisual}%"></div>
                        </div>
                        <div class="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">${calculoRiesgo.puntos} puntos</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4">
                <span class="state-badge-shimmer inline-flex items-center justify-center w-20 px-3 py-1 rounded-full text-xs font-semibold relative overflow-hidden ${v.estado === 'Activo' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'} border-0 shadow-sm">
                    ${v.estado}
                </span>
            </td>
            <td class="px-6 py-4 text-sm">${v.fecha}</td>
            <td class="px-6 py-4">
                <div class="flex justify-center gap-2">
                    <button onclick="abrirModal(${JSON.stringify(v).replace(/"/g, '&quot;')})" class="action-btn-view w-20 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                        Ver
                    </button>
                    <button class="action-btn-delete w-20 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm relative overflow-hidden">
                        Eliminar
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Funcionalidad de pestañas
document.querySelectorAll(".browser-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".browser-tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

        tab.classList.add("active");
        const target = tab.getAttribute("data-tab");
        document.getElementById(target).classList.add("active");

        filtroActual = target;
        aplicarFiltros();
    });
});

// Función para abrir el modal
function abrirModal(victima) {
    const modal = document.getElementById('modalRespuestas');
    const modalContent = document.getElementById('modalContent');

    const calculoRiesgo = calcularRiesgo(victima.respuestas);

    const colorRiesgo = {
        "Bajo": "bg-green-500",
        "Moderado": "bg-yellow-500",
        "Alto": "bg-orange-500",
        "Extremo": "bg-red-600"
    }[calculoRiesgo.nivelRiesgo] || "bg-gray-500";

    let contenido = `
        <div class="mb-6">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Respuestas de ${victima.nombre}</h3>
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Nivel de Riesgo:</span>
                            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-medium ${colorRiesgo}">
                                ${calculoRiesgo.nivelRiesgo}
                                ${calculoRiesgo.activadorExtremo ?
            '<span class="text-xs opacity-90">(Activador)</span>' :
            `<span class="text-xs opacity-90">(${calculoRiesgo.puntos} pts)</span>`
        }
                            </span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Estado:</span>
                            <span class="px-2 py-1 rounded text-sm ${victima.estado === 'Activo' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}">${victima.estado}</span>
                        </div>
                    </div>
                </div>
                <button onclick="cerrarModal()" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="sentencia-container bg-gradient-to-r from-blue-50 to-blue-100 dark:from-purple-900/30 dark:to-purple-800/30 border-l-4 border-blue-400 dark:border-purple-500 rounded-lg p-4 mb-4">
                <div class="flex items-center gap-2 mb-3">
                    <svg class="w-5 h-5 text-blue-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <h4 class="text-lg font-semibold text-blue-800 dark:text-purple-300 sentencia-title">Sentencia del Juez</h4>
                </div>
                <textarea 
                    id="sentenciaJuez" 
                    placeholder="Escriba aquí la sentencia o medidas de protección correspondientes..."
                    class="sentencia-textarea w-full h-20 p-3 text-sm rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent border-none shadow-inner"
                ></textarea>
                <div class="flex justify-end gap-2 mt-3">
                    <button onclick="guardarSentencia('${victima.nombre}')" class="sentencia-btn-guardar px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                        Guardar Sentencia
                    </button>
                    <button onclick="limpiarSentencia()" class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors shadow-md">
                        Limpiar
                    </button>
                </div>
            </div>
        </div>
        
        <div class="space-y-3 max-h-96 overflow-y-auto">
    `;

    victima.respuestas.forEach((respuesta, index) => {
        const colorNivel = {
            "bajo": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            "moderado": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
            "alto": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
            "extremo": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
            "activador": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-2 border-purple-300 dark:border-purple-600"
        }[respuesta.nivel] || "bg-gray-100 text-gray-800";

        const colorRespuesta = respuesta.respuesta === 'Sí'
            ? 'text-green-600 dark:text-green-400 font-bold'
            : 'text-red-600 dark:text-red-400 font-bold';

        const textoNivel = respuesta.nivel === "activador" ? "ACTIVADOR" : respuesta.nivel.toUpperCase();
        const puntosTexto = respuesta.nivel === "activador" ?
            (respuesta.respuesta === 'Sí' ? '(Nivel Extremo)' : '(Sin efecto)') :
            (respuesta.respuesta === 'Sí' ? '(+' + (puntosPorNivel[respuesta.nivel] || 1) + ' pts)' : '(0 pts)');

        contenido += `
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div class="flex justify-between items-start gap-4">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="inline-block px-2 py-1 rounded text-xs font-medium ${colorNivel}">
                                ${textoNivel}
                            </span>
                            <span class="text-xs text-gray-500 dark:text-gray-400">
                                ${puntosTexto}
                            </span>
                        </div>
                        <span class="text-sm text-gray-700 dark:text-gray-300">${respuesta.pregunta}</span>
                    </div>
                    <span class="${colorRespuesta} ml-4 min-w-12 text-center text-sm font-medium">${respuesta.respuesta}</span>
                </div>
            </div>
        `;
    });

    contenido += `</div>`;
    modalContent.innerHTML = contenido;
    modal.classList.remove('hidden');

    cargarSentenciaGuardada(victima.nombre);
}

function guardarSentencia(nombreVictima) {
    const sentencia = document.getElementById('sentenciaJuez').value;
    if (sentencia.trim()) {
        localStorage.setItem(`sentencia_${nombreVictima}`, sentencia);
        alert('Sentencia guardada correctamente');
    } else {
        alert('Por favor, escriba una sentencia antes de guardar');
    }
}

function cargarSentenciaGuardada(nombreVictima) {
    const sentenciaGuardada = localStorage.getItem(`sentencia_${nombreVictima}`);
    if (sentenciaGuardada) {
        document.getElementById('sentenciaJuez').value = sentenciaGuardada;
    }
}

function limpiarSentencia() {
    document.getElementById('sentenciaJuez').value = '';
}

function cerrarModal() {
    const modal = document.getElementById('modalRespuestas');
    modal.classList.add('hidden');
}

function abrirRiskModal() {
    const modal = document.getElementById('riskLevelsModal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.querySelector('.transform').classList.remove('scale-95');
        modal.querySelector('.transform').classList.add('scale-100');
    }, 50);
}

function cerrarRiskModal() {
    const modal = document.getElementById('riskLevelsModal');
    modal.querySelector('.transform').classList.remove('scale-100');
    modal.querySelector('.transform').classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Cerrar modales al hacer clic fuera
document.addEventListener('click', (e) => {
    const modalRespuestas = document.getElementById('modalRespuestas');
    const modalRisk = document.getElementById('riskLevelsModal');

    if (e.target === modalRespuestas) {
        cerrarModal();
    }
    if (e.target === modalRisk) {
        cerrarRiskModal();
    }
});

// Cerrar modales con ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        cerrarRiskModal();
        cerrarModal();
    }
});

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    const floatingBtn = document.getElementById('floatingRiskBtn');
    if (floatingBtn) {
        floatingBtn.addEventListener('click', abrirRiskModal);
    }

    // Inicializar búsqueda
    inicializarBusqueda();

    // Cargar datos iniciales
    victimasFiltradas = [...victimas];
    filtroActual = "Todo";
    aplicarFiltros();
});