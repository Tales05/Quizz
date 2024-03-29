const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ['a','b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

//Perguntas

const questions = [
    {
      "question": " - PHP foi desenvolvido para qual fim?",
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

//Substituição do quizz para a primeira pergunta
function init() {
    //criar a primeira pergunta
    createQuestion(0);
}

// cria uma pergunta
function createQuestion(i) {
    //Limpar a questão anterior
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function(btn) {
        btn.remove()
    })

    // alterar o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number")

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    //inserir as alternativas
    questions[i].answers.forEach(function(answer, i){

        //cria o template do botão do quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector('.question-answer');

        letterBtn.textContent = letters[i]
        answerText.textContent = answer['answer']

        answerTemplate.setAttribute("correct-answer", answer["correct"])
        //Remover hide e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template")

        //Inserir as alternativas na tela
        answersBox.appendChild(answerTemplate)

        //Inserir um evento de click no botão 
        answerTemplate.addEventListener("click", function() {
            checknswer(this)
        })

    })

    //Incrementar o número da questão 
    actualQuestion++;

}


//verificando respostas do usuário 
function checknswer(btn) {
  const buttons = answersBox.querySelectorAll("button")

  //verifica se a resposta esta correta e adiciona classes nos botóes
  buttons.forEach(function(button) {
    if(button.getAttribute("correct-answer") === "true") {

      button.classList.add("correct-answer");

      //checa se o usuário acertou a pergunta
      if(btn === button) {
          //Incrimentando os posntos
          points++;
      }
    }else {
      button.classList.add("wrong-answer")
    }

  });

  //Exibir próxima pergunta
  nextQuestion();

}

//Exibir proxima pergunta no quizz
function nextQuestion() {

  setTimeout(function() {
    //verifica se ainda há perguntas 
    if(actualQuestion >= questions.length) {
    //Apresenta a msg de sucesso
    showSuccessMessage();
    return;
  }

  createQuestion(actualQuestion)

  }, 700);


}


// Exibi a tela final

function showSuccessMessage(){
  hideOrsShowQuizz();

  //trocar dados da tela de sucesso

  //calcular o score
  const score = ((points / questions.length)* 100).toFixed(2)

  const displayScore = document.querySelector("#display-score span");
  console.log(score)
  displayScore.textContent = score.toString()

  //alterar o número de perguntas corretas
  const correctAnswers = document.querySelector("#correct-answers")
  correctAnswers.textContent = points;

  //alterar o total de perguntas 
  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;
  
}

//Mostra ou esconde o score
function hideOrsShowQuizz() {
  quizzContainer.classList.toggle("hide")
  scoreContainer.classList.toggle("hide")
}

//Reiniciar Quizz 
const restartBrn = document.querySelector("#restart");

restartBrn.addEventListener("click", function() {
  
  //Zerar o jogo
  actualQuestion = 0;
  points = 0;
  hideOrsShowQuizz();
  init();
})


//inicialização do Quizz!
init()

