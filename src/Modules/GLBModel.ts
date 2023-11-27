import { AbstractMesh, AnimationGroup,ISceneLoaderAsyncResult } from "@babylonjs/core"
import "@babylonjs/loaders"

export default class GLBModel {
	meshes: AbstractMesh[];
	animationGroups: AnimationGroup[];
	constructor(modelData: ISceneLoaderAsyncResult) {
		this.meshes = modelData.meshes;
		this.animationGroups = modelData.animationGroups;
		this.animationGroups.forEach((animation: AnimationGroup) => {
			animation.loopAnimation = false;
			animation.pause()
		})
	}
}