document.addEventListener("DOMContentLoaded", function () {
    const confirmButtons = document.querySelectorAll('.confirmar');
    confirmButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const currentQuestion = this.parentElement;
            const nextQuestionId = this.getAttribute('data-next');
            const nextQuestion = document.getElementById(nextQuestionId);

            // hideQuestion(currentQuestion);
            if (nextQuestion) {
                if (nextQuestionId === 'resultado') {
                    showFinalResult();
                } else {
                    showQuestion(nextQuestion);
                    updateActiveIndex(nextQuestionId);
                }
            } else {
                showFinalResult();
            }
        });
    });

    const perguntas = document.querySelectorAll('.question');

    perguntas.forEach(function (pergunta, index) {
        pergunta.classList.remove('d-none'); // Remover a classe 'd-none' para mostrar a pergunta
    });

    function hideQuestion(question) {
        question.classList.add('d-none');
    }

    function showQuestion(question) {
        question.classList.remove('d-none');
        question.scrollIntoView({ behavior: 'smooth' });
    }

    function updateActiveIndex(activeId) {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(function (link) {
            if (link.getAttribute('href').substring(1) === activeId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

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

        
        // Exibe as somas por tipo de dom na tabela
        Object.keys(respostasAgrupadas).forEach(function (tipo) {
            const soma = respostasAgrupadas[tipo].reduce((acc, curr) => acc + curr, 0); // Calcula a soma das respostas
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


});


