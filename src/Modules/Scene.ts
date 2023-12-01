import { Engine, Scene, MeshBuilder, SceneLoader, Vector3, HavokPlugin, PhysicsShapeType, PhysicsAggregate, GizmoManager } from "@babylonjs/core"
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import HavokPhysics from "@babylonjs/havok";
import { IAppSceneContext } from "../Interfaces/IAppSceneContext";
import appSceneContext from "../Contexts/AppScene.context";
import GLBModel from "./GLBModel";
import assets from "./Assets";
import ISceneData, { IAsset } from "../Interfaces/ISceneData";
import { serverURL } from "../config";
import appContext from "../Contexts/AppContext";
import SphereLight from "./Assets/SphereLight";


class AppScene {
	loaded: boolean = false;
	editMode: boolean = false;
	sceneData: ISceneData;
	canvas: HTMLCanvasElement;
	engine: Engine;
	scene: Scene;
	assets: any[];
	gizmoManager!: GizmoManager;
	constructor(sceneData: ISceneData, editMode: boolean = false) {
		this.editMode = editMode;
		this.sceneData = sceneData;
		this.canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
		this.engine = new Engine(this.canvas);
		this.scene = this.createScene();
		appSceneContext.setScene(this.scene);
		appSceneContext.addNewAction("getEditMode", this.getEditMode.bind(this));
		appSceneContext.addNewAction("addNewAsset", this.addNewAsset.bind(this));
		this.assets = [];
		this.engine.runRenderLoop(() => {
			this.draw();
			this.update();
			this.scene.render();
		})
		this.setEditMode();
	}
	createScene(): Scene {
		const scene: Scene = new Scene(this.engine);
		scene.createDefaultCameraOrLight(true, false, true);
		HavokPhysics().then(res => {
			const hk = new BABYLON.HavokPlugin(true, res);
			// enable physics in the scene with a gravity
			this.scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), hk);
			//this.importGLBModels();
			this.sceneData.assets.forEach(async asset => {
				let res = await this.setAssets(asset);
				if (this.assets.length === this.sceneData.assets.length)
					this.setLoaded(true);
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

	importGLBModels() {
		try {
			// setInterval(() => {
			// 	const box = MeshBuilder.CreateSphere("box", { diameter: 0.1 });
			// 	box.position.y = Math.floor(Math.random() * 5) + 50;
			// 	box.position.x = Math.floor(Math.random() * 20);
			// 	box.position.z = Math.floor(Math.random() * 20);
			// 	const sphereAggregate = new BABYLON.PhysicsAggregate(box, BABYLON.PhysicsShapeType.SPHERE, { mass: 0.1, restitution: 0.1 }, this.scene);
			// }, 10)
			const plane = MeshBuilder.CreateGround("ground", { width: 50, height: 50 }, this.scene);
			const planeAgregate = new PhysicsAggregate(plane, PhysicsShapeType.BOX, { mass: 0 }, this.scene);
		} catch (error) {

		}
	}
	setEditMode() {
		if (this.editMode) {
			this.setGizmoManager();
		}
	}
	draw() {
		this.assets.forEach(asset => {
			asset.draw();
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
	setGizmoManager() {
		this.gizmoManager = new BABYLON.GizmoManager(this.scene);
		this.gizmoManager.positionGizmoEnabled = true;
		this.gizmoManager.rotationGizmoEnabled = true;
		this.gizmoManager.scaleGizmoEnabled = true;
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
