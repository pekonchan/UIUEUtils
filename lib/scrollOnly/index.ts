let supportPassive: boolean|object = false
;(function testPassive () {
    try {
        const option = {
            get passive() {
                supportPassive = true // 该函数会在浏览器尝试访问 passive 值时被调用。
                return false
            }
        }
        window.addEventListener('touchmove', null, option)
        window.removeEventListener('touchmove', null)
    } catch (e) {
        supportPassive = false
    }
})()
supportPassive = supportPassive && {passive: false}

function preventTheDefault (e: TouchEvent) {
    if (e.cancelable) {
        e.preventDefault()
    }
}

class ContainerOnlyScroll {
    _startY: null|number = null
    _canMoveStatus = 'init' // 主要是解决连续不抬起手指会出现两个方向的滚动的问题
    constainers = []
    constructor (elements: Node[]) {
        this.constainers = elements
        this._handleStart = this._handleStart.bind(this)
        this._handleTouchMove = this._handleTouchMove.bind(this)
    }

    _preventMove (e: TouchEvent) {
        preventTheDefault(e)
        this._canMoveStatus === 'init' && (this._canMoveStatus = 'off')
    }

    _handleStart (e: TouchEvent) {
        this._startY = e.targetTouches[0].clientY
        this._canMoveStatus = 'init'
    }

    _handleTouchMove (e: TouchEvent) {
        e.stopPropagation()
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget as HTMLElement
        const currentY = e.targetTouches[0].clientY
        // 为off代表本次触摸第一次引起的move是被阻止了，转移了浏览器的滚动目标对象了，所以直接禁用滚动了
        if (this._canMoveStatus === 'off') {
            preventTheDefault(e)
            return
        }
        // 如果是向下滑动手势，即要查看上方内容时
        if (currentY - this._startY > 0) {
            // 此时刚好到达弹层容器顶部，继续滑动就阻止默认的滚动事件了
            if (scrollTop === 0) {
                this._preventMove(e)
            }
        // 否则是向下滑动手势，查看下方内容时，此时刚好到达弹层容器底部，继续滑动就阻止默认的滚动事件了
        } else if (scrollHeight - clientHeight - scrollTop < 1) {
            this._preventMove(e)
        } else {
            this._canMoveStatus = 'on'
        }
    }

    on () {
        document.documentElement.addEventListener('touchmove', preventTheDefault, supportPassive)
        this.constainers.forEach(element => {
            element.addEventListener('touchstart', this._handleStart)
            element.addEventListener('touchmove', this._handleTouchMove, supportPassive)
        })
    }

    off () {
        document.documentElement.removeEventListener('touchmove', preventTheDefault)
        this.constainers.forEach(element => {
            element.removeEventListener('touchstart', this._handleStart)
            element.removeEventListener('touchmove', this._handleTouchMove)
        })
        this._startY = null
    }
}

export default function (target: Node|Node[]) {
    let elements = Array.isArray(target) ? target : [target]
    elements = elements.filter(item => item)
    const constainerScroll = new ContainerOnlyScroll(elements)
    constainerScroll.on()
    return constainerScroll
}