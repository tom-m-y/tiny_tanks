//@ts-ignore
import p5 from "p5"
import keyboardHandler from "./io/keyboardIO";
const keyboard = keyboardHandler.getInstance()

function rgb(r:number,g:number,b:number){
    return [r,g,b]
}

function rad(angle:number) {
    return angle * (Math.PI / 180);
  }

export default class tank{
    queue;
    drawfunc;
    x;y;angle;
    multi;
    constructor(x:number,y:number,queue:[Function|tank],multi:boolean){
        this.queue = queue;
        this.multi = multi
        this.drawfunc = (p:p5)=>{
            p.fill(255)
            p.noStroke()
            p.ellipse(this.x,this.y,50)
            p.stroke(0)
            p.strokeWeight(15)
            p.ellipse(this.x,this.y,10)

            let bx = Math.cos(rad(this.angle+90))*50+this.x
            let by = Math.sin(rad(this.angle+90))*50+this.y
            
            p.line(
                this.x,this.y,
                bx,by
                )
            
            const tscale = 35
            const offset = 35

            p.strokeWeight(14)
            p.line(
                Math.cos(rad(this.angle+offset))*tscale+this.x,Math.sin(rad(this.angle+offset))*tscale+this.y,
                Math.cos(rad(this.angle-offset))*tscale+this.x,Math.sin(rad(this.angle-offset))*tscale+this.y
            )

            p.line(
                Math.cos(rad(this.angle+offset+180))*tscale+this.x,Math.sin(rad(this.angle+offset+180))*tscale+this.y,
                Math.cos(rad(this.angle-offset+180))*tscale+this.x,Math.sin(rad(this.angle-offset+180))*tscale+this.y
            )
        }
        this.x = x; this.y = y;
        this.angle = 0

        queue.push(this)
    }

    step(p:p5){
        if(!this.multi){
        if (keyboard.isPressed("KeyW")){this.y -= 5}
        if (keyboard.isPressed("KeyS")){this.y += 5}
        if (keyboard.isPressed("KeyD")){this.x += 5}
        if (keyboard.isPressed("KeyA")){this.x -= 5}

        if (keyboard.isPressed("ArrowLeft")){this.angle -=4}
        if (keyboard.isPressed("ArrowRight")){this.angle +=4}
        }
        this.drawfunc(p)
    }
}