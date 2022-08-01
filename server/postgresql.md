# PostgreSQL

**安装**

```bash
# Install the repository RPM:
sudo yum install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm

# Install PostgreSQL:
sudo yum install -y postgresql13-server

# Optionally initialize the database and enable automatic start:
sudo /usr/pgsql-13/bin/postgresql-13-setup initdb
sudo systemctl enable postgresql-13
sudo systemctl start postgresql-13
```

**启动**

```bash
# 初始化数据库
postgresql-setup --initdb
#设置PostgreSQL服务为开机启动
systemctl enable postgresql.service
systemctl start postgresql.service
```

**修改密码**

```bash
su postgres
psql
ALTER USER postgres WITH PASSWORD 'NewPassword';
```

**访问配置**

```javascript
sudo firewall-cmd --add-port=5432/tcp --permanent
sudo firewall-cmd --reload
```

**IP 绑定**

```bash
#修改配置文件
vi /var/lib/pgsql/12/data/postgresql.conf

#将监听地址修改为*
#默认listen_addresses配置是注释掉的，所以可以直接在配置文件开头加入该行
listen_addresses='*'
```

**IP 监听**

```bash
#修改配置文件
vi /var/lib/pgsql/12/data/pg_hba.conf

#在问价尾部加入
host  all  all 0.0.0.0/0 md5
```

**重启服务**

```bash
#重启PostgreSQL服务
sudo systemctl restart postgresql-12
```

**数据库操作**

```bash
#创建数据库
CREATE DATABASE mydb;

#查看所有数据库
\l

#切换当前数据库
\c mydb

#创建表
CREATE TABLE test(id int,body varchar(100));

#查看当前数据库下所有表
\d

#新建用户
CREATE USER test WITH PASSWORD 'test';

#赋予指定账户指定数据库所有权限
GRANT ALL PRIVILEGES ON DATABASE mydb TO test;

#移除指定账户指定数据库所有权限
REVOKE ALL PRIVILEGES ON DATABASE mydb TO test
```
