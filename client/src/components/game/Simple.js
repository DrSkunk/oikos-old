import React, { Component } from "react";
import * as THREE from "three";
import OBJLoader from "three-obj-loader";
import ColladaLoader from "three-collada-loader-2";
import OrbitControls from "three-orbitcontrols";
import water from "../../assets/water.png";
import lvl1 from "../../assets/towers/lvl1.dae";

OBJLoader(THREE);

class Simple extends Component {
  componentDidMount() {
    this.THREE = THREE;
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const textureLoader = new THREE.TextureLoader();
    // const objLoader = new this.THREE.OBJLoader();
    const colladaLoader = new ColladaLoader();

    //ADD SCENE
    this.scene = new THREE.Scene();

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    // this.camera.lookAt(this.scene.position);
    this.camera.position.z = 20;
    this.camera.position.y = 20;

    //ADD LIGHT
    this.scene.add(new THREE.AmbientLight(0x666666));

    const light = new THREE.DirectionalLight(0xdfebff, 1);
    light.position.set(50, 200, 100);
    light.position.multiplyScalar(1.3);

    light.castShadow = true;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    const d = 300;

    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;

    light.shadow.camera.far = 1000;

    this.scene.add(light);

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#000000");
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    //ADD CUBE
    const cubeGeometry = new THREE.BoxGeometry(1, 2, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: "#433F81" });
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    this.cube.position.y = 1;
    this.scene.add(this.cube);

    //ADD ISLAND
    const geometry = new THREE.BoxGeometry(6, 1, 6);
    const material = new THREE.MeshBasicMaterial({ color: "#8b7834" });
    const island = new THREE.Mesh(geometry, material);
    island.position.y = -0.5;
    island.receiveShadow = true;
    this.scene.add(island);

    // sea
    const seaTexture = textureLoader.load(water);
    seaTexture.wrapS = seaTexture.wrapT = THREE.RepeatWrapping;
    seaTexture.repeat.set(250, 250);
    seaTexture.anisotropy = 16;

    const seaMaterial = new THREE.MeshLambertMaterial({
      map: seaTexture
    });

    const seaMesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1000, 1000),
      seaMaterial
    );
    seaMesh.position.y = -1;
    seaMesh.rotation.x = -Math.PI / 2;
    seaMesh.receiveShadow = true;
    this.scene.add(seaMesh);

    // load testmodel
    const houseMaterial = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });
    houseMaterial.side = THREE.DoubleSide;
    colladaLoader.load(
      lvl1,
      object => {
        console.log(object);
        // object.traverse(function(child) {
        //   if (child instanceof THREE.Mesh) {
        //     child.material = houseMaterial;
        //   }
        // });
        this.scene.add(object.scene);

        const clone1 = object.scene.clone();
        clone1.position.x = 1;
        this.scene.add(clone1);

        const clone2 = object.scene.clone();
        clone2.position.x = 2;
        this.scene.add(clone2);

        const clone3 = object.scene.clone();
        clone3.position.x = -1;
        this.scene.add(clone3);

        const clone4 = object.scene.clone();
        clone4.position.x = -1;
        this.scene.add(clone4);

        const clone5 = object.scene.clone();
        clone5.position.x = -2;
        this.scene.add(clone5);
      },
      xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      error => {
        console.error("Error loading model", error);
      }
    );

    // Mouse to rotate camera
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxDistance = 20;
    this.controls.minDistance = 1;
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.target.set(0, 0, 0);

    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderScene();
    this.controls.update();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div
        style={{ width: "100vw", height: "80vh" }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default Simple;
