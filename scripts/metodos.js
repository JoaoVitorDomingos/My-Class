import { AdicionarNotaTD } from "./formularios.js"

// Função para criar um linha da tabela de alunos
export default function CriarTabelaAluno(nome, presenca, atividades, media, situacao, matricula) {
    let tabela = document.querySelector("#classe>div.container-tabela>table>tbody")
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
        else if(i == 3) {
            td.innerHTML = media
            td.classList.add("media")
        } else if(i == 4) {
            td.innerHTML = situacao
            td.classList.add("situacao")
        }
        else {
            let span = document.createElement("span")
            span.classList.add("material-symbols-outlined")
            span.setAttribute("data-bs-toggle", "modal")
            span.setAttribute("data-bs-target", "#aluno_vejaMais")
            span.setAttribute("data-bs-whatever", `${matricula}`)
            span.innerHTML = "query_stats"

            td.appendChild(span)
        }

        tr.appendChild(td)
    }

    tabela.appendChild(tr)
}

function CriarTabelaGenerica(pai, linhas, colunas, matrizValores, arrayClasses, nomeCheckbox="") {
    function CriarInput(tipo, coluna, filhos, checkboxName) {
        let input = document.createElement("input")
        if(tipo == "input_text") {
            input.setAttribute("type", "text")
            input.setAttribute("name", "observacao")
            input.classList.add("observacao")
        } else if(tipo == "input_radio") {
            input.setAttribute("type", "radio")
            input.setAttribute("name", `presenca${filhos + 1}`)
            if(coluna + 1 == 2) {
                input.setAttribute("id", `v${filhos + 1}`)
            } else {
                input.setAttribute("id", `f${filhos + 1}`)
            }
        } else if(tipo == "input_checkbox") {
            input.setAttribute("type", "checkbox")
            input.setAttribute("name", checkboxName)
            input.setAttribute("id", `${checkboxName}${filhos + 1}`)
        } else {
            console.log("ERRO!!!")
            console.log("Tipo: " + tipo)
            alert("Algum erro ocorreu! Abra o console (CTRL+SHIFT+I)")
            return
        }
        return input
    }

    for(let i = 0; i < linhas; i++) {
        let tr = document.createElement("tr")

        for(let j = 0; j < colunas; j++) {
            let td = document.createElement("td")
            if(matrizValores[i][j] == "input_text" || matrizValores[i][j] == "input_radio" || matrizValores[i][j] == "input_checkbox") {
                let input = CriarInput(matrizValores[i][j], j, pai.childElementCount, nomeCheckbox)
                td.appendChild(input)

            } else {
                td.innerHTML = matrizValores[i][j]
                if(matrizValores[i][j] == "--") {
                    td.addEventListener("click", AdicionarNotaTD)
                }
            }
            td.classList.add(arrayClasses[j])
            tr.appendChild(td)
        }
        pai.appendChild(tr)
    }
}

function GerarNumeroAleatorioInclusivo(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function GerarNumeroFloatAleatorioInclusivo(min, max, casasDecimais) {
    return Number.parseFloat((Math.random() * (max - min) + min).toFixed(casasDecimais))
}

function CriarTabelaModais(objAluno) {
    let caminho = "div>div>div.modal-body>div>table>tbody"

    const tabela_lancarNotas = document.querySelector(`#lancar_notas>${caminho}`)
    CriarTabelaGenerica(tabela_lancarNotas, 1, 3, [[objAluno.nome, "--", "input_text"]], ["td_nome", "td_nota", "td_observacao"])

    const tabela_lancarPresenca = document.querySelector(`#lancar_presenca>${caminho}`)
    CriarTabelaGenerica(tabela_lancarPresenca, 1, 4, [[objAluno.nome, "input_radio", "input_radio", "input_text"]], ["td_nome", "check-box", "check-box", "td_observacao"])

    const tabela_imprimirBoletim = document.querySelector(`#imprimir_boletim>${caminho}`)
    CriarTabelaGenerica(tabela_imprimirBoletim, 1, 2, [["input_checkbox", objAluno.nome]], ["check-box", "td_nome"], "imprimir_bo_aluno")

    const tabela_imprimirPresenca = document.querySelector(`#imprimir_presenca>${caminho}`)
    CriarTabelaGenerica(tabela_imprimirPresenca, 1, 2, [["input_checkbox", objAluno.nome]], ["check-box", "td_nome"], "imprimir_pre_aluno")
}

function AcharPai(elemento, tagNamePai, classeNamePaiReg) {
    let terminar = false
    let pai = elemento.parentNode
    let classes = pai.className
    //console.log('Pai: ')
    //console.log(pai)
    //console.log(classes)

    while(!terminar) {
        if(pai.nodeName == tagNamePai && classeNamePaiReg.test(classes)) {
            //console.log("É o elemento certo")
            terminar = true
        } else {
            //console.log("NÃO é o elemento certo")
            //console.log("Pai:")
            //console.log(pai.parentNode)
            //console.log(pai.parentNode.className)
            pai = pai.parentNode
            classes = pai.className
        }
    }

    return pai
}

function AcharFilho(pai, tagNameFilho, classeNameFilhoReg=/.*/) {
    let filhos = [...pai.children]
    let filho
    //console.log("Filhos:")
    //console.log(filhos)

    function Buscar(array) {
        array.forEach(el => {
            //console.log("Elemento:")
            //console.log(el)
            //console.log(el.tagName)
            //console.log(el.className)
            if(el.tagName == tagNameFilho && classeNameFilhoReg.test(el.className)) {
                //console.log("É O QUE EU QUERO")
                filho = el
            } else if(el.tagName == "DIV") {
                //console.log("DIV - CHAMANDO FUNÇÃO NOVAMENTE")
                Buscar([...el.children])
            } else {
                //console.log("NÃO É O QUE EU QUERO")
            }
        })
    }
    Buscar(filhos)

    return filho
}

export {GerarNumeroAleatorioInclusivo, GerarNumeroFloatAleatorioInclusivo, CriarTabelaGenerica, CriarTabelaModais, AcharPai, AcharFilho}