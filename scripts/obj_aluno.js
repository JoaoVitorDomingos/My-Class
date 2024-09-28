export default class Aluno {
    constructor(pnome, pnasc, psexo, pcpf, pend, pfoto, pid) {
        this.nome = pnome
        this.nascimento = pnasc
        this.sexo = psexo
        this.cpf = pcpf
        this.endereco = pend
        this.foto = pfoto
        this.matriculo = pid

        this.notas = []
        this.situacao = ""
        this.presenca = []
        this.atividades = []
    }

    AdicionarNota = function(bimestre, nota) {
        this.notas[bimestre] = nota
    }

    Notas = function() {
        return this.notas
    }

    CalcularMedia = function() {
        let media = 0
        for(let i = 0; i < 4; i++) {
            media += this.notas[i]
        }
        media /= 4.0
        
        this.notas[4] = media
    }

    MostrarMedia = function() {
        return this.notas[4]
    }

    CalcularSituacao = function() {
        if(this.notas[4] >= 7.0) {
            this.situacao = "Aprovado"
        } else if(this.notas[4] >= 4.0) {
            this.situacao = "Exame"
        } else {
            this.situacao = "Reprovado"
        }
    }

    MostrarSituacao = function() {
        return this.situacao
    }

    CalcularAtividades = function(atividades, total) {
        let porcentagem = atividades / total * 100
        this.atividades = [atividades, porcentagem]
    }

    MostrarAtividades = function() {
        return this.atividades
    }

    CalcularPresenca = function(presenca, total) {
        let porcentagem = presenca / total * 100
        this.presenca = [presenca, porcentagem]
    }

    MostrarPresenca = function() {
        return this.presenca
    }
}