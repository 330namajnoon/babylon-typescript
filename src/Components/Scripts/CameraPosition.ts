import { DirectionalLight, Vector3 } from "@babylonjs/core";
import Script from "../../babylon-engine/src/Modules/Assets/Script";

export default class CameraPosition extends Script {
    initial: () => void = () => {
        this.app.camera.setPosition(new Vector3(-15, 50, 100));
        this.app.camera.setTarget(this.entity.meshes[1])
        this.entity.animationGroups[1].play(true);
        const light = new DirectionalLight("DirectionalLight", new Vector3(0, -1, 0), this.app.scene);
    };
    update: () => void = () => {
    };
}