var rotate;
var cylinderA = new THREE.Object3D(),
    cylinderB = new THREE.Object3D(),
    cylinderC = new THREE.Object3D();
var rotationCA, rotationCB, rotationCC;
var allCylinders = new THREE.Object3D();
var currentCA = 0,
    currentCB = 0,
    currentCC = 0;
var runningCA, runningCB, runningCC;
var scene;
var render;
var mixers = [];
var symbols = ["BigWin", "Lemon", "Cherry", "Bar", "Banana", "7", "Watermelon"];
var symbolA, symbolB, symbolC;

$(document).ready(function () {

    //scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd3d3d3);
    var axes = new THREE.AxisHelper(200);
    scene.add(axes);

    //camera
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 20000);
    // position and point the camera to the center of the scene
    camera.position.set(0, 100, 500);
    camera.lookAt(scene.position);

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



    // createModel();

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

                console.log(symbols[symbolA], symbols[symbolB], symbols[symbolC]);

            }
        }



        render();

        requestAnimationFrame(animate);
    };

    function render() {
        for (var i = 0; i < 7; i++) {
            cylinderA.children[i].geometry.verticesNeedUpdate = true;
            cylinderA.children[i].geometry.matrixWorldNeedsUpdate = true;
            cylinderB.children[i].geometry.verticesNeedUpdate = true;
            cylinderB.children[i].geometry.matrixWorldNeedsUpdate = true;
            cylinderC.children[i].geometry.verticesNeedUpdate = true;
            cylinderC.children[i].geometry.matrixWorldNeedsUpdate = true;
        }
        for (var i = 0; i < 7; i++) {
            cylinderA.children[i].updateMatrixWorld();
            cylinderB.children[i].updateMatrixWorld();
            cylinderC.children[i].updateMatrixWorld();
        }
        scene.updateMatrixWorld();
        cylinderA.updateMatrixWorld();
        cylinderB.updateMatrixWorld();
        cylinderC.updateMatrixWorld();
        renderer.render(scene, camera);

    }


});

window.addEventListener("keydown", function (evt) {


    if (evt.keyCode == 32) {
        startSlotMachine();
    }
});

window.addEventListener("keyup", function (evt) {
    if (evt.keyCode == 32) {
        rotate = false;
    }
});