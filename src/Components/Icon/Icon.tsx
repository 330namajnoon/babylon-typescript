import { Component, ReactNode } from "react";

export default class Icon extends Component<{children: string, className: string}> {
	render(): ReactNode {
		return (
			<span className={"material-symbols-outlined "+this.props.className}>
				{this.props.children}
			</span>
		)
	}
}