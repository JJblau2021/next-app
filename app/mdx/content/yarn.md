# yarn

## 官网

[https://classic.yarnpkg.com/en/docs/cli/](https://classic.yarnpkg.com/en/docs/cli/)

## yarn workspace

### 如何使用 workspace

根目录的 package.json 设置：

```json
{
  "name": "mono-demo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
}
```

- private: 在 monorepo 中，项目根目录一般是项目脚手架，设置私有确保项目不会被发布。
- workspaces: 声明工作区内子包路径，支持 glob 通配符，也可以枚举所有子包路径

示例：

```shell
mono-demo/
|--package.json
|--packages/
|  |--foo/
|  |  |--package.json
|  |--bar/
|  |  |--package.json
```

### workspace commands

**`yarn workspace <workspace_name> <command>`**

在指定子包`<workspace_name>`中执行`<command>`

**`yarn workspaces run <command>`**

在所有子包中执行`<command>`

**`yarn workspaces info [--json]`**

查看项目中的子包依赖树

**`yarn <add|remove> <package> -W`**

- `-W` : `--ignore-workspace-root-check`  允许依赖被安装在项目根目录

### 子包间互相依赖

子包间可能存在互相依赖的关系

```shell
packages
├── components
├── shared
```

现在 components 包依赖 shared 包，我们需要再 components 包中的 package.json 中添加配置

```json
{
  "name": "components",
  "dependencies": {
    "shared": "workspace:*"
  }
}
```

- `workspace:*`  标识在 components 包执行 `npm publish` 的时候，会自动将 shared 的版本更换为 shared 包的版本

## 参考文献

[Yarn Workspace 使用指南](https://zhuanlan.zhihu.com/p/381794854)

[Yarn 2 的 Monorepo 开发实践](https://www.qiyuandi.com/zhanzhang/zonghe/17800.html)

[monorepo—依赖](https://blog.csdn.net/ligang2585116/article/details/103984640)