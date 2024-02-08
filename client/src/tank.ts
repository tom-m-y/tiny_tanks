import p5 from "p5"

export default class tank{
    queue;
    drawfunc;
    x;y;
    constructor(x:number,y:number,queue:[Function|tank]){
        this.queue = queue;
        this.drawfunc = (p:p5)=>{}
        this.x = x; this.y = y;
    }

    step(){

    }
}