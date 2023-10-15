# 一、获取Admin凭证

xhr: [doc](https://docs.cloudfoundry.org/api/uaa/version/75.0.0/index.html#with-authorization)

客户端admin账户是UAA服务的内置账户，存在配置文件`./WEB-INF/spring/oauth-clients.xml`,有UAA服务中client、group、user的读写权限。

```bash
curl 'http://192.168.10.56:8080/uaa/oauth/token' -i -u 'admin:adminsecret' -X POST -H 'Content-Type: application/x-www-form-urlencoded' -H 'Accept: application/json' -d 'grant_type=client_credentials&token_format=opaque'
```

**参数**

* token_format token格式化方式。opaque和jwt，前者为不透明的token

Response

```json
{
    "access_token": "d6eb1382943c4f819bc143c8912c655b",
    "token_type": "bearer",
    "expires_in": 43199,
    "scope": "clients.read clients.secret clients.write uaa.admin clients.admin scim.write scim.read",
    "jti": "d6eb1382943c4f819bc143c8912c655b"
}
```



**备注：**

下面出现的${ADMIN_TOKEN}为：

> d6eb1382943c4f819bc143c8912c655b



# 二、Client API

支持对客户端的单个、批量操作。

## 2.1 Create One Client

xhr：[doc](https://docs.cloudfoundry.org/api/uaa/version/75.0.0/index.html#create-6)

```bash
 curl 'http://192.168.10.56:8080/uaa/oauth/clients' -i -X POST -H 'Content-Type: application/json' -H 'Authorization: Bearer ${ADMIN_TOKEN}' -H 'Accept: application/json' -d '{ "scope" : [ "clients.read", "clients.write", "openid", "profile", "resource.read", "resource.write" ], "client_id" : "bitsnav", "client_secret" : "secret", "resource_ids" : [ ], "authorized_grant_types" : [ "client_credentials" ], "authorities" : [ "clients.read", "clients.write", "openid", "profile","resource.read", "resource.write" ], "token_salt" : "cdGXbD", "autoapprove" : true, "name" : "bitsnav web client" }'
```

**请求头：**

* **authorization**：值为第一步（获取Admin凭证）请求的Response的access_token

**参数**：

* **scope**：客户端具备的范围
* **authorities**：创建一个客户端时，标识这个客户端能给予USER的授权范围
* **redirect_uri**：用户在当前客户端鉴权成功后，重定向的路由



## 2.2 Delete One Client

xhr:[doc](https://docs.cloudfoundry.org/api/uaa/version/75.0.0/index.html#delete-6)

```bash
curl 'http://192.168.10.56:8080/uaa/oauth/clients/bitsnav' -i -X DELETE -H 'Authorization: Bearer ${ADMIN_TOKEN}' -H 'Accept: application/json'
```

Response:

```json
{
    "scope": [
        "clients.read",
        "clients.write",
      	"openid"
    ],
    "client_id": "bitsnav",
    "resource_ids": [
        "none"
    ],
    "authorized_grant_types": [
        "client_credentials"
    ],
    "redirect_uri": [
        "https://www.baidu.com"
    ],
    "autoapprove": [
        "true"
    ],
    "authorities": [
        "clients.read",
        "clients.write"
    ],
    "token_salt": "cdGXbD",
    "name": "bitsnav web client",
    "lastModified": 1617778508969,
    "required_user_groups": []
}
```



## 2.3 Update One Client

xhr:[doc](https://docs.cloudfoundry.org/api/uaa/version/75.0.0/index.html#update-6)

```bash
curl 'http://localhost:8080/uaa/oauth/clients/bitsnav' -i -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer ${ADMIN_TOKEN}' -H 'Accept: application/json' -d '{"client_id": "bitsnav", "scope" : [ "swl.test" ] }'
```



## 2.4 Retrieve One Client Info

xhr：[doc](https://docs.cloudfoundry.org/api/uaa/version/75.0.0/index.html#retrieve-3)

```bash
curl 'http://192.168.10.56:8080/uaa/oauth/clients/bitsnav' -i -X GET -H 'Authorization: Bearer ${ADMIN_TOKEN}' -H 'Accept: application/json'
```

Response:

```json
{
    "scope": [
        "clients.read",
        "clients.write"
    ],
    "client_id": "bitsnav",
    "resource_ids": [
        "none"
    ],
    "authorized_grant_types": [
        "client_credentials"
    ],
    "redirect_uri": [
        "https://www.baidu.com"
    ],
    "autoapprove": [
        "true"
    ],
    "authorities": [
        "clients.read",
        "clients.write"
    ],
    "token_salt": "cdGXbD",
    "name": "bitsnav web client",
    "lastModified": 1617778508969,
    "required_user_groups": []
}
```

# 三、Group API

[doc](https://docs.cloudfoundry.org/api/uaa/version/75.0.0/index.html#groups)

# 四、User API

[doc](https://docs.cloudfoundry.org/api/uaa/version/75.0.0/index.html#users)

