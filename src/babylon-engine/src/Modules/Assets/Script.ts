import AppScene from "../Scene";
import GLBModel from "./GLBModel";

export default class Script {
    entity: GLBModel;
    app: AppScene;
    constructor (entity: GLBModel, app: AppScene) {
        this.entity = entity;
        this.app = app;
    }
}