'use strict';

var cardsArray = [{
    'name': 'card1',
    'img': 'image/card1.png'
}, {
    'name': 'card2',
    'img': 'image/card2.png'
}, {
    'name': 'card3',
    'img': 'image/card3.png'
}, {
    'name': 'card4',
    'img': 'image/card4.png'
}, {
    'name': 'card5',
    'img': 'image/card5.png'
}, {
    'name': 'card6',
    'img': 'image/card6.png'
}];

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
    return 0.5 - Math.random();
});

var firstGuess = '';
var secondGuess = '';
var count = 0;
var matched = 0;
var allowClick = false;
var previousTarget = null;
var delay = 500;
var second = 15;
var maxTime = 15;
var interval;

var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
    var name = item.name,
        img = item.img;


    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;

    var front = document.createElement('div');
    front.classList.add('front');

    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = 'url(' + img + ')';

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
});

var match = function match() {
    var selected = document.querySelectorAll('.selected');
    selected.forEach(function (card) {
        card.classList.add('match');
    });
    matched++;
    console.log(matched);

    if (matched === 6) {
        EndGame();
    }
};

var resetGuesses = function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    selected.forEach(function (card) {
        card.classList.remove('selected');
    });
};

grid.addEventListener('click', function (event) {

    var clicked = event.target;

    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match') || allowClick === false) {
        return;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            // console.log(firstGuess);
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            // console.log(secondGuess);
            clicked.parentNode.classList.add('selected');
        }

        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
            }
            setTimeout(resetGuesses, delay);
        }
        previousTarget = clicked;
    }
});

// Start Game
var start_btn = document.getElementById("start");

start_btn.addEventListener('click', function (event) {
    CountDown();
    allowClick = true;
});

// Timer
var timer = document.querySelector(".timer");

function CountDown() {
    interval = setInterval(function () {
        second--;
        timer.innerHTML = second;
        console.log(second);

        if (second === 0) {
            allowClick = false;
            clearInterval(interval);
            EndGame();
        }
    }, 1000);
}

// Modal
var modal = document.getElementById("popup1");
var totalTime = document.getElementById("totalTime");
var finalScore = document.getElementById("score");
var timePLay = maxTime - second;

function EndGame() {
    modal.classList.add("show");
    totalTime.innerHTML = timePLay;
    finalScore.innerHTML = matched;
}


// @description close icon on modal
let closeicon = document.querySelector(".close");
closeicon.addEventListener("click", function (e) {
    modal.classList.remove("show");
    location.reload();
});