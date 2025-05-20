// calculatrice-script.js

let display = document.getElementById('display');
let historyPanel = null;
let history = [];

function input(value) {
  if (display.innerText === '0' && value !== '.' && value !== '(' && value !== ')' && value !== '%') {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
}

function clearDisplay() {
  display.innerText = '0';
}

function backspace() {
  if (display.innerText.length === 1 || (display.innerText.length === 2 && display.innerText.startsWith('-'))) {
    display.innerText = '0';
  } else {
    display.innerText = display.innerText.slice(0, -1);
  }
}

function calculate() {
  try {
    let expression = display.innerText
      .replace(/×/g, '*')
      .replace(/−/g, '-');

    // Vérifier et traiter les cas de modulo
    if (expression.includes('%')) {
      const parts = expression.split('%');
      if (parts.length === 2) {
        const left = eval(parts[0]); // Évaluer la partie gauche
        const right = eval(parts[1]); // Évaluer la partie droite
        if (!isNaN(left) && !isNaN(right)) {
          const result = left % right; // Calculer le modulo
          addToHistory(expression, result);
          display.innerText = result;
          return;
        }
      }
      throw new Error('Invalid Modulo Expression');
    }

    const result = eval(expression);
    if (Number.isFinite(result)) {
      addToHistory(expression, result);
      display.innerText = result;
    } else {
      display.innerText = 'Erreur';
    }
  } catch (e) {
    display.innerText = 'Erreur';
  }
}

function addToHistory(expression, result) {
  history.unshift({ expression, result });
  updateHistoryPanel();
}

function toggleHistory() {
  if (!historyPanel) {
    historyPanel = document.createElement('div');
    historyPanel.className = 'history';
    document.body.appendChild(historyPanel);
  }

  historyPanel.classList.toggle('visible');
  updateHistoryPanel();

  // Trigger the animation
  if (historyPanel.classList.contains('visible')) {
    startAnimation();
  } 
}

function updateHistoryPanel() {
  if (historyPanel && historyPanel.classList.contains('visible')) {
    historyPanel.innerHTML = '<h3>Historique</h3>' +
      history.map(h => `<div class="entry"><span>${h.expression}</span>= <strong>${h.result}</strong></div>`).join('');
  }
}

function startAnimation() {
  const icon = document.querySelector('.history-icon svg');
  if (icon) {
    icon.style.transform = 'rotate(-50deg)';
    setTimeout(() => {
      icon.style.transform = 'rotate(0deg)';
    }, 700); // Attendre 0.7 seconde (700 ms)
  }
}

function stopAnimation() {
  const icon = document.querySelector('.history-icon svg');
  if (icon) {
    icon.style.transform = 'rotate(-50deg)';
    setTimeout(() => {
      icon.style.transform = 'rotate(0deg)';
    }, 700); // Attendre 0.7 seconde (700 ms)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const historyIcon = document.querySelector('.history-icon');
  if (historyIcon) {
    historyIcon.addEventListener('click', toggleHistory);
  }
});


