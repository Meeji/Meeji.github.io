var screenWidth = window.innerWidth, screenHeight = window.innerHeight, mouseX = 0, mouseY = 0, windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2, camera, scene, renderer, raycaster, mouse;
init();
animate();
function init() {
    camera = Renderer.createCamera();
    scene = Renderer.createScene();
    renderer = Renderer.createRenderer(screenWidth, screenHeight, window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    const ball = SpikeBall.create(scene, 300, 0, 0);
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(50, 16, 16), new THREE.MeshBasicMaterial());
    const pointKeeper = createPointKeeper();
    scene.add(sphere);
    document.addEventListener("mousemove", onDocumentMouseMove, false);
    document.addEventListener("mousedown", (event) => {
        event.preventDefault();
        raycaster.setFromCamera(mouse, camera);
        if (!!raycaster.intersectObject(sphere).length) {
            ball.addDot(20);
            ball.addSpike(10);
            pointKeeper(1);
        }
    });
    window.addEventListener("resize", onWindowResize, false);
}
function createPointKeeper() {
    let points = 0;
    const canvas = document.createElement("canvas"), context = canvas.getContext("2d");
    context.font = "Bold 80px Arial";
    context.fillStyle = "rgba(255,255,255,0.95)";
    const pointsTexture = new THREE.Texture(canvas);
    const pointsMaterial = new THREE.MeshBasicMaterial({ map: pointsTexture, side: THREE.DoubleSide });
    pointsMaterial.transparent = true;
    const pointsMesh = new THREE.Mesh(new THREE.PlaneGeometry(canvas.width / 2, canvas.height / 2), pointsMaterial);
    pointsMesh.position.set(150, 50, 0);
    scene.add(pointsMesh);
    update();
    function update() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillText(points.toString(), 0, 50);
        pointsTexture.needsUpdate = true;
    }
    return (add) => {
        points += add;
        update();
    };
}
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function onDocumentMouseMove(event) {
    event.preventDefault();
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
function animate() {
    requestAnimationFrame(animate);
    render();
}
function render() {
    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (-mouseY + 200 - camera.position.y) * .05;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}
//# sourceMappingURL=app.js.map