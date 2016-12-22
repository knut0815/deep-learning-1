import * as THREE from "three";
import {render} from "./render";

export class RenderPass {
	private shader: any; // TODO
	private scene: THREE.Scene;
	private camera: THREE.Camera;
	private target: THREE.WebGLRenderTarget;
	private quad: THREE.Object3D;

	constructor(width: number, height: number) {
		this.target = new THREE.WebGLRenderTarget(width, height);
		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
		this.scene = new THREE.Scene();

		// create quad
		let geometry = new THREE.PlaneGeometry( 2, 2);
		let material = new THREE.MeshBasicMaterial( {color: "#"+((1<<24)*Math.random()|0).toString(16), side: THREE.DoubleSide} );
		this.quad = new THREE.Mesh( geometry, material );
		//this.quad.position.z = -2;
		this.scene.add(this.quad);

	}

	public process() {
		render.render(this.scene, this.camera, this.target);
	}

	public processOnCanvas() {
		requestAnimationFrame(() => {
			render.render(this.scene, this.camera);
		});
	}

	get Output(): THREE.Texture {
		return this.target.texture;
	}
}
