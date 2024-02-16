import { IPointerEvent, PickingInfo, Scene } from "@babylonjs/core"
import { IAppSceneContext, IAction } from "../Interfaces/IAppSceneContext"
import Context from "./Context";
import EventType from "../Interfaces/EventType";
import CollisionCallback from "../Modules/CollisionCallback";

class AppSceneContext extends Context {
	scene!: Scene;
	collisionCallback!: CollisionCallback;
	setScene(scene: Scene) {
		this.scene = scene;
	}
	getScene(): Scene {
		return this.scene;
	}
	
}

const appSceneContext = new AppSceneContext();

export default appSceneContext;