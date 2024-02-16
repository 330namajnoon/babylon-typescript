
import IScript from "../../Interfaces/IScript";
import Script from "../Assets/Script";

export default class Fuk extends Script implements IScript {
    initial: () => void = () => {
        this.app.collisionCallback.addEventListener("onPointerDown", this.entity.name, (event, pichInfo) => {
            console.log(this.entity.animationGroups)
            this.entity.animationGroups[1].play(true);
        });
    };
    update: () => void = () => {
        
    };
}