import eruda from "eruda"
//@ts-ignore
import p5 from "p5"
import tank from "./tank";
import mouseIO from "./io/mouseIO";
import keyboardHandler from "./io/keyboardIO";
const keyboard = keyboardHandler.getInstance()
const e = eruda
e.init()

var mouse:mouseIO;

function rgb(r:number,g:number,b:number){
  return [r,g,b]
}

let canvas:HTMLElement|null;
//@ts-ignore
let drawQueue:[Function|tank]= []

drawQueue.push((p:p5)=>{
  
})  

window.addEventListener("load",()=>{
  console.log("load")
  canvas = document.getElementById("canvas")
  p5init()
  resize()

  mouse = mouseIO.getInstance()
})

function resize(){
  if (!canvas){console.log("no canv");return}
  //@ts-ignore
  let pcanvas:HTMLElement = document.getElementById("canvas")?.childNodes.item(0)
  if (!pcanvas){console.log("no pcanv");return}
  
  pcanvas.style.position = "absolute"
  pcanvas.style.display = "block"
  pcanvas.style.border = "0"
  pcanvas.style.width = "auto"

  var h = window.innerHeight
  var w = window.innerWidth
  var ah = w*(9/16)

  //Scale to aspect ratio
  if (ah < h){
      pcanvas.style.height = ah+"px"
  } else {pcanvas.style.height = h+"px"}

  //Center canvas X,Y
  var xOffset = w-pcanvas.getBoundingClientRect().width
  var yOffset = h-pcanvas.getBoundingClientRect().height
  pcanvas.style.left = xOffset/2 +"px"
  pcanvas.style.top = yOffset/2 + "px"
}

window.addEventListener("resize",resize)

function p5init(){
  new p5((p:p5)=>{

    p.setup = function(){
      p.createCanvas(1920,1080)
      p.fill(255)
      // p.ellipse(960,540,200)
      new tank(50,1000,drawQueue)
    }
    
  
    p.draw = function(){
      p.background(...rgb(221, 145, 90))

      for (let i=0; i<drawQueue.length; i++){
        let ele:Function|tank = drawQueue[i]

        if (typeof(ele) === "function"){ele(p)}

        if (ele instanceof tank){ele.step(p)}
      }
    }
  },
  document.getElementById("canvas"))
  
}
