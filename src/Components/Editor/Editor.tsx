import { Component, ReactNode } from "react";
import AppScene from "../../Modules/Scene";


export default class Editor extends Component<{ children: ReactNode|null}> {
    constructor(props: any) {
        super(props)
    }

    render(): ReactNode {
        return (
            <div style={{position:"absolute",zIndex: 1000,top:0,left:0}} id="editor_container">
                {this.props.children}
            </div>
        )
    }
}