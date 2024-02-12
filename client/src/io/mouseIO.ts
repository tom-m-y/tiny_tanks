
export default class mouseIO{
    private static instance: mouseIO

    mouseX:number;mouseY:number
    canvas;

    constructor(){
        let pcanvas:HTMLElement = document.getElementById("canvas")?.childNodes.item(0)
        console.log(pcanvas)
        if (!pcanvas){throw new Error("mouseIO couldn't find p5 canvas, initialized before window load?")}

        this.canvas = pcanvas

        this.mouseX = 0
        this.mouseY = 0

        window.addEventListener("mousemove",(e)=>{this.mouseMove(e)})
    }

    static getInstance(): mouseIO{
        mouseIO.instance = mouseIO.instance || new mouseIO()
        return mouseIO.instance
    }

    private mouseMove(e:MouseEvent){
        if (!this.canvas){console.log("no canv :(((")}
        let left = Math.floor(Number(this.canvas.style.left.split("p")[0]))
        let top = Math.floor(Number(this.canvas.style.top.split("p")[0]))
        let xScale = 1920/this.canvas.getBoundingClientRect().width
        let yScale = 1080/this.canvas.getBoundingClientRect().height
        this.mouseX = Math.floor((e.clientX-left)*xScale)
        this.mouseY = Math.floor((e.clientY-top)*yScale)
    }
}