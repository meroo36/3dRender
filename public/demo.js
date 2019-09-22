import { Session } from "session";

var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

var crate, crateTexture, crateNormalMap, crateBumpMap;

var keyboard = {};
var player = { height: 1.8, speed: 0.1, turnSpeed: Math.PI * 0.02 };
var USE_WIREFRAME = false;


function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 1000);


    ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    light = new THREE.PointLight(0xffffff, 0.8, 0.11);
    light.position.set(-3, 6, -3);
    light.castShadow = true;f
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    scene.add(light);



    // var manager = new THREE.LoadingManager();
    // manager.onProgress = function (item, loaded, total) {

    // 	console.log(item, loaded, total);

    // };

    // var texture = new THREE.Texture();

    // var onProgress = function (xhr) {
    // 	if (xhr.lengthComputable) {
    // 		var percentComplete = xhr.loaded / xhr.total * 100;
    // 		console.log(Math.round(percentComplete, 2) + '% downloaded');
    // 	}
    // };

    // var onError = function (xhr) { };

    // var loader = new THREE.ImageLoader(manager);
    // loader.load('models/ayc_model.http', function (image) {

    // 	console.log('done');
    // 	texture.image = image;
    // 	texture.needsUpdate = true;

    // });

    // // model
    // var loader = new THREE.OBJLoader(manager);
    // loader.load('models/Mars 2K.obj', function (object) {

    // 	object.traverse(function (child) {

    // 		if (child instanceof THREE.Mesh) {

    // 			child.material.map = texture;

    // 		}

    // 	});

    // 	let size = 2;
    // 	object.scale.x = size;
    // 	object.scale.y = size;
    // 	object.scale.z = size;
    // 	object.rotation.y = 3;
    // 	object.position.y = -10.5;
    // 	scene.add(object);

    // }, onProgress, onError);



    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.crossOrigin = 'anonymous';
    mtlLoader.load('models/ayc_model.mtl', function(materials) {

        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);

        objLoader.load("models/ayc_model.obj", function(mesh) {

            mesh.traverse(function(node) {
                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            mesh.scale.set(0.03, 0.03, 0.03);
            scene.add(mesh);

            mesh.position.set(0, 0, 0);
            mesh.rotation.y = 360;
        });

    });


    camera.position.set(0, player.height, -5);
    camera.lookAt(new THREE.Vector3(0, player.height, 0));

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(1280, 720);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    document.body.appendChild(renderer.domElement);

    animate();
}

function animate() {

    requestAnimationFrame(animate);


    if (keyboard[87]) { // W key
        camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
    }
    if (keyboard[83]) { // S key
        camera.position.x += Math.sin(camera.rotation.y) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
    }
    if (keyboard[65]) { // A key
        camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;
    }
    if (keyboard[68]) { // D key
        camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;
    }

    if (keyboard[37]) { // left arrow key
        camera.rotation.y -= player.turnSpeed;
    }
    if (keyboard[39]) { // right arrow key
        camera.rotation.y += player.turnSpeed;
    }

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

/*deneme
var brightness = document.getElementById('brightness');
var controls = document.getElementById('controls');

controls.onkeyup = controls.onchange = function()
{
    var brightness = document.getElementById('brightness'),
        val        = parseInt(this.value) - 50;
    
    if (val > 50 || val < -50)
    return val;
    
    brightness.style.backgroundColor = val > 0 ? 'white' : 'black';
    brightness.style.opacity = Math.abs(val/100) * 2;
}*/

function updateTextInput(val) {
          document.getElementById('textInput').value=val;
        }