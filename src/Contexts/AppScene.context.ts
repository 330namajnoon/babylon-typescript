import { Scene } from "@babylonjs/core"
import { IAppSceneContext, IAction } from "../Interfaces/IAppSceneContext"
import Context from "./Context";

class AppSceneContext extends Context {
	scene!: Scene;
	setScene(scene: Scene) {
		this.scene = scene;
	}
	getScene(): Scene {
		return this.scene;
	}
}

const appSceneContext = new AppSceneContext();

export default appSceneContext;