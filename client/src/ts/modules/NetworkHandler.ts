import { parse } from "path";

export default class NetworkHandler {
    private ws: WebSocket;
    private wsReady: boolean;
    private playerDataFunc: (data: { [x: string]: string|number }) => void;
    private playerChatFunc: (data: { [x: string]: string|number }) => void;

    constructor() {
        this.ws = new WebSocket('wss://musical-space-spoon-977r44g6vq472ppr4-8080.app.github.dev/');
        this.wsReady = false;

        this.ws.addEventListener('open', () => {
            this.wsReady = true;
        });

        this.ws.addEventListener('message', this.parseMessage);
    }

    private parseMessage(data: MessageEvent) {
        let parsed: { [x: string]: string|number };
        try {parsed = JSON.parse(data.data)} catch {console.log("ws couldn't parse"); return;}


        if (parsed['type'] === 'playData') this.playerDataFunc(parsed);
        else if (parsed['type'] === 'chat') this.playerChatFunc(parsed);
    }

    addErrorListener(callback: (err: Event) => void) {
        this.ws.addEventListener('error', callback);
    }

    addMessageListener(callback: (data: MessageEvent) => void) {
        this.ws.addEventListener('message', (data: MessageEvent) => {
            let parsed: any;
            try {
                parsed = JSON.parse(data.data);
            } catch {
                console.log("ws couldn't parse");
            }
            callback(parsed);
        });
    }
}