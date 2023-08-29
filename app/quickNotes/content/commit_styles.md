# Git Commit 规范化和校验

## 引入

规范化项目的提交描述，提高代码提交的可读性和一致性。

使用到的相关工具：

- `husky`
- `commitizen`
- `@commitlint/cli`
- `cz-git`
- `@commitlint/config-conventional`

## 安装

首先安装相关依赖。

```bash
pnpm add -D husky commitizen @commitlint/cli cz-git @commitlint/config-conventional
```

## Git Commit 规范化模板

定制一套规范化的代码提交模板，使用 `pnpm commit` 代替 `git commit` 提交代码。

使用的相关依赖：

- `commitizen`
- `cz-git`

步骤1：修改 `package.json`，添加 `config` 指定使用的适配器

```json
{
  "scripts": {

  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

步骤2：添加自定义配置（可选），在根目录 `commitlint.config.cjs` 中加入以下配置

```jsx
// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
module.exports = {
	extends: ['@commitlint/config-conventional'], // 用于 commitlint，后续会说明
	prompt: {
		alias: { fd: 'docs: fix typos' },
		messages: {
			type: '选择你要提交的类型 :',
			scope: '选择一个提交范围（可选）:',
			customScope: '请输入自定义的提交范围 :',
			subject: '填写简短精炼的变更描述 :\n',
			body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
			breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
			footerPrefixesSelect: '选择关联issue前缀（可选）:',
			customFooterPrefix: '输入自定义issue前缀 :',
			footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
			confirmCommit: '是否提交或修改commit ?',
		},
		types: [
			{ value: 'feat', name: 'feat:     新增功能 | A new feature', emoji: '✨' },
			{ value: 'fix', name: 'fix:      修复缺陷 | A bug fix', emoji: '🐞' },
			{ value: 'docs', name: 'docs:     文档更新 | Documentation only changes', emoji: '📚' },
			{ value: 'style', name: 'style:    代码格式 | Changes that do not affect the meaning of the code', emoji: '💎' },
			{ value: 'refactor', name: 'refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature', emoji: '📦' },
			{ value: 'perf', name: 'perf:     性能提升 | A code change that improves performance', emoji: '🚀' },
			{ value: 'test', name: 'test:     测试相关 | Adding missing tests or correcting existing tests', emoji: '🚨' },
			{ value: 'build', name: 'build:    构建相关 | Changes that affect the build system or external dependencies', emoji: '🛠' },
			{ value: 'ci', name: 'ci:       持续集成 | Changes to our CI configuration files and scripts', emoji: '⚙️' },
			{ value: 'revert', name: 'revert:   回退代码 | Revert to a commit', emoji: '🗑' },
			{ value: 'chore', name: 'chore:    其他修改 | Other changes that do not modify src or test files', emoji: '🔧' },
		],
		useEmoji: true,
		emojiAlign: 'center',
		useAI: false,
		aiNumber: 1,
		themeColorCode: '',
		scopes: [],
		allowCustomScopes: true,
		allowEmptyScopes: true,
		customScopesAlign: 'bottom',
		customScopesAlias: 'custom',
		emptyScopesAlias: 'empty',
		upperCaseSubject: false,
		markBreakingChangeMode: false,
		allowBreakingChanges: ['feat', 'fix'],
		breaklineNumber: 100,
		breaklineChar: '|',
		skipQuestions: [],
		issuePrefixes: [
			// 如果使用 gitee 作为开发管理
			{ value: 'link', name: 'link:     链接 ISSUES 进行中' },
			{ value: 'closed', name: 'closed:   标记 ISSUES 已完成' },
		],
		customIssuePrefixAlign: 'top',
		emptyIssuePrefixAlias: 'skip',
		customIssuePrefixAlias: 'custom',
		allowCustomIssuePrefix: true,
		allowEmptyIssuePrefix: true,
		confirmColorize: true,
		maxHeaderLength: Infinity,
		maxSubjectLength: Infinity,
		minSubjectLength: 0,
		scopeOverrides: undefined,
		defaultBody: '',
		defaultIssues: '',
		defaultScope: '',
		defaultSubject: '',
	},
};
```

步骤3：替换代码提交命令行，在 `package.json` 中添加代码提交脚本，使用 `pnpm commit` 代替 `git commit` 

```json
{
  "scripts": {
		"commit": "cz",
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

## Git Commit 规范化校验

配置好代码提交规范后，完善后续校验，确保代码提交的规范化。

使用的相关依赖：

- `husky`
- `@commitlint/cli`
- `@commitlint/config-conventional`

步骤1：初始化 `husky` ，如项目中已使用 `husky`，可跳过

在安装完 husky 依赖后，项目还需要安装 husky 钩子。

```json
// 在 package.json 中添加 husky 安装脚本
{
	"script": {
		"prepare": "husky install",
		// "postinstall": "husky install" // 使用 yarn 为包管理器时
	}
}
```

- 使用 `yarn`为包管理器的时候，使用 `postinstall` 脚本代替 `prepare`

执行该脚本

```bash
pnpm prepare # 或 yarn postinstall
```

在脚本执行完毕后，项目根目录中会生成一个 `.husky` 文件夹，里面包含了 `husky` 的相关脚本，后续会用到

步骤2：添加 `commit-msg` 钩子

在命令行输入

```bash
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

执行完毕后，`.husky` 文件夹内将会生成一个 `commit-msg` 文件

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit ${1}
```

步骤3：添加代码提交校验文件，如果在添加模板时已配置，可跳过

在根目录下添加 `.commitlintrc.js` 文件

```jsx
// .commitlintrc.js

module.exports = {
	extends: ['@commitlint/config-conventional'],
  // ...
};
```

- 支持的校验文件名，esm 规范项目应使用 `.cjs` 后缀文件
    - `.commitlintrc.js`
    - `commitlint.config.js`
    

## 最后测试

恭喜你，已经完成了所有代码提交规范化配置，最后一步仅需校验配置结果。

在命令行提交代码

```bash
git add . && git commit -m 'test'
```

此时终端将会提示报错，并阻止代码提交

```bash
→ No staged files match any configured task.
⧗   input: test
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg hook exited with code 1 (error)
```

如果配置了`commitizen`，正确的代码提交为

```bash
git add . && pnpm commit
```

## 相关链接

[commitlint - Lint commit messages](https://commitlint.js.org/#/)

[cz-git - commitizen adapter and CLI](https://cz-git.qbb.sh/zh/)

[🐶 husky | 🐶 husky](https://typicode.github.io/husky/)

[npm: @commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional)

[npm: commitizen](https://www.npmjs.com/package/commitizen)

[git提交规范工具commitlint - 掘金](https://juejin.cn/post/7068988460899500040#heading-1)