import { Engine, Scene, MeshBuilder, SceneLoader, Vector3, HavokPlugin, PhysicsShapeType, PhysicsAggregate, GizmoManager } from "@babylonjs/core"
import * as GUI from "@babylonjs/gui/3D";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import HavokPhysics from "@babylonjs/havok";
import { IAppSceneContext } from "../Interfaces/IAppSceneContext";
import appSceneContext from "../Contexts/AppScene.context";
import GLBModel from "./Assets/GLBModel";
import assets from "./Assets";
import ISceneData, { IAsset } from "../Interfaces/ISceneData";
import { serverURL } from "../config";
import appContext from "../Contexts/AppContext";
import SphereLight from "./Assets/SphereLight";
import scripts from "./Scripts";
import EventType from "../Interfaces/EventType";
import CollisionCallback from "./CollisionCallback";

class AppScene {
	loaded: boolean = false;
	editMode: boolean = false;
	sceneData: ISceneData;
	canvas: HTMLCanvasElement;
	engine: Engine;
	scene: Scene;
	assets: any[];
	collisionCallback: CollisionCallback;
	gizmoManager!: GizmoManager;
	constructor(sceneData: ISceneData, editMode: boolean = false) {
		this.editMode = editMode;
		this.sceneData = sceneData;
		this.canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
		this.engine = new Engine(this.canvas);
		this.scene = this.createScene();
		appSceneContext.setScene(this.scene);
		this.collisionCallback = new CollisionCallback(this.scene);
		appSceneContext.addNewAction("getEditMode", this.getEditMode.bind(this));
		appSceneContext.addNewAction("addNewAsset", this.addNewAsset.bind(this));
		appSceneContext.addNewAction("setGizmoManager", this.setGizmoManager.bind(this));
		appSceneContext.collisionCallback = this.collisionCallback;
		this.assets = [];
		this.engine.runRenderLoop(() => {
			this.update();
			this.scene.render();
		})
		this.setEditMode();
	}
	createScene(): Scene {
		const scene: Scene = new Scene(this.engine);
		scene.createDefaultCameraOrLight(true, true, true);
		HavokPhysics().then(res => {
			const hk = new BABYLON.HavokPlugin(true, res);
			// enable physics in the scene with a gravity
			this.scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), hk);
			//this.importGLBModels();
			this.sceneData.assets.forEach(async asset => {
				let res = await this.setAssets(asset);
				if (this.assets.length === this.sceneData.assets.length) {
					this.setLoaded(true);
					this.initial();
				}
			})
		});
		return scene;
	}
	async setAssets(asset: IAsset) {
		if (asset.path) {
			let res = await SceneLoader.ImportMeshAsync("", `${serverURL}${asset.path}`, asset.fileName, this.scene);
			let ClassName = assets[asset.type] as any;
			this.assets.unshift(new ClassName(res, asset));
			return res;
		} else {
			let ClassName = assets[asset.type] as any;
			this.assets.unshift(new ClassName(asset));
			return true;
		}
	}

	async addNewAsset(asset: IAsset) {
		let res = await this.setAssets(asset);
		this.sceneData.assets.unshift(asset);
	}

	setEditMode() {
		if (this.editMode) {
			//this.setGizmoManager();
		}
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

	setLoaded(value: boolean): any {
		this.loaded = true;
	}
	setGizmoManager(value: string) {
		if (!this.gizmoManager)
			this.gizmoManager = new BABYLON.GizmoManager(this.scene);
		switch (value) {
			case "MOVE":
				this.gizmoManager.positionGizmoEnabled = true;
				this.gizmoManager.rotationGizmoEnabled = false;
				this.gizmoManager.scaleGizmoEnabled = false;
				break;
			case "ROTATE":
				this.gizmoManager.positionGizmoEnabled = false;
				this.gizmoManager.rotationGizmoEnabled = true;
				this.gizmoManager.scaleGizmoEnabled = false;
				break;
			case "SCALE":
				this.gizmoManager.positionGizmoEnabled = false;
				this.gizmoManager.rotationGizmoEnabled = false;
				this.gizmoManager.scaleGizmoEnabled = true;
				break;

			default:
				this.gizmoManager.positionGizmoEnabled = false;
				this.gizmoManager.rotationGizmoEnabled = false;
				this.gizmoManager.scaleGizmoEnabled = false;
				break;
		}
	}
	getEditMode(): boolean {
		return this.editMode;
	}
	saveData(): ISceneData {
		this.assets.forEach(ass => {
			ass.saveData();
		})
		return this.sceneData;
	}

}

export default AppScene;
