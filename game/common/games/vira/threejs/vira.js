var table;
var gameCards;
var gameMode;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var scene;
var camera;
var renderer;
var cards;
var miniCards;
var probability = '1/5'

window.onload = function init() {
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
    renderer.setSize(window.innerWidth, window.innerHeight);

    //controls
    // var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls = new THREE.OrbitControls(camera);
    // controls.addEventListener('change', function () {
    //     renderer.render(scene, camera);
    // });

    //show canvas
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    createTable();
    createCards(probability);

    //render scene
    var render = function () {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };
    render();

    function createTable() {
        table = new THREE.Object3D();
        var geometry = new THREE.BoxGeometry(120, 0.5, 80);
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
        var geometry = new THREE.BoxGeometry(15, 0.5, 20);
        var textures = [];
        var backCardTexture = loader.load('cards/back.png');
        var frontMaterial = new THREE.MeshBasicMaterial({
            map: backCardTexture
        });
        var borderMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000
        });
        gameChooser(probability);
        shuffleCards(gameCards);
        for (var i = 0; i < gameCards.length; i++) {
            var tempTexture = loader.load('cards/' + gameCards[i] + '.png');
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
            tempCardMesh.position.set(pos, -0.5, 0);
            pos += 25;
            tempCardMesh.card = gameCards[i];
            cardMesh.push(tempCardMesh);
            cards.add(tempCardMesh);
        }
        scene.add(cards);
    }

    function createMiniCards() {
        cards = new THREE.Object3D();
        var geometry = new THREE.BoxGeometry(6, 0.5, 9);
        var material = new THREE.MeshBasicMaterial({
            color: 0x000000
        });
        var cardMesh = [];
        var value = probability.split('/');
        value = value[1]
        var pos = (-55 * value) / 13;
        for (var i = 0; i < value; i++) {
            var tempCardMesh = new THREE.Mesh(geometry, material);
            tempCardMesh.position.set(pos, -0.5, 25);
            pos += 9;
            cardMesh.push(tempCardMesh);
            cards.add(tempCardMesh);
        }
        scene.add(cards);
    }

    // Game Mechanic
    function gameChooser(gameMode) {
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

    function onMouseClick(event) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


        raycaster.setFromCamera(mouse, camera);
        // calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObjects(scene.children[1].children);
        var card;
        if (intersects.length > 0 && intersects[0].object.type == "Mesh") {
            intersects[0].object.rotation.z = Math.PI;
            intersects[0].object.rotation.y = Math.PI;
            card = intersects[0].object.card;
            createMiniCards();
        }

    }

    window.addEventListener('mousedown', onMouseClick, false);

}