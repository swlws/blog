# JDK & Tomcat

## JDK

```csharp
//查找系统jdk
[root@host ~]#  rpm -qa|grep java 
java-1.6.0-openjdk-1.6.0.37-1.13.9.4.el5_11
tzdata-java-2015g-1.el5
//卸载
[root@host ~]# rpm -e --allmatches --nodeps java-1.6.0-openjdk-1.6.0.37-1.13.9.4.el5_11
[root@host ~]# rpm -e --allmatches --nodeps tzdata-java-2015g-1.el5
//检查是否卸载干净
[root@host ~]#  rpm -qa|grep java 
```

```shell
yum -y list java*
//或者
yum search jdk
```

```shell
yum install -y java-1.8.0-openjdk.x86_64
//验证完成安装
java -version
```

/etc/proflie

```bash
# 
export JAVA_HOME=/usr/lib/jvm/jre-1.8.0-openjdk
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
```

> source /etc/profile



## Tomcat



```bash
export CATALINA_HOME=/usr/tomcat
export PATH=$CATALINA_HOME/bin:$PATH
```

