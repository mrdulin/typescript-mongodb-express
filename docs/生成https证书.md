# 生成https证书

使用`openssl`生成自己的证书

```bash
~ openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout novaline.pem -out novaline.crt
```

但是`chrome v58`以后的版本，对于自签名证书会提示“不安全”，以及“您的连接不是私密连接”。

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fjmlg2lhvqj31iq12mwh6.jpg)

这里先点“高级”，“继续前往localhost(不安全)”。

打开`chrome`控制台，查看`Security`选项卡，如下图：

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fjmli7ry2pj312g0qsgni.jpg)

提示"Subject Alternative Name missing"。

解决方案：(`osx`)使用如下命令重新生成`ssl`证书

openssl req \
​    -newkey rsa:2048 \
​    -x509 \
​    -nodes \
​    -keyout server.pem \
​    -new \
​    -out server.crt \
​    -subj /CN=localhost \
​    -reqexts SAN \
​    -extensions SAN \
​    -config <(cat /System/Library/OpenSSL/openssl.cnf \
​        <(printf '[SAN]\nsubjectAltName=DNS:localhost')) \
​    -sha256 \
​    -days 3650

重启服务，刷新浏览器，可以看到"Subject Alternative Name missing"提示没有了。

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fjmlqo7vxcj311a0lydhc.jpg)

接下来解决"Certificate error":(`osx`)

如果使用`chrome`浏览器，可以通过“设置”-“高级”-“管理证书”，打开“钥匙串访问”，“系统”找到`localhost`证书，“信任”设置修改为“始终信任”，保存。

或者直接`command` + `space`，搜索`keychain Access.app`，打开“钥匙串访问”。

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fjmlwo849mj31cy0xugqd.jpg)

设置完毕后，刷新浏览器即可看到“绿”了。

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fjmm1x5mvzj31120wwwgp.jpg)
