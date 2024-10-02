const Dados = {
    alunos: [],

    AdicionarAluno(aluno) {
        this.alunos.push(aluno)
    },

    aulas: 155,

    AdicionarAula() {
        this.aulas++
    },

    atividades: 6,

    AdicionarAtividade() {
        this.atividades++
    }
}

export default Dados