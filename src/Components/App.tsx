import { useEffect } from "react";
import AppScene from "../babylon-engine/src/Modules/Scene";
import axios from "axios";
import { serverURL } from "../config";
import { IAsset } from "../Interfaces/ISceneData";
import scripts from "./Scripts";

function App() {
  
  useEffect(() => {
    axios.get(`${serverURL}/world/scene002`).then(response => {
      const assetsData = response.data.data.assets as IAsset[];
      const scene = new AppScene({modules: [], canvas: window.document.getElementById("renderCanvas") as HTMLCanvasElement});
      assetsData.forEach((asset, index) => {
        scene.import3DModel2("Fuk" + index, serverURL + asset.path, asset.fileName,  asset.scripts.map((script: any) => (scripts[script as "CameraPosition"])))
        console.log(asset.scripts.map((script: any) => (scripts[script as "CameraPosition"])));
      })
    })
  }, [])
  return (
      <div className="App">
          <canvas style={{width: window.innerWidth, height: window.innerHeight}} id="renderCanvas"></canvas>
      </div>
  );
}

export default App;
