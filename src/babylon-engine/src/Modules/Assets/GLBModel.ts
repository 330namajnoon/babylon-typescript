import { AbstractMesh, AnimationGroup, ISceneLoaderAsyncResult } from "@babylonjs/core";
import AppScene from "../Scene";

export default class GLBModel {
    name: string;
    scriptsModules!: any[]
    meshes: AbstractMesh[];
    animationGroups: AnimationGroup[];
    app: AppScene;
    scripts: any[] = [];
    constructor(name: string, modelData: ISceneLoaderAsyncResult, scripts: any[], app: AppScene) {
        this.name = name
        this.app = app;
        this.scriptsModules = scripts;
        this.meshes = modelData.meshes;
        this.animationGroups = modelData.animationGroups;
        this.animationGroups.forEach((animation: AnimationGroup) => {
            animation.loopAnimation = false;
            animation.pause();
        });
        this.setScripts();
    }

    setScripts = () => {
        this.scripts = [];
        this.scriptsModules.forEach((script: any) => {
            const Script = script;
            const newScript = new Script(this, this.app)
            newScript.initial();
            this.scripts.unshift(new Script(this, this.app));
        });
    }
    
    initial = () => {
        this.scripts.forEach((script) => {
            if (script.initial) script.initial();
        });
    }
    update = () => {
        this.scripts.forEach((script) => {
            if (script.update) script.update();
        });
    }
}
