
import AppScene from "../Modules/Scene";
import Context from "./Context";

class AppContext extends Context {
    assets!: any[];

    setAssets(assets: any[]):void {
        this.assets = assets;
    }
    getAssets(): any[] {
        return this.assets;
    }
}

const appContext:AppContext = new AppContext();

export default appContext;