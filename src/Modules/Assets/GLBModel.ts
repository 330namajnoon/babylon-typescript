import { AbstractMesh, AnimationGroup, ISceneLoaderAsyncResult, Mesh, PhysicsAggregate, PhysicsShapeType, Scene, Vector3 } from "@babylonjs/core";
import * as GUI from "@babylonjs/gui/3D";
import "@babylonjs/loaders";
import { IAsset } from "../../Interfaces/ISceneData";
import ScriptType from "../../Interfaces/ScriptType";
import scripts from "../Scripts";
import appSceneContext from "../../Contexts/AppScene.context";
import appContext from "../../Contexts/AppContext";
export default class GLBModel {
    meshes: AbstractMesh[];
    animationGroups: AnimationGroup[];
    assetData: IAsset;
    aggregate!: PhysicsAggregate;
    scripts: any[] = [];
    constructor(modelData: ISceneLoaderAsyncResult, assetData: IAsset) {
        this.assetData = assetData;
        this.meshes = modelData.meshes;
        this.animationGroups = modelData.animationGroups;
        this.setModelLocation(0);
        this.animationGroups.forEach((animation: AnimationGroup) => {
            animation.loopAnimation = false;
            animation.pause();
        });
        if (!appSceneContext.getAction("getEditMode")(null)) {
            //this.setAggregate(0);
            this.setScripts();
        } else {
            this.setDataTable();
            this.setDevScripts();
        }
    }
    setScripts(): void {
        this.scripts = [];
        this.assetData.scripts.forEach((script: ScriptType) => {
            const Script = scripts[script];
            this.scripts.unshift(new Script(this));
        });
    }
    setDevScripts(): void {
        this.scripts = [];
        this.assetData.devScripts.forEach((script: ScriptType) => {
            const Script = scripts[script];
            this.scripts.unshift(new Script(this));
        });
    }
    setDataTable(): void {
        this.meshes.forEach((m) => {
            m.id = this.assetData.id;
            m.isPickable = true;
        });
        //this.aggregate.body.setCollisionCallbackEnabled(true);
        appSceneContext.collisionCallback.addEventListener("onPointerDown", this.assetData.id, (event, pickInfo) => {
            appContext.getAction("setTableData")(this);
        });
    }
    setModelLocation(index: number) {
        const mesh = this.meshes[index];
        const pos = this.assetData.position;
        const rot = this.assetData.rotation;
        const scale = this.assetData.scale;
        mesh.position = new Vector3(pos.x, pos.y, pos.z);
        mesh.rotation = new Vector3(rot.x, rot.y, rot.z);
        mesh.scaling = new Vector3(scale.x, scale.y, scale.z);
    }
    setAggregate(index: number) {
        this.aggregate = new PhysicsAggregate(this.meshes[2], PhysicsShapeType.BOX, { mass: 0 }, appSceneContext.getScene());
    }
    initial() {
        this.scripts.forEach((script) => {
            if (script.initial) script.initial();
        });
    }
    update() {
        this.scripts.forEach((script) => {
            if (script.update) script.update();
        });
    }

    saveData(): void {
        let mesh = this.meshes[0];

        let mPos = mesh.position;
        let mRot = mesh.rotation;
        let mSca = mesh.scaling;

        console.log(mRot);

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
