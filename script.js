// Variables para niveles
let nivelActual = 1;

// Utilidades para mostrar niveles y errores
function mostrarNivel(n) {
  document.querySelectorAll('.nivel').forEach(div => div.classList.remove('visible', 'fade-in'));
  const nivel = document.getElementById('nivel' + n);
  if (nivel) {
    nivel.classList.add('visible');
    setTimeout(() => nivel.classList.add('fade-in'), 100);
  }
  if (n === 'final') {
    const final = document.getElementById('final');
    final.classList.add('visible', 'fade-in');
  }
}

function mostrarError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.opacity = '1';
  setTimeout(() => { el.style.opacity = '0'; }, 3500);
}

// Nivel 1: Adivinanza
function checkNivel1() {
  const resp = document.getElementById('respuesta1').value.trim().toLowerCase();
  if (resp === 'nube') {
    nivelActual = 2;
    mostrarNivel(2);
  } else {
    mostrarError('error1', '¡No es correcto! Piensa en algo que vuela sin alas y llora sin ojos.');
  }
}

// Nivel 2: Suma misteriosa con pistas
const pistasNivel2 = [
  'No es un número, sino una expresión...',
  'Está enfadado con Amagoia...',
  'Si preguntas a Amagoia, te responde con sorpresa...',
  'A quién odiamos en las matemáticas...'
];
let intentosNivel2 = 0;
function checkNivel2() {
  const resp = document.getElementById('respuesta2').value.trim().toLowerCase();
  if (resp === 'fuck amagoia') {
    nivelActual = 3;
    mostrarNivel(3);
  } else {
    if (intentosNivel2 < pistasNivel2.length) {
      mostrarError('error2', pistasNivel2[intentosNivel2]);
      intentosNivel2++;
    } else {
      mostrarError('error2', '¡Sigue intentando, no es tan obvio!');
    }
  }
}

// Nivel 3: Glitch en las mierdas
const mierdas = document.querySelectorAll('.mierda');
mierdas.forEach(mierda => mierda.addEventListener('click', () => {
  activarGlitchPantalla(() => {
    nivelActual = 4;
    mostrarNivel(4);
  });
}));

// Función glitch brutal y bañada
function activarGlitchPantalla(callback) {
  // Añadir texto para ::before y ::after
  document.body.setAttribute('data-text', document.body.innerText);
  document.body.classList.add('glitch-screen', 'scaled');

  // Añadir líneas interferencia
  let lines = document.createElement('div');
  lines.classList.add('glitch-lines');
  document.body.appendChild(lines);

  // Duración glitch 2.5s
  setTimeout(() => {
    document.body.classList.remove('glitch-screen', 'scaled');
    if (lines.parentNode) lines.parentNode.removeChild(lines);
    callback();
  }, 2500);
}

// Nivel 4: Matemáticas de Aimar (psicológico, gradual)
const mensajesNivel4 = [
  'De verdad, tiene lógica. PIENSA.',
  'Muy lejos...',
  'Un poco más cerca...',
  'Ya casi lo tienes...',
  '¡Esta es la respuesta correcta!'
];
let intentosNivel4 = 0;
function checkNivel4() {
  const resp = document.getElementById('respuesta4').value.trim();
  const error4 = document.getElementById('error4');

  if (intentosNivel4 < mensajesNivel4.length - 1) {
    mostrarError('error4', mensajesNivel4[intentosNivel4]);
    intentosNivel4++;
  } else {
    // En el 4to intento cualquier respuesta es "correcta"
    nivelActual = 5;
    mostrarNivel(5);
  }
  document.getElementById('respuesta4').value = '';
}

// Nivel 5: Wordle Final
const palabraFinal = 'udon';
let intentosWordle = 0;
const maxIntentosWordle = 5;

function checkNivel5() {
  const input = document.getElementById('respuesta5');
  const intento = input.value.trim().toLowerCase();
  const resultado = document.getElementById('resultadoWordle');
  const error5 = document.getElementById('error5');
  if (intento.length !== palabraFinal.length) {
    mostrarError('error5', 'Introduce una palabra de 4 letras.');
    return;
  }

  intentosWordle++;
  // Feedback estilo Wordle
  let display = '';
  for (let i = 0; i < intento.length; i++) {
    if (intento[i] === palabraFinal[i]) {
      display += `<span class="letra correcta">${intento[i].toUpperCase()}</span>`;
    } else if (palabraFinal.includes(intento[i])) {
      display += `<span class="letra cerca">${intento[i].toUpperCase()}</span>`;
    } else {
      display += `<span class="letra incorrecta">${intento[i].toUpperCase()}</span>`;
    }
  }
  resultado.innerHTML += `<div class="fila-wordle">${display}</div>`;
  input.value = '';

  if (intento === palabraFinal) {
    lanzarAnimacionFinal();
  } else if (intentosWordle >= maxIntentosWordle) {
    mostrarError('error5', `Has agotado los intentos. La palabra era: ${palabraFinal.toUpperCase()}`);
    input.disabled = true;
  }
}

// Animación final super mega premium
function lanzarAnimacionFinal() {
  mostrarNivel('final');

  const finalDiv = document.getElementById('final');
  finalDiv.style.opacity = '0';
  finalDiv.style.transition = 'opacity 2s ease-in-out';
  setTimeout(() => finalDiv.style.opacity = '1', 100);

  // Explosiones de partículas con canvas
  crearExplosiones();

  // Texto vibrante con animación infinita
  finalDiv.classList.add('rainbow-text', 'vibrante');

  // Confetti animado (usa una librería o simple canvas)
  lanzarConfetti();

  // Quitar input y botones
  document.querySelectorAll('input, button').forEach(el => el.disabled = true);
}

// Función confetti (simplificado)
function lanzarConfetti() {
  const confettiCanvas = document.createElement('canvas');
  confettiCanvas.id = 'confettiCanvas';
  confettiCanvas.style.position = 'fixed';
  confettiCanvas.style.top = '0';
  confettiCanvas.style.left = '0';
  confettiCanvas.style.width = '100vw';
  confettiCanvas.style.height = '100vh';
  confettiCanvas.style.pointerEvents = 'none';
  confettiCanvas.style.zIndex = '100000';
  document.body.appendChild(confettiCanvas);

  const ctx = confettiCanvas.getContext('2d');
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const confettis = [];
  for(let i = 0; i < 150; i++) {
    confettis.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 20 + 10,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngle: 0,
      tiltAngleIncrement: (Math.random() * 0.07) + 0.05,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettis.forEach(c => {
      ctx.beginPath();
      ctx.lineWidth = c.r / 2;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 4, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 4);
      ctx.stroke();
    });
  }

  function update() {
    confettis.forEach(c => {
      c.tiltAngle += c.tiltAngleIncrement;
      c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
      c.x += Math.sin(c.d);
      c.tilt = Math.sin(c.tiltAngle) * 15;

      if (c.y > confettiCanvas.height) {
        c.x = Math.random() * confettiCanvas.width;
        c.y = -10;
      }
    });
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }
  loop();
}

// Mostrar el primer nivel
mostrarNivel(1);
