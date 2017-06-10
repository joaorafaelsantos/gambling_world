var table;
var gameCards = [];
var gameCardsOriginal = [];
var gameMode;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var scene;
var camera;
var renderer;
var cards;
var miniCards;
var name;
var probability;
var rWidth, rHeight;
var money = 0;
var sliderMaxValue = 0;
var userBet = 1;
var oddForm = 0;
var prize = 0;
var betted = false;


var soundWin = new Audio('sounds/win.wav');
var soundLose = new Audio('sounds/lose.wav');
var soundSelect = new Audio('sounds/select.wav');
var soundCards = new Audio('sounds/cards.wav');

Audio.prototype.stop = function () {
    this.pause();
    this.currentTime = 0;
};


function restoreLocalStorage() {
    players = [];
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var y = JSON.parse(localStorage.getItem(key));
        players.push(y);
    }
}
if (localStorage.length != 0) {
    restoreLocalStorage();
}

// Save on localstorage
function saveLocalStorage() {
    // Check browser support
    if (typeof (Storage) !== "undefined") {
        // Store
        for (var i = 0; i < players.length; i++) {
            localStorage.setItem(i.toString(), JSON.stringify(players[i]));
        }
    } else {
        console.log("Error", "Sorry, your browser does not support Web Storage...", "error");
    }
}

// window.onload = function init() {
$(function () {

    $("#btnBack").click(function () {
        window.open("../../../index.html", "_self");
    });

    var arrayPlayerPosition = 0;
    for (var i = 0; i < players.length; i++) {
        var tempPlayer = players[i];
        var tempDate = new Date().getTime() / 1000;
        if (tempDate - tempPlayer.timestamp <= 10) {
            arrayPlayerPosition = i;
            name = tempPlayer.name;
            money = tempPlayer.money;
            sliderMaxValue = money;
            probability = tempPlayer.probability;
            $("#name").text(name);
            $("#money").text(money + " EUR");
        }
    }

    $("#betSlider").slider({
        min: 1,
        max: sliderMaxValue,
        value: 1,
    });

    $("#betSlider").on("slide", function (slideEvt) {
        $("#betSliderValue").text(slideEvt.value);
    });

    //scene
    scene = new THREE.Scene();

    //camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 200);
    // position and point the camera to the center of the scene
    camera.position.set(0, 100, 0);
    camera.lookAt(scene.position);

    //renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    rWidth = $("#canvas-container").width();
    rHeight = window.innerHeight / (window.innerWidth / $("#canvas-container").width());
    renderer.setSize(rWidth, rHeight);
    // scene.background = new THREE.Color(0x284117);

    //show canvas
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    var firstTime = true;
    $("#btnPlay").click(function () {
        if (firstTime) {
            $('#betSlider').slider('disable');
            soundCards.play();
            userBet = parseFloat($("#betSliderValue").text());
            money = (money - userBet);
            $("#money").text(money + " EUR");
            firstTime = !firstTime;
            $("#btnPlay").remove();
            $("#btnBack").after(" <button id='btnPlayAgain' class='btn btn-success btn-sm' disabled>PLAY AGAIN</button>");
            createCards(probability);
            createMiniCards();
        }
    });
    createTable();



    //render scene
    var render = function () {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };
    render();

    function createTable() {
        table = new THREE.Object3D();
        var geometry = new THREE.BoxGeometry(165, 0.5, 80);
        var material = new THREE.MeshBasicMaterial({
            color: 0x284117
        });
        var tableMesh = new THREE.Mesh(geometry, material);
        tableMesh.position.set(0, -0.78, 0);
        table.add(tableMesh);
        scene.add(table);
    }

    function createCards(probability) {
        cards = new THREE.Object3D();
        var loader = new THREE.TextureLoader();
        var geometry = new THREE.BoxGeometry(18, 0.5, 25);
        var textures = [];
        var backCardTexture = loader.load('cards/back.png');
        backCardTexture.minFilter = THREE.LinearFilter;
        var frontMaterial = new THREE.MeshBasicMaterial({
            map: backCardTexture
        });
        var borderMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000
        });
        gameChooser(probability);
        gameCardsOriginal = gameCards.slice();
        shuffleCards(gameCards);
        for (var i = 0; i < gameCards.length; i++) {
            var tempTexture = loader.load('cards/' + gameCards[i] + '.png');
            tempTexture.minFilter = THREE.LinearFilter;
            textures.push(tempTexture);
        }
        var cardMesh = [];
        var pos = -50;
        for (var i = 0; i < 5; i++) {
            var tempTexture = textures[i];
            var backMaterial = new THREE.MeshBasicMaterial({
                map: tempTexture
            });
            var materials = [borderMaterial, // Left side
                borderMaterial, // Right side
                frontMaterial, // Top side
                backMaterial, // Bottom side
                borderMaterial, // Front side
                borderMaterial // Back side
            ];
            var tempCardMesh = new THREE.Mesh(geometry, materials);
            tempCardMesh.position.set(pos, -0.5, -15);
            pos += 25;
            tempCardMesh.card = gameCards[i];
            cardMesh.push(tempCardMesh);
            cards.add(tempCardMesh);
        }
        scene.add(cards);
    }

    function createMiniCards() {
        miniCards = new THREE.Object3D();
        var loader = new THREE.TextureLoader();
        var geometry = new THREE.BoxGeometry(10, 0.5, 15);
        var textures = [];
        var backCardTexture = loader.load('cards/back.png');
        backCardTexture.minFilter = THREE.LinearFilter;
        var frontMaterial = new THREE.MeshBasicMaterial({
            map: backCardTexture
        });
        var borderMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000
        });
        for (var i = 0; i < gameCardsOriginal.length; i++) {
            var tempTexture = loader.load('cards/' + gameCardsOriginal[i] + '.png');
            tempTexture.minFilter = THREE.LinearFilter;
            textures.push(tempTexture);
        }
        var cardMesh = [];
        var value = probability.split('/');
        value = value[1]
        var pos = (-65 * value) / 13;
        for (var i = 0; i < value; i++) {
            var tempTexture = textures[i];
            var backMaterial = new THREE.MeshBasicMaterial({
                map: tempTexture
            });
            var materials = [borderMaterial, // Left side
                borderMaterial, // Right side
                backMaterial, // Top side
                frontMaterial, // Bottom side
                borderMaterial, // Front side
                borderMaterial // Back side
            ];
            var tempCardMesh = new THREE.Mesh(geometry, materials);
            tempCardMesh.position.set(pos, -0.5, 20);
            pos += 11;
            tempCardMesh.card = gameCardsOriginal[i];
            cardMesh.push(tempCardMesh);
            miniCards.add(tempCardMesh);
        }
        scene.add(miniCards);
    }

    // Game Mechanic
    var tempProbability = probability;
    if (probability.length == 4) {
        tempProbability = probability[2] + probability[3];
    } else {
        tempProbability = probability[2];
    }
    var formProbability = ((1.5 * tempProbability) / 2) * 5;


    function gameChooser(gameMode) {
        var tempOdd = gameMode.split("/");
        oddForm = ((parseFloat(tempOdd[1]) * 1.50) / 2) * (parseFloat(tempOdd[1]) - 4);
        switch (gameMode) {
            case '1/5':
                gameCards = ['10', 'J', 'Q', 'K', 'A'];
                break;
            case '1/6':
                gameCards = ['9', '10', 'J', 'Q', 'K', 'A'];
                break;
            case '1/7':
                gameCards = ['8', '9', '10', 'J', 'Q', 'K', 'A'];
                break;
            case '1/8':
                gameCards = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
                break;
            case '1/9':
                gameCards = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
                break;
            case '1/10':
                gameCards = ['5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
                break;
            case '1/11':
                gameCards = ['4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
                break;
            case '1/12':
                gameCards = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
                break;
            case '1/13':
                gameCards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
                break;
            default:
                break;
        }
    };

    // Shuffle the array cards
    function shuffleCards(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    var cardsLock = false;
    var miniCardsLock = false;
    var lock = false;
    var card;
    var miniCard;

    function onMouseClick(event) {

        if (!firstTime) {
            // calculate mouse position in normalized device coordinates
            // (-1 to +1) for both components

            mouse.x = (event.clientX / rWidth) * 2 - 1;
            mouse.y = -(event.clientY / rHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            // calculate objects intersecting the picking ray
            var intersects = raycaster.intersectObjects(scene.children[1].children);
            var intersects2 = raycaster.intersectObjects(scene.children[2].children);


            if (!cardsLock && miniCardsLock) {
                if (intersects.length > 0 && intersects[0].object.type == "Mesh") {
                    card = intersects[0].object.card;
                    var tempCards = scene.children[1].children;
                    for (var i = 0; i < tempCards.length; i++) {
                        if (tempCards[i].card == card) {
                            tempCards[i].rotation.z = Math.PI;
                            tempCards[i].rotation.y = Math.PI;
                        }
                    }
                    cardsLock = !cardsLock;
                }
            }
            if (!miniCardsLock) {
                if (intersects2.length > 0 && intersects2[0].object.type == "Mesh") {
                    soundSelect.play();
                    miniCard = intersects2[0].object.card;
                    var tempMiniCards = scene.children[2].children;
                    for (var i = 0; i < tempMiniCards.length; i++) {
                        if (tempMiniCards[i].card != miniCard) {
                            tempMiniCards[i].rotation.z = Math.PI;
                            tempMiniCards[i].rotation.y = Math.PI;
                        }
                    }
                    miniCardsLock = !miniCardsLock;
                }
            }

            if (cardsLock && miniCardsLock && !lock) {
                if (card == miniCard) {
                    soundWin.play();
                    prize = oddForm.toFixed(2) * userBet;
                    money = (money + prize).toFixed(2);

                    if (money <= 100 && money >= 1) {
                        sliderMaxValue = money;
                    } else if (money > 100) {
                        sliderMaxValue = money;
                    }

                    $("#betSlider").slider({
                        min: 1,
                        max: sliderMaxValue,
                        value: 1,
                    });

                    players[arrayPlayerPosition].money = money.toFixed(2);
                    saveLocalStorage();

                    $("#money").text(money + " EUR");
                    lock = true;
                    var content = "<h5 class='label label-success'>CONGRATULATIONS, YOU WIN " + prize + " EUR !!!</h5><br><br>"
                    $("#listLog").append(content);
                    $("#btnPlayAgain").prop('disabled', false);
                    $("#btnClear").prop('disabled', false);
                    $('#betSlider').slider('enable');
                    userBet = 1;
                    $("#betSliderValue").text(userBet);
                    if (betted == true) {
                        betted = !betted;
                    }
                } else {
                    soundLose.play();
                    if (money <= 100 && money >= 1) {
                        sliderMaxValue = money;
                    } else if (money > 100) {
                        sliderMaxValue = money;
                    } else if (money <= 0) {
                        money = 1;
                        sliderMaxValue = money;
                    }

                    $("#betSlider").slider({
                        min: 1,
                        max: sliderMaxValue,
                        value: 1,
                    });

                    players[arrayPlayerPosition].money = money.toFixed(2);
                    saveLocalStorage();


                    $("#money").text(money + " EUR");
                    lock = true;
                    var content = "<h5 class='label label-danger'>LOSE, TRY AGAIN !</h5><br><br>"
                    $("#listLog").append(content);
                    $("#btnPlayAgain").prop('disabled', false);
                    $("#btnClear").prop('disabled', false);
                    $('#betSlider').slider('enable');
                    userBet = 1;
                    $("#betSliderValue").text(userBet);
                    if (betted == true) {
                        betted = !betted;
                    }
                }
            }

            function restartGame() {
                soundCards.play();
                var tempCards = scene.children[1].children;
                var tempMiniCards = scene.children[2].children;
                for (var i = 0; i < tempCards.length; i++) {
                    if (tempCards[i].card == card) {
                        tempCards[i].rotation.z = Math.PI * 2;
                        tempCards[i].rotation.y = Math.PI * 2;
                    }
                    tempCards[i].position.x = 0;
                }
                for (var i = 0; i < tempMiniCards.length; i++) {
                    if (tempMiniCards[i].card != miniCard) {
                        tempMiniCards[i].rotation.z = Math.PI * 2;
                        tempMiniCards[i].rotation.y = Math.PI * 2;
                    }
                }

                function createAgain() {
                    // Delete scene (cards and mini cards)
                    for (var i = 0; i < 2; i++) {
                        scene.remove(scene.children[1]);
                    }

                    // Create cards and mini cards
                    createCards(probability)
                    createMiniCards();

                    //Lock cards and mini cards
                    cardsLock = false;
                    miniCardsLock = false;
                    lock = false

                    $("#btnPlayAgain").prop('disabled', true);
                }
                setTimeout(createAgain, 750);
            }
            $("#btnPlayAgain").click(function () {
                $('#betSlider').slider('disable');
                soundWin.stop();
                soundLose.stop();
                if (!betted) {
                    userBet = parseFloat($("#betSliderValue").text());
                    money = (money - userBet);
                    betted = true;
                }

                $("#money").text(money + " EUR");
                restartGame();
            });
            $("#btnClear").click(function () {
                $("#listLog").empty();
            });
        }

    }


    window.addEventListener('mousedown', onMouseClick, false);

});