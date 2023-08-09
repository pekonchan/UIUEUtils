interface addOption {
    timer?: number,
    msg?: string
}
type functionOrNull = { (): void } | null
enum addType {state = 'state', hash = 'hash'}


let watcher:functionOrNull = null

function add (
    callback:Function,
    type:string = 'state',
    { timer, msg }:addOption = {}
) {
    let handler!:EventListenerOrEventListenerObject
    let eventName!:keyof WindowEventMap
    if (type === addType.state) {
        const addStopHistory = () => {
            history.pushState(msg || {
                id: 'stopback'
            }, '', location.href)
        }
        if (timer) {
            setTimeout(() => {
                addStopHistory()
            }, timer)
        } else {
            addStopHistory()
        }
        handler = () => {
            addStopHistory()
            callback && callback()
        }
        eventName = 'popstate'
    } else if (type === addType.hash) {
        let hashAdding = false
        const addStopHistory = () => {
            location.hash = msg || 'stopback'
        }
        if (timer) {
            setTimeout(() => {
                hashAdding = true
                addStopHistory()
            }, timer)
        } else {
            hashAdding = true
            addStopHistory()
        }
        handler = () => {
            if (hashAdding) {
                hashAdding = false
                return
            }
            hashAdding = true
            addStopHistory()
            callback && callback()
        }
        eventName = 'hashchange'
    }

    window.addEventListener(eventName, handler)
    const remove = () => {
        window.removeEventListener(eventName, handler)
        history.back()
    }
    watcher = remove
    return remove
}

export default {
    watcher,
    add,
    remove () {
        watcher!()
    },
    back () {
        history.go(-2)
    }
}