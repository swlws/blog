# HTTP协议

http使用场景枚举



# 一、Access Control CORS

问题清单：

- 什么事跨域
- 同源策略
- 跨域资源共享，CORS（Cross-Orign resource sharing）



## 1、什么是跨域

当域名、协议、端口不一致时，会发出跨源HTTP请求



## 2、同源策略

- 仅仅是WEB出于安全考虑添加的限制，根据CORS规则控制对资源的访问。

- 服务于服务之间的通信不存此限制。



## 3、CORS

**工作原理：**添加新的HTTP请求头

**预检：**针对可能产生副作用的HTTP请求方法，规范要求浏览器“预检”请求（`OPTIONS`请求），服务器同意后，再发送实际的HTTP请求

**凭证控制：**服务器可以控制浏览器，是否允许发送Cookie、HTTP认证数据



### 3.1、有副作用的请求

浏览器限制跨域的方式有两种：

- 浏览器限制发起跨域请求
- 跨域请求可以正常发送，但结果被浏览器拦截了



一般浏览器是第二种方式限制跨域请求。这种方式下，请求到达了服务器，服务器可能对数据库进行了操作。但是，返回的结果被浏览器拦截了，这是一次失败的请求。

为了防止这种场景，浏览器必须先发起`OPTIONS`请求，询问服务器是否允许跨域请求。允许则发送真实的请求；不允许则阻止发送真实的请求。



### 3.2、何时触发预检（Preflight）

将HTTP分为两类：简单请求、需预检的请求，前者不会触发`预检`



**简单请求满足的条件：**

- Method：GET、HEAD、POST

- 除了用户代理自动设置的标头，允许手动添加的
  - Accept
  - Accept-Language
  - Content-Language
  - Content-Type: `application/x-www-form-urlencoded` `multipart/form-data` `text/plain`



**需预检的请求**

当请求满足下述任一条件时，即应首先发送预检请求：
- 使用了下面任一 HTTP 方法：
  - PUT
  - DELETE
  - CONNECT
  - OPTIONS
  - TRACE
  - PATCH
- 人为设置了对 [CORS 安全的首部字段集合](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)之外的其他首部字段。该集合为：
  - Accept
  - Accept-Language
  - Content-Language
  - Content-Type的值不在【`application/x-www-form-urlencoded` `multipart/form-data` `text/plain`】之中
  - DPR
  - Downlink
  - Save-Data
  - Viewport-Width
  - Width
    



### 3.3、服务器对跨域的设置

**Access-Control-Request-Method**

> 声明允许跨域的方法，值可以是
>
> - *，表示可以是任意方法
>
> - 值也可以是具体方法，用逗号分割，eg：POST, GET, OPTIONS



**Access-Control-Request-Headers**

> 允许的自定义标头，设置后浏览器端，才可以访问Response中的自定义标头。
>
> eg：X-Token



**Access-Control-Max-Age**

> 在一段时间内，浏览器无须为同一请求再次发起预检请求。
>
> eg：86400。  即24小时	



**Access-Control-Allow-Credentials**

> 是否允许携带凭证
>
> eg: true



## 4、参考

- [跨域资源共享](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)



# 二、Authentication

HTTP为访问控制、身份验证提供了一个通用框架，最常见的HTTP认证方案是“基本”认证。



## 1、基本认证

流程：

1. 浏览器访问资源
2. 服务端返回标头`WWW-Authenticate: Basic realm="VisualSVN Server"`，状态码为`401`。此时页面提示输入用户名、密码
3. 输入用户名、密码，验证通过后，携带凭证访问资源



**响应标头语法**

```properties
WWW-Authenticate: <type> realm=<realm>
Proxy-Authenticate: <type> realm=<realm>
```

- type，指验证的方案
- realm，用来描述进行保护的区域，或者指代保护的范围



**请求标头语法**

```properties
Authorization: <type> <credentials>
Proxy-Authorization: <type> <credentials>
```



## 2、代理认证

`代理认证`的流程与`基本认证`相同。标头为`Proxy-Authorization`，状态码为`407`.



## 3、认证方案

常见的认证方案：

- **基本**（请参阅[RFC 7617](http://tools.ietf.org/html/7617)，base64编码凭证，请参阅下面的更多信息。）

- **承载**（请参阅[RFC 6750](http://tools.ietf.org/html/6750)，承载令牌访问受OAuth 2.0保护的资源）

- **摘要**（请参阅[RFC 7616](http://tools.ietf.org/html/7616)，Firefox中只支持md5散列，请参阅SHA加密支持的[bug 472823](https://bugzilla.mozilla.org/show_bug.cgi?id=472823)）

- **HOBA**（参见[RFC 7486](http://tools.ietf.org/html/7486)（草案），**ħ** TTP **ö** rigin- **乙** ound **甲** uthentication，数字签名系）

- **相互**（见[draft-ietf-httpauth-mutual](https://tools.ietf.org/html/draft-ietf-httpauth-mutual-11)）

- **AWS4-HMAC-SHA256**（请参阅[AWS文档](http://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-auth-using-authorization-header.html)）



### 3.1 Nginx + 基本认证方案

首先需要一个用户文件，存储用户名、密码，通常文件名称为`.htpasswd`，文件中每一行存储一个用户名和密码，示例：

**/root/.htpasswd**

```properties
user:$apr1$hjbC7lpc$RHvnUCAIPSqWIS1HxP2Uu0
```



密码有多种生成方式，[查看更多生成方式](https://httpd.apache.org/docs/2.4/misc/password_encryptions.html)，上述使用的`htpasswd`命令，命令行：

> htpasswd -nbm user user@123



在 nginx 中, 需要指定一个保护区域和该 `auth_basic` 指令提供的保护区域名字.  `auth_basic_user_file` 指令指向一个`.htpasswd`文件，此文件包含加密用户凭据的文件。

```nginx
location /status {
    auth_basic           "Access to the staging site";
    auth_basic_user_file /root/.htpasswd;
}
```



## 4、参考

- [HTTP 身份验证](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Authentication)

- [Password Formats](https://httpd.apache.org/docs/2.4/misc/password_encryptions.html)





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



