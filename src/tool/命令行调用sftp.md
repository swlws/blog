# 命令行调用SFTP

## 一、场景

机器环境：

* 开发机器：macOS

* sftp机器：CentOS

* 测试机器：Windows

在本地开发机器，编码之后，通过sftp将文件上传到文件服务器。测试机器将文件从文件服务器上拉取，在开发环境执行。流程：

1. 在macOS上，调用sftp，上传文件
2. 在Windows上，拉取sftp服务器上的静态资源文件，并运行



## 二、文件上传

机器：`macOS`

使用脚本实现文件的一键上传。sftp不支持用户名、密码参数，这是使用**lsft**执行交互式命令。

> 安装lftp

脚本功能：

* 将需要上传的文件压缩为ZIP文件
* 将ZIP文件上传到sftp服务器
* 删除临时产生的ZIP文件

```bash
# !/bin/bash
# 将src压缩为web-client-src.zip
# 使用SFTP将压缩文件上传到目标目录

# 待压缩的文件目录
SOURCE_FIEL="./src ./public"
# 压缩产生的中间文件
TARGET_FILE=dist.zip
# 本机文件存放的目录
CLIENT_DIR=./
# 服务器目录
SERVER_DIR=/home/sftp

echo "Compress File >> ${TARGET_FILE}"
zip -ru ${TARGET_FILE} ${SOURCE_FIEL}

echo 'Upload File With SFTP'
IP=192.168.1.1
PORT=22
USER=user
PASSWORD=123

lftp -u ${USER},${PASSWORD} sftp://${IP}:${PORT} <<EOF
cd ${SERVER_DIR}
lcd ${CLIENT_DIR}
put ${TARGET_FILE}
by
EOF

rm -rf ${TARGET_FILE}
```

美滋滋～～再也不用一行一行的敲命令了



## 三、将文件下载到本地并解压缩

机器：`Windows`

使用Apache / Nginx / Tomcat搭建静态资源服务器，能够将sftp服务器上文件，支持URL即可。

脚本功能：

* 使用powershell将文件下载
* 使用node-stream-zip将文件解压缩到本地

```js
const fs = require('fs');
const exec = require('child_process').exec;
const SreamZip = require('node-stream-zip');

const TARGET_DIR = `./`;
const FILE = `dist.zip`;
const URL = `http://192.168.1.2/file/${FILE}`;

const cmd = `powershell (new-object Net.WebClient).DownloadFile('${URL}', '${TARGET_DIR}${FILE}')`;

function runExec(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, function(err, stdout, stderr) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function unzip() {
  const zip = new SreamZip({
    file: `${TARGET_DIR}${FILE}`,
    storeEntries: true
  });

  return new Promise((resolve, reject) => {
    zip.on('error', console.log);
    zip.on('ready', () => {
      zip.extract(null, TARGET_DIR, (err, count) => {
        if (err) {
          console.log(err);
          reject();
          return;
        }

        console.log(`Uncompress Success, File Count: ${count}`);
        zip.close();
        resolve();
      });
    });
  });
}

console.log(`Begin Downloading ${TARGET_DIR}${FILE}`);
runExec(cmd)
  .then(() => {
    console.log(`Begin Uncompressing ${TARGET_DIR}${FILE}`);
    return unzip();
  })
  .then(() => {
    console.log(`Delete Temp Fiele ${TARGET_DIR}${FILE}`);
    fs.unlinkSync(`${TARGET_DIR}/${FILE}`);
  })
  .catch(console.log);

```

美滋滋～～



