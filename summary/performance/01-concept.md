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

插件：

1. 提供网格条线
