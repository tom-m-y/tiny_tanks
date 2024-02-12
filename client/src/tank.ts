//@ts-ignore
import p5 from "p5"
import keyboardHandler from "./io/keyboardIO";
const keyboard = keyboardHandler.getInstance()

function rgb(r:number,g:number,b:number){
    return [r,g,b]
}

export default class tank{
    queue;
    drawfunc;
    x;y;angle;
    constructor(x:number,y:number,queue:[Function|tank]){
        this.queue = queue;
        this.drawfunc = (p:p5)=>{
            p.fill(255)
            p.noStroke()
            p.ellipse(this.x,this.y,50)
            p.stroke(0)
            p.strokeWeight(15)
            p.ellipse(this.x,this.y,10)

            let bx = Math.cos(this.angle+90)*50+this.x
            let by = Math.sin(this.angle+90)*50+this.y

            p.line(
                this.x,this.y,
                bx,by
                )

            p.line(
                bx-5,by,
                bx+5,by
            )
        }
        this.x = x; this.y = y;
        this.angle = 0

        queue.push(this)
    }

    step(p:p5){
        
        if (keyboard.isPressed("KeyW")){this.y -= 5}
        if (keyboard.isPressed("KeyS")){this.y += 5}
        if (keyboard.isPressed("KeyD")){this.x += 5}
        if (keyboard.isPressed("KeyA")){this.x -= 5}

        if (keyboard.isPressed("ArrowLeft")){this.angle -= 0.05}
        if (keyboard.isPressed("ArrowRight")){this.angle += 0.05}

        this.drawfunc(p)
    }
}