import appSceneContext from "../../Contexts/AppScene.context";
import { IAsset } from "../../Interfaces/ISceneData";
import * as BABYLON from "@babylonjs/core";

export default class SphereLight {
    assetData: IAsset;
    sphere:BABYLON.Mesh; 
    light: BABYLON.PointLight;
    material: BABYLON.StandardMaterial;
    pow: number = 5;
    frame: number = 0;
    gl: BABYLON.GlowLayer;
    sign: number = 1;
    constructor (assetData: IAsset) {
        this.assetData = assetData;
        this.sphere = BABYLON.MeshBuilder.CreateSphere(assetData.name, {}, appSceneContext.getScene());
        this.material = new BABYLON.StandardMaterial(assetData.name, appSceneContext.getScene());
        this.material.emissiveColor = new BABYLON.Color3(1,1,1);
        this.material.maxSimultaneousLights = 6;
        this.sphere.material = this.material;
        this.gl = new BABYLON.GlowLayer(assetData.name, appSceneContext.getScene());
        this.gl.addIncludedOnlyMesh(this.sphere);
        this.sphere.position = new BABYLON.Vector3(assetData.position.x, assetData.position.y, assetData.position.z);
        this.light = new BABYLON.PointLight(assetData.name, this.sphere.position, appSceneContext.getScene());
    }

    draw(): void {

        this.gl.intensity = this.pow;
        this.light.diffuse.b = this.pow;
        this.light.diffuse.r = this.pow;
        this.light.diffuse.g = this.pow;
        this.material.emissiveColor.b = this.pow;
        this.material.emissiveColor.r = this.pow;
        this.material.emissiveColor.g = this.pow;
    }
	update(): void {
        this.frame++;
        if (this.frame % 2 == 0) {
            if (this.pow >= 10 || this.pow <= 4)
                this.sign *= -1;
            this.pow += this.sign / 10;
        }
	}

    saveData():void {
		let mesh = this.sphere;

		let mPos = mesh.position;
		let mRot = mesh.rotation;
		let mSca = mesh.scaling;
		
		this.assetData.position.x = mPos.x;
		this.assetData.position.y = mPos.y;
		this.assetData.position.z = mPos.z;

		this.assetData.rotation.x = mRot.x;
		this.assetData.rotation.y = mRot.y;
		this.assetData.rotation.z = mRot.z;

		this.assetData.scale.x = mSca.x;
		this.assetData.scale.y = mSca.y;
		this.assetData.scale.z = mSca.z;
	}
}