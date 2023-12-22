import { Mesh, PhysicsAggregate, PhysicsBody, PhysicsImpostor, PhysicsMotionType, PhysicsShapeMesh, PhysicsShapeType } from "@babylonjs/core";
import IScript from "../../Interfaces/IScript";
import Script from "../Assets/Script";
import appSceneContext from "../../Contexts/AppScene.context";

export default class Physic extends Script implements IScript {
    initial() {
        // let p1 = new PhysicsAggregate(this.entity.meshes[0], PhysicsShapeType[this.entity.assetData.attributes.find(at => at.name === "type")?.value as "BOX" | "SPHERE"], {mass: this.entity.assetData.attributes.find(at => at.name === "mass")?.value as number}, appSceneContext.getScene());
        let mesh = new Mesh("",appSceneContext.scene);
        mesh.addChild(this.entity.meshes[0]);
        if(this.entity.assetData.name === "Pelota") {

            let p1 = new PhysicsBody(this.entity.meshes[0], PhysicsMotionType.DYNAMIC,false ,appSceneContext.scene);
        }
        if(this.entity.assetData.name === "Suelo") {

            let p1 = new PhysicsBody(this.entity.meshes[0], PhysicsMotionType.STATIC,false ,appSceneContext.scene);
        }
        //let p2 = new PhysicsShapeMesh(mesh, appSceneContext.getScene());

    }
    update() {

    }
}