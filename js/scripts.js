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
      "question": "Qual o objetivo do atributo 'alt' da tag <img> do HTML?",
      "image": "imageQuestion1.png",
      "imageDescription": "Tag do html na cor branca com fundo azul",
      "audio": "audioQuestion1.mp3",
      "answers": [
        {
          "answer": "Fornecer uma legenda para a imagem",
          "correct": false
        },
        {
          "answer": "Identificar o tipo da imagem",
          "correct": false
        },
        {
          "answer": "Fornecer informações sobre a imagem, caso a mesma não seja carregada",
          "correct": true
        },
        {
          "answer": "Definir um endereço fonte onde a imagem está localizada",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "image": "imageQuestion2.png",
      "imageDescription": "Folha dobrada para simbolizar um arquivo javascript",
      "audio": "audioQuestion2.mp3",
      "answers": [
        {
          "answer": "int",
          "correct": false
        },
        {
          "answer": "let",
          "correct": true
        },
        {
          "answer": "double",
          "correct": false
        },
        {
          "answer": "boolean",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "image": "imageQuestion3.png",
      "imageDescription": "Olho humano com a cor azul, vermelha e verde dentro",
      "audio": "audioQuestion3.mp3",
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
    
    {
      "question": "A linguagem JavaScript provê uma série de métodos que facilitam a manipulação de arrays. Sobre o método de manipulação 'array.of()', é correto afirmar que:",
      "image": "imageQuestion4.png",
      "imageDescription": "Cubo roxo simulando a remoção de diversos quadrados verdes",
      "audio": "audioQuestion4.mp3",
      "answers": [
        {
          "answer": "Cria um novo array a partir dos argumentos passados para o método",
          "correct": true
        },
        {
          "answer": "Cria um novo array a partir de um array existente",
          "correct": false
        },
        {
          "answer": "Preenche o array com um valor estático",
          "correct": false
        },
        {
          "answer": "Devolve o @iterator, contendo os valores do array",
          "correct": false
        },
      ]
    },
    {
      "question": "Na linguagem JavaScript, ao invocar o método getElementsByClassName, do objeto document, será retornado:",
      "image": "imageQuestion5.png",
      "imageDescription": "Hexágono com fundo laranja e com um quadrado branco dentro com a escrita DOM dentro",
      "audio": "audioQuestion5.mp3",
      "answers": [
        {
          "answer": "Uma string",
          "correct": true
        },
        {
          "answer": "Um array",
          "correct": false
        },
        {
          "answer": "Um valor numérico",
          "correct": false
        },
        {
          "answer": "Uma função",
          "correct": false
        },
      ]
    },
    {
      "question": "Na linguagem JavaScript, o operador === (três sinais de igualdade) realiza a seguinte comparação:",
      "image": "imageQuestion6.png",
      "imageDescription": "Três frascos simbolizando teste genético",
      "audio": "audioQuestion6.mp3",
      "answers": [
        {
          "answer": "Valor lógico dos operandos",
          "correct": false
        },
        {
          "answer": "Valor e do tipo dos operandos",
          "correct": true
        },
        {
          "answer": "Valor dos operandos",
          "correct": false
        },
        {
          "answer": "Conteúdo dos operandos",
          "correct": false
        },
      ]
    },
    {
      "question": "No javascript é possível interagir com o console dos navegadores. O comando para imprimir o texto 'PUC' no console é:",
      "image": "imageQuestion7.png",
      "imageDescription": "Conjunto de logotipo de vários navegadores",
      "audio": "audioQuestion7.mp3",
      "answers": [
        {
          "answer": "console.log('PUC')",
          "correct": true
        },
        {
          "answer": "console.echo('PUC')",
          "correct": false
        },
        {
          "answer": "console.print('PUC')",
          "correct": false
        },
        {
          "answer": "console.dump('PUC')",
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
  let milliseconds = 30000
  let seconds = 30
  document.querySelector("#seconds").textContent = seconds

  //Iniciar barra de progresso
  document.querySelector('#bar').style['background-color'] = "var(--green-700)"
  const timerProgressBar = setInterval(() => {
    const progressBarTimer = ((milliseconds / 30000) * 100).toFixed(2)
    document.querySelector('#bar').style.width = `${progressBarTimer}%`
    milliseconds = milliseconds - 5
    if(milliseconds <= 11250) document.querySelector('#bar').style['background-color'] = "var(--yellow-500)"
    if(milliseconds <= 7500) document.querySelector('#bar').style['background-color'] = "var(--orange-700)"
    if(milliseconds <= 3750) document.querySelector('#bar').style['background-color'] = "var(--red-700)"
    
    if(milliseconds < 0) {
      clearInterval(timerProgressBar)
    }
  },5)

  //Iniciar contador de tempo (30 segundos)
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

  //Insere a imagem e o alt 
  document.querySelector("#question-image").src = `./images/${questions[randomNumberListForQuestions[i]].image}` 
  document.querySelector("#question-image").alt = questions[randomNumberListForQuestions[i]].imageDescription

  // Insere o audio da pergunta caso haja
  const elementAudio = document.createElement('source')
  elementAudio.setAttribute('src', `./audio/${questions[randomNumberListForQuestions[i]].audio}`)
  elementAudio.setAttribute('type', 'audio/mpeg')
  questionAudio.appendChild(elementAudio)
  questionAudio.load()
  questionAudio.classList.remove('hide')

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
      checkAnswer(this, timer, timerProgressBar);
    });
  }

  // Incrementar o número da questão
  actualQuestion++;
}

// Verificando a resposta do usuário
function checkAnswer(btn, timer, timerProgressBar) {
  clearInterval(timer)
  clearInterval(timerProgressBar)

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
  document.querySelector('.progress-bar').classList.toggle('hide');
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
