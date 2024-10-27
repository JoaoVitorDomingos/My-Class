import Dados from "./banco_dados.js"
import { AdicionarNotaTD } from "./formularios.js"

const modal_vejaMais = document.getElementById("aluno_vejaMais")
const div_foto = document.querySelector("div.foto-aluno")
const p_infoAluno = [...document.querySelectorAll("div.informacoes-aluno>div.col-md-8>div.row>p")]
const td_first_table = [...document.querySelectorAll("#modal_vejaMais_firstTable>tbody>tr>td")]
const td_second_table = [...document.querySelectorAll("#modal_vejaMais_secondTable>tbody>tr>td")]

for(let i = 0; i < 4; i++) {
    td_second_table[i].addEventListener("click", evento => {
        AdicionarNotaTD(evento)

        //console.log(evento.target)
        let td_index = td_second_table.findIndex(td => td == evento.target)
        //console.log(td_index)

        let obj_aluno = Dados.alunos.find(aluno => {
            //console.log(aluno.nome)
            //console.log(p_infoAluno[0].children[0].innerHTML)
            return aluno.nome == p_infoAluno[0].children[0].innerHTML
        })
        //console.log(obj_aluno)

        obj_aluno.AdicionarNota(td_index+1, Number.parseFloat(evento.target.innerHTML))
        //obj_aluno.notas[i] = Number.parseFloat(evento.target.innerHTML)
        //obj_aluno.CalcularMedia()

        const trs_mainTable = [...document.querySelectorAll("main>#classe>div>table>tbody>tr")]
        //console.log(trs_mainTable)
        //console.log(trs_mainTable[0].firstElementChild.innerHTML)
        //console.log(obj_aluno.nome)
        let tr_indice = trs_mainTable.findIndex(tr => {
            return tr.firstElementChild.innerHTML == obj_aluno.nome
        })
        //console.log(trs_mainTable[tr_indice].children)

        let td_media
        let td_situacao
        let tds = [...trs_mainTable[tr_indice].children]
        tds.forEach(el => {
            if(el.className == "media") {
                td_media = el 
            } else if(el.className == "situacao") {
                td_situacao = el
            }
        })
        //console.log(td_media)
        //console.log(td_situacao)

        if(obj_aluno.notas[4] != "--") {
            td_second_table[4].innerHTML = obj_aluno.MostrarMedia()
            td_second_table[5].innerHTML = obj_aluno.situacao
            td_media.innerHTML = obj_aluno.MostrarMedia()
            td_situacao.innerHTML = obj_aluno.situacao
        }
    })
}

// console.log("Div Foto:")
// console.log(div_foto)
// console.log("Paragrafos:")
// console.log(p_infoAluno)
// console.log("TD First:")
// console.log(td_first_table)
// console.log("TD Second")
// console.log(td_second_table)

if(modal_vejaMais) {
    modal_vejaMais.addEventListener("show.bs.modal", evento => {
        // Botão que ativou o modal
        const botao = evento.relatedTarget
        //console.log("Botão Clicado:")
        //console.log(botao)

        // Pegando o atributo que irá diferenciar os conteudos do modal
        const identificacao = botao.getAttribute("data-bs-whatever")
        //console.log("Identificação: " + identificacao)

        // Conteudo Dinamico do Modal
        let obj_aluno = Dados.alunos.find(aluno => {
            return aluno.matricula == identificacao
        })
        //console.log(obj_aluno)

        div_foto.style.backgroundImage = `url(${obj_aluno.foto})`

        p_infoAluno[0].innerHTML = `Nome: <span style="font-weight: normal;">${obj_aluno.nome}</span>`
        p_infoAluno[1].innerHTML = `Nascimento: <span style="font-weight: normal;">${obj_aluno.nascimento}</span>`
        p_infoAluno[2].innerHTML = `CPF: <span style="font-weight: normal;">${obj_aluno.cpf}</span>`
        p_infoAluno[3].innerHTML = `Endereço: <span style="font-weight: normal;">${obj_aluno.endereco}</span>`
        p_infoAluno[4].innerHTML = `Número da Matrícula: <span style="font-weight: normal;">${obj_aluno.matricula}</span>`

        td_first_table[0].innerHTML = obj_aluno.presenca[0]
        td_first_table[1].innerHTML = Dados.aulas - obj_aluno.presenca[0]
        td_first_table[2].innerHTML = obj_aluno.presenca[1] + "%"
        td_first_table[3].innerHTML = obj_aluno.atividades[0]
        td_first_table[4].innerHTML = Dados.atividades - obj_aluno.atividades[0]
        td_first_table[5].innerHTML = obj_aluno.atividades[1] + "%"

        
        for(let i = 0; i < 4; i++) {
            if(obj_aluno.notas[i] == undefined) {
                td_second_table[i].innerHTML = "--"
            } else {
                td_second_table[i].innerHTML = obj_aluno.notas[i]
            }
        }
        
        // td_second_table[0].innerHTML = obj_aluno.notas[0]
        // td_second_table[1].innerHTML = obj_aluno.notas[1]
        // td_second_table[2].innerHTML = obj_aluno.notas[2]
        // td_second_table[3].innerHTML = obj_aluno.notas[3]
        td_second_table[4].innerHTML = obj_aluno.MostrarMedia()
        td_second_table[5].innerHTML = obj_aluno.situacao
    })
}