项目由三部分组成
- lib 。 方法源代码
- server 。 启动本地服务脚本
- docs 。 本地服务启动的目录 & 项目github pages访问网站目录

# lib
源代码部分，每个文件夹为各个方法类。typescript语法编写

运行npm run compile 可单独将ts转译成es5的写法。但是没有使用babel，所以有些需要polyfill的方法就没有转换了。而且仅仅是转移了各个文件，并没有打包一起的，所以还是通过es6的module方式串联起来，即保留import export等语法。

实际上我们目前暂不需要单独运行`npm run compile`命令，提供此命令只是为了有时候方便查看编译后的脚本情况。

# server
一个单纯的nodejs脚本文件，目的是启动一个本地服务而起。类似于webpack的dev-server，但是当然功能没那么丰富，只是写了一些本项目所需要用到的定制化脚本而已（为了贪快）

启动本地服务只是为了方便调试编写的脚本是否有问题。调试的界面写在`docs`里。

# docs
本地服务启动的目录 & 项目github pages访问网站目录

里面所写的就是单纯的html页面写法来调试。html里直接引用打包编译后的产物（`npm run build`），即引用的是最终`npm publish`的产物。所以`dist`文件夹也在`docs`里面，这个`dist`就是`publish`后的结果包。

同时本项目也开通了GitHub pages，你可通过 [https://pekonchan.github.io/UIUEUtils/](https://pekonchan.github.io/UIUEUtils/)访问到`docs`目录下的`index.html`
