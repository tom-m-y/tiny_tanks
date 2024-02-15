//@ts-ignore
import { WebSocketServer } from 'ws';
//@ts-ignore
import { MessageEvent } from 'undici-types';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';

const wss:WebSocketServer = new WebSocketServer({ port: 8080 });

let ids:string[] = []

let tankClients:any = {type:'tankClients'}

wss.on('connection', function connection(ws:any,req:any) {
    console.log('connection')
    ws.isAlive = true

    let uuid = uuidv4()
    ws.uuid = uuid
    
    let clientTank = {type:"tank",xpos:0,ypos:0,angle:0}
    tankClients[uuid] = clientTank

    ws.on('error', console.error);

    ws.on('pong', ()=>{ws.isAlive = true})

    ws.on('message', function message(data:MessageEvent) {
        let parsed:any;
        //@ts-ignore
        try {parsed = JSON.parse(data)} catch {console.log("couldnd't parse json");parsed = undefined}
        if (parsed){
            console.log(parsed)
            if (parsed['type'] === 'tankpos'){
                clientTank['xpos'] = parsed['xpos']
                clientTank['ypos'] = parsed['ypos']
                clientTank['angle'] = parsed['angle']
            }
            // console.log(tankClients)
        } else {
            console.log(data.toString())
        }
        let clientsModified = Object.assign({},tankClients)
        delete clientsModified[uuid]
        ws.send(JSON.stringify(clientsModified))
    });

});

function serverLoop(){
    if (wss.clients)
    wss.clients.forEach((ws:any) => {
        if (ws.isAlive === false){ws.terminate(); delete tankClients[ws.uuid]}
        ws.isAlive = false
        ws.ping()
        
        let clientsModified = Object.assign({},tankClients)
        delete clientsModified[ws.uuid]
        ws.send(JSON.stringify(clientsModified))
    });
}

setInterval(serverLoop,15)