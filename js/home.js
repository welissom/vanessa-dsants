const menuMobile = document.getElementById("menuMobile");
const menuPrincipal = document.getElementById("menuPrincipal");
const anoAtual = document.getElementById("anoAtual");
const botoesWhatsapp = document.querySelectorAll(".botao-whatsapp");

// Troque pelo número real: DDI + DDD + número, sem espaços ou símbolos.
const whatsappNumero = "5585997401669";
const whatsappMensagem = "Olá, Vanessa! Gostaria de agendar uma avaliação.";

const texto = encodeURIComponent(whatsappMensagem);
const linkWhatsapp = `https://wa.me/${whatsappNumero}?text=${texto}`;

botoesWhatsapp.forEach((botao) => {
    botao.href = linkWhatsapp;
    botao.target = "_blank";
    botao.rel = "noopener";
});

if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

if (menuMobile && menuPrincipal) {
    menuMobile.addEventListener("click", () => {
        const aberto = menuPrincipal.classList.toggle("ativo");
        menuMobile.setAttribute("aria-expanded", aberto ? "true" : "false");
        menuMobile.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });

    document.querySelectorAll("#menuPrincipal a").forEach((link) => {
        link.addEventListener("click", () => {
            menuPrincipal.classList.remove("ativo");
            menuMobile.setAttribute("aria-expanded", "false");
            menuMobile.setAttribute("aria-label", "Abrir menu");
        });
    });
}
