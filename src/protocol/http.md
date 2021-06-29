# HTTP协议

http使用场景枚举



# 编码



# 缓存



# FILE

文件下载相关的请求头



## Content-Type

文件下载一般使用：

> Content-Type: application/octet-stream



它的值为[MIME类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)



## Accept-Ranges

**`Accept-Ranges`**响应的 HTTP 标头由服务器使用以通告其支持部分请求的标志物。如果存在`Accept-Ranges`标题，浏览器可能会尝试*恢复*中断的下载，而不是从头再次开始。



> Accept-Ranges: bytes



# 跨域



