
import { Scene, Engine, Mesh } from "@babylonjs/core";
import IGlbModel from "./IGlbModel";
import { IAppSceneContext } from "./IAppSceneContext";

export default interface IScene {
	context: IAppSceneContext;
	canvas: HTMLCanvasElement;
	engine: Engine;
	scene: Scene;
	glbModels: IGlbModel[];
	createScene: () => Scene;
	draw: () => void;
	update: () => void;
}