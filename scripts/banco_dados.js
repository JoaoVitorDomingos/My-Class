export default Dados = {
    alunos: [],
    qtd_alunos: this.alunos.length,
    AdicionarAluno(aluno) {
        this.alunos.push(aluno)
    },
    aulas: [],
    total_aulas: this.aulas.length,
    AdicionarAula(aula) {
        this.aulas.push(aula)
    }
}