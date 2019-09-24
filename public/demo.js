var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

var crate, crateTexture, crateNormalMap, crateBumpMap;

var keyboard = {};
var player = { height: 1.8, speed: 2, turnSpeed: Math.PI * 0.02 };
var USE_WIREFRAME = false;


function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, 1280 / 720, 1, 1000);
    camera.position.set( 400, 500, 0 );
    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0, 10, 0);
        light.target.position.set(-5, 0, 0);
        scene.add(light);
        scene.add(light.target);

        const gui = new dat.GUI();

        gui.add(light, 'intensity', 0, 2, 0.01);
        gui.add(light.target.position, 'x', -100, 100);
        gui.add(light.target.position, 'z', -100, 100);
        gui.add(light.target.position, 'y', 0, 100);
        
    }

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.crossOrigin = 'anonymous';
    mtlLoader.load('models/ayc_model.mtl', function (materials) {

        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);

        objLoader.load("models/ayc_model.obj", function (mesh) {

            mesh.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            mesh.scale.set(1, 1, 1);
            scene.add(mesh);

            mesh.position.set(100,-1, -500);
            camera.lookAt(mesh.position);
        });

    });

    
    

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(1280, 720);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    //controls.minDistance = 100;
    //controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI / 2;

    animate();
}

function animate() {

    requestAnimationFrame(animate);


    // if (keyboard[87]) { // W key
    //     camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
    //     camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
    // }
    // if (keyboard[83]) { // S key
    //     camera.position.x += Math.sin(camera.rotation.y) * player.speed;
    //     camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
    // }
    // if (keyboard[65]) { // A key
    //     camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
    //     camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;
    // }
    // if (keyboard[68]) { // D key
    //     camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
    //     camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;
    // }

    // if (keyboard[37]) { // left arrow key
    //     camera.rotation.y -= player.turnSpeed;
    // }
    // if (keyboard[39]) { // right arrow key
    //     camera.rotation.y += player.turnSpeed;
    //}

    renderer.render(scene, camera);
}

function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}


window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;