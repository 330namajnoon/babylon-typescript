import { Engine, Scene, SceneLoader } from "@babylonjs/core"
import "@babylonjs/loaders";
import appSceneContext from "../Contexts/AppScene.context";
import CollisionCallback from "./CollisionCallback";
import GLBModel from "./Assets/GLBModel";
import ISceneConfig from "../Interfaces/ISceneConfig";

class AppScene {
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
		this.scene.createDefaultCameraOrLight(true,true,true);
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

	initial() {
		this.assets.forEach(asset => {
			asset.initial();
		})
	}

	update() {
		this.assets.forEach(asset => {
			asset.update();
		})
	}
}

export default AppScene;
