import { IPointerEvent, PickingInfo } from "@babylonjs/core";
import appSceneContext from "../../Contexts/AppScene.context";
import IScript from "../../Interfaces/IScript";
import GLBModel from "../Assets/GLBModel";
import Script from "../Assets/Script";

export default class OpenTheDoor extends Script implements IScript {
    constructor(entity: GLBModel) {
        super(entity);
        this.entity.aggregate.body.setCollisionCallbackEnabled(true);
        // this.entity.meshes[3].id = this.entity.assetData.id;
    }

    initial() {
        this.entity.meshes[3].id = this.entity.assetData.id;
        appSceneContext.collisionCallback.addEventListener("onPointerDown", this.entity.assetData.id, (event, pichInfo) => {
            this.entity.animationGroups[0].play();
        })
    }
    update() {

    }
}