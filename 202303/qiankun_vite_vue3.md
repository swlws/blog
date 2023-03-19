# 【微前端】qiankun + vite + vue

专栏：

- [【微前端】什么是微前端](https://blog.csdn.net/swl979623074/article/details/129648756)
- [【微前端】qiankun](https://blog.csdn.net/swl979623074/article/details/129649129)
- [【微前端】qiankun + vite + vue](https://blog.csdn.net/swl979623074/article/details/129651079)

# 一、整体结构

在 qiankun 体系下，一个微前端工程包含一个主应用和多个子应用。本质上，每个工程（主应用）都可以单独开发、运行。

## 1.1 开发时工程结构

共三个工程，一个主应用、两个子应用，目录结构:

```bash
.
├── app-01
│   ├── README.md
│   ├── index.html
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── public
│   ├── src
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── app-02
│   ├── README.md
│   ├── index.html
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── public
│   ├── src
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── main-app
│   ├── README.md
│   ├── index.html
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── public
│   ├── src
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── readme.md
```

## 1.2 部署工程结构

部署方式可以选择多种，这里使用的方式是将三个工程部署在同一个 server、同一个 port 下，目录结构为：

```bash
.
├── index.html
├── static
│   ├── index-011eeef2.css
│   └── index-0ab867b1.js
├── sub
│   ├── app-01
│   │   ├── index.html
│   │   ├── static
│   │   │   ├── index-0244ff29.js
│   │   │   └── index-83c9dd61.css
│   │   └── vite.svg
│   └── app-02
│       ├── index.html
│       ├── static
│       │   └── index-cb440182.js
│       └── vite.svg
└── vite.svg
```

# 二、开发

开发时，三个应用对应的监听端口：

| 应用     | 端口 |
| -------- | ---- |
| main-app | 80   |
| app-01   | 8081 |
| app-02   | 8082 |

工程启动之后，可以在浏览器访问：

- http://localhost:80 整体运行效果
- http://localhost:8081 app-01 单独运行效果
- http://localhost:8082 app-02 单独运行效果

## 2.1 主应用

`主应用`用于注册子应用，以及控制子应用之间的切换。

### A. 注册子应用

在新建的 vue3 工程的 main.ts 中注册子应用：

```ts
// 开发模式时，entry的值为子应用的开发演示环境的地址
if ("development" === import.meta.env.MODE) {
  registerMicroApps([
    {
      name: "app_01",
      entry: "//localhost:8081/",
      container: "#container",
      activeRule: "/app_01",
    },
    {
      name: "app_02",
      entry: "//localhost:8082/",
      container: "#container",
      activeRule: "/app_02",
    },
  ]);
} else {
  // 生产环境时，entry的路径为app在部署时的真实路径
  registerMicroApps([
    {
      name: "app_01",
      entry: "./sub/app-01",
      container: "#container",
      activeRule: "/app_01",
    },
    {
      name: "app_02",
      entry: "./sub/app-02",
      container: "#container",
      activeRule: "/app_02",
    },
  ]);
}

setDefaultMountApp("/app_01");

// 启动 qiankun
start();
```

注册子应用时，分为两种模式，开发模式和部署模式，对应的 `entry` 的值是有区别的。

### B. 子应用路由

```html
<a @click="toApp('/app_01')">app 01</a>
```

```js
function toApp(path: string) {
  history.pushState({}, "", path);
}
```

需要注意的是，这里不能使用 a 标签 的 href，会报错 404 错误，必须使用`history.pushState`控制路由。

因为`href`属性会导致浏览器刷新，获取不到资源。

## 2.2 子应用

### A. 安装依赖

> pnpm add vite-plugin-qiankun

### vite.config.js

配置文件修改

```js
export default defineConfig({
  // 打包时，这里填充的为绝对路径，对应的是部署路径
  base: "/sub/app-01",
  plugins: [
    vue(),
    qiankun("app-01", {
      useDevMode: true,
    }),
  ],
});
```

### C. 入口改造

启动方式，分为两种：

- 单独启动
- 在主应用中启动

qiankun 需要子应用导出三个接口：

- bootstrap
- mount
- unmount

```ts
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

import { App as VueApp, createApp } from "vue";
import router from "./router";
import App from "./App.vue";

let app: VueApp<Element>;
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  createApp(App).use(router).mount("#app");
} else {
  renderWithQiankun({
    mount(props) {
      console.log("--app 01 mount");

      app = createApp(App);
      app.use(router);
      app.mount(
        (props.container
          ? props.container.querySelector("#app")
          : document.getElementById("app")) as Element
      );
    },
    bootstrap() {
      console.log("--app 01 bootstrap");
    },
    update() {
      console.log("--app 01 update");
    },
    unmount() {
      console.log("--app 01 unmount");
      app?.unmount();
    },
  });
}
```

# 三、部署

三个工程依次打包后，在`main-app`的打包输出中，新建 sub 文件夹，将子应用的打包输出移动到 sub 文件夹中。结构：

```bash
.
├── index.html
├── static
│   ├── index-011eeef2.css
│   └── index-0ab867b1.js
├── sub
│   ├── app-01
│   │   ├── index.html
│   │   ├── static
│   │   │   ├── index-0244ff29.js
│   │   │   └── index-83c9dd61.css
│   │   └── vite.svg
│   └── app-02
│       ├── index.html
│       ├── static
│       │   └── index-cb440182.js
│       └── vite.svg
└── vite.svg
```

在本地启动一个静态 web 服务即可访问页面，比如使用`serve`命令启动服务：

```bash
serve . -p 5500
```

浏览器中访问：http://localhost:5500

# 四、坑点

## 001. 主应用注册 App 时，`activeRule` 有两种模式

hash 模式

```js
const getActiveRule = (hash) => (location) => location.hash.startsWith(hash);
registerMicroApps([
  {
    name: "app-hash",
    entry: "http://localhost:8080",
    container: "#container",
    activeRule: getActiveRule("#/app-hash"),
    // 这里也可以直接写 activeRule: '#/app-hash'，但是如果主应用是 history 模式或者主应用部署在非根目录，这样写不会生效。
  },
]);
```

history 模式

```js
registerMicroApps([
  {
    name: "app",
    entry: "http://localhost:8080",
    container: "#container",
    activeRule: "/app",
  },
]);
```

## 002. 主应用使用`history`时，如何控制子应用的切换

history 模式时，主应用会监听`location.pathname`的变化，从而切换子应用的加载与卸载。

主应用中，使用 a 便签切换应用时：

```html
<!-- 开发环境时，没有问题 -->
<!-- 部署环境时，会报错：/app_01 404的错误 -->
<a href="/app_01">app 01</a>
```

404 的原因，静态部署时：a 标签会触发浏览器的刷新，刷新后，浏览器向后台发起请求/app_01，后台的确没有这个物理路径

改进方案，使用 `history.pushState` 接口：

```html
<a @click="toApp('/app_01')">app 01</a>
```

```js
function toApp(path: string) {
  history.pushState({}, "", path);
}
```

使用`history.pushState`的方式，不会出发浏览器的刷新行为。当浏览器的`pathname`发生变化时，`qiankun`会感知到路由发生变化，并加载对应的页面。

到这一步时，若不主动执行`F5`刷新操作，一切正常。但使用`F5`后，还是会报错 404，此时需要后台的路由进行配合，以 Nginx 为例子：

```nginx
server {
  listen       8080;
  server_name  localhost;

  location / {
    root   html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
  }

  location /child/vue-history {
    root   html;
    index  index.html index.htm;
    try_files $uri $uri/ /child/vue-history/index.html;
  }
}
```

# 六、源码

源码地址：[https://github.com/swlws/qiankun-vite-vue3](https://github.com/swlws/qiankun-vite-vue3)
