# less

## less 函数批量生成 class

```less
@animateDelayList: 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5;
.animate__delay-loop(@list, @i:1, @val: extract(@list, @i)) when (@i =< length(@list)) {
	.animate__animated.animate__delay-@{val}s {
		animation-delay: @val * 1s;
	}

	.animate__delay-loop(@list, @i + 1);
}

.animate__delay-loop(@animateDelayList);
```

### @plugin

```jsx
// plugin.js
module.export = {
	install(less, pluginManager, functions) {
		functions.add('pluginName', function(prop) {
			return 'pluginName' + prop.value
		})
	}
}
```

```jsx
@plugin './plugin';

@var: pluginName();
```

```jsx
// .stylelintrc.js 修复 @plugin 语法检测报错
rules: {
	'at-rule-no-unknown': [true, {ignoreAtRules: ['plugin']}]
}
```

## 链接

[Less 函数_Less 中文网](https://lesscss.com.cn/functions/#string-functions)

[Functions | Less.js](https://lesscss.org/functions/#math-functions-ceil)