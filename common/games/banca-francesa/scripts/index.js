window.onload = function () {

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-31289553-1']);
    _gaq.push(['_trackPageview']);

    (function () {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') +
            '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    })();
    var soundIntro = new Audio("sounds/intro.wav")
    var soundDice = new Audio("sounds/dices.wav")
    var soundWin = new Audio("sounds/win.wav")
    var soundLose = new Audio("sounds/lose.wav")
    var arrayPlayerPosition = 0;
    //var players = [];

    var f1 = 0,
        f2 = 0,
        f3 = 0,
        f4 = 0,
        f5 = 0,
        f6 = 0;
    var camera, cameraFov = 70,
        cameraTop, cameraAtive = true,
        scene, renderer, mesh, helper2, geometry;
    var money, bet, typeOfGambler, rest

    var initScene, render2, ground, ground_material, chair_material, light;
    var animacao = true,
        premio = false,
        soma = 0,
        abertura = 0;
    var table, table2, table2_material, table_material, wall, wall_material, ground2, ground2_material

    var dados = [];
    var playerMoneyAposta = 5
    var tipoAposta = "Pequeno";
    var stopped = false;

    if (localStorage.length != 0) {
        restoreLocalStorage();
    }


    for (var i = 0; i < players.length; i++) {
        var tempPlayer = players[i];

        var tempDate = new Date().getTime() / 1000;
        if (tempDate - tempPlayer.timestamp <= 10) {
            arrayPlayerPosition = i;
            name = tempPlayer.name;
            money = tempPlayer.money;
            if (money < 0) {
                money = 0;
            }
            if (money < 0.5) {
                addLog("-------------------<br>");
                addLog("<span class='lucky'>You just found 1€ in the floor, lucky you!</span><br>");
                addLog("Won: <span class='win'>1€</span><br>");
                money += 1;
            }
            $("#playerName").html(name);
            $("#playerMoney").html(money + "€");
        }
    }



    var faces = [{
            "f1": [1, 3, 4, 6]
        },
        {
            "f2": [2, 3, 6, 7]
        },
        {
            "f3": [4, 5, 6, 7]
        },
        {
            "f4": [0, 2, 5, 7]
        },
        {
            "f5": [0, 1, 4, 5]
        },
        {
            "f6": [0, 1, 2, 3]
        }

    ]

    'use strict';
    Physijs.scripts.worker = 'scripts/physijs_worker.js';
    Physijs.scripts.ammo = 'ammo.js';
    init()
    // setup to render scene
    function init() {


        renderer = new THREE.WebGLRenderer({
            antilias: true
        });
        renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);



        // configure renderer clear color
        renderer.setClearColor("#e4e0ba");

        // add the output of the renderer to the DIV with id "world"
        document.getElementById('dice').appendChild(renderer.domElement);



        scene = new Physijs.Scene;
        scene.setGravity(new THREE.Vector3(0, -50, 0));
        scene.addEventListener(
            'update',
            function () {
                scene.simulate(undefined, 2);

            }
        );

        camera = new THREE.PerspectiveCamera(cameraFov, (window.innerWidth * 0.5) / (window.innerHeight * 0.5), 0.1, 1000);

        camera.position.set(350, 200, 0);
        camera.lookAt(scene.position);
        renderer.render(scene, camera);

        cameraTop = new THREE.PerspectiveCamera(20, (window.innerWidth * 0.5) / (window.innerHeight * 0.5), 0.1, 1000);
        cameraTop.position.set(10, 470, 0);
        cameraTop.lookAt(scene.position);

        // controls = new THREE.OrbitControls(camera);
        // controls.addEventListener('change', function () {
        //     renderer.render(scene, camera);
        // });



        scene.add(camera);

        // Light
        light = new THREE.DirectionalLight(0xFFFFFF);
        light.position.set(20, 40, -15);
        light.target.position.copy(scene.position);
        light.castShadow = true;
        light.shadowCameraLeft = -60;
        light.shadowCameraTop = -60;
        light.shadowCameraRight = 60;
        light.shadowCameraBottom = 60;
        light.shadowCameraNear = 20;
        light.shadowCameraFar = 200;
        light.shadowBias = -.0001
        light.shadowMapWidth = light.shadowMapHeight = 2048;
        light.shadowDarkness = .7;
        scene.add(light);



        // Materials
        table2_material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0x421414
            }),
            .8, // high friction
            .8 // low restitution
        );


        ground_material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0x004c0f
            }),
            .8, // high friction
            .8 // low restitution
        );



        wall_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture('img/wall3.jpg')
            }),
            .8, // high friction
            .8 // low restitution
        );


        wall_material.map.wrapS = wall_material.map.wrapT = THREE.RepeatWrapping;
        wall_material.map.repeat.set(10, 10);
        ground2_material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0x0033
            }),
            .8, // high friction
            .8 // low restitution
        );

        //wall
        wall = new Physijs.BoxMesh(
            new THREE.CubeGeometry(6000, 3000, 1), wall_material, 0

        );
        wall.receiveShadow = true;
        wall.position.y = -100
        wall.position.x = -30
        wall.position.z = 300
        wall.rotation.y = Math.PI / 2
        wall.receiveShadow = true;
        wall.castShadow = true;
        scene.add(wall)

        // ground
        ground2 = new Physijs.CylinderMesh(
            new THREE.CubeGeometry(3033, 3033, 1), ground2_material, 0


        );;
        ground2.receiveShadow = true;
        ground2.position.y = -100
        ground2.position.x = -40
        ground2.rotation.x = Math.PI / 2

        scene.add(ground2);





        // Ground
        ground = new Physijs.CylinderMesh(
            new THREE.CylinderGeometry(200, 200, 0.1, 32, 1, false, 0, 3.2),
            ground_material,
            0 // mass
        );;
        ground.receiveShadow = true;
        ground.castShadow = true;
        ground.position.y = 0
        ground.position.x = -40

        scene.add(ground);

        table2 = new Physijs.CylinderMesh(
            new THREE.CylinderGeometry(198, 205, 5, 32, 1, true, 0, 3.2),
            table2_material,
            0 // mass
        );;
        table2.receiveShadow = true;
        table2.position.y = -2.5
        table2.position.x = -40

        scene.add(table2);
        createDices();

        render();
        soundIntro.play()
        scene.simulate();


    }

    function render() {

        var count = 0;
        if (cameraFov > 45) {
            cameraFov--;
            camera.fov = cameraFov;
            camera.updateProjectionMatrix();
        }

        if (cameraAtive == true) {

            renderer.render(scene, camera);

        } else {
            renderer.render(scene, cameraTop);


        }


        for (var i = 0; i < dados.length; i++) {

            if (dados[i].getLinearVelocity().x == 0.0 && dados[i].getLinearVelocity().y == 0.0 && dados[i].getLinearVelocity().z == 0.0 && dados[i].position.y.toFixed(0) < 20) {
                count++;

            }
        }
        if (count == dados.length) {
            $('#play').prop('disabled', false);
            animacao = false
            for (var i = 0; i < dados.length; i++) {
                copyVector(dados[i])
            }
            if (premio == false && abertura > 0) {

                checkPrice()
            }


        }




        if (animacao == true) {
            $('#play').prop('disabled', true);
            // renderer.render(scene, camera);

        }

        requestAnimationFrame(render);

    }


    function createDices() {
        for (var i = 0; i < 3; i++) {


            var materials = [
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture('img/6.jpg') // righ
                }),
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture('img/3.jpg') //left
                }),
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture('img/5.jpg') // top
                }),
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture('img/2.jpg') // bottom
                }),
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture('img/4.jpg') //front
                }),
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture('img/1.jpg') // back
                })
            ];

            var cubeMaterials = Physijs.createMaterial(
                new THREE.MultiMaterial(materials),
                .2, // medium friction
                0.1 // low restitution
            );


            // seat of the chair
            cube = new Physijs.BoxMesh(
                new THREE.CubeGeometry(10, 10, 10),
                cubeMaterials
            );
            cube.castShadow = true;
            cube.receiveShadow = true;
            cube.__dirtyPosition = true;
            cube.__dirtyRotation = true;

            cube.position.y = 40;
            cube.position.x = -20 + i * 20

            // cube.rotation.set(
            //     Math.random() * Math.PI * 2,
            //     Math.random() * Math.PI * 2,
            //     Math.random() * Math.PI * 2
            // );

            dados.push(cube)
            scene.add(cube);

        }
    }


    function checkVertice(v1, v2, v3, v4) {

        var meshVert = [v1, v2, v3, v4]
        //  console.log(meshVert.sort())

        for (var i = 0; i < faces.length; i++) {
            var face = faces[i]
            var f = "f".concat(i + 1)

            for (f in face) {

                if (meshVert == `${face[f]}`) {
                    //  console.log(`${f} = ${face[f]}`);
                    if (`${f}` == "f1") {
                        // console.log("face de cima é 4")
                        //f4 = 4
                        soma += 4
                    }
                    if (`${f}` == "f2") {
                        //console.log("face de cima é 5")
                        // f5 = 5
                        soma += 5
                    }
                    if (`${f}` == "f3") {
                        //console.log("face de cima é 6")
                        // f6 = 6
                        soma += 6

                    }
                    if (`${f}` == "f4") {
                        // console.log("face de cima é 1")
                        // f1 = 1
                        soma += 1
                    }
                    if (`${f}` == "f5") {
                        // console.log("face de cima é 2")
                        // f2 = 2
                        soma += 2
                    }
                    if (`${f}` == "f6") {
                        // console.log("face de cima é 3")
                        //f3 = 3
                        soma += 3
                    }
                }
            }

        }
        //console.log("soma" + soma)



    }



    function copyVector(dado) {
        //console.log(dado)
        var copyVectors = []
        var faceDown = []
        for (var i = 0; i < 8; i++) {
            var vector = new THREE.Vector3();
            vector.copy(dado.geometry.vertices[i]);
            vector.applyMatrix4(dado.matrix);
            copyVectors.push(vector)
        }
        //console.log(copyVectors);
        for (var j = 0; j < copyVectors.length; j++) {
            var pos = copyVectors[j].y
            // console.log(pos.toFixed(0))
            if (pos.toFixed(0) == 0) {
                faceDown.push([j])
            }
        }
        checkVertice(parseInt(faceDown[0]), parseInt(faceDown[1]), parseInt(faceDown[2]), parseInt(faceDown[3]))

    }



    function checkPrice() {
        $("#res").text(soma)

        if ((soma == 5) || (soma == 6) || (soma == 7)) {

            if (typeOfGambler == "Pequeno") {
                soundWin.play()
                $("#resultado").append("<div class='row'  style='  margin-top: 2%' id='win'> Ganhaste </div>");
                $("#playerMoney").text(rest + (2 * bet));
            } else {
                soundLose.play()
                $("#resultado").append(" <div class='row' style='  margin-top: 2%' id='lose'> Perdeste </div>");

            }
            premio = true


        } else if ((soma == 14) || (soma == 15) || (soma == 16)) {


            if (typeOfGambler == "Grande") {
                soundWin.play()
                $("#resultado").append("<div class='row'  style='  margin-top: 2%' id='win'> Ganhaste </div>");
                $("#playerMoney").text(rest + (2 * bet));

            } else {
                soundLose.play()
                $("#resultado").append(" <div class='row'  style='  margin-top: 2%' id='lose'> Perdeste </div>");
            }
            premio = true


        } else {

            for (var i = 0; i < dados.length; i++) {
                dados[i].position.y = 40;
                dados[i].__dirtyPosition = true;

                dados[i].rotation.set(
                    Math.random() * Math.PI * 2,
                    Math.random() * Math.PI * 2,
                    Math.random() * Math.PI * 2
                );
                dados[i].__dirtyRotation = true;
            }
            animacao = true
            soundDice.play()
        }
        console.log(players)
        players[arrayPlayerPosition].money = parseInt($("#playerMoney").text());
        saveLocalStorage();
        soma = 0

    }





    $("#play").on("click", function () {


        money = parseInt($("#playerMoney").text());
        bet = parseInt($("#bet").val());
        typeOfGambler = $("#typeOfGambler").val();
        rest = money - bet
        // console.log(money, bet, typeOfGambler)



        if (bet < money) {
            soundDice.play()
            $("#playerMoney").text(rest);
            //console.log("entrei play")
            for (var i = 0; i < dados.length; i++) {
                dados[i].position.y = 40;
                dados[i].__dirtyPosition = true;

                cube.position.x = -20 + i * 20


                dados[i].rotation.set(
                    Math.random() * Math.PI * 2,
                    Math.random() * Math.PI * 2,
                    Math.random() * Math.PI * 2
                );
                dados[i].__dirtyRotation = true;
            }
            animacao = true
            premio = false
            soma = 0;
            abertura++;
        } else {
            $("#resultado").append(" <div class='row' id='lose'> Não tem saldo </div>");

        }

    });

    if (animacao == true && abertura > 0) {


    } else {
        $('#play').prop('disabled', false);
    }

    $("#back").on("click", function () {});

    $("#camera").on("click", function () {

        if (cameraAtive == true) {
            cameraAtive = false;
        } else {
            cameraAtive = true;
        }


    });

    $("#clear").on("click", function () {

        $("#resultado").text("<h1> Resultado <span id='res'></span></h1>")




    });



    function restoreLocalStorage() {
        players = [];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var y = JSON.parse(localStorage.getItem(key));
            players.push(y);
        }
    }

    function saveLocalStorage() {
        // Check browser support
        if (typeof (Storage) !== "undefined") {
            // Store
            for (var i = 0; i < players.length; i++) {
                console.log(players[i])
                localStorage.setItem(i.toString(), JSON.stringify(players[i]));
            }
        } else {
            console.log("Error", "Sorry, your browser does not support Web Storage...", "error");
        }
    }



    $(document).on("click", "#back", function () {
        console.log("back")
        window.open("../../../index.html", "_self");

    })



}