function createCylinder(posX, index) {

    var geometry = new THREE.BoxGeometry(10, 0.2, 10);
    var material = new THREE.MeshBasicMaterial({
        color: "white"
    });

    var matArray = [];
    var texture = new THREE.TextureLoader().load('icons/7.jpg');
    matArray.push(new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide
    }));
    var texture = new THREE.TextureLoader().load('icons/banana.jpg');
    matArray.push(new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide
    }));
    var texture = new THREE.TextureLoader().load('icons/bar.jpg');
    matArray.push(new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide
    }));
    var texture = new THREE.TextureLoader().load('icons/cherry.jpg');
    matArray.push(new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide
    }));
    var texture = new THREE.TextureLoader().load('icons/lemon.jpg');
    matArray.push(new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide
    }));
    var texture = new THREE.TextureLoader().load('icons/bigwin.jpg');
    matArray.push(new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide
    }));
    var texture = new THREE.TextureLoader().load('icons/watermelon.jpg');
    matArray.push(new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide
    }));

    var ang = 0;

    for (var i = 0; i < 7; i++) {
        var face = new THREE.Mesh(geometry, matArray[i]);
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

        currentCA = 0;
        currentCB = 0;
        currentCC = 0;

        money -= bet;
        $("#playerMoney").html(money + "€");
        addLog("-------------------<br>");
        addLog("Bet: " + bet + "€<br>");
    }
}

function createModel() {
    var manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        // console.log(item, loaded, total);
    };
    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            // console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function (xhr) {
        console.error(xhr);
    };


    // var objectURL = "obj/xsi_man.fbx";
    var objectURL = 'obj/top.json';
    var objects = ["obj/top.json", "obj/machine.json", "obj/insideBox.json", "obj/keyboard.json", "obj/gameSign.json"];

    var slotMachine = new THREE.Object3D();

    for (var i = 0; i < objects.length; i++) {
        var loader = new THREE.JSONLoader();
        loader.load(objects[i], function (geometry, materials) {
            var mesh = new THREE.Mesh(geometry, materials);
            mesh.position.x = 0;
            mesh.position.y = 0;
            mesh.position.z = 0;
            slotMachine.add(mesh);

        });
    }
    slotMachine.rotation.y = Math.PI;
    scene.add(slotMachine);


}

function createButtons() {
    var geometry = new THREE.BoxGeometry(45, 30, 32);

    buttonA = new THREE.Mesh(geometry, makeTexture('icons/10cents.png'));
    buttonA.position.set(-55, -80, 68);
    buttonA.rotation.x = Math.PI / 4;
    buttonA.value = "0,5€";
    buttonA.objective = "button";

    buttonB = new THREE.Mesh(geometry, makeTexture('icons/20cents.png'));
    buttonB.position.set(0, -72, 75);
    buttonB.rotation.x = Math.PI / 4;
    buttonB.value = "1€";
    buttonB.objective = "button";

    buttonC = new THREE.Mesh(geometry, makeTexture('icons/50cents.png'));
    buttonC.position.set(55, -72, 75);
    buttonC.rotation.x = Math.PI / 4;
    buttonC.value = "2€";
    buttonC.objective = "button";


    scene.add(buttonA, buttonB, buttonC);
}

function createLever() {
    var geometry = new THREE.CylinderGeometry(40, 40, 70, 32);
    var material = new THREE.MeshPhongMaterial({
        color: "green"
    });
    var base = new THREE.Mesh(geometry, material);
    base.position.x = 270;
    base.rotation.z = Math.PI / 2;
    lever.add(base);

    var geometry = new THREE.CylinderGeometry(10, 10, 130, 32);
    var material = new THREE.MeshPhongMaterial({
        color: "blue"
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


    scene.add(lever)
}

function makeTexture(textureURL) {
    var texture = new THREE.TextureLoader().load(textureURL);
    texture.minFilter = THREE.LinearFilter;

    var matArray = [];
    matArray.push(new THREE.MeshPhongMaterial({
        color: "red"
    }));
    matArray.push(new THREE.MeshPhongMaterial({
        color: "red"
    }));
    matArray.push(new THREE.MeshBasicMaterial({
        map: texture
    }));
    matArray.push(new THREE.MeshPhongMaterial({
        color: "red"
    }));
    matArray.push(new THREE.MeshPhongMaterial({
        color: "red"
    }));
    matArray.push(new THREE.MeshPhongMaterial({
        color: "red"
    }));
    var faceMaterial = new THREE.MultiMaterial(matArray);

    return faceMaterial;
}

function checkPrize() {

    var preMoney = money;
    var prize = parseFloat(0);

    if (symbolA == symbolB && symbolB == symbolC) {
        console.log("All win", symbols[symbolA])
        switch (symbols[symbolA]) {
            case "BigWin":
                prize = parseFloat(bet * 100);
                break;
            case "Lemon" || "Cherry" || "Banana" || "Watermelon":
                prize = parseFloat(bet * 2);
                break;
            case "7":
                prize = parseFloat(bet * 50);
                break;
            case "Bar":
                prize = parseFloat(bet * 10);
        }
    } else if (symbolA == symbolB || symbolB == symbolC) {
        console.log("2 win", symbols[symbolB])
        switch (symbols[symbolB]) {
            case "BigWin":
                prize = parseFloat(bet * 10);
                break;
            case "Lemon":
            case "Cherry":
            case "Banana":
            case "Watermelon":
                prize = parseFloat(bet * 1);
                break;
            case "7":
                prize = parseFloat(bet * 5);
                break;
            case "Bar":
                prize = parseFloat(bet * 2);
        }
    } else if (symbolA == symbolC) {
        console.log("2 win", symbols[symbolA])
        switch (symbols[symbolA]) {
            case "BigWin":
                prize = parseFloat(bet * 10);
                break;
            case "Lemon":
            case "Cherry":
            case "Banana":
            case "Watermelon":
                prize = parseFloat(bet * 1);
                break;
            case "7":
                prize = parseFloat(bet * 5);
                break;
            case "Bar":
                prize = parseFloat(bet * 2);
        }
    }
    console.log(prize)
    money += prize;
    addLog("Symbols: " + symbols[symbolA] + " | " + symbols[symbolB] + " | " + symbols[symbolC] + "<br>");
    if (prize == 0) {
        addLog("Won: <span class='lose'>" + prize + "€</span><br>");
    } else if (prize > 0) {
        addLog("Won: <span class='win'>" + prize + "€</span><br>");
    }
    $("#playerMoney").html(money + "€");
}


function addLog(text) {
    var log = $("#logArea").html();
    log += text;
    $("#logArea").html(log);
    var textarea = document.getElementById('logArea');
    textarea.scrollTop = textarea.scrollHeight;
};