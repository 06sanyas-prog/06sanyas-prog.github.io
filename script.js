/* =========================================================
   script.js  —  Shared JavaScript for all pages
   1) Light / dark theme toggle (remembers your choice)
   2) Mobile navbar menu toggle
   3) Marks the current page link as active
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1. THEME TOGGLE ---------- */
  var STORAGE_KEY = "portfolio-theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var btn = document.getElementById("themeToggle");
    if (btn) {
      // Button shows the theme you can switch TO
      btn.textContent = theme === "light" ? "🌙" : "☀️";
      btn.setAttribute("aria-label", "Switch to " + (theme === "light" ? "dark" : "light") + " theme");
    }
  }

  var saved = localStorage.getItem(STORAGE_KEY) || "dark"; // default theme = dark
  applyTheme(saved);

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("#themeToggle");
    if (!btn) return;
    var next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  });

  /* ---------- 2. MOBILE MENU ---------- */
  document.addEventListener("click", function (e) {
    var toggle = e.target.closest("#navToggle");
    var links = document.getElementById("navLinks");
    if (!links) return;

    if (toggle) {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    } else if (!e.target.closest("#navLinks")) {
      links.classList.remove("open");
    }
  });

  /* ---------- 3. HIGHLIGHT CURRENT PAGE ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var here = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("#navLinks a").forEach(function (a) {
      if (a.getAttribute("href") === here) a.classList.add("active");
    });
  });
})();