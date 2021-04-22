# UAA搭建

the User Account and Authentication (UAA) Server，用户账户、鉴权服务。

The primary role of UAA is as an OAuth2 provider, issuing tokens for client apps.

**[OAuth defines four roles:](https://www.rfcreader.com/#rfc6749_line230)**

* resource owner      

  An entity capable of granting access to a protected resource.  When the resource owner is a person, it is referred to as an end-user.    

* resource server      

  The server hosting the protected resources, capable of accepting and responding to protected resource requests using access tokens.    

* client      

  An application making protected resource requests on behalf of the resource owner and with its authorization.  The term "client" does not imply any particular implementation characteristics (e.g., whether the application executes on a server, a desktop, or other  devices).    

* authorization server      

  The server issuing access tokens to the client after successfully      authenticating the resource owner and obtaining authorization.





# 一、环境

* 操作系统：CentOS 7
* Java Version：[jdk-8u281-linux-i586.tar.gz](https://www.oracle.com/cn/java/technologies/javase/javase-jdk8-downloads.html#license-lightbox)
* Tomcat Version：[apache-tomcat-8.5.34.tar.gz](https://tomcat.apache.org/download-80.cgi)
* UAA WAR：[cloudfoundry-identity-uaa-4.30.0.war](https://repo1.maven.org/maven2/org/cloudfoundry/identity/cloudfoundry-identity-uaa/4.30.0/)

cloudfoundry uaa的官方指导文档，[doc](https://docs.cloudfoundry.org/concepts/architecture/uaa.html)，主要介绍uaa的能力，以及搭建方式。doc中的搭建方式需要本地编译，问题有点多。推荐使用war包部署。



# 二、部署UAA

cloudfoudry是一个云平台，包含很多组件，这里仅使用它的UAA服务。

## 2.1 UAA.yml

UAA war有默认的配置文件[uaa.yml](https://github.com/cloudfoundry/uaa/blob/develop/uaa/src/main/resources/uaa.yml)，同时支持额外外部自定义配置文件。实现方式：

### 1.UAA_CONFIG_PATH

通过环境变量指定配置文件位置，UAA会去检查此目录下的uaa.yml文件

> export UAA_CONFIG_PATH=/root/.uaa



### 2.yaa.yml

**参考：**

* [**Sysadmin-Guide.rst**](https://github.com/cloudfoundry/uaa/blob/master/docs/Sysadmin-Guide.rst) 介绍uaa.yml的部分字段含义
* [uaa job from uaa/75.0.0](https://bosh.io/jobs/uaa?source=github.com/cloudfoundry/uaa-release&version=75.0.0) 介绍uaa.yml的字段含义，参考意义大于实用意义





自定义配置：

```yml
issuer:
  uri: http://localhost:8080/uaa

encryption:
  active_key_label: CHANGE-THIS-KEY
  encryption_keys:
  - label: CHANGE-THIS-KEY
    passphrase: CHANGEME

login:
  serviceProviderKey: |
    -----BEGIN RSA PRIVATE KEY-----
    MIICXQIBAAKBgQDHtC5gUXxBKpEqZTLkNvFwNGnNIkggNOwOQVNbpO0WVHIivig5
    L39WqS9u0hnA+O7MCA/KlrAR4bXaeVVhwfUPYBKIpaaTWFQR5cTR1UFZJL/OF9vA
    fpOwznoD66DDCnQVpbCjtDYWX+x6imxn8HCYxhMol6ZnTbSsFW6VZjFMjQIDAQAB
    AoGAVOj2Yvuigi6wJD99AO2fgF64sYCm/BKkX3dFEw0vxTPIh58kiRP554Xt5ges
    7ZCqL9QpqrChUikO4kJ+nB8Uq2AvaZHbpCEUmbip06IlgdA440o0r0CPo1mgNxGu
    lhiWRN43Lruzfh9qKPhleg2dvyFGQxy5Gk6KW/t8IS4x4r0CQQD/dceBA+Ndj3Xp
    ubHfxqNz4GTOxndc/AXAowPGpge2zpgIc7f50t8OHhG6XhsfJ0wyQEEvodDhZPYX
    kKBnXNHzAkEAyCA76vAwuxqAd3MObhiebniAU3SnPf2u4fdL1EOm92dyFs1JxyyL
    gu/DsjPjx6tRtn4YAalxCzmAMXFSb1qHfwJBAM3qx3z0gGKbUEWtPHcP7BNsrnWK
    vw6By7VC8bk/ffpaP2yYspS66Le9fzbFwoDzMVVUO/dELVZyBnhqSRHoXQcCQQCe
    A2WL8S5o7Vn19rC0GVgu3ZJlUrwiZEVLQdlrticFPXaFrn3Md82ICww3jmURaKHS
    N+l4lnMda79eSp3OMmq9AkA0p79BvYsLshUJJnvbk76pCjR28PK4dV1gSDUEqQMB
    qy45ptdwJLqLJCeNoR0JUcDNIRhOCuOPND7pcMtX6hI/
    -----END RSA PRIVATE KEY-----
  serviceProviderKeyPassword: password
  serviceProviderCertificate: |
    -----BEGIN CERTIFICATE-----
    MIIDSTCCArKgAwIBAgIBADANBgkqhkiG9w0BAQQFADB8MQswCQYDVQQGEwJhdzEO
    MAwGA1UECBMFYXJ1YmExDjAMBgNVBAoTBWFydWJhMQ4wDAYDVQQHEwVhcnViYTEO
    MAwGA1UECxMFYXJ1YmExDjAMBgNVBAMTBWFydWJhMR0wGwYJKoZIhvcNAQkBFg5h
    cnViYUBhcnViYS5hcjAeFw0xNTExMjAyMjI2MjdaFw0xNjExMTkyMjI2MjdaMHwx
    CzAJBgNVBAYTAmF3MQ4wDAYDVQQIEwVhcnViYTEOMAwGA1UEChMFYXJ1YmExDjAM
    BgNVBAcTBWFydWJhMQ4wDAYDVQQLEwVhcnViYTEOMAwGA1UEAxMFYXJ1YmExHTAb
    BgkqhkiG9w0BCQEWDmFydWJhQGFydWJhLmFyMIGfMA0GCSqGSIb3DQEBAQUAA4GN
    ADCBiQKBgQDHtC5gUXxBKpEqZTLkNvFwNGnNIkggNOwOQVNbpO0WVHIivig5L39W
    qS9u0hnA+O7MCA/KlrAR4bXaeVVhwfUPYBKIpaaTWFQR5cTR1UFZJL/OF9vAfpOw
    znoD66DDCnQVpbCjtDYWX+x6imxn8HCYxhMol6ZnTbSsFW6VZjFMjQIDAQABo4Ha
    MIHXMB0GA1UdDgQWBBTx0lDzjH/iOBnOSQaSEWQLx1syGDCBpwYDVR0jBIGfMIGc
    gBTx0lDzjH/iOBnOSQaSEWQLx1syGKGBgKR+MHwxCzAJBgNVBAYTAmF3MQ4wDAYD
    VQQIEwVhcnViYTEOMAwGA1UEChMFYXJ1YmExDjAMBgNVBAcTBWFydWJhMQ4wDAYD
    VQQLEwVhcnViYTEOMAwGA1UEAxMFYXJ1YmExHTAbBgkqhkiG9w0BCQEWDmFydWJh
    QGFydWJhLmFyggEAMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEEBQADgYEAYvBJ
    0HOZbbHClXmGUjGs+GS+xC1FO/am2suCSYqNB9dyMXfOWiJ1+TLJk+o/YZt8vuxC
    KdcZYgl4l/L6PxJ982SRhc83ZW2dkAZI4M0/Ud3oePe84k8jm3A7EvH5wi5hvCkK
    RpuRBwn3Ei+jCRouxTbzKPsuCVB+1sNyxMTXzf0=
    -----END CERTIFICATE-----

#The secret that an external login server will use to authenticate to the uaa using the id `login`
LOGIN_SECRET: loginsecret

spring_profiles: postgresql,default
database:
  driverClassName: org.postgresql.Driver
  url: jdbc:postgresql://localhost:5432/uaa
  username: postgres
  password: 123

#jwt:
#  token:
#    signing-key: tokenKey
jwt:
  token:
    signing-key: |
      -----BEGIN RSA PRIVATE KEY-----
      MIIEpAIBAAKCAQEA7FfVYQay0MEWPD5y2bRo8rKzz5ngvg7PFTZz756pKA7Q1a9b
      nW5FtLQ5y2k+SFdOFKzEMdgAfyxMX2RfL9cChUJVkgagESlDrJ2U1BFEbEuTEXl5
      ZKGX5XRPt82Zk4A/gxDyAcQuqeQcDD7vWYCaQV2c1j8qsgr/ZuS1Bopq091x6VXl
      iSX9P+4YZVjP1+Us5CF7iSJTwuABWCe6dEseugs8gqWYkPm6c8KzvV3m+lLFXixQ
      r0UBgv552UHMZSJ+anybZB3uSpy6zRYANY8cEkIDjDK6fU8PG9/IvNP2HWScwUyf
      EkFw+dBqaYtu0Jp/DfE2jDHabRbQJqsQadANXQIDAQABAoIBADXueR+x8p4WYaeP
      rI+nToeLZeLKv3E/WdwCWARnFTyx3M/WOza6kieBNOsI8hB587ReFEs3ei2LA0aF
      Vf9JtiaIk5RF9MLVwr6iGvMlmZKI0F+dc6kWAt52YzaTMSdqjZOwCzmB9hAIoKne
      tqma4hhmb0KomWqVfeCR8gkzDtuXbXtj8Cv2tgpWNmYCq7mZCar9ZNJomhTJtWav
      IdunYuruP+pOI2G6BElHGofdqFfOCLczCCSeWjD/C4D2Htc7Ee2Gj8uyHSveqaxn
      CjvAuDne+Sh9+rS2RYnmI3QVHeMHFAuAVDpk6gVrs7WEQsg0kIxgSqRR2X3sruVV
      aU0N4qECgYEA+9A96ViKQgW3sUXI+NWa/EHNY7tXy3g4lBrSFgnGsU4qm30xwam9
      kFjEPx2c6+HTxp1lnNYhZxJI6miNYqwMsNtaqHrkI16RoNG/9eaiNhxrOD7rnYYY
      7+5YJQmGSPDzayZktqStqOQgmoWs2vEGxM29eQv8AXDSmpVSIJa+KIUCgYEA8EW/
      VqBFbBcH2KnOSnuGEHOlhtFPaURgE1icjYzRT9GkJ1Y/pugZ6T1/SgAtKcTD8AcM
      y4Lj14dNC9Y4laiwCJsof+QBnRSMJRt9F7t9GdFbbJAR6C3Rewwe+U3IpyDjWkSB
      PRk3nG2TTu+y0aCPR/RsYipsbE6VgXxjwvwDVPkCgYAC1+MbE2jcPfxJACS4ypCp
      cITFL4RaQ80/vt3IaevYbK2Ge+9n5GbDjn0IyWjQMQiXIYfYMYLHCynPm8ac6pxq
      Es//PwP8ckDqs/Oa7zO9sKx1QiCe8ritXN+Z63WctTvKZfCVL17WnVzQ4dmFz1ro
      NfqBt2TtDz0RicYXoBwdkQKBgQCnJH3kLv3cIXFN4WImIiOy0iA11uldGzmSe7P8
      LBd3ZSjCTJde7lsIC8W+nrzML5r2IJFgCR+iUPbh4xXd1kkO05Cq1tvgf+i175dn
      qP9vtFna/aXXU/hDlrz9RITu7kv6AWm+LQqogPlWkhxdA0ppDblP2J8wAMK0Hunv
      PAy9UQKBgQC6t/jAQd/lukod/fHozDjHmG5R+oA2L5OmNkRh95p/T2C2fpjJ2LYX
      MzkjT9jKSKZOwrioiFx2yS8TMqxt63V9icH+qxy92jyXyeew2TsaIAIwfMqfuE42
      LesyFJraT+yAYN3I1815JltFyZADx66EDjkrQ7N3843+MUyvInHpzg==
      -----END RSA PRIVATE KEY-----
    verification-key: |
      -----BEGIN PUBLIC KEY-----
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7FfVYQay0MEWPD5y2bRo
      8rKzz5ngvg7PFTZz756pKA7Q1a9bnW5FtLQ5y2k+SFdOFKzEMdgAfyxMX2RfL9cC
      hUJVkgagESlDrJ2U1BFEbEuTEXl5ZKGX5XRPt82Zk4A/gxDyAcQuqeQcDD7vWYCa
      QV2c1j8qsgr/ZuS1Bopq091x6VXliSX9P+4YZVjP1+Us5CF7iSJTwuABWCe6dEse
      ugs8gqWYkPm6c8KzvV3m+lLFXixQr0UBgv552UHMZSJ+anybZB3uSpy6zRYANY8c
      EkIDjDK6fU8PG9/IvNP2HWScwUyfEkFw+dBqaYtu0Jp/DfE2jDHabRbQJqsQadAN
      XQIDAQAB
      -----END PUBLIC KEY-----

smtp:
  host: testmail.virtual.com
  port: 25
  user: test@testmail.virtual.com
  password: xxx
```

#### issuer

token的分发者

#### login

...

#### database

UAA will use an in-memory database that is torn down between runs unless you choose a spring profile or a specific database configuration as a toplevel setting in uaa.yml. An example connecting to a postgres database:

```yaml
spring_profiles: postgresql,default
database:
  driverClassName: org.postgresql.Driver
  url: jdbc:postgresql://localhost:5432/uaa
  username: postgres
  password: 123
```





#### jwt

UAA can use either symmetric key encryption (shared secrets) or public key encryption.

Generating new asymmetric key pairs

```bash
# jwt.token.signing-key
openssl genrsa -out privkey.pem 2048
# jwt.token.verification-key
openssl rsa -pubout -in privkey.pem -out pubkey.pem
```



#### smtp

邮件服务器配置，允许通过页面注册用户，需要配置邮箱服务器。

```yaml
smtp:
  host: testmail.virtual.com
  port: 25
  user: test@testmail.virtual.com
  password: xxx
```



## 2.2 Tomcat部署

正常tomcat部署即可。

浏览器访问： http://localhost:8080/uaa，有登陆界面即可



# 三、UAAC

管理员用户的命令行管理工具，可以对client、group、user、scope进行管理。

**参考：**

* [User Account and Authentication (UAA) Server](https://docs.cloudfoundry.org/concepts/architecture/uaa.html) 介绍UAA验证服务的搭建
* [Creating and Managing Users with the UAA CLI (UAAC)](https://docs.cloudfoundry.org/uaa/uaa-user-management.html) 介绍UAAC的使用方式
* [UAA Concepts](https://docs.cloudfoundry.org/uaa/uaa-concepts.html#overview) 介绍UAA中zone、client、group、client的部分概念





## 2.1 安装cf-uaac

uaac依赖ruby环境，先安装ruby的环境，yum默认的是2.0.0版本，不可用，需要安装高版本的ruby。安装方式如下：

**升级gcc环境**

> yum install -y gcc gcc-c++



**scl安装**

> yum install centos-release-scl-rh     //会在/etc/yum.repos.d/目录下多出一个CentOS-SCLo-scl-rh.repo源
>
> yum install rh-ruby27 -y　　　　     //直接yum安装即可
>
> yum install rh-ruby27-ruby-devel
>
> scl enable rh-ruby27 bash　　　　//必要一步
>
> ruby -v　　　　//查看安装版本 ruby 2.7.1p83 (2020-03-31 revision a0c7c23c9c) [x86_64-linux]
>
> gem -v                //查看安装版本 3.1.2



**cf-uaac**

> gem install cf-uaac     // 安装uaac
>
> uaac -v           // 查看版本 UAA client 4.2.0



## 2.2 设置uaac指向

将uaac指向正在运行中的UAA服务实例

> uaac target http://localhost:8080/uaa



## 2.3 注册client、user、group

**./WEB-INF/spring/oauth-clients.xml** 有默认的client，其中admin具有管理员权限，可以注册、变更client、group、user信息

```xml
<entry key="admin">
    <map>
        <entry key="authorized-grant-types" value="client_credentials" />
        <entry key="scope" value="uaa.none" />
        <entry key="authorities" value="uaa.admin,clients.read,clients.write,clients.secret,scim.read,scim.write,clients.admin" />
        <entry key="secret" value="adminsecret" />
    </map>
</entry>
```

client、group、user的操作都属于管理员操作，操作前，需要验证自身具备这些权限：

> uaac token client get admin -s adminsecret



使用`uaac contexts`可以查看当前的连接信息，这部分信息默认存储在`~/.uaac.yml`

> uaac contexts



查看当前已有的client

> uaac clients



### 新建client

UAA是一个OAuth2服务，在服务启动后，开发者必须第一时间创建一个client。

client采用XHR的简单验证。

> uaac client add webappclient -s webappclientsecret  
> --name WebAppClient 
> --scope resource.read,resource.write,openid,profile,email,address,phone 
> --authorized_grant_types authorization_code,refresh_token,client_credentials,password 
> --authorities uaa.resource 
> --redirect_uri http://localhost:8081/login/oauth2/code/uaa

* name 客户端名称
* scope 客户端支持的权限范围。[默认scope解释](https://docs.cloudfoundry.org/concepts/architecture/uaa.html#uaa-scopes)
* authorized_grant_types 客户端支持的验证类型。参考[select-type](https://docs.cloudfoundry.org/uaa/uaa-concepts.html#select-type)
* authorities
* redirect_uri 用户验证成功后，默认的跳转路径

此时执行`uaac clients`可以看到新建的client WebAppClient。



### 新建用户

> uaac user add appuser -p appusersecret --emails appuser@acme.com

此时执行 `uaac users -a username`可以看到新建的用户



### 新建权限组

UAA有默认的[权限组](https://docs.cloudfoundry.org/concepts/architecture/uaa.html#uaa-scopes)，不同的权限组代表具有不能的能力。另，支持自定义权限组。

> uaac group add resource.read 
>
> uaac group add resource.write

此时执行`uaac groups -a displayname`可以看到新建的用户



### 关联权限组

> uaac member add resource.read appuser 
>
> uaac member add resource.write appuser



# 四、Rest API

UAA服务提供REST API的访问，参考文档：

* [**理解OAuth2.0**](https://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)
* [**The OAuth 2.0 Authorization Framework**](https://www.rfcreader.com/#rfc6749)
* [**UAA-APIs.rst**](https://github.com/cloudfoundry/uaa/blob/master/docs/UAA-APIs.rst)
* [**UAA API DOC**](https://docs.cloudfoundry.org/api/uaa/version/74.4.0/index.html#overview)



## 1. 获取Admin凭证

xhr: [doc](https://docs.cloudfoundry.org/api/uaa/version/75.0.0/index.html#with-authorization)

客户端admin账户是UAA服务的内置账户，存在配置文件`./WEB-INF/spring/oauth-clients.xml`,有UAA服务中client、group、user的读写权限。

```bash
curl 'http://localhost:8080/uaa/oauth/token' -i -u 'admin:adminsecret' -X POST -H 'Content-Type: application/x-www-form-urlencoded' -H 'Accept: application/json' -d 'grant_type=client_credentials&token_format=opaque'
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



## 2. Client API

支持对客户端的单个、批量操作。

### 2.1 Create One Client

xhr：[doc](https://docs.cloudfoundry.org/api/uaa/version/75.0.0/index.html#create-6)

```bash
 curl 'http://localhost:8080/uaa/oauth/clients' -i -X POST -H 'Content-Type: application/json' -H 'Authorization: Bearer ${ADMIN_TOKEN}' -H 'Accept: application/json' -d '{ "scope" : [ "clients.read", "clients.write", "openid", "profile", "resource.read", "resource.write" ], "client_id" : "uiclient", "client_secret" : "secret", "resource_ids" : [ ], "authorized_grant_types" : [ "client_credentials" ], "authorities" : [ "clients.read", "clients.write", "openid", "profile","resource.read", "resource.write" ], "token_salt" : "cdGXbD", "autoapprove" : true, "name" : "uiclient web client" }'
```

**请求头：**

* **authorization**：值为第一步（获取Admin凭证）请求的Response的access_token

**参数**：

* **scope**：客户端具备的范围
* **authorities**：创建一个客户端时，标识这个客户端能给予USER的授权范围
* **redirect_uri**：用户在当前客户端鉴权成功后，重定向的路由



### 2.2 Delete One Client

xhr:[doc](https://docs.cloudfoundry.org/api/uaa/version/75.0.0/index.html#delete-6)

```bash
curl 'http://localhost:8080/uaa/oauth/clients/uiclient' -i -X DELETE -H 'Authorization: Bearer ${ADMIN_TOKEN}' -H 'Accept: application/json'
```

Response:

```json
{
    "scope": [
        "clients.read",
        "clients.write",
      	"openid"
    ],
    "client_id": "uiclient",
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
    "name": "uiclient web client",
    "lastModified": 1617778508969,
    "required_user_groups": []
}
```



### 2.3 Update One Client

xhr:[doc](https://docs.cloudfoundry.org/api/uaa/version/75.0.0/index.html#update-6)

```bash
curl 'http://localhost:8080/uaa/oauth/clients/uiclient' -i -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer ${ADMIN_TOKEN}' -H 'Accept: application/json' -d '{"client_id": "uiclient", "scope" : [ "swl.test" ] }'
```



### 2.4 Retrieve One Client Info

xhr：[doc](https://docs.cloudfoundry.org/api/uaa/version/75.0.0/index.html#retrieve-3)

```bash
curl 'http://localhost:8080/uaa/oauth/clients/uiclient' -i -X GET -H 'Authorization: Bearer ${ADMIN_TOKEN}' -H 'Accept: application/json'
```

Response:

```json
{
    "scope": [
        "clients.read",
        "clients.write"
    ],
    "client_id": "uiclient",
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
    "name": "uiclient web client",
    "lastModified": 1617778508969,
    "required_user_groups": []
}
```

## 3. Group API

[doc](https://docs.cloudfoundry.org/api/uaa/version/75.0.0/index.html#groups)

## 4. User API

[doc](https://docs.cloudfoundry.org/api/uaa/version/75.0.0/index.html#users)



# 五、uaa-client-side工具库

The table below describes the client-side tools and libraries UAA uses:

| Name                                                         | Language |
| :----------------------------------------------------------- | :------- |
| [UAAC](https://github.com/cloudfoundry/cf-uaac) [CF-UAA-LIB](https://github.com/cloudfoundry/cf-uaa-lib) | Ruby     |
| [Spring Security OAuth](http://projects.spring.io/spring-security-oauth/) | Java     |
| [CF Java Client](https://github.com/cloudfoundry/cf-java-client) | Java     |
| [UAA Javascript SDK (Singular)](https://github.com/cloudfoundry/uaa-singular) | JS       |





cleint: c5fc57d03993350ae82a

passwd: 0d5b13ca7819f593ce37d00152756714b90a799e