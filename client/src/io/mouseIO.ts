
export default class mouseIO{
    private static instance: mouseIO

    canvas;
    mouseX:number;mouseY:number

    constructor(){
        this.mouseX = 0
        this.mouseY = 0

        window.onload = function(){
            let canvas:HTMLElement|null = document.getElementById("canvas")
            
            for (const ele of canvas.children){
                console.log("a")
                console.log(ele)
            }
            console.log(canvas)
            if (canvas)
            this.canvas = canvas
        }

        window.addEventListener("mousemove",(e)=>{this.mouseMove(e)})
    }

    static getInstance(): mouseIO{
        mouseIO.instance = mouseIO.instance || new mouseIO()
        return mouseIO.instance
    }

    private mouseMove(e:MouseEvent){
        let canvas = this.canvas
        
        let left = Math.floor(Number(canvas.style.left.split("p")[0]))
        let top = Math.floor(Number(canvas.style.top.split("p")[0]))
        let xScale = 1920/canvas.getBoundingClientRect().width
        let yScale = 1080/canvas.getBoundingClientRect().height
        this.mouseX = Math.floor((e.clientX-left)*xScale)
        this.mouseY = Math.floor((e.clientY-top)*yScale)
    }
}