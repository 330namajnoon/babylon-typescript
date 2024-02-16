import ScriptType from "./ScriptType";

export type AssetType = "SphereLight" | "GLBModel"; 

export interface Vextor3 {
    x: number;
    y: number;
    z: number;
}

export interface IAsset {
    id: string;
    name: string;
    type: AssetType;
    path: string;
    fileName: string;
    position: Vextor3;
    rotation: Vextor3;
    scale: Vextor3;
    devScripts: ScriptType[]
    scripts: ScriptType[];
}

export default interface ISceneData {
    sceneID: string;
    assets: IAsset[];
}
