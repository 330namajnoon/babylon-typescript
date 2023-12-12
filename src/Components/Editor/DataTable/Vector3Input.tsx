import { StateKeyType } from "./DataTable";

interface Vector3 {
    x: number;
    y: number;
    z: number;
}

interface Props {
    name: string;
    vector3: Vector3;
    stateKey: StateKeyType;
    onChenge: (key: StateKeyType, value: any) => void
}

const Vector3Input = (props: Props) => {

    const onchenge = (key:"x" | "y" | "z", value: number) => {
        props.vector3[key] = value;
        props.onChenge(props.stateKey, props.vector3);
    }

    return (
        <div className="vector3Input_container">
            <label htmlFor="x">X</label>
            <input onChange={(e) => {onchenge("x", parseFloat(e.target.value))}} type="number" value={props.vector3.x}/>
            <label htmlFor="x">Y</label>
            <input onChange={(e) => {onchenge("y", parseFloat(e.target.value))}} type="number" value={props.vector3.y}/>
            <label htmlFor="x">Z</label>
            <input onChange={(e) => {onchenge("z", parseFloat(e.target.value))}} type="number" value={props.vector3.z}/>
        </div>
    );
}

export default Vector3Input;