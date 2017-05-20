window.onload = function init() {

    var table;

    //scene
    var scene = new THREE.Scene();
    var axes = new THREE.AxisHelper(200);
    scene.add(axes)

    //camera
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 200);
    // position and point the camera to the center of the scene
    camera.position.set(0, 100, 5);
    camera.lookAt(scene.position);

    //renderer
    var renderer = new THREE.WebGLRenderer();
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
    createCards();

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
            color: "green"
        });
        var tableMesh = new THREE.Mesh(geometry, material);
        tableMesh.position.set(0, -0.78, 0);
        table.add(tableMesh);
        scene.add(table);
    }

    function createCards() {
        cards = new THREE.Object3D();
        var geometry = new THREE.BoxGeometry(15, 0.5, 20);
        var material = new THREE.MeshBasicMaterial({
            color: "white"
        });
        var cardMesh = [];
        var pos = -50;
        for (var i = 0; i < 5; i++) {
            var tempCardMesh = new THREE.Mesh(geometry, material);
            tempCardMesh.position.set(pos, -0.5, 0);
            pos += 25;
            cardMesh.push(tempCardMesh);
            cards.add(tempCardMesh);
        }
        scene.add(cards);
    }

}