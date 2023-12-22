import {useEffect, useState} from "react"
import './css/App.css';
import AppScene from "../Modules/Scene";
import { serverURL } from "../config";
import axios from "axios";
import ISceneData from "../Interfaces/ISceneData";
import Editor from "./Editor/Editor";
import appContext from "../Contexts/AppContext";
import {Menu,Option} from "./Editor/Menu";


function App() {
  const [editMode, setEditMode] = useState<boolean>(window.location.search.split("editKey=")[1] === "true" ? true : false);
  const [scene, setScene] = useState<AppScene>();
  useEffect(() => {
    appContext.addNewAction("appSetEditMode", setEditMode)
    axios.get(serverURL+"/world/scene002").then((res:any) => {
      const scene_:AppScene = new AppScene(res.data.data as ISceneData,editMode);
      setScene(scene_);
      window.addEventListener("resize", () => {
        scene_?.engine.resize();
      })
    }).catch((error:any) => {

    })
  }, [])

  function onSave() {
    const sceneData = scene?.saveData();
    const formData = new FormData();
    formData.append("scene", JSON.stringify(sceneData));
    axios.post(serverURL+"/update_world", formData).then((res:any) => {

      console.log(res);
    })
  }

  return (
    
      <div className="App">
          <canvas id="renderCanvas"></canvas>
          {editMode ? (
              <Editor >
                <Menu>
                  <Option value="assetsList">Assets</Option>
                </Menu>
                
                <input type="button" value={"Save"} onClick={onSave} style={{position:"absolute",zIndex: 1000}} />
              </Editor>
          ) : (
            <div>Loading</div>
          )}
      </div>
  
  );
}

export default App;
