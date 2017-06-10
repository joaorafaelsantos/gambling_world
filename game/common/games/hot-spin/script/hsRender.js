var rotate;
var allCylinders = new THREE.Object3D();
var cylinderA = new THREE.Object3D(),
    cylinderB = new THREE.Object3D(),
    cylinderC = new THREE.Object3D();
var lever = new THREE.Object3D();

var buttonA, buttonB, buttonC;
var rotationCA, rotationCB, rotationCC;

var runLever = false,
    sideLever = true;

var currentCA = 0,
    currentCB = 0,
    currentCC = 0;
var runningCA = false,
    runningCB = false,
    runningCC = false;
var scene, camera, render, renderer;
var mixers = [];
var symbols = ["BigWin", "Lemon", "Cherry", "Bar", "Banana", "7", "Watermelon"];
var symbolA, symbolB, symbolC;

var sound_Running = new Audio('sounds/running.mp3');
var sound_Win = new Audio('sounds/win.wav');
var sound_3Win = new Audio('sounds/3win.wav');
var sound_Lose = new Audio('sounds/lose.wav');
var sound_EndA = new Audio('sounds/endLine.mp3');
var sound_EndB = new Audio('sounds/endLine.mp3');
var sound_EndC = new Audio('sounds/endLine.mp3');
var sound_BIGWIN = new Audio('sounds/BIGWIN.mp3');


var money = 0;
var bet = 0.50;
var rWidth, rHeight;
var players = [];

var arrayPlayerPosition = 0; // JOÃO UPDATE
var saveLocalStorage; // JOÃO UPDATE



$(document).ready(function () {

    $("#logArea").css("height", $(window).height());
    $("#downTab").css("height", $(window).height() - $("#canvas-container").height());
    $("#downTab").css("background-size", "" + $("#downTab").width() + "px 700px");

    $("#playBtn").click(function () {
        startSlotMachine();
    });

    $("#clearBtn").click(function () {
        $("#logArea").html("");
    });

    $("#homepBtn").click(function () {
        window.open("../../../index.html", "_self");
    });

    $("input[type=radio]").click(function () {
        bet = $(this).val();
    });


    // if (localStorage.length != 0) {
    //     restoreLocalStorage(function () {

    //         for (var i = 0; i < players.length; i++) {
    //             var tempPlayer = players[i];
    //             var tempDate = new Date().getTime() / 1000;
    //             if (tempDate - tempPlayer.timestamp <= 10) {
    //                 name = tempPlayer.name;

    //                 money = tempPlayer.money;
    // 				console.log(name, money);
    //                 $("#playerName").html(name);
    //                 $("#playerMoney").html(money + "€");
    //             }
    //         }
    //     });


    // }

    // JOÃO UPDATE

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

    for (var i = 0; i < players.length; i++) {
        var tempPlayer = players[i];
        arrayPlayerPosition = i;
        var tempDate = new Date().getTime() / 1000;
        if (tempDate - tempPlayer.timestamp <= 10) {
            name = tempPlayer.name;
            money = tempPlayer.money;
            sliderMaxValue = money;
            probability = tempPlayer.probability;
            $("#playerName").html(name);
            $("#playerMoney").html(money + "€");
        }
    }

    // Save on localstorage
    saveLocalStorage = function saveLocalStorage() {
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

    // END OF JOÃO UPDATE

    bet = $("input:checked").val();



    //scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd3d3d3);
    // var axes = new THREE.AxisHelper(200);
    // scene.add(axes);

    //camera
    camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 10, 20000);
    // position and point the camera to the center of the scene




    var light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    light.position.set(0, 0, -100);
    scene.add(light);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, -20, 200);

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    scene.add(spotLight);

    //renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    rWidth = $("#canvas-container").width();
    rHeight = window.innerHeight / (window.innerWidth / $("#canvas-container").width());
    renderer.setSize(rWidth, rHeight);

    //controls
    // var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.addEventListener('change', function () {
    //     renderer.render(scene, camera);
    // });

    //show canvas
    document.getElementById('canvas-container').appendChild(renderer.domElement);


    createMachine();
    // createModel();
    // createButtons();
    createLever();
    createBackground();

    for (var i = 0; i < 3; i++) {
        createCylinder(10 * i, i);
    }

    allCylinders.scale.set(7.55, 8.55, 7.55);
    allCylinders.position.set(-75, 50, -25);
    scene.add(allCylinders);
    var cPos = {
        x: allCylinders.position.x + 70,
        y: allCylinders.position.y + 10,
        z: allCylinders.position.z
    };
    camera.position.set(0, 50, 600);
    // camera.lookAt(cPos);


    render();
    animate();

    //render scene
    function animate() {

        if (runLever == true) {
            if (lever.rotation.x <= 1 && sideLever == true) {
                lever.rotation.x += 0.1;
            } else {
                sideLever = false;
                lever.rotation.x -= 0.1;
                if (lever.rotation.x <= 0) {
                    runLever = false;
                }
            }
        }

        if (runningCA == true) {

            cylinderA.rotation.x += 0.1;
            currentCA += 0.1;
            if (currentCA >= rotationCA) {
                runningCA = false;
                cylinderA.rotation.x = rotationCA;
                sound_EndA.play();
            }
        }

        if (runningCB == true) {
            cylinderB.rotation.x += 0.1;
            currentCB += 0.1;
            if (currentCB >= rotationCB) {
                runningCB = false;
                cylinderB.rotation.x = rotationCB;
                sound_EndB.play();
            }
        }

        if (runningCC == true) {
            cylinderC.rotation.x += 0.1;
            currentCC += 0.1;
            if (currentCC >= rotationCC) {
                runningCC = false;
                cylinderC.rotation.x = rotationCC;
                sound_Running.pause();
                sound_EndC.play();

                checkPrize();

            }
        }


        // console.log(camera.position)
        render();

        requestAnimationFrame(animate);
    };

    function render() {
        renderer.render(scene, camera);

    }


});

window.addEventListener("keydown", function (evt) {


    if (evt.keyCode == 32) {
        startSlotMachine();
        evt.preventDefault();
    }
    if ([37, 38, 39, 40].indexOf(evt.keyCode) > -1) {
        evt.preventDefault();
    }
}, false);

window.addEventListener("keyup", function (evt) {
    if (evt.keyCode == 32) {
        rotate = false;
        evt.preventDefault();
    }
}, false);