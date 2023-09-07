interface addOption {
    timer?: number,
    msg?: string
}
enum addType {state = 'state', hash = 'hash'}


let removeWatcher = () => {}

function add (
    type: string = 'state',
    callback?: Function,
    addOption?: addOption
) {
    const { timer, msg } = addOption || {}
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
    removeWatcher = remove
    return remove
}

export default {
    add,
    remove () {
        removeWatcher()
    },
    back () {
        history.go(-2)
    }
}