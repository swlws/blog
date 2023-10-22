# 概述

# CSS

- css 简写，减少字节数
- css 浅选择器，大幅减少样式表的大小
- uncss 移除多余的属性
- 避免@import。会造成延迟渲染
- 过渡
- will-change
- 关键 css 及其解决的问题
  - 关键 css。用户立即看到的内容
  - 非关键 css
- loadcss 库，使用 perload 语法加载首屏以外的内容
- cssrelpreload
- mydevice.io 枚举各种设备的分辨率

```html
<link
  rel="preload"
  href="css/styles.min.css"
  as="style"
  onload="this.rel='stylesheet'"
/>
```

# 图片

```html
<picture>
  <source
    srcset="/media/cc0-images/surfer-240-200.jpg"
    media="(orientation: portrait)"
  />
  <img src="/media/cc0-images/painted-hand-298-332.jpg" alt="" />
</picture>
```

主流图像类型：

1. 光栅（位图）。JPEG、PNG、GIF
   - 有损。JPEG、WebP（有损）
   - 无损。GIF、PNG、WebP（无损）
2. SVG。矢量图，任意缩放不会任何视觉效果

自适应图片

```html
<img
  src="image-small.jpg"
  srcset="image-medium.jpg 640w, image-large.jpg 1280w"
/>

<img
  src="image-small.jpg"
  srcset="image-medium.jpg 640w, image-large.jpg 1280w"
  sizes="(min-width: 704px) 50vw, 100vw"
/>
```

# 图像的进一步处理

- 雪碧图
- 压缩图片
- webp
- 延迟加载

雪碧图

- npm i -g svg-sprite

图片优化

- imagemin
- svgo

# 第 9 章 使用 Service Worker 提升性能

# 第 10 章 微调资源传输

# 第 11 章 http2

http1

- 问题：
  - 对首阻塞。通常一次最大处理六个请求
  - 未压缩的头部
  - 缺少 HTTPS 的授权

http2

- 提供成本更低的请求
  - 一套新的传输体系。连接->流->消息->帧
  - http2，一个连接，处理多个请求
- 头部压缩。
  - 采用索引的思路，对相同的 header 值只用引用
- 服务器推送

关于 Http1 的思考：

Q1：http1，性能优化时，通常都会去竭力去减少请求数量，根本原因是什么？

A1：因为队首阻塞的原因，同一批次的 6 个请求若是未完成，则后续的请求会一直处于等待状态。

Q2：域名分片，可用，但麻烦，不值得

A2：通过不用的域名，绕过最大的并发请求限制。

Q3：为何要压缩头部

A4：1. 现代请求通常在 headers 添加很多信息，如跨域、Token、Cookie 等，头部越来越大。在传输时，压缩头部是还很有必要的。

Q4：服务器压缩了什么？

A4：服务器仅仅压缩传输的 Body，不压缩 headers

Q5：内联资源的优劣势

A5：劣势：不能使用缓存；加快页面的渲染速度，因为内联资源不会单独开发起请求获取数据。

关于 Http2 的思考：

Q1：服务器的压力增加了？

A2：从测试来看，当大批量请求发起时。http1 时，请求的瓶颈压力在前端，使用瀑布图查看时，请求的排队时间过长；http2 时，请求的响应时间过长。所以，从请求发起到请求结束，孰优孰劣？这是个问题。

资源压缩

## HTTP2 服务器推送

服务器推送静态资源，在相应头中添加 header：

> link: <./css/index.css>; rel=preload; as=style

服务器推送，不会考虑缓存问题，无论用户代理是否存在缓存，都会推送全量数据

## HTTP 1 / HTTP 2 优化时的差异点：

1. HTTP 1 优化时更多的考虑资源捆绑，如雪碧图，减少请求数量
2. HTTP 2 优化时，更多考虑的是颗粒度。因为连接的代价更低，优先利用 HTTP 缓存的特性进行优化

# gulp

gulp 是一个流式构建系统。流从磁盘上的源读取数据，并进行处理和转换，然后将结果写回磁盘。常见的任务能力：

- 缩小 HTML
- JS 处理。丑化 JS
- CSS 处理。编译 less、scss 等
- 图片处理。压缩图片、转 WebP 等

生态很好

思考：

- gulp 与 webpack 之间的区别，优劣势

# 插件：

1. 提供网格条线
