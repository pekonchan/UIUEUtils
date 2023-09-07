# UIUEUtils
This is library that help you deal with UIUE issues

这是一个能够帮你处理常见的UIUE设计要求的工具库。

该库不断维护迭代更新中...

目前已实现能力：
- backWatcher：拦截浏览器后退行为
- decimalRound：指定保留多少位小数点进行四舍五入（精准）
- formatMoney：对数字进行格式化，可转换为货币形式
- formatToThousandths：格式数字为千分符形式
- getDateDiff：计算两个时间戳差多少天，向上取整

## backWatcher
拦截浏览器后退行为

```js
/**
 * 方法入参说明
 * @param {String} type - 实现拦截的方式，分为使用pushState和添加hash两种，值对应为 state 和 hash
 * @param {Function} callback - 监听到回退的实践函数，例如添加二次确认弹窗等
 * @param {OBject} options - { timer, msg } timer：延迟添加拦截的秒数；msg：添加的state值或hash值
 * @returns {Function} 用于取消拦截的函数，调用一次即取消了拦截
 */

import { backWatcher } from 'uiueutils'

// 添加拦截
backWatcher.add('state')
// 取消拦截
backWatcher.remove()

// 添加拦截回调函数
const remove = backWatcher.add('state', () => {
    console.info('已拦截')
})
// 取消拦截，跟backWatcher.remove()一样
remove()

// 添加拦截，并延迟执行，且添加的hash值是stop
backWatcher.add('hash', null, {
    timer: 700,
    msg: 'stop'
})
```



## decimalRound
指定保留多少位小数点进行四舍五入（精准）
```js
import { decimalRound } from 'uiueutils'

/**
 * 四舍五入成指定位数
 * @param value - 用于被转化的值
 * @param decimal - 保留小数点后几位，默认2
 * @returns {String}
 */

decimalRound(10.8902) // '10.89'
decimalRound(10.8972) // '10.90'
decimalRound(10.8972, 8) // '10.89720000'
```

## formatMoney
对数字进行格式化，可转换为货币形式
```js
import { formatMoney } from 'uiueutils'

/**
 * 格式化数字
 * @param {*} value 数字
 * @param {*} places 保留小数位数，默认2
 * @param {*} symbol 数字前边放置的符号，默认￥
 * @param {*} thousand 千位分割符号，默认，
 * @param {*} decimal 整数和小数分割符号，默认.
 */

formatMoney(10039) // '￥ 10,039.00'
formatMoney(10039, 3) // '￥ 10,039.000'
formatMoney(10039, 3, '$') // '$ 10,039.000'
```

## formatToThousandths
格式数字为千分符形式
```js
import { formatToThousandths } from 'uiueutils'

formatToThousandths(38492) // '38,492'
```

## getDateDiff
计算两个时间戳差多少天，向上取整
```js
import { getDateDiff } from 'uiueutils'

// 2023/9/7 与 2023/9/10 之间间隔几天
getDateDiff(1694016000000, 1694275200000) // 3
```