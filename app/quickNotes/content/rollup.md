# Rollup 使用心得

## 配置

详细配置可参考[中文文档](https://www.rollupjs.com/guide/big-list-of-options)（[英文文档](https://rollupjs.org/configuration-options/)）

### 参考配置

```jsx
import pkg from './package.json' assert { type: 'json' }; // 引入 package.json
import typescript from '@rollup/plugin-typescript'; // ts 支持
import strip from '@rollup/plugin-strip'; // 过滤调试代码
import resolve from '@rollup/plugin-node-resolve'; // node 模块解析
import commonjs from '@rollup/plugin-commonjs'; // 支持 commonjs 模块引入
// import dts from 'rollup-plugin-dts';
export default [
	{
		input: 'src/index.ts',
		output: [
			{
				name: pkg.name,
				file: pkg.main,
				format: 'cjs', // 打包成 cjs
			},
			{
				name: pkg.name,
				file: pkg.module,
				format: 'esm', // 打包成 esm
			},
		],
		plugins: [
			resolve(),
			commonjs(),
			typescript({
				// lib: ['es5', 'es6', 'dom'],
				// target: 'es5',
				outDir: 'dist',
				declaration: true,
				declarationDir: 'dist',
			}),
			strip({
				functions: ['console.*'],
				include: ['**/*.ts', '**/*.js'],
			}),
		],
	},
	// {
	// 	input: 'src/index.ts',
	// 	output: [
	// 		{
	// 			file: pkg.main.replace('.js', '.d.ts'),
	// 			format: 'esm',
	// 		},

	// 		{
	// 			file: pkg.module.replace('.js', '.d.ts'),
	// 			format: 'esm',
	// 		},
	// 	],
	// 	plugins: [dts()],
	// },
];
```

## 插件

### @rollup/plugin-commonjs

rollup 使用的是 ES6 版本 Javascript 中的标准模块，因此不支持 CommonJs 和 AMD 这一类非标准化的解决方案，使用该插件可解决这一问题。

使用方式

```jsx
import commonjs from '@rollup/plugin-commonjs';

export default [
	{
		plugins: [
			commonjs()
		],
	},

];
```

README

[npm: @rollup/plugin-commonjs](https://www.npmjs.com/package/@rollup/plugin-commonjs)

### @rollup/plugin-typescript

为 rollup 提供 TS 支持。

使用方式

```jsx
import typescript from '@rollup/plugin-typescript';

export default {
	plugins: [
		typescript(
			/**
			 * options 和 tsconfig.json 一致
			 * 例如：
			 * - declaration: true 用于构建 .d.ts 文件
			 */
		)
	]
}
```

README

[npm: @rollup/plugin-typescript](https://www.npmjs.com/package/@rollup/plugin-typescript)

### @rollup/plugin-strip

用来过滤项目中的调试部分代码，例如：`console.log`、`debugger`...

使用方式

```jsx
import strip from '@rollup/plugin-strip';

export default {
	plugins: [
		strip({
			functions: ['console.*'], // 过滤 console.
			include: ['**/*.ts', '**/*.js'], // 包含 ts 和 js 文件
		})
	]
}
```

README

[npm: @rollup/plugin-strip](https://www.npmjs.com/package/@rollup/plugin-strip)

### @rollup/plugin-node-resolve

使用 “node 解析算法”来定位模块运算，用来解析 `node_modules` 中的引用模块。

使用方式

```jsx
import resolve from '@rollup/plugin-node-resolve';

export default {
	plugins: [
		resolve()
	]
}
```

README

[npm: @rollup/plugin-node-resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve)

## 参考链接

[rollup常用插件 - 掘金](https://juejin.cn/post/7214350677539733564#heading-1)

[简介 | rollup.js 中文文档 | rollup.js中文网](https://www.rollupjs.com/)

[Rollup](https://rollupjs.org/)