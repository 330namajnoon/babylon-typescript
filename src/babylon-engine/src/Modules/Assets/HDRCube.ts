import { BackgroundMaterial, HDRCubeTexture, Mesh, MeshBuilder, PBRMaterial, Scene } from "@babylonjs/core";
import AppScene from "../Scene";


export default class HDRCube {
    hdrTexture: HDRCubeTexture;
    pbrMaterial: PBRMaterial;
    skybox: Mesh;
    constructor(path: string, scene: Scene, size: number, exposure: number, contrast: number) {
        this.skybox = MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
        var skyboxMaterial = new BackgroundMaterial("skyBoxMaterial", scene);
        this.hdrTexture = new HDRCubeTexture(path, scene, size);
        scene.environmentTexture = this.hdrTexture;
        scene.imageProcessingConfiguration.exposure = exposure;
        scene.imageProcessingConfiguration.contrast = contrast;
        this.pbrMaterial = new PBRMaterial("pbr", scene);
        this.pbrMaterial.reflectanceTexture = this.hdrTexture;
    }
}