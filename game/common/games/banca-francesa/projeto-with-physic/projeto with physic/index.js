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

    var f1 = 0,
        f2 = 0,
        f3 = 0,
        f4 = 0,
        f5 = 0,
        f6 = 0;
    var camera, scene, renderer, mesh, helper2, geometry, collision, planoInclinado, total = 0,
        timer;

    var initScene, render2, render_stats, physics_stats, table, spawnChair,  table_material, chair_material, light;
    var chair, back, legs, animacao = true, wall, ground2,
        soma = 0;
    var dados = [];
    var valorAposta = 5
    var tipoAposta = "Pequeno"


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
    Physijs.scripts.worker = 'physijs_worker.js';
    Physijs.scripts.ammo = 'ammo.js';
    init()
    // setup to render scene
    function init() {

        scene = new Physijs.Scene;
        scene.setGravity(new THREE.Vector3(0, -50, 0));
        scene.addEventListener(
            'update',
            function () {
                scene.simulate(undefined, 2);

            }
        );

        camera = new THREE.PerspectiveCamera(
            35,
            (window.innerWidth * 0.5) / (window.innerHeight * 0.5),
            1,
            1000
        );


        controls = new THREE.OrbitControls(camera);
        controls.addEventListener('change', function () {
            renderer.render(scene, camera);
        });

        camera.position.set(350, 220, 0);
        camera.lookAt(scene.position);

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
        table_material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0x004c0f
            }),
            .8, // high friction
            .8 // low restitution
        );
        table2_material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0x421414
            }),
            .8, // high friction
            .8 // low restitution
        );
        // ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
        // ground_material.map.repeat.set(3, 3);


        wall_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('img/wall.jpg') }),
            .8, // high friction
            .8 // low restitution
        );


        wall_material.map.wrapS = wall_material.map.wrapT = THREE.RepeatWrapping;
        wall_material.map.repeat.set(3, 3);

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
        wall.position.y = 100
        wall.position.x = -30
        wall.rotation.y = Math.PI / 2

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


        // table
        table = new Physijs.CylinderMesh(
            new THREE.CylinderGeometry(200, 200, 0.1, 32, 1, false, 0, 3.2),
            table_material,
            0 // mass
        );;
        table.receiveShadow = true;
        table.position.y = 0
        table.position.x = -40

        scene.add(table);

        
        // table
        table2 = new Physijs.CylinderMesh(
            new THREE.CylinderGeometry(198, 205, 5, 32, 1, true, 0, 3.2),
            table2_material,
            0 // mass
        );;
        table2.receiveShadow = true;
        table2.position.y = 0
        table2.position.x = -40

        scene.add(table2);


        createDices();


        var axes = new THREE.AxisHelper(200);


        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.7);


        // configure renderer clear color
        renderer.setClearColor("#e4e0ba");

        // add the output of the renderer to the DIV with id "world"
        document.getElementById('dice').appendChild(renderer.domElement);


        render();
        animate();


    }

    function render() {


        scene.simulate();
        renderer.render(scene, camera);

    }


    // hold object state
    function animate() {
        // console.log(dados[0].position)


        for (var i = 0; i < dados.length; i++) {
            if (dados[i].position.y.toFixed(0) == 5) {
                dados[i].___dirtyPosition = true
                setTimeout(function () {
                    animacao = false
                }, 2000);
            }
        }

        //requestAnimationFrame(animate);

        if (animacao == true) {
            requestAnimationFrame(animate);
        } else {
            for (var i = 0; i < dados.length; i++) {
                copyVector(dados[i])
                console.log(f1, f2, f3)
                // soma = f1 + f2 + f3 + f4 + f5 + f6
                console.log("soma:", soma)
            }

            checkPrice()
        }
        render();
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
            cube.position.x = -5 + i * 35
            

            cube.rotation.set(
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
            );

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
                        console.log("face de cima é 4")
                        //f4 = 4
                        soma += 4
                    }
                    if (`${f}` == "f2") {
                        console.log("face de cima é 5")
                        // f5 = 5
                        soma += 5
                    }
                    if (`${f}` == "f3") {
                        console.log("face de cima é 6")
                        // f6 = 6
                        soma += 6
                        console.log(f)
                    }
                    if (`${f}` == "f4") {
                        console.log("face de cima é 1")
                        // f1 = 1
                        soma += 1
                    }
                    if (`${f}` == "f5") {
                        console.log("face de cima é 2")
                        // f2 = 2
                        soma += 2
                    }
                    if (`${f}` == "f6") {
                        console.log("face de cima é 3")
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
        if ((soma == 5) || (soma == 6) || (soma == 7)) {

            if (tipoAposta == "Pequeno") {
                alert("ganhaste")
            } else {
                alert("perdeste")
            }
        } else if ((soma == 14) || (soma == 15) || (soma == 16)) {


            if (tipoAposta == "Grande") {
                alert("ganhaste")
            } else {
                alert("perdeste")

            }

        } else {
            // scene.remove(dados[1]);
            // scene.remove(dados[2]);
            // scene.remove(dados[0]);
            // dados = [];
            // // alert("ola")

            // if (dados.length == 0) {


            //     createDices();
            //     render();
            //     //animacao = true
            //     animate();


            // }

            // 

            // for (var i = 0; i < dados.length; i++) {
            //     dados[i].position.y = 40
            // }

            // render();
            // animacao = true
            // animate();


            soma = 0
        }




    }




}