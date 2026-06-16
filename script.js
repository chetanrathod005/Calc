let display = document.getElementById("display");
let historyList = document.getElementById("historyList");

// Load history from localStorage
window.onload = function () {
  loadHistory();
};

// Add value
function append(value) {
  display.value += value;
}

// Clear display
function clearDisplay() {
  display.value = "";
}

// Add brackets
function addBracket() {
    let openBrackets = (display.value.match(/\(/g) || []).length;
    let closeBrackets = (display.value.match(/\)/g) || []).length;

    if (openBrackets > closeBrackets) {
        display.value += ")";
    } else {
        display.value += "(";
    }
}

// Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Calculate result
function calculate() {
  try {
    let result = eval(display.value);
    saveHistory(display.value + " = " + result);
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

// Save to localStorage
function saveHistory(entry) {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.unshift(entry);
  localStorage.setItem("calcHistory", JSON.stringify(history));
  loadHistory();
}

// Load history33
function loadHistory() {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  historyList.innerHTML = "";

  history.slice(0, 5).forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

// Dark mode
function toggleDark() {
  document.body.classList.toggle("dark");
}

// Keyboard support
document.addEventListener("keydown", function(e) {
  if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
    append(e.key);
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    deleteLast();
  } else if (e.key === "Escape") {
    clearDisplay();
  }
});