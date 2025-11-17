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

const sidebar = document.getElementById('sidebar');
const logoCompact = document.getElementById('logo-compact');
const logoFull = document.getElementById('logo-full');
const navLabels = document.querySelectorAll('.nav-label');
const navItems = document.querySelectorAll('.nav-item');
const openBtn = document.getElementById('openFormBtn');
const modal = document.getElementById('userFormModal');
const closeBtn = document.getElementById('closeFormBtn');

// Modal
openBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
});

const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
};

closeBtn.addEventListener('click', closeModal);

// Cerrar modal al hacer clic fuera
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Cerrar modal con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('flex')) {
        closeModal();
    }
});

// Sidebar
sidebar.addEventListener('mouseenter', () => {
    sidebar.classList.replace('sidebar-collapsed', 'sidebar-expanded');
    logoCompact.style.display = 'none';
    logoFull.style.display = 'block';
    navLabels.forEach(l => l.style.display = 'inline-block');
    navItems.forEach(i => i.classList.remove('justify-center'));
});

sidebar.addEventListener('mouseleave', () => {
    sidebar.classList.replace('sidebar-expanded', 'sidebar-collapsed');
    logoCompact.style.display = 'flex';
    logoFull.style.display = 'none';
    navLabels.forEach(l => l.style.display = 'none');
    navItems.forEach(i => i.classList.add('justify-center'));
});

// Dropdown de perfil
const profileButton = document.getElementById('profileButton');
const profileDropdown = document.getElementById('profileDropdown');

profileButton.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('hidden');
});

// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!profileButton.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.add('hidden');
    }
});

function cerrarDropdown() {
    profileDropdown.classList.add('hidden');
}

// Tabs - CORREGIDO
const tabs = document.querySelectorAll('.browser-tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');

        // Remover active de todos los tabs
        tabs.forEach(t => t.classList.remove('active'));

        // Remover active de todos los contenidos
        contents.forEach(c => c.classList.remove('active'));

        // Agregar active al tab clickeado
        tab.classList.add('active');

        // Agregar active al contenido correspondiente
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

/* ---------------------------------------------------------
   1. Municipios según departamento
--------------------------------------------------------- */
const municipiosPorDepto = {
    "San Salvador": ["Aguilares", "El Paisnal", "Guazapa", "Soyapango", "Ilopango", "San Martin", "Tonacatepeque", "San Marcos", "Panchimalco", "Santiago Texacuangos", "Santo Tomás", "Rosario de Mora", "Apopa", "Nejapa", "San Salvador", "Mejicanos", "Ayutuxtepeque", "Cuscatancingo", "Ciudad Delgado"],
    "La Libertad": ["Antiguo Cuscatlán", "Chiltiupán", "Ciudad Arce", "Colón", "Comasagua", "Huizúcar", "Jayaque", "Jicalapa", "La Libertad", "Nuevo Cuscatlan", "Quezaltepeque", "Sacacoyo", "San Juan Opico", "San José Villanueva", "San Matías", "San Pablo Tacachico", "Santa Tecla", "Talnique", "Tamanique", "Teotepeque", "Tepecoyo", "Zaragoza"],
    "Santa Ana": ["Masahuat", "Metapán", "Santa Rosa Guachipilín", "Texistepeque", "Santa Ana", "Coatepeque", "El Congo", "Candelaria de la Frontera", "Chalchuapa", "El Porvenir", "San Antonio Pajonal", "San Sebastián Salitrillo", "Santiago de la Frontera"],
    "San Miguel": ["San Miguel", "Comacarán", "Uluazapa", "Moncagua", "Quelepa", "Chirilagua", "Ciudad Barrios", "Sesori", "Nuevo Edén de San Juan", "San Gerardo", "San Luis de La Reina", "Carolina", "San Antonio del Mosco", "Chalpeltique", "Lolotique", "Nueva Guadalupe", "Chinameca", "San Jorge", "San Rafael Oriente", "El Tránsito"],
    "Sonsonate": ["Juayúa", "Nahuizalco", "Salcoatitán", "Santa Catarina Masahuat", "Sonsonate", "Sonzacate", "Nahuilingo", "San Antonio del Monte", "Santo Domingo de Guzmán", "Izalco", "Armenia", "Caluco", "San Julián", "Cuisnahuat", "Santa Isabel Ishuatán", "Acajutla"],
    "Usulután": ["Santiago de María", "Alegría", "Berlín", "Mercedes Umaña", "Jucuapa", "El Triunfo", "Estanzuelas", "San Buenaventura", "Nueva Granada", "Jiquilisco", "Puerto El Triunfo", "San Agustín", "San Francisco Javier", "Usulután", "Jucuarán", "San Dionisio", "Concepción Batres", "Santa María", "Ozatlán", "Santa Elena", "California", "Ereguayquín"],
    "La Unión": ["Anamorós", "Bolívar", "Concepción de Oriente", "El Sauce", "Lislique", "Nueva Esparta", "Pasaquina", "Poloros", "San José La Fuente", "Santa Rosa de Lima", "La Union", "Conchagua", "El Carmen", "Intipucá", "Meanguera del Golfo", "San Alejo", "Yayantique", "Yucuaquín"],
    "Morazán": ["Corinto", "Arambala", "El Jocoatique", "El Rosario", "Joateca", "Meanguera", "Perquín", "San Fernando", "San Isidro", "Torola", "San Francisco Gotera", "Cacaopera", "Chilanga", "Delicias de Concepción", "Gualococti", "Loloquiquilco", "Osicala", "Sensembra", "Sociedad", "Yamabal"],
    "Chalatenango": ["Chalatenango", "Citalá", "La Palma", "San Ignacio", "Potonico", "San Rafael", "Arcatao", "Azacualpa", "Las Vueltas", "Nueva Concepción", "Tejutla", "El Paraíso", "San Antonio de la Cruz", "San Isidro Labradro", "San Jose Cancasque", "San Miguel de Mercedes", "San Francisco Lempa", "Dulce Nombre de María", "San Antonio Los Ranchos", "San Emigdio", "San Luis del Carmen", "San Marcos de la Sierra", "Santa Rita", "Nombre de Jesús", "Ojos de Agua", "La Laguna"],
    "Cabañas": ["Sensuntepeque", "Guacotecti", "San Isidro", "Victoria", "Dolores", "San Ildefonso", "Villa Hidalgo", "Ilobasco", "Cinquera"],
    "Cuscatlán": ["Cojutepeque", "San Pedro Pelulapán", "San Rafael Cedro", "Candelaria", "Monte San Juan", "El Carmen", "Santa Cruz Michapa", "Tenancingo", "Suchitoto", "San Bartolomé Perulapía", "San Jose Guayabal", "Oratorio de Concepción", "San Cristobal", "Santa Cruz Analquito", "San Ramon", "El Rosario", "Concepción"],
    "La Paz": ["Zacatecoluca", "San Juan Nonualco", "Santiango Nonualco", "San Luis Talpa", "San Pedro Nonualco", "Cuyultitán", "Santa María Ostuma", "San Miguel Tepezontes", "San Pedro Masahuat", "El Rosario", "San Emigdio", "San Francisco Chinameca", "Paraíso de Osorio", "Jerusalén", "La Montañita", "San Ramón", "Santa Marta", "San Felipe", "Guadalupe"],
    "San Vicente": ["San Vicente", "Apastepeque", "Santa Clara", "San Esteban Catarina", "San Ildefonso", "San Sebastián", "Santo Domingo", "Tecoluca", "Guadalupe"],
    "Ahuachapán": ["Atiquizaya", "El Refugio", "San Lorenzo", "Turín", "Chalchuapa", "Ahuachapán", "Apaneca", "Concepción de Ataco", "Tacuba", "Guaymango", "San Pedro Puxtla"]
};

document.getElementById("departamento").addEventListener("change", function () {
    const depto = this.value;
    const municipioSelect = document.getElementById("municipio");

    municipioSelect.innerHTML = "<option value=''>Seleccione municipio...</option>";

    if (municipiosPorDepto[depto]) {
        municipiosPorDepto[depto].forEach(m => {
            municipioSelect.innerHTML += `<option>${m}</option>`;
        });
    }
});

/* ---------------------------------------------------------
   2. Materias según tipo de tribunal
--------------------------------------------------------- */
const materiasPorTipo = {
    "Sala de lo Constitucional": ["Constitucional"],
    "Sala de lo Civil": ["Civil"],
    "Sala de lo Penal": ["Penal"],
    "Sala de lo Contencioso Administrativo": ["Contencioso Administrativo"],

    "Cámara Civil": ["Civil"],
    "Cámara Penal": ["Penal"],
    "Cámara de Familia": ["Familia"],
    "Cámara de lo Laboral": ["Laboral"],
    "Cámara de lo Contencioso Administrativo": ["Contencioso Administrativo"],
    "Cámara de lo Medio Ambiente": ["Medio Ambiente"],
    "Cámara Especializada para una Vida Libre de Violencia y Discriminación para las Mujeres": ["Violencia contra la Mujer"],
    "Cámara Especializada de Extinción de Dominio": ["Extinción de Dominio"],
    "Cámara Especializada de Menores": ["Menores"],

    "Juzgado Especializado de Instrucción": ["Penal (Instrucción)"],
    "Tribunal Especializado de Sentencia": ["Penal (Sentencia)"],
    "Juzgado Especializado para una Vida Libre de Violencia y Discriminación para las Mujeres": ["Violencia contra la Mujer"],
    "Tribunal Especializado para una Vida Libre de Violencia y Discriminación para las Mujeres": ["Violencia contra la Mujer"],
    "Juzgado Especializado de Extinción de Dominio": ["Extinción de Dominio"],
    "Tribunal Especializado de Extinción de Dominio": ["Extinción de Dominio"],
    "Juzgado Especializado de Menores": ["Menores"],

    "Juzgado de lo Civil": ["Civil"],
    "Juzgado de lo Mercantil": ["Mercantil"],
    "Juzgado de Familia": ["Familia"],
    "Juzgado de lo Laboral": ["Laboral"],
    "Juzgado de Instrucción": ["Penal"],
    "Juzgado de Sentencia": ["Penal"],
    "Juzgado de Medio Ambiente": ["Medio Ambiente"],
    "Juzgado de Ejecución de la Pena": ["Ejecución de Penal"],
    "Juzgado de Vigilancia Penitenciaria": ["Vigilancia Penitenciaria"],
    "Juzgado de Menores": ["Menores"],

    "Juzgado de Paz": ["Multipropósito"]
};

document.getElementById("tipoTribunal").addEventListener("change", function () {
    const tipo = this.value;
    const materiaSelect = document.getElementById("materia");

    materiaSelect.innerHTML = "";

    if (materiasPorTipo[tipo]) {
        materiasPorTipo[tipo].forEach(mat => {
            materiaSelect.innerHTML += `<option>${mat}</option>`;
        });
    } else {
        materiaSelect.innerHTML = `<option>No definido</option>`;
    }
});