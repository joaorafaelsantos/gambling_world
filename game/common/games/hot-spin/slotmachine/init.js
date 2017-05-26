var rotate;
var allCylinders = new THREE.Object3D();
var cylinderA = new THREE.Object3D(),
    cylinderB = new THREE.Object3D(),
    cylinderC = new THREE.Object3D();
var lever = new THREE.Object3D();

var buttonA, buttonB, buttonC;
var rotationCA, rotationCB, rotationCC;

var currentCA = 0,
    currentCB = 0,
    currentCC = 0;
var runningCA = false,
    runningCB = false,
    runningCC = false;
var scene, camera, render;
var mixers = [];
var symbols = ["BigWin", "Lemon", "Cherry", "Bar", "Banana", "7", "Watermelon"];
var symbolA, symbolB, symbolC;


var money = 100;
var bet = 0.10;

$(document).ready(function () {

    //scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd3d3d3);
    // var axes = new THREE.AxisHelper(200);
    // scene.add(axes);

    //camera
    camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 10, 20000);
    // position and point the camera to the center of the scene
    camera.position.set(0, 150, 691);
    camera.lookAt(allCylinders.position);

    var light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    light.position.set(0, 650, 0);
    scene.add(light);

    //renderer
    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    //controls
    // var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    });

    //show canvas
    document.getElementById('canvas-container').appendChild(renderer.domElement);



    createModel();
    createButtons();
    createLever();

    for (var i = 0; i < 3; i++) {
        createCylinder(10 * i, i);
    }

    allCylinders.scale.set(7.55, 7.55, 7.55);
    allCylinders.position.set(-75, 55, -25);
    scene.add(allCylinders);



    render();
    animate();

    //render scene
    function animate() {


        if (runningCA == true) {

            cylinderA.rotation.x += 0.1;
            currentCA += 0.1;
            if (currentCA >= rotationCA) {
                runningCA = false;
                cylinderA.rotation.x = rotationCA;
            }
        }

        if (runningCB == true) {
            cylinderB.rotation.x += 0.1;
            currentCB += 0.1;
            if (currentCB >= rotationCB) {
                runningCB = false;
                cylinderB.rotation.x = rotationCB;
            }
        }

        if (runningCC == true) {
            cylinderC.rotation.x += 0.1;
            currentCC += 0.1;
            if (currentCC >= rotationCC) {
                runningCC = false;
                cylinderC.rotation.x = rotationCC;

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
        if (runningCC == false) {
            startSlotMachine();
        }
    }
});

window.addEventListener("keyup", function (evt) {
    if (evt.keyCode == 32) {
        rotate = false;
    }
});

window.addEventListener("click", function (evt) {
    if (runningCC == false) {
        var  mouse3D =  new  THREE.Vector2(
            (evt.clientX / window.innerWidth) * 2 - 1,    //x
             -(evt.clientY / window.innerHeight) * 2 + 1); //y   
        var raycaster = new THREE.Raycaster();
        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse3D, camera);
        // calculate objects intersecting the picking ray
        var intersectsC = raycaster.intersectObjects(scene.children);
        var intersectsP = raycaster.intersectObjects(lever.children);
        console.log(intersectsP);
        if (intersectsC.length > 0 && intersectsC[0].object.objective == "button") {

            buttonA.position.set(-55, -72, 75);
            buttonB.position.set(0, -72, 75);
            buttonC.position.set(55, -72, 75);

            if (intersectsC[0].object.value == "0,10€") {
                buttonA.position.set(-55, -80, 68);
                bet = 0.10;
            } else if (intersectsC[0].object.value == "0,20€") {
                buttonB.position.set(0, -80, 68);
                bet = 0.20;
            } else if (intersectsC[0].object.value == "0,50€") {
                buttonC.position.set(55, -80, 68);
                bet = 0.50;
            }
        } else if (intersectsP.length > 0 && intersectsP[0].object.objective == "lever") {
            lever.rotation.x += 0.1;
        }
    }


});

window.addEventListener("click mousemove", function (evt) {
    console.log(123)
});