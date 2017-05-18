$(function () {
    // Player name
    var name = 'João';
    // Player bet
    var playerBet = 1000;
    // Player card
    var playerCard = 'A';
    // Game cards
    var gameCards;
    // Game odd
    var gameOdd;
    // Game Mode
    var gameMode = '1/13';
    switch (gameMode) {
        case '1/5':
            gameCards = ['10', 'J', 'Q', 'K', 'A'];
            gameOdd = 1.5;
            break;
        case '1/6':
            gameCards = ['9', '10', 'J', 'Q', 'K', 'A'];
            gameOdd = 2;
            break;
        case '1/7':
            gameCards = ['8', '9', '10', 'J', 'Q', 'K', 'A'];
            gameOdd = 2.5;
            break;
        case '1/8':
            gameCards = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
            gameOdd = 3;
            break;
        case '1/9':
            gameCards = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
            gameOdd = 3.5;
            break;
        case '1/10':
            gameCards = ['5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
            gameOdd = 4;
            break;
        case '1/11':
            gameCards = ['4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
            gameOdd = 4.5;
            break;
        case '1/12':
            gameCards = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
            gameOdd = 5;
            break;
        case '1/13':
            gameCards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
            gameOdd = 5.5;
            break;
        default:
            break;
    }

    // Game win card
    var winCard;
    // Game prize
    var prize;
    // Shuffle the array cards
    function shuffleCards() {
        gameCards.sort(function () {
            return 0.5 - Math.random();
        });
    }
    // Return random cards position
    function getRandomCardPosition(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // Return the card
    function getCard(min, max) {
        shuffleCards();
        var tempPosition = getRandomCardPosition(min, max);
        winCard = gameCards[tempPosition];
    }
    //Check if the player won the prize or not
    function checkPrize(min, max) {
        getCard(min, max);
        if (playerCard == winCard) {
            prize = gameOdd * playerBet;
            console.log('Congratulations ' + name + ', you won ' + prize + '€')
        } else {
            console.log('You lose, try again')
        }
    }
    checkPrize(0, gameCards.length - 1);
});