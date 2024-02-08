
export default class keyboardHandler{
    private static instance: keyboardHandler;

    keysPressed:{[id:string] : boolean};
    triggers:{downTriggers:Function[],upTriggers:Function[]}

    constructor(){
        this.keysPressed = {}
        this.triggers = {
            downTriggers:[],
            upTriggers:[]
        }

        window.onkeydown = (e:KeyboardEvent)=>{
            this.keysPressed[e.code] = true
            this.triggers.downTriggers.forEach((i)=>{
                i(e)
            })
        }

        window.onkeyup = (e:KeyboardEvent)=>{
            this.keysPressed[e.code] = false
            this.triggers.upTriggers.forEach((i)=>{
                i(e)
            })
        }
    }

    static getInstance(): keyboardHandler{
        keyboardHandler.instance = keyboardHandler.instance || new keyboardHandler()
        return keyboardHandler.instance
    }

    /**
     * Triggers {@link callback} function when {@link key} is pressed
     */
    onKeyDown(key:string,callback:Function){
        this.triggers["downTriggers"].push(
        (e:KeyboardEvent)=>{
            if (e.code === key){
                callback(e)
            }
        }
        )
    }

    /**
     * Triggers {@link callback} function when {@link key} is unpressed
     */
    onKeyUp(key:string,callback:Function){
        this.triggers["upTriggers"].push(
        (e:KeyboardEvent)=>{
            if (e.code === key){
                callback(e)
            }
        }
        )
    }

    /**
     * Triggers {@link callback} with keycode parameter when the key is pressed
     */
    onKeyPressed(callback:Function){
        this.triggers.downTriggers.push(
            (e:KeyboardEvent)=>{
                callback(e)
            }
        )
    }
}