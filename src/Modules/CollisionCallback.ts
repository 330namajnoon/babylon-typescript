import { IPointerEvent, Nullable, PickingInfo, Scene } from "@babylonjs/core";
import EventType from "../Interfaces/EventType";



export default class CollisionCallback {
    scene: Scene;
    callbacks:any[] = []; 
    constructor(scene:Scene) {
        this.scene = scene;
        this.scene.onPointerDown = (event, pickInfo) => {
            this.onPointerDown(event, pickInfo);
        }
        this.scene.onPointerMove = (event, pickInfo) => {
            this.onPointerMove(event, pickInfo);
        }
        this.scene.onPointerUp = (event, pickInfo) => {
            this.onPointerUp(event, pickInfo);
        }
    }
    private onPointerDown(event: IPointerEvent, pickInfo: PickingInfo) {
        this.callbacks.forEach((callback:any[]) => {
            if (callback[0] === "onPointerDown" && callback[1] === pickInfo.pickedMesh?.id) {
                const callback_ = callback[2] as (event: IPointerEvent, pickInfo: PickingInfo) => void
                callback_(event,pickInfo);
            }
        })
    }
    private onPointerMove(event: IPointerEvent, pickInfo: PickingInfo) {
        this.callbacks.forEach((callback:any[]) => {
            if (callback[0] === "onPointerMove" && callback[1] === pickInfo.pickedMesh?.id) {
                const callback_ = callback[2] as (event: IPointerEvent, pickInfo: PickingInfo) => void
                callback_(event,pickInfo);
            }
        })
    }
    private onPointerUp(event: IPointerEvent, pickInfo: Nullable<PickingInfo>) {
        this.callbacks.forEach((callback:any[]) => {
            if (callback[0] === "onPointerUp" && callback[1] === pickInfo?.pickedMesh?.id) {
                const callback_ = callback[2] as (event: IPointerEvent, pickInfo: PickingInfo) => void
                callback_(event,pickInfo || new PickingInfo());
            }
        })
    }
    addEventListener(eventType: EventType, eventName: string, callback: (event: IPointerEvent, pickInfo: PickingInfo) => void) {
        this.callbacks.unshift([eventType, eventName, callback]);
    }
}