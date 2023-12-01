import appSceneContext from "../../../Contexts/AppScene.context";


type AssetProps = {
    asset: any;
}

const Asset = (props: AssetProps) => {
    const asset = props.asset; 
    const onClick = () => {
        console.log(asset);
        appSceneContext.getAction("addNewAsset")(asset);
    }
    return (
        <div onClick={onClick} className="asset_container">
            <h1>{asset.name}</h1>
        </div>
    );
}

export default Asset;