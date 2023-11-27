import BABYLON,{ ISceneLoaderAsyncResult, PhysicsAggregate, PhysicsShapeType, PhysicsHelper, Vector3,  } from "@babylonjs/core"
import GLBModel from "./GLBModel";
import appSceneContext from "../Contexts/AppScene.context";

export default class Door01 extends GLBModel {
	aggregate: PhysicsAggregate;
	constructor(modelData: ISceneLoaderAsyncResult) {
		super(modelData);

		this.aggregate = new PhysicsAggregate(this.meshes[2], PhysicsShapeType.BOX, { mass: 1 }, appSceneContext.getScene());
		this.aggregate.body.setCollisionCallbackEnabled(true);
		const jump = this.jump.bind(this);
		appSceneContext.getScene().onPointerDown = function (event, pickInfo) {
			if (pickInfo.hit && pickInfo.pickedMesh?.id === "Cube")
				jump();
		}

		const observable = this.aggregate.body.getCollisionObservable();
		const observer = observable.add((collisionEvent) => {
			console.log(collisionEvent.collidedAgainst.transformNode.name);
		})

		window.addEventListener("keydown", (e) => {
			console.log(e.key,e.keyCode)
			switch (e.keyCode) {
				case 32:
					this.jump();
					break;
			
				default:
					break;
			}
		})
	}

	jump(): void {
		this.aggregate.body.applyForce(new Vector3(0,100,0), new Vector3(0,100,0));
	}
}