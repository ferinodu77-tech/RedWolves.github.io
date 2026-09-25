const nav = document.querySelector("#main-nav");
const toggle = document.querySelector(".menu-toggle");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".main-nav a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded","false");
}));

document.querySelector("#year").textContent = new Date().getFullYear();

const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modal-title");
const modalText = document.querySelector("#modal-text");
const closeModal = () => modal.close();

document.querySelectorAll("[data-ride]").forEach(btn => {
  btn.addEventListener("click", () => {
    modalTitle.textContent = btn.dataset.ride;
    modalText.textContent = "Les informations détaillées de cette sortie pourront être ajoutées ici : lieu de rendez-vous, horaires, parcours, contact et consignes.";
    modal.showModal();
  });
});
document.querySelectorAll(".gallery-tile").forEach(btn => {
  btn.addEventListener("click", () => {
    modalTitle.textContent = btn.querySelector("b").textContent;
    modalText.textContent = btn.dataset.caption;
    modal.showModal();
  });
});
document.querySelector(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

document.querySelector("#filter-all").addEventListener("click", e => {
  document.querySelectorAll(".ride-card").forEach(card => card.hidden = false);
  e.currentTarget.textContent = "Toutes les sorties ✓";
  setTimeout(() => e.currentTarget.textContent = "Toutes les sorties", 1600);
});

document.querySelector("#contact-form").addEventListener("submit", e => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const message = String(form.get("message") || "").trim();
  const status = document.querySelector("#form-status");
  const subject = encodeURIComponent("Contact — MC Red Wolves");
  const body = encodeURIComponent(`Bonjour MC Red Wolves,\n\nNom : ${name}\nEmail : ${email}\n\n${message}`);
  status.textContent = "Ouverture de ton logiciel de messagerie…";
  // Remplace cette adresse par celle du club.
  window.location.href = `mailto:contact@mc-red-wolves.fr?subject=${subject}&body=${body}`;
});
