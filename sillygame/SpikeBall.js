var SpikeBall;
(function (SpikeBall) {
    function create(scene, size, dots, spikes) {
        const material = new THREE.SpriteMaterial();
        const lineMaterial = new THREE.LineBasicMaterial();
        const sprites = [];
        function createDots(times = 1) {
            for (let i = 0; i < times; i++) {
                const particle = new THREE.Sprite(material);
                particle.position.x = Math.random() * 2 - 1;
                particle.position.y = Math.random() * 2 - 1;
                particle.position.z = Math.random() * 2 - 1;
                particle.position.normalize();
                particle.position.multiplyScalar(size);
                particle.scale.multiplyScalar(2);
                sprites.push(particle);
                scene.add(particle);
            }
        }
        function createSpikes(times = 1) {
            for (let i = 0; i < times; i++) {
                const lineGeometry = new THREE.Geometry();
                const vertex = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
                vertex.normalize();
                vertex.multiplyScalar(size);
                const vertex2 = vertex.clone();
                vertex2.multiplyScalar(Math.random() * 0.3 + 1);
                lineGeometry.vertices.push(vertex);
                lineGeometry.vertices.push(vertex2);
                const spike = new THREE.Line(lineGeometry, lineMaterial);
                sprites.push(spike);
                scene.add(spike);
            }
        }
        createDots(dots);
        createSpikes(spikes);
        return {
            moveCenter: move => sprites.forEach(s => s.position = s.position.add(move)),
            addDot: createDots,
            addSpike: createSpikes
        };
    }
    SpikeBall.create = create;
})(SpikeBall || (SpikeBall = {}));
//# sourceMappingURL=SpikeBall.js.map