import  { Engine, Scene, MeshBuilder, Mesh, SceneLoader, Vector3 } from "@babylonjs/core"
import "@babylonjs/loaders";
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
this.importGLBModels();
		//const box: Mesh = MeshBuilder.CreateBox("box", { width: 1, height: 1, depth: 1 }, this.scene);
		return scene;
	}
	async importGLBModels() {
		try {
			for (let index = 0; index < 5; index++) {
				let res = await SceneLoader.ImportMeshAsync("", "http://localhost:4000/assets/3DModels/door01/", "door01.glb", this.scene)
				res.meshes[0].position = new Vector3(0,0,index);
				console.log(index,new Door01(res));
			}
		} catch (error) {
			
		}
	}
	draw() {

	}
	update() {

	}

}

export default AppScene;
