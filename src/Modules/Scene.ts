import { Engine, Scene, MeshBuilder, SceneLoader, Vector3, HavokPlugin, PhysicsShapeType, PhysicsAggregate } from "@babylonjs/core"
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import HavokPhysics from "@babylonjs/havok";
import { IAppSceneContext } from "../Interfaces/IAppSceneContext";
import appSceneContext from "../Contexts/AppScene.context";
import GLBModel from "./GLBModel";
import Door01 from "./Door01";


class AppScene {
	context: IAppSceneContext;
	canvas: HTMLCanvasElement;
	engine: Engine;
	scene: Scene;
	glbModels: GLBModel[];
	constructor() {
		this.context = appSceneContext;
		this.canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
		this.engine = new Engine(this.canvas);
		this.scene = this.createScene();
		this.context.setScene(this.scene);
		this.glbModels = [];
		this.engine.runRenderLoop(() => {
			this.draw();
			this.update();
			this.scene.render();
		})
	}
	createScene(): Scene {
		const scene: Scene = new Scene(this.engine);
		scene.createDefaultCameraOrLight(true, false, true);
		// const light1 = new BABYLON.PointLight("light1", new Vector3(0,10,0), scene);
		// light1.diffuse = new BABYLON.Color3(1,1,1);
		// light1.specular = new BABYLON.Color3(0.1,0.1,0.1);
		//const camera = new BABYLON.FreeCamera("camera", new Vector3(0,5,10), scene);
		
		this.importGLBModels();
		//const box: Mesh = MeshBuilder.CreateBox("box", { width: 1, height: 1, depth: 1 }, this.scene);
		return scene;
	}
	async importGLBModels() {
		try {
			const havokInstance = await HavokPhysics();
			// pass the engine to the plugin
			const hk = new BABYLON.HavokPlugin(true, havokInstance);
			// enable physics in the scene with a gravity
			this.scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), hk);
			setInterval(() => {
				const box = MeshBuilder.CreateSphere("box");
				box.position.y = Math.floor(Math.random() * 5 ) + 50;
				box.position.x = Math.floor(Math.random() * 20 );
				box.position.z = Math.floor(Math.random() * 20 );
				const sphereAggregate = new BABYLON.PhysicsAggregate(box, BABYLON.PhysicsShapeType.SPHERE, { mass: 1 ,restitution: .75}, this.scene);
			},10)
			const plane = MeshBuilder.CreateGround("ground", { width: 50, height: 50 }, this.scene);
			const planeAgregate = new PhysicsAggregate(plane, PhysicsShapeType.BOX, { mass: 0 }, this.scene);
			// Create a sphere shape and the associated body. Size will be determined automatically.
			
			// for (let index = 0; index < 1; index++) {
			// 	let res = await SceneLoader.ImportMeshAsync("", "http://localhost:4000/assets/3DModels/door01/", "door01.glb", this.scene)
			// 	res.meshes[0].position = new Vector3(0, 0, index);
			// 	console.log(index, new Door01(res));
			// }
		} catch (error) {

		}
	}
	draw() {

	}
	update() {

	}

}

export default AppScene;
