// Função para criar um linha da tabela de alunos
export default function CriarTabelaAluno(nome, presenca, atividades, media, situacao) {
    let tabela = document.querySelector("#classe>table>tbody")
    let tr = document.createElement("tr")

    for(let i = 0; i < 6; i++) {
        let td = document.createElement("td")

        if(i == 0) {
            td.innerHTML = nome
            td.classList.add("nome")
        } else if(i == 1) 
            td.innerHTML = presenca
        else if(i == 2) 
            td.innerHTML = atividades
        else if(i == 3)
            td.innerHTML = media
        else if(i == 4) 
            td.innerHTML = situacao
        else {
            let span = document.createElement("span")
            span.classList.add("material-symbols-outlined")
            span.setAttribute("data-bs-toggle", "modal")
            span.setAttribute("data-bs-target", "#aluno_vejaMais")
            span.innerHTML = "query_stats"

            td.appendChild(span)
        }

        tr.appendChild(td)
    }

    tabela.appendChild(tr)
}

function GerarNumeroAleatorioInclusivo(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function GerarNumeroFloatAleatorioInclusivo(min, max, casasDecimais) {
    return Number.parseFloat((Math.random() * (max - min) + min).toFixed(casasDecimais))
}

export {GerarNumeroAleatorioInclusivo, GerarNumeroFloatAleatorioInclusivo}