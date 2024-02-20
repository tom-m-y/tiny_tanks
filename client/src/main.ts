import eruda from "eruda"
//@ts-ignore
import p5 from "p5"
import tank from "./tank";
import mouseIO from "./io/mouseIO";
import keyboardHandler from "./io/keyboardIO";
import { objectToString } from "@vue/shared";
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
  // console.log(drawQueue)
}) 

const ws:WebSocket = new WebSocket('wss://ominous-pancake-7vv644j7qv47fr5qw-8080.app.github.dev');
var wsReady:boolean = false

let renderTanks:any = {}

ws.addEventListener('error', (err)=>{
  console.log("ws error: ",err)
});

ws.addEventListener('open', function open() {
  wsReady = true
  ws.send(JSON.stringify('hi -tank'));
});

ws.addEventListener('message', function message(data:MessageEvent) {
  // console.log('received: %s', data);
  let parsed;
  try {parsed = JSON.parse(data.data)} catch {console.log("ws couldn't parse")}
  if (parsed['type'] === 'tankClients'){
    for (const [key] of Object.entries(renderTanks)){
      if (parsed[key] === undefined){renderTanks[key].delete();delete renderTanks[key]}
    }
    console.log(parsed)
    for (const [key,value] of Object.entries(parsed)){
      if (key === 'type'){continue}

      if (value['type'] == "tank"){
      let clientTank = renderTanks[key] ? renderTanks[key] : renderTanks[key] = new tank(parsed['xpos'],parsed['ypos'],drawQueue,true)
      
      clientTank.x = value['xpos']
      clientTank.y = value['ypos']
      clientTank.angle = value['angle']
      }

      if (value['type'] == "bullet"){
        let bulletX = value['xpos']
        let bulletY = value['ypos']
        let size = value['size']
        
        //todo: use uuid system for bullets
        let drawfunc = (p:p5)=>{
          p.fill(255)
          p.noStroke()
          p.ellipse(bulletX,bulletY,size)

          let i = drawQueue.indexOf(drawfunc)
          drawQueue.splice(i,1)
        }
        drawQueue.push(drawfunc)
      }

    }
  } 
});

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
      const ptank = new tank(50,1000,drawQueue,false)

      drawQueue.push(()=>{
        if (!wsReady){return}
        ws.send(JSON.stringify({
          type: "tankpos",
          xpos: ptank.x,
          ypos: ptank.y,
          angle: ptank.angle
        }))
      })
    }
    
  
    p.draw = function(){
      console.log(drawQueue)
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
