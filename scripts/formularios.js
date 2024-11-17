import Dados from "./banco_dados.js"
import Aluno from "./obj_aluno.js"
import * as metodosjs from "./metodos.js"
import { CriarPresenca } from "./pegar_alunos.js"
import * as impressaojs from "./impressao.js"
import { ExpandirAtv } from "./estilos.js"

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
        //console.log("Tudo Preechido")
        return true
    } else {
        //console.log("Nem tudo esta preenchido")
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

        return [document.querySelector(`${caminhoIB}>form`), ...document.querySelectorAll(`${caminhoIB}>div>table>${caminhoTdCheckBox}`), document.querySelector(`${caminhoIB}>div.container-tabela-modal`)]

    } else if(elementId == "modal_ImprimirPresenca_BtnCancel") {
        let caminhoIP = "#modais>#imprimir_presenca>div>div>div.modal-body"

        return [document.querySelector(`${caminhoIP}>form`), ...document.querySelectorAll(`${caminhoIP}>div>table>${caminhoTdCheckBox}`), document.querySelector(`${caminhoIP}>div.container-tabela-modal`)]

    } else if(elementId == "modal_CriarSessao_BtnCancel") {
        let caminhoCS = "#modais>#criar_sessao>div>div>div.modal-body"

        return [document.querySelector(`${caminhoCS}>fieldset>input`), ...document.querySelectorAll(`${caminhoCS}>div>table>${caminhoTdCheckBox}`)]
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
        } else if(el.tagName == "DIV") {
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
            //console.log("Data Iválida! Muito pequena!")
            alert("Data Iválida!")
        } else {

            let last_pos = Dados.dias_aulas.length - 1
    
            //console.log(`Conta: ${dia.getMonth()} - ${Dados.dias_aulas[last_pos][1].getMonth() + 1} = ${(dia.getMonth() - (Dados.dias_aulas[last_pos][1].getMonth() + 1))}`)
    
            if((dia.getMonth() - (Dados.dias_aulas[last_pos][1].getMonth() + 1)) >= 1 || (dia.getFullYear() - Dados.dias_aulas[last_pos][1].getFullYear()) != 0) {
                //console.log("Data inválida! Muito grande")
                alert("Data Iválida!")
            } else {

                if(dia.getDay() == 0 || dia.getDay() == 6) {
                    //console.log("Data Inválida! Final de semana!")
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

                    //console.log("Banco de Dados - Alunos:")
                    //console.log(Dados.alunos)
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
            //console.log("Data Iválida! Muito pequena!")
            alert("Data Iválida!")
        } else {

            let last_pos = Dados.dias_aulas.length - 1
    
            //console.log(`Conta: ${dia.getMonth()} - ${Dados.dias_aulas[last_pos][1].getMonth() + 1} = ${(dia.getMonth() - (Dados.dias_aulas[last_pos][1].getMonth() + 1))}`)
    
            if((dia.getMonth() - (Dados.dias_aulas[last_pos][1].getMonth() + 1)) >= 1 || (dia.getFullYear() - Dados.dias_aulas[last_pos][1].getFullYear()) != 0) {
                //console.log("Data inválida! Muito grande")
                alert("Data Iválida!")
            } else {

                if(dia.getDay() == 0 || dia.getDay() == 6) {
                    //console.log("Data Inválida! Final de semana!")
                    alert("Data Iválida!")
                } else {

                    const td_alunos = [...document.querySelectorAll("#lancar_presenca>div>div>div>div>table>tbody>tr>td.td_nome")]
                    const tds_presenca = [...document.querySelectorAll("#classe>.container-tabela>table>tbody>tr>td.presenca")]
                    //console.log(tds_presenca)

                    let dia_formatado = `${dia_input[3]}/${dia_input[2]}/${dia_input[1]}`
                    //console.log(dia_formatado)

                    let pos
                    let pos_radios = 0


                    if(Dados.dias_aulas.some((el, indice) => {
                        if(el[0] == dia_formatado) {
                            //console.log("Esta data já existe!")
                            pos = indice
                        } 
                        return el[0] == dia_formatado
                    })) {
                        //console.log("Editando Data")
                        td_alunos.forEach((aluno, indice) => {
                            Dados.alunos.forEach(objAluno => {
                                if(objAluno.nome == aluno.innerHTML) {
                                    if(radios[pos_radios].checked) {
                                        //console.log(`O aluno ${objAluno.nome} VEIO este dia`)
                                        if(objAluno.dias_presenca[pos] == "F") {
                                            //console.log("Presença: " + objAluno.presenca[0])
                                            objAluno.presenca[0] += 1
                                            //console.log("Nova Presença: " + objAluno.presenca[0])
                                            objAluno.dias_presenca[pos] = "V"
                                        }
                                    } else {
                                        //console.log(`O aluno ${objAluno.nome} FALTOU este dia`)
                                        if(objAluno.dias_presenca[pos] == "V") {
                                            //console.log("Presença: " + objAluno.presenca[0])
                                            objAluno.presenca[0] -= 1
                                            //console.log("Nova Presença: " + objAluno.presenca[0])
                                            objAluno.dias_presenca[pos] = "F"
                                        }
                                    }
                                    //console.log("Presença (%): " + objAluno.presenca[1])
                                    objAluno.CalcularPresenca(objAluno.presenca[0], Dados.aulas)
                                    //console.log("Nova Presença (%): " + objAluno.presenca[1])

                                    tds_presenca[indice].innerHTML = `${objAluno.presenca[1]}%`

                                    pos_radios += 2
                                }
                            })
                        })

                    } else {
                        //console.log("Criando Data")
                        Dados.dias_aulas.push([dia_formatado, dia])
                        Dados.aulas += 1
                        //console.log("Total de Aulas: " + Dados.aulas)

                        //console.log("Banco de Dados - Aulas: ")
                        //console.log(Dados.dias_aulas)

                        td_alunos.forEach((aluno, indice) => {
                            Dados.alunos.forEach(objAluno => {
                                if(objAluno.nome == aluno.innerHTML) {
                                    if(radios[pos_radios].checked) {
                                        //console.log(`O aluno ${objAluno.nome} VEIO este dia`)
                                        objAluno.dias_presenca.push("V")
                                        //console.log("Presença: " + objAluno.presenca[0])
                                        objAluno.presenca[0] += 1
                                        //console.log("Nova Presença: " + objAluno.presenca[0])
                                    } else {
                                        //console.log(`O aluno ${objAluno.nome} FALTOU este dia`)
                                        objAluno.dias_presenca.push("F")
                                        //console.log("Presença: " + objAluno.presenca[0])
                                    }
                                    //console.log("Presença (%): " + objAluno.presenca[1])
                                    objAluno.CalcularPresenca(objAluno.presenca[0], Dados.aulas)
                                    //console.log("Nova Presença (%): " + objAluno.presenca[1])

                                    tds_presenca[indice].innerHTML = `${objAluno.presenca[1]}%`

                                    pos_radios += 2
                                }
                            })
                        })
                    }

                    //console.log("Banco de Dados - Alunos: ")
                    //console.log(Dados.alunos)

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
        if(/\d/.test(input_nome.value)) {
            alert("Nome Inválido!")
            return
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

                //console.log(aluno)

                Dados.alunos.push(aluno)

                metodosjs.default(input_nome.value, `${aluno.presenca[1]}%`, `${aluno.atividades[1]}%`, "--", "--", aluno.matricula)

                metodosjs.CriarTabelaModais(aluno)

                //console.log("Banco de Dados - Alunos:")
                //console.log(Dados.alunos)

                alert("Aluno Adicionado!")

                Resetar(evento, evento.target.previousElementSibling)
                modal_AdicionarAluno.hide()
            }
        }
    }
})

// Formulário Imprimir Boletim
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
                    //console.log(box);
                    let a = Dados.alunos.find(aluno => {
                        return aluno.nome == tds_nome[indice].innerHTML
                    })
                    alunos_escolhidos.push(a)
                }
            })
            //console.log(alunos_escolhidos)

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

// Formulário Imprimir Presença
const modal_imprimirPre = new bootstrap.Modal("#imprimir_presenca")
const btnsave_imprimirPre = document.getElementById("btnSave_imprimirPresenca")
const radios_presenca = [...document.getElementsByName("imprimir_pre_tipo")]
const input_dataInicial = document.getElementById("imprimir_pre_data_inicial")
const input_dataFinal = document.getElementById("imprimir_pre_data_final")

btnsave_imprimirPre.addEventListener("click", evento => {

    let validacao = ValidacaoFormulario(input_dataInicial, input_dataFinal)

    if(!validacao) {
        alert("Selecione as datas!")
    } else {
        let dataInicial_input = (input_dataInicial.value).match(/(\d{4})-(\d{2})-(\d{2})/)
        let dataFinal_input = (input_dataFinal.value).match(/(\d{4})-(\d{2})-(\d{2})/)

        let dataInicial = `${dataInicial_input[3]}/${dataInicial_input[2]}/${dataInicial_input[1]}`
        let dataFinal = `${dataFinal_input[3]}/${dataFinal_input[2]}/${dataFinal_input[1]}`

        let dataInicialIndex = Dados.dias_aulas.findIndex(dia => dia[0] == dataInicial)
        let dataFinalIndex = Dados.dias_aulas.findIndex(dia => dia[0] == dataFinal)

        if(dataInicialIndex != -1 && dataFinalIndex != -1) {
            
            if(Dados.dias_aulas[dataFinalIndex][1] < Dados.dias_aulas[dataInicialIndex][1]) {
                alert("A data final não pode ser menor que a inicial!")
            } else {
                //console.log("Quantidade de Dias: " + (dataFinalIndex - dataInicialIndex + 1))
                let qtdDias = (dataFinalIndex - dataInicialIndex) + 1
                if(qtdDias > 30) {
                    alert("O máximo de dias é 30!")
                } else {
                    if(qtdDias < 5) {
                        alert("O mínimo de dias é 5")
                    } else {
                        if(radios_presenca[0].checked) {
                            container_impressao.classList.add("presenca_sala")
                            container_impressao.classList.remove("boletim_sala")
                            container_impressao.classList.remove("bo_pre_aluno")
                            container_impressao.classList.remove("imprimir_tab")

                            //console.log("Data Inicial: " + dataInicial)
                            //console.log("Data Final: " + dataFinal)
    
                            impressaojs.CriarTabelaPresenca(qtdDias, dataInicialIndex)
    
                            Resetar(evento, evento.target.previousElementSibling)
                            modal_imprimirPre.hide()
    
                            setTimeout(() => {
                                alert("Ative o 'gráficos de segundo plano' em 'mais definições' para ter a melhor impressão")
                                window.print()
                            }, 500)
                        } else {
                            const checkboxs = [...document.getElementsByName("imprimir_pre_aluno")]
                            const td_alunos = [...document.querySelectorAll("#imprimir_presenca>div>div>div>div>table>tbody>tr>td.td_nome")]

                            if(checkboxs.some(check => check.checked)) {
                                container_impressao.classList.add("bo_pre_aluno")
                                container_impressao.classList.remove("presenca_sala")
                                container_impressao.classList.remove("boletim_sala")
                                container_impressao.classList.remove("imprimir_tab")

                                let alunos_escolhidos = []

                                checkboxs.forEach((box, indice) => {
                                    if(box.checked) {
                                        //console.log(box);
                                        let a = Dados.alunos.find(aluno => {
                                            return aluno.nome == td_alunos[indice].innerHTML
                                        })
                                        alunos_escolhidos.push(a)
                                    }
                                })
                                
                                impressaojs.CriarDivAluno(alunos_escolhidos, 2, qtdDias, dataInicialIndex)
                                
                                Resetar(evento, evento.target.previousElementSibling)
                                modal_imprimirPre.hide()
        
                                setTimeout(() => {
                                    alert("Ative o 'gráficos de segundo plano' em 'mais definições' para ter a melhor impressão")
                                    window.print()
                                }, 500)

                            } else {
                                alert("Selecione pelo menos um aluno!")
                            }
                        }
                    }
                }
            }

        } else {
            alert("Datas Inválidas!")
        }
        
    }
})

// Botão Imprimir Tabela
const btnImprimirTabela = document.getElementById("btn_imprimirTabela")
const tabelaMain = document.querySelector("#imprimir_tab>tbody")

btnImprimirTabela.addEventListener("click", () => {
    tabelaMain.innerHTML = ""

    container_impressao.classList.add("imprimir_tab")
    container_impressao.classList.remove("presenca_sala")
    container_impressao.classList.remove("boletim_sala")
    container_impressao.classList.remove("bo_pre_aluno")

    let arrayClasses = ["nome"]
    let matrizValores = []
    for(let i = 0; i < Dados.alunos.length; i++) {
        let valores = [Dados.alunos[i].matricula, Dados.alunos[i].nome, `${Dados.alunos[i].atividades[1]}%`, Dados.alunos[i].MostrarMedia(), Dados.alunos[i].situacao]
        matrizValores.push(valores)
    }

    metodosjs.CriarTabelaGenerica(tabelaMain, Dados.alunos.length, 5, matrizValores, arrayClasses)

    setTimeout(() => {
        window.print()
    }, 100)
})

// Formulario Criar e Editar Atividade
const modal_criarAtv = new bootstrap.Modal("#criar_atividade")
const nomeAtv_input = document.getElementById("atividade_nome")
const desc_input = document.getElementById("atividade_descricao")
const btnSave_criarAtv = document.getElementById("btnSave_criarAtv")

const modal_criarSesao_tab = document.querySelector("#criar_sessao>div>div>div>div>table>tbody")

function CriarAtividade() {
    const sessoes = [...document.querySelectorAll("#atividades>.container-sessoes>section>.container-atividades")]
    let last_pos = sessoes.length - 1
    //console.log(sessoes)

    let classesAdd = []
    const atividades = [...document.querySelectorAll(".atividade")]
    //console.log(atividades)
    atividades[0].classList.forEach(classe => classesAdd.push(classe))

    // Criação da atividade
    const atividade = document.createElement("div")
    atividade.classList.add(...classesAdd)
    sessoes[last_pos].appendChild(atividade)

    const div = document.createElement("div")
    atividade.appendChild(div)

    const span = document.createElement("span")
    span.classList.add("material-symbols-outlined")
    span.setAttribute("data-bs-toggle", "modal")
    span.setAttribute("data-bs-target", "#criar_atividade")
    span.setAttribute("data-bs-whatever", "span")
    span.innerHTML = "edit"
    div.appendChild(span)

    const div_filho = document.createElement("div")
    div.appendChild(div_filho)

    const span2 = document.createElement("span")
    span2.classList.add("material-symbols-outlined")
    span2.innerHTML = "article"
    div_filho.appendChild(span2)

    const h3 = document.createElement("h3")
    h3.innerHTML = nomeAtv_input.value 
    div_filho.appendChild(h3)

    const hr = document.createElement("hr")
    atividade.appendChild(hr)

    const p = document.createElement("p")
    p.innerHTML = desc_input.value
    atividade.appendChild(p)
    
    const btn = document.createElement("p")
    btn.classList.add("botao")
    btn.innerHTML = "Ver Atividade"
    atividade.appendChild(btn)

    // Adicionar na tabela do Modal Criar Sessão
    metodosjs.CriarTabelaGenerica(modal_criarSesao_tab, 1, 2, [["input_checkbox", nomeAtv_input.value]], ["check-box", "nome_atv"], "selecionar_atividade")

    // Adicionar Evento de click
    atividade.addEventListener("click", ExpandirAtv);
    [span, p, btn].forEach(icone => icone.addEventListener("click", evt => evt.stopPropagation()));
}

function EditarAtividade(target) {
    let pai = metodosjs.AcharPai(target, "DIV", /atividade/)
    //console.log(pai)
    //console.log(pai.children)

    let h3 = metodosjs.AcharFilho(pai, "H3")
    //console.log("Fim: ")
    //console.log(h3)

    let p = metodosjs.AcharFilho(pai, "P", /^$/)
    //console.log("Fim: ")
    //console.log(p)

    h3.innerHTML = nomeAtv_input.value
    p.innerHTML = desc_input.value
}

btnSave_criarAtv.addEventListener("click", evento => {
    let validacao = ValidacaoFormulario(nomeAtv_input, desc_input)
    let titulo = document.querySelector("#criar_atividade>div>div>div.modal-header>h2")

    if(!validacao) {
        alert("Preecha pelo menos o NOME e DESCRIÇÃO")
    } else {

        let jaExiste = false
        let atividades_nome = [...document.querySelectorAll(".atividade>div>div>h3")]
        atividades_nome.forEach(h3 => {
            if(h3.innerHTML == nomeAtv_input.value) {
                jaExiste = true
            }
        })

        if(jaExiste) {
            alert("Este nome de atividade JÁ existe!")
        } else {

            if(titulo.innerHTML == "Criar Atividade") {
                //console.log("CRIANDO ATIVIDADE...")
                CriarAtividade()
            } else if(titulo.innerHTML == "Editar Atividade") {
                //console.log("EDITANDO ATIVIDADE...")
                //console.log(window.spanAtivador)
                EditarAtividade(window.spanAtivador)
            }
            // Fechar Modal
            Resetar(evento, evento.target.previousElementSibling)
            modal_criarAtv.hide()
        }

    }
})

// Formulario Criar e Editar Sessão 
const modal_criarSection = new bootstrap.Modal("#criar_sessao")
const criarSec_inputNome = document.getElementById("sessao_nome")
const btnSave_CriarSec = document.getElementById("btnSave_criarSec")
const container_sessoes = document.querySelector("#atividades>.container-sessoes")

function CriarSessao() {
    // Vendo qual estilo esta selecionado
    let classeAdd = []
    let otherContainers = [...document.querySelectorAll("#atividades>.container-sessoes>section>.container-atividades")]
    //console.log(otherContainers)
    otherContainers[0].classList.forEach(classe => classeAdd.push(classe))
    

    // Criação da Sessão
    const sessao = document.createElement("section")
    sessao.classList.add("container-md")
    container_sessoes.appendChild(sessao)

    const divTopo = document.createElement("div")
    divTopo.classList.add("topo", "mb-2")
    sessao.appendChild(divTopo)

    const h2 = document.createElement("h2")
    h2.innerHTML = criarSec_inputNome.value
    divTopo.appendChild(h2)

    const div_filho = document.createElement("div")
    div_filho.classList.add("container-span")
    divTopo.appendChild(div_filho)

    const span = document.createElement("span")
    span.classList.add("material-symbols-outlined")
    span.setAttribute("data-bs-whatever", "span")
    span.setAttribute("data-bs-toggle", "modal")
    span.setAttribute("data-bs-target", "#criar_sessao")
    span.innerHTML = "edit"
    div_filho.appendChild(span)

    const hr = document.createElement("hr")
    divTopo.appendChild(hr)

    const divAtividades = document.createElement("div")
    divAtividades.classList.add(...classeAdd)
    sessao.appendChild(divAtividades)

    // Colocando as Atividades na Sessão
    const checkboxs = [...document.getElementsByName("selecionar_atividade")]
    const tds_nomeAtv = [...document.querySelectorAll("#criar_sessao>div>div>div>div>table>tbody>tr>td.nome_atv")]

    //console.log(checkboxs)
    //console.log(tds_nomeAtv)

    if(checkboxs.some(box => box.checked)) {
        let atividades = [...document.querySelectorAll(".atividade")]
        let atividades_h3 = [...document.querySelectorAll(".atividade>div>div>h3")]
        let checkeds_index = []
        //console.log(atividades)
        //console.log(atividades_h3)

        checkboxs.filter((check, indice) => {
            if(check.checked) {
                checkeds_index.push(indice)
            }
        })
        //console.log(checkeds_index)

        for(let i = 0; i < checkeds_index.length; i++) {
            atividades_h3.forEach((h3, indice) => {
                //console.log(h3.innerHTML)
                //console.log(tds_nomeAtv[checkeds_index[i]].innerHTML)
                if(h3.innerHTML == tds_nomeAtv[checkeds_index[i]].innerHTML) {
                    let pai = metodosjs.AcharPai(h3, "DIV", /container\-atividades/)
                    //console.log("Pai: ")
                    //console.log(pai)
                    //console.log("Filho Remover: ")
                    //console.log(atividades[indice])
                    
                    pai.removeChild(atividades[indice])
                    divAtividades.appendChild(atividades[indice])
                }
            })
        }
    }
}

function EditarSessao(target) {
    let pai = metodosjs.AcharPai(target, "SECTION", /container\-md/)
    //console.log(pai)
    //console.log(pai.children)

    let h2 = metodosjs.AcharFilho(pai, "H2")
    //console.log("Fim: ")
    //console.log(h2)

    h2.innerHTML = criarSec_inputNome.value
}

btnSave_CriarSec.addEventListener("click", evento => {
    let validacao = ValidacaoFormulario(criarSec_inputNome)
    let titulo = document.querySelector("#criar_sessao>div>div>div.modal-header>h2")
    //console.log(titulo)

    if(!validacao) {
        alert("Preencha o nome da sessão!")
    } else {
        // Checando se já existe uma sessão com o nome digitado
        let jaExiste = false
        let sessoes_nome = [...document.querySelectorAll(".container-sessoes>section>div>h2")]
        sessoes_nome.forEach(sessao => {
            if(sessao.innerHTML == criarSec_inputNome.value) {
                jaExiste = true
            }
        })

        if(jaExiste) {
            alert("JÁ existe uma sessão com este nome!")
        } else {
            
            if(titulo.innerHTML == "Criar Sessão") {
                //console.log("CRIANDO ATIVIDADE...")
                CriarSessao()
            } else if(titulo.innerHTML == "Editar Sessão") {
                //console.log("EDITANDO ATIVIDADE...")
                //console.log(window.spanAtivador)
                EditarSessao(window.spanAtivador)
            }

            Resetar(evento, evento.target.previousElementSibling)
            modal_criarSection.hide()
        }
    
    }
})


export {AdicionarNotaTD}