document.addEventListener('DOMContentLoaded', function() {
    const questionsPerPage = 20;
    const totalQuestions = 120;
    let currentPage = 1;

    const confirmButtons = document.querySelectorAll('.confirmar');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const questionIndexContainer = document.getElementById('questionIndex');
    let activeButton = null;

    confirmButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextQuestionId = this.getAttribute('data-next');
            const nextQuestion = document.getElementById(nextQuestionId);
            if (nextQuestion) {
                nextQuestion.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    function showPage(page) {
        currentPage = page;
        const startQuestion = (page - 1) * questionsPerPage + 1;
        const endQuestion = Math.min(page * questionsPerPage, totalQuestions);

        for (let i = 1; i <= totalQuestions; i++) {
            const question = document.getElementById(`pergunta${i}`);
            if (i >= startQuestion && i <= endQuestion) {
                question.classList.remove('d-none');
            } else {
                question.classList.add('d-none');
            }
        }

        prevButton.disabled = page === 1;
        nextButton.disabled = page === Math.ceil(totalQuestions / questionsPerPage);

        // Atualizar a cor do botão de índice
        const indexButtons = questionIndexContainer.querySelectorAll('button');
        if (activeButton) {
            activeButton.style.backgroundColor = ''; // Resetar a cor do botão anterior
        }
        activeButton = indexButtons[page - 1]; // Atualizar o botão ativo
        activeButton.style.backgroundColor = 'lightyellow'; // Definir a cor do novo botão ativo

        // Scroll para a próxima pergunta
        scrollToDataNextQuestion(page);
    }

    function createIndexButtons() {
        for (let i = 1; i <= Math.ceil(totalQuestions / questionsPerPage); i++) {
            const button = document.createElement('button');
            button.className = 'btn btn-outline-secondary mx-1';
            button.innerText = i;
            if (i === 1) {
                button.style.backgroundColor = 'lightyellow'; // Definir a cor inicial do botão 1
                activeButton = button; // Definir o botão 1 como ativo inicialmente
            }
            button.addEventListener('click', function() {
                showPage(i);
            });
            questionIndexContainer.appendChild(button);
        }
    }

    function scrollToDataNextQuestion(index) {
        let indexCalculated;
        if (index === 1) {
            indexCalculated = 1;
        } else {
            indexCalculated = ((index * questionsPerPage) - questionsPerPage);
        }

        const confirmButton = document.querySelector(`#pergunta${indexCalculated} .confirmar`);
        if (confirmButton) {
            const nextQuestionId = confirmButton.getAttribute('data-next');
            const nextQuestion = document.getElementById(nextQuestionId);
            if (nextQuestion) {
                nextQuestion.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentPage < Math.ceil(totalQuestions / questionsPerPage)) {
            showPage(currentPage + 1);
        }
    });


    window.nextButtonHandler = function() {
        if (currentPage < Math.ceil(totalQuestions / questionsPerPage)) {
            showPage(currentPage + 1);
        }
        scrollToDataNextQuestion(currentPage + 1);
    }

    const mostrarResultadosButton = document.getElementById('mostrarResultadosButton');

    mostrarResultadosButton.addEventListener('click', function () {
        showFinalResult();
    });

    function showFinalResult() {
        const respostas = document.querySelectorAll('input:checked');
        const tabelaResultado = document.getElementById('resultadoTableBody');
        tabelaResultado.innerHTML = ''; // Limpa qualquer conteúdo pré-existente na tabela

        // Objeto para armazenar as respostas agrupadas por tipo de dom
        const respostasAgrupadas = {
            "Administração": [],
            "Missionário": [],
            "Evangelista": [],
            "Discernimento": [],
            "Fé": [],
            "Provisão / Contribuir": [],
            "Ensino": [],
            "Sabedoria": [],
            "Curas": [],
            "Socorros": [],
            "Hospitalidade": [],
            "Intercessão": [],
            "Mestre": [],
            "Liderança / Presidir": [],
            "Misericórdia": [],
            "Milagres": [],
            "Pastor": [],
            "Profeta": [],
            "Serviços": [],
            "Línguas": [],
        };

        // Preenche o objeto de respostas agrupadas
        respostas.forEach(function (resposta) {
            const pergunta = resposta.closest('.question');
            const numeroPergunta = pergunta.id.replace('pergunta', '');
            const dom = determinarDom(numeroPergunta);
            respostasAgrupadas[dom].push(parseInt(resposta.value) + 1);
        });

        // Converter objeto em array de pares chave-valor
        const arrayRespostas = Object.entries(respostasAgrupadas);

        // Ordenar o array com base nos valores das somas em ordem decrescente
        arrayRespostas.sort((a, b) => {
            return b[1].reduce((acc, curr) => acc + curr, 0) - a[1].reduce((acc, curr) => acc + curr, 0);
        });

        // Iterar sobre o array ordenado e criar as células na tabela
        arrayRespostas.forEach(function (parChaveValor) {
            const tipo = parChaveValor[0];
            const soma = parChaveValor[1].reduce((acc, curr) => acc + curr, 0);
            const linhaTabela = document.createElement('tr');

            linhaTabela.innerHTML = `
    <td>${tipo}: ${soma}</td>
    `;
            tabelaResultado.appendChild(linhaTabela);
        });

        const telaFinal = document.getElementById('telaFinal');
        showQuestion(telaFinal);

        // Atualiza a classe ativa para "Resultado" e remove a classe 'unanswered'
        const resultadoLink = document.querySelector('a[href="#resultado"]');

        // Remove a classe 'active' de todos os outros links de perguntas
        const linksPerguntas = document.querySelectorAll('.nav-link:not([href="#resultado"])');
        linksPerguntas.forEach(function (link) {
            link.classList.remove('active');
        });

        // Aplica a cor correta ao texto do link de "Resultado"
    }

    function determinarDom(numeroPergunta) {
        const modulo = numeroPergunta % 20; // Calcula o resto da divisão por 20
        if (modulo === 1) {
            return "Administração";
        } else if (modulo === 2) {
            return "Missionário";
        } else if (modulo === 3) {
            return "Evangelista";
        } else if (modulo === 4) {
            return "Discernimento";
        } else if (modulo === 5) {
            return "Fé";
        } else if (modulo === 6) {
            return "Provisão / Contribuir";
        } else if (modulo === 7) {
            return "Ensino";
        } else if (modulo === 8) {
            return "Sabedoria";
        } else if (modulo === 9) {
            return "Curas";
        } else if (modulo === 10) {
            return "Socorros";
        } else if (modulo === 11) {
            return "Hospitalidade";
        } else if (modulo === 12) {
            return "Intercessão";
        } else if (modulo === 13) {
            return "Mestre";
        } else if (modulo === 14) {
            return "Liderança / Presidir";
        } else if (modulo === 15) {
            return "Misericórdia";
        } else if (modulo === 16) {
            return "Milagres";
        } else if (modulo === 17) {
            return "Pastor";
        } else if (modulo === 18) {
            return "Profeta";
        } else if (modulo === 19) {
            return "Serviços";
        } else if (modulo === 0) {
            return "Línguas";
        } else {
            return "Erro";
        }
    }

    function hideQuestion(question) {
        question.classList.add('d-none');
    }

    function showQuestion(question) {
        question.classList.remove('d-none');
        question.scrollIntoView({ behavior: 'smooth' });
    }

    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            showPage(currentPage - 1);
            updateActiveIndex(`pergunta${(currentPage - 1) * questionsPerPage}`);
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentPage < Math.ceil(totalQuestions / questionsPerPage)) {
            showPage(currentPage + 1);
            updateActiveIndex(`pergunta${currentPage * questionsPerPage + 1}`);
        }
    });

    createIndexButtons();
    showPage(currentPage);
});