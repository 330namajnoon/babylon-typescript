import { AbstractMesh } from "@babylonjs/core"

export default interface IGlbModel {
	loaded: boolean;
	meshs: AbstractMesh[];
}