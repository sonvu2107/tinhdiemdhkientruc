function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function goBack() {
  document.getElementById("gpaForm").style.display = "none";
  document.getElementById("mainForm").style.display = "block";
}