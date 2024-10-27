import Dados from "./banco_dados.js"
import { CriarTabelaGenerica } from "./metodos.js"

function CriarDivAluno(arrayAlunosObj, tipo, diasPresenca=0, objDateInicial, posDateInicial) {
    const tituloMain = document.querySelector("main>#classe>div>h2")
    const pai = document.getElementById("container_bo_pre_aluno")
    pai.innerHTML = ""

    for(let i = 0; i < arrayAlunosObj.length; i++) {
        // Container
        const container = document.createElement("div")
        container.classList.add("mx-auto", "bo_pre_aluno")
        pai.appendChild(container)

        // Titulo
        const h1 = document.createElement("h1")
        h1.innerHTML = tituloMain.innerHTML
        container.appendChild(h1)

        // Div Informações Pessoais
        const div_infoPessoais = document.createElement("div")
        div_infoPessoais.classList.add("info_pessoais", "row")
        container.appendChild(div_infoPessoais)

        // Div Foto
        const div_foto = document.createElement("div")
        div_foto.classList.add("bo_pre_foto", "col-md-4")
        div_foto.style.backgroundImage = `url(${arrayAlunosObj[i].foto})`
        div_infoPessoais.appendChild(div_foto)

        // Div Dados
        const div_dados = document.createElement("div")
        div_dados.classList.add("bo_pre_dados", "col-md-8", "row")
        div_infoPessoais.appendChild(div_dados)

        // Dados
        const nome = document.createElement("p")
        nome.classList.add("dado_nome", "col-md-12")
        nome.innerHTML = arrayAlunosObj[i].nome
        div_dados.appendChild(nome)

        const nasc = document.createElement("p")
        nasc.classList.add("dado_nasc", "col-md-7")
        nasc.innerHTML = `<span>Data de Nascimento:</span> ${arrayAlunosObj[i].nascimento}`
        div_dados.appendChild(nasc)

        const cpf = document.createElement("p")
        cpf.classList.add("dado_cpf", "col-md-5")
        cpf.innerHTML = `<span>CPF:</span> ${arrayAlunosObj[i].cpf}`
        div_dados.appendChild(cpf)

        const end = document.createElement("p")
        end.classList.add("dado_end", "col-md-12")
        end.innerHTML = `<span>Endereço</span>: ${arrayAlunosObj[i].endereco}`
        div_dados.appendChild(end)

        const id = document.createElement("p")
        id.classList.add("dado_id", "col-md-12")
        id.innerHTML = `<span>Matricula:</span> ${arrayAlunosObj[i].matricula}`
        div_dados.appendChild(id)

        // Div Informações Escolares
        const div_infoEscolares = document.createElement("div")
        div_infoEscolares.classList.add("info_escolar")
        container.appendChild(div_infoEscolares)

        // Tabela 1
        const table1 = document.createElement("table")
        table1.classList.add("tab1", "tabela_impressao", "table", "table-striped", "table-bordered", "border-dark", "mx-auto", "my-3")
        div_infoEscolares.appendChild(table1)

        const thead1 = document.createElement("thead")
        table1.appendChild(thead1)

        const thead1_tr = document.createElement("tr")
        thead1.appendChild(thead1_tr)

        const thead1_th1 = document.createElement("th")
        const thead1_th2 = document.createElement("th")
        const thead1_th3 = document.createElement("th");
        [thead1_th1, thead1_th2 , thead1_th3].forEach(th => thead1_tr.appendChild(th))

        const tbody1 = document.createElement("tbody")
        table1.appendChild(tbody1)

        const tbody1_tr = document.createElement("tr")
        tbody1.appendChild(tbody1_tr)

        const tbody1_td1 = document.createElement("td")
        const tbody1_td2 = document.createElement("td")
        const tbody1_td3 = document.createElement("td");
        [tbody1_td1, tbody1_td2 , tbody1_td3].forEach(td => tbody1_tr.appendChild(td))

        // Tabela 2
        const table2 = document.createElement("table")
        table2.classList.add("tab2", "tabela_impressao", "table", "table-striped", "table-bordered", "border-dark", "mx-auto", "my-3")
        div_infoEscolares.appendChild(table2)

        const thead2 = document.createElement("thead")
        table2.appendChild(thead2)

        const thead2_tr = document.createElement("tr")
        thead2.appendChild(thead2_tr)

        const tbody2 = document.createElement("tbody")
        table2.appendChild(tbody2)

        const tbody2_tr = document.createElement("tr")
        tbody2.appendChild(tbody2_tr)

        if(tipo == 1) {// Boletim
            // Tabela 1
            thead1_th1.innerHTML = "Atividades Feitas"
            thead1_th2.innerHTML = "Atividades Não Feitas"
            thead1_th3.innerHTML = "Atividades (%)"

            tbody1_td1.innerHTML = arrayAlunosObj[i].atividades[0]
            tbody1_td2.innerHTML = Dados.atividades - arrayAlunosObj[i].atividades[0]
            tbody1_td3.innerHTML = `${arrayAlunosObj[i].atividades[1]}%`

            //Tabela 2
            const thead2_th1 = document.createElement("th")
            const thead2_th2 = document.createElement("th")
            const thead2_th3 = document.createElement("th")
            const thead2_th4 = document.createElement("th")
            const thead2_th5 = document.createElement("th")
            const thead2_th6 = document.createElement("th");
            [thead2_th1, thead2_th2 , thead2_th3, thead2_th4, thead2_th5, thead2_th6].forEach(th => thead2_tr.appendChild(th))

            const tbody2_td1 = document.createElement("td")
            const tbody2_td2 = document.createElement("td")
            const tbody2_td3 = document.createElement("td")
            const tbody2_td4 = document.createElement("td")
            const tbody2_td5 = document.createElement("td")
            const tbody2_td6 = document.createElement("td");
            [tbody2_td1, tbody2_td2 , tbody2_td3, tbody2_td4, tbody2_td5, tbody2_td6].forEach(td => tbody2_tr.appendChild(td))

            thead2_th1.innerHTML = "1º Bimestre"
            thead2_th2.innerHTML = "2º Bimestre"
            thead2_th3.innerHTML = "3º Bimestre"
            thead2_th4.innerHTML = "4º Bimestre"
            thead2_th5.innerHTML = "Média Final"
            thead2_th6.innerHTML = "Situação"

            tbody2_td1.innerHTML = arrayAlunosObj[i].notas[0]
            tbody2_td2.innerHTML = arrayAlunosObj[i].notas[1]
            tbody2_td3.innerHTML = arrayAlunosObj[i].notas[2]
            tbody2_td4.innerHTML = arrayAlunosObj[i].notas[3]
            tbody2_td5.innerHTML = arrayAlunosObj[i].MostrarMedia()
            tbody2_td6.innerHTML = arrayAlunosObj[i].situacao

        } else if (tipo == 2) { // Presença
            // Tabela 1
            thead1_th1.innerHTML = "Presença"
            thead1_th2.innerHTML = "Faltas"
            thead1_th3.innerHTML = "Presença (%)"

            tbody_td1.innerHTML = arrayAlunosObj[i].presenca[0]
            tbody_td2.innerHTML = Dados.aulas - arrayAlunosObj[i].presenca[0]
            tbody_td3.innerHTML = `${arrayAlunosObj[i].presenca[1]}%`

            //Tabela 2
            let max = Number.parseInt(diasPresenca / 7)
            if(diasPresenca % 7 != 0) {
                max++
            }

            let data = objDateInicial

            for(let i = 0; i < max; i++) {
                const table2 = document.createElement("table")
                table2.classList.add(["tab2", "tabela_impressao", "table", "table-striped", "table-bordered", "border-dark", "mx-auto", "my-3"])
                div_infoEscolares.appendChild(table2)

                const thead2 = document.createElement("thead")
                table2.appendChild(thead2)

                const thead2_tr = document.createElement("tr")
                thead2.appendChild(thead2_tr)

                const tbody2 = document.createElement("tbody")
                table2.appendChild(tbody2)

                const tbody2_tr = document.createElement("tr")
                tbody2.appendChild(tbody2_tr)

                if(i != (max - 1)) {
                    for(let j = 0; j < 7; j++) {
                        let th = document.createElement("th")
                        th.innerHTML = `${(data.getDate()).padStart("2", "0")}/${(data.getMonth() + 1).padStart("2", "0")}/${data.getFullYear()}`
                        thead2_tr.appendChild(th)
                        data = new Date(data.getFullYear(), data.getMonth(), (data.getDate() + 1))
                    }
    
    
                    for(let j = 0; j < 7; j++) {
                        let td = document.createElement("td")
                        td.innerHTML = arrayAlunosObj[i].dias_presenca[posDateInicial]
                        tbody2_tr.appendChild(td)
                        posDateInicial++
                    }
                } else {
                    let resto = diasPresenca % 7

                    for(let j = 0; j < resto; j++) {
                        let th = document.createElement("th")
                        th.innerHTML = `${(data.getDate()).padStart("2", "0")}/${(data.getMonth() + 1).padStart("2", "0")}/${data.getFullYear()}`
                        thead2_tr.appendChild(th)
                        data = new Date(data.getFullYear(), data.getMonth(), (data.getDate() + 1))
                    }
    
    
                    for(let j = 0; j < resto; j++) {
                        let td = document.createElement("td")
                        td.innerHTML = arrayAlunosObj[i].dias_presenca[posDateInicial]
                        tbody2_tr.appendChild(td)
                        posDateInicial++
                    }
                }
            }
        }
    }
}

function CriarTabelaPresenca(qtdDias, dataInicialIndex) {
    const div_presenca = document.getElementById("presenca_sala")
    div_presenca.innerHTML = ""
    let pos = dataInicialIndex
    let posPresenca = dataInicialIndex

    function CriarTabela(colunas) {
        const tabela = document.createElement("table")
        tabela.classList.add("tabela_impressao", "table", "table-striped", "table-bordered", "border-dark", "mx-auto", "my-3")
        div_presenca.appendChild(tabela)

        const thead = document.createElement("thead")
        tabela.appendChild(thead)

        const thead_tr = document.createElement("tr")
        thead.appendChild(thead_tr)

        const th1 = document.createElement("th")
        th1.innerHTML = "Matricula"
        const th2 = document.createElement("th")
        th2.innerHTML = "Alunos"
        const th3 = document.createElement("th")
        th3.innerHTML = "Presença";
        [th1, th2, th3].forEach(th => {
            th.setAttribute("scope", "col")
            thead_tr.appendChild(th)
        });

        //console.log("Pos: " + pos)
        for(let i = 0; i < colunas; i++) {
            let th = document.createElement("th")
            //console.log(Dados.dias_aulas[pos][0])
            th.innerHTML = Dados.dias_aulas[pos][0]
            thead_tr.appendChild(th)
            pos++
        }

        const tbody = document.createElement("tbody")
        tabela.appendChild(tbody)

        let matrizValores = []
        let arrayClasses = ["td_matricula", "td_aluno"]
        for(let i = 0; i < Dados.alunos.length; i++) {
            (
                function() {
                    let valores = [Dados.alunos[i].matricula, Dados.alunos[i].nome, Dados.alunos[i].presenca[1]]
                    for(let j = posPresenca; j < (posPresenca + colunas); j++) {
                        valores.push(Dados.alunos[i].dias_presenca[j])
                        if(j == 3)
                            posPresenca = j+1
                    }
                    matrizValores.push(valores)
                }
            ) ();
        }


        CriarTabelaGenerica(tbody, Dados.alunos.length, (colunas + 3), matrizValores, arrayClasses)
    }
    
    let repeticao = Number.parseInt(qtdDias / 5)
    let resto = qtdDias % 5
    //console.log("Repetição: " + Number.parseInt(qtdDias / 5))
    //console.log("Resto: " + qtdDias % 5)

    for(let i = 0; i < repeticao; i++) {
        CriarTabela(5)
    }
    if(resto != 0) {
        CriarTabela(resto)
    }
}

export {CriarDivAluno, CriarTabelaPresenca}