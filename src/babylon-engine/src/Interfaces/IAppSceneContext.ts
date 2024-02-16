import {Scene} from "@babylonjs/core"

export interface IAction {
	name: string;
	action: any;
}

export interface IAppSceneContext {
	scene: Scene;
	actions: IAction[];
	setScene: (scene: Scene) => void;
	addNewAction: (action: IAction) => void;
	getScene: () => Scene;
	getActions: (name: string) => any
}