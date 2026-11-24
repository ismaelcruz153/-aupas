// Página de detalle: carga contenido a partir del parámetro ?area=...
"use strict";

const specialtyData = {
  "medicina-general": {
    name: "Medicina general", kicker: "ATENCIÓN INTEGRAL", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1800&q=85",
    intro: "Una primera orientación profesional para cuidar tu salud de manera integral.",
    heading: "Prevención y atención para cada etapa de tu vida.",
    description: "La medicina general brinda una evaluación inicial, orientación preventiva y seguimiento de problemas frecuentes de salud. El profesional determina si se requieren exámenes o una evaluación especializada.",
    services: ["Consulta médica general", "Evaluación preventiva", "Control de presión arterial", "Orientación sobre hábitos saludables", "Seguimiento médico", "Derivación a especialistas cuando corresponda"]
  },
  "cardiologia": {
    name: "Cardiología", kicker: "CORAZÓN Y CIRCULACIÓN", image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=1800&q=85",
    intro: "Cuidado cardiovascular mediante evaluación, prevención y seguimiento especializado.",
    heading: "Cuida tu corazón con orientación especializada.",
    description: "La cardiología se ocupa de la evaluación de la salud del corazón y del sistema circulatorio. La consulta permite revisar antecedentes, síntomas y factores de riesgo para definir los pasos de evaluación que correspondan.",
    services: ["Consulta cardiológica", "Evaluación de presión arterial", "Electrocardiograma (según indicación)", "Ecocardiograma (según indicación)", "Evaluación de factores de riesgo", "Seguimiento cardiovascular"]
  },
  "pediatria": {
    name: "Pediatría", kicker: "SALUD INFANTIL", image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1800&q=85",
    intro: "Acompañamiento de la salud y el desarrollo de niñas, niños y adolescentes.",
    heading: "Cuidado cercano para los más pequeños.",
    description: "La pediatría acompaña el crecimiento y desarrollo infantil. Las consultas permiten conversar sobre prevención, controles y preocupaciones de salud propias de cada etapa.",
    services: ["Consulta pediátrica", "Control de crecimiento y desarrollo", "Orientación preventiva", "Evaluación de síntomas", "Consejería para madres y padres", "Seguimiento infantil"]
  },
  "ginecologia": {
    name: "Ginecología", kicker: "SALUD DE LA MUJER", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=85",
    intro: "Atención y orientación para el cuidado de la salud femenina en distintas etapas.",
    heading: "Un espacio de atención y confianza.",
    description: "La ginecología se enfoca en la salud reproductiva y ginecológica. La consulta permite recibir orientación, controles preventivos y evaluación profesional según cada necesidad.",
    services: ["Consulta ginecológica", "Control preventivo", "Orientación sobre salud menstrual", "Consejería en salud reproductiva", "Evaluación según indicación médica", "Seguimiento especializado"]
  },
  "laboratorio": {
    name: "Laboratorio clínico", kicker: "ANÁLISIS Y PREVENCIÓN", image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1800&q=85",
    intro: "Pruebas de laboratorio que pueden complementar la evaluación indicada por tu médico.",
    heading: "Información de apoyo para el cuidado de tu salud.",
    description: "Los análisis clínicos estudian muestras biológicas y pueden aportar información útil al profesional de salud. El tipo de prueba y su interpretación deben ser definidos por personal calificado.",
    services: ["Hemograma (según indicación)", "Glucosa", "Perfil lipídico", "Examen completo de orina", "Pruebas de función renal", "Entrega e interpretación por el profesional tratante"]
  },
  "ecografia": {
    name: "Ecografía e imágenes", kicker: "DIAGNÓSTICO POR IMÁGENES", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1800&q=85",
    intro: "Estudios por imágenes como apoyo a la evaluación y seguimiento médico.",
    heading: "Tecnología de apoyo para una mejor evaluación.",
    description: "La ecografía utiliza ondas sonoras para obtener imágenes de determinadas estructuras del cuerpo. El estudio debe realizarse cuando existe una indicación y ser interpretado por un profesional competente.",
    services: ["Ecografía abdominal", "Ecografía de partes blandas", "Ecografía pélvica (según indicación)", "Ecografía obstétrica (según indicación)", "Preparación previa según estudio", "Informe para el médico tratante"]
  },
  "nutricion": {
    name: "Nutrición", kicker: "HÁBITOS SALUDABLES", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1800&q=85",
    intro: "Orientación alimentaria basada en tus objetivos y necesidades individuales.",
    heading: "Pequeños hábitos pueden acompañar grandes cambios.",
    description: "La atención nutricional permite revisar hábitos, preferencias y objetivos para elaborar recomendaciones individualizadas. Evita seguir dietas restrictivas sin orientación profesional.",
    services: ["Evaluación nutricional", "Orientación alimentaria", "Planificación de hábitos", "Educación nutricional", "Seguimiento de objetivos", "Consejería preventiva"]
  },
  "psicologia": {
    name: "Psicología", kicker: "BIENESTAR EMOCIONAL", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1800&q=85",
    intro: "Un espacio profesional de escucha, orientación y acompañamiento emocional.",
    heading: "Tu bienestar emocional también importa.",
    description: "La atención psicológica ofrece un espacio confidencial de conversación y evaluación profesional. El proceso y las estrategias se adaptan a las necesidades de cada persona.",
    services: ["Entrevista psicológica", "Orientación individual", "Manejo de estrés", "Habilidades de afrontamiento", "Acompañamiento emocional", "Derivación cuando sea necesaria"]
  },
  "odontologia": {
    name: "Odontología", kicker: "SALUD BUCAL", image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1800&q=85",
    intro: "Prevención y cuidado profesional para mantener una buena salud oral.",
    heading: "Una sonrisa saludable empieza con la prevención.",
    description: "La odontología se encarga de la prevención, evaluación y cuidado de dientes y encías. La consulta permite identificar necesidades y conversar sobre las alternativas de atención.",
    services: ["Evaluación odontológica", "Limpieza dental (según evaluación)", "Prevención de caries", "Orientación de higiene oral", "Evaluación de encías", "Plan de tratamiento personalizado"]
  }
};

const params = new URLSearchParams(window.location.search);
const key = params.get("area") || "medicina-general";
const data = specialtyData[key] || specialtyData["medicina-general"];

document.title = `${data.name} | Vidanova Salud`;
document.querySelector("#detailHero").style.backgroundImage = `url("${data.image}")`;
document.querySelector("#detailKicker").textContent = data.kicker;
document.querySelector("#detailTitle").textContent = data.name;
document.querySelector("#detailIntro").textContent = data.intro;
document.querySelector("#detailHeading").textContent = data.heading;
document.querySelector("#detailDescription").textContent = data.description;

// Crea elementos de lista de forma segura usando textContent.
const serviceList = document.querySelector("#serviceList");
data.services.forEach((service) => {
  const item = document.createElement("li");
  item.textContent = service;
  serviceList.append(item);
});

// Selecciona automáticamente la especialidad en el formulario de cita.
const select = document.querySelector("#detailSpecialty");
if (select) {
  const matchingOption = [...select.options].find(option =>
    option.textContent.toLowerCase() === data.name.toLowerCase()
  );
  if (matchingOption) select.value = matchingOption.value;
}

const dialog = document.querySelector("#appointmentDialog");
document.querySelectorAll("[data-open-appointment]").forEach(button => {
  button.addEventListener("click", () => dialog.showModal());
});
document.querySelector(".dialog-close")?.addEventListener("click", () => dialog.close());

const form = document.querySelector("#appointmentForm");
const error = document.querySelector("#formError");
const success = document.querySelector("#successPanel");
const today = new Date();
const minDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
document.querySelectorAll('input[name="date"]').forEach(input => input.min = minDate);

form?.addEventListener("submit", event => {
  event.preventDefault();
  error.textContent = "";
  if (!form.checkValidity()) {
    error.textContent = "Completa correctamente todos los campos obligatorios.";
    form.reportValidity();
    return;
  }
  const values = Object.fromEntries(new FormData(form).entries());
  const request = { ...values, id: Date.now(), createdAt: new Date().toISOString() };
  try {
    const requests = JSON.parse(localStorage.getItem("vidanovaRequests") || "[]");
    requests.push(request);
    localStorage.setItem("vidanovaRequests", JSON.stringify(requests));
    document.querySelector("#successMessage").textContent =
      `${request.name}, tu solicitud de demostración para ${request.specialty} fue registrada para el ${request.date}.`;
    form.hidden = true;
    success.hidden = false;
  } catch (err) {
    error.textContent = "No se pudo guardar la solicitud en este navegador.";
  }
});
document.querySelector("#closeSuccess")?.addEventListener("click", () => {
  dialog.close(); form.reset(); form.hidden = false; success.hidden = true;
});
document.querySelector("#year").textContent = new Date().getFullYear();
