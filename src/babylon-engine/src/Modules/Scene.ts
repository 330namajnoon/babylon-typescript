import { Engine, Scene, SceneLoader } from "@babylonjs/core"
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import appSceneContext from "../Contexts/AppScene.context";
import CollisionCallback from "./CollisionCallback";
import GLBModel from "./Assets/GLBModel";
import ISceneConfig from "../Interfaces/ISceneConfig";

class AppScene {
	camera: BABYLON.ArcRotateCamera;
	modules: any[];
	loaded: boolean = false;
	canvas: HTMLCanvasElement;
	engine: Engine;
	scene: Scene;
	assets: any[];
	collisionCallback: CollisionCallback;
	constructor(config: ISceneConfig) {
		this.modules = config.modules;
		this.canvas = config.canvas;
		this.engine = new Engine(this.canvas);
		this.scene = new Scene(this.engine);
		this.camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
		this.camera.attachControl(this.camera, true);
		appSceneContext.setScene(this.scene);
		this.collisionCallback = new CollisionCallback(this.scene);
		appSceneContext.collisionCallback = this.collisionCallback;
		this.assets = [];
		this.engine.runRenderLoop(() => {
			this.update();
			this.scene.render();
		})
	}

	import3DModel(name: string, path: string, fileName: string, scripts: any[]): Promise<GLBModel | null> {
		return new Promise(async (resolve, reject) => {
			try {
				let res = await SceneLoader.ImportMeshAsync(name, path, fileName, this.scene);
				let model = new GLBModel(name, res, scripts, this);
				model.initial();
				this.assets.unshift(model);
				resolve(model);
			} catch (error) {
				reject(null);
			}
		})
	}

	async import3DModel2(name: string, path: string, fileName: string, scripts: any[]) {
		const res = await SceneLoader.ImportMeshAsync("", path, fileName, this.scene)
		const model = new GLBModel(name, res, scripts, this);
		this.assets.unshift(model);
		return model;
	}

	initial() {
		this.assets.forEach(asset => {
			asset.initial();
		})
	}

	update() {
		this.assets.forEach(asset => {
			if (asset.update) asset.update();
		})
	}
}

export default AppScene;
