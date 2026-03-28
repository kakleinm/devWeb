//Função para obter o imc ( peso / altura²)
export function obterIMC (peso, altura) {
    return (peso/Math.pow(altura, 2)).toFixed(2);
}

//Função para obter a classificação a partir do IMC
export function obterClassificacao (imc) {
    if (imc > 40) return "Obesidade III";
    else if (imc > 35) return "Obesidade II";
    else if (imc > 30) return "Obesidade I";
    else if (imc > 25) return "Excesso de peso";
    else if (imc > 18.5) return "Peso normal";
    else return "Abaixo do peso";
}

//Função para validar uma pessoa
export function validarPessoa ({nome, peso, altura}) {
    if (!nome) return "Nome não pode ser vazio.";
    if (Number.isNaN(peso) || Number.isNaN(altura)) return "Apenas valores numéricos devem ser atribuídos ao peso e à altura.";
    if (peso < 0 || peso > 635 || altura < 0 || altura > 2.50) return "Os valores devem estar dentro do intervalo.";
    return null;
}

//função (limparElementos) para limpar o textContent de elementos a partir de uma classe
export function limparElementos(nomeClasse) {
    let display = document.querySelectorAll("nomeClasse");
    display.forEach((e) => e.textContent = "");
}