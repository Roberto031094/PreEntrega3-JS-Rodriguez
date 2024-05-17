// Función para validar la entrada del usuario
function validarClase(event) {
  event.preventDefault();
  const [inputClase, inputNombre, inputApodo, inputAlineacion] = [ // Aca usé destructuring de array
    document.getElementById("clase").value.toLowerCase(),
    document.getElementById("nombre").value,
    document.getElementById("apodo").value,
    document.getElementById("alineacion").value.toLowerCase()
  ];

  // Método para validar las entradas del usuario
  if (!esEntradaValida(inputNombre, inputApodo, inputClase, inputAlineacion)) {
    alert("Por favor, ingresa datos válidos.");
    return;
  }

  const claseSeleccionada = datosClases.find(
    (clase) => clase.clase.toLowerCase() === inputClase.toLowerCase()
  );
  if (!claseSeleccionada) {
    alert("Clase no encontrada.");
    return;
  }

  localStorage.setItem("claseSeleccionada", inputClase);

  mostrarDatosPersonaje(inputNombre, inputApodo, inputClase, inputAlineacion);
  mostrarEstadisticas(inputClase);
  mostrarBiografia(inputClase);
  mostrarHabilidades(inputClase);
  mostrarImagen(inputClase);
  seccionOculta.style.display = "flex";
  seccionOculta.style.flexDirection = "row";
  seccionOculta.style.justifyContent = "center";
  seccionOculta.style.alignItems = "center";
}

// Método para validar la alineación
function esEntradaValida(nombre, apodo, clase, alineacion) {
  const letrasEspaciosRegex = /^[A-Za-z ]+$/;
  const alineacionValida = /^(orden|neutral|caos)$/;

  const valores = [nombre, apodo, clase];
  for (const valor of valores) { // Ciclo For
    if (!letrasEspaciosRegex.test(valor)) {
      return false;
    }
  }

  return alineacionValida.test(alineacion);
}

// Función para mostrar el perfil del personaje
function mostrarDatosPersonaje(inputNombre, inputApodo, inputClase, inputAlineacion) {
  const datosPersonajeDiv = document.getElementById("perfilPersonaje");
  const claseSeleccionada = datosClases.find(clase => clase.clase.toLowerCase() === inputClase.toLowerCase()); // Aca uso a find como FOS, que toma como argumento una función clase
  console.log("Clase seleccionada:", claseSeleccionada);
  const mensaje = claseSeleccionada ? // Operador Ternario
    `
      <h3>Perfil:</h3>
      <ul>
          <li><p><strong>Nombre:</strong> ${inputNombre}</p></li>
          <li><p><strong>Apodo:</strong> "${inputApodo}"</p></li>
          <li><p><strong>Clase:</strong> ${claseSeleccionada.clase}</p></li>
          <li><p><strong>Alineación:</strong> ${inputAlineacion}</p></li>
      </ul>  
    ` :
    "<p>Error: Clase no encontrada en los datos.</p>";

  datosPersonajeDiv.innerHTML = mensaje;
}

// Evitar que el formulario se envíe por defecto
document.getElementById("formulario").addEventListener("submit", function(event) {
  event.preventDefault();
  validarClase(event);
});

// Función para mostrar las estadísticas de la clase
function mostrarEstadisticas(inputClase) {
  const claseSeleccionada = datosClases.find(clase => clase.clase.toLowerCase() === inputClase.toLowerCase());
  const estadisticasContainer = document.getElementById("estadisticasContainer");

  if (claseSeleccionada) {
    estadisticasContainer.innerHTML = `
      <h3>Estadísticas ${inputClase}:</h3>
      <p>-Fuerza: ${claseSeleccionada.estadisticas.fuerza}</p>
      <p>-Inteligencia: ${claseSeleccionada.estadisticas.inteligencia}</p>
      <p>-Carisma: ${claseSeleccionada.estadisticas.carisma}</p>
      <p>-Agilidad: ${claseSeleccionada.estadisticas.agilidad}</p>
      <p>-Resistencia: ${claseSeleccionada.estadisticas.resistencia}</p>
      <p>-Espíritu: ${claseSeleccionada.estadisticas.espiritu}</p>
      <p>-Suerte: ${claseSeleccionada.estadisticas.suerte}</p>
    `;
  } else {
    estadisticasContainer.innerHTML = "<p>Error: Clase no encontrada en las estadísticas.</p>";
  }
}

// Función para mostrar la biografía de la clase
function mostrarBiografia(inputClase) {
  const claseSeleccionada = datosClases.find(clase => clase.clase.toLowerCase() === inputClase.toLowerCase());
  const biografiaContainer = document.getElementById("biografiaContainer");

  if (claseSeleccionada) {
    biografiaContainer.innerHTML = `
      <h3>Biografía:</h3>
      <p>${claseSeleccionada.biografia}</p>
    `;
  } else {
    biografiaContainer.innerHTML = "<p>Error: Clase no encontrada en las biografías.</p>";
  }
}

// Función para mostrar las habilidades de la clase
function mostrarHabilidades(inputClase) {
  const claseSeleccionada = datosClases.find(clase => clase.clase.toLowerCase() === inputClase.toLowerCase());
  const habilidadesContainer = document.getElementById("habilidadesContainer");

  if (claseSeleccionada) {
    habilidadesContainer.innerHTML = `
      <h3>Habilidades:</h3>
      <ul>
        <li>H.P: ${claseSeleccionada.habilidades.habilidadP}</li>
        <li>H.S: ${claseSeleccionada.habilidades.habilidadS}</li>
        <li>H.E: ${claseSeleccionada.habilidades.habilidadE}</li>
      </ul>
    `;
  } else {
    habilidadesContainer.innerHTML = "<p>Error: Clase no encontrada en las habilidades.</p>";
  }
}

// Función para mostrar la imagen correspondiente a la clase
function mostrarImagen(inputClase) {
  const claseSeleccionada = datosClases.find(clase => clase.clase.toLowerCase() === inputClase.toLowerCase());
  const imagenPersonaje = document.getElementById("imagenPersonaje");

  if (claseSeleccionada) {
    imagenPersonaje.src = `./imagenes/${claseSeleccionada.clase}.png`;
  } else {
    imagenPersonaje.src = ''; // Deja en blanco
  }
}

// Función para guardar la ficha en localStorage
function guardarFicha() {
  const nombre = document.getElementById("nombre").value;
  const apodo = document.getElementById("apodo").value;
  const clase = document.getElementById("clase").value.toLowerCase();
  const alineacion = document.getElementById("alineacion").value.toLowerCase();

  const ficha = { nombre, apodo, clase, alineacion };

  localStorage.setItem('fichaGuardada', JSON.stringify(ficha)); // Uso de localStorage y JSON
  alert("Ficha guardada correctamente en localStorage.");
}

// Asignar la función al botón de Guardar
document.getElementById("guardarFichaBtn").addEventListener("click", guardarFicha);

// Función para cargar los datos guardada desde localStorage
function cargarFichaGuardada() {
  const fichaGuardada = localStorage.getItem('fichaGuardada');
  if (fichaGuardada) {
    const datosFicha = JSON.parse(fichaGuardada);

    // Rellenar los campos con los datos guardados
    document.getElementById("nombre").value = datosFicha.nombre || '';
    document.getElementById("apodo").value = datosFicha.apodo || '';
    document.getElementById("clase").value = datosFicha.clase || '';
    document.getElementById("alineacion").value = datosFicha.alineacion || '';
  } else {
    alert("No hay una ficha guardada en el localStorage.");
  }
}

// Asignar la función al botón de Cargar
document.getElementById("cargarFichaBtn").addEventListener("click", cargarFichaGuardada);

// Función para borrar los daots guardados en localStorage
function borrarFichaGuardada() {
  localStorage.removeItem('fichaGuardada');
  alert("Ficha guardada borrada correctamente del localStorage.");
}

// Asignar la función al botón de Borrar
document.getElementById("borrarFichaBtn").addEventListener("click", borrarFichaGuardada);

// Manejar la acción de mostrar/ocultar al hacer clic en el botón
const mostrarBtn = document.getElementById('enviar');
const seccionOculta = document.getElementById('seccionOculta');

mostrarBtn.addEventListener('click', function() {
    seccionOculta.style.display = 'flex';
    seccionOculta.style.flexDirection = 'row';
    seccionOculta.style.justifyContent = 'center';
    seccionOculta.style.alignItems = 'center';
});
