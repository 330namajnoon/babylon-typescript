import { Scene } from "@babylonjs/core"
import { IAppSceneContext, IAction } from "../Interfaces/IAppSceneContext"

class AppSceneContext implements IAppSceneContext {
	scene!: Scene;
	actions!: IAction[];
	setScene(scene: Scene) {
		this.scene = scene;
	}
	addNewAction(action: IAction) {
		this.actions.unshift(action);
	}

	getScene(): Scene {
		return this.scene;
	}
	getActions(name: string): () => any {
		let action = this.actions.find(action => action.name === name);
		if (action) {
			return action.action;
		} else {
			return () => {
				return null;
			}
		}
	}
}

const appSceneContext = new AppSceneContext();

export default appSceneContext;