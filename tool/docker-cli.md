docker cli



将容器打包为镜像

```bash
 docker commit -m="has update" -a="swl" e218edb10161 swl/centos
```

各个参数说明：

- **-m:** 提交的描述信息
- **-a:** 指定镜像作者
- **e218edb10161：**容器 ID
- **swl/centos:** 指定要创建的目标镜像名



带映射端口运行容器

```bash
# 随机端口映射
docker run -itd --name web -P websvc 

# 指定端口映射
docker run -itd --name web -p 80:80 websvc 
```



修改tag

```bash
docker tag name_origin name_b
```



用户

```bash

docker login
docker logout

# 上传镜像
docker iamge_a
```

