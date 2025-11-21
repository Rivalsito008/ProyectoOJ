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
const victimas = [
    {
        nombre: "Juan Pérez",
        riesgo: "Bajo",
        estado: "Activo",
        fecha: "2025-11-15",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "No" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas?", respuesta: "No" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "No" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "No" },
            { pregunta: "Pregunta 5: ¿Existe violencia psicológica?", respuesta: "No" },
            { pregunta: "Pregunta 6: ¿Hay control económico?", respuesta: "No" },
            { pregunta: "Pregunta 7: ¿Ha sufrido violencia sexual?", respuesta: "No" },
            { pregunta: "Pregunta 8: ¿Existe aislamiento social?", respuesta: "No" },
            { pregunta: "Pregunta 9: ¿Le han impedido trabajar?", respuesta: "No" },
            { pregunta: "Pregunta 10: ¿Le han quitado sus documentos?", respuesta: "No" },
            { pregunta: "Pregunta 11: ¿Ha tenido lesiones visibles?", respuesta: "No" },
            { pregunta: "Pregunta 12: ¿Ha necesitado atención médica?", respuesta: "No" },
            { pregunta: "Pregunta 13: ¿Tiene acceso a sus cuentas?", respuesta: "Sí" },
            { pregunta: "Pregunta 14: ¿Puede ver a su familia?", respuesta: "Sí" },
            { pregunta: "Pregunta 15: ¿Puede salir libremente?", respuesta: "Sí" },
            { pregunta: "Pregunta 16: ¿Recibe insultos frecuentes?", respuesta: "No" },
            { pregunta: "Pregunta 17: ¿Le han destruido propiedades?", respuesta: "No" },
            { pregunta: "Pregunta 18: ¿Tiene apoyo familiar?", respuesta: "Sí" },
            { pregunta: "Pregunta 19: ¿Ha denunciado anteriormente?", respuesta: "No" },
            { pregunta: "Pregunta 20: ¿Existe riesgo de femicidio?", respuesta: "No" },
            { pregunta: "Pregunta 21: ¿Hay armas en el hogar?", respuesta: "No" },
            { pregunta: "Pregunta 22: ¿El agresor consume alcohol?", respuesta: "No" },
            { pregunta: "Pregunta 23: ¿El agresor consume drogas?", respuesta: "No" },
            { pregunta: "Pregunta 24: ¿Hay hijos en común?", respuesta: "Sí" },
            { pregunta: "Pregunta 25: ¿Los hijos han presenciado violencia?", respuesta: "No" },
            { pregunta: "Pregunta 26: ¿Tiene redes de apoyo?", respuesta: "Sí" },
            { pregunta: "Pregunta 27: ¿Puede acceder a servicios de salud?", respuesta: "Sí" },
            { pregunta: "Pregunta 28: ¿Tiene ingresos propios?", respuesta: "Sí" },
            { pregunta: "Pregunta 29: ¿Puede tomar decisiones?", respuesta: "Sí" },
            { pregunta: "Pregunta 30: ¿Ha habido intentos de suicidio?", respuesta: "No" },
            { pregunta: "Pregunta 31: ¿Sufre de depresión?", respuesta: "No" },
            { pregunta: "Pregunta 32: ¿Tiene ansiedad?", respuesta: "No" },
            { pregunta: "Pregunta 33: ¿Ha perdido el empleo por violencia?", respuesta: "No" },
            { pregunta: "Pregunta 34: ¿Le han prohibido estudiar?", respuesta: "No" },
            { pregunta: "Pregunta 35: ¿Recibe mensajes acosadores?", respuesta: "No" },
            { pregunta: "Pregunta 36: ¿Le vigilan sus movimientos?", respuesta: "No" },
            { pregunta: "Pregunta 37: ¿Ha cambiado su rutina por miedo?", respuesta: "No" },
            { pregunta: "Pregunta 38: ¿Cree que la violencia puede aumentar?", respuesta: "No" }
        ]
    },
    {
        nombre: "María López",
        riesgo: "Moderado",
        estado: "Inactivo",
        fecha: "2025-10-20",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "Sí" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas?", respuesta: "Sí" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "Sí" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "Sí" },
            { pregunta: "Pregunta 5: ¿Existe violencia psicológica?", respuesta: "Sí" },
            { pregunta: "Pregunta 6: ¿Hay control económico?", respuesta: "Sí" },
            { pregunta: "Pregunta 7: ¿Ha sufrido violencia sexual?", respuesta: "No" },
            { pregunta: "Pregunta 8: ¿Existe aislamiento social?", respuesta: "Sí" },
            { pregunta: "Pregunta 9: ¿Le han impedido trabajar?", respuesta: "No" },
            { pregunta: "Pregunta 10: ¿Le han quitado sus documentos?", respuesta: "No" },
            { pregunta: "Pregunta 11: ¿Ha tenido lesiones visibles?", respuesta: "Sí" },
            { pregunta: "Pregunta 12: ¿Ha necesitado atención médica?", respuesta: "Sí" },
            { pregunta: "Pregunta 13: ¿Tiene acceso a sus cuentas?", respuesta: "No" },
            { pregunta: "Pregunta 14: ¿Puede ver a su familia?", respuesta: "No" },
            { pregunta: "Pregunta 15: ¿Puede salir libremente?", respuesta: "No" },
            { pregunta: "Pregunta 16: ¿Recibe insultos frecuentes?", respuesta: "Sí" },
            { pregunta: "Pregunta 17: ¿Le han destruido propiedades?", respuesta: "Sí" },
            { pregunta: "Pregunta 18: ¿Tiene apoyo familiar?", respuesta: "No" },
            { pregunta: "Pregunta 19: ¿Ha denunciado anteriormente?", respuesta: "Sí" },
            { pregunta: "Pregunta 20: ¿Existe riesgo de femicidio?", respuesta: "No" },
            { pregunta: "Pregunta 21: ¿Hay armas en el hogar?", respuesta: "No" },
            { pregunta: "Pregunta 22: ¿El agresor consume alcohol?", respuesta: "Sí" },
            { pregunta: "Pregunta 23: ¿El agresor consume drogas?", respuesta: "No" },
            { pregunta: "Pregunta 24: ¿Hay hijos en común?", respuesta: "Sí" },
            { pregunta: "Pregunta 25: ¿Los hijos han presenciado violencia?", respuesta: "Sí" },
            { pregunta: "Pregunta 26: ¿Tiene redes de apoyo?", respuesta: "No" },
            { pregunta: "Pregunta 27: ¿Puede acceder a servicios de salud?", respuesta: "Sí" },
            { pregunta: "Pregunta 28: ¿Tiene ingresos propios?", respuesta: "No" },
            { pregunta: "Pregunta 29: ¿Puede tomar decisiones?", respuesta: "No" },
            { pregunta: "Pregunta 30: ¿Ha habido intentos de suicidio?", respuesta: "No" },
            { pregunta: "Pregunta 31: ¿Sufre de depresión?", respuesta: "Sí" },
            { pregunta: "Pregunta 32: ¿Tiene ansiedad?", respuesta: "Sí" },
            { pregunta: "Pregunta 33: ¿Ha perdido el empleo por violencia?", respuesta: "No" },
            { pregunta: "Pregunta 34: ¿Le han prohibido estudiar?", respuesta: "No" },
            { pregunta: "Pregunta 35: ¿Recibe mensajes acosadores?", respuesta: "Sí" },
            { pregunta: "Pregunta 36: ¿Le vigilan sus movimientos?", respuesta: "Sí" },
            { pregunta: "Pregunta 37: ¿Ha cambiado su rutina por miedo?", respuesta: "Sí" },
            { pregunta: "Pregunta 38: ¿Cree que la violencia puede aumentar?", respuesta: "Sí" }
        ]
    },
    {
        nombre: "Carlos Martínez",
        riesgo: "Alto",
        estado: "Activo",
        fecha: "2025-09-12",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "Sí" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas?", respuesta: "Sí" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "Sí" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "Sí" },
            { pregunta: "Pregunta 5: ¿Existe violencia psicológica?", respuesta: "Sí" },
            { pregunta: "Pregunta 6: ¿Hay control económico?", respuesta: "Sí" },
            { pregunta: "Pregunta 7: ¿Ha sufrido violencia sexual?", respuesta: "Sí" },
            { pregunta: "Pregunta 8: ¿Existe aislamiento social?", respuesta: "Sí" },
            { pregunta: "Pregunta 9: ¿Le han impedido trabajar?", respuesta: "Sí" },
            { pregunta: "Pregunta 10: ¿Le han quitado sus documentos?", respuesta: "Sí" },
            { pregunta: "Pregunta 11: ¿Ha tenido lesiones visibles?", respuesta: "Sí" },
            { pregunta: "Pregunta 12: ¿Ha necesitado atención médica?", respuesta: "Sí" },
            { pregunta: "Pregunta 13: ¿Tiene acceso a sus cuentas?", respuesta: "No" },
            { pregunta: "Pregunta 14: ¿Puede ver a su familia?", respuesta: "No" },
            { pregunta: "Pregunta 15: ¿Puede salir libremente?", respuesta: "No" },
            { pregunta: "Pregunta 16: ¿Recibe insultos frecuentes?", respuesta: "Sí" },
            { pregunta: "Pregunta 17: ¿Le han destruido propiedades?", respuesta: "Sí" },
            { pregunta: "Pregunta 18: ¿Tiene apoyo familiar?", respuesta: "No" },
            { pregunta: "Pregunta 19: ¿Ha denunciado anteriormente?", respuesta: "Sí" },
            { pregunta: "Pregunta 20: ¿Existe riesgo de femicidio?", respuesta: "Sí" },
            { pregunta: "Pregunta 21: ¿Hay armas en el hogar?", respuesta: "Sí" },
            { pregunta: "Pregunta 22: ¿El agresor consume alcohol?", respuesta: "Sí" },
            { pregunta: "Pregunta 23: ¿El agresor consume drogas?", respuesta: "Sí" },
            { pregunta: "Pregunta 24: ¿Hay hijos en común?", respuesta: "Sí" },
            { pregunta: "Pregunta 25: ¿Los hijos han presenciado violencia?", respuesta: "Sí" },
            { pregunta: "Pregunta 26: ¿Tiene redes de apoyo?", respuesta: "No" },
            { pregunta: "Pregunta 27: ¿Puede acceder a servicios de salud?", respuesta: "No" },
            { pregunta: "Pregunta 28: ¿Tiene ingresos propios?", respuesta: "No" },
            { pregunta: "Pregunta 29: ¿Puede tomar decisiones?", respuesta: "No" },
            { pregunta: "Pregunta 30: ¿Ha habido intentos de suicidio?", respuesta: "Sí" },
            { pregunta: "Pregunta 31: ¿Sufre de depresión?", respuesta: "Sí" },
            { pregunta: "Pregunta 32: ¿Tiene ansiedad?", respuesta: "Sí" },
            { pregunta: "Pregunta 33: ¿Ha perdido el empleo por violencia?", respuesta: "Sí" },
            { pregunta: "Pregunta 34: ¿Le han prohibido estudiar?", respuesta: "Sí" },
            { pregunta: "Pregunta 35: ¿Recibe mensajes acosadores?", respuesta: "Sí" },
            { pregunta: "Pregunta 36: ¿Le vigilan sus movimientos?", respuesta: "Sí" },
            { pregunta: "Pregunta 37: ¿Ha cambiado su rutina por miedo?", respuesta: "Sí" },
            { pregunta: "Pregunta 38: ¿Cree que la violencia puede aumentar?", respuesta: "Sí" }
        ]
    },
    {
        nombre: "Ana González",
        riesgo: "Extremo",
        estado: "Activo",
        fecha: "2025-11-01",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "Sí" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas?", respuesta: "Sí" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "Sí" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "Sí" },
            { pregunta: "Pregunta 5: ¿Existe violencia psicológica?", respuesta: "Sí" },
            { pregunta: "Pregunta 6: ¿Hay control económico?", respuesta: "Sí" },
            { pregunta: "Pregunta 7: ¿Ha sufrido violencia sexual?", respuesta: "Sí" },
            { pregunta: "Pregunta 8: ¿Existe aislamiento social?", respuesta: "Sí" },
            { pregunta: "Pregunta 9: ¿Le han impedido trabajar?", respuesta: "Sí" },
            { pregunta: "Pregunta 10: ¿Le han quitado sus documentos?", respuesta: "Sí" },
            { pregunta: "Pregunta 11: ¿Ha tenido lesiones visibles?", respuesta: "Sí" },
            { pregunta: "Pregunta 12: ¿Ha necesitado atención médica?", respuesta: "Sí" },
            { pregunta: "Pregunta 13: ¿Tiene acceso a sus cuentas?", respuesta: "No" },
            { pregunta: "Pregunta 14: ¿Puede ver a su familia?", respuesta: "No" },
            { pregunta: "Pregunta 15: ¿Puede salir libremente?", respuesta: "No" },
            { pregunta: "Pregunta 16: ¿Recibe insultos frecuentes?", respuesta: "Sí" },
            { pregunta: "Pregunta 17: ¿Le han destruido propiedades?", respuesta: "Sí" },
            { pregunta: "Pregunta 18: ¿Tiene apoyo familiar?", respuesta: "No" },
            { pregunta: "Pregunta 19: ¿Ha denunciado anteriormente?", respuesta: "Sí" },
            { pregunta: "Pregunta 20: ¿Existe riesgo de femicidio?", respuesta: "Sí" },
            { pregunta: "Pregunta 21: ¿Hay armas en el hogar?", respuesta: "Sí" },
            { pregunta: "Pregunta 22: ¿El agresor consume alcohol?", respuesta: "Sí" },
            { pregunta: "Pregunta 23: ¿El agresor consume drogas?", respuesta: "Sí" },
            { pregunta: "Pregunta 24: ¿Hay hijos en común?", respuesta: "Sí" },
            { pregunta: "Pregunta 25: ¿Los hijos han presenciado violencia?", respuesta: "Sí" },
            { pregunta: "Pregunta 26: ¿Tiene redes de apoyo?", respuesta: "No" },
            { pregunta: "Pregunta 27: ¿Puede acceder a servicios de salud?", respuesta: "No" },
            { pregunta: "Pregunta 28: ¿Tiene ingresos propios?", respuesta: "No" },
            { pregunta: "Pregunta 29: ¿Puede tomar decisiones?", respuesta: "No" },
            { pregunta: "Pregunta 30: ¿Ha habido intentos de suicidio?", respuesta: "Sí" },
            { pregunta: "Pregunta 31: ¿Sufre de depresión?", respuesta: "Sí" },
            { pregunta: "Pregunta 32: ¿Tiene ansiedad?", respuesta: "Sí" },
            { pregunta: "Pregunta 33: ¿Ha perdido el empleo por violencia?", respuesta: "Sí" },
            { pregunta: "Pregunta 34: ¿Le han prohibido estudiar?", respuesta: "Sí" },
            { pregunta: "Pregunta 35: ¿Recibe mensajes acosadores?", respuesta: "Sí" },
            { pregunta: "Pregunta 36: ¿Le vigilan sus movimientos?", respuesta: "Sí" },
            { pregunta: "Pregunta 37: ¿Ha cambiado su rutina por miedo?", respuesta: "Sí" },
            { pregunta: "Pregunta 38: ¿Cree que la violencia puede aumentar?", respuesta: "Sí" }
        ]
    },
    {
        nombre: "Luis Hernández",
        riesgo: "Bajo",
        estado: "Inactivo",
        fecha: "2025-11-10",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "No" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas?", respuesta: "No" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "No" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "No" },
            { pregunta: "Pregunta 5: ¿Existe violencia psicológica?", respuesta: "No" },
            { pregunta: "Pregunta 6: ¿Hay control económico?", respuesta: "No" },
            { pregunta: "Pregunta 7: ¿Ha sufrido violencia sexual?", respuesta: "No" },
            { pregunta: "Pregunta 8: ¿Existe aislamiento social?", respuesta: "No" },
            { pregunta: "Pregunta 9: ¿Le han impedido trabajar?", respuesta: "No" },
            { pregunta: "Pregunta 10: ¿Le han quitado sus documentos?", respuesta: "No" },
            { pregunta: "Pregunta 11: ¿Ha tenido lesiones visibles?", respuesta: "No" },
            { pregunta: "Pregunta 12: ¿Ha necesitado atención médica?", respuesta: "No" },
            { pregunta: "Pregunta 13: ¿Tiene acceso a sus cuentas?", respuesta: "Sí" },
            { pregunta: "Pregunta 14: ¿Puede ver a su familia?", respuesta: "Sí" },
            { pregunta: "Pregunta 15: ¿Puede salir libremente?", respuesta: "Sí" },
            { pregunta: "Pregunta 16: ¿Recibe insultos frecuentes?", respuesta: "No" },
            { pregunta: "Pregunta 17: ¿Le han destruido propiedades?", respuesta: "No" },
            { pregunta: "Pregunta 18: ¿Tiene apoyo familiar?", respuesta: "Sí" },
            { pregunta: "Pregunta 19: ¿Ha denunciado anteriormente?", respuesta: "No" },
            { pregunta: "Pregunta 20: ¿Existe riesgo de femicidio?", respuesta: "No" },
            { pregunta: "Pregunta 21: ¿Hay armas en el hogar?", respuesta: "No" },
            { pregunta: "Pregunta 22: ¿El agresor consume alcohol?", respuesta: "No" },
            { pregunta: "Pregunta 23: ¿El agresor consume drogas?", respuesta: "No" },
            { pregunta: "Pregunta 24: ¿Hay hijos en común?", respuesta: "No" },
            { pregunta: "Pregunta 25: ¿Los hijos han presenciado violencia?", respuesta: "No" },
            { pregunta: "Pregunta 26: ¿Tiene redes de apoyo?", respuesta: "Sí" },
            { pregunta: "Pregunta 27: ¿Puede acceder a servicios de salud?", respuesta: "Sí" },
            { pregunta: "Pregunta 28: ¿Tiene ingresos propios?", respuesta: "Sí" },
            { pregunta: "Pregunta 29: ¿Puede tomar decisiones?", respuesta: "Sí" },
            { pregunta: "Pregunta 30: ¿Ha habido intentos de suicidio?", respuesta: "No" },
            { pregunta: "Pregunta 31: ¿Sufre de depresión?", respuesta: "No" },
            { pregunta: "Pregunta 32: ¿Tiene ansiedad?", respuesta: "No" },
            { pregunta: "Pregunta 33: ¿Ha perdido el empleo por violencia?", respuesta: "No" },
            { pregunta: "Pregunta 34: ¿Le han prohibido estudiar?", respuesta: "No" },
            { pregunta: "Pregunta 35: ¿Recibe mensajes acosadores?", respuesta: "No" },
            { pregunta: "Pregunta 36: ¿Le vigilan sus movimientos?", respuesta: "No" },
            { pregunta: "Pregunta 37: ¿Ha cambiado su rutina por miedo?", respuesta: "No" },
            { pregunta: "Pregunta 38: ¿Cree que la violencia puede aumentar?", respuesta: "No" }
        ]
    },
    {
        nombre: "Sofía Ramírez",
        riesgo: "Moderado",
        estado: "Activo",
        fecha: "2025-08-30",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "Sí" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas?", respuesta: "Sí" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "Sí" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "Sí" },
            { pregunta: "Pregunta 5: ¿Existe violencia psicológica?", respuesta: "Sí" },
            { pregunta: "Pregunta 6: ¿Hay control económico?", respuesta: "No" },
            { pregunta: "Pregunta 7: ¿Ha sufrido violencia sexual?", respuesta: "No" },
            { pregunta: "Pregunta 8: ¿Existe aislamiento social?", respuesta: "Sí" },
            { pregunta: "Pregunta 9: ¿Le han impedido trabajar?", respuesta: "No" },
            { pregunta: "Pregunta 10: ¿Le han quitado sus documentos?", respuesta: "No" },
            { pregunta: "Pregunta 11: ¿Ha tenido lesiones visibles?", respuesta: "Sí" },
            { pregunta: "Pregunta 12: ¿Ha necesitado atención médica?", respuesta: "Sí" },
            { pregunta: "Pregunta 13: ¿Tiene acceso a sus cuentas?", respuesta: "Sí" },
            { pregunta: "Pregunta 14: ¿Puede ver a su familia?", respuesta: "No" },
            { pregunta: "Pregunta 15: ¿Puede salir libremente?", respuesta: "Sí" },
            { pregunta: "Pregunta 16: ¿Recibe insultos frecuentes?", respuesta: "Sí" },
            { pregunta: "Pregunta 17: ¿Le han destruido propiedades?", respuesta: "No" },
            { pregunta: "Pregunta 18: ¿Tiene apoyo familiar?", respuesta: "Sí" },
            { pregunta: "Pregunta 19: ¿Ha denunciado anteriormente?", respuesta: "Sí" },
            { pregunta: "Pregunta 20: ¿Existe riesgo de femicidio?", respuesta: "No" },
            { pregunta: "Pregunta 21: ¿Hay armas en el hogar?", respuesta: "No" },
            { pregunta: "Pregunta 22: ¿El agresor consume alcohol?", respuesta: "Sí" },
            { pregunta: "Pregunta 23: ¿El agresor consume drogas?", respuesta: "No" },
            { pregunta: "Pregunta 24: ¿Hay hijos en común?", respuesta: "Sí" },
            { pregunta: "Pregunta 25: ¿Los hijos han presenciado violencia?", respuesta: "Sí" },
            { pregunta: "Pregunta 26: ¿Tiene redes de apoyo?", respuesta: "Sí" },
            { pregunta: "Pregunta 27: ¿Puede acceder a servicios de salud?", respuesta: "Sí" },
            { pregunta: "Pregunta 28: ¿Tiene ingresos propios?", respuesta: "Sí" },
            { pregunta: "Pregunta 29: ¿Puede tomar decisiones?", respuesta: "Sí" },
            { pregunta: "Pregunta 30: ¿Ha habido intentos de suicidio?", respuesta: "No" },
            { pregunta: "Pregunta 31: ¿Sufre de depresión?", respuesta: "Sí" },
            { pregunta: "Pregunta 32: ¿Tiene ansiedad?", respuesta: "Sí" },
            { pregunta: "Pregunta 33: ¿Ha perdido el empleo por violencia?", respuesta: "No" },
            { pregunta: "Pregunta 34: ¿Le han prohibido estudiar?", respuesta: "No" },
            { pregunta: "Pregunta 35: ¿Recibe mensajes acosadores?", respuesta: "Sí" },
            { pregunta: "Pregunta 36: ¿Le vigilan sus movimientos?", respuesta: "Sí" },
            { pregunta: "Pregunta 37: ¿Ha cambiado su rutina por miedo?", respuesta: "Sí" },
            { pregunta: "Pregunta 38: ¿Cree que la violencia puede aumentar?", respuesta: "Sí" }
        ]
    },
    {
        nombre: "Miguel Torres",
        riesgo: "Alto",
        estado: "Activo",
        fecha: "2025-10-05",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "Sí" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas?", respuesta: "Sí" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "Sí" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "Sí" },
            { pregunta: "Pregunta 5: ¿Existe violencia psicológica?", respuesta: "Sí" },
            { pregunta: "Pregunta 6: ¿Hay control económico?", respuesta: "Sí" },
            { pregunta: "Pregunta 7: ¿Ha sufrido violencia sexual?", respuesta: "No" },
            { pregunta: "Pregunta 8: ¿Existe aislamiento social?", respuesta: "Sí" },
            { pregunta: "Pregunta 9: ¿Le han impedido trabajar?", respuesta: "Sí" },
            { pregunta: "Pregunta 10: ¿Le han quitado sus documentos?", respuesta: "Sí" },
            { pregunta: "Pregunta 11: ¿Ha tenido lesiones visibles?", respuesta: "Sí" },
            { pregunta: "Pregunta 12: ¿Ha necesitado atención médica?", respuesta: "Sí" },
            { pregunta: "Pregunta 13: ¿Tiene acceso a sus cuentas?", respuesta: "No" },
            { pregunta: "Pregunta 14: ¿Puede ver a su familia?", respuesta: "No" },
            { pregunta: "Pregunta 15: ¿Puede salir libremente?", respuesta: "No" },
            { pregunta: "Pregunta 16: ¿Recibe insultos frecuentes?", respuesta: "Sí" },
            { pregunta: "Pregunta 17: ¿Le han destruido propiedades?", respuesta: "Sí" },
            { pregunta: "Pregunta 18: ¿Tiene apoyo familiar?", respuesta: "No" },
            { pregunta: "Pregunta 19: ¿Ha denunciado anteriormente?", respuesta: "Sí" },
            { pregunta: "Pregunta 20: ¿Existe riesgo de femicidio?", respuesta: "Sí" },
            { pregunta: "Pregunta 21: ¿Hay armas en el hogar?", respuesta: "Sí" },
            { pregunta: "Pregunta 22: ¿El agresor consume alcohol?", respuesta: "Sí" },
            { pregunta: "Pregunta 23: ¿El agresor consume drogas?", respuesta: "No" },
            { pregunta: "Pregunta 24: ¿Hay hijos en común?", respuesta: "Sí" },
            { pregunta: "Pregunta 25: ¿Los hijos han presenciado violencia?", respuesta: "Sí" },
            { pregunta: "Pregunta 26: ¿Tiene redes de apoyo?", respuesta: "No" },
            { pregunta: "Pregunta 27: ¿Puede acceder a servicios de salud?", respuesta: "No" },
            { pregunta: "Pregunta 28: ¿Tiene ingresos propios?", respuesta: "No" },
            { pregunta: "Pregunta 29: ¿Puede tomar decisiones?", respuesta: "No" },
            { pregunta: "Pregunta 30: ¿Ha habido intentos de suicidio?", respuesta: "Sí" },
            { pregunta: "Pregunta 31: ¿Sufre de depresión?", respuesta: "Sí" },
            { pregunta: "Pregunta 32: ¿Tiene ansiedad?", respuesta: "Sí" },
            { pregunta: "Pregunta 33: ¿Ha perdido el empleo por violencia?", respuesta: "Sí" },
            { pregunta: "Pregunta 34: ¿Le han prohibido estudiar?", respuesta: "Sí" },
            { pregunta: "Pregunta 35: ¿Recibe mensajes acosadores?", respuesta: "Sí" },
            { pregunta: "Pregunta 36: ¿Le vigilan sus movimientos?", respuesta: "Sí" },
            { pregunta: "Pregunta 37: ¿Ha cambiado su rutina por miedo?", respuesta: "Sí" },
            { pregunta: "Pregunta 38: ¿Cree que la violencia puede aumentar?", respuesta: "Sí" }
        ]
    },
    {
        nombre: "Lucía Fernández",
        riesgo: "Extremo",
        estado: "Inactivo",
        fecha: "2025-09-18",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "Sí" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas?", respuesta: "Sí" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "Sí" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "Sí" },
            { pregunta: "Pregunta 5: ¿Existe violencia psicológica?", respuesta: "Sí" },
            { pregunta: "Pregunta 6: ¿Hay control económico?", respuesta: "Sí" },
            { pregunta: "Pregunta 7: ¿Ha sufrido violencia sexual?", respuesta: "Sí" },
            { pregunta: "Pregunta 8: ¿Existe aislamiento social?", respuesta: "Sí" },
            { pregunta: "Pregunta 9: ¿Le han impedido trabajar?", respuesta: "Sí" },
            { pregunta: "Pregunta 10: ¿Le han quitado sus documentos?", respuesta: "Sí" },
            { pregunta: "Pregunta 11: ¿Ha tenido lesiones visibles?", respuesta: "Sí" },
            { pregunta: "Pregunta 12: ¿Ha necesitado atención médica?", respuesta: "Sí" },
            { pregunta: "Pregunta 13: ¿Tiene acceso a sus cuentas?", respuesta: "No" },
            { pregunta: "Pregunta 14: ¿Puede ver a su familia?", respuesta: "No" },
            { pregunta: "Pregunta 15: ¿Puede salir libremente?", respuesta: "No" },
            { pregunta: "Pregunta 16: ¿Recibe insultos frecuentes?", respuesta: "Sí" },
            { pregunta: "Pregunta 17: ¿Le han destruido propiedades?", respuesta: "Sí" },
            { pregunta: "Pregunta 18: ¿Tiene apoyo familiar?", respuesta: "No" },
            { pregunta: "Pregunta 19: ¿Ha denunciado anteriormente?", respuesta: "Sí" },
            { pregunta: "Pregunta 20: ¿Existe riesgo de femicidio?", respuesta: "Sí" },
            { pregunta: "Pregunta 21: ¿Hay armas en el hogar?", respuesta: "Sí" },
            { pregunta: "Pregunta 22: ¿El agresor consume alcohol?", respuesta: "Sí" },
            { pregunta: "Pregunta 23: ¿El agresor consume drogas?", respuesta: "Sí" },
            { pregunta: "Pregunta 24: ¿Hay hijos en común?", respuesta: "Sí" },
            { pregunta: "Pregunta 25: ¿Los hijos han presenciado violencia?", respuesta: "Sí" },
            { pregunta: "Pregunta 26: ¿Tiene redes de apoyo?", respuesta: "No" },
            { pregunta: "Pregunta 27: ¿Puede acceder a servicios de salud?", respuesta: "No" },
            { pregunta: "Pregunta 28: ¿Tiene ingresos propios?", respuesta: "No" },
            { pregunta: "Pregunta 29: ¿Puede tomar decisiones?", respuesta: "No" },
            { pregunta: "Pregunta 30: ¿Ha habido intentos de suicidio?", respuesta: "Sí" },
            { pregunta: "Pregunta 31: ¿Sufre de depresión?", respuesta: "Sí" },
            { pregunta: "Pregunta 32: ¿Tiene ansiedad?", respuesta: "Sí" },
            { pregunta: "Pregunta 33: ¿Ha perdido el empleo por violencia?", respuesta: "Sí" },
            { pregunta: "Pregunta 34: ¿Le han prohibido estudiar?", respuesta: "Sí" },
            { pregunta: "Pregunta 35: ¿Recibe mensajes acosadores?", respuesta: "Sí" },
            { pregunta: "Pregunta 36: ¿Le vigilan sus movimientos?", respuesta: "Sí" },
            { pregunta: "Pregunta 37: ¿Ha cambiado su rutina por miedo?", respuesta: "Sí" },
            { pregunta: "Pregunta 38: ¿Cree que la violencia puede aumentar?", respuesta: "Sí" }
        ]
    },
    {
        nombre: "Diego Rojas",
        riesgo: "Bajo",
        estado: "Activo",
        fecha: "2025-11-12",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "No" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas?", respuesta: "No" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "No" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "No" },
            { pregunta: "Pregunta 5: ¿Existe violencia psicológica?", respuesta: "No" },
            { pregunta: "Pregunta 6: ¿Hay control económico?", respuesta: "No" },
            { pregunta: "Pregunta 7: ¿Ha sufrido violencia sexual?", respuesta: "No" },
            { pregunta: "Pregunta 8: ¿Existe aislamiento social?", respuesta: "No" },
            { pregunta: "Pregunta 9: ¿Le han impedido trabajar?", respuesta: "No" },
            { pregunta: "Pregunta 10: ¿Le han quitado sus documentos?", respuesta: "No" },
            { pregunta: "Pregunta 11: ¿Ha tenido lesiones visibles?", respuesta: "No" },
            { pregunta: "Pregunta 12: ¿Ha necesitado atención médica?", respuesta: "No" },
            { pregunta: "Pregunta 13: ¿Tiene acceso a sus cuentas?", respuesta: "Sí" },
            { pregunta: "Pregunta 14: ¿Puede ver a su familia?", respuesta: "Sí" },
            { pregunta: "Pregunta 15: ¿Puede salir libremente?", respuesta: "Sí" },
            { pregunta: "Pregunta 16: ¿Recibe insultos frecuentes?", respuesta: "No" },
            { pregunta: "Pregunta 17: ¿Le han destruido propiedades?", respuesta: "No" },
            { pregunta: "Pregunta 18: ¿Tiene apoyo familiar?", respuesta: "Sí" },
            { pregunta: "Pregunta 19: ¿Ha denunciado anteriormente?", respuesta: "No" },
            { pregunta: "Pregunta 20: ¿Existe riesgo de femicidio?", respuesta: "No" },
            { pregunta: "Pregunta 21: ¿Hay armas en el hogar?", respuesta: "No" },
            { pregunta: "Pregunta 22: ¿El agresor consume alcohol?", respuesta: "No" },
            { pregunta: "Pregunta 23: ¿El agresor consume drogas?", respuesta: "No" },
            { pregunta: "Pregunta 24: ¿Hay hijos en común?", respuesta: "No" },
            { pregunta: "Pregunta 25: ¿Los hijos han presenciado violencia?", respuesta: "No" },
            { pregunta: "Pregunta 26: ¿Tiene redes de apoyo?", respuesta: "Sí" },
            { pregunta: "Pregunta 27: ¿Puede acceder a servicios de salud?", respuesta: "Sí" },
            { pregunta: "Pregunta 28: ¿Tiene ingresos propios?", respuesta: "Sí" },
            { pregunta: "Pregunta 29: ¿Puede tomar decisiones?", respuesta: "Sí" },
            { pregunta: "Pregunta 30: ¿Ha habido intentos de suicidio?", respuesta: "No" },
            { pregunta: "Pregunta 31: ¿Sufre de depresión?", respuesta: "No" },
            { pregunta: "Pregunta 32: ¿Tiene ansiedad?", respuesta: "No" },
            { pregunta: "Pregunta 33: ¿Ha perdido el empleo por violencia?", respuesta: "No" },
            { pregunta: "Pregunta 34: ¿Le han prohibido estudiar?", respuesta: "No" },
            { pregunta: "Pregunta 35: ¿Recibe mensajes acosadores?", respuesta: "No" },
            { pregunta: "Pregunta 36: ¿Le vigilan sus movimientos?", respuesta: "No" },
            { pregunta: "Pregunta 37: ¿Ha cambiado su rutina por miedo?", respuesta: "No" },
            { pregunta: "Pregunta 38: ¿Cree que la violencia puede aumentar?", respuesta: "No" }
        ]
    },
    {
        nombre: "Paula Vargas",
        riesgo: "Moderado",
        estado: "Inactivo",
        fecha: "2025-10-28",
        respuestas: [
            { pregunta: "Pregunta 1: ¿Ha sufrido violencia física?", respuesta: "Sí" },
            { pregunta: "Pregunta 2: ¿Ha recibido amenazas?", respuesta: "Sí" },
            { pregunta: "Pregunta 3: ¿Tiene miedo por su seguridad?", respuesta: "Sí" },
            { pregunta: "Pregunta 4: ¿Ha sido acosada/o?", respuesta: "Sí" },
            { pregunta: "Pregunta 5: ¿Existe violencia psicológica?", respuesta: "Sí" },
            { pregunta: "Pregunta 6: ¿Hay control económico?", respuesta: "No" },
            { pregunta: "Pregunta 7: ¿Ha sufrido violencia sexual?", respuesta: "No" },
            { pregunta: "Pregunta 8: ¿Existe aislamiento social?", respuesta: "Sí" },
            { pregunta: "Pregunta 9: ¿Le han impedido trabajar?", respuesta: "No" },
            { pregunta: "Pregunta 10: ¿Le han quitado sus documentos?", respuesta: "No" },
            { pregunta: "Pregunta 11: ¿Ha tenido lesiones visibles?", respuesta: "Sí" },
            { pregunta: "Pregunta 12: ¿Ha necesitado atención médica?", respuesta: "Sí" },
            { pregunta: "Pregunta 13: ¿Tiene acceso a sus cuentas?", respuesta: "Sí" },
            { pregunta: "Pregunta 14: ¿Puede ver a su familia?", respuesta: "No" },
            { pregunta: "Pregunta 15: ¿Puede salir libremente?", respuesta: "Sí" },
            { pregunta: "Pregunta 16: ¿Recibe insultos frecuentes?", respuesta: "Sí" },
            { pregunta: "Pregunta 17: ¿Le han destruido propiedades?", respuesta: "No" },
            { pregunta: "Pregunta 18: ¿Tiene apoyo familiar?", respuesta: "Sí" },
            { pregunta: "Pregunta 19: ¿Ha denunciado anteriormente?", respuesta: "Sí" },
            { pregunta: "Pregunta 20: ¿Existe riesgo de femicidio?", respuesta: "No" },
            { pregunta: "Pregunta 21: ¿Hay armas en el hogar?", respuesta: "No" },
            { pregunta: "Pregunta 22: ¿El agresor consume alcohol?", respuesta: "Sí" },
            { pregunta: "Pregunta 23: ¿El agresor consume drogas?", respuesta: "No" },
            { pregunta: "Pregunta 24: ¿Hay hijos en común?", respuesta: "Sí" },
            { pregunta: "Pregunta 25: ¿Los hijos han presenciado violencia?", respuesta: "Sí" },
            { pregunta: "Pregunta 26: ¿Tiene redes de apoyo?", respuesta: "Sí" },
            { pregunta: "Pregunta 27: ¿Puede acceder a servicios de salud?", respuesta: "Sí" },
            { pregunta: "Pregunta 28: ¿Tiene ingresos propios?", respuesta: "Sí" },
            { pregunta: "Pregunta 29: ¿Puede tomar decisiones?", respuesta: "Sí" },
            { pregunta: "Pregunta 30: ¿Ha habido intentos de suicidio?", respuesta: "No" },
            { pregunta: "Pregunta 31: ¿Sufre de depresión?", respuesta: "Sí" },
            { pregunta: "Pregunta 32: ¿Tiene ansiedad?", respuesta: "Sí" },
            { pregunta: "Pregunta 33: ¿Ha perdido el empleo por violencia?", respuesta: "No" },
            { pregunta: "Pregunta 34: ¿Le han prohibido estudiar?", respuesta: "No" },
            { pregunta: "Pregunta 35: ¿Recibe mensajes acosadores?", respuesta: "Sí" },
            { pregunta: "Pregunta 36: ¿Le vigilan sus movimientos?", respuesta: "Sí" },
            { pregunta: "Pregunta 37: ¿Ha cambiado su rutina por miedo?", respuesta: "Sí" },
            { pregunta: "Pregunta 38: ¿Cree que la violencia puede aumentar?", respuesta: "Sí" }
        ]
    }
];

// Variables globales para búsqueda
let victimasFiltradas = [...victimas];
let filtroActual = "Todo";
let terminoBusqueda = "";

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

// Función para inicializar la búsqueda
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

// Función para aplicar todos los filtros - CORREGIDA
function aplicarFiltros() {
    // Primero aplicar filtro de búsqueda
    victimasFiltradas = victimas.filter(victima =>
        victima.nombre.toLowerCase().includes(terminoBusqueda)
    );

    // Luego aplicar filtro de riesgo solo si no es "Todo"
    if (filtroActual !== "Todo") {
        victimasFiltradas = victimasFiltradas.filter(victima =>
            victima.riesgo.toLowerCase() === filtroActual.toLowerCase()
        );
    }
    // Si es "Todo", mostrar todas las víctimas filtradas por búsqueda

    // Renderizar la tabla
    renderTablaFiltrada();
}

// Función para renderizar tabla con filtros aplicados
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

        tr.innerHTML = `
            <td class="px-6 py-3">${v.nombre}</td>
            <td class="px-6 py-3">
                <span class="inline-block w-20 text-center px-2 py-1 rounded-full ${colorRiesgo(v.riesgo)}">${v.riesgo}</span>
            </td>
            <td class="px-6 py-3">${v.estado}</td>
            <td class="px-6 py-3">${v.fecha}</td>
            <td class="px-6 py-3">
                <button onclick="abrirModal(${JSON.stringify(v).replace(/"/g, '&quot;')})" class="text-blue-600 hover:underline">Ver</button>
                <button class="text-red-600 hover:underline ml-2">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Función para abrir el modal
function abrirModal(victima) {
    const modal = document.getElementById('modalRespuestas');
    const modalContent = document.getElementById('modalContent');

    if (!modal || !modalContent) {
        console.error('No se encontró el modal o modalContent');
        return;
    }

    // Obtener porcentaje de respuestas "Sí"
    const totalRespuestas = victima.respuestas.length;
    const respuestasSi = victima.respuestas.filter(r => r.respuesta === 'Sí').length;
    const porcentaje = Math.round((respuestasSi / totalRespuestas) * 100);

    // Color según el riesgo
    const colorRiesgo = {
        "Bajo": "bg-green-500",
        "Moderado": "bg-yellow-500",
        "Alto": "bg-orange-500",
        "Extremo": "bg-red-600"
    }[victima.riesgo] || "bg-gray-500";

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
                                ${victima.riesgo}
                                <span class="text-xs opacity-90">(${porcentaje}%)</span>
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
                    <button onclick="guardarSentencia('${victima.nombre}')" class="sentencia-btn-guardar px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-purple-500 dark:to-purple-600 dark:hover:from-purple-600 dark:hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                        Guardar Sentencia
                    </button>
                    <button onclick="limpiarSentencia()" class="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                        Limpiar
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Lista de preguntas y respuestas -->
        <div class="space-y-3 max-h-96 overflow-y-auto">
    `;

    victima.respuestas.forEach((respuesta, index) => {
        const bgColor = respuesta.respuesta === 'Sí'
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40 border-green-200 dark:border-green-700'
            : 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/40 dark:to-pink-900/40 border-red-200 dark:border-red-700';

        const badgeColor = respuesta.respuesta === 'Sí'
            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 border border-green-300 dark:border-green-600'
            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 border border-red-300 dark:border-red-600';

        contenido += `
            <div class="${bgColor} border rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-800 dark:text-gray-200 flex-1 font-medium">${respuesta.pregunta}</span>
                    <span class="${badgeColor} ml-4 min-w-16 text-center text-sm font-bold px-3 py-2 rounded-lg shadow-sm">${respuesta.respuesta}</span>
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
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Función para renderizar tabla
function renderTabla(filtro = "Todo") {
    filtroActual = filtro;
    aplicarFiltros();
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', (e) => {
    const modal = document.getElementById('modalRespuestas');
    if (e.target === modal) {
        cerrarModal();
    }
});

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

// Función para abrir el modal de niveles de riesgo
function abrirRiskModal() {
    const modal = document.getElementById('riskLevelsModal');
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            const transformElement = modal.querySelector('.transform');
            if (transformElement) {
                transformElement.classList.remove('scale-95');
                transformElement.classList.add('scale-100');
            }
        }, 50);
    }
}

// Función para cerrar el modal de niveles de riesgo
function cerrarRiskModal() {
    const modal = document.getElementById('riskLevelsModal');
    if (modal) {
        const transformElement = modal.querySelector('.transform');
        if (transformElement) {
            transformElement.classList.remove('scale-100');
            transformElement.classList.add('scale-95');
        }
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

// Event listener para el botón flotante
document.addEventListener('DOMContentLoaded', function () {
    const floatingBtn = document.getElementById('floatingRiskBtn');
    if (floatingBtn) {
        floatingBtn.addEventListener('click', abrirRiskModal);
    }

    // Inicializar búsqueda
    inicializarBusqueda();

    // Renderizar tabla inicial
    renderTabla("Todo");
});

// Cerrar modal al hacer clic fuera
document.addEventListener('click', function (e) {
    const modal = document.getElementById('riskLevelsModal');
    if (modal && e.target === modal) {
        cerrarRiskModal();
    }
});

// Cerrar modal con ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        cerrarRiskModal();
        cerrarModal();
    }
});