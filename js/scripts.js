// Declaração variáveis
const question = document.querySelector("#question");
const questionAudio = document.querySelector("#question-audio");
const answersBox = document.querySelector("#answers-box");
const quizContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let user = ''
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
  {
    "question": "PHP foi desenvolvido para qual fim?",
    "audio": "paris.mp3",
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

// Gerar lista de números aleatórios
let randomNumberListForQuestions = randomNumberListGenerator(questions.length)
let randomNumberListForAnswer = randomNumberListGenerator(4)

function randomNumberListGenerator(count){
  const randomNumberList = []

  while (randomNumberList.length < count) {
    let randomNumber = Number((Math.random() * ((count - 1) - 0) + 0).toFixed(0));
    let numberExist = randomNumberList.includes(randomNumber)
    if (!numberExist) {
      randomNumberList.push(randomNumber)
    }
  }
  return randomNumberList
}

// substituição do quiz para a primeira pergunta
function init() {
  user = document.querySelector('#nameUser').value
  // criar a primeira pergunta
  if(user.length > 0){
    document.querySelector('#modal').classList.add('hide')
    createQuestion(0);
    document.querySelector("#displayNameUser").textContent = user
    document.querySelector("#questions-total").textContent = questions.length;
  }
}

// Cria a pergunta
function createQuestion(i) {
  let seconds = 15
  document.querySelector("#seconds").textContent = seconds

  //Iniciar contador de tempo (15 segundos)
  const timer = setInterval(() => {
    seconds--
    if(seconds > 9) {
      document.querySelector("#seconds").textContent = seconds
    } else {
      document.querySelector("#seconds").textContent = `0${seconds}`
    }

    if(seconds <= 0){
      clearInterval(timer)
      nextQuestion()
    }
  }, 1000)

  // Limpar a questão anterior
  const oldButtons = answersBox.querySelectorAll("button");
  oldButtons.forEach(btn => btn.remove());
  questionAudio.querySelectorAll('source').forEach(item => item.remove())
  

  // Alterar o texto e o indetificador da pergunta
  question.querySelector("#question-text").textContent = questions[randomNumberListForQuestions[i]].question;
  document.querySelector("#question-number").textContent = i + 1;

  // Insere o audio da pergunta caso haja
  if(questions[randomNumberListForQuestions[i]].audio){
    const elementAudio = document.createElement('source')
    elementAudio.setAttribute('src', `../music/${questions[randomNumberListForQuestions[i]].audio}`)
    elementAudio.setAttribute('type', 'audio/mpeg')
    questionAudio.appendChild(elementAudio)
    questionAudio.classList.remove('hide')
  } else {
    questionAudio.classList.add('hide')
  }

  // Insere as alternativas
  for(x = 0; x < randomNumberListForAnswer.length; x++){
    // Cria o template do botão do quiz
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[x];
    answerText.textContent = questions[randomNumberListForQuestions[i]].answers[randomNumberListForAnswer[x]]['answer'];

    answerTemplate.setAttribute("correct-answer", questions[randomNumberListForQuestions[i]].answers[randomNumberListForAnswer[x]]["correct"]);

    // Remover hide e template class
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    // Inserir a alternativa na tela
    answersBox.appendChild(answerTemplate);

    // Inserir um evento de click no botão
    answerTemplate.addEventListener("click", function () {
      checkAnswer(this, timer);
    });
  }

  // Incrementar o número da questão
  actualQuestion++;
}

// Verificando a resposta do usuário
function checkAnswer(btn, timer) {
  clearInterval(timer)

  // seleciona todos os botões
  const buttons = answersBox.querySelectorAll("button");

  // verifica se a resposta está correta e adiciona classes aos botões
  buttons.forEach(button => {

    if (button.getAttribute('correct-answer') == 'true') {

      button.classList.add("correct-answer");

      if (btn === button) {
        // incrementa os pontos
        points++;
      }

    } else {

      button.classList.add("wrong-answer");
    }
  });

  // Exibir próxima pergunta
  nextQuestion();
}

// Exibi a próxima pergunta no quizz
function nextQuestion() {
  questionAudio.pause()
  questionAudio.currentTime = 0

  // timer usuário ver as respostas
  setTimeout(() => {

    // verifica se ainda há perguntas
    if (actualQuestion >= questions.length) {
      // apresenta mensagem de sucesso
      showSucccessMessage();
      return;
    }
    createQuestion(actualQuestion);

  }, 700);

}

// exibe a tela final
function showSucccessMessage() {

  hideOrShowQuizz();

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

  storeResult()
}

// mostra ou esconde o score
function hideOrShowQuizz() {
  document.querySelector('.quizz-header').classList.toggle('hide');
  quizContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

// Reiniciar o quiz
function restartQuizz() {
  user = ''
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  randomNumberListForQuestions = randomNumberListGenerator(questions.length)
  randomNumberListForAnswer = randomNumberListGenerator(4)
  init();
}

// Armazenar dados no localStorage
function storeResult(){
  const previousResults = JSON.parse(localStorage.getItem('quizResults'))
  let userData = []

  if(previousResults){
    userData = [...previousResults, {
      player: user,
      hits: points,
      errors: questions.length - points
    }]
  } else {
    userData = [{
      player: user,
      hits: points,
      errors: questions.length - points
    }]
  }
  
  
  localStorage.setItem('quizResults', JSON.stringify(userData))
}
