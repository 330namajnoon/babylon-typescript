import { Component, ReactNode, useEffect, useState } from "react";
import AppScene from "../../Modules/Scene";
import axios from "axios";
import { serverURL } from "../../config";
import appContext from "../../Contexts/AppContext";
import { AssetsList } from "./Assets";
import "./sass/Editor.scss"

type EditorProps = {
    children: ReactNode;
}
type EditorState = {
    assets: any[];
    pageSelected: string;
}

const Editor = (props: EditorProps) => {

    const [state, setState] = useState<EditorState>({assets: [],pageSelected:""});
    
    useEffect(() => {
        axios.get<any[]>(serverURL + "/assets").then((res) => {
        
            if (res.data) {
                let newState:EditorState = {...state};
                newState.assets = res.data[0].Models
                setState(newState);
              
            }
        })
    }, [])

    const setPageSelected = (name: string) => {
        let newState = {...state};
        newState.pageSelected = name;
        setState(newState);
    }

    appContext.addNewAction("setPageSelected", setPageSelected);

    return (
        <div  className="editor_container">
            {props.children}
            <AssetsList name="assetsList" pageSelected={state.pageSelected} assets={state?.assets} />
        </div>
    )

}

export default Editor;