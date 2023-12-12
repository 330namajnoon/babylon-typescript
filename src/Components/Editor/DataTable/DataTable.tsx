import { Component, ReactNode, useEffect, useState } from "react";
import "./sass/DataTable.scss";
import { IAsset } from "../../../Interfaces/ISceneData";
import appContext from "../../../Contexts/AppContext";
import TextInput from "./TextInput";
import InputsGroup from "./InputsGroup";
import Vector3Input from "./Vector3Input";
import GLBModel from "../../../Modules/Assets/GLBModel";

type Props = {};

export type StateKeyType = "id" | "name" | "position" | "fileName" | "path" | "type" | "rotation" | "scale";

class DataTable extends Component<Props, GLBModel> {
    constructor(props: any) {
        super(props);
        this.state as GLBModel;
        appContext.addNewAction("setTableData", this.setTableData.bind(this));
        window.document.addEventListener("mouseup", (e) => {
            this.saveData();
        })
    }
    
    setTableData = (entity: GLBModel) => {
        this.setState(entity);
    };

    onChenge(key: StateKeyType, value: any) {
        let newState = this.state as any;
        newState.assetData[key] = value;
        this.setState(newState);
        console.log(this.state);
    }
    vector3onChenge(key: StateKeyType, value: any) {
        let newState = this.state as any;
        newState.assetData[key].x = value.x;
        newState.assetData[key].y = value.y;
        newState.assetData[key].z = value.z;
        this.setLocation();
        this.setState(newState);
        
    }
    saveData(): void {
        const newState = this.state as any
        let mesh = newState.meshes[0];

        let mPos = mesh.position;
        let mRot = mesh.rotation;
        let mSca = mesh.scaling;

        newState.assetData.position.x = mPos.x;
        newState.assetData.position.y = mPos.y;
        newState.assetData.position.z = mPos.z;

        newState.assetData.rotation.x = mRot.x;
        newState.assetData.rotation.y = mRot.y;
        newState.assetData.rotation.z = mRot.z;

        newState.assetData.scale.x = mSca.x;
        newState.assetData.scale.y = mSca.y;
        newState.assetData.scale.z = mSca.z;
        this.setState(newState);
    }
    setLocation() {
        let mesh = this.state.meshes[0];
        let position = this.state.assetData.position;
        let rotation = this.state.assetData.rotation;
        let scale = this.state.assetData.scale;
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


    render(): ReactNode {
        console.log(this.state)
        if (this.state) {
            return (
                <div className="dataTable_container">
                    <InputsGroup name="Details">
                        <TextInput onChenge={this.onChenge.bind(this)} name="Name" value={this.state.assetData.name} stateKey="name" />
                        <TextInput onChenge={this.onChenge.bind(this)} name="ID" value={this.state.assetData.id} stateKey="id" />
                    </InputsGroup>
                    <InputsGroup name="Position">
                        <TextInput onChenge={this.onChenge.bind(this)} name="File N" value={this.state.assetData.fileName} stateKey="fileName" />
                        <TextInput onChenge={this.onChenge.bind(this)} name="Path" value={this.state.assetData.path} stateKey="path" />
                        <TextInput onChenge={this.onChenge.bind(this)} name="Type" value={this.state.assetData.type} stateKey="type" />
                    </InputsGroup>
                    <InputsGroup name="Position">
                        <Vector3Input onChenge={this.vector3onChenge.bind(this)} vector3={this.state.assetData.position} name="Position" stateKey="position" />
                    </InputsGroup>
                </div>
            );
        } else return null;
    }
}

export default DataTable;
