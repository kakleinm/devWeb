//Função para obter media
function obterMedia (n1, n2) {
    return ((n1 + n2)/2).toFixed(2);
}

//Função para obter Grau
function obterGrau (media) {
    if (media > 8) return "A";
    else if (media >= 6) return "B";
    else if (media >= 4) return "C";
    else if (media > 2) return "D";
    else return "E";
}

//Função para validar um aluno
function validarAluno ({nome, n1, n2}) {
    if (!nome) return "O nome não pode ser vazio.";
    if (Number.isNaN(n1) || Number.isNaN(n2)) return "Apenas valores numéricos devem ser atribuídos às notas.";
    if (n1 > 10 || n1 < 0 || n2 > 10 || n2 < 0) return "As notas devem estar entre 0 e 10.";
    return null
}

//função (limparElementos) para limpar o textContent de elementos a partir de uma classe
function limparElementos (nomeClasse) {
    let display = document.querySelectorAll("nomeClasse");
    display.forEach((e) => e.textContent = "");
}

//exportar as funções
export {obterMedia, obterGrau, validarAluno, limparElementos};