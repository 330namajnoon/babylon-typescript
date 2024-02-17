import { IPointerEvent, PickingInfo } from "@babylonjs/core";
import appSceneContext from "../../Contexts/AppScene.context";
import IScript from "../../Interfaces/IScript";
import GLBModel from "../Assets/GLBModel";
import Script from "../Assets/Script";
import HDRCube from "../Assets/HDRCube";

export default class OpenTheDoor extends Script {

    initial = () => {
        // this.entity.meshes[3].id = this.entity.name;
        // appSceneContext.collisionCallback.addEventListener("onPointerDown", this.entity.assetData.id, (event, pichInfo) => {
        //     this.entity.animationGroups[0].play();
        // });

        // const hdriImage = new HDRCube(`${serverURL}/My3DView/assets/hdri/evening_road_01_puresky_4k.hdr`,appSceneContext.scene, 512, 0.6, 1.6);
    }
    update = () => {

    }
}