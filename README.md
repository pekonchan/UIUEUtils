# UIUEUtils

The library is constantly maintained in iterative updates...

* [中文文档](https://github.com/pekonchan/UIUEUtils/blob/main/docs/readme_cn.md)

Currently achieved capabilities:
- scrollOnly: All containers can not scroll but some containers which is specified can be, it can be used to solve the "scroll prenetrate" problem.
- backWatcher：Block browser backward behavior
- decimalRound：Specify how many decimal points to keep for rounding (precision)
- formatMoney：The numbers are formatted and can be converted to monetary form
- formatToThousandths：Format The number is in the form of a comma
- getDateDiff：Calculate how many days are the difference between the two timestamps, rounded up

support the module installation & script tag installation

### usage

module installation 
```
npm i uiueutils

pnpm add uiueutils

yarn add uiueutils
```

script tag installation

```
// set the url of the uiueutils.min.js file you downloaded
<script src="/uiueutils.min.js"></script>

// You can use "window.$uu" get the specified method
window.$uu.scrollOnly
```

The following documentation use the module installation to describes

## backWatcher
Block browser backward behavior

```js
/**
 * 方法入参说明
 * @param {String} type - There are two ways to implement interception: pushState and hash. The values correspond to state and hash
 * @param {Function} callback - Listen to the practice function of the rollback, such as adding a double confirmation pop-up window
 * @param {OBject} options - { timer, msg } timer：Delay the number of seconds to add an intercept；msg：The added state or hash value
 * @returns {Function} A function used to cancel interception, which cancels interception after a single call
 */

import { backWatcher } from 'uiueutils'

// Add Event
backWatcher.add('state')
// Remove Event
backWatcher.remove()

// Add Callback
const remove = backWatcher.add('state', () => {
    console.info('intercepted!')
})
// Unblock, same as backWatcher.remove()
remove()

// Add the intercept and delay execution, and the hash value is stop
backWatcher.add('hash', null, {
    timer: 700,
    msg: 'stop'
})
```

## scrollOnly
All containers can not scroll but some containers which is specified can be, it can be used to solve the "scroll prenetrate" problem.

```js
/**
 * @param {Node} - Specify the containers can be scrolled
 * @returns {Object} Return an instance of setting
 */
import { scrollOnly } from 'uiueutils'

// Specify '#example-box' to scroll, and the rest of the page elements cannot scroll
scrollOnly(document.querySelector('#example-box'))

// Multiple elements can be specified
scrollOnly([document.querySelector('#example-box1'), document.querySelector('#example-box2')])

// Recommended usage:
// When setted, an instance object is returned
const contianerOnly = scrollOnly(document.querySelector('#example-box'))
// When the time is right and you no longer need the Settings, you should cancel them
contianerOnly.off()
```

Typical example, such as opening modal window to prevent modal window from rolling and causing "penetration" to the "outer layer"

```js
var contianerOnly = null

function openModal () {
    // ... oepn the modal window
    // ...
    // When opened, set to allow only popup containers to scroll
    contianerOnly = scrollOnly(document.querySelector('#dialog-modal'))
}

function closeModal () {
    // ... close the modal window
    // ...
    // After closed, cancel the setting
    contianerOnly.off()
}
```

## decimalRound
Specify how many decimal points to keep for rounding (precision)
```js
import { decimalRound } from 'uiueutils'

/**
 * Round to the specified number of digits
 * @param value - Used for converted values
 * @param decimal - Keep the decimal places, default 2
 * @returns {String}
 */

decimalRound(10.8902) // '10.89'
decimalRound(10.8972) // '10.90'
decimalRound(10.8972, 8) // '10.89720000'
```

## formatMoney
The numbers are formatted and can be converted to monetary form
```js
import { formatMoney } from 'uiueutils'

/**
 * Formatted number
 * @param {*} value number
 * @param {*} places Keep the number of decimal places, default 2
 * @param {*} symbol A symbol placed in front of a number. The default is ￥
 * @param {*} thousand Thousand split symbol, default is ,
 * @param {*} decimal Integer and decimal split symbol, default is .
 */

formatMoney(10039) // '￥ 10,039.00'
formatMoney(10039, 3) // '￥ 10,039.000'
formatMoney(10039, 3, '$') // '$ 10,039.000'
```

## formatToThousandths
Format The number is in the form of a comma
```js
import { formatToThousandths } from 'uiueutils'

formatToThousandths(38492) // '38,492'
```

## getDateDiff
Calculate how many days are the difference between the two timestamps, rounded up
```js
import { getDateDiff } from 'uiueutils'

// There are several days between 2023/9/7 and 2023/9/10
getDateDiff(1694016000000, 1694275200000) // 3
```