import { Children, ReactNode, useState } from "react";
import Option from "./Option";
import "./sass/Menu.scss";
import Icon from "../../Icon";

type MenuState = {
	showOptions: boolean;
}

type MenuProps = {
	children: ReactNode;
}

const Menu = (props: MenuProps) => {

	const [state, setState] = useState<MenuState | null>(null)

	const setShowOptions = () => {
		setState({showOptions: state?.showOptions ? false : true});
	}

	return (
		<>
			<div onClick={setShowOptions} className="menu-container">
				<Icon className="icon">menu</Icon>
			</div>
			{state?.showOptions ?
				<div className="menu_options_container">
					{props.children}
				</div>
				: null
			}
		</>
	);
}

export default Menu;