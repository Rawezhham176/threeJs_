function init() {
	var scene = new THREE.Scene();

	// camera
	var camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		1000 // far clipping plane
	);
	camera.position.z = 0;
	camera.position.x = 0;
	camera.position.y = 1;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

    var partclGeo = new THREE.Geometry()
	var particlMat = new THREE.PointsMaterial({
		color: 'rgb(255,255,255)',
		size: 0.1,
		map: new THREE.TextureLoader().load('/assets/textures/particle.jpg'),
		transparent: true,
		blending: THREE.AdditiveBlending,
		depthhWrite: false
	})

	var partcleCount = 200000
	var partcleDistance = 100

	for(var i = 0; i < partcleCount; i++){
		var posX = (Math.random() - 0.5) * partcleDistance
		var posY = (Math.random() - 0.5) * partcleDistance
		var posZ = (Math.random() - 0.5) * partcleDistance
		var partcle = new THREE.Vector3(posX, posY, posZ)

		partclGeo.vertices.push(partcle)
	}

	var particleSystem = new THREE.Points(
		partclGeo,
		particlMat
	)

	scene.add(particleSystem)

	// renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.setClearColor('rgb(20, 20, 20)');

	var controls = new THREE.OrbitControls( camera, renderer.domElement );

	document.getElementById('webgl').appendChild(renderer.domElement);

	update(renderer, scene, camera, controls);

	return scene;
}


function update(renderer, scene, camera, controls) {
	controls.update();
	renderer.render(scene, camera);
	
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls);
	});
}

var scene = init();
