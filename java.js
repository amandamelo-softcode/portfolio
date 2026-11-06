// Menu mobile
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  const aberto = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", aberto);
});

nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// Borda no cabeçalho ao rolar a página
const header = document.getElementById("header");
const atualizarHeader = () => header.classList.toggle("scrolled", window.scrollY > 10);
window.addEventListener("scroll", atualizarHeader, { passive: true });
atualizarHeader();

// Destaca no menu a seção que está na tela
const secoes = document.querySelectorAll("main section[id], main aside[id]");
const linksMenu = document.querySelectorAll(".nav a");

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        linksMenu.forEach((link) =>
          link.classList.toggle("active", link.getAttribute("href") === `#${entrada.target.id}`)
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
secoes.forEach((secao) => observador.observe(secao));

// Links ainda sem endereço (marcados com data-pendente) não fazem nada ao clicar.
// Quando você trocar o href="#" pelo link real, apague o atributo data-pendente.
document.querySelectorAll("[data-pendente]").forEach((link) => {
  link.title = "Link ainda não adicionado";
  link.addEventListener("click", (e) => e.preventDefault());
});

// Ano no rodapé
document.getElementById("year").textContent = new Date().getFullYear();