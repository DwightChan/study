# Mac OSX 平台安装 MongoDB

MongoDB 提供了 OSX 平台上 64 位的安装包，你可以在官网下载安装包。

下载地址：[https://www.mongodb.com/download-center#community](https://www.mongodb.com/download-center#community)

<img src="http://www.runoob.com/wp-content/uploads/2017/03/F1642F2B-A395-41BD-A66D-A1446BAD2324.jpg">

> 从 MongoDB 3.0 版本开始只支持 OS X 10.7 (Lion) 版本及更新版本的系统。
 

接下来我们使用 curl 命令来下载安装：

```
# 进入 /usr/local
cd /usr/local

# 下载
sudo curl -O https://fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-4.0.9.tgz

# 解压
sudo tar -zxvf mongodb-osx-ssl-x86_64-4.0.9.tgz

# 重命名为 mongodb 目录

sudo mv mongodb-osx-x86_64-4.0.9/ mongodb
```

安装完成后，我们可以把 MongoDB 的二进制命令文件目录（安装目录/bin）添加到 PATH 路径中：

```
export PATH=/usr/local/mongodb/bin:$PATH
```
<hr />

### 使用 brew 安装

此外你还可以使用 OSX 的 brew 来安装 mongodb：

```
sudo brew install mongodb
```

如果要安装支持 TLS/SSL 命令如下：

```
sudo brew install mongodb --with-openssl
```

安装最新开发版本：

```
sudo brew install mongodb --devel
```

### 运行 MongoDB
1、首先我们创建一个数据库存储目录 /data/db：

```
sudo mkdir -p /data/db
```

启动 mongodb，默认数据库目录即为 /data/db：

```
sudo mongod

# 如果没有创建全局路径 PATH，需要进入以下目录
cd /usr/local/mongodb/bin
sudo ./mongod
```

再打开一个终端进入执行以下命令：

```
$ cd /usr/local/mongodb/bin 
$ ./mongo
MongoDB shell version v4.0.9
connecting to: mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("3c12bf4f-695c-48b2-b160-8420110ccdcf") }
MongoDB server version: 4.0.9
……
> 1 + 1
2
> 
```

注意：如果你的数据库目录不是/data/db，可以通过 --dbpath 来指定。

```
sudo mongod --dbpath=/data/db 
```
