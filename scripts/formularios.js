// Função de Validação de Formularios
function ValidacaoFormulario(...inputs) {
    let max = inputs.length
    let contador = 0

    for(let i = 0; i < max; i++) {
        //console.log(inputs[i])
        //console.log(inputs[i].value)

        if(inputs[i].value != "") {
            //console.log("Esta preenchido")
            contador++
        } else {
            //console.log("Não esta preenchido")
        }
    }

    if(contador == max) {
        //console.log("Tudo Preechido")
        return true
    } else {
        //console.log("Nem tudo esta preenchido")
        return false
    }
        
}

// Reset

// adicionando o evento de click nos botões de cancelar
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

        return [document.querySelector(`${caminhoLN}form`), ...document.querySelectorAll(`${caminhoLN}table>${caminhoTdNota}`), ...document.querySelectorAll(`${caminhoLN}table>${caminhoTdObservacao}`)]

    } else if(elementId == "modal_LancarPresenca_BtnCancel") {
        let caminhoLP = "#modais>#lancar_presenca>div>div>div"

        return [document.querySelector(`${caminhoLP}>form`), ...document.querySelectorAll(`${caminhoLP}>table>${caminhoTdCheckBox}`), ...document.querySelectorAll(`${caminhoLP}>table>${caminhoTdObservacao}`)]

    } else if(elementId == "modal_AdicionarAluno_BtnCancel") {
        return [document.querySelector("#modais>#adicionar_aluno>div>div>div>form")]

    } else if(elementId == "modal_ImprimirBoletim_BtnCancel") {
        let caminhoIB = "#modais>#imprimir_boletim>div>div>div.modal-body"

        return [document.querySelector(`${caminhoIB}>form`), ...document.querySelectorAll(`${caminhoIB}>table>${caminhoTdCheckBox}`)]
    } else if(elementId == "modal_ImprimirPresenca_BtnCancel") {
        let caminhoIP = "#modais>#imprimir_presenca>div>div>div.modal-body"

        return [document.querySelector(`${caminhoIP}>form`), ...document.querySelectorAll(`${caminhoIP}>table>${caminhoTdCheckBox}`)]

    } else if(elementId == "modal_CriarSessao_BtnCancel") {
        let caminhoCS = "#modais>#criar_sessao>div>div>div.modal-body"

        return [document.querySelector(`${caminhoCS}>fieldset>input`), ...document.querySelectorAll(`${caminhoCS}>div>table>${caminhoTdCheckBox}`)]
    } else if(elementId == "modal_CriarAtividade_BtnCancel") {
        let caminhoCA = "#modais>#criar_atividade>div>div>div.modal-body"

        return [document.querySelector(`${caminhoCA}>form`)]
    }
}

// Função para resetar as informações de formulários
function Resetar(evt) {
    console.log("Função Resetar - evt.target(this):")
    console.log(evt.target)
    console.log("Id: " + evt.target.id)

    let elementos = IdentificacaoBtnModal(evt.target.id)
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

function EditarBack() {
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
        //alert("Preencha tudo!")
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

        modal_editarBack.hide()
    }
}
