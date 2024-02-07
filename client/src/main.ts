import eruda from "eruda"
import p5 from "p5"
const e = eruda
e.init()
e.show()


let canvas:HTMLElement|null;

window.addEventListener("load",()=>{
  console.log("load")
  canvas = document.getElementById("canvas")
  p5init()
  resize()
})

function resize(){
  if (!canvas){console.log("no canv");return}
  let pcanvas:HTMLElement = document.getElementById("canvas")?.childNodes.item(0)
  if (!pcanvas){console.log("no pcanv");return}
  
  pcanvas.style.position = "aboslute"
  pcanvas.style.display = "block"
  pcanvas.style.border = "0"

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
      p.background(0)
    }
    
  
    p.draw = function(){
      
    }
  },
  document.getElementById("canvas"))
  
}
