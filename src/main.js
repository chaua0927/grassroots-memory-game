'use strict'
import * as RandFct from './util/random-functions.js';
import Deck from './models/deck.js';

//Deck Initialization
const NUM_UNIQUE_CARDS = 12;
const NUM_COPIES = 2;

let deck = new Deck();
for (let i = 0; i < NUM_UNIQUE_CARDS; i++) {
  for (let j = 0; j < NUM_COPIES; j++) {
    let name = 'card' + i;
    let url = './../assets/' + name + '.jpg';
    deck.addCard(name, url);
  }
}

//Game Initialization
const game = document.querySelector('#game');

const grid = document.createElement('section');
grid.setAttribute('class', 'grid');

game.appendChild(grid);

deck.shuffle();

initializeCardsView();

//Game Management
let count = 0;
let firstGuess = '', secondGuess = '';
let previousTarget = null;
const ANIMATION_DELAY = 1000;

grid.addEventListener('click', (event) => {
  const clicked = event.target;

  //Ignore if grid is selected
  if (
    clicked.nodeName === 'SECTION' || 
    clicked === previousTarget || 
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
    ) {
      return
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(matchifyView, ANIMATION_DELAY);
      }
      setTimeout(resetGuesses, ANIMATION_DELAY);
    }

    previousTarget = clicked;
  
  }
})


function initializeCardsView() {
  for (let i = 0; i < deck.size; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.id = RandFct.randHTMLID();
      card.dataset.name = deck.getCard(i).name;

      const front = document.createElement('div');
      front.classList.add('front');

      const back = document.createElement('div');
      back.classList.add('back');
      back.style.backgroundImage = `url(${deck.getCard(i).img})`;
      
      grid.appendChild(card);
      card.appendChild(front);
      card.appendChild(back);
  }
}

function matchifyView() {
  let selected = document.querySelectorAll('.selected');
  selected.forEach( card => {
    card.classList.add('match');
  });
}

function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  let selected = document.querySelectorAll('.selected');
  selected.forEach( card => {
    card.classList.remove('selected')
  })
}