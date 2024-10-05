import Aluno from "./obj_aluno.js"
import Dados from "./banco_dados.js"
import CriarTabelaAluno from "./metodos.js"
import { GerarNumeroAleatorioInclusivo, GerarNumeroFloatAleatorioInclusivo } from "./metodos.js"

async function PegarAlunos() {
    const resposta = await fetch("https://reqres.in/api/users?page=2")
    //console.log(resposta)

    const alunos = await resposta.json()
    //console.log(alunos)

    //console.log(alunos.data)

    AdicionarAlunos(alunos.data)
}

function AdicionarAlunos(arrayAlunos) {
    arrayAlunos.forEach(aluno => {
        let name = `${aluno.first_name} ${aluno.last_name}`
        let objAluno = new Aluno(name, GerarDataNascAleatorio(), DefinirSexo(aluno.id), CriarCPF(), DefinirEndereco(aluno.id), aluno.avatar, aluno.id)

        DefinirNotas(objAluno.notas)
        objAluno.CalcularMedia()
        objAluno.CalcularSituacao()
        objAluno.CalcularAtividades(GerarNumeroAleatorioInclusivo(0, Dados.atividades), Dados.atividades)
        objAluno.CalcularPresenca(GerarNumeroAleatorioInclusivo(0, Dados.aulas), Dados.aulas)

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

        CriarTabelaAluno(objAluno.nome, `${objAluno.presenca[1]}%`, `${objAluno.atividades[1]}%`, objAluno.MostrarMedia(), objAluno.situacao, objAluno.matricula)
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


PegarAlunos()