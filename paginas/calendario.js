const calendario = document.getElementById("calendario");
const mesSelect = document.getElementById("mesSelect");

const ano = 2026;

const nomesMeses = [
  "janeiro","fevereiro","março","abril","maio","junho",
  "julho","agosto","setembro","outubro","novembro","dezembro"
];

// mês inicial
renderizarMes(1);

mesSelect.addEventListener("change", () => {
  renderizarMes(Number(mesSelect.value));
});

function renderizarMes(mes) {
  const caminho = `data/${ano}/${nomesMeses[mes]}.json`;

  fetch(caminho)
    .then(r => {
      if (!r.ok) throw new Error("sem-json");
      return r.json();
    })
    .then(eventosMes => {
      montarCalendario(ano, mes, eventosMes);
    })
    .catch(() => {
      montarCalendario(ano, mes, []);
    });
}

function montarCalendario(ano, mes, eventosMes) {
  calendario.innerHTML = "";

  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  // espaços vazios antes do dia 1
  for (let i = 0; i < primeiroDiaSemana; i++) {
    calendario.appendChild(criarCardVazio());
  }

  // dias do mês
  for (let dia = 1; dia <= totalDias; dia++) {
    const dataISO = `${ano}/${String(mes + 1).padStart(2,"0")}/${String(dia).padStart(2,"0")}`;
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
