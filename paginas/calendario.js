const calendario = document.getElementById("calendario");
const mesSelect = document.getElementById("mesSelect");

let dados = {};

// carrega JSON
fetch("eventos.json")
  .then(r => r.json())
  .then(json => {
    dados = json.eventos;
    renderizarMes(1); // fevereiro default
  });

mesSelect.addEventListener("change", () => {
  renderizarMes(Number(mesSelect.value));
});

function renderizarMes(mes) {
  calendario.innerHTML = "";

  const ano = 2026;
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  const nomesMeses = [
    "janeiro","fevereiro","marco","abril","maio","junho",
    "julho","agosto","setembro","outubro","novembro","dezembro"
  ];

  const eventosMes = dados[nomesMeses[mes]] || [];

  // espaços vazios antes do dia 1
  for (let i = 0; i < primeiroDiaSemana; i++) {
    calendario.appendChild(criarCardVazio());
  }

  // dias do mês
  for (let dia = 1; dia <= totalDias; dia++) {
    const dataISO = `${ano}/${String(mes + 1).padStart(2, "0")}/${String(dia).padStart(2, "0")}`;
    const evento = eventosMes.find(e => e.dia === dataISO);
    calendario.appendChild(criarCardDia(dia, evento));
  }
}

function criarCardVazio() {
  const div = document.createElement("div");
  div.className = "card vazio";
  return div;
}

function criarCardDia(numero, evento) {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `<div class="dia">${numero}</div>`;

  if (evento) {
    if (evento.eventos !== "NULL")
      div.innerHTML += `<div class="info">${evento.eventos}</div>`;
    if (evento.localizacao !== "NULL")
      div.innerHTML += `<div class="info">${evento.localizacao}</div>`;
    if (evento.hora !== "NULL")
      div.innerHTML += `<div class="info">${evento.hora}</div>`;
    if (evento.especial !== "NULL")
      div.innerHTML += `<div class="especial">${evento.especial}</div>`;
  }

  return div;
}
