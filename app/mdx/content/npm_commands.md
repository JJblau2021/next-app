# npm 命令行

```bash
npm root -g // 查看全局包安装目录
npm list -g --depth 0 // 查看全局安装过的包
npm publish // 发布包
npm unpublish [--force] // 撤销已经发布的包
npm deprecated // 不会撤销包，但会在任何人尝试安装这个包的时候得到 deprecated 的警告
npm version // 修改包版本
```

- 撤销发布
    
    1. 不允许撤销发布已经超过24小时的包（`unpublish is only allowed with versions published in the last 24 hours`）
    2. 如果在24小时内确实要撤销，需要加--force参数
    3. 即使撤销了发布的包，再次发布的时候也不能与之前被撤销的包的名称/版本其中之一相同，因为这两者构成的唯一性已经被占用，官方并没有随着撤销而删除****
    
    作者：Leson17
    
    链接：https://www.jianshu.com/p/c23c9a1b818f
    
    来源：简书
    
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
    
- 包版本
    
    ```bash
    npm version patch  // 1.0.1 表示小的bug修复
    npm version minor // 1.1.0 表示新增一些小功能
    npm version mmajor // 2.0.0 表示大的版本或大升级
    npm version preminor // 1.1.0-0 后面多了个0，表示预发布
    ```
    
    ```
    major：主版本号（大版本）
    minor：次版本号（小更新）
    patch：补丁号（补丁）
    premajor：预备主版本
    preminor: 预备次版本
    prepatch：预备补丁版本
    prerelease：预发布版本
    ```