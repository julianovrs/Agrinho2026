// Executa o cálculo automático assim que a página termina de carregar
document.addEventListener("DOMContentLoaded", function() {
    calcularImpacto();
});

function calcularImpacto() {
    // 1. Obtenção dos dados digitados/selecionados pelo usuário
    const tamanhoArea = parseFloat(document.getElementById("tamanho").value);
    const tipoManejo = document.getElementById("manejo").value;
    const tipoEnergia = document.getElementById("energia").value;
    const usaTecnologia = document.getElementById("tecnologia").value;

    // Validação simples para evitar valores negativos ou vazios
    if (isNaN(tamanhoArea) || tamanhoArea <= 0) {
        alert("Por favor, insira um tamanho de área válido.");
        return;
    }

    // 2. Variáveis base de cálculo (Fatores baseados em pesquisas agroambientais)
    let emissaoBasePorHectare = 1.2; // toneladas de CO2 equivalente por hectare ao ano
    let economiaBasePorHectare = 0;   // economia financeira gerada por eficiência

    // 3. Aplicação da lógica das decisões do produtor (Variáveis e Condicionais)
    
    // Impacto do Manejo do Solo
    if (tipoManejo === "direto") {
        // O Plantio Direto sequestra carbono e evita queima de combustível mecânico
        emissaoBasePorHectare -= 0.5;
        economiaBasePorHectare += 150; // Economia em diesel e horas de trator
    }

    // Impacto da Matriz Energética
    if (tipoEnergia === "solar") {
        emissaoBasePorHectare -= 0.3;
        economiaBasePorHectare += 400; // Forte redução na conta de luz/geradores
    }

    // Impacto da Tecnologia de Precisão
    if (usaTecnologia === "sim") {
        emissaoBasePorHectare -= 0.2;
        economiaBasePorHectare += 250; // Economia de fertilizantes e defensivos cirúrgicos
    }

    // Garante que a emissão nunca seja absurdamente negativa de forma irreal
    if (emissaoBasePorHectare < 0.1) emissaoBasePorHectare = 0.1;

    // 4. Cálculos Finais Totais
    const emissaoTotal = tamanhoArea * emissaoBasePorHectare;
    const economiaTotal = tamanhoArea * economyBasePorHectare(); 
    // Nota: ajuste para somar a economia correta multiplicada pela área
    const economiaFinalTotal = tamanhoArea * economiaBasePorHectare;

    // 5. Atualização Dinâmica da Interface (DOM)
    const valCo2 = document.getElementById("val-co2");
    const valEconomia = document.getElementById("val-economia");
    const badgeCo2 = document.getElementById("badge-co2");
    const badgeEconomia = document.getElementById("badge-economia");
    const txtDiagnostico = document.getElementById("txt-diagnostico");

    // Formatação de valores numéricos na tela
    valCo2.innerText = `${emissaoTotal.toFixed(2)} toneladas/ano`;
    valEconomia.innerText = economiaFinalTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + ' / ano';

    // 6. Lógica das Badges de Status e Diagnóstico Customizado
    if (emissaoBasePorHectare <= 0.4) {
        badgeCo2.innerText = "Excelente (Baixo Carbono)";
        badgeCo2.className = "status-badge badge-green";
    } else {
        badgeCo2.innerText = "Alta Emissão";
        badgeCo2.className = "status-badge badge-orange";
    }

    if (economiaFinalTotal > (tamanhoArea * 300)) {
        badgeEconomia.innerText = "Alta Eficiência";
        badgeEconomia.className = "status-badge badge-green";
    } else {
        badgeEconomia.innerText = "Otimizável";
        badgeEconomia.className = "status-badge badge-orange";
    }

    // Construção do Diagnóstico Baseado em Evidências Científicas (Pedagogia da Pesquisa)
    let diagnostico = "";

    if (tipoManejo === "convencional") {
        diagnostico += "Alerta: O revolvimento convencional do solo libera carbono armazenado. Mudar para o Plantio Direto pode mitigar muito suas emissões. ";
    } else {
        diagnostico += "Excelente! O seu Plantio Direto protege a microbiota terrestre e retém umidade. ";
    }

    if (tipoEnergia === "rede" && usaTecnologia === "nao") {
        diagnostico += "Sugerimos integrar sensores ou energia fotovoltaica para dar o próximo salto tecnológico e reduzir os custos de produção.";
    } else if (tipoEnergia === "solar" && usaTecnologia === "sim") {
        diagnostico += "Sua propriedade representa o verdadeiro Agro Forte e Sustentável! Alta tecnologia alinhada com pegada ecológica mínima.";
    } else {
        diagnostico += "Você está no caminho certo. Pequenos ajustes em tecnologias de precisão maximizarão seus resultados.";
    }

    txtDiagnostico.innerText = diagnostico;
}
