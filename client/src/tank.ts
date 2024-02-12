//@ts-ignore
import p5 from "p5"
import keyboardHandler from "./io/keyboardIO";
const keyboard = keyboardHandler.getInstance()

export default class tank{
    queue;
    drawfunc;
    x;y;
    constructor(x:number,y:number,queue:[Function|tank]){
        this.queue = queue;
        this.drawfunc = (p:p5)=>{
            p.fill(255)
            p.ellipse(this.x,this.y,50)
        }
        this.x = x; this.y = y;

        queue.push(this)
    }

    step(p:p5){
        this.drawfunc(p)

        if (keyboard.isPressed("KeyW")){this.y -= 5}
        if (keyboard.isPressed("KeyS")){this.y += 5}
        if (keyboard.isPressed("KeyD")){this.x += 5}
        if (keyboard.isPressed("KeyA")){this.x -= 5}
    }
}