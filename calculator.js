/* =========================================================
   calculator.js — logic for the Simple Calculator project
   ========================================================= */

(function () {
  "use strict";

  var display = document.getElementById("calcDisplay");
  var buttonsWrap = document.querySelector(".calc-buttons");
  if (!display || !buttonsWrap) return;

  var expression = "";

  function updateDisplay() {
    display.textContent = expression === "" ? "0" : expression;
  }

  function lastNumber() {
    var match = expression.match(/(\d+\.?\d*)$/);
    return match ? match[0] : "";
  }

  function inputValue(value) {
    var isOperator = "+-*/".indexOf(value) !== -1;
    var lastChar = expression.slice(-1);

    if (value === ".") {
      if (lastNumber().indexOf(".") !== -1) return; // no second decimal point
      if (lastNumber() === "") expression += "0"; // ".5" -> "0.5"
    }

    if (isOperator) {
      if (expression === "" && value !== "-") return; // can't start with * / +
      if ("+-*/".indexOf(lastChar) !== -1) {
        expression = expression.slice(0, -1) + value; // swap operator
        updateDisplay();
        return;
      }
    }

    expression += value;
    updateDisplay();
  }

  function clearAll() {
    expression = "";
    updateDisplay();
  }

  function backspace() {
    expression = expression.slice(0, -1);
    updateDisplay();
  }

  function calculate() {
    if (expression === "" || !/^[0-9+\-*/.\s]+$/.test(expression)) return;
    try {
      var result = Function('"use strict"; return (' + expression + ")")();
      if (typeof result !== "number" || !isFinite(result)) throw new Error("invalid result");
      expression = String(Math.round(result * 1e10) / 1e10);
    } catch (err) {
      expression = "Error";
    }
    updateDisplay();
  }

  buttonsWrap.addEventListener("click", function (e) {
    var btn = e.target.closest("button");
    if (!btn) return;

    var value = btn.getAttribute("data-value");
    var action = btn.getAttribute("data-action");

    if (value !== null) {
      inputValue(value);
    } else if (action === "clear") {
      clearAll();
    } else if (action === "backspace") {
      backspace();
    } else if (action === "equals") {
      calculate();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (expression === "Error" && e.key !== "Escape" && e.key !== "Backspace") {
      expression = "";
    }
    if (/^[0-9.]$/.test(e.key)) {
      inputValue(e.key);
    } else if ("+-*/".indexOf(e.key) !== -1) {
      inputValue(e.key);
    } else if (e.key === "Enter" || e.key === "=") {
      e.preventDefault();
      calculate();
    } else if (e.key === "Backspace") {
      backspace();
    } else if (e.key === "Escape") {
      clearAll();
    }
  });

  updateDisplay();
})();
