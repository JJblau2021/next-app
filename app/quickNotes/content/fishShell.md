# fish shell

## 官网

[fish shell](https://fishshell.com/)

## windows 安装

### MSYS2

使用 msys2 安装 

1. 下载 msys2

[MSYS2](https://www.msys2.org/)

1. 打开 msys2，安装 fish

```bash
pacman -S fish
```

- 设置 msys2 辅助镜像
    
    [msys2 | 镜像站使用帮助 | 北京外国语大学开源软件镜像站 | BFSU Open Source Mirror](https://mirrors.bfsu.edu.cn/help/msys2/)
    
1. msys2 与 windows Terminal 配合，其中包含将 msys2 的默认 shell 设置成 fish

[MSYS2 - Terminals](https://www.msys2.org/docs/terminals/)

1. 安装其他工具，如 git

```bash
pacman -S git
```

1. 安装 of-my-fish

```bash
curl -L https://get.oh-my.fish | fish
```

[https://github.com/oh-my-fish/oh-my-fish](https://github.com/oh-my-fish/oh-my-fish)