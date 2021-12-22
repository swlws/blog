# 文档中的 URL 解析规则

当浏览器加载一个 HTML 文档后，遇到 link、script、img 等资源时，会向后台通过 HTTP/HTTPS 协议请求资源。由于资源的请求路径的书写方式不同，则真正向后台发送的完整的 URL 也是不同的。同时因为`<base>`标签的存在，也会导致解析出 URL 不同。本文主要描述`URI`与 web 中资源 URL 的解析规则。

# 一、URI

HTTP 请求的目标是资源，可以是文档、图片或其它的东西。每一种资源都是由`资源标识符`（Uniform Resource Identifier）定位的。

URI 的两种形式：

- [URL（Uniform Resource Locator）](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#urls)，统一资源定位符，用于 web 地址。
- [URN（Uniform Resource Name）](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#urns)，在特定命名空间中按名称标识资源。

## 1.1、URL

语法格式：

```bash
<scheme or protocol><user>:<passwdor>@<domain>:<port><path><query><fragment>
```

示例：

```
https://developer.mozilla.org/en-US/docs/Learn
tel:+1-816-555-1212
git@github.com:mdn/browser-compat-data.git
ftp://example.org/resource.txt
urn:isbn:9780141036144
mailto:help@supercyberhelpdesk.info
```

### 1.2.1 scheme or protocol

web 中常用的协议由`http`,`https`,此外当遇到其它协议时，浏览器也是知道如何处理的，比如`mailto:`,`ftp:`等。常见的方案如下：

#### [Data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)

语法：

```bash
data:[<mdiatype>][;base64,]<data>
```

mdiatype 支持多种[MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

示例：在页面上展示一个 svg 图片

```html
<img
  src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPgogIDxwYXRoIGQ9Ik01MTEuMzMgNTEyLjU3bS00NDguNDcgMGE0NDguNDcgNDQ4LjQ3IDAgMSAwIDg5Ni45NCAwIDQ0OC40NyA0NDguNDcgMCAxIDAtODk2Ljk0IDBaIiBmaWxsPSIjRjk3RjQxIj48L3BhdGg+Cjwvc3ZnPg=="
  alt=""
  srcset=""
/>
```

#### 主机上的文件名

语法:

```bash
file:<文件的绝对路径>
```

通畅直接打开计算机上的静态文件时，使用的是`file:`协议。

#### [文件传输协议-**FTP** (File Transfer Protocol)](https://developer.mozilla.org/en-US/docs/Glossary/FTP)

语法:

```bash
ftp:<username>@<ip>
加密版本
sftp:<username>@<ip>
```

因为安全问题，通常使用加密版本`sftp`

#### [超文本传输协议-http、https](https://developer.mozilla.org/en-US/docs/Glossary/HTTP)

http 协议、https 协议

#### 内嵌的 javascript 代码

示例：

```html
<a href="javascript:alert(123)">alert</a>
```

#### 邮件

语法：

```bash
mailto:<邮箱地址>
```

示例：

```html
<a href="mailto:example@163.com">mail to</a>
```

#### ssh

连接到服务器

语法：

```bash
ssh:<username>@<ip>
```

示例：

```html
<a href="ssh:root@192.168.1.2">ssh</a>
```

#### 电话号码

语法：

```bash
tel:+<号码>
```

示例：

```html
<a href="tel:+1-816-555-1212">tel</a>
```

#### 查看源码

语法：

```bash
view-source:<url>
```

示例：

```html
view-source:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#urls
```

#### [The WebSocket API (WebSockets)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

双工流通信协议

示例：

```bash
'ws://localhost:8080'
```

### 1.2.2 path

资源的路径，示例`/a/b/c/index.html`

### 1.2.3 query

查询参数，示例`?key1=value1&key2=value2`

### 1.2.4 fragment

常当作`锚点`，用于定位当前文档中的资源。

# 二、base 标签

HTML 文档中的`<base>`标签，会影响到相对资源请求路径的计算。

可以通过 [`Node/baseURI`](https://developer.mozilla.org/en-US/docs/Web/API/Node/baseURI)查看文档的`baseURL`,当`<base>`标签不存在时，`baseURL`的值为[`location.href`](https://developer.mozilla.org/en-US/docs/Web/API/Location/href).

一个文档中若出现多个`<base>`标签，则仅第一个生效.

`baseURL` 的值受`location.href`和`<base>`标签影响，计算规则如下：

| location.href            | base.href            | baseURL                       |
| ------------------------ | -------------------- | ----------------------------- |
| http://a.com/rource/img  |                      | http://a.com/rource/img       |
| http://a.com/rource/img  | ./a/b/c              | http://a.com/rource/a/b/c     |
| http://a.com/rource/img  | /a/b/c               | http://a.com/a/b/c            |
| http://a.com/rource/img/ | ./a/b/c              | http://a.com/rource/img/a/b/c |
| http://a.com/rource/img/ | /a/b/c               | http://a.com/a/b/c            |
| \*                       | http://bbb.com/a/b/c | http://bbb.com/a/b/c          |

# 三、资源的 URL 计算方式

当资源的`path`书写方式不同时，最终 URL 也是不同的。`path`的三种场景:

- 完整的 URL。http://a.com/1.png
- 相对路径. `./1.png`
- 绝对路径 `/1.png`

解析规则如下：

| baseURL                  | Path                   | 计算结果                          |
| ------------------------ | ---------------------- | --------------------------------- |
| http://a.com/rource/img  | ./dir/1.png            | http://a.com/rource/dir/1.png     |
| http://a.com/rource/img  | /dir/1.png             | http://a.com/dir/1.png            |
| http://a.com/rource/img/ | ./dir/1.png            | http://a.com/rource/img/dir/1.png |
| http://a.com/rource/img/ | /dir/1.png             | http://a.com/rource/img/dir/1.png |
| http://a.com/rource/img/ | http://a.com/dir/1.png | http://a.com/dir/1.png            |
