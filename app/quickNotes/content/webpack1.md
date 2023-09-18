# 其一

## 认识 webpack

## 搭建本地 web 服务

使用 webpack + Ts 搭建一个简易的本地 web 服务。

---

### 初始化项目

首先创建一个名为 webpack-demo 的项目，并初始化

```bash
# 创建项目文件夹并使用 vscode 打开
mkdir webpack-demo && code webpack-demo
# 初始化项目
npm init -y
# 初始化 git
git init
# 添加忽略文件
echo 'node_modules
dist' >> .gitignore
```

### 创建 webpack.config.ts 和脚手架

使用 Typescript 来编写 webpack 配置有许多好处，除了针对 webpack configuration 的快速提示以外，对于庞大的社区生态，各种 loader、plugin 都有了人性化的提示。除此之外，由于当前互联网上还存在很多针对旧版本的webpack教程和相关插件应用，如果没有 Ts 报错提示，将无法辨识教程的准确性。

说完使用 Typescript 的意义，接下来看看如何配置, 可以查看官网的[教程](https://www.webpackjs.com/configuration/configuration-languages/#typescript)。

要使用 Typescript 来编写 webpack 配置，你需要先安装必要的依赖，如 Typescript 以及对应的类型声明。

```bash
# 安装 webpack 
pnpm add -D webpack webpack-cli webpack-dev-server
# 提供 ts 支持
pnpm add -D typescript ts-node @types/node @types/webpack
# 如果使用版本低于 v4.7.0 的 webpack-dev-server,还需要安装以下依赖
pnpm add -D @types/webpack-dev-server
```

完成依赖安装后，可以开始编制配置文件，如下：

```tsx
import * as path from 'path';
import * as webpack from 'webpack';
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

const config: webpack.Configuration = {
  mode: 'production', // 编译模式
  entry: './foo.js', // 入口文件
  output: { // 输出配置
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: 'foo.bundle.js', // 输出文件名
  },
};

export default config;
```

该示例需要 typescript 版本在 2.7 及以上，并在 `tsconfig.json` 文件中添加 `esModuleInterop` 和 `allowSyntheticDefaultImports` 两个配置项。值得注意的是你需要确保 `tsconfig.json` 的 `compilerOptions` 中的 `module` 选项值为 `commonjs`，否则 webpack 的运行会失败报错，因为 ts-node 不支持 commonjs 以外的其他模块。此时可以得到一份如下的 typescript 配置文件：

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
	// 排除
  "exclude": [
    "node_modules"
  ]
}
```

然后在 `package.json` 中添加启动脚本

```bash
{
	// ...
	"scripts": {
		"dev": "webpack -w"
	}
}
```

此时你的目录结构应该是

```bash
.
├── dist # 打包目录
├── foo.js # 入口文件
├── node_modules
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── webpack.config.ts
```

在 `foo.js` 中编写一些代码，例如

```jsx
console.count('foo.js')
```

并启动 webpack

```bash
pnpm dev
```

此时你可以在打包目录中看到 `foo.bundle.js`, 那么就大工告成了。

### 配置 webpack-dev-server

除了打包以外，webpack 能够搭建一个本地 web 服务，这依赖 webpack-dev-server。接下来将使用 [html-webpack-plugin](https://www.webpackjs.com/plugins/html-webpack-plugin/) 来搭建一个最简单的本地服务。

```bash
# 安装插件
pnpm add -D html-webpack-plugin
```

你只需要在 webpack 添加如下配置：

```tsx
// ...
import HtmlWebpackPlugin from 'html-webpack-plugin'

const config: webpack.Configuration = {
	// ...
	plugins: [
		new HtmlWebpackPlugin()
	],
	devServer: {
		port: 9000，// 通过 9000 端口访问
	}
};

export default config;
```

并添加启动 web 服务脚本

```tsx
// package.json
{
	//...
	"scripts": {
		// ...
		"start": "webpack server"
	}
}
```

在命令行启动后，通过浏览器访问 localhost:9000，将看到一个空白页面，打开控制台查看信息

![https://z1.ax1x.com/2023/09/18/pP4S5uD.png](https://z1.ax1x.com/2023/09/18/pP4S5uD.png)

可以发现正常打印了日志，并且报错找不到 `favicon.ico` 文件，此时可以从 [iconfont](https://www.iconfont.cn/?spm=a313x.collections_detail.i3.d4d0a486a.61873a817Fpcz3) 中下载一个，在根目录创建一个 `public` 目录，并将其放入，然后修改 html-webpack-plugin 配置

```tsx
// ...
import HtmlWebpackPlugin from 'html-webpack-plugin'

const config: webpack.Configuration = {
	// ...
	plugins: [
		new HtmlWebpackPlugin({
			favicon: "./public/favicon.png", // 网页标签页图标
      title: "webpack-demo", // 网页标题
		})
	],
	devServer: {
		port: 9000，// 通过 9000 端口访问
		static: {
			directory: path.join(__dirname, 'public') // 静态资源目录
		}
	}
};

export default config;
```

重启后，可以看到网页的图标和标题已被成功修改。