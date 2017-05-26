function createCylinder(posX, index) {

    var geometry = new THREE.BoxGeometry(10, 0.2, 10);
    geometry.computeVertexNormals();
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
        face.geometry.verticesNeedUpdate = true;
        face.geometry.matrixWorldNeedsUpdate = true;
        face.rotation.x = ang;
        if (i == 0) {
            face.position.z = 0.02;
            face.position.y = -10.3;
            face.symbol = "7";
        } else if (i == 1) {
            face.position.z = -8.01;
            face.position.y = -6.4;
            face.symbol = "banana";
        } else if (i == 2) {
            face.position.z = -10;
            face.position.y = 2.3;
            face.symbol = "bar";
        } else if (i == 3) {
            face.position.z = -4.41;
            face.position.y = 9.3;
            face.symbol = "cherry";
        } else if (i == 4) {
            face.position.z = 4.52;
            face.position.y = 9.3;
            face.symbol = "lemon";
        } else if (i == 5) {
            face.position.z = 10.11;
            face.position.y = 2.3;
            face.symbol = "bigwin";
        } else if (i == 6) {
            face.position.z = 8.12;
            face.position.y = -6.4;
            face.symbol = "watermelon";
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
    if(symbolC >= 21)
    {
        symbolC -= 21;
    }
    else if (symbolC >= 14) {
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

function copyVector() {
    var copyVectors = []
    var faceDown = []
    for (var i = 0; i < 8; i++) {
        var vector = new THREE.Vector3();
        vector.copy(cylinderA.children[0].geometry.vertices[i]);
        vector.applyMatrix4(cylinderA.children[1].geometry.matrix);
        copyVectors.push(vector)
    }
    for (var j = 0; j < copyVectors.length; j++) {
        var pos = copyVectors[j].y
        if (pos.toFixed(0) == -10) {
            faceDown.push([j])
        }
    }

    checkVertice(parseInt(faceDown[0]), parseInt(faceDown[1]), parseInt(faceDown[2]), parseInt(faceDown[3]))

}