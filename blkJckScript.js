import {Card} from "./card.js";

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];

let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine',
                'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three',
                'Two', 'One'];

function Deck(){
        let deck = [];
        suits.forEach(suit =>
                values.forEach(value =>
                        deck.push(new Card(suit, value))
                ));

        return deck;
}

let deck = new Deck();

//DOM Variables
let textArea = document.getElementById('textArea'),
 winnerDisplay = document.getElementById('winnerDisplay');

let newGameButton = document.getElementById('newGameButton'),
 hitButton = document.getElementById('hitButton'),
 stayButton = document.getElementById('stayButton');

// Game Variables
let gameStarted = false, gameOver = false, 
playerWon = false;

let dealerCards = [], playerCards = [];

let dealerScore = 0, playerScore = 0;

hitButton.style.display = 'none';
stayButton.style.display = 'none';
//winnerDisplay.style.display = 'none'; since this display begins as empty, there's no need to not display it
showStatus();

newGameButton.addEventListener('click', function() {
        gameStarted = true;
        gameOver = false;
        playerWon = false;

        deck = new Deck();
        shuffleDeck(deck);
        dealerCards = [getNextCard(), getNextCard()];
        playerCards = [getNextCard(), getNextCard()];

        newGameButton.style.display = 'none';
        hitButton.style.display = 'inline';
        stayButton.style.display = 'inline';
        winnerDisplay.innerText = "";
        showStatus();
});

hitButton.addEventListener('click', function() {
        playerCards.push(getNextCard());
        checkForEndOfGame();
        showStatus();
});

stayButton.addEventListener('click', function(){
        gameOver = true;
        checkForEndOfGame();
        showStatus();
});

let shuffleDeck = (deck) => {
        for (let i = 0; i < deck.length; i++){
                let swapIdx = Math.trunc(Math.random() * deck.length);
                let tmp = deck[swapIdx];
                deck[swapIdx] = deck[i];
                deck[i] = tmp;
        }
}

function getScore(cardArray){
        let score = 0;
        let hasAce = false;
        cardArray.forEach(card =>{
                score += card.getCardNumericValue();
                if (card.value === 'Ace'){
                        hasAce = true;
                }
        });

        score = hasAce && score + 10 <= 21 ? (score + 10):score;
        return score;
}

let updateScores = () => {
        dealerScore = getScore(dealerCards);
        playerScore = getScore(playerCards);
}

function checkForEndOfGame(){
        updateScores();

        if (gameOver) {
                //let dealer take cards
                while (dealerScore < playerScore //dealer is losing
                        && playerScore <=21
                        && dealerScore <= 21){
                                dealerCards.push(getNextCard());
                                updateScores();
                        }
        }

        if (playerScore > 21){
                playerWon = false;
                gameOver = true;
        }
        else if(dealerScore > 21){
                playerWon = true;
                gameOver = true;
        }
        else if(gameOver){

                if (playerScore > dealerScore) {
                        playerWon = true;
                }
                else {
                        playerWon = false;
                }
        }
}

function showStatus(){
        if (!gameStarted) {
                textArea.innerText = "Welcome to BlkJck";
                return;
        }

        let dealerCardString = ' ';
        dealerCards.forEach(dealerCard => {
                dealerCardString += dealerCard.getCardString() + '\n';
        });
        let playerCardString = ' ';
        playerCards.forEach(playerCard => {
                playerCardString += playerCard.getCardString() + '\n';
        });
        updateScores();

        textArea.innerText =
        'Dealer has:\n' +
        dealerCardString +
        '(score:' + dealerScore + ')\n\n' +

        'Player has:\n' +
        playerCardString +
        '(score:' + playerScore + ')\n\n';

        if (gameOver) {
                if (playerWon) {
                        winnerDisplay.innerText += "You Won!";
                }
                else {
                        winnerDisplay.innerText += "Dealer Won!";
                }

                newGameButton.style.display = 'inline';
                hitButton.style.display = 'none';
                stayButton.style.display = 'none';
        }
}

let getNextCard = () => {
        return deck.shift();
}