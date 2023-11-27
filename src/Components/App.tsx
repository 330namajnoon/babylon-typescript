import {useEffect} from "react"
import './css/App.css';
import AppScene from "../Modules/Scene";
import IScene from "../Interfaces/IScene";

function App() {
  useEffect(() => {
    const scene: AppScene = new AppScene();
    window.addEventListener("resize", () => {
      scene.engine.resize();
    })
  }, [])
  return (
    <div className="App">
        <canvas id="renderCanvas"></canvas>
    </div>
  );
}

export default App;
