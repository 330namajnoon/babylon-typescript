import Script from "../Assets/Script";
import GLBModel from "../Assets/GLBModel";

export default class ChengeSize extends Script {
    sx: number = 0.01;
    frame:number = 0;
    initial() {
        this.entity.animationGroups[0].play();
    }
    update() {
        this.frame++;
        this.entity.meshes[0].position.x += this.sx;
        if (this.frame % 100 === 0)
            this.sx *= -1;
    }
}