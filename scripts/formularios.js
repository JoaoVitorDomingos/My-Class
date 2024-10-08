import Dados from "./banco_dados.js"

// Função de Validação de Formularios
function ValidacaoFormulario(...inputs) {
    let max = inputs.length
    let contador = 0

    for(let i = 0; i < max; i++) {
        // console.log(inputs[i])
        // console.log(inputs[i].value)

        if(inputs[i].tagName == "TD") {
            //console.log("TD")
            if(inputs[i].innerHTML != "--") {
                contador++
                //console.log("Esta preenchido")
            } else {
                //console.log("Não esta preenchido")
            }
        } else if(inputs[i].type == "radio") {
            //console.log("Radio")
            //console.log("Checado: " + inputs[i].checked)
            //console.log("Checado:" + inputs[i+1].checked)
            if(inputs[i].checked || inputs[i+1].checked) {
                //console.log("Preenchido")
                contador++
            } else {
                //console.log("Não esta preenchido")
            }
            i++
        } else {
            if(inputs[i].value != "") {
                //console.log("Esta preenchido")
                contador++
            } else {
                //console.log("Não esta preenchido")
            }
        }
    }

    if(contador == max) {
        console.log("Tudo Preechido")
        return true
    } else {
        console.log("Nem tudo esta preenchido")
        return false
    }
        
}

// adicionando o evento de click com a função resetar nos botões de cancelar
document.querySelectorAll("#modais>div.modal").forEach(modal => { 
    //console.log(modal)
    //console.log(modal.id)
    if(modal.id != "aluno_vejaMais") {
        let botaoCancel = document.querySelector(`#${modal.id}>div>div>div.modal-footer>button`)
        //console.log(botaoCancel)
        botaoCancel.addEventListener("click", Resetar)
    }
})

// Identifica qual é o botão de cancelar e retorna o que precisa ser resetado
function IdentificacaoBtnModal(elementId) {
    let caminhoTdNota = "tbody>tr>td.td_nota"
    let caminhoTdObservacao = "tbody>tr>td.td_observacao>input"
    let caminhoTdCheckBox = "tbody>tr>td.check-box>input"

    if(elementId == "modal_editarBack_btnCancel") {
        const modal_editarBack_formCorBack = document.querySelector("#cor-back")
        modal_editarBack_formCorBack.classList.add("form-desativado")
        modal_editarBack_formCorBack.setAttribute("disabled", "")

        return [document.querySelector("#modais>#editar_back>div>div>form")]

    } else if(elementId == "modal_LancarNotas_BtnCancel") {
        let caminhoLN = "#modais>#lancar_notas>div>div>div>"

        return [document.querySelector(`${caminhoLN}form`), ...document.querySelectorAll(`${caminhoLN}div>table>${caminhoTdNota}`), ...document.querySelectorAll(`${caminhoLN}div>table>${caminhoTdObservacao}`)]

    } else if(elementId == "modal_LancarPresenca_BtnCancel") {
        let caminhoLP = "#modais>#lancar_presenca>div>div>div"

        return [document.querySelector(`${caminhoLP}>form`), ...document.querySelectorAll(`${caminhoLP}>div>table>${caminhoTdCheckBox}`), ...document.querySelectorAll(`${caminhoLP}>div>table>${caminhoTdObservacao}`)]

    } else if(elementId == "modal_AdicionarAluno_BtnCancel") {
        return [document.querySelector("#modais>#adicionar_aluno>div>div>div>form")]

    } else if(elementId == "modal_ImprimirBoletim_BtnCancel") {
        let caminhoIB = "#modais>#imprimir_boletim>div>div>div.modal-body"

        return [document.querySelector(`${caminhoIB}>form`), ...document.querySelectorAll(`${caminhoIB}>div>table>${caminhoTdCheckBox}`)]
    } else if(elementId == "modal_ImprimirPresenca_BtnCancel") {
        let caminhoIP = "#modais>#imprimir_presenca>div>div>div.modal-body"

        return [document.querySelector(`${caminhoIP}>form`), ...document.querySelectorAll(`${caminhoIP}>div>table>${caminhoTdCheckBox}`)]

    } else if(elementId == "modal_CriarSessao_BtnCancel") {
        let caminhoCS = "#modais>#criar_sessao>div>div>div.modal-body"

        return [document.querySelector(`${caminhoCS}>fieldset>input`), ...document.querySelectorAll(`${caminhoCS}>div>div>table>${caminhoTdCheckBox}`)]
    } else if(elementId == "modal_CriarAtividade_BtnCancel") {
        let caminhoCA = "#modais>#criar_atividade>div>div>div.modal-body"

        return [document.querySelector(`${caminhoCA}>form`)]
    }
}

// Função para resetar as informações de formulários
function Resetar(evt, btnCancel) {
    let botaoID

    //console.log(btnCancel)
    if(btnCancel != undefined) {
        //console.log("Função Resetar - Botao")
        //console.log(btnCancel)
        //console.log("Botao Id: " + btnCancel.id)
        botaoID = btnCancel.id
    } else {
        //console.log("Função Resetar - evt.target(this):")
        //console.log(evt.target)
        //console.log("Id: " + evt.target.id)
        botaoID = evt.target.id
    }
    

    let elementos = IdentificacaoBtnModal(botaoID)
    console.log(elementos)

    elementos.map(el => {
        console.log("Tag Name: " + el.tagName)
        if(el.tagName == "FORM") {
            console.log("Resetando Formulario...")
            el.reset()
        } else if(el.tagName == "TD") {
            console.log("Resetando TD...")
            el.innerHTML = "--"
        } else if(el.tagName == "INPUT") {
            console.log("Tipo do Input: " + el.type)
            if(el.type == "text")
                el.value = ""
            else if(el.type == "radio" || el.type == "checkbox")
                el.checked = false
        }
    })
}

// Formulario Editar Back
const modal_editarBack = new bootstrap.Modal("#editar_back")
const modal_editarBack_BtnSalvar = document.querySelector("#editar_back>div>div>div.modal-footer>input")
modal_editarBack_BtnSalvar.addEventListener("click", EditarBack)

function EditarBack(evento) {
    const editarBack_titulo = document.getElementById("titulo")
    const editarBack_corTxt = document.getElementById("corTxt")
    const editarBack_backTxt_ativado = document.getElementById("backTxt-ativado")
    const editarBack_backTxt_desativado = document.getElementById("backTxt-desativado")
    const editarBack_backCor = document.getElementById("backCor")
    const editarBack_backImg = document.getElementById("backImg")

    const backTitulo = document.querySelector("#classe>.back>h2")
    const divBack = document.querySelector("#classe>.back")

    let validacao = ValidacaoFormulario(editarBack_titulo, editarBack_backImg)

    if(!validacao) {
        alert("Preencha tudo!")
    } else {
        //alert("Tudo Preenchido!")

        backTitulo.innerHTML = editarBack_titulo.value
        //console.log("Cor do Texto:")
        //console.log(editarBack_corTxt.value)
        backTitulo.style.setProperty("color", editarBack_corTxt.value)

        if(editarBack_backTxt_ativado.checked) {
            //console.log("Fundo de Texto Ativado!")
            //console.log("Cor:")
            //console.log(editarBack_backCor.value)
            backTitulo.style.setProperty("background-color", editarBack_backCor.value)
        } else if(editarBack_backTxt_desativado.checked) {
            //console.log("Fundo de Texto Desativado")
            backTitulo.style.setProperty("background-color", "transparent")
        }

        //console.log("Caminho da Imagem: ")
        //console.log(editarBack_backImg.files[0])
        let url = URL.createObjectURL(editarBack_backImg.files[0])
        //console.log(url)
        divBack.style.setProperty("background-image", `url(${url})`)
        
        Resetar(evento, evento.target.previousElementSibling)

        modal_editarBack.hide()
    }
}

// Formulario Lançar Notas
const modal_LancarNota = new bootstrap.Modal("#lancar_notas")
const btnSave_lancarNota = document.getElementById("btnSave_lancarNota")

btnSave_lancarNota.addEventListener("click", evento => {
    const input_conteudo = document.getElementById("conteudo")
    const input_data = document.getElementById("data")
    const input_bimestre = document.getElementById("bimestre")
    const tds_nota = document.querySelectorAll("#lancar_notas>div>div>div>div>table>tbody>tr>td.td_nota")
    // console.log(input_conteudo)
    // console.log(tds_nota)
    // console.log(input_data)
    // console.log(input_bimestre)

    let validacao = ValidacaoFormulario(input_conteudo, input_data, ...tds_nota)

    if(!validacao) {
        alert("Preencha tudo!")
    } else {
        const tds_nomes = document.querySelectorAll("#lancar_notas>div>div>div>div>table>tbody>tr>td.td_nome")
        const mainTabela_media = [...document.getElementsByClassName("media")]
        const mainTabela_situacao = [...document.getElementsByClassName("situacao")]
        
        // console.log(tds_nomes)
        tds_nomes.forEach((nome, indice) => {
            // console.log(nome)
            // console.log(indice)
            // console.log("Nota: " + tds_nota[indice].innerHTML)
            // console.log("Bimestre: " + input_bimestre.value.match(/[1-4]/)[0])

            Dados.alunos.forEach(aluno => {
                //console.log(aluno.nome)
                if(aluno.nome == nome.innerHTML) {
                    aluno.AdicionarNota(input_bimestre.value.match(/[1-4]/)[0], tds_nota[indice].innerHTML)
                    mainTabela_media[indice].innerHTML = aluno.MostrarMedia()
                    mainTabela_situacao[indice].innerHTML = aluno.situacao
                    // console.log("Nota do Aluno " + aluno.nome + ":")
                    // console.log(aluno.notas)
                }
            })
        })

        //console.log(evento.target.previousElementSibling)
        Resetar(evento, evento.target.previousElementSibling)

        modal_LancarNota.hide()

        console.log("Banco de Dados - Alunos:")
        console.log(Dados.alunos)
    }
})

function AdicionarNota(evento) {
    let nota = ""
    do{
        if(nota < 0 || nota > 10 || /[a-z]/.test(nota))
            alert("Nota inválida!")
        nota = prompt("Digite a nota deste aluno (0-10):")
        // console.log(nota)
        // console.log(typeof(nota))
        // console.log("--------")
        if(nota == null || nota == "") {
            nota = ""
            // console.log(nota)
            // console.log(typeof(nota))
            // console.log("Tem letra: " + /[a-z]/.test(nota))
        } else {
            if(/,/.test(nota)) {
                nota = nota.replace(/,/, ".")
            }
            nota = Number.parseFloat(nota)
            // console.log(nota)
            // console.log(typeof(nota))
            // console.log("--------")
            nota = nota.toString()
            // console.log(nota)
            // console.log(typeof(nota))
            // console.log("Tem letra: " + /[a-z]/.test(nota))
        }
        
    } while(nota < 0 || nota > 10 || /[a-z]/g.test(nota))
    
    // console.log("--------")
    // console.log(nota)
    // console.log(typeof(nota))
    // console.log("--------")
    nota = Number.parseFloat(nota)
    //console.log(nota)
    //console.log(nota.toFixed(1))
    // console.log(typeof(nota))
    if(nota !== "") {
        evento.target.innerHTML = nota.toFixed(1)
        //console.log("Nota: " + nota)
    } else {
        console.log("Erro")
    }
}

// const btnSave_LancarPresenca = document.getElementById("btnSave_lancarPresenca")
// btnSave_LancarPresenca.addEventListener("click", evento => {
//     const radios = document.querySelectorAll("#lancar_presenca>div>div>div>div>table>tbody>tr>td.check-box>input")
//     console.log(radios)

//     ValidacaoFormulario(...radios)
// })

export {AdicionarNota}