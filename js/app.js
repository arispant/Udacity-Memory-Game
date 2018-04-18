
// deck of all cards
let deck = document.querySelector(".deck");

// selecting cards and create cards array to hold all cards
let cardList = document.getElementsByClassName("card");
let cards = [...cardList];

// declare variables for game moves
let moves = document.querySelector(".moves");
let movesCount = 0;

// select restart button
let restart = document.querySelector(".restart");

// an array to store opened cards
let openedCards = [];

// select match cards
let matchedCards = document.getElementsByClassName("match");

// declaring variables for timer functionality
let interval;
let seconds = 0, minutes = 0;
let timer = document.querySelector(".timer");

// declare variables for rating functionality
let starsUl = document.querySelector(".stars");
let stars = document.getElementsByClassName("fa-star");
let rate = 0;

// declare modal
 let modal = document.querySelector(".congrats");
 let againButton = document.getElementById("play-again");
 let totalTime = document.querySelector(".totalTime");
 let totalMoves = document.querySelector(".totalMoves");
 let starRating = document.querySelector(".starRating");

 // function for reseting game
function gameReset(){

  // stop timer
  clearInterval(interval);

  //reseting time variables
  seconds = 0;
  minutes = 0;
  movesCount = 0;
  timer.innerHTML = minutes + " mins " + seconds + " secs";

  // reset rating
  for (var i = 0; i < stars.length; i++){
      stars[i].style.color = "#fff466";
  }

  // suffle the deck
  let suffledCards = shuffle(cards);
  const fragment = document.createDocumentFragment();

  // display suffled cards
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

// add event listener for reset button
restart.addEventListener("click", gameReset);

// function to show clicked cards
function displayCards(){
    this.classList.add("open", "show");
}

// function to hadle functionality for the pair of cards
function cardOpen() {
    openedCards.push(this);
    this.classList.add("disabled");
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

// function to hadle a matched pair
function cardsMatched(){

      openedCards[0].classList.add("match");
      openedCards[1].classList.add("match");
      openedCards[0].classList.remove("show", "open");
      openedCards[1].classList.remove("show", "open");
      openedCards = [];


    //checks if all cards are open
    if(matchedCards.length == 16){
        clearInterval(interval);
        congratulations();
    }
}

// function to handle an unmatched pair
function cardsUnmatched(){
    disableCards();
    setTimeout(function(){
        openedCards[0].classList.add("unmatch");
        openedCards[1].classList.add("unmatch");
    },400);

    // setting the duration that the two cards are open
    setTimeout(function(){
        openedCards[0].className = "card";
        openedCards[1].className = "card";
        openedCards = [];
        enableCards();
    },1000);
}

// function for temporary disable click
function disableCards(){
    // run filter function on cards array to add disable class to each element so they're not clickable
    Array.prototype.filter.call(cards, function(card){
        card.classList.add("disabled");
    });
}

// function to enable click functionality again
function enableCards() {
    // run filter function on cards array to remove disable class to each element
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove("disabled");
  });
}

// function to start timer for the game
function gameTimer(){
  //set timer
    interval = setInterval(function () {
        timer.innerHTML = minutes + "mins " + seconds + "secs";
        seconds++;
        if(seconds == 60){
            minutes++;
            seconds = 0;
    }
  }, 1000);
}

// function to count game moves and set players rating
function movesCounter(){
    movesCount++;
    moves.innerHTML = movesCount;

    if(movesCount == 1){
        gameTimer();
    }
    rate = 3;

    // set rating
    if(movesCount >= 12 && movesCount <= 16){
        for(let i = 0; i < 3; i++){
            if(i == 2){
                stars[i].style.color = "#4f5051";
                rate = 2;
            }
        }
    }

    if(movesCount > 16){
        for(let i = 0; i < 3; i++){
            if(i == 1){
                stars[i].style.color = "#4f5051";
                rate = 1;
            }
        }
    }
}

// function to handle congratulations modal
function congratulations(){
    totalTime.innerHTML = minutes + " minutes and " + seconds + " seconds";
    totalMoves.innerHTML = moves.innerHTML;

    if(rate == 1){
        starRating.innerHTML = rate +" star!!! Good job!";
    }else if(rate == 2){
        starRating.innerHTML = rate +" stars!!! Great Job!";
    }
    else{
        starRating.innerHTML = rate +" stars!!! Awesome!!!";
    }

    modal.classList.add("show");

    againButton.addEventListener("click", function(){
        modal.classList.remove("show");
        gameReset();
    });
}

// adding event listeners
for (var i = 0; i < cards.length; i++){
    cardList = cards[i];
    cardList.addEventListener("click", displayCards);
    cardList.addEventListener("click", cardOpen);
};
