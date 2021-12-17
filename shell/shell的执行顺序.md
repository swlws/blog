# sheel

# 一、分类

- 内建命令
- 系统命令
- 第三方命令



## 1.1 内建命令

> Shell 内建命令，就是由 Bash 自身提供的命令，而不是文件系统中的某个可执行文件。

比如`cd`命令，为bash的内建命令，可以使用`type`来查看：

```bash
[root@localhost]## type cd
cd is a shell builtin
```



## 1.2 系统命令

```bash
[root@localhost]# type  shutdown
shutdown is /usr/sbin/shutdown
```

`shutdown` 为系统自带的命令，存放路径为`/usr/sbin/shutdown`

系统命令，存放在`/sbin`、`/us r/sbin`目录



## 1.3 第三方命令