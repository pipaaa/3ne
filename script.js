let currentLevel = 1;
let intentos2 = 0;
let intentos4 = 0;
let intentos5 = 0;

function showLevel(level) {
  document.querySelectorAll('.nivel').forEach(n => n.classList.remove('visible'));
  const nivel = document.getElementById('nivel' + level);
  if (nivel) nivel.classList.add('visible');
  currentLevel = level;
}

function checkNivel1() {
  const res = document.getElementById("respuesta1").value.toLowerCase();
  if (res.includes("nube") || res.includes("lluvia")) {
    showLevel(2);
  } else {
    document.getElementById("error1").textContent = "Pista: Se encuentra en el cielo, ¡vuelve a intentarlo!";
  }
}

function checkNivel2() {
  const res = document.getElementById("respuesta2").value.toLowerCase();
  intentos2++;
  if (res === "fuck amagoia") {
    showLevel(3);
    setupNivel3();
  } else {
    const pistas = [
      "Pista 1: No es un número.",
      "Pista 2: Es una frase en inglés.",
      "Pista 3: Empieza por F y es grosera.",
      "Pista 4: La respuesta es 'fuck amagoia'."
    ];
    document.getElementById("error2").textContent = pistas[Math.min(intentos2 - 1, pistas.length - 1)];
  }
}

function setupNivel3() {
  const nivel3 = document.getElementById("nivel3");
  if (!document.getElementById("glitch-mierdas")) {
    const div = document.createElement("div");
    div.id = "glitch-mierdas";
    div.innerHTML = `
      <span class="mierda">💩</span>
      <span class="mierda">💩</span>
      <span class="mierda">💩</span>
    `;
    nivel3.appendChild(div);
    document.querySelectorAll(".mierda").forEach(m => {
      m.style.cursor = "pointer";
      m.addEventListener("click", glitchAndContinue);
    });
  }
}

function glitchAndContinue() {
  document.body.style.animation = 'glitch 0.5s ease-in-out';
  setTimeout(() => {
    document.body.style.animation = '';
    showLevel(4);
  }, 700);
}

function checkNivel4() {
  const res = document.getElementById("respuesta4").value.trim();
  intentos4++;
  if (intentos4 >= 4) {
    showLevel(5);
  } else {
    document.getElementById("error4").textContent = "Hmm... parece que estás cerca, ¿o no?";
  }
}

function checkNivel5() {
  const res = document.getElementById("respuesta5").value.toUpperCase();
  intentos5++;
  if (res === "UDON") {
    showLevel("final");
  } else {
    if (intentos5 >= 5) {
      document.getElementById("error5").textContent = "Era UDON... pero como eres especial, ¡te dejo pasar!";
      setTimeout(() => showLevel("final"), 2000);
    } else {
      document.getElementById("error5").textContent = `Nope. Te quedan ${5 - intentos5} intentos.`;
    }
  }
}

// Inicializar primer nivel al cargar
window.onload = () => {
  showLevel(1);
};
