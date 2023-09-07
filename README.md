# UIUEUtils
This is library that help you deal with UIUE issues

这是一个能够帮你处理常见的UIUE设计要求的工具库。

改库不断维护迭代更新中...

目前已实现能力：
- backWatcher：拦截浏览器后退行为
- decimalRound：指定保留多少位小数点进行四舍五入（精准）
- 

### backWatcher
拦截浏览器后退行为

```js
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

### decimalRound
指定保留多少位小数点进行四舍五入（精准）
```
import { decimalRound } from 'uiueutils'

decimalRound(10)
```