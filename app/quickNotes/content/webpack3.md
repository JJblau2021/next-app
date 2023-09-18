# 其三

## 引入

在上一节我们搭建了一个简单的 React 单页面应用，而这一节我们将逐步完善它。首先从 css 入手，我们知道常见的 css 开发方案有使用 less、saas、stylus 等预处理器，或者引入 tailwindcss 使用现成的原子类，又或者是以 styled-components 为典型的 css in js 方案。在这一节中，我们将使用 less 作为应用的样式开发方案。

## 使用 Less

Less 是一种 CSS 预处理器，它扩展了 CSS 语言，提供了许多便利的功能，例如变量、嵌套、混合、函数等。使用 Less 可以使 CSS 更加简洁、易于维护和扩展。

Less 的语法类似于 CSS，但是它提供了一些额外的功能。例如，可以使用变量来存储颜色、字体、边框等属性，然后在整个样式表中使用这些变量。可以使用嵌套来组织样式，使得代码更加易于阅读和理解。可以使用混合来定义可重用的样式块，以便在多个元素中共享。可以使用函数来处理样式值，例如计算、转换、过滤等。

Less 可以通过编译器将 Less 代码编译成标准的 CSS 代码，然后在浏览器中使用。在开发过程中，可以使用 Less 编辑器或者构建工具来自动编译 Less 代码

---

### 在 React 中使用 Less

在 React 项目中，可以使用 CSS Modules 来编写模块化 CSS，可以将每个组件的样式表分解为多个小模块，以便更好地组织和管理样式代码。Less 同理。

除了模块化 CSS，我们也会使用一些全局 CSS 来开发页面。

在使用 less 之前，在项目中安装 less

```bash
pnpm add -D less
```

然后在 `src` 目录下创建两个 less 文件

```less
// app.module.less
// 模块化 css
.app {
  color: skyblue;
}
```

```less
// global.less
// 全局样式
.font-bold {
	font-weight: 600;
}
```

并在 App 中引入

```tsx
// App.tsx
import styles from "./App.module.less";
import "./global.less";

export default function App() {
  console.count("App");
  return (
    <div className={styles.app}>
      <h1 className="font-bold">React App</h1>
    </div>
  );
}
```

此时会提示 Ts 报错

```
找不到模块“./App.module.less”或其相应的类型声明。ts(2307)
```

因此需要用 Ts 来定义该模块的类型。在 `src` 目录下新建 `typing.d.ts` 来声明模块类型；

```tsx
// typing.d.ts
declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}
```

### 解析 Less

在解决了 Ts 报错后，我们仍需要配置 loader 来解析 less 模块，将其编译成浏览器能够运行的 css 文件。

```bash
# 安装需要的 loader
pnpm add -D less-loader css-loader style-loader
```

- 其中每个 loader 承担着不同的职责
    
    [less-loader](https://www.webpackjs.com/loaders/less-loader/) 将 less 解析成 css 代码
    
    [css-loader](https://www.webpackjs.com/loaders/css-loader/) 会解析 `@import` 和 `url()`, 类似 JS 中的 `require()/import`
    
    [style-loader](https://www.webpackjs.com/loaders/style-loader/) 负责将 CSS 插入到 DOM 中
    

针对 `.less` 文件配置好 webpack 的解析方式

```tsx
const config: webpack.Configuration = {
	// ...
	module: [
		rules: {
			// ...
			{
				// less、css 模块的处理
        test: /\.(le|c)ss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
	        "css-loader",
          "less-loader",
        ],
			}
		}
	]
};

export default config;
```

在运行项目之后，虽然能够发现样式作用正常，但是 webpack 编译后的 css 模块类名和原先的完全不同

```less
// 编译过后
.aqAx3mmtmt__pW9cgDaD {
    color: skyblue;
}
// 原先
.app {
		color: skyblue;
}
```

为了解决这个问题，还需要将 `css-loader` 的 `modules.localIdentName` 修改成 `“[local]--[hash:base64:5]”` 。

```tsx
const config: webpack.Configuration = {
	// ...
	module: [
		rules: {
			// ...
			{
				// less、css 模块的处理
        test: /\.(le|c)ss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
	        {
						loader: "css-loader",
						options: {
							modules: {
								// 将模块化 css 的类名修改为 类名 + 哈希值，携带哈希值以防止类名重复
								localIdentName: "[local]--[hash:base64:5]",
								// 可以开启 export 的 ES 模块并将类名转换成默认的驼峰命名
								namedExport: true
							},
						}
					},
          "less-loader",
        ],
			}
		}
	]
};

export default config;
```

### 提取 Css

[MiniCssExtractPlugin](https://www.webpackjs.com/plugins/mini-css-extract-plugin/) 插件能够将 CSS 提取到单独的文件中，并支持 CSS 和 SourceMaps 的按需加载。

```bash
pnpm add -D mini-css-extract-plugin
```

修改 webpack 配置

```tsx
import MiniCssExtractPlugin from "mini-css-extract-plugin";
const config: webpack.Configuration = {
	// ...
	module: [
		rules: {
			// ...
			{
				// less、css 模块的处理
        test: /\.(le|c)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
	        {
						loader: "css-loader",
						options: {
							modules: {
								// 将模块化 css 的类名修改为 类名 + 哈希值，携带哈希值以防止类名重复
								localIdentName: "[local]--[hash:base64:5]",
								// 可以开启 export 的 ES 模块并将类名转换成默认的驼峰命名
								namedExport: true
							},
						}
					},
          "less-loader",
        ],
			}
		}
	],
	plugins: [
		// ...
		new MiniCssExtractPlugin(),
	]
};

export default config;
```

如需开启 source map，则需要将 `devtool` 设置成 `“source-map”` ，并且在 `css-loader` 中开启 source map

```tsx
const config: webpack.Configuration = {
	// ...
	devtool: "source-map",
	module: [
		rules: {
			// ...
			{
				// less、css 模块的处理
        test: /\.(le|c)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
	        {
						loader: "css-loader",
						options: {
							modules: {
								// 将模块化 css 的类名修改为 类名 + 哈希值，携带哈希值以防止类名重复
								localIdentName: "[local]--[hash:base64:5]",
								// 可以开启 export 的 ES 模块并将类名转换成默认的驼峰命名
								namedExport: true
							},
							sourceMap: true
						}
					},
          "less-loader",
        ],
			}
		}
	],
	plugins: [
		// ...
		new MiniCssExtractPlugin(),
	]
};

export default config;
```

## file tree 和 webpack.config.ts

- file tree

```bash
.
├── dist
├── node_modules
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── favicon.png
│   └── index.html
├── src
│   ├── app.module.less
│   ├── App.tsx
│   ├── global.less
│   ├── index.tsx
│   └── typing.d.ts
├── tsconfig.json
└── webpack.config.ts
```

- `webpack.config.t`

```tsx
import * as path from "path";
import * as webpack from "webpack";
// in case you run into any typescript error when configuring `devServer`
import "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config: webpack.Configuration = {
  mode: "production",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "dist"),
		// 修改导出的文件名
    filename: "[name]-[contenthash:8].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "./public/favicon.png",
      title: "webpack-demo",
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
	// 提取公共代码块并fe
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
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
      {
        // less, css 模块的处理
        test: /\.(le|c)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]--[hash:base64:5]",
              },
              sourceMap: true,
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  devServer: {
    open: false,
    port: 9000,
    static: {
      directory: path.join(__dirname, "public"),
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
};
```