let currentLevel = 1;

function goToNextLevel() {
  document.getElementById(`nivel${currentLevel}`).classList.remove('visible');
  currentLevel++;
  const next = document.getElementById(`nivel${currentLevel}`);
  next.classList.add('visible');
  next.classList.add('slide-in');
  setTimeout(() => next.classList.remove('slide-in'), 1000);
  
  if (currentLevel === 6) {
    triggerFinalAnimation();
  }
}

function checkNivel1() {
  const r = document.getElementById("respuesta1").value.toLowerCase();
  if (r.includes("nube") || r.includes("lluvia")) {
    goToNextLevel();
  } else {
    document.getElementById("error1").innerText = "Inténtalo de nuevo. Pista: está en el cielo.";
  }
}

let intentosNivel2 = 0;
const pistasNivel2 = [
  "No es un número.",
  "Es una expresión irreverente.",
  "Tiene que ver con un sentimiento muy fuerte...", 
  "¿A quién odiamos en las matemáticas...?"
];

function checkNivel2() {
  const r = document.getElementById("respuesta2").value.toLowerCase();
  if (r === "fuck amagoia") {
    goToNextLevel();
  } else {
    document.getElementById("error2").innerText = pistasNivel2[intentosNivel2] || "Prueba otra vez...";
    intentosNivel2++;
  }
}

const mierdas = document.querySelectorAll('.mierda');
mierdas.forEach(m => m.addEventListener('click', () => {
  document.body.classList.add('glitch-screen');
  setTimeout(() => {
    document.body.classList.remove('glitch-screen');
    goToNextLevel();
  }, 1500);
}));

let intentosNivel4 = 0;
function checkNivel4() {
  intentosNivel4++;
  if (intentosNivel4 >= 5) {
    goToNextLevel();
  } else {
    const mensajes = [
      "Muy lejos...",
      "Lejos...",
      "Algo más cerca...",
      "Casi...",
    ];
    document.getElementById("error4").innerText = mensajes[intentosNivel4 - 1] || "Mmm...";
  }
}

const palabraWordle = "udon";
let intentosWordle = 0;

function checkNivel5() {
  const r = document.getElementById("respuesta5").value.toLowerCase();
  if (r.length !== 4) {
    document.getElementById("error5").innerText = "Tiene que ser una palabra de 4 letras.";
    return;
  }
  let resultado = "";
  for (let i = 0; i < 4; i++) {
    if (r[i] === palabraWordle[i]) {
      resultado += `<span class='wordle letra-bien'>${r[i]}</span>`;
    } else if (palabraWordle.includes(r[i])) {
      resultado += `<span class='wordle letra-regular'>${r[i]}</span>`;
    } else {
      resultado += `<span class='wordle letra-mal'>${r[i]}</span>`;
    }
  }
  document.getElementById("resultadoWordle").innerHTML += `<p>${resultado}</p>`;
  intentosWordle++;
  if (r === palabraWordle) {
    goToNextLevel();
  } else if (intentosWordle >= 5) {
    document.getElementById("error5").innerText = "Agotaste tus intentos. ¡Pero bueno, se ve que lo intentaste!";
    setTimeout(() => goToNextLevel(), 3000);
  }
}

function triggerFinalAnimation() {
  const final = document.getElementById("final");
  final.classList.add("epic-win");
  final.innerHTML += `
    <div class="explosion">🎆🎇✨💥</div>
    <p class="mega-anuncio">🎁 ¡CENA PREMIUM EN UDON! 🎁</p>
  `;
  setTimeout(() => {
    document.querySelector('.explosion').classList.add('show');
    document.querySelector('.mega-anuncio').classList.add('pulse');
  }, 500);
}
