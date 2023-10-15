# API 网关

## 一、背景

微服务体系中，如果未部署网关，则客户端必须直接向前端服务发送请求。 但是，直接向客户端公开服务会造成一些潜在问题：

- 可能需要编写复杂的客户端代码。 客户端必须跟踪多个终结点，并以弹性方式处理故障。
- 会在客户端与后端之间造成耦合。 客户端需要知道如何分解各个服务。 因此，客户端维护和服务重构会变得更困难。
- 单个操作可能需要调用多个服务。 这可能导致客户端和服务器之间的多次网络往返，从而显著增加了延迟时间。
- 每个面向公众的服务必须处理身份验证、SSL 和客户端速率限制等问题。
- 服务必须公开客户端友好的协议，例如 HTTP 或 WebSocket。 这就限制了通信协议的选择。
- 包含公共终结点的服务是潜在的受攻击面，必须得到强化。

## 二、API 网关

位置：API 网关位于客户端与服务之间

作用：

- 充当反向代理，将来自客户端的请求路由到服务。
- 执行各种横切任务，例如身份验证、SSL 终止和速率限制

网关的功能，划分为三类：

- 网关路由。使用网关作为反向代理，网关为客户端提供单一终结点，可帮助将客户端与服务分开。
- 网关聚合。将多个单独请求聚合成一个请求。
- 网关卸载。将单个服务的功能卸载到网关，尤其适合用于解决横切问题。
  - [SSL 终止](https://www.racent.com/blog/ssl-offloading-bridging-termination)
  - 访问控制，IP 允许/阻止列表
  - 流量控制，客户端速率限制（限制）
  - 日志记录和监视
  - Authentication。登录凭证校验、API 资源调用权限校验
  - API 参数清洗
  - 响应缓存
  - Web 应用程序防火墙
  - GZIP 压缩
  - 为静态内容提供服务
- 发布
  - 金丝雀
  - 灰度发布
- 持续集成
  - 对接 swagger 文档

支持的应用层协议：

- HTTP、HTTPS
- WebSocket

## 三、功能

### 3.1 API 路由转发

使用反向代理服务器，一般使用 Nginx 和 HAProxy。

支持的协议：HTTP、HTTPS、WebSocket

### 3.2 API 路由聚合

BFF（Backend For Frontend），服务于前端的后端。为每一种客户端适配一个网关，组装、过滤客户端需要的数据（不关心业务）。

### 3.3 SSL 终止

客户端到网关层使用 HTTPS 协议，网关层到各个服务层使用 HTTP 协议。

### 3.4 流量控制

限制单位时间内 API 的被调用次数，保护后端服务。

### 3.5 访问控制

控制访问 API 的 IP 地址和帐户，设置 IP 地址或帐户的黑白名单来拒绝/允许某个 IP 地址或帐户访问 API。

### 3.6 流量监控

监控 API 的延迟、流入流量、流出流量、调用次数等。参考[华为云 API 网关的指标](https://support.huaweicloud.com/intl/zh-cn/usermanual-apig/apig-ug-180427085.html)

### 3.7 日志分析

分析的指标：

- PV、UV
- 客户端种类分布移动端、PC 端口；Chrome、Firefox
- 访客 IP 分布

### 3.8 鉴权

| 鉴权对象 | 方式                                                        |
| -------- | ----------------------------------------------------------- |
| 应用鉴权 | 为应用设置 AppCode，请求中携带正确的 AppCode 时，鉴权通过。 |
| 用户鉴权 | 云账号；基于 OAuth 2.0 协议的 OpenID；无认证                |
| API 鉴权 | 插件，拦截请求，配合具体业务具体实现                        |

## 四、产品设计

一个 API 网关产品，通常会抽象出：

- Upstream 上游
- Router 路由
- API Group（有的产品也叫服务）
- Plugin 插件

**Router**

通过路由定义规则来匹配客户端请求，根据匹配结果加载并执行相应的插件，最后把请求转发给到指定的上游应用

**Api Group**

路由集合。可以通过 Group 统一配置 API 的转发、横切任务。

**Upstream**

上游的作用是按照配置规则对服务节点进行负载均衡，它的地址信息可以直接配置到路由或服务上。

**Plugin**

内置横切任务插件，比如 KeyAuth、日志审计等。

可以单独为路由配置插件，也可以为 Group 配置插件。

## 五、产品

- [阿里云 API 网关](https://help.aliyun.com/product/29462.html)
- [百度智能云 API 网关](https://cloud.baidu.com/doc/APIGW/index.html)
- [华为云 API 网关](https://support.huaweicloud.com/intl/zh-cn/apig/index.html)
- [腾讯云 API 网关](https://cloud.tencent.com/document/product/628)
- [Apache APISIX](https://apisix.apache.org/zh/docs/apisix/getting-started/)
- [Kong](https://docs.konghq.com/gateway/latest/)
- [express gateway](https://www.express-gateway.io/docs/core-concepts/)

---

## 参考

- [^1] [在微服务中使用 API 网关](https://learn.microsoft.com/zh-cn/azure/architecture/microservices/design/gateway)
- [^2] [阿里云 API 网关-功能列表](https://help.aliyun.com/document_detail/29466.html)
- [^3] [阿里云 API 网关-API 网关 OpenID Connect 使用指南](https://help.aliyun.com/document_detail/48019.htm?spm=a2c4g.11186623.0.0.41ab26d3JQFmKl#topic9444)
- [^4] [百度智能云 API](https://cloud.baidu.com/doc/APIGW/index.html)
