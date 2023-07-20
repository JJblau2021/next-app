# prefers-color-sheme

## 什么是prefers-color-sheme?

2020年7月31日，W3C发布的 Media Queries Level 5 标准草案 中提到了新的属性 prefers-color-scheme，网页现在可以通过条件规则组来获取浏览器宿系统的暗色模式状态并应用了。也就是说，现在我们可以很简单地实现“暗色模式系统访问的页面是暗色的，亮色模式系统访问的页面是亮色的”。

prefers-color-scheme提供了两个值；分别是 light 以及 night；顾名思义，light就是白天模式的样式代码，则night是深色模式的样式代码。

light——浏览器系统使用亮色主题的界面，同时也是默认值，浏览器 `privacy.resistFingerprinting` 被设置为 `true` 时返回的也将是这个值。

dark——浏览器系统使用暗色主题的界面。

## CSS 语法

```css
@media (prefers-color-scheme: <mode>) {
}
```

其中 mode 的取值如下：

```css
light: 浅色模式
dark: 深色模式
no-preference: 缺省
```

## 改造现有网页

```css
:root {
--bg: #FFFFFF;
}

@media(prefers-color-sheme:dark){
:root {
--bg: #000000;
}
}
```

JS 实现系统暗色模式状态获取

```jsx
if (window.matchMedia('prefers-color-sheme:dark').matches){
// 是暗色模式下 do something...
}
```

## 其他 CSS @media 规范

      `prefers-reduced-motion` 减弱动画效果

`prefers-contrast`调整内容色彩对比度

`prefers-reduced-transparency` 减少透明元素

`prefers-reduced-data` 减少数据传输