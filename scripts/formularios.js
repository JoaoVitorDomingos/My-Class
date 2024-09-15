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

function Resetar() {
    let editarBack_form = document.querySelector("#editar_back>div>div>form")

    editarBack_form.reset()
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
