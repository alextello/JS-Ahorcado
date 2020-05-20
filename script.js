const palabraEl = document.getElementById('word');
const letrasIncorrectasEl = document.getElementById('wrong-letters');
const jugarOtraBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notificacion = document.getElementById('notification-container');
const mensajeFinal = document.getElementById('final-message');

const figura = document.querySelectorAll('.figure-part');

const palabras = ['aplicacion', 'programador', 'interface', 'wizard'];

let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];

const letrasCorrectas = [];
const letrasIncorrectas = [];

// Show hidden word
function desplegarPalabra() {
    palabraEl.innerHTML = `
    ${palabraSeleccionada
            .split('')
            .map(
                letra => `
          <span class="letter">
            ${letrasCorrectas.includes(letra) ? letra : ''}
          </span>
        `
            )
            .join('')}
  `;

    const innerWord = palabraEl.innerText.repeat(/\n/g, '') // Reemplaza los saltos de linea
    if (innerWord === palabraSeleccionada) {
        mensajeFinal.innerText = 'Felicidades, ganaste!';
        popup.style.display = 'flex'
    }
}

// actualizar letras incorrectas
function actualizarLetrasIncorrectasEl() {
    // Mostrar letras incorrectas
    letrasIncorrectasEl.innerHTML = `
    ${letrasIncorrectas.length > 0 ? '<p>Incorrecto</p>' : ''}
    ${letrasIncorrectas.map(letra => `<span>${letra}</span>`)}
    `;

    // Mostrar partes de ahorcado
    figura.forEach((parte, index) => {
        const errores = letrasIncorrectas.length;
        if (index < errores) {
            parte.style.display = 'block';
        } else {
            parte.style.display = 'none';
        }
    });

    // Verificar si se perdió
    if (letrasIncorrectas.length === figura.length) {
        mensajeFinal.innerText = 'Has perdido';
        popup.style.display = 'flex';
    }
}

// Mostrar notificacion

function mostrarNotificacion() {
    notificacion.classList.add('show');
    setTimeout(() => {
        notificacion.classList.remove('show');
    }, 2000);

}


// Escuchar teclas
window.addEventListener('keydown', e => {
    // Verifica que la tecla pertenezca al alfabeto
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letra = e.key;
        if (palabraSeleccionada.includes(letra)) {
            if (!letrasCorrectas.includes(letra)) {
                letrasCorrectas.push(letra);
                desplegarPalabra();
            } else {
                mostrarNotificacion();
            }
        } else {
            if (!letrasIncorrectas.includes(letra)) {
                letrasIncorrectas.push(letra);
                actualizarLetrasIncorrectasEl();
            } else {
                mostrarNotificacion();
            }
        }
    }
});

// Reiniciar juego
jugarOtraBtn.addEventListener('click', () => {
    // Variar arrays
    letrasCorrectas.splice(0);
    letrasIncorrectas.splice(0);

    palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
    desplegarPalabra();
    actualizarLetrasIncorrectasEl();
    popup.style.display = 'none';
});

desplegarPalabra();
