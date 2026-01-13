// rolagem suave do botão principal para a seção "Sobre"
const botaoInicioConhecerSite = document.getElementById("botao-inicio-conhecer");
const secaoSobreSite = document.getElementById("secao-sobre");

if (botaoInicioConhecerSite && secaoSobreSite) {
  botaoInicioConhecerSite.addEventListener("click", () => {
    secaoSobreSite.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

// alerta simples ao clicar em qualquer botão de evento
const listaBotoesEventoSite = document.querySelectorAll(".eventos-botao-detalhes");

listaBotoesEventoSite.forEach((botaoEventoSite) => {
  botaoEventoSite.addEventListener("click", () => {
    alert("Em breve mais detalhes sobre este evento!");
  });
});

// botão de contato para abrir e-mail
const botaoContatoFalarSite = document.getElementById("botao-contato-falar");

if (botaoContatoFalarSite) {
  botaoContatoFalarSite.addEventListener("click", () => {
    window.location.href = "mailto:contato@ielbcharrua.org.br";
  });
}