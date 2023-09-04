const cardsList = document.getElementById('card-list');
const gamesList = document.getElementById('game-list');
const appbar = document.getElementById('appbar');
const appHome = document.getElementById('app-home');
const appRewards = document.getElementById('app-rewards');
const appConfig = document.getElementById('app-config');
const appQuiz = document.getElementById('app-quiz');

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

    const play = document.createElement('div')
  
    const button = document.createElement('button');
    button.innerText = 'jogar';

    play.appendChild(button)
    game.appendChild(img);
    game.appendChild(title);
    game.appendChild(play)

    gamesList.appendChild(game);

    return game; 
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

  addApplicationEvents();
}

init();
