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

# 插件：

1. 提供网格条线
