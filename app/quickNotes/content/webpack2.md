# 其二

## 引入

在上一节，我们使用 webpack 搭建了一个简易 cli 和本地 web 服务。在这一节我们将引入 react，并搭建一个基础的 SPA 应用脚手架。

## 搭建 React 应用

接下来我们将搭建一个 react 应用，并搭配 typescript 开发。

---

### 搭建 react + typescript 开发环境

首先安装 react 相关库

```bash
# 安装 react 核心库
pnpm add -S react react-dom
# 安装 react ts 类型支持
pnpm add -D @types/react @types/react-dom
```

然后修改 tsconfig.json

```json
{
  "compilerOptions": {
		// ...
    "jsx": "react-jsx",
  },
  "exclude": [
    "node_modules"
  ]
}
```

### 应用入口

创建 src 目录，并在其中创建一个 `App.tsx` 文件

```tsx
export default function App() {
  return (
    <div>
      <h1>React App</h1>
    </div>
  );
}
```

然后创建应用入口 `index.tsx`

```tsx
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(<App />);
```

并在 public 文件夹中创建 html 模板

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
	<!-- React 根节点 -->
  <div id="root"></div>
</body>

</html>
```

最后修改 `webpack.config.ts` 中的入口 `entry` 和 `HtmlWebpackPlugin` 中的 `template`

```tsx
const config: webpack.Configuration = {
	// 修改入口
  entry: "./src/index",
	resolve: {
		// 解析的文件后缀和顺序，如不加，所有文件路径都需要加上文件后缀
    extensions: [".tsx", ".ts", ".js"],
  },
	// ...
plugins: [
    new HtmlWebpackPlugin({
      favicon: "./public/favicon.png",
      title: "webpack-demo",
			// 设置 html 模板路径
      template: "./public/index.html",
    }),
  ],
};

export default config;
```

### 解析 react 和 typescript

仅仅配置好 react 开发环境和入口文件，并不能在浏览器中访问，因此我们需要将 tsx 解析成浏览器能够运行的 javascript 代码，此时我们将引入 webpack 中的 loader 概念。

- webpack loader 将对文件做预处理，并构建成我们需要的包括 javascript 在内的任何静态资源。

为了解析 `.tsx` 文件，我们需要安装 babel-loader

```bash
# 安装 babel-loader
pnpm add -D babel-loader
# 安装解析 tsx 需要的 presets
pnpm add -D @babel/preset-env @babel/preset-react @babel/preset-typescript
```

- babel 是一个语言解析器，查看[官网](https://babeljs.io/docs/presets)以获得更多说明。
    
    `@babel/preset-env` 是一个 Babel 插件，它根据您的目标浏览器或运行环境自动确定需要的转换和 polyfill，以便您可以使用最新的 JavaScript 语言特性而无需担心浏览器兼容性问题。
    
    `@babel/preset-react` 是一个 Babel 插件，它允许您使用 JSX 语法和其他与 React 相关的语言扩展。
    
    `@babel/preset-typescript` 是一个 Babel 插件，它允许您在 JavaScript 代码中使用 TypeScript 语法，并将其转换为普通的 JavaScript 代码。
    

然后配置好 `babel-loader`

```tsx
const config: webpack.Configuration = {
	// ...
	module: {
    rules: [
      {
        // js、jsx、ts、tsx 模块的处理
        test: /\.(t|j)sx?$/,
        // 排除 node_modules 目录下的文件
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
    ],
  },
};

export default config;
```

### 异常处理

将以上配置完成了之后，执行 `pnpm start` 启动项目，会在浏览其中看到以下编译警告

![https://z1.ax1x.com/2023/09/18/pP4SLCt.png](https://z1.ax1x.com/2023/09/18/pP4SLCt.png)

- 如图显示打包后的入口文件资源（260 kb）超过了推荐的 244 kb，可能影响性能。因此推荐分包或者使用异步导入来优化首屏资源加载。

此时可以配置 `webpack.config.ts` 中 `devServer` 的 `client overlay`，来关闭警告弹窗

```tsx
const config: webpack.Configuration = {
	devServer: {
	  // ...
    client: {
      overlay: {
        errors: true, // 展示错误蒙层
        warnings: false, // 关闭警告蒙层
      },
    },
  },
};

export default config;
```

配置好之后重新启动，此时浏览器会提示错误 `React is not defined`

```
ERROR
React is not defined
ReferenceError: React is not defined
    at a (http://localhost:9000/foo.bundle.js:2:2078)
    at xl (http://localhost:9000/foo.bundle.js:2:141021)
    at xu (http://localhost:9000/foo.bundle.js:2:197853)
    at wc (http://localhost:9000/foo.bundle.js:2:187005)
    at yc (http://localhost:9000/foo.bundle.js:2:186933)
    at vc (http://localhost:9000/foo.bundle.js:2:186796)
    at lc (http://localhost:9000/foo.bundle.js:2:183603)
    at oc (http://localhost:9000/foo.bundle.js:2:182158)
    at S (http://localhost:9000/foo.bundle.js:2:215328)
    at MessagePort._ (http://localhost:9000/foo.bundle.js:2:215860)
```

对于 jsx， webpack 会将其解析成 `React.createElement`，因此需要在每一个 `.tsx` 文件中引入 `React`，为了避免每次都导入同一个模块，webpack 提供了 [ProvidePlugin](https://www.webpackjs.com/plugins/provide-plugin/#usage-jquery) 来执行全局引入。修改 `webpack.config.ts`:

```tsx
const config: webpack.Configuration = {
	// ...
	plugins: [
		// ...
		new webpack.ProvidePlugin({
			React: 'react'
		})
	]
};

export default config;
```

此时已经能够正常启动 React 了。

![https://z1.ax1x.com/2023/09/18/pP4SO8P.png](https://z1.ax1x.com/2023/09/18/pP4SO8P.png)