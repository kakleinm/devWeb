//Importar métodos de imcFunc
import {obterIMC, obterClassificacao, validarPessoa, limparElementos} from "./imcFunc.js";

//Recuperar o botão enviar e o span de erro
const botao = document.querySelector("#btnEnviar");
const spanErro = document.querySelector("#erro");

//Registrar (addEventListener) o evento click do botão
botao.addEventListener("click", () => {
    limparElementos(".info");

    let pessoa = {
        nome: document.querySelector("#nome").value.trim(),
        peso: Number(document.querySelector("#peso").value),
        altura: Number(document.querySelector("#altura").value)
    }

    let msgErro = validarPessoa(pessoa);
    if (msgErro) {
        spanErro.textContent = msgErro;
        setTimeout(() => spanErro.textContent = "", 3000);
    }

    pessoa.imc = obterIMC(pessoa.peso, pessoa.altura);
    pessoa.classificacao = obterClassificacao(pessoa.imc);

    exibirDados(pessoa);
})

//Função já pronta exibirDados
function exibirDados({nome, imc, classificacao}){
    document.querySelector('#dados').textContent = "Dados da pessoa";
    document.querySelector('#pessoaNome').textContent = `Nome: ${nome}`;
    document.querySelector('#pessoaImc').textContent = `IMC: ${imc}`;
    document.querySelector('#pessoaClassificacao').textContent = `Classificação: ${classificacao}`;
}