const cardsList = document.getElementById('card-list');
const gamesList = document.getElementById('game-list');
const appbar = document.getElementById('appbar');
const appHome = document.getElementById('app-home');
const appRewards = document.getElementById('app-rewards');
const appConfig = document.getElementById('app-config');
const appQuiz = document.getElementById('app-quiz');
const quizQuestion = document.getElementById('quiz-question');
const quizAnswers = document.getElementById('quiz-answers');
const btnQuizNext = document.getElementById('btn-quiz-next');

// CRIA UM CARD COM IMAGEM E INSERE NA LISTA
class Card {
  constructor(imageUrl) {
    this.imageUrl = imageUrl;
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = this.imageUrl;

    card.appendChild(img);
    cardsList.appendChild(card);

    return card;
  }
}

// CRIA UM JOGO COM IMAGEM, TITULO E INSERE NA LISTA
class Game {
  constructor(imageUrl, name, gameUrl) {
    this.imageUrl = imageUrl;
    this.name = name;
    this.gameUrl = gameUrl;

    const game = document.createElement('div');
    game.classList.add('game');

    const img = document.createElement('img');
    img.src = this.imageUrl;

    const title = document.createElement('h2');
    title.innerText = this.name;

    const button = document.createElement('button');
    button.innerText = 'jogar';

    game.appendChild(img);
    game.appendChild(title);

    gamesList.appendChild(game);

    return game; 
  }
}

class Answer {
  constructor(answer, correct) {
    this.answer = answer;
    this.correct = correct;

    const answerEl = document.createElement('div');
    answerEl.classList.add('answer');

    const text = document.createElement('p');
    text.innerText = this.answer;

    answerEl.appendChild(text);

    this.html = answerEl;
  }
}

class Question {
  constructor(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }

  start() {
    quizQuestion.innerText = this.question;

    this.answers.forEach((answer) => {
      quizAnswers.appendChild(answer.html);
    });
  }

  end() {
    quizQuestion.innerText = '';
    quizAnswers.innerHTML = '';
  }
}

class Quiz {
  currentQuestion = 0;

  constructor(questions) {
    this.questions = questions;
  }

  start() {
    navigateTo(appQuiz);
    this.questions[0].start();

    btnQuizNext.addEventListener('click', () => this.next());
  }

  next() {
    this.questions[this.currentQuestion].end();
    this.currentQuestion++;
    this.questions[this.currentQuestion].start();
  }
}

const addApplicationEvents = () => {
  Array.from(appbar.children).forEach((button) => {
    button.addEventListener('click', function () {
      if (this.id == 'btn-home') {
        hide(appRewards);
        hide(appConfig);
        show(appHome);
      } else if (this.id == 'btn-rewards') {
        hide(appHome);
        hide(appConfig);
        show(appRewards);
      } else if (this.id == 'btn-config') {
        hide(appHome);
        hide(appRewards);
        show(appConfig);
      }
    })
  })
}

// FUNÇÕES AUXILIARES
const hide = (element) => {
  element.classList.add('hidden');
}

const show = (element) => {
  element.classList.remove('hidden');
}

const navigateTo = (element) => {
  const screens = [appHome, appRewards, appConfig, appQuiz]
  screens.forEach((screen) => hide(screen));
  show(element);
}

// FUNÇÃO DE INICIALIZAÇÃO DA APLICAÇÃO
const init = () => {
  new Card('https://picsum.photos/200/300');
  new Card('https://picsum.photos/200/300');
  new Card('https://picsum.photos/200/300');
  new Card('https://picsum.photos/200/300');
  new Card('https://picsum.photos/200/300');
  new Card('https://picsum.photos/200/300');
  new Card('https://picsum.photos/200/300');
  new Card('https://picsum.photos/200/300');
  new Card('https://picsum.photos/200/300');
  new Card('https://picsum.photos/200/300');

  new Game('https://picsum.photos/200/300', 'Jogo 1', 'https://picsum.photos/200/300');
  new Game('https://picsum.photos/200/300', 'Jogo 2', 'https://picsum.photos/200/300');
  new Game('https://picsum.photos/200/300', 'Jogo 3', 'https://picsum.photos/200/300');
  new Game('https://picsum.photos/200/300', 'Jogo 4', 'https://picsum.photos/200/300');

  const questions = [
    new Question('Qual é a capital do Brasil?', [
      new Answer('Brasília', true),
      new Answer('São Paulo', false),
      new Answer('Rio de Janeiro', false),
      new Answer('Belo Horizonte', false),
    ]),
    new Question('Qual é a capital da Argentina?', [
      new Answer('Buenos Aires', true),
      new Answer('São Paulo', false),
      new Answer('Rio de Janeiro', false),
      new Answer('Belo Horizonte', false),
    ]),
  ];

  const quiz = new Quiz(questions);

  quiz.start();

  addApplicationEvents();
}

init();
