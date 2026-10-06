const questions = [

    {
        question:
            "Em qual período ocorreu a Guerra do Paraguai?",

        answers: [
            "1822–1831",
            "1840–1850",
            "1864–1870",
            "1889–1895"
        ],

        correct: 2
    },

    {
        question:
            "Em qual atual estado brasileiro está localizado o Forte Coimbra?",

        answers: [
            "Mato Grosso",
            "Mato Grosso do Sul",
            "Paraná",
            "Rio Grande do Sul"
        ],

        correct: 1
    },

    {
        question:
            "Qual era uma das principais funções estratégicas do Forte Coimbra?",

        answers: [
            "Defender a fronteira",
            "Produzir café",
            "Explorar ouro",
            "Servir exclusivamente como porto comercial"
        ],

        correct: 0
    },

    {
        question:
            "Qual conflito está diretamente relacionado à história do Forte Coimbra no século XIX?",

        answers: [
            "Guerra de Canudos",
            "Guerra do Contestado",
            "Guerra do Paraguai",
            "Revolução Farroupilha"
        ],

        correct: 2
    },

    {
        question:
            "Por que preservar patrimônios históricos como o Forte Coimbra é importante?",

        answers: [
            "Porque preserva somente construções antigas",
            "Porque mantém viva a memória histórica e cultural",
            "Porque substitui os documentos históricos",
            "Porque elimina a necessidade de estudar história"
        ],

        correct: 1
    }

];


let currentQuestion = 0;
let score = 0;
let selectedAnswer = false;


/* ELEMENTOS */

const introduction =
    document.getElementById("quiz-introduction");

const quizContainer =
    document.getElementById("quiz-container");

const resultContainer =
    document.getElementById("result-container");

const startButton =
    document.getElementById("start-quiz");

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const nextButton =
    document.getElementById("next-button");

const progress =
    document.getElementById("progress");

const questionNumber =
    document.getElementById("question-number");

const currentQuestionElement =
    document.getElementById("current-question");

const scoreElement =
    document.getElementById("score");

const resultMessage =
    document.getElementById("result-message");


/* COMEÇAR */

startButton.addEventListener("click", () => {

    introduction.classList.add("hidden");

    quizContainer.classList.remove("hidden");

    showQuestion();

});


/* MOSTRAR QUESTÃO */

function showQuestion() {

    selectedAnswer = false;

    const question = questions[currentQuestion];

    questionElement.textContent =
        question.question;

    answersElement.innerHTML = "";

    currentQuestionElement.textContent =
        String(currentQuestion + 1).padStart(2, "0");

    questionNumber.textContent =
        String(currentQuestion + 1).padStart(2, "0");

    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    nextButton.classList.add("hidden");


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className = "answer";

        button.textContent = answer;

        button.addEventListener(
            "click",
            () => selectAnswer(button, index)
        );

        answersElement.appendChild(button);

    });

}


/* SELECIONAR */

function selectAnswer(button, index) {

    if (selectedAnswer) {
        return;
    }

    selectedAnswer = true;

    const question = questions[currentQuestion];

    const allAnswers =
        document.querySelectorAll(".answer");

    allAnswers.forEach(answer => {
        answer.style.pointerEvents = "none";
    });


    if (index === question.correct) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");

        allAnswers[question.correct]
            .classList.add("correct");

    }

    nextButton.classList.remove("hidden");

}


/* PRÓXIMA */

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        quizContainer.classList.remove("hidden");

        showQuestion();

    } else {

        showResult();

    }

});


/* RESULTADO */

function showResult() {

    quizContainer.classList.add("hidden");

    resultContainer.classList.remove("hidden");

    scoreElement.textContent =
        `${score}/${questions.length}`;


    if (score === 5) {

        resultMessage.textContent =
            "Excelente. Você já possui uma ótima base para iniciar a jornada histórica pelo Forte Coimbra.";

    } else if (score >= 3) {

        resultMessage.textContent =
            "Muito bem. Você já conhece parte dessa história. Agora chegou a hora de aprofundar seus conhecimentos.";

    } else {

        resultMessage.textContent =
            "A história está esperando por você. Continue a experiência e descubra os acontecimentos que marcaram essa região.";

    }

}