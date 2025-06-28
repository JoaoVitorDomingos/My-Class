import Aluno from "./obj_aluno.js"
import Dados from "./banco_dados.js"
import CriarTabelaAluno from "./metodos.js"
import { GerarNumeroAleatorioInclusivo, GerarNumeroFloatAleatorioInclusivo , CriarTabelaGenerica, CriarTabelaModais} from "./metodos.js"

async function PegarAlunos() {

    let alunos

    try {
        const resposta = await fetch("https://reqres.in/api/users?page=2", 
            {
                method: 'GET',
                headers: {
                    "x-api-key": "reqres-free-v1"
                }
            }
        )
        //console.log(resposta)

        alunos = await resposta.json()
        //console.log(alunos)

        //console.log(alunos.data)

    } catch(erro) {
        console.log("Erro: ")
        console.log(erro)

        alunos = criarAlunos()
    }

    AdicionarAlunos(alunos.data)
    CriarAulas(Dados.dias_aulas, Dados.aulas)
    window.bancoDados = {
        get alunos() {
            return Dados.alunos
        },

        get aulas() {
            console.log("Total de Aulas: ")
            return Dados.aulas
        },

        get diasAulas() {
            return Dados.dias_aulas
        },

        get atividades() {
            console.log("Total de Atividades: ")
            return Dados.atividades
        }
    }
}

function AdicionarAlunos(arrayAlunos) {
    arrayAlunos.forEach(aluno => {
        let name = `${aluno.first_name} ${aluno.last_name}`
        let objAluno = new Aluno(name, GerarDataNascAleatorio(), DefinirSexo(aluno.id), CriarCPF(), DefinirEndereco(aluno.id), aluno.avatar, aluno.id)

        DefinirNotas(objAluno.notas)
        objAluno.CalcularMedia()
        objAluno.CalcularAtividades(GerarNumeroAleatorioInclusivo(0, Dados.atividades), Dados.atividades)
        let presenca_total = CriarPresenca(objAluno.dias_presenca, Dados.aulas)
        objAluno.CalcularPresenca(presenca_total, Dados.aulas)

        // console.log("Notas: " + objAluno.notas)
        // console.log("Média: " + objAluno.MostrarMedia())
        // console.log("Situação: " + objAluno.situacao)
        // console.log("Atividades Feitas: " + objAluno.atividades[0])
        // console.log("Atividades Feitas (%): " + objAluno.atividades[1])
        // console.log("Presença: " + objAluno.presenca[0])
        // console.log("Presença (%): " + objAluno.presenca[1])
        // console.log("--------------------------------------")

        //console.log("Aluno:")
        //console.log(objAluno)

        Dados.AdicionarAluno(objAluno)

        CriarTabelaAluno(objAluno.nome, `${objAluno.presenca[1]}%`, `${objAluno.atividades[1]}%`, objAluno.MostrarMedia(), objAluno.situacao, objAluno.matricula);

        CriarTabelaModais(objAluno)
    })

    console.log("Banco de Dados - Alunos:")
    console.log(Dados.alunos)
}

function GerarDataNascAleatorio() {
    let anoAtual = new Date().getFullYear()
    //console.log(anoAtual)
    let anoMin = anoAtual - 19
    let anoMax = anoAtual - 16
    let ano = GerarNumeroAleatorioInclusivo(anoMin, anoMax)
    //console.log("Ano:" + ano)


    let mes = String(GerarNumeroAleatorioInclusivo(1, 12)).padStart(2, "0")
    //console.log("Mes:" + mes)

    let dia
    if(mes == 4 || mes == 6 || mes == 9 || mes == 11) {
        dia = GerarNumeroAleatorioInclusivo(1, 30)
    } else if(mes == 2) {
        if(ano == 2008) {
            dia = GerarNumeroAleatorioInclusivo(1, 29)
        } else {
            dia = GerarNumeroAleatorioInclusivo(1, 28)
        }
    } else {
        dia = GerarNumeroAleatorioInclusivo(1, 31)
    }
    dia = String(dia).padStart(2, "0")
    //console.log("Dia:" + dia)

    //console.log(`Data de Nascimento: ${dia}/${mes}/${ano}`)

    return `${dia}/${mes}/${ano}`
}

function DefinirSexo(id) {
    if(id == 12 || id == 7) {
        return "Feminino"
    } else {
        return "Masculino"
    }
}

function CriarCPF() { 
    let cpf = ""
    for(let i = 0; i < 14; i++) {
        if(i == 3 || i == 7) {
            cpf += "."
        } else if(i == 11) {
            cpf += "-"
        } else {
            cpf += String(GerarNumeroAleatorioInclusivo(0, 9))
        }
    }
    //console.log("CPF: " + cpf)

    return cpf
}

function DefinirEndereco(id) {
    if(id == 7) {
        return "Rua do Gato"
    } else if(id == 8) {
        return "Rua do Canario"
    } else if(id == 9) {
        return "Rua do Labrador"
    } else if(id == 10) {
        return "Rua Beija-Flor"
    } else if(id == 11) {
        return "Rua do Assado"
    } else {
        return "Rua do MasterX"
    }
}

function DefinirNotas(arrayNotas) {
    for(let i = 0; i < 4; i++)
        arrayNotas.push(GerarNumeroFloatAleatorioInclusivo(0, 10, 1))
}

function CriarPresenca(array_presenca, qtd_dias) {
    let presenca_total = 0
    for(let i = 0; i < qtd_dias; i++) {
        let presenca = GerarNumeroAleatorioInclusivo(0, 1)
        if(presenca == 0) {
            array_presenca.push("F")
        } else {
            array_presenca.push("V")
            presenca_total++
        }
    }
    //console.log(array_presenca)
    //console.log("Presença Total: " + presenca_total)
    return presenca_total
}

function CriarAulas(array_aulas, qtd_dias) {
    function ChecarDia(dia) {
        let dataRetorno
        if(dia.getDay() == 0) {
            //console.log("Domingo")
            dataRetorno = new Date(dia.getFullYear(), dia.getMonth(), (dia.getDate() - 2))
            //console.log("Novo: " + data_atual)
        } else if(dia.getDay() == 6) {
            //console.log("Sabado")
            dataRetorno = new Date(dia.getFullYear(), dia.getMonth(), (dia.getDate() - 1))
            //console.log("Novo: " + data_atual)
        } else {
            dataRetorno = dia
        }
        return dataRetorno
    }

    function FormatarData(objData) {
        let data = `${String(objData.getDate()).padStart(2, "0")}/${String(objData.getMonth() + 1).padStart(2, "0")}/${objData.getFullYear()}`
        //console.log("Formatação: " + data)
        return data
    }

    let data_atual = new Date()
    //console.log("Data Atual: " + data_atual)

    data_atual = ChecarDia(data_atual)
    //console.log("Atualizado: " + data_atual)

    array_aulas.push([FormatarData(data_atual), data_atual])
    for(let i = 1; i < qtd_dias; i++) {
        data_atual = new Date(data_atual.getFullYear(), data_atual.getMonth(), (data_atual.getDate() - 1))
        //console.log("Atualizado: " + data_atual)
        data_atual = ChecarDia(data_atual)
        array_aulas.push([FormatarData(data_atual), data_atual])
    }
    array_aulas.reverse()
    //console.log("Banco de Dados - Aulas: ")
    //console.log(array_aulas)
}

function criarAlunos() {
    let nomes = ["Michele Jatson", "Guilherme Henrique", "João Vitor", "Kauan Gomes", "Igor Bare", "Caroline Hantson"]

    let caminhoF = "imgs/foto-alunos/Feminino/"
    let caminhoM = "imgs/foto-alunos/Masculino/"
    let basePath = window.location.pathname
    basePath.includes("My-Class") ? basePath = "/My-Class/" : basePath = ""

    let avatares = [`${basePath + caminhoF}foto-aluno2.jpg`, 
                    `${basePath + caminhoM}foto-aluno5.jpg`,  
                    `${basePath + caminhoM}foto-aluno1.jpg`,  
                    `${basePath + caminhoM}foto-aluno8.jpg`,  
                    `${basePath + caminhoM}foto-aluno3.jpg`,  
                    `${basePath + caminhoF}foto-aluno6.jpg`, ]

    let arrayAlunos = {data:[]}

    for(let i = 0; i < 6; i++) {
        let nomeSeparado = nomes[i].split(" ")
        //console.log(`Nome Separada: ${nomeSeparado}`)
        //console.log(`Avatar: ${avatares[i]}`)

        arrayAlunos.data[i] = 
        {
            "id": (7+i),
            "first_name": nomeSeparado[0],
            "last_name": nomeSeparado[1],
            "avatar": avatares[i]
        }
    }

    return arrayAlunos
}

PegarAlunos()

export {CriarPresenca}