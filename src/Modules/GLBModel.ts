import { AbstractMesh, AnimationGroup,ISceneLoaderAsyncResult,Vector3 } from "@babylonjs/core"
import "@babylonjs/loaders"
import { IAsset } from "../Interfaces/ISceneData";

export default class GLBModel {
	meshes: AbstractMesh[];
	animationGroups: AnimationGroup[];
	assetData:IAsset;
	constructor(modelData: ISceneLoaderAsyncResult,assetData: IAsset) {
		this.assetData = assetData;
		this.meshes = modelData.meshes;
		this.animationGroups = modelData.animationGroups;
		this.setModelLocation(0);
		this.animationGroups.forEach((animation: AnimationGroup) => {
			animation.loopAnimation = false;
			animation.pause()
		})
	}
	setModelLocation(index: number) {
		const mesh = this.meshes[index];
		const pos = this.assetData.position;
		const rot = this.assetData.rotation;
		const scale = this.assetData.scale;
		mesh.position = new Vector3(pos.x,pos.y,pos.z);
		mesh.rotation = new Vector3(rot.x,rot.y,rot.z);
		mesh.scaling = new Vector3(scale.x,scale.y,scale.z);
	}
}