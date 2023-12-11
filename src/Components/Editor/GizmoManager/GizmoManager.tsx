import { useEffect, useState } from "react";
import "./GizmoManager.scss";
import appSceneContext from "../../../Contexts/AppScene.context";
import { render } from "@testing-library/react";

const GizmoManager = () => {
    const [state, setState] = useState([
        {
            value: "MOVE",
            icon: "./Assets/Images/Move_Gizmo.png",
            enabled: false,
        },
        {
            value: "ROTATE",
            icon: "./Assets/Images/Rotate_Gizmo.png",
            enabled: false,
        },
        {
            value: "SCALE",
            icon: "./Assets/Images/Scale_Gizmo.png",
            enabled: false,
        }
    ])


    const chengeGizmo = (value: string) => {
        let newState = state.map(op => {
            op.enabled = false;
            return op;
        })
        let find = newState.find(op => op.value === value);
        if (find)
            find.enabled = true;
        appSceneContext.getAction("setGizmoManager")(value);
        setState(newState);
    }

    useEffect(() => {
       // chengeGizmo("MOVE");
    }, [])
    return (
        <div className="gizmoManager_container">
            <div>
                {
                    state.map((option, index) => (
                        <div onClick={() => { chengeGizmo(!option.enabled ? option.value : "") }} className={option.enabled ? "gizmo_selected" : ""} key={index}>
                            <img key={index} src={option.icon} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default GizmoManager;