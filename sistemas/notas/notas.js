//Importar métodos de notasFunc
import {obterMedia, obterGrau, validarAluno, limparElementos} from "./notasFunc.js";

//Recuperar o form e o span de erro
const formMedia = document.querySelector("#formMedia");
const spanErro = document.querySelector("#erro");

//Registrar o evento (addEventListener) submit do form
formMedia.addEventListener("submit", e => {
    e.preventDefault();
    limparElementos(".info");

    let aluno = {
        nome: document.querySelector("#nome").value.trim(),
        n1: Number(document.querySelector("#nota1").value),
        n2: Number(document.querySelector("#nota2").value)
    }

    let msgErro = validarAluno(aluno);
    if (msgErro) {
        spanErro.textContent = msgErro;
        setTimeout(() => spanErro.textContent = "", 3000);
    }

    aluno.media = obterMedia(aluno.n1, aluno.n2);
    aluno.grau = obterGrau(aluno.media);

    exibirDados(aluno);
});

//Função já pronta exibirDados
function exibirDados({nome, media, grau}){
    document.querySelector('#dados').textContent = "Dados do aluno";
    document.querySelector('#alunoNome').textContent = `Nome: ${nome}`;
    document.querySelector('#alunoMedia').textContent = `Média: ${media}`;
    document.querySelector('#alunoGrau').textContent = `Grau: ${grau}`;
}