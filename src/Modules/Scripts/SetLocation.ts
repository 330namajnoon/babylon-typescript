import Script from "../Assets/Script";
import IScript from "../../Interfaces/IScript";
import GLBModel from "../Assets/GLBModel";
import appSceneContext from "../../Contexts/AppScene.context";


export default class SetLocation extends Script implements IScript {

    initial() {
        console.log(this.entity.assetData)
    }
    
    update() {
        
    }
    setLocation() {
        let mesh = this.entity.meshes[0];
        let position = this.entity.assetData.position;
        let rotation = this.entity.assetData.rotation;
        let scale = this.entity.assetData.scale;
        mesh.position.x = position.x;
        mesh.position.y = position.y;
        mesh.position.z = position.z;

        mesh.rotation.x = rotation.x;
        mesh.rotation.y = rotation.y;
        mesh.rotation.z = rotation.z;
        
        mesh.scaling.x = scale.x;
        mesh.scaling.y = scale.y;
        mesh.scaling.z = scale.z;
    }
}