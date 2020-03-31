import React, { Component } from 'react';
import * as THREE from 'three';
// const OrbitControls = require('three-orbitcontrols')(THREE);
function onDocumentMouseDown(e) {
  e.preventDefault();
  var mouseVector = new THREE.Vector3();
  mouseVector.x = 2 * (e.clientX / SCREEN_WIDTH) - 1;
  mouseVector.y = 1 - 2 * (e.clientY / SCREEN_HEIGHT);
  var vector = point.clone().unproject(camera);
  var direction = new THREE.Vector3(0, 0, -1).transformDirection(
    camera.matrixWorld
  );
  raycaster.set(vector, direction);
  var intersects = raycaster.intersectObjects(objects);
  for (var i = 0; i < intersects.length; i++) {
    var intersection = intersects[i],
      obj = intersection.object;
    console.log('Intersected object', obj);
  }
}
class Shape extends Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.addCube = this.addCube.bind(this);
    this.initializeCamera = this.initializeCamera.bind(this);
    this.initializeOrbits = this.initializeOrbits.bind(this);
  }
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    // this.initializeOrbits();
    this.initializeCamera();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    this.animate(this.cube);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    this.mount.removeChild(this.renderer.domElement);
  }
  initializeOrbits() {
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
  }
  initializeCamera() {
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 4;
  }
  animate(cube) {
    this.frameId = window.requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
  }
  addCube(cube) {
    this.scene.add(cube);
  }

  render() {
    return (
      <div>
        <div
          onClick={e => this.onDocMouseDown(e, [this.mesh])}
          id="boardCanvas"
          style={{ width: '80vw', height: '40vw' }}
          ref={mount => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }
}
export default Shape;
