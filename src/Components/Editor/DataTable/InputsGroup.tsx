import React, { Component, ReactNode, useRef } from "react";
import Icon from "../../Icon";

type Props = {
    children: ReactNode;
};
type State = {
    opened: boolean;
};

export default class InputsGroup extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            opened: false,
        };
    }

    open_close = (e: any) => {
        if (this.state.opened) this.setState({ opened: false });
        else this.setState({ opened: true });
    };
    render(): ReactNode {
        return (
            <div className="inputsGroup_container">
                <div className={`inputs_container ${this.state.opened ? "opened" : "closed"}`}>{this.props.children}</div>
                <div
                    onClick={(e) => {
                        this.open_close(e);
                    }}
                    className="button_container"
                >
                    <Icon className="icon">{this.state.opened ? "expand_less" : "expand_more"}</Icon>
                </div>
            </div>
        );
    }
}
