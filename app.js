// Vidanova: datos, filtros, eventos, formulario y almacenamiento local.
"use strict";

const specialties = [
  { name: "Medicina general", category: "Consultas" },
  { name: "Cardiología", category: "Consultas" },
  { name: "Pediatría", category: "Consultas" },
  { name: "Ginecología", category: "Consultas" },
  { name: "Laboratorio clínico", category: "Diagnóstico" },
  { name: "Ecografía e imágenes", category: "Diagnóstico" },
  { name: "Nutrición", category: "Bienestar" },
  { name: "Psicología", category: "Bienestar" },
  { name: "Odontología", category: "Consultas" }
];

const grid = document.querySelector("#specialtyGrid");
const searchInput = document.querySelector("#specialtySearch");
const filterButtons = document.querySelectorAll("[data-filter]");
const emptyState = document.querySelector("#emptyState");
let activeFilter = "Todas";

// Filtra las tarjetas usando arrays, métodos de strings y condiciones.
function filterSpecialties() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  grid.querySelectorAll(".specialty-card").forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const category = card.dataset.category;
    const matchesText = name.includes(searchTerm);
    const matchesCategory = activeFilter === "Todas" || category === activeFilter;
    const shouldShow = matchesText && matchesCategory;

    card.hidden = !shouldShow;
    if (shouldShow) visibleCount++;
  });

  emptyState.hidden = visibleCount !== 0;
}

searchInput?.addEventListener("input", filterSpecialties);
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    filterSpecialties();
  });
});

// Menú adaptable para pantallas pequeñas.
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => mainNav.classList.remove("open"));
});

// Preguntas frecuentes: acordeón controlado por eventos.
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.querySelector("span").textContent = isOpen ? "−" : "+";
  });
});

// Fecha mínima: evita seleccionar un día anterior al actual.
const dateInputs = document.querySelectorAll('input[name="date"]');
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().split("T")[0];
dateInputs.forEach((input) => input.min = localToday);

// Formulario: valida, crea un objeto y guarda una solicitud de demostración.
const dialog = document.querySelector("#appointmentDialog");
const appointmentForm = document.querySelector("#appointmentForm");
const successPanel = document.querySelector("#successPanel");
const formError = document.querySelector("#formError");

document.querySelectorAll("[data-open-appointment]").forEach((button) => {
  button.addEventListener("click", () => {
    if (dialog && typeof dialog.showModal === "function") dialog.showModal();
  });
});

document.querySelector(".dialog-close")?.addEventListener("click", () => dialog.close());
document.querySelector("#closeSuccess")?.addEventListener("click", () => {
  dialog.close();
  appointmentForm.reset();
  successPanel.hidden = true;
  appointmentForm.hidden = false;
});

appointmentForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  formError.textContent = "";

  if (!appointmentForm.checkValidity()) {
    formError.textContent = "Revisa los campos: completa la información y verifica el formato.";
    appointmentForm.reportValidity();
    return;
  }

  const formData = new FormData(appointmentForm);
  const request = {
    id: Date.now(),
    name: formData.get("name").trim(),
    email: formData.get("email").trim(),
    phone: formData.get("phone").trim(),
    specialty: formData.get("specialty"),
    date: formData.get("date"),
    shift: formData.get("shift"),
    createdAt: new Date().toISOString()
  };

  try {
    const savedRequests = JSON.parse(localStorage.getItem("vidanovaRequests") || "[]");
    savedRequests.push(request);
    localStorage.setItem("vidanovaRequests", JSON.stringify(savedRequests));
    document.querySelector("#successMessage").textContent =
      `${request.name}, tu solicitud de demostración para ${request.specialty} fue registrada para el ${request.date} (turno ${request.shift}).`;
    appointmentForm.hidden = true;
    successPanel.hidden = false;
  } catch (error) {
    formError.textContent = "No fue posible guardar la solicitud en este navegador.";
    console.error("Error al guardar la solicitud:", error);
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
