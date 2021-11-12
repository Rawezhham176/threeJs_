var scene = new THREE.Scene()
var gui = new dat.GUI();

var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    1,
    1000
)

	var lightLeft = getSpotLight(1, 'rgb(255, 220, 180)');
    var lightRight = getSpotLight(1, 'rgb(255, 220, 180)');


    lightLeft.position.x = -5;
	lightLeft.position.y = 2;
	lightLeft.position.z = -4;

	lightRight.position.x = 5;
	lightRight.position.y = 2;
	lightRight.position.z = -4;


    var folder1 = gui.addFolder('light_1');
	folder1.add(lightLeft, 'intensity', 0, 10);
	folder1.add(lightLeft.position, 'x', -5, 15);
	folder1.add(lightLeft.position, 'y', -5, 15);
	folder1.add(lightLeft.position, 'z', -5, 15);

	var folder2 = gui.addFolder('light_2');
	folder2.add(lightRight, 'intensity', 0, 10);
	folder2.add(lightRight.position, 'x', -5, 15);
	folder2.add(lightRight.position, 'y', -5, 15);
	folder2.add(lightRight.position, 'z', -5, 15);


var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById("webgl").appendChild(renderer.domElement)

var geometry = new THREE.BoxGeometry(700,700,700,10,10,10)
var material = new THREE.MeshBasicMaterial({
    color: 0xfffff,
    wireframe: true
}) 

var cube = new THREE.Mesh(geometry, material)
scene.add(cube)

    camera.position.z = 1000;
	camera.position.x = -2;
	camera.position.y = 7;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

var controls = new THREE.OrbitControls( camera, renderer.domElement );


function render(){
    requestAnimationFrame(render)
    renderer.render(scene,camera)
}


function getSpotLight(intensity, color) {
	color = color === undefined ? 'rgb(255, 255, 255)' : color;
	var light = new THREE.SpotLight(color, intensity);
	light.castShadow = true;
	light.penumbra = 0.5;

	//Set up shadow properties for the light
	light.shadow.mapSize.width = 2048;  // default: 512
	light.shadow.mapSize.height = 2048; // default: 512
	light.shadow.bias = 0.001;

	return light;
}

render()