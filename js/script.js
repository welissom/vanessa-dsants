const whatsappNumber = "5585997401669"; // Troque pelo WhatsApp da Vanessa, com DDI e DDD.

const sheets = [...document.querySelectorAll(".sheet")];
const paper = document.querySelector("#paper");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const label = document.querySelector("#page-label");
const count = document.querySelector("#page-count");
const dots = document.querySelector("#dots");
let index = 0;
let startX = 0;

function pad(value) {
  return String(value).padStart(2, "0");
}

function show(nextIndex) {
  index = Math.max(0, Math.min(sheets.length - 1, nextIndex));
  sheets.forEach((sheet, i) => {
    sheet.classList.toggle("is-active", i === index);
    sheet.classList.toggle("is-before", i < index);
    sheet.setAttribute("aria-hidden", i === index ? "false" : "true");
  });
  label.textContent = sheets[index].dataset.title;
  count.textContent = `${pad(index + 1)} / ${pad(sheets.length)}`;
  prev.disabled = index === 0;
  next.disabled = index === sheets.length - 1;
  dots.querySelectorAll("button").forEach((dot, i) => {
    dot.classList.toggle("is-on", i === index);
  });
  paper.scrollTop = 0;
  sheets[index].querySelector(".sheet-body")?.scrollTo(0, 0);
}

sheets.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Ir para a página ${i + 1}`);
  dot.addEventListener("click", () => show(i));
  dots.append(dot);
});

prev.addEventListener("click", () => show(index - 1));
next.addEventListener("click", () => show(index + 1));

document.addEventListener("click", (event) => {
  const jump = event.target.closest("[data-go]");
  if (jump) show(Number(jump.dataset.go));

  const reserve = event.target.closest(".reserve");
  if (!reserve) return;
  const text = `Olá, Vanessa! Tenho interesse no procedimento ${reserve.dataset.service}. Gostaria de agendar uma avaliação.`;
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") show(index + 1);
  if (event.key === "ArrowLeft") show(index - 1);
});

paper.addEventListener("touchstart", (event) => {
  startX = event.changedTouches[0].clientX;
}, { passive: true });

paper.addEventListener("touchend", (event) => {
  const delta = event.changedTouches[0].clientX - startX;
  if (Math.abs(delta) < 50) return;
  show(index + (delta < 0 ? 1 : -1));
});

const agenda = document.querySelector("#whatsapp-link");
agenda.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá, Vanessa! Gostaria de agendar uma avaliação.")}`;

show(0);
