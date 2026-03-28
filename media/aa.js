const formAluno = document.querySelector('form')
const spanErro = document.querySelector('#erro')

formAluno.addEventListener("submit", async e => {
    e.preventDefault()
    const aluno = {}
    aluno.nome = document.querySelector('#nome').value.trim()
    aluno.nota1 = Number(document.querySelector('#nota1').value)
    aluno.nota2 = Number(document.querySelector('#nota2').value)

    if (!aluno) {
        spanErro.textContent = "Informações ausentes."
        setTimeout(() => spanErro.textContent = "", 3000)
    }
    let msg = validar(aluno)
    if (msg) {
        spanErro.textContent = msg
        setTimeout(()=> spanErro.textContent = "", 3000)
    }

    try {
        let resp = await fetch('processaAluno.php', {
            method: "POST",
            body: JSON.stringify(aluno),
            headers: { "Content-Type":"application/json; charset=UTF-8" }
        })
        console.log("qualquer coisa")
        let dados = null
        try {
            dados = await resp.json()
        } catch {}
        if (!resp.ok) {
            limparSpans()
            let msg = `URL: ${resp.url} - ${resp.status} - ${resp.statusText}`
            if (dados?.erro) msg = dados.erro
            throw new Error(msg)
        }

        if (!dados) throw new Error ("Dados esperados do servidor estão ausentes.")
        preencherDados(dados)
    }
    catch (erro) {
        spanErro.textContent = erro.message
        setTimeout(() => spanErro.textContent = "", 3000)
    }
})

function validar({nome, nota1, nota2}) {
    if (!nome) return "Nome não está preenchido."
    if (Number.isNaN(nota1) || Number.isNaN(nota2)) return "As notas precisam ser valores numéricos."
    if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) return "As notas precisam estar entre 0 e 10."
    return null
}

function limparSpans() {
    let display = document.querySelectorAll('.info')
    display.forEach(elemento => elemento.textContent = '')
}

function preencherDados({nome, media, grau}) {
    document.querySelector('#dados').textContent = "Dados do aluno"
    document.querySelector('#alunoNome').textContent = `Nome: ${nome}`
    document.querySelector('#alunoMedia').textContent = `Média: ${media}`
    document.querySelector('#alunoGrau').textContent = `Grau: ${grau}`
}