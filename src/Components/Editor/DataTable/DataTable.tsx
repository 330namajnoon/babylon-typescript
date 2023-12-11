import { Component, ReactNode, useEffect, useState } from "react";
import "./sass/DataTable.scss";
import { IAsset } from "../../../Interfaces/ISceneData";
import appContext from "../../../Contexts/AppContext";
import TextInput from "./TextInput";
import InputsGroup from "./InputsGroup";

type Props = {};

export type StateKeyType = "id" | "name" | "position" | "fileName" | "path" | "type";

class DataTable extends Component<Props, IAsset> {
    constructor(props: any) {
        super(props);
        this.state as IAsset;
        appContext.addNewAction("setTableData", this.setTableData.bind(this));
    }

    setTableData = (data: IAsset) => {
        this.setState(data);
    };

    onChenge(key: StateKeyType, value: any) {
        let newState = { ...this.state };
        newState[key] = value;
        this.setState(newState);
        console.log(this.state);
    }

    render(): ReactNode {
        if (this.state) {
            return (
                <div className="dataTable_container">
                    <InputsGroup>
                        <TextInput onChenge={this.onChenge.bind(this)} name="Name" value={this.state.name} stateKey="name" />
                        <TextInput onChenge={this.onChenge.bind(this)} name="ID" value={this.state.id} stateKey="id" />
                    </InputsGroup>
                    <InputsGroup>
                        <TextInput onChenge={this.onChenge.bind(this)} name="File name" value={this.state.fileName} stateKey="fileName" />
                        <TextInput onChenge={this.onChenge.bind(this)} name="Path" value={this.state.path} stateKey="path" />
                        <TextInput onChenge={this.onChenge.bind(this)} name="Type" value={this.state.type} stateKey="type" />
                    </InputsGroup>
                </div>
            );
        } else return null;
    }
}

export default DataTable;
