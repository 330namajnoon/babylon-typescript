import appContext from "../../../Contexts/AppContext";


type OptionProps = {
    value: string;
    children: string;
}

const Option = ({value, children}: OptionProps) => {

    const onClick = () => {
        appContext.getAction("setPageSelected")(value);
    }

    return (
        <div onClick={onClick} className="menu_option_container">
            {children}
        </div>
    );
}

export default Option;