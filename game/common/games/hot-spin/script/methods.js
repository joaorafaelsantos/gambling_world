function createCylinder(posX, index) {

    var geometry = new THREE.BoxGeometry(10, 0.2, 10);

    var textures = ['img/icons/7.jpg', 'img/icons/banana.jpg', 'img/icons/bar.jpg', 'img/icons/cherry.jpg', 'img/icons/lemon.jpg', 'img/icons/bigwin.jpg', 'img/icons/watermelon.jpg'];

    var ang = 0;

    for (var i = 0; i < 7; i++) {
        var face = new THREE.Mesh(geometry, makeTexture(textures[i]));
        face.rotation.x = ang;
        if (i == 0) {
            face.position.z = 0.02;
            face.position.y = -10.3;
        } else if (i == 1) {
            face.position.z = -8.01;
            face.position.y = -6.4;
        } else if (i == 2) {
            face.position.z = -10;
            face.position.y = 2.3;
        } else if (i == 3) {
            face.position.z = -4.41;
            face.position.y = 9.3;
        } else if (i == 4) {
            face.position.z = 4.52;
            face.position.y = 9.3;
        } else if (i == 5) {
            face.position.z = 10.11;
            face.position.y = 2.3;
        } else if (i == 6) {
            face.position.z = 8.12;
            face.position.y = -6.4;
        }

        ang += (Math.PI * 2) / 7;

        if (index == 0) {
            cylinderA.add(face);
        } else if (index == 1) {
            cylinderB.add(face);
        } else if (index == 2) {
            cylinderC.add(face);
        }



    }

    if (index == 0) {
        cylinderA.position.x = posX;
        cylinderA.rotation.x = 0.2;
        allCylinders.add(cylinderA);
    } else if (index == 1) {
        cylinderB.position.x = posX;
        cylinderB.rotation.x = 0.2;
        allCylinders.add(cylinderB);
    } else if (index == 2) {
        cylinderC.position.x = posX;
        cylinderC.rotation.x = 0.2;
        allCylinders.add(cylinderC);

    }




}

function startSlotMachine() {
    if (runningCC == false) {
        if (money >= bet) {
            var rndA = Math.round(Math.random() * (7));

            var rndB = Math.round(Math.random() * (7));
            var rndC = Math.round(Math.random() * (7));

            symbolA = rndA + 1;
            symbolB = rndA + rndB + 2;
            symbolC = rndA + rndB + rndC + 3;

            rotationCA = (Math.PI * 2) * 3 + (Math.PI * 2 / 7 * rndA + 1) + 0.1;
            rotationCB = rotationCA + (Math.PI * 2 / 7 * rndB + 1) - 0.1;
            rotationCC = rotationCB + (Math.PI * 2 / 7 * rndC + 1) - 0.1;

            if (symbolA >= 7) {
                symbolA -= 7;
            }

            if (symbolB >= 14) {
                symbolB -= 14;
            } else if (symbolB >= 7) {
                symbolB -= 7;
            }
            if (symbolC >= 21) {
                symbolC -= 21;
            } else if (symbolC >= 14) {
                symbolC -= 14;
            } else if (symbolC >= 7) {
                symbolC -= 7;
            }


            runningCA = true;
            runningCB = true;
            runningCC = true;
            runLever = true;
            sideLever = true;

            currentCA = 0;
            currentCB = 0;
            currentCC = 0;

            $("input[type=radio]").prop("disabled", true);

            money -= bet;
            $("#playerMoney").html(money + "€");
            addLog("-------------------<br>");
            addLog("Bet: " + bet + "€<br>");
            sound_Running.currentTime = 0;
            sound_Running.play();
        } else {
            addLog("-------------------<br>");
            addLog("<span class='lose'> Insufficient money for bet! </span><br>");
        }

    }
}

function createMachine() {
    var geometry = new THREE.BoxGeometry(475, 900, 100);
    var texture = new THREE.TextureLoader().load('img/body.png');
    texture.minFilter = THREE.LinearFilter;
    var frontMaterial = new THREE.MeshPhongMaterial({
        map: texture
    });
    var backMaterial = new THREE.MeshPhongMaterial({
        color: "gray"
    });
    var materials = [backMaterial, // Left side
        backMaterial, // Right side
        backMaterial, // Top side
        backMaterial, // Bottom side
        frontMaterial, // Front side
        backMaterial // Back side
    ];
    var box = new THREE.Mesh(geometry, materials);
    box.castShadow = true;

    scene.add(box);



    var geometry = new THREE.BoxGeometry(400, 125, 50);
    var backMaterial = new THREE.MeshPhongMaterial({
        color: "gray"
    });


    //PANEL
    var texture = new THREE.TextureLoader().load('img/hot-spin.png');
    texture.minFilter = THREE.LinearFilter;
    var frontMaterial = new THREE.MeshPhongMaterial({
        map: texture
    });

    var materials = [backMaterial, // Left side
        backMaterial, // Right side
        backMaterial, // Top side
        backMaterial, // Bottom side
        frontMaterial, // Front side
        backMaterial // Back side
    ];
    var panel = new THREE.Mesh(geometry, materials);
    panel.position.set(0, 220, 30);
    scene.add(panel);

}

function createBackground() {
    var geometry = new THREE.BoxGeometry(2000, 1000, 1);
    var texture = new THREE.TextureLoader().load('img/background.jpg');
    texture.minFilter = THREE.LinearFilter;
    var frontMaterial = new THREE.MeshPhongMaterial({
        map: texture
    });
    var backMaterial = new THREE.MeshPhongMaterial({
        color: "gray"
    });
    var materials = [backMaterial, // Left side
        backMaterial, // Right side
        backMaterial, // Top side
        backMaterial, // Bottom side
        frontMaterial, // Front side
        backMaterial // Back side
    ];
    var background = new THREE.Mesh(geometry, materials);
    background.position.set(0, 0, -50);
    background.receiveShadow = true;
    scene.add(background);
}

function createLever() {
    var geometry = new THREE.CylinderGeometry(40, 40, 70, 32);
    var material = new THREE.MeshPhongMaterial({
        color: "black"
    });
    var base = new THREE.Mesh(geometry, material);
    base.position.x = 270;
    base.rotation.z = Math.PI / 2;
    lever.add(base);

    var geometry = new THREE.CylinderGeometry(10, 10, 130, 32);
    var material = new THREE.MeshPhongMaterial({
        color: "gray"
    });
    var arm = new THREE.Mesh(geometry, material);
    arm.position.x = 270;
    arm.position.y = 100;
    lever.add(arm);

    var geometry = new THREE.SphereGeometry(25, 32, 32);
    var material = new THREE.MeshPhongMaterial({
        color: "red"
    });
    var ball = new THREE.Mesh(geometry, material);
    ball.position.x = 270;
    ball.position.y = 170;
    ball.objective = "lever";
    lever.add(ball);
    lever.castShadow = true;


    scene.add(lever)
}

function makeTexture(textureURL) {
    var texture = new THREE.TextureLoader().load(textureURL);
    texture.minFilter = THREE.LinearFilter;

    var sideMaterial = new THREE.MeshPhongMaterial({
        color: "white"
    });

    var frontMaterial = new THREE.MeshPhongMaterial({

        map: texture
    });

    var matArray = [sideMaterial, sideMaterial, sideMaterial, frontMaterial, sideMaterial, sideMaterial];


    return matArray;
}

function checkPrize() {

    var preMoney = money;
    var prize = parseFloat(0);

    if (symbolA == symbolB && symbolB == symbolC) {
        switch (symbols[symbolA]) {
            case "BigWin":
                prize = parseFloat(bet * 100);
                sound_BIGWIN.currentTime = 0;
                sound_BIGWIN.play();
                break;
            case "Lemon":
            case "Cherry":
            case "Banana":
            case "Watermelon":
                prize = parseFloat(bet * 2);
                sound_3Win.currentTime = 0;
                sound_3Win.play();
                break;
            case "7":
                prize = parseFloat(bet * 50);
                sound_BIGWIN.currentTime = 0;
                sound_BIGWIN.play();
                break;
            case "Bar":
                prize = parseFloat(bet * 10);
                sound_3Win.currentTime = 0;
                sound_3Win.play();

        }
    } else if (symbolA == symbolB || symbolB == symbolC) {
        switch (symbols[symbolB]) {
            case "BigWin":
                prize = parseFloat(bet * 10);
                sound_Win.currentTime = 0;
                sound_Win.play();
                break;
            case "Lemon":
            case "Cherry":
            case "Banana":
            case "Watermelon":
                prize = parseFloat(bet * 1);
                sound_Win.currentTime = 0;
                sound_Win.play();
                break;
            case "7":
                prize = parseFloat(bet * 5);
                sound_Win.currentTime = 0;
                sound_Win.play();
                break;
            case "Bar":
                prize = parseFloat(bet * 2);
                sound_Win.currentTime = 0;
                sound_Win.play();
        }
    } else if (symbolA == symbolC) {
        switch (symbols[symbolA]) {
            case "BigWin":
                prize = parseFloat(bet * 10);
                sound_Win.currentTime = 0;
                sound_Win.play();
                break;
            case "Lemon":
            case "Cherry":
            case "Banana":
            case "Watermelon":
                prize = parseFloat(bet * 1);
                sound_Win.currentTime = 0;
                sound_Win.play();
                break;
            case "7":
                prize = parseFloat(bet * 5);
                sound_Win.currentTime = 0;
                sound_Win.play();
                break;
            case "Bar":
                prize = parseFloat(bet * 2);
                sound_Win.currentTime = 0;
                sound_Win.play();
        }
    }
    money += prize;
    addLog("Symbols: " + symbols[symbolA] + " | " + symbols[symbolB] + " | " + symbols[symbolC] + "<br>");

    if (prize == 0) {
        addLog("Won: <span class='lose'>" + prize + "€</span><br>");
        sound_Lose.currentTime = 0;
        sound_Lose.play();
    } else if (prize > 0) {
        addLog("Won: <span class='win'>" + prize + "€</span><br>");
    }

    // JOÃO UPDATE
    players[arrayPlayerPosition].money = money;
    saveLocalStorage();
    // END OF JOÃO UPDATE
    $("#playerMoney").html(money + "€");
    $("input[type=radio]").prop("disabled", false);
    players[arrayPlayerPosition].money = money;
    saveLocalStorage();
}

function addLog(text) {
    var log = $("#logArea").html();
    log += text;
    $("#logArea").html(log);
    var textarea = document.getElementById('logArea');
    textarea.scrollTop = textarea.scrollHeight;
};

function simulateBIGWIN() {
    symbolA = 0;
    symbolB = 0;
    symbolC = 0;
    cylinderA.rotation.x = 0.2;
    cylinderB.rotation.x = 0.2;
    cylinderC.rotation.x = 0.2;
    addLog("-------------------<br>");
    addLog("Bet: " + bet + "€<br>");
    checkPrize();
}

<<<<<<< HEAD
// function restoreLocalStorage(callback) {
//     players = [];
//     for (var i = 0; i < localStorage.length; i++) {
//         var key = localStorage.key(i);
//         var y = JSON.parse(localStorage.getItem(key));
//         players.push(y);
//     }
// 	console.log(players)
//     console.log(localStorage)
//     callback();
// }
=======
function restoreLocalStorage(callback) {
    players = [];
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var y = JSON.parse(localStorage.getItem(key));
        players.push(y);
    }
    callback();
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
>>>>>>> origin/master
