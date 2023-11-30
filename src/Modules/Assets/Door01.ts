import BABYLON,{ ISceneLoaderAsyncResult, PhysicsAggregate, PhysicsShapeType, PhysicsHelper, Vector3, IPointerEvent, PickingInfo, IPhysicsCollisionEvent,  } from "@babylonjs/core"
import GLBModel from "../GLBModel";
import appSceneContext from "../../Contexts/AppScene.context";
import { IAsset } from "../../Interfaces/ISceneData";

export default class Door01 extends GLBModel {
	aggregate!: PhysicsAggregate;
	constructor(modelData: ISceneLoaderAsyncResult, assetData: IAsset) {
		super(modelData, assetData);
		if (!appSceneContext.getAction("getEditMode")(null)) {

			this.setAggregate(0);
	
			this.setCollisionCallback((event,pickingfo) => {
				
			})
	
			this.setCollisionObservable(collisionEvent => {
	
			})
		}

		window.addEventListener("keydown", (e) => {
			switch (e.keyCode) {
				case 32:
					this.jump();
					break;
			
				default:
					break;
			}
		})
	}
	setCollisionCallback(calback: (event:IPointerEvent, pickInfo:PickingInfo) => void) {
		this.aggregate.body.setCollisionCallbackEnabled(true);
		appSceneContext.getScene().onPointerDown = function (event, pickInfo) {
			calback(event,pickInfo);
		}
	}
	setCollisionObservable(calback: (collisionEvent:IPhysicsCollisionEvent) => void) {
		const observable = this.aggregate.body.getCollisionObservable();
		const observer = observable.add((collisionEvent) => {
			calback(collisionEvent);
		})
	}
	setAggregate(index: number) {
		this.aggregate = new PhysicsAggregate(this.meshes[2], PhysicsShapeType.BOX, { mass: 0 }, appSceneContext.getScene());
		
	}

	saveData():void {
		let mesh = this.meshes[0];

		let mPos = mesh.position;
		let mRot = mesh.rotation;
		let mSca = mesh.scaling;

		console.log(mRot)
		
		this.assetData.position.x = mPos.x;
		this.assetData.position.y = mPos.y;
		this.assetData.position.z = mPos.z;

		this.assetData.rotation.x = mRot.x;
		this.assetData.rotation.y = mRot.y;
		this.assetData.rotation.z = mRot.z;

		this.assetData.scale.x = mSca.x;
		this.assetData.scale.y = mSca.y;
		this.assetData.scale.z = mSca.z;
	}
	disposeAggregate():void {
		this.aggregate.dispose();
	}
	jump(): void {
		this.aggregate.body.applyForce(new Vector3(0,100,0), new Vector3(0,100,0));
	}

	draw(): void {

	}
	update(): void {
		
	}
}