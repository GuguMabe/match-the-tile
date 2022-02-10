const UI = {
  angularCard1: document.querySelector(".angular-match1"),
  angularCard2: document.querySelector(".angular-match2"),
  aureliaCard1: document.querySelector(".aurelia-match1"),
  aureliaCard2: document.querySelector(".aurelia-match2"),
  vueCard1: document.querySelector(".vue-match1"),
  vueCard2: document.querySelector(".vue-match2"),
  backboneCard1: document.querySelector(".backbone-match1"),
  backboneCard2: document.querySelector(".backbone-match2"),
  reactCard1: document.querySelector(".react-match1"),
  reactCard2: document.querySelector(".react-match2"),
  emberCard1: document.querySelector(".ember-match1"),
  emberCard2: document.querySelector(".ember-match2"),
  settings: document.querySelector(".settings"),
  timer: document.querySelector("#timer"),
  cards: document.querySelectorAll(".memory-card"),
  moves: document.querySelector("#moves"),
};

let count = 0;
let activeCards;
let sec = 0;
let min = 0;
let firstCard, secondCard;
let flipped = false;
let lockBoard = false;
let finalTime;
let finalmoves;
let flips = 0;

UI.cards.forEach((card) => card.addEventListener("click", showCard));

function showCard(e) {
  let cardFace = e.target.childNodes[1];
  if (lockBoard) return;

  cardFace.classList.add("show");

  if (!flipped) {
    flipped = true;
    firstCard = cardFace;
    flips++;
    UI.moves.innerHTML = `${flips}`;

    return;
  }

  secondCard = cardFace;
  flips++;
  UI.moves.innerHTML = `${flips} moves`;

  checkMatch(cardFace);
}

function displayCards(cards) {
  cards.forEach((card) => {
    card.classList.remove("remove");
  });
}
function hideCards(cards) {
  cards.forEach((card) => {
    card.classList.add("remove");
  });
}

function adjustWidth(cards) {
  cards.forEach((card) => {
    card.style.width = "calc(50% - 10px)";
  });
}

function setTo2x2() {
  startTimer();
  activeCards = 4;
  UI.settings.classList.add("remove");
  displayCards([
    UI.angularCard2,
    UI.angularCard1,
    UI.aureliaCard1,
    UI.aureliaCard2,
  ]);
  hideCards([
    UI.vueCard1,
    UI.vueCard2,
    UI.emberCard1,
    UI.emberCard2,
    UI.reactCard1,
    UI.reactCard2,
    UI.backboneCard1,
    UI.backboneCard2,
  ]);
  adjustWidth([
    UI.angularCard2,
    UI.angularCard1,
    UI.aureliaCard1,
    UI.aureliaCard2,
  ]);
}

function setTo2x3() {
  startTimer();
  activeCards = 6;
  UI.settings.classList.add("remove");
  displayCards([
    UI.angularCard1,
    UI.angularCard2,
    UI.aureliaCard1,
    UI.aureliaCard2,
    UI.vueCard1,
    UI.vueCard2,
  ]);
  hideCards([
    UI.emberCard1,
    UI.emberCard2,
    UI.backboneCard1,
    UI.backboneCard2,
    UI.reactCard1,
    UI.reactCard2,
  ]);
  adjustWidth([
    UI.angularCard1,
    UI.angularCard2,
    UI.aureliaCard1,
    UI.aureliaCard2,
    UI.vueCard1,
    UI.vueCard2,
  ]);
}

function setTo3x4() {
  startTimer();
  activeCards = 12;
  UI.settings.classList.add("remove");
  displayCards([
    UI.angularCard1,
    UI.angularCard2,
    UI.aureliaCard1,
    UI.aureliaCard2,
    UI.vueCard1,
    UI.vueCard2,
    UI.emberCard1,
    UI.emberCard2,
    UI.backboneCard1,
    UI.backboneCard2,
    UI.reactCard1,
    UI.reactCard2,
  ]);
}

function on() {
  document.getElementById("overlay").style.display = "block";
}

function checkMatch() {
  if (firstCard.dataset.id === secondCard.dataset.id) {
    firstCard.removeEventListener("click", showCard);
    secondCard.removeEventListener("click", showCard);

    count++;

    if (activeCards === 6 && count === 3) {
      message();

      on();
    } else if (activeCards === 4 && count === 2) {
      message();

      on();
    } else if (count === 6) {
      message();

      on();
    }
    resetboard();
    return true;
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("show");
      secondCard.classList.remove("show");
      resetboard();
      return false;
    }, 1000);
  }
}

function message() {
  finalTime = UI.timer.innerHTML;
  document.getElementById("finaltime").innerHTML = finalTime;

  finalmoves = UI.moves.innerHTML;
  document.getElementById("finalmoves").innerHTML = finalmoves;
}

function startTimer() {
  setInterval(function () {
    UI.timer.innerHTML = `${min} minute/s and ${sec} second/s `;
    sec++;
    if (sec == 60) {
      min++;
      sec = 0;
    }
  }, 1000);
}

(function shuffleDeck() {
  UI.cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * UI.cards.length);
    card.style.order = randomPosition;
  });
})();

function resetboard() {
  [flipped, lockBoard] = [false, false][(firstCard, secondCard)] = [null, null];
}

module.exports = {
  showCard,
  setTo2x2,
  UI,
};

