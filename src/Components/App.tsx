import { useEffect } from "react";
import AppScene from "../babylon-engine/src/Modules/Scene";

function App() {
  
  useEffect(() => {
    const scene = new AppScene({modules: [], canvas: window.document.getElementById("renderCanvas") as HTMLCanvasElement});
    console.log(scene);
  }, [])
  return (
      <div className="App">
          <canvas id="renderCanvas"></canvas>
      </div>
  );
}

export default App;
