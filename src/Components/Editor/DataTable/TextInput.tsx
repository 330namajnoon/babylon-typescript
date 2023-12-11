import { Component, ReactNode } from "react";
import { StateKeyType } from "./DataTable";

type Props = {
    name: string;
    value: string;
    stateKey: StateKeyType;
    onChenge: (key: StateKeyType, value: any) => void;
}

type State = {
    disabled: boolean;
}

class TextInput extends Component<Props, State>{

    componentDidMount(): void {
        this.setState({disabled: false});
    }
    render(): ReactNode {
        if (this.state) {
            return (
                <div className="input_container">
                    <div className="label_container">
                        <label className="inputLable" htmlFor="this.state.name" >{this.props.name}: </label>
                    </div>
                    <div className="input_container">
                        <input onChange={(e) => {this.props.onChenge(this.props.stateKey, e.target.value)}} className="textInput" disabled={this.state.disabled} id={this.props.name} type="text" value={this.props.value} />
                    </div>
                </div>
            );
        }else
            return null;
    }
}

export default TextInput;