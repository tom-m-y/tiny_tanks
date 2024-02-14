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
  // console.log(drawQueue)
}) 

const ws:WebSocket = new WebSocket('wss://ominous-pancake-7vv644j7qv47fr5qw-8080.app.github.dev');
var wsReady:boolean = false

ws.addEventListener('error', (err)=>{
  console.log("ws error: ",err)
});

ws.addEventListener('open', function open() {
  wsReady = true
  ws.send('hi -tank');
});

let testx = 0
let testy = 0;
var serverFunc = (p:p5)=>{
  p.fill(...rgb(106, 239, 76))
  p.noStroke()
  p.ellipse(testx,testy,30)
}

ws.addEventListener('message', function message(data:MessageEvent) {
  // console.log('received: %s', data);
  let parsed;
  try {parsed = JSON.parse(data.data)} catch {console.log("ws couldn't parse")}
  if (parsed['type'] === 'testpos'){
    console.log(parsed)
    testx = parsed["xpos"]
    testy = parsed["ypos"]
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
      const testtank = new tank(500,500,drawQueue,true)
      drawQueue.push(()=>{
        testtank.x = testx
      })
      drawQueue.push(()=>{
        if (!wsReady){return}
        ws.send(JSON.stringify({
          type: "tankpos",
          xpos: ptank.x,
          ypos: ptank.y,
          angle: ptank.angle
        }))
      })
      drawQueue.push(serverFunc)
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
