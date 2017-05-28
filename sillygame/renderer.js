var Renderer;
(function (Renderer) {
    function createRenderer(width, height, pixelRatio) {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setPixelRatio(pixelRatio);
        return renderer;
    }
    Renderer.createRenderer = createRenderer;
    function createCamera() {
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;
        return camera;
    }
    Renderer.createCamera = createCamera;
    function createScene() {
        return new THREE.Scene();
    }
    Renderer.createScene = createScene;
})(Renderer || (Renderer = {}));
//# sourceMappingURL=Renderer.js.map