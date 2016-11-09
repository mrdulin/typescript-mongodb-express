# Training MEN

_Mongodb_ + _Express_ + _Nodejs_

__MongoDB安装:__

*   `brew install mongodb`
*   `sudo mkdir -p /data/db`
*   `whoami`
*   `sudo chown -R <USERNAME> /data/db`

__MongoDB启动:__

*   `mongod`, 默认使用`/data/db`文件夹存放数据库文件。也可以是用`mongod --dbpath=<PATH>`来制定文件夹路径。
*   上一步，当终端显示`2016-11-04T11:13:40.154+0800 I NETWORK  [initandlisten] waiting for connections on port 27017`时，新开一个终端运行`mongo`
*   `db`查看数据库

__安装MongoDB的NodeJS驱动:__

*   `npm i mongodb --save`


__目录结构：__

*   __controllers/__ 定义应用的路由和对应的处理逻辑
*   __helpers/__ 在项目各个地方都可能会用到的代码，工具函数，模块等
*   __middlewares/__ `Express`中间件，用来在请求到达路由前进行预处理
*   __models/__ 数据模型，完成业务逻辑
*   __public/__ 包含所有的静态文件，例如图片，样式，脚本文件
*   __views/__ 提供用来被渲染的视图模板
*   __tests/__ 存放测试代码
*   __index.js__ 应用初始化主文件，也可以名为`app.js`, `main.js`

__Models__

数据模型的这些文件是和数据库交互的，包含处理数据的方法，不仅仅是`CURD`这些方法，还包含业务逻辑代码。

应该为每种类型的数据模型至少创建一个文件，例如，如果有`user`和`comment`，那么应该有`user model`和`comment model`。
当一个数据模型文件很大的时候，就应该拆分成多个文件，基于一些内部的逻辑。

应该保持这些数据模型独立性，不依赖任何模块。他们不需要知道其他模型或者包含其他模型，他们不需要关心`controller`或者谁使用它们。
它们不应该接收`request`和`response`对象，不应该返回`http`错误，而是返回数据模型上的一些错误。

这会让你的数据模型变的更具有可维护性，便于测试，改变模型不会影响到其他模块。

__Views__

一个最佳实践是，不要对视图模板及视图中的数据进行太重的逻辑处理，应将这些处理放在`controller`中.

__Controllers__

在这个文件夹下，定义所有的路由，控制器处理客户端过来的请求`request`, 与数据模型(`Model`)交互，将数据模型返回的数据结合视图模板输出给用户视图。

一个最佳实践是，所有同一个控制器下的路由，最好带上与控制器名相同的前缀，例如`/comments/all`和`/comments/new`。

有时候，很难决定一部分逻辑到低是放在控制器中，还是数据模型中。一个最佳实践是，控制器不应该直接操作数据库，不应该调用数据库驱动提供的诸如"write","update", "fetch"这样的方法，
而是应该依靠数据库模型提供的方法。例如，如果有一个__car__的数据模型，你想给这个car安装4个轮子，在car的控制器不应该调用`db.update(id, {wheels: 4})`，而是应该调用car的数据库模型
提供的方法，比如`car.mountWheels(id, 4)`。

__Middlewares__

中间件的作用是抽出公用的控制器代码，多个请求要执行多次，通常要修改`request`和`response`对象。

和控制器一样，中间件也不应该有直接访问数据库的操作，而是应该使用数据模型提供的方法。

__Helpers__

在这个文件夹下，存放一些工具函数，这些工具函数可能会再多个数据模型，控制器，中间件中使用。常见的工具函数是管理日期和时间的函数。

__Public__

这个文件夹存放静态文件，一般还有子目录，例如__css__, __libs__, __images__, __js__（例如`jQuery`）。

一个最佳实践是，这个目录下的文件不局限于是你项目的`Node`服务器要用的，还可以是`Nginx`或者`Apache`这样的服务器，它们比`Node`服务器更好。

__Tests__

测试代码。__controllers__, __helpers__, __models__ 和 __middlewares__很清楚，它们分别测试项目对应目录中的代码，并且被测试的文件和测试文件是一一对应的。
这四个文件夹底下的测试都是单元测试。__integration__包含集成测试代码，用来保证应用各部分正确的在一起工作。__ui__也包含集成测试，也是用来保证应用各部分正确工作，
不同的是，代码将运行在浏览器中，模拟用户的行为来使用应用。


__注意：__

* 没必要在每个路由中连接数据库，操作完成后断开数据库连接。应用启动时，可以先创建一个数据库连接实例，以后直接`require`这个数据库实例即可。

* 分页`pagination`其实就是一个`view helper`。

