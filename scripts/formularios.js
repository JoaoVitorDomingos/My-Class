import Dados from "./banco_dados.js"
import Aluno from "./obj_aluno.js"
import * as metodosjs from "./metodos.js"
import { CriarPresenca } from "./pegar_alunos.js"
import * as impressaojs from "./impressao.js"

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
                contador = contador + 2
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

        return [document.querySelector(`${caminhoIB}>form`), ...document.querySelectorAll(`${caminhoIB}>div>table>${caminhoTdCheckBox}`), document.querySelector(`${caminhoIB}>div>table`)]

    } else if(elementId == "modal_ImprimirPresenca_BtnCancel") {
        let caminhoIP = "#modais>#imprimir_presenca>div>div>div.modal-body"

        return [document.querySelector(`${caminhoIP}>form`), ...document.querySelectorAll(`${caminhoIP}>div>table>${caminhoTdCheckBox}`), document.querySelector(`${caminhoIP}>div>table`)]

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
    //console.log(elementos)

    elementos.map(el => {
        //console.log("Tag Name: " + el.tagName)
        if(el.tagName == "FORM") {
            //console.log("Resetando Formulario...")
            el.reset()
        } else if(el.tagName == "TD") {
            //console.log("Resetando TD...")
            el.innerHTML = "--"
        } else if(el.tagName == "INPUT") {
            //console.log("Tipo do Input: " + el.type)
            if(el.type == "text")
                el.value = ""
            else if(el.type == "radio" || el.type == "checkbox")
                el.checked = false
        } else if(el.tagName == "TABLE") {
            el.classList.add("esconder")
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

        let dia_input = (input_data.value).match(/(\d{4})-(\d{2})-(\d{2})/)

        let dia = new Date(dia_input[1], dia_input[2] - 1, dia_input[3])
    
        if(dia < Dados.dias_aulas[0][1]) {
            console.log("Data Iválida! Muito pequena!")
            alert("Data Iválida!")
        } else {

            let last_pos = Dados.dias_aulas.length - 1
    
            //console.log(`Conta: ${dia.getMonth()} - ${Dados.dias_aulas[last_pos][1].getMonth() + 1} = ${(dia.getMonth() - (Dados.dias_aulas[last_pos][1].getMonth() + 1))}`)
    
            if((dia.getMonth() - (Dados.dias_aulas[last_pos][1].getMonth() + 1)) >= 1 || (dia.getFullYear() - Dados.dias_aulas[last_pos][1].getFullYear()) != 0) {
                console.log("Data inválida! Muito grande")
                alert("Data Iválida!")
            } else {

                if(dia.getDay() == 0 || dia.getDay() == 6) {
                    console.log("Data Inválida! Final de semana!")
                    alert("Data Iválida!")
                } else {
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
            }
        }
        
        
    }
})

function AdicionarNotaTD(evento) {
    let nota = ""
    do{
        if(nota < 0 || nota > 10 || /[a-z]/.test(nota))
            alert("Nota inválida!")
        nota = prompt("Digite a nota deste aluno (0-10):")
        //console.log(nota)
        //console.log(typeof(nota))
        //console.log("--------")
        if(nota == null || nota == "") {
            //console.log("If - Null ou Vazio")
            nota = ""
            //console.log(nota)
            //console.log(typeof(nota))
            //console.log("Tem letra: " + /[a-z]/.test(nota))
        } else {
            //console.log("If not Null ou not Vazio")
            if(/,/.test(nota)) {
                nota = nota.replace(/,/, ".")
            }
            nota = Number.parseFloat(nota)
            //console.log(nota)
            //console.log(typeof(nota))
            //console.log("--------")
            nota = nota.toString()
            //console.log(nota)
            //console.log(typeof(nota))
            //console.log("Tem letra: " + /[a-z]/.test(nota))
        }
        
    } while(nota < 0 || nota > 10 || /[a-z]/g.test(nota))
    
    //console.log("-------- Fora do Loop")
    //console.log(nota)
    //console.log(typeof(nota))
    
    if(nota != "") {
        //console.log("-------- Virou numero")
        nota = Number.parseFloat(nota)
        //console.log(nota)
        //console.log(nota.toFixed(1))
        //console.log(typeof(nota))
        //console.log(evento.target.innerHTML)
        evento.target.innerHTML = nota.toFixed(1)
        //console.log(evento.target.innerHTML)
        //console.log("Nota: " + nota)
    } else {
        //console.log("--------- Vazio")
        nota = "--"
    }
}

// Formulário Lançar Presença
const btnSave_LancarPresenca = document.getElementById("btnSave_lancarPresenca")
const modal_LancarPresenca = new bootstrap.Modal("#lancar_presenca")

btnSave_LancarPresenca.addEventListener("click", evento => {
    const radios = document.querySelectorAll("#lancar_presenca>div>div>div>div>table>tbody>tr>td.check-box>input")
    const input_dia = document.getElementById("presenca_data")
    const input_conteudo = document.getElementById("presenca_conteudo")

    // console.log(radios)
    // console.log(input_dia.value)
    // console.log(input_conteudo.value)

    let validacao = ValidacaoFormulario(...radios, input_dia, input_conteudo)

    if(!validacao) {
        alert("Preencha Tudo!")
    } else {

        let dia_input = (input_dia.value).match(/(\d{4})-(\d{2})-(\d{2})/)

        let dia = new Date(dia_input[1], dia_input[2] - 1, dia_input[3])
    
        if(dia < Dados.dias_aulas[0][1]) {
            console.log("Data Iválida! Muito pequena!")
            alert("Data Iválida!")
        } else {

            let last_pos = Dados.dias_aulas.length - 1
    
            //console.log(`Conta: ${dia.getMonth()} - ${Dados.dias_aulas[last_pos][1].getMonth() + 1} = ${(dia.getMonth() - (Dados.dias_aulas[last_pos][1].getMonth() + 1))}`)
    
            if((dia.getMonth() - (Dados.dias_aulas[last_pos][1].getMonth() + 1)) >= 1 || (dia.getFullYear() - Dados.dias_aulas[last_pos][1].getFullYear()) != 0) {
                console.log("Data inválida! Muito grande")
                alert("Data Iválida!")
            } else {

                if(dia.getDay() == 0 || dia.getDay() == 6) {
                    console.log("Data Inválida! Final de semana!")
                    alert("Data Iválida!")
                } else {

                    let dia_formatado = `${dia_input[3]}/${dia_input[2]}/${dia_input[1]}`
                    //console.log(dia_formatado)

                    Dados.dias_aulas.push([dia_formatado, dia])

                    console.log("Banco de Dados - Aulas: ")
                    console.log(Dados.dias_aulas)

                    const td_alunos = [...document.querySelectorAll("#lancar_presenca>div>div>div>div>table>tbody>tr>td.td_nome")]

                    let pos_radios = 0
                    td_alunos.forEach(aluno => {
                        Dados.alunos.forEach(objAluno => {
                            if(objAluno.nome == aluno.innerHTML) {
                                if(radios[pos_radios].checked) {
                                    //console.log(`O aluno ${objAluno.nome} VEIO este dia`)
                                    objAluno.dias_presenca.push("V")
                                } else {
                                    //console.log(`O aluno ${objAluno.nome} FALTOU este dia`)
                                    objAluno.dias_presenca.push("F")
                                }
                                pos_radios += 2
                            }
                        })
                    })

                    console.log("Banco de Dados - Alunos: ")
                    console.log(Dados.alunos)

                    Resetar(evento, evento.target.previousElementSibling)
                    modal_LancarPresenca.hide()
                }
            }
        }
    }
    
})

// Formulário Adicionar Aluno
const btnSave_AdicionarAluno = document.getElementById("btnSave_adicionarAluno")
const modal_AdicionarAluno = new bootstrap.Modal("#adicionar_aluno")

btnSave_AdicionarAluno.addEventListener("click", evento => {
    const input_nome = document.getElementById("adicionar_nome")
    const input_nascimento = document.getElementById("adicionar_nasc")
    const radios_sexo = [...document.getElementsByName("adicionar_sexo")]
    const input_cpf = document.getElementById("adicionar_cpf")
    const input_endereco = document.getElementById("adicionar_end")
    const input_foto = document.getElementById("adicionar_foto")

    
    let validacao = ValidacaoFormulario(input_nome, input_nascimento, radios_sexo, input_cpf, input_endereco, input_foto)

    if(!validacao) {
        alert("Preencha Tudo!")
    } else {
        if(/\W/.test(input_nome.value)) {
            //console.log("Tem caracteres especiais")
            if(/[ãáâçíêóô\s]/i.test(input_nome.value)) {
                let nome_att = input_nome.value.replace(/[ãáâçíêóô\s]/ig, "_")
                //console.log("Nome Atualizado: " + nome_att)
                if(/\W/.test(nome_att)) {
                    //console.log(nome_att.match(/\s/))
                    alert("Nome Inválido!")
                    return
                }
            } else {
                alert("Nome Inválido!")
                return
            }
        }
    
        //console.log("Nome válido")
    
        
        let ano_aluno = input_nascimento.value.match(/\d{4}/)[0]
        //console.log(ano_aluno)
    
        let ano_atual = new Date().getFullYear()
    
        //console.log("Ano resultante: " + (ano_atual - ano_aluno))
        if(ano_atual - ano_aluno < 16 || ano_atual - ano_aluno > 19) {
            alert("Data de nascimento inválida! O aluno tem que ter entre 16 e 19 anos.")
        } else {
            //alert("data ok.")
            if(/[\Wa-z\s]/i.test(input_cpf.value) || input_cpf.value.length < 11) {
                alert("CPF Inválido!")
            } else {
                //alert("CPF OK.")

                //console.log((input_nascimento.value).match(/(\d{4})-(\d{2})-(\d{2})/))
                let nasc = (input_nascimento.value).match(/(\d{4})-(\d{2})-(\d{2})/)
                let nascimento_formatado = `${nasc[3]}/${nasc[2]}/${nasc[1]}`
                //console.log(nascimento_formatado)

                let sexo
                if(radios_sexo[0].checked) {
                    sexo = "Masculino"
                } else {
                    sexo = "Feminino"
                }

                let last_pos = Dados.alunos.length - 1
                let id = Dados.alunos[last_pos].matricula + 1

                let foto_caminho = URL.createObjectURL(input_foto.files[0])

                let aluno = new Aluno(input_nome.value, nascimento_formatado, sexo, input_cpf.value, input_endereco.value, foto_caminho, id)

                let presenca_total = CriarPresenca(aluno.dias_presenca, Dados.aulas)
                aluno.CalcularPresenca(presenca_total, Dados.aulas)

                aluno.CalcularAtividades(0, Dados.atividades)

                aluno.notas[4] = "--"
                aluno.situacao = "--"

                console.log(aluno)

                Dados.alunos.push(aluno)

                metodosjs.default(input_nome.value, `${aluno.presenca[1]}%`, `${aluno.atividades[1]}%`, "--", "--", aluno.matricula)

                metodosjs.CriarTabelaModais(aluno)

                console.log("Banco de Dados - Alunos:")
                console.log(Dados.alunos)

                alert("Aluno Adicionado!")

                Resetar(evento, evento.target.previousElementSibling)
                modal_AdicionarAluno.hide()
            }
        }
    }
})

// Formulários de Impressão - Boletim e Presença
const container_impressao = document.getElementById("container_impressao")

const modal_imprimirBo = new bootstrap.Modal("#imprimir_boletim")
const btnsave_imprimirBo = document.getElementById("btnSave_imprimirBoletim")
const radios_boletim = [...document.getElementsByName("imprimir_bo_tipo")]

btnsave_imprimirBo.addEventListener("click", evento => {
    if(radios_boletim[0].checked) {
        container_impressao.classList.add("boletim_sala")
        container_impressao.classList.remove("presenca_sala")
        container_impressao.classList.remove("bo_pre_aluno")
        container_impressao.classList.remove("imprimir_tab")

        const boletim_tab_tbody = document.querySelector("#boletim_sala>tbody")
        boletim_tab_tbody.innerHTML = ""

        let matrizValores = []
        let arrayClasses = ["td_matricula", "td_aluno", "td_nota", "td_nota", "td_nota", "td_nota", "td_media", "td_situacao"]

        for(let i = 0; i < Dados.alunos.length; i++) {
            (
                function() {
                    let valores = [Dados.alunos[i].matricula, Dados.alunos[i].nome, ...Dados.alunos[i].notas, Dados.alunos[i].situacao]
                    matrizValores.push(valores)
                }
            ) ();
        }

        metodosjs.CriarTabelaGenerica(boletim_tab_tbody, Dados.alunos.length, 8, matrizValores, arrayClasses)

        const tds_nota = [...document.querySelectorAll("#boletim_sala>tbody>tr>td.td_nota")]
        tds_nota.forEach(td => {
            if(td.innerHTML < 7.0) {
                td.classList.add("abaixo")
            }
        })

        const tds_situacao = [...document.querySelectorAll("#boletim_sala>tbody>tr>td.td_situacao")]
        tds_situacao.forEach(td => {
            if(td.innerHTML == "Reprovado") {
                td.classList.add("reprovado")
            } else if(td.innerHTML == "Exame") {
                td.classList.add("exame")
            }
        })

        Resetar(evento, evento.target.previousElementSibling)
        modal_imprimirBo.hide()

        setTimeout(() => {
            alert("Ative o 'gráficos de segundo plano' em 'mais definições' para ter a melhor impressão")
            window.print()
        }, 500)
        
    } else {
        container_impressao.classList.add("bo_pre_aluno")
        container_impressao.classList.remove("boletim_sala")
        container_impressao.classList.remove("presenca_sala")
        container_impressao.classList.remove("imprimir_tab")

        const checkbox = [...document.getElementsByName("imprimir_bo_aluno")]
        const tds_nome = [...document.querySelectorAll("#imprimir_boletim>div>div>div>div>table>tbody>tr>td.td_nome")]

        if(checkbox.some(check => check.checked)) {
            let alunos_escolhidos = []

            checkbox.forEach((box, indice) => {
                if(box.checked) {
                    console.log(box);
                    let a = Dados.alunos.find(aluno => {
                        return aluno.nome == tds_nome[indice].innerHTML
                    })
                    alunos_escolhidos.push(a)
                }
            })
            console.log(alunos_escolhidos)

            impressaojs.CriarDivAluno(alunos_escolhidos, 1)

            Resetar(evento, evento.target.previousElementSibling)
            modal_imprimirBo.hide()

            setTimeout(() => {
                alert("Ative o 'gráficos de segundo plano' em 'mais definições' para ter a melhor impressão")
                window.print()
            }, 500)

        } else {
            alert("Selecione pelo menos um aluno!")
        }
        
    }
})

export {AdicionarNotaTD}