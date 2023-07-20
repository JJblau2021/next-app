# SSH 公钥

## 查看已存在的公钥

```bash
# 进入 .ssh 文件夹
cd ~/.ssh

# 查看公钥文件
ls

# 查看公钥
vim id_ed25519.pub
cat id_ed25519.pub
```

## 创建公钥

```bash
ssh-keygen
```

## 参考链接

**[查看本机 ssh 公钥，生成公钥](https://www.runoob.com/w3cnote/view-ssh-public-key.html)**