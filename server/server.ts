//@ts-ignore
import { WebSocketServer } from 'ws';

const wss:WebSocketServer = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws:WebSocketServer,req:any) {
    var clientpos = {
        type: "testpos",
        xpos: 0,
        ypos: 0
    }
    console.log('connection')
    ws.on('error', console.error);

    ws.on('message', function message(data:any) {
        let parsed;
        try {parsed = JSON.parse(data)} catch {parsed = undefined}
        if (parsed){
            console.log(parsed)
            if (parsed['type'] === 'tankpos'){
                clientpos['xpos'] = parsed['xpos']
                clientpos['ypos'] = parsed['ypos']
            }
        }

        ws.send(JSON.stringify(clientpos))
    });

});