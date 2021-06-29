# UAA



cloudfoundry是一个云服务平台，其中包含UAA模块，UAA可以单独部署，UAA有自身的命令行API

UAA部署方式：https://docs.cloudfoundry.org/concepts/architecture/uaa.html

 

官方文档提供的部署方式，需要gradle支持，会下载依赖，这个需要翻墙：

\> Downloading https://services.gradle.org/distributions/gradle-6.3-bin.zip

 

UAA API: https://docs.cloudfoundry.org/api/uaa/version/75.0.0/index.html#overview



The User Account and Authentication (UAA) service is the primary authentication service on the Predix platform. It enables developers to add user authentication and authorization capabilities to their application. Application developers can obtain a UAA instance from the Predix marketplace and configure the instance to authenticate trusted users and clients for their application. UAA service offers a virtual OAuth2 server to customers to issue and validate tokens for client applications.





## What Is UAA?

UAA provides identity-based security for apps and APIs. It supports open standards for authentication and authorization, including:

- OAuth
- OpenID Connect
- SAML
- LDAP
- SCIM

The major features of UAA include:

- User Single Sign-On (SSO) using federated identity protocols
- API security with OAuth
- User and group management
- Multi-tenancy support
- Support for **JWT** and **opaque** as a token format
- Token revocation
- Operational flexibility
  - Operate and run as a [BOSH release](http://bosh.io/releases/github.com/cloudfoundry/uaa-release?all=1), which allows multi-cloud deployment capabilities
  - Push as an app to CF
- Database flexibility, including support for MySQL and Postgres
- Auditing, logging, and monitoring
- Token exchange for SAML and JWT bearers
- Rest APIs for authentication, authorization, and configuration management



## Properties[¶](https://bosh.io/jobs/uaa?source=github.com/cloudfoundry/uaa-release#properties)

### `encryption`[¶](https://bosh.io/jobs/uaa?source=github.com/cloudfoundry/uaa-release#p%3dencryption)

> #### `active_key_label`[¶](https://bosh.io/jobs/uaa?source=github.com/cloudfoundry/uaa-release#p%3dencryption.active_key_label)
>
> The key label of the encryption passphrase that will be used to create the key using a Key Derivation Function for encrypting new data within the UAA database.
> Example
> key-1

https://bosh.io/jobs/uaa?source=github.com/cloudfoundry/uaa-release





# WAR



java

> 大于1.7 小于10

war包下载

> https://repo1.maven.org/maven2/org/cloudfoundry/identity/cloudfoundry-identity-uaa/

tomcat-1.8

> https://archive.apache.org/dist/tomcat/tomcat-8/v8.5.34/bin/apache-tomcat-8.5.34.tar.gz

环境变量

> export UAA_CONFIG_PATH=/root/.uaa

/root/.uaa/uaa.yml

1.jwt证书

>  openssl genrsa -out signingkey.pem 2048 
>
> openssl rsa -in signingkey.pem -pubout -out verificationkey.pem

2.uaa.yml

默认配置：https://github.com/cloudfoundry/uaa/blob/develop/uaa/src/main/resources/uaa.yml

参考配置：https://raw.githubusercontent.com/cloudfoundry/uaa/4.27.0/uaa/src/main/resources/required_configuration.yml

```jml
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

#spring_profiles: postgresql,default
#database:
#  driverClassName: org.postgresql.Driver
#  url: jdbc:postgresql://192.168.10.110:5432/uaa
#  username: postgres
#  password: 123
  
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
      
oauth:
  clients:
    admin:
      authorized-grant-types: client_credentials
      scope: read,write,password
      authorities: ROLE_CLIENT,ROLE_ADIN
      id: admin
      secret: adminclientsecret
      resource-ids: clients

smtp:
  host: testmail.virtual.com
  port: 25
  user: test@testmail.virtual.com
  password: xxx
```





/etc/profile

```bash
export JAVA_HOME=/usr/lib/jvm/jre-1.8.0-openjdk
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

export CATALINA_HOME=/usr/tomcat
export PATH=$CATALINA_HOME/bin:$PATH

export UAA_CONFIG_PATH=/root/.uaa
```





# UAAC

Cli-command line interface



ruby安装

> yum install ruby-devel.x86_64
>
> yum install gcc
>
> 



参考

* https://cookbook.digitaltwin.io/section-general-software3/user-account-and-authentication-server



