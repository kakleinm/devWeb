const botao = document.querySelector("#botao")
const spanErro = document.querySelector("#erro")

botao.addEventListener("click", async e => {
    e.preventDefault()
    const pessoa = {
        nome: document.querySelector("#nome").value.trim(),
        peso: Number(document.querySelector("#peso").value),
        altura: Number(document.querySelector("#altura").value)
    }

    if (!pessoa) exibirErro("Informações ausentes")
    let msg = validar(pessoa)
    if (msg) exibirErro(msg)

    try {
        let resp = await fetch ('processaDados.php', {
            method: "POST",
            body: JSON.stringify(pessoa),
            headers: {"Content-Type":"application/json; charset=UTF-8"}
        })

        let dados = null
        try {
            dados = await resp.json()
        } catch {}

        if (!resp.ok) {
            limparSpans()
            let msg = `URL: ${resp.url} - ${resp.status} - ${resp.statusText}`
            if (dados?.erro) msg = dados.erro
            throw new Error (msg)
        }

        if (!dados) throw new Error ("Dados esperados ausentes.")
        preencherDados(dados)
    }
    catch (erro) {
        exibirErro(erro.message)
    }
})

function validar({nome, peso, altura}) {
    if (!nome) return "Nome precisa estar preenchido."
    if (Number.isNaN(peso) || Number.isNaN(altura)) return "O peso e a altura precisam ser valores numéricos."
    if (peso < 10 || peso > 300 || altura < 0.30 || altura > 2.50) return "O peso precisa estar entre 10 e 300kg. A altura precisa estar entre 0.30 e 2.50m."
    return null
}

function limparSpans() {
    let display = document.querySelectorAll(".info")
    display.forEach(elemento => elemento.textContent = '')
}

function preencherDados({nome, imc, classificacao}) {
    document.querySelector("#dados").textContent = "Resultado"
    document.querySelector("#nomePessoa").textContent = `Nome: ${nome}`
    document.querySelector("#imc").textContent = `IMC: ${imc.toFixed(2)}`
    document.querySelector("#classificacao").textContent = `Classificação: ${classificacao}`
}

function exibirErro(mensagem) {
    spanErro.textContent = mensagem
    setTimeout(() => spanErro.textContent = '', 3000)
}