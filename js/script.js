function responseRequestReturn(response) {
    if (!response.ok) {
        throw new Error("Falha na requisição (" + response.status + ")");
    }
    return response.json();
}

function responseRequestBody(data) {
    addBidInHtml(data);
}

function loadFromApi(convert) {
    const resultado = document.getElementById("resultado");
    resultado.textContent = "Carregando...";

    fetch("https://economia.awesomeapi.com.br/json/last/" + convert)
        .then(responseRequestReturn)
        .then(responseRequestBody)
        .catch(erro => {
            resultado.textContent = "Erro: " + erro.message;
        });
}

function addBidInHtml(data) {
    const resultado = document.getElementById("resultado");
    const currencyKey = Object.keys(data)[0];
    const moeda = data[currencyKey];

    if (!moeda || !moeda.bid) {
        throw new Error("Resposta inesperada da API");
    }
    const moedaOrigem = moeda.code;
    const moedaDestino = moeda.codein;

    const taxa = parseFloat(moeda.bid);
    const valor = 1;
  const resultado_conversao = (valor * taxa).toFixed(2);


    const h2element = document.createElement("h2");
    h2element.textContent = valor + " " + moedaOrigem + " = " + resultado_conversao + " " + moedaDestino;

    resultado.innerHTML = "";
    resultado.appendChild(h2element);
}
