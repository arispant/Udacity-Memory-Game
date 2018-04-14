/*
 * Create a list that holds all of your cards
 */
let cardList = document.getElementsByClassName('card');
let cards = [...cardList];

let deck = document.querySelector('.deck');
let moves = document.querySelector('.moves');
let movesCount = 0;

let restart = document.querySelector('.restart');
let openedCards = [];

let matchedCards = document.getElementsByClassName("match");

let interval;
let seconds = 0, minutes = 0;


var timer = document.querySelector(".timer");
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function gameReset(){
  clearInterval(interval);
  seconds = 0;
  mins = 0;
  timer.innerHTML = minutes + " mins " + seconds + " secs";

  let suffledCards = shuffle(cards);
  const fragment = document.createDocumentFragment();

  for(let i = 0; i < cards.length; i++){
    let newElement = document.createElement('li');
    newElement = suffledCards[i];
    newElement.className = "card";
    fragment.appendChild(newElement);
  }
   deck.appendChild(fragment);
   moves.textContent = 0;
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//call gameReset function onload
window.onload = gameReset();


restart.addEventListener('click', gameReset);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function displayCards(){
    this.classList.add('open', 'show');
}

function cardOpen() {
    openedCards.push(this);
    let len = openedCards.length;
    if(len === 2){
        movesCounter();
        if(openedCards[0].innerHTML === openedCards[1].innerHTML){
            cardsMatched();
        } else {
            cardsUnmatched();
        }
    }
}

function cardsMatched(){
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
    if(matchedCards.length == 16){
      clearInterval(interval);
    }
}

function cardsUnmatched(){
    setTimeout(function(){
      openedCards[0].className = "card";
      openedCards[1].className = "card";
      openedCards = [];
    },1000);

}

function gameTimer(){
  interval = setInterval(function () {
    timer.innerHTML = minutes + "mins " + seconds + "secs";
    seconds++;
    if(seconds == 60){
      minutes++;
      seconds = 0;
    }
  }, 1000);
}

function movesCounter(){
    movesCount++;
    moves.innerHTML = movesCount;
    if(movesCount == 1){
      gameTimer();
    }
}

for (var i = 0; i < cards.length; i++){
    cardList = cards[i];
    cardList.addEventListener("click", displayCards);
    cardList.addEventListener("click", cardOpen);
    //card.addEventListener("click",congratulations);
};
