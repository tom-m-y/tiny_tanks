
export default class mouseHandler{
    private static instance: mouseHandler

    private static canvas: HTMLCanvasElement

    constructor(){
        let canvas:ChildNode|undefined = document.getElementById("canvas")?.childNodes.item(0)
        if (!canvas){throw new Error("no canv")}
        this.canvas = canvas
    }

    getInstance(): mouseHandler{
        mouseHandler.instance = mouseHandler.instance || new mouseHandler()
        return mouseHandler.instance
    }

    private mouseMove(e:MouseEvent){

    }
}