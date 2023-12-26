var addType;
(function (addType) {
    addType["state"] = "state";
    addType["hash"] = "hash";
})(addType || (addType = {}));
var removeWatcher = function () { };
function add(type, callback, addOption) {
    if (type === void 0) { type = 'state'; }
    var _a = addOption || {}, timer = _a.timer, msg = _a.msg;
    var handler;
    var eventName;
    if (type === addType.state) {
        var addStopHistory_1 = function () {
            history.pushState(msg || {
                id: 'stopback'
            }, '', location.href);
        };
        if (timer) {
            setTimeout(function () {
                addStopHistory_1();
            }, timer);
        }
        else {
            addStopHistory_1();
        }
        handler = function () {
            addStopHistory_1();
            callback && callback();
        };
        eventName = 'popstate';
    }
    else if (type === addType.hash) {
        var hashAdding_1 = false;
        var addStopHistory_2 = function () {
            location.hash = msg || 'stopback';
        };
        if (timer) {
            setTimeout(function () {
                hashAdding_1 = true;
                addStopHistory_2();
            }, timer);
        }
        else {
            hashAdding_1 = true;
            addStopHistory_2();
        }
        handler = function () {
            if (hashAdding_1) {
                hashAdding_1 = false;
                return;
            }
            hashAdding_1 = true;
            addStopHistory_2();
            callback && callback();
        };
        eventName = 'hashchange';
    }
    window.addEventListener(eventName, handler);
    var remove = function () {
        window.removeEventListener(eventName, handler);
        history.back();
    };
    removeWatcher = remove;
    return remove;
}
var index$1 = {
    add: add,
    remove: function () {
        removeWatcher();
    },
    back: function () {
        history.go(-2);
    }
};

function formatMoney(value, places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : '￥';
    thousand = thousand || ',';
    decimal = decimal || '.';
    var negative = +value < 0 ? '-' : '';
    var i = parseInt(value = Math.abs(+value || 0).toFixed(places), 10) + '';
    var j = i.length > 3 ? i.length % 3 : 0;
    return symbol + ' ' + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(+value - +i).toFixed(places).slice(2) : '');
}
function formatToThousandths(count) {
    var value = parseInt(count + '');
    return formatMoney(value, 0, '').substring(1);
}

function getDateDiff(date1, date2) {
    var begin = new Date(date1).getTime();
    var end = new Date(date2).getTime();
    return Math.ceil(Math.abs(begin - end) / 1000 / 3600 / 24);
}

/**
 * Specifies how many decimal points to keep for rounding
 * @param value
 * @param decimal
 * @returns string
 */
function decimalRound(value, decimal) {
    if (decimal === void 0) { decimal = 2; }
    value = +value;
    var powNum = Math.pow(10, decimal);
    return (Math.round(value * powNum) / powNum).toFixed(decimal);
}

var supportPassive = false;
(function testPassive() {
    try {
        var option = {
            get passive() {
                supportPassive = true; // 该函数会在浏览器尝试访问 passive 值时被调用。
                return false;
            }
        };
        window.addEventListener('touchmove', null, option);
        window.removeEventListener('touchmove', null);
    }
    catch (e) {
        supportPassive = false;
    }
})();
supportPassive = supportPassive && { passive: false };
function preventTheDefault(e) {
    if (e.cancelable) {
        e.preventDefault();
    }
}
var ContainerOnlyScroll = /** @class */ (function () {
    function ContainerOnlyScroll(elements) {
        this._startY = null;
        this._canMoveStatus = 'init'; // 主要是解决连续不抬起手指会出现两个方向的滚动的问题
        this.constainers = [];
        this.constainers = elements;
        this._handleStart = this._handleStart.bind(this);
        this._handleTouchMove = this._handleTouchMove.bind(this);
    }
    ContainerOnlyScroll.prototype._preventMove = function (e) {
        preventTheDefault(e);
        this._canMoveStatus === 'init' && (this._canMoveStatus = 'off');
    };
    ContainerOnlyScroll.prototype._handleStart = function (e) {
        this._startY = e.targetTouches[0].clientY;
        this._canMoveStatus = 'init';
    };
    ContainerOnlyScroll.prototype._handleTouchMove = function (e) {
        e.stopPropagation();
        var _a = e.currentTarget, scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
        var currentY = e.targetTouches[0].clientY;
        // 为off代表本次触摸第一次引起的move是被阻止了，转移了浏览器的滚动目标对象了，所以直接禁用滚动了
        if (this._canMoveStatus === 'off') {
            preventTheDefault(e);
            return;
        }
        // 如果是向下滑动手势，即要查看上方内容时
        if (currentY - this._startY > 0) {
            // 此时刚好到达弹层容器顶部，继续滑动就阻止默认的滚动事件了
            if (scrollTop === 0) {
                this._preventMove(e);
            }
            // 否则是向下滑动手势，查看下方内容时，此时刚好到达弹层容器底部，继续滑动就阻止默认的滚动事件了
        }
        else if (scrollHeight - clientHeight - scrollTop < 1) {
            this._preventMove(e);
        }
        else {
            this._canMoveStatus = 'on';
        }
    };
    ContainerOnlyScroll.prototype.on = function () {
        var _this = this;
        document.documentElement.addEventListener('touchmove', preventTheDefault, supportPassive);
        this.constainers.forEach(function (element) {
            element.addEventListener('touchstart', _this._handleStart);
            element.addEventListener('touchmove', _this._handleTouchMove, supportPassive);
        });
    };
    ContainerOnlyScroll.prototype.off = function () {
        var _this = this;
        document.documentElement.removeEventListener('touchmove', preventTheDefault);
        this.constainers.forEach(function (element) {
            element.removeEventListener('touchstart', _this._handleStart);
            element.removeEventListener('touchmove', _this._handleTouchMove);
        });
        this._startY = null;
    };
    return ContainerOnlyScroll;
}());
function index (target) {
    var elements = Array.isArray(target) ? target : [target];
    elements = elements.filter(function (item) { return item; });
    var constainerScroll = new ContainerOnlyScroll(elements);
    constainerScroll.on();
    return constainerScroll;
}

export { index$1 as backWatcher, decimalRound, formatMoney, formatToThousandths, getDateDiff, index as scrollOnly };
