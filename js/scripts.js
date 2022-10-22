// Declaração variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
  {
    "question": "PHP foi desenvolvido para qual fim?",
    "answers": [
      {
        "answer": "back-end",
        "correct": true
      },
      {
        "answer": "front-end",
        "correct": false
      },
      {
        "answer": "Sistema operacional",
        "correct": false
      },
      {
        "answer": "Banco de dados",
        "correct": false
      },
    ]
  },
  {
    "question": "Uma forma de declarar variável em JavaScript:",
    "answers": [
      {
        "answer": "$var",
        "correct": false
      },
      {
        "answer": "var",
        "correct": true
      },
      {
        "answer": "@var",
        "correct": false
      },
      {
        "answer": "#let",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual o seletor de id no CSS?",
    "answers": [
      {
        "answer": "#",
        "correct": true
      },
      {
        "answer": ".",
        "correct": false
      },
      {
        "answer": "@",
        "correct": false
      },
      {
        "answer": "/",
        "correct": false
      },
    ]
  },
]

// substituição do quiz para a primeir pergunta
function init() {
    // criar a primeira pergunta
    createQuestion(0);
}

// Cria a pergunta
function createQuestion(i) {
   
    // Limpar a questão anterior
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function(btn) {
        btn.remove();
    });

    // Alterar o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // Insere as alternativas
    questions[i].answers.forEach(function(answer, i) {

        // Cria o template do botão do quiz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn  = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        // Remover hide e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        // Inserir a alternativa na tela
        answersBox.appendChild(answerTemplate);

        // Inserir um evento de click no botão
        answerTemplate.addEventListener("click", function() {
            checkAnswer(this);
        });
    
    });

    // Incrementar o número da questão
    actualQuestion++;
}

// Verificando a resosta do usuário
function checkAnswer(btn) {
   
    // seleciona todos os botões
    const buttons = answersBox.querySelectorAll("button");

    // verifica se a resposta está correta e adiciona classes aos botões
    buttons.forEach(function(button) {

        if(button.getAttribute('correct-answer') == 'true') {
            
            button.classList.add("correct-answer");

            if(btn === button) {
                // incrementa os pontos
                points++;
            }

        }else {

            button.classList.add("wrong-answer");
        }
    });
    
    // Exibir próxima pergunta
    nextQuestion();
}

// Exibi a próxima pergunta no quizz
function nextQuestion() {

    // timer usuário ver as respostas
    setTimeout(function() {

        // verifica se ainda há perguntas
        if(actualQuestion >= questions.length) {
            // apresenta mensagem de sucesso
            showSucccessMessage();
            return;
        }
            createQuestion(actualQuestion);

    }, 700);

}

// exibe a tela final
function showSucccessMessage(){

    hideOrShowQuizz();

    // trocar dados da tela de sucesso

    // calcular o score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");

    displayScore.textContent = score.toString();

    // alterar o número de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");

    correctAnswers.textContent = points;

    //alterar o total de perguntas
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
}

// mostra ou esconde o score
function hideOrShowQuizz(){
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

// Reiniciar o quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {

    // zerar o jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();

});

// Inicialização do Quizz
init();