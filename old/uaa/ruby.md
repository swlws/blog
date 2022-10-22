默认镜像源版本

​ 2.0.0

Yum install -y gcc gcc-c++

**方法一**：**换 yum 源安装**

~]# yum install centos-release-scl-rh 　　　　//会在/etc/yum.repos.d/目录下多出一个 CentOS-SCLo-scl-rh.repo 源

~]# yum install rh-ruby27 -y 　　　　//直接 yum 安装即可

~]# scl enable rh-ruby27 bash 　　　　//必要一步

~]# ruby -v 　　　　//查看安装版本

> 报错：mkmf.rb can't find header files for ruby at /opt/rh/rh-ruby27/root/usr/share/include/ruby.h

yum install rh-ruby27-ruby-devel
