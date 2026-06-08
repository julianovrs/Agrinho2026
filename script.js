// Executa o cálculo automático assim que a página termina de carregar
document.addEventListener("DOMContentLoaded", function() {
    calcularImpacto();
});

function calcularImpacto() {
    // 1. Obtenção dos dados selecionados pelo usuário
    const tamanhoArea = parseFloat(document.getElementById("tamanho").value);
    const tipoManejo = document.getElementById("manejo").value;
    const tipoEnergia = document.getElementById("energia").value;
    const usaTecnologia = document.getElementById("tecnologia").value;

    // Validação para evitar valores vazios, zero ou negativos
    if (isNaN(tamanhoArea) || tamanhoArea <= 0) {
        alert("Por favor, insira um tamanho de área válido (maior que 0).");
        return;
    }

    // 2. Variáveis base de cálculo (Fatores por hectare/ano)
    let emissaoBasePorHectare = 1.2; // toneladas de CO2
    let economiaBasePorHectare = 0;   // em Reais (R$)

    // 3. Lógica das decisões (Condicionais)
    
    // Impacto do Manejo do Solo
    if (tipoManejo === "direto") {
        emissaoBasePorHectare -= 0.5; // Reduz emissão
        economiaBasePorHectare += 150; // Economia com combustível/trator
    }

    // Impacto da Matriz Energética
    if (tipoEnergia === "solar") {
        emissaoBasePorHectare -= 0.3; // Reduz emissão
        economiaBasePorHectare += 400; // Economia na conta de luz
    }

    // Impacto da Tecnologia de Precisão
    if (usaTecnologia === "sim") {
        emissaoBasePorHectare -= 0.2; // Reduz emissão
        economiaBasePorHectare += 250; // Economia em fertilizantes/defensivos
    }

    // Garante que a emissão não seja zerada ou negativa de forma irreal
    if (emissaoBasePorHectare < 0.1) {
        emissaoBasePorHectare = 0.1;
    }

    // 4. Cálculos Finais Totais (Multiplicados pela área da fazenda)
    const emissaoTotal = tamanhoArea * emissaoBasePorHectare;
    const economiaFinalTotal = tamanhoArea * economiaBasePorHectare;

    // 5. Atualização Dinâmica da Interface (DOM)
    const valCo2 = document.getElementById("val-co2");
    const valEconomia = document.getElementById("val-economia");
    const badgeCo2 = document.getElementById("badge-co2");
    const badgeEconomia = document.getElementById("badge-economia");
    const txtDiagnostico = document.getElementById("txt-diagnostico");

    // Inserindo os valores calculados formatados na tela
    valCo2.innerText = `${emissaoTotal.toFixed(2)} toneladas/ano`;
    valEconomia.innerText = economiaFinalTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // 6. Lógica das Badges de Status (Cores e Textos)
    if (emissaoBasePorHectare <= 0.5) {
        badgeCo2.innerText = "Excelente (Baixo Carbono)";
        badgeCo2.className = "status-badge badge-green";
    } else {
        badgeCo2.innerText = "Alta Emissão";
        badgeCo2.className = "status-badge badge-orange";
    }

    if (economiaBasePorHectare >= 400) {
        badgeEconomia.innerText = "Alta Eficiência";
        badgeEconomia.className = "status-badge badge-green";
    } else {
        badgeEconomia.innerText = "Otimizável";
        badgeEconomia.className = "status-badge badge-orange";
    }

    // 7. Construção do Diagnóstico Personalizado (Pedagogia da Pesquisa)
    let diagnostico = "";

    if (tipoManejo === "convencional") {
        diagnostico += "Alerta: O revolvimento convencional libera o CO₂ armazenado no solo. Adotar o Plantio Direto protegeria sua terra e mitigaria emissões. ";
    } else {
        diagnostico += "Excelente! O seu Sistema de Plantio Direto protege a biologia do solo e retém a umidade. ";
    }

    if (tipoEnergia === "rede" && usaTecnologia === "nao") {
        diagnostico += "Dica: Mudar para energia solar ou adotar sensores de precisão traria um grande retorno financeiro e ecológico para a propriedade.";
    } else if (tipoEnergia === "solar" && usaTecnologia === "sim") {
        diagnostico += "Parabéns! Sua propriedade representa perfeitamente o Agro Forte e Sustentável: tecnologia de ponta com o mínimo de impacto ambiental.";
    } else {
        diagnostico += "Você está no caminho certo. Continue expandindo as tecnologias integradas para maximizar seus ganhos de sustentabilidade.";
    }

    txtDiagnostico.innerText = diagnostico;
}
