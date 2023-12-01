import { ReactNode } from "react"
import appContext from "../../../Contexts/AppContext";
import Asset from "./Asset";

type AssetsListProps = {
    assets: any[] | undefined;
    name: string;
    pageSelected: string
}

const AssetsList = (props: AssetsListProps) => {

    return (
        <>
            {
                props.pageSelected === props.name ?
                (
                    <div onClick={() => {
                        appContext.getAction("setPageSelected")("");
                    }} className="assets_list_container">
                        {
                            props.assets?.map((asset, index) => (
                                <Asset key={index} asset={asset} />
                            ))
                        }
                    </div>

                )
                : null
            }
        </>
    );
}

export default AssetsList;