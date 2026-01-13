document.addEventListener("DOMContentLoaded", () => {
const AUDIOS = [
  "05 Janeiro Cinco Mints Com Jesus.mp3",
  "05 Janeiro Cristo é a Resposta.mp3",
  "07 Janeiro Cristo é a Resposta.mp3",
  "08 Janeiro Cristo é a Resposta.mp3",
  "09 Janeiro Cristo é a Resposta.mp3",
  "12 Janeiro Cinco Mints Com Jesus.mp3",
  "12 Janeiro Cristo é a Resposta.mp3",
  "13 Janeiro Cinco Mints Com Jesus.mp3",
  "14 Janeiro Cinco Mints Com Jesus.mp3",
  "14 Janeiro Cristo é a Resposta.mp3",
  "15 Janeiro Cinco Mints Com Jesus.mp3",
  "15 Janeiro Cristo é a Resposta.mp3",
  "16 Janeiro Cinco Mints Com Jesus.mp3",
  "17 Janeiro Cinco Mints Com Jesus.mp3",
  "19 Janeiro Cinco Mints Com Jesus.mp3",
  "19 Janeiro Cristo é a Resposta.mp3",
  "20 Janeiro Cinco Mints Com Jesus.mp3",
  "20 Janeiro Cristo é a Resposta.mp3",
  "21 Janeiro Cinco Mints Com Jesus.mp3",
  "21 Janeiro Cristo é a Resposta.mp3",
  "22 Janeiro Cinco Mints Com Jesus.mp3",
  "23 Janeiro Cinco Mints Com Jesus.mp3",
  "24 Janeiro Cinco Mints Com Jesus.mp3",
  "26 Janeiro Cinco Mints Com Jesus.mp3",
  "27 Janeiro Cinco Mints Com Jesus.mp3",
  "13 Janeiro Cristo é a Resposta.mp3",
  "28 Dezembro Hora Luterana.mp3",
  "21 Dezembro Hora Luterana.mp3",
  "11 Janeiro Hora Luterana.mp3"
];


  const pastaAudios = "../audios/";
  const lista = document.getElementById("lista-audios");
  const filtro = document.getElementById("filtro-tipo");

  const MESES = {
    janeiro: 0,
    fevereiro: 1,
    marco: 2,
    março: 2,
    abril: 3,
    maio: 4,
    junho: 5,
    julho: 6,
    agosto: 7,
    setembro: 8,
    outubro: 9,
    novembro: 10,
    dezembro: 11,
  };

  function normalizar(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function identificarTipo(nome) {
    const n = normalizar(nome);

    if (n.includes("cinco")) return "cinco minutos com jesus";
    if (n.includes("cristo")) return "cristo e a resposta";
    if (n.includes("luterana")) return "hora luterana";

    return "outros";
  }

  // transforma "05 Janeiro ..." em { arquivo, tipo, data: Date, diff: ms }
  function extrairDados(nome) {
    const regex = /(\d{1,2})[\/ ]?(janeiro|fevereiro|mar[cç]o|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i;
    const match = nome.match(regex);

    const tipo = identificarTipo(nome);

    let data = null;
    let diff = Number.POSITIVE_INFINITY;

    if (match) {
      const dia = parseInt(match[1], 10);
      const mesTextoNormalizado = normalizar(match[2]); // "janeiro" -> "janeiro", "março" -> "marco"
      const mes = MESES[mesTextoNormalizado];

      if (mes !== undefined) {
        const hoje = new Date();
        const anoAtual = hoje.getFullYear();

        // data no ano atual
        const dataBase = new Date(anoAtual, mes, dia);

        // para considerar o ciclo anual, ajusta para o mais próximo (ano passado, atual ou próximo)
        const candidatos = [
          new Date(anoAtual - 1, mes, dia),
          dataBase,
          new Date(anoAtual + 1, mes, dia),
        ];

        let melhorData = candidatos[0];
        let menorDiff = Math.abs(candidatos[0] - hoje);

        for (let i = 1; i < candidatos.length; i++) {
          const d = Math.abs(candidatos[i] - hoje);
          if (d < menorDiff) {
            menorDiff = d;
            melhorData = candidatos[i];
          }
        }

        data = melhorData;
        diff = menorDiff;
      }
    }

    return {
      arquivo: nome,
      tipo: normalizar(tipo), // para comparar com o filtro
      data,
      diff,
    };
  }

  // ordena pela diferença em ms para hoje (mais próximo primeiro)
  function ordenarPorProximidade(a, b) {
    return a.diff - b.diff;
  }

  function renderizar() {
    lista.innerHTML = "";
    const categoria = normalizar(filtro.value);

    const dados = AUDIOS
      .map(extrairDados)
      .filter(a => categoria === "todos" || a.tipo.includes(categoria))
      .sort(ordenarPorProximidade);

    dados.forEach(item => {
      const div = document.createElement("div");
      div.className = "item-audio";

      const audio = document.createElement("audio");
      audio.src = pastaAudios + item.arquivo;

      const botao = document.createElement("button");
      botao.className = "botao-reproduzir";
      botao.innerHTML = "▶";

      botao.onclick = () => {
        if (audio.paused) {
          document.querySelectorAll("audio").forEach(a => a.pause());
          audio.play();
          botao.innerHTML = "❚❚";
        } else {
          audio.pause();
          botao.innerHTML = "▶";
        }
      };

      audio.onended = () => (botao.innerHTML = "▶");

      div.innerHTML = `
        <div class="info-audio">
          <strong>${item.arquivo.replace(".mp3", "")}</strong>
          <span>${item.tipo}</span>
        </div>
      `;

      div.appendChild(botao);
      div.appendChild(audio);
      lista.appendChild(div);
    });
  }

  filtro.addEventListener("change", renderizar);
  renderizar();
});
