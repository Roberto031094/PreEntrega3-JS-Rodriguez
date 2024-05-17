// Crear el título
const h1 = document.createElement('h1');
h1.textContent = 'Creación de Personaje';
document.body.appendChild(h1);

// Hacer el formulario
const formulario = document.createElement('form');
formulario.id = 'formulario';
document.body.appendChild(formulario);

// Label y el input para el nombre
let label = document.createElement('label');
label.htmlFor = 'nombre';
label.textContent = 'Ingresa el Nombre del personaje:';
formulario.appendChild(label);

let input = document.createElement('input');
input.type = 'text';
input.id = 'nombre';
input.name = 'nombre';
input.pattern = '[A-Za-z ]+';
input.required = true;
formulario.appendChild(input);

formulario.appendChild(document.createElement('br'));
formulario.appendChild(document.createElement('br'));

// Para el apodo
label = document.createElement('label');
label.htmlFor = 'apodo';
label.textContent = 'Ingresa un Apodo para el personaje (Ej: El Destructor):';
formulario.appendChild(label);

input = document.createElement('input');
input.type = 'text';
input.id = 'apodo';
input.name = 'apodo';
input.pattern = '[A-Za-z ]+';
input.required = true;
formulario.appendChild(input);

formulario.appendChild(document.createElement('br'));
formulario.appendChild(document.createElement('br'));

// Para la clase
label = document.createElement('label');
label.htmlFor = 'clase';
label.textContent = 'Elige una Clase (caballero, arquero, hechicero):';
formulario.appendChild(label);

input = document.createElement('input');
input.type = 'text';
input.id = 'clase';
input.name = 'clase';
input.pattern = '[A-Za-z]+';
input.required = true;
formulario.appendChild(input);

formulario.appendChild(document.createElement('br'));
formulario.appendChild(document.createElement('br'));

// Alineación
label = document.createElement('label');
label.htmlFor = 'alineacion';
label.textContent = 'Ingresa su Alineación (orden, neutral, caos):';
formulario.appendChild(label);

input = document.createElement('input');
input.type = 'text';
input.id = 'alineacion';
input.name = 'alineacion';
input.pattern = '[A-Za-z ]+';
input.required = true;
formulario.appendChild(input);

formulario.appendChild(document.createElement('br'));
formulario.appendChild(document.createElement('br'));

// Agregar los mensajes de ayuda
let div = document.createElement('div');
let p = document.createElement('p');
p.textContent = '*Recuerda que solo puedes poner letras y espacios en las casillas.';
div.appendChild(p);
formulario.appendChild(div);

div = document.createElement('div');
p = document.createElement('p');
p.textContent = '*Cada clase tiene sus propias estadísticas predeterminadas.';
div.appendChild(p);
formulario.appendChild(div);

// Crear los botones
let button = document.createElement('button');
button.type = 'submit';
button.id = 'enviar';
button.textContent = 'Obtener Ficha';
formulario.appendChild(button);

button = document.createElement('button');
button.type = 'reset';
button.textContent = 'Limpiar';
formulario.appendChild(button);

button = document.createElement('button');
button.type = 'button';
button.id = 'guardarFichaBtn';
button.textContent = 'Guardar Datos de Ficha';
formulario.appendChild(button);

button = document.createElement('button');
button.type = 'button';
button.id = 'cargarFichaBtn';
button.textContent = 'Cargar Datos de Ficha';
formulario.appendChild(button);

button = document.createElement('button');
button.type = 'button';
button.id = 'borrarFichaBtn';
button.textContent = 'Borrar Datos Guardados';
formulario.appendChild(button);

// Función para validar la entrada del usuario
function validarClase(event) {
  event.preventDefault();
  const [inputClase, inputNombre, inputApodo, inputAlineacion] = [ // Destructuring de Array
      document.getElementById("clase").value.toLowerCase(),
      document.getElementById("nombre").value,
      document.getElementById("apodo").value,
      document.getElementById("alineacion").value.toLowerCase()
  ];

  if (!esEntradaValida(inputNombre, inputApodo, inputClase, inputAlineacion)) {
      alert("Por favor, ingresa datos válidos.");
      return;
  }

  const claseSeleccionada = datosClases.find(
      (clase) => clase.clase.toLowerCase() === inputClase
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
  
  // Mostrar la sección oculta al validar el formulario
  seccionOculta.classList.add('visible');
}

// Evitar que el formulario se envíe por defecto
document.getElementById("formulario").addEventListener("submit", function(event) {
  event.preventDefault();
  validarClase(event);
});

// Función para mostrar el perfil del personaje
function mostrarDatosPersonaje(inputNombre, inputApodo, inputClase, inputAlineacion) {
  const datosPersonajeDiv = document.getElementById("perfilPersonaje");
  const claseSeleccionada = datosClases.find(
      clase => clase.clase.toLowerCase() === inputClase
  );
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

// Método para validar la alineación
function esEntradaValida(nombre, apodo, clase, alineacion) {
  const letrasEspaciosRegex = /^[A-Za-z ]+$/;
  const alineacionValida = /^(orden|neutral|caos)$/;

  const valores = [nombre, apodo, clase];
  for (const valor of valores) {                // Ciclo For
      if (!letrasEspaciosRegex.test(valor)) {
          return false;
      }
  }

  return alineacionValida.test(alineacion);
}

// Función para mostrar el perfil del personaje
function mostrarDatosPersonaje(inputNombre, inputApodo, inputClase, inputAlineacion) {
  const datosPersonajeDiv = document.getElementById("perfilPersonaje");
  const claseSeleccionada = datosClases.find(
      clase => clase.clase.toLowerCase() === inputClase
  );
  const mensaje = claseSeleccionada ?
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
  const claseSeleccionada = datosClases.find(clase => clase.clase.toLowerCase() === inputClase);
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
  const claseSeleccionada = datosClases.find(clase => clase.clase.toLowerCase() === inputClase);
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
  const claseSeleccionada = datosClases.find(clase => clase.clase.toLowerCase() === inputClase);
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
  const claseSeleccionada = datosClases.find(clase => clase.clase.toLowerCase() === inputClase);
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

  localStorage.setItem('fichaGuardada', JSON.stringify(ficha));
  alert("Ficha guardada correctamente en localStorage.");
}

// Asignar la función al botón de Guardar
document.getElementById("guardarFichaBtn").addEventListener("click", guardarFicha);

// Función para cargar los datos guardados desde localStorage
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

// Función para borrar los datos guardados en localStorage
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