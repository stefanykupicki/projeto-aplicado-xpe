const cardsList = document.getElementById('card-list');
const gamesList = document.getElementById('game-list');
const appbar = document.getElementById('appbar');
const appHome = document.getElementById('app-home');
const appRewards = document.getElementById('app-rewards');
const appConfig = document.getElementById('app-config');
const appQuiz = document.getElementById('app-quiz');
const quizQuestion = document.getElementById('quiz-question');
const quizAnswers = document.getElementById('quiz-answers');
const appbarList = document.getElementById('appbar-list');
const quizScoreText = document.getElementById('quiz-score-text');
const quizRewardText = document.getElementById('quiz-reward-text');
const quizReward = document.getElementById('quiz-reward');

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
  constructor(question, answers) {
    this.question = question;
    this.answers = answers;
  }

  start(onNext) {
    quizQuestion.innerText = this.question;

    this.answers.forEach((answer) => {
      quizAnswers.appendChild(answer.html);
      answer.html.addEventListener('click', () => onNext(answer));
    });
  }

  end() {
    quizQuestion.innerText = '';
    quizAnswers.innerHTML = '';
  }
}

class Quiz {
  currentQuestion = 0;
  rightAnswers = 0;

  constructor(questions) {
    this.questions = questions;
  }

  start() {
    hide(quizReward);
    navigateTo(appQuiz);
    this.questions[0].start(this.next.bind(this));
    this.updateScore();
  }

  next(answer) {
    if (answer.correct) this.rightAnswers++;

    this.questions[this.currentQuestion].end();
    this.currentQuestion++;

    if (!this.questions[this.currentQuestion]) return this.end();

    this.updateScore();
    this.questions[this.currentQuestion].start(this.next.bind(this));
  }

  end() {
    show(quizReward);
    quizQuestion.innerText = 'QUIZ FINALIZADO!';
    quizRewardText.innerText = `🏆 Você ganhou ${this.rightAnswers * 1000} pontos!`;
  }

  updateScore() {
    quizScoreText.innerText = `${this.rightAnswers} / ${this.questions.length}`;
  }
}

const addApplicationEvents = () => {
  Array.from(appbarList.children).forEach((button) => {
    button.addEventListener('click', function () {
      if (this.id == 'btn-home') {
        navigateTo(appHome);
      } else if (this.id == 'btn-rewards') {
        navigateTo(appRewards);
      } else if (this.id == 'btn-settings') {
        navigateTo(appConfig);
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
      new Answer('Rio de Janeiro', false),
      new Answer('São Paulo', false),
      new Answer('Brasília', true),
      new Answer('Belo Horizonte', false),
    ]),
    new Question('Qual é a capital da Argentina?', [
      new Answer('Rio de Janeiro', false),
      new Answer('Buenos Aires', true),
      new Answer('São Paulo', false),
      new Answer('Belo Horizonte', false),
    ]),
    new Question('Qual é a capital do Chile?', [
      new Answer('Santiago', true),
      new Answer('Belo Horizonte', false),
      new Answer('São Paulo', false),
      new Answer('Rio de Janeiro', false),
    ]),
  ];

  const quiz = new Quiz(questions);

  quiz.start();

  addApplicationEvents();
}

init();
