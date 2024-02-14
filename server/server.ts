//@ts-ignore
import { WebSocketServer } from 'ws';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';

const wss:WebSocketServer = new WebSocketServer({ port: 8080 });

let ids:string[] = []

let tankClients:any = {type:'tankClients'}

wss.on('connection', function connection(ws:WebSocketServer,req:any) {
    console.log('connection')

    let uuid = uuidv4()
    ids.push(uuid)
    
    let clientTank = {type:"tank",xpos:0,ypos:0,angle:0}
    tankClients[uuid] = clientTank

    ws.on('error', console.error);

    ws.on('message', function message(data:any) {
        let parsed;
        try {parsed = JSON.parse(data)} catch {parsed = undefined}
        if (parsed){
            // console.log(parsed)
            if (parsed['type'] === 'tankpos'){
                clientTank['xpos'] = parsed['xpos']
                clientTank['ypos'] = parsed['ypos']
                clientTank['angle'] = parsed['angle']
            }
            console.log(tankClients)
        } else {
            console.log(parsed)
        }

        ws.send(JSON.stringify(tankClients))
    });

});