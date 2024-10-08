export default class Aluno {
    constructor(pnome, pnasc, psexo, pcpf, pend, pfoto, pid) {
        this.nome = pnome
        this.nascimento = pnasc
        this.sexo = psexo
        this.cpf = pcpf
        this.endereco = pend
        this.foto = pfoto
        this.matricula = pid

        this.notas = []
        this.situacao = "--"
        this.presenca = []
        this.dias_presenca = []
        this.atividades = []
    }

    AdicionarNota = function(bimestre, nota) {
        bimestre = Number.parseInt(bimestre) - 1
        this.notas[bimestre] = nota
        this.CalcularMedia()
    }

    CalcularMedia = function() {
        if(this.notas.length >= 4) {
            //console.log("Lenght certo")
            let media = 0
            for(let i = 0; i < 4; i++) {
                media += Number.parseFloat(this.notas[i])
            }
            media /= 4.0
            
            this.notas[4] = media.toFixed(1)
            this.CalcularSituacao()
        } else {
            this.notas[4] = "--"
        }
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

    CalcularAtividades = function(atividades, total) {
        let porcentagem = Math.round(atividades / total * 100)
        this.atividades = [atividades, porcentagem]
    }

    CalcularPresenca = function(presenca, total) {
        let porcentagem = Math.round(presenca / total * 100)
        this.presenca = [presenca, porcentagem]
    }

    AdicionarPresenca = function(presenca) {
        this.dias_presenca.push(presenca)
    }
}