# HTTP 速查手册

# 一、通用身份验证

```bash
# 服务端返回401，并告知验证类型为Basic
GET 401 Unauthorized
WWW-Authenticate: Basic realm="description"

# 浏览器输入验证信息后，请求头中携带验证信息
Authorization: Basic xxxxxxxxxx
```

# 二、Cookie

```bash
# 服务端返回set-cookie
set-cookie: name=xxxxx
set-cookie: age=xxxxx

# 用户代理记录Cookie，并在下次请求时携带Cookie
Cookie: name=xxxxx; age=xxxxx
```

# 三、永久重定向

```bash
# 状态码配置为301

GET 301
Location: http://example.com
```

# 四、临时重定向

```bash
# 状态码配置为302

GET 302
Location: http://example.com
```

# 五、HTML 重定向

```html
<!-- 通过HTML标签实现重定向 -->

<meta http-equiv="Refresh" content="0; URL=http://example.com/" />
```

```js
// 通过JS实现重定向

window.location = "http://example.com/";
```

# 六、访问控制策略

```js
// headers配置

// 允许所有来源
Access-Control-Allow-Origin: *
// 允许所有方法
Access-Control-Allow-Methods: *
// 允许所有Headers
Access-Control-Allow-Headers: *
// 响应的有效时间为 86400 秒，也就是 24 小时。在有效时间内，浏览器无须为同一请求再次发起预检请求。
Access-Control-Max-Age: 86400
```

# 七、HTTP 缓存

混存的种类：

- 私有缓存。eg：浏览器
- 共享缓存
  - 代理缓存。eg：代理设备（Nginx 代理）
  - 托管缓存。eg：反向代理、CDN 和 service worker 与缓存 API 的组合。

## 7.1 Cache-Control

**Response：**

| value            | description                                                          |
| ---------------- | -------------------------------------------------------------------- |
| private          | 数据可以被`私有缓存`存储（eg：浏览器）                               |
| public           | 数据可以被`共享缓存`存储 （eg：代理缓存、托管缓存）                  |
| no-cache         | 相应的数据可以被缓存，但之后的每次请求需要向源服务端做文件有效性校验 |
| no-store         | 任何种类的缓存（私有缓存、共享缓存）都不应缓存数据                   |
| max-age=0        | 不直接使用本地缓存，需向目标服务端做新鲜度                           |
| must-revalidate  | 缓存未过期时，可以直接使用；过期后，需要向源服务端做文件有效性校验   |
| proxy-revalidate | 等价于`must-revalidate` ，但仅共享缓存有效                           |

**Request**

| value    | description                                      |
| -------- | ------------------------------------------------ |
| no-cache | 要求缓存做新鲜度校验                             |
| no-store | 即使源服务端的响应，可以被缓存，也不应该缓存     |
| max-age  | 客户端告诉服务端，客户端允许的最大缓存时长（秒） |

## 7.2 验证响应

**基于文件最后更新时间**

> Last-Modified / If-Modified-Since

**基于正文内容 Hash**

> ETag / If-None-Match

**强制重新验证**

方式一：

> Cache-Control: no-cache

方式二：

> Cache-Control: max-age=0, must-revalidate

# 八、范围请求

_STEP 1：检测是否支持范围请求_

```bash
curl -I http://example.com

# 若支持范围请求，则Headers中存在Accept-Ranges、Content-Length
HTTP/1.1 200 OK
...
Accept-Ranges: bytes
Content-Length: 146515
```

若`Accept-Ranges`字段存在，且值非`none`，则支持范围请求。

_STEP 2：发送范围请求_

```bash
curl http://exmaple.com/test.jpg -i -H "Range: bytes=0-1023"

# 响应头
HTTP/1.1 206 Partial Content
Content-Range: bytes 0-1023/146515
Content-Length: 1024
...
(binary content)
```
